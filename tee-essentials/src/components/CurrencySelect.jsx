import { useCurrency } from '../context/CurrencyContext';
import { CURRENCIES } from '../data/currencies';

export default function CurrencySelect() {
  const { currency, setCurrency } = useCurrency();
  return (
    <select className="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}
      aria-label="Choose currency">
      {Object.entries(CURRENCIES).map(([code, info]) => (
        <option key={code} value={code} title={info.name}>{code}</option>
      ))}
    </select>
  );
}
