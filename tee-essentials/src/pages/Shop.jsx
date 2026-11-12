import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { ALL_COLORS, ALL_SIZES, CATEGORIES, COLLECTIONS, MAX_PRICE, PRODUCTS, getProduct, getStock, totalStock } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  new: { label: 'Newest', fn: (a, b) => Number(b.isNew) - Number(a.isNew) },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
};

export default function Shop() {
  const { user } = useAuth();
  const { viewed } = useShop();
  const { format } = useCurrency();
  const [params, setParams] = useSearchParams();
  const collection = params.get('collection') || 'all';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);

  const setParam = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };
  const toggle = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  function clearAll() {
    setQuery(''); setCategory('All'); setSizes([]); setColors([]); setMaxPrice(MAX_PRICE); setInStockOnly(false);
    setParams({}, { replace: true });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => collection === 'all' || p.collection === collection)
      .filter((p) => category === 'All' || p.category === category)
      .filter((p) => !q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q))
      .filter((p) => p.price <= maxPrice)
      .filter((p) => !colors.length || p.colors.some((c) => colors.includes(c.name)))
      // A size matches only if it is in stock in at least one colour
      .filter((p) => !sizes.length || sizes.some((s) => p.sizes.includes(s) && p.colors.some((c) => getStock(p, s, c.name) > 0)))
      .filter((p) => !inStockOnly || totalStock(p) > 0)
      .sort(SORTS[sort].fn);
  }, [collection, category, query, maxPrice, colors, sizes, inStockOnly, sort]);

  const collectionName = COLLECTIONS.find((c) => c.id === collection)?.name;
  const recent = viewed.map(getProduct).filter(Boolean).slice(0, 4);

  return (
    <div className="page container">
      <p className="muted">Hi {user.name.split(' ')[0]}, here's what's in store today.</p>
      <h1 className="page-title">{collectionName || 'Shop all'}</h1>

      <div className="shop-layout">
        <aside className={`filters ${filtersOpen ? 'open' : ''}`} aria-label="Filters">
          <div className="filter-group">
            <h4>Collection</h4>
            <div className="filter-list">
              {[{ id: 'all', name: 'All' }, ...COLLECTIONS].map((c) => (
                <button key={c.id} className={collection === c.id ? 'on' : ''}
                  onClick={() => setParam('collection', c.id, 'all')}>{c.name}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-list">
              {CATEGORIES.map((c) => (
                <button key={c} className={category === c ? 'on' : ''} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="chips">
              {ALL_SIZES.map((s) => (
                <button key={s} className={`chip ${sizes.includes(s) ? 'on' : ''}`}
                  onClick={() => toggle(sizes, setSizes, s)} aria-pressed={sizes.includes(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Colour</h4>
            <div className="swatches">
              {ALL_COLORS.map((c) => (
                <button key={c.name} className={`swatch ${colors.includes(c.name) ? 'on' : ''}`}
                  style={{ background: c.hex }} title={c.name} aria-label={c.name}
                  aria-pressed={colors.includes(c.name)} onClick={() => toggle(colors, setColors, c.name)} />
              ))}
            </div>
          </div>

          <div className="filter-group price-range">
            <h4>Max price: {format(maxPrice)}</h4>
            <input type="range" min={10000} max={MAX_PRICE} step={2000} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" />
          </div>

          <label className="check-row">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            In stock only
          </label>

          <button className="btn btn-light btn-sm" onClick={clearAll}>Clear all filters</button>
        </aside>

        <section>
          <div className="shop-toolbar">
            <input type="search" className="search-input" placeholder="Search sneakers, cardigans, caps…"
              value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products" />
            <div className="toolbar-right">
              <span className="muted">{results.length} {results.length === 1 ? 'item' : 'items'}</span>
              <button className="btn btn-light btn-sm filters-toggle" onClick={() => setFiltersOpen(!filtersOpen)}
                aria-expanded={filtersOpen}>
                {filtersOpen ? 'Hide filters' : 'Filters'}
              </button>
              <select className="currency-select" style={{ maxWidth: 'none' }} value={sort}
                onChange={(e) => setParam('sort', e.target.value, 'featured')} aria-label="Sort products">
                {Object.entries(SORTS).map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {results.length ? (
            <div className="product-grid">
              {results.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
            </div>
          ) : (
            <div className="empty">
              <h2>No matches</h2>
              <p>Nothing fits all these filters. Remove one, or clear them all.</p>
              <button className="btn btn-dark" onClick={clearAll}>Clear all filters</button>
            </div>
          )}

          {recent.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Recently viewed</h2>
              <div className="product-grid">
                {recent.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
              </div>
            </div>
          )}
        </section>
      </div>

      {quick && <QuickView product={quick} onClose={closeQuick} />}
    </div>
  );
}
