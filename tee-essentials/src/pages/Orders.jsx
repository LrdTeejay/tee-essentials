import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { getProduct } from '../data/products';
import { formatDate } from '../utils/helpers';
import ProductImage from '../components/ProductImage';

const STEPS = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];

function stepFor(order) {
  const hours = (Date.now() - new Date(order.createdAt).getTime()) / 3600000;
  if (hours < 1) return 0;
  if (hours < 24) return 1;
  if (hours < 72) return 2;
  return 3;
}

export default function Orders() {
  const { orders, addToBag, setBagOpen } = useShop();
  const { format } = useCurrency();
  const { showToast } = useToast();

  function reorder(order) {
    const skipped = order.items.filter((i) => !addToBag(i.productId, i.size, i.color, i.qty).ok);
    if (skipped.length) showToast(`${skipped.length} item(s) are no longer in stock and were skipped.`, 'error');
    else showToast('Order added to your bag', 'success');
    setBagOpen(true);
  }

  if (orders.length === 0) {
    return (
      <div className="page container empty">
        <h1>No orders yet</h1>
        <p>When you place an order it will appear here with live tracking.</p>
        <Link to="/shop" className="btn btn-dark">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="page container">
      <h1 className="page-title">My orders</h1>
      <div className="orders">
        {orders.map((order) => {
          const step = stepFor(order);
          return (
            <article className="order" key={order.id}>
              <div className="order-head">
                <div>
                  <strong>{order.id}</strong>
                  <p className="muted" style={{ fontSize: '0.85rem' }}>
                    {formatDate(order.createdAt)}, {order.method === 'paystack' ? 'paid with Paystack' : 'pay on delivery'}
                  </p>
                </div>
                <span className={`status ${step === 3 ? 'done' : ''}`}>{STEPS[step]}</span>
              </div>
              <div className="steps" aria-label={`Status: ${STEPS[step]}`}>
                {STEPS.map((s, i) => <div key={s} className={i <= step ? 'on' : ''}>{s}</div>)}
              </div>
              <div className="order-items">
                {order.items.map((i) => {
                  const p = getProduct(i.productId);
                  return p ? (
                    <Link key={`${i.productId}${i.size}${i.color}`} to={`/product/${p.id}`} className="bag-thumb"
                      title={`${i.qty} × ${i.name} (${i.color}, ${i.size})`}>
                      <ProductImage product={p} />
                    </Link>
                  ) : null;
                })}
              </div>
              <div className="order-foot">
                <span>{order.items.reduce((s, i) => s + i.qty, 0)} items, <strong>{format(order.total)}</strong></span>
                <button className="btn btn-light btn-sm" onClick={() => reorder(order)}>Reorder</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
