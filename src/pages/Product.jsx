import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { COLLECTIONS, PRODUCTS, SHIPPING, getProduct, getStock } from '../data/products';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import Price from '../components/Price';
import SizeGuide from '../components/SizeGuide';
import { stockMessage } from '../components/QuickView';

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToBag, setBagOpen, isWished, toggleWish, addViewed } = useShop();
  const { format } = useCurrency();
  const { showToast } = useToast();

  const [image, setImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0].name);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  // Reset choices and record the view whenever a different product opens
  useEffect(() => {
    if (!product) return;
    setImage(0);
    setColor(product.colors[0].name);
    setSize(null);
    setQty(1);
    addViewed(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <div className="page container center">
        <h1>We can't find that product</h1>
        <p className="muted">It may have sold out for good or the link is wrong.</p>
        <Link to="/shop" className="btn btn-dark">Back to the shop</Link>
      </div>
    );
  }

  const chosenSize = product.sizes.length === 1 ? product.sizes[0] : size;
  const stock = chosenSize ? getStock(product, chosenSize, color) : null;
  const msg = stock === null ? null : stockMessage(stock);
  const wished = isWished(product.id);
  const imageCount = Math.max(product.images.length, 1);
  const collection = COLLECTIONS.find((c) => c.id === product.collection);
  const related = PRODUCTS.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  function handleAdd() {
    if (!chosenSize) return showToast('Choose a size first.', 'error');
    const result = addToBag(product.id, chosenSize, color, qty);
    if (!result.ok) return showToast(result.message, 'error');
    showToast(`${qty} × ${product.name} added to your bag`, 'success');
    setBagOpen(true);
  }

  function handleWish() {
    toggleWish(product.id);
    showToast(wished ? 'Removed from wishlist' : 'Saved to wishlist', 'success');
  }

  return (
    <div className="page container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/shop?collection=${collection.id}`}>{collection.name}</Link> / {product.name}
      </nav>

      <div className="pdp">
        <div className="gallery">
          <div className="thumbs">
            {Array.from({ length: imageCount }, (_, i) => (
              <button key={i} className={`thumb ${image === i ? 'on' : ''}`} onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}>
                <ProductImage product={product} index={i} />
              </button>
            ))}
          </div>
          <div className="gallery-main"><ProductImage key={`${product.id}-${image}`} product={product} index={image} /></div>
        </div>

        <div className="pdp-info">
          <div>
            <h1>{product.name}</h1>
            <p className="muted" style={{ marginTop: 8 }}>
              <span className="stars">{'★'.repeat(Math.round(product.rating))}</span> {product.rating} ({product.reviews} reviews)
            </p>
          </div>

          <div>
            <Price ngn={product.price} compareAt={product.compareAt} />
            {product.compareAt && (
              <p className="stock low" style={{ marginTop: 4 }}>You save {format(product.compareAt - product.price)}</p>
            )}
          </div>

          <div>
            <p className="option-label"><span>Colour</span><span className="muted">{color}</span></p>
            <div className="swatches">
              {product.colors.map((c) => (
                <button key={c.name} className={`swatch ${color === c.name ? 'on' : ''}`} style={{ background: c.hex }}
                  onClick={() => { setColor(c.name); setQty(1); }} aria-label={c.name} aria-pressed={color === c.name} />
              ))}
            </div>
          </div>

          {product.sizes.length > 1 && (
            <div>
              <p className="option-label">
                <span>Size</span>
                <button className="link-btn" onClick={() => setGuideOpen(true)}>Size guide</button>
              </p>
              <div className="chips">
                {product.sizes.map((s) => (
                  <button key={s} className={`chip ${size === s ? 'on' : ''}`} disabled={getStock(product, s, color) === 0}
                    onClick={() => { setSize(s); setQty(1); }} aria-pressed={size === s}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {msg && <p className={`stock ${msg.cls}`}>{msg.text}</p>}

          <div className="pdp-actions">
            <div className="qty" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(stock ?? 10, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn btn-dark" onClick={handleAdd} disabled={stock === 0}>
              {stock === 0 ? 'Sold out' : chosenSize ? 'Add to bag' : 'Choose a size'}
            </button>
            <button className={`heart-btn ${wished ? 'on' : ''}`} onClick={handleWish}
              aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={wished}>
              {wished ? '♥' : '♡'}
            </button>
          </div>

          <div className="accordion">
            <details open>
              <summary>Description</summary>
              <p>{product.description}</p>
            </details>
            <details>
              <summary>Details and fit</summary>
              <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
            <details>
              <summary>Care</summary>
              <p>{product.care}</p>
            </details>
            <details>
              <summary>Delivery and returns</summary>
              <p>
                Nigeria: {SHIPPING.options[0].eta}, free over {format(SHIPPING.freeFrom)}. International: {SHIPPING.options[2].eta} by DHL.
                Free returns within 14 days if unworn with tags attached.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section-head"><h2>You may also like</h2></div>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {guideOpen && <SizeGuide onClose={closeGuide} type={product.collection === 'shoes' ? 'shoes' : 'clothing'} />}
    </div>
  );
}
