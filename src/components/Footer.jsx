import { Link } from 'react-router-dom';
import { COLLECTIONS } from '../data/products';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="logo">TEE ESSENTIALS</p>
          <p style={{ marginTop: 12, maxWidth: '34ch' }}>
            Unisex designer clothing, sneakers, bags and caps. Everyday essentials, shipped to your door wherever you are.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            {COLLECTIONS.map((c) => (
              <li key={c.id}><Link to={`/shop?collection=${c.id}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li>Delivery: 1–9 working days</li>
            <li>Free returns within 14 days</li>
            <li>hello@teeessentials.example</li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li><Link to="/account">My account</Link></li>
            <li><Link to="/orders">Track an order</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} TEE ESSENTIALS. A student project.</span>
        <span>
          Payments by Paystack. <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">Rates by Exchange Rate API</a>
        </span>
      </div>
    </footer>
  );
}
