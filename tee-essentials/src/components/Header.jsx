import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { COLLECTIONS, SHIPPING } from '../data/products';
import { initials } from '../utils/helpers';
import CurrencySelect from './CurrencySelect';

export default function Header() {
  const { user } = useAuth();
  const { totals, wishlist, setBagOpen } = useShop();
  const { format } = useCurrency();
  const { search } = useLocation();
  const activeCollection = new URLSearchParams(search).get('collection');

  return (
    <>
      <p className="announce">
        Free delivery in Nigeria on orders over {format(SHIPPING.freeFrom)}. We ship worldwide.
      </p>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo" aria-label="TEE ESSENTIALS home">TEE ESSENTIALS</Link>

          <nav className="nav" aria-label="Collections">
            <NavLink to="/shop" end className={({ isActive }) => (isActive && !activeCollection ? 'active' : '')}>Shop all</NavLink>
            {COLLECTIONS.map((c) => (
              <Link key={c.id} to={`/shop?collection=${c.id}`}
                className={activeCollection === c.id ? 'active' : ''}>
                {c.name}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <CurrencySelect />
            {user ? (
              <>
                <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
                  ♡{wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
                </Link>
                <Link to="/account" className="icon-btn" aria-label="Your account" title={user.name}
                  style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  {initials(user.name)}
                </Link>
                <button className="icon-btn" onClick={() => setBagOpen(true)} aria-label={`Bag, ${totals.count} items`}>
                  👜{totals.count > 0 && <span className="count">{totals.count}</span>}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                <Link to="/signup" className="btn btn-dark btn-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
