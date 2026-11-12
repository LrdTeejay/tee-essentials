import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from '../utils/storage';
import { CURRENCIES, DEFAULT_CURRENCY, FALLBACK_RATES } from '../data/currencies';

const CurrencyContext = createContext(null);
const RATES_KEY = 'tee_rates';
const PICK_KEY = 'tee_currency';
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

export function CurrencyProvider({ children }) {
  const [picked, setPicked] = useState(() => load(PICK_KEY, null));
  const [rates, setRates] = useState(() => load(RATES_KEY, null)?.rates || FALLBACK_RATES);
  const [rateSource, setRateSource] = useState(() => (load(RATES_KEY, null) ? 'live' : 'approximate'));

  // US dollars by default; a currency the shopper picks in the header wins
  const currency = picked && CURRENCIES[picked] ? picked : DEFAULT_CURRENCY;

  // Fetch live rates at most every 12 hours
  useEffect(() => {
    const cached = load(RATES_KEY, null);
    if (cached && Date.now() - cached.fetchedAt < TWELVE_HOURS) return;
    let cancelled = false;
    fetch('https://open.er-api.com/v6/latest/NGN')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || data.result !== 'success') throw new Error('No rates');
        const wanted = {};
        Object.keys(CURRENCIES).forEach((code) => {
          wanted[code] = data.rates[code] ?? FALLBACK_RATES[code];
        });
        save(RATES_KEY, { rates: wanted, fetchedAt: Date.now() });
        setRates(wanted);
        setRateSource('live');
      })
      .catch(() => {
        if (!cancelled && !cached) setRateSource('approximate');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((code) => {
    setPicked(code);
    save(PICK_KEY, code);
  }, []);

  const convert = useCallback((ngn) => ngn * (rates[currency] ?? 1), [rates, currency]);

  const format = useCallback(
    (ngn, code = currency) => {
      const info = CURRENCIES[code] || CURRENCIES.NGN;
      const amount = ngn * (rates[code] ?? 1);
      return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: code,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: info.decimals,
        maximumFractionDigits: info.decimals,
      }).format(amount);
    },
    [rates, currency]
  );

  // Always-naira formatter, for the amount Paystack will charge
  const formatNGN = useCallback((ngn) => format(ngn, 'NGN'), [format]);

  const value = useMemo(
    () => ({ currency, setCurrency, convert, format, formatNGN, rateSource, isNaira: currency === 'NGN' }),
    [currency, setCurrency, convert, format, formatNGN, rateSource]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);
