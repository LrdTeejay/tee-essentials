import { useState } from 'react';

// Real photo when the file exists; a soft placeholder when it doesn't (or fails to load)
export default function ProductImage({ product, index = 0 }) {
  const [failed, setFailed] = useState(false);
  const src = product.images?.[index];

  if (src && !failed) {
    return <img className="pimg" src={src} alt={product.name} loading="lazy" onError={() => setFailed(true)} />;
  }
  return (
    <div className="pimg-fallback adire" role="img" aria-label={product.name}
      style={{ '--tone': product.tone, filter: index ? `brightness(${1 - index * 0.04})` : undefined }}>
      <span>{product.emoji}</span>
    </div>
  );
}
