import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getProduct } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';

export default function Wishlist() {
  const { wishlist } = useShop();
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="page container">
      <h1 className="page-title">Wishlist</h1>
      {items.length === 0 ? (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any product to keep it here for later.</p>
          <Link to="/shop" className="btn btn-dark">Browse the shop</Link>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
        </div>
      )}
      {quick && <QuickView product={quick} onClose={closeQuick} />}
    </div>
  );
}
