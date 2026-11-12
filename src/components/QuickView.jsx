import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { getStock } from '../data/products';
import ProductImage from './ProductImage';
import Price from './Price';

export function stockMessage(stock) {
  if (stock === 0) return { text: 'Sold out in this size and colour', cls: 'out' };
  if (stock <= 3) return { text: `Only ${stock} left`, cls: 'low' };
  return { text: 'In stock, ready to ship', cls: 'in' };
}

export default function QuickView({ product, onClose }) {
  const { addToBag, setBagOpen } = useShop();
  const { showToast } = useToast();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // A one-size product needs no size choice
  const chosenSize = product.sizes.length === 1 ? product.sizes[0] : size;
  const stock = chosenSize ? getStock(product, chosenSize, color) : null;
  const msg = stock === null ? null : stockMessage(stock);

  function handleAdd() {
    if (!chosenSize) return showToast('Choose a size first.', 'error');
    const result = addToBag(product.id, chosenSize, color, 1);
    if (!result.ok) return showToast(result.message, 'error');
    showToast(`${product.name} added to your bag`, 'success');
    onClose();
    setBagOpen(true);
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="qv-title" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="quickview">
          <div className="quickview-media"><ProductImage product={product} /></div>
          <div className="quickview-info">
            <h2 id="qv-title">{product.name}</h2>
            <Price ngn={product.price} compareAt={product.compareAt} />

            <div>
              <p className="option-label"><span>Colour</span><span className="muted">{color}</span></p>
              <div className="swatches">
                {product.colors.map((c) => (
                  <button key={c.name} className={`swatch ${color === c.name ? 'on' : ''}`}
                    style={{ background: c.hex }} onClick={() => setColor(c.name)}
                    aria-label={c.name} aria-pressed={color === c.name} />
                ))}
              </div>
            </div>

            {product.sizes.length > 1 && (
              <div>
                <p className="option-label"><span>Size</span></p>
                <div className="chips">
                  {product.sizes.map((s) => (
                    <button key={s} className={`chip ${size === s ? 'on' : ''}`} onClick={() => setSize(s)}
                      disabled={getStock(product, s, color) === 0} aria-pressed={size === s}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msg && <p className={`stock ${msg.cls}`}>{msg.text}</p>}

            <button className="btn btn-dark btn-block" onClick={handleAdd} disabled={stock === 0}>
              {chosenSize ? 'Add to bag' : 'Choose a size'}
            </button>
            <Link to={`/product/${product.id}`} className="link-btn" onClick={onClose}>View full details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
