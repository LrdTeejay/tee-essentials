import { Link, useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';

export default function OrderConfirmed() {
  const { id } = useParams();
  const { orders } = useShop();
  const { format, formatNGN, isNaira } = useCurrency();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="page container center">
        <h1>Order not found</h1>
        <p className="muted">It may belong to another account on this device.</p>
        <Link to="/orders" className="btn btn-dark">See my orders</Link>
      </div>
    );
  }

  const paid = order.method === 'paystack';

  return (
    <div className="page container receipt">
      <h1 className="page-title">Thank you, {order.details.name.split(' ')[0]}.</h1>
      <p className="muted">
        {paid ? 'Your payment went through' : 'Your order is placed. Pay the courier on delivery'} and a confirmation
        would be sent to {order.details.email}. Estimated delivery: {order.shipping.eta}.
      </p>

      <div className="panel">
        <div className="summary-row"><span>Order number</span><strong>{order.id}</strong></div>
        <div className="summary-row"><span>{paid ? 'Paystack reference' : 'Reference'}</span><span>{order.reference}</span></div>
        <div className="summary-row"><span>Ship to</span><span>{order.details.line1}, {order.details.city}</span></div>
        <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '8px 0' }} />
        {order.items.map((i) => (
          <div className="summary-row" key={`${i.productId}${i.size}${i.color}`}>
            <span>{i.qty} × {i.name} <span className="muted">({i.color}, {i.size})</span></span>
            <span>{format(i.price * i.qty)}</span>
          </div>
        ))}
        {order.discount > 0 && (
          <div className="summary-row" style={{ color: 'var(--green)' }}><span>Discount ({order.code})</span><span>−{format(order.discount)}</span></div>
        )}
        <div className="summary-row"><span>Shipping</span><span>{order.shipping.cost ? format(order.shipping.cost) : 'Free'}</span></div>
        <div className="summary-row total"><span>Total</span><span>{format(order.total)}</span></div>
        {paid && !isNaira && <p className="fx-note">Charged by Paystack: {formatNGN(order.total)}</p>}
      </div>

      <div className="hero-actions" style={{ justifyContent: 'center' }}>
        <Link to="/orders" className="btn btn-dark">Track this order</Link>
        <Link to="/shop" className="btn btn-light">Keep shopping</Link>
      </div>
    </div>
  );
}
