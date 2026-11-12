import { useCurrency } from '../context/CurrencyContext';

export default function Price({ ngn, compareAt }) {
  const { format } = useCurrency();
  const onSale = compareAt && compareAt > ngn;
  return (
    <span className="price">
      {onSale && <span className="price-old">{format(compareAt)}</span>}
      <span className={`price-now ${onSale ? 'sale' : ''}`}>{format(ngn)}</span>
    </span>
  );
}
