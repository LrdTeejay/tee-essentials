import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { SHIPPING, getStock } from '../data/products';
import ProductImage from './ProductImage';

export default function BagDrawer() {
  const { lines, totals, setQty, removeLine, bagOpen, setBagOpen, code } = useShop();
  const { format } = useCurrency();
  const navigate = useNavigate();
  const close = () => setBagOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setBagOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setBagOpen]);

  const toFree = Math.max(0, SHIPPING.freeFrom - totals.afterDiscount);
  const progress = Math.min(100, (totals.afterDiscount / SHIPPING.freeFrom) * 100);

  return (
    <>
      {bagOpen && <div className="drawer-overlay" onClick={close} />}
      <aside className={`drawer ${bagOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!bagOpen}>
        <div className="drawer-head">
          <h2>Your bag ({totals.count})</h2>
          <button className="icon-btn" onClick={close} aria-label="Close bag">✕</button>
        </div>

        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty">
              <h2>Your bag is empty</h2>
              <p>Add something you love and it will wait here for you.</p>
              <button className="btn btn-dark" onClick={() => { close(); navigate('/shop'); }}>Start shopping</button>
            </div>
          ) : (
            <>
              <div className="ship-progress">
                <span>
                  {toFree > 0
                    ? <>Spend <strong>{format(toFree)}</strong> more for free Nigerian delivery.</>
                    : <>You've unlocked <strong>free Nigerian delivery</strong>.</>}
                </span>
                <div className="bar"><span style={{ width: `${progress}%` }} /></div>
              </div>

              {lines.map((l) => {
                const max = getStock(l.product, l.size, l.color);
                return (
                  <div className="bag-line" key={l.lineId}>
                    <div className="bag-thumb"><ProductImage product={l.product} /></div>
                    <div className="bag-info">
                      <Link to={`/product/${l.productId}`} onClick={close}><strong>{l.product.name}</strong></Link>
                      <span className="muted">{l.color}{l.size !== 'One size' ? `, size ${l.size}` : ''}</span>
                      <span>{format(l.product.price)}</span>
                      <div className="qty" style={{ justifySelf: 'start', marginTop: 4 }}>
                        <button onClick={() => setQty(l.lineId, l.qty - 1)} aria-label="Decrease quantity">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.lineId, l.qty + 1)} disabled={l.qty >= max} aria-label="Increase quantity">+</button>
                      </div>
                    </div>
                    <div className="bag-right">
                      <strong>{format(l.product.price * l.qty)}</strong>
                      <button className="btn-ghost" style={{ fontSize: '0.8rem', padding: 0 }} onClick={() => removeLine(l.lineId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="summary-row"><span>Subtotal</span><span>{format(totals.subtotal)}</span></div>
            {totals.discount > 0 && (
              <div className="summary-row" style={{ color: 'var(--green)' }}>
                <span>Discount ({code})</span><span>−{format(totals.discount)}</span>
              </div>
            )}
            <p className="muted" style={{ fontSize: '0.85rem' }}>Shipping and discount codes are added at checkout.</p>
            <button className="btn btn-dark btn-block" onClick={() => { close(); navigate('/checkout'); }}>Checkout</button>
            <button className="btn btn-ghost" onClick={close}>Continue shopping</button>
          </div>
        )}
      </aside>
    </>
  );
}
