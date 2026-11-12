import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { totalStock } from '../data/products';
import ProductImage from './ProductImage';
import Price from './Price';

export default function ProductCard({ product, onQuickView }) {
  const { user } = useAuth();
  const { isWished, toggleWish } = useShop();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const stock = totalStock(product);
  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  const wished = user && isWished(product.id);

  function needAccount(message) {
    showToast(message);
    navigate('/signup');
  }

  function handleHeart() {
    if (!user) return needAccount('Create an account to save favourites.');
    toggleWish(product.id);
    showToast(wished ? 'Removed from wishlist' : 'Saved to wishlist', 'success');
  }

  function handleQuick() {
    if (!user) return needAccount('Create an account to start shopping.');
    if (onQuickView) onQuickView(product);
    else navigate(`/product/${product.id}`);
  }

  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <ProductImage product={product} />
        </Link>
        <div className="pcard-badges">
          {stock === 0 && <span className="badge out">Sold out</span>}
          {off > 0 && <span className="badge sale">−{off}%</span>}
          {product.isNew && <span className="badge new">New</span>}
        </div>
        <button className={`heart ${wished ? 'on' : ''}`} onClick={handleHeart}
          aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={!!wished}>
          {wished ? '♥' : '♡'}
        </button>
        {stock > 0 && <button className="quick-btn" onClick={handleQuick}>Quick add</button>}
      </div>
      <Link to={`/product/${product.id}`} className="pcard-name">{product.name}</Link>
      <div className="pcard-meta">
        <Price ngn={product.price} compareAt={product.compareAt} />
        <span className="dots" aria-label={`${product.colors.length} colours`}>
          {product.colors.map((c) => <span key={c.name} className="dot" style={{ background: c.hex }} title={c.name} />)}
        </span>
      </div>
    </article>
  );
}
