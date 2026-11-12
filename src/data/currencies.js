// Display settings for each supported currency
export const CURRENCIES = {
  USD: { name: 'US dollar', locale: 'en-US', decimals: 2 },
  NGN: { name: 'Nigerian naira', locale: 'en-NG', decimals: 0 },
  GHS: { name: 'Ghanaian cedi', locale: 'en-GH', decimals: 2 },
  KES: { name: 'Kenyan shilling', locale: 'en-KE', decimals: 0 },
  ZAR: { name: 'South African rand', locale: 'en-ZA', decimals: 2 },
  GBP: { name: 'British pound', locale: 'en-GB', decimals: 2 },
  EUR: { name: 'Euro', locale: 'en-IE', decimals: 2 },
  CAD: { name: 'Canadian dollar', locale: 'en-CA', decimals: 2 },
  AED: { name: 'UAE dirham', locale: 'en-AE', decimals: 2 },
};

// Every visitor starts in US dollars and can switch from the header
export const DEFAULT_CURRENCY = 'USD';

// Countries offered at sign-up, with their currency
export const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN' },
  { code: 'GH', name: 'Ghana', currency: 'GHS' },
  { code: 'KE', name: 'Kenya', currency: 'KES' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'IE', name: 'Ireland', currency: 'EUR' },
  { code: 'DE', name: 'Germany', currency: 'EUR' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED' },
];

export const currencyForCountry = (code) =>
  COUNTRIES.find((c) => c.code === code)?.currency || 'NGN';

// Used when the browser language has no region (e.g. plain "en")
const TIMEZONE_TO_COUNTRY = {
  'Africa/Lagos': 'NG', 'Africa/Accra': 'GH', 'Africa/Nairobi': 'KE', 'Africa/Johannesburg': 'ZA',
  'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR',
  'Europe/Amsterdam': 'NL', 'Asia/Dubai': 'AE', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US',
};

// Guess the shopper's country from the browser (used to pre-fill sign-up), no network call
export function detectCountry() {
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const lang of langs) {
      const region = lang?.split('-')[1]?.toUpperCase();
      if (region && COUNTRIES.some((c) => c.code === region)) return region;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONE_TO_COUNTRY[tz]) return TIMEZONE_TO_COUNTRY[tz];
  } catch {
    /* fall through */
  }
  return 'NG';
}

// APPROXIMATE units of each currency per ₦1, used only if live rates can't load.
export const FALLBACK_RATES = {
  NGN: 1,
  USD: 0.00067,
  GHS: 0.0095,
  KES: 0.086,
  ZAR: 0.0118,
  GBP: 0.0005,
  EUR: 0.00058,
  CAD: 0.00093,
  AED: 0.00245,
};
