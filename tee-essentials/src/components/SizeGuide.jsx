import { useEffect } from 'react';
import { SHOE_SIZE_GUIDE, SIZE_GUIDE } from '../data/products';

// type = 'clothing' (S to XXXL) or 'shoes' (EU 39 to 46)
export default function SizeGuide({ onClose, type = 'clothing' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const shoes = type === 'shoes';

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal small" role="dialog" aria-modal="true" aria-labelledby="sg-title" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 id="sg-title">{shoes ? 'Shoe size guide' : 'Clothing size guide'}</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          {shoes
            ? 'EU sizes with UK and US equivalents. Brands vary by about half a size.'
            : 'Unisex body measurements in centimetres. Between sizes? Size up for a relaxed fit.'}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="size-table">
            {shoes ? (
              <>
                <thead><tr><th>EU</th><th>UK</th><th>US</th><th>Foot length (cm)</th></tr></thead>
                <tbody>
                  {SHOE_SIZE_GUIDE.map((r) => (
                    <tr key={r.eu}><td><strong>{r.eu}</strong></td><td>{r.uk}</td><td>{r.us}</td><td>{r.cm}</td></tr>
                  ))}
                </tbody>
              </>
            ) : (
              <>
                <thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>UK/US chest (in)</th></tr></thead>
                <tbody>
                  {SIZE_GUIDE.map((r) => (
                    <tr key={r.size}><td><strong>{r.size}</strong></td><td>{r.chest}</td><td>{r.waist}</td><td>{r.ukus}</td></tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
        <p className="muted" style={{ marginTop: 14, fontSize: '0.88rem' }}>
          {shoes
            ? 'How to measure: stand on paper, mark your heel and longest toe, then measure the distance between the marks.'
            : 'How to measure: chest at the fullest point and waist at the narrowest point, with the tape level and snug but not tight.'}
        </p>
      </div>
    </div>
  );
}
