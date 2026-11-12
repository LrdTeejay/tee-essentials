import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { COLLECTIONS, PRODUCTS, SHIPPING, unsplash } from '../data/products';
import { EMAIL_RE } from '../utils/helpers';
import { load, save } from '../utils/storage';
import ProductCard from '../components/ProductCard';

// A real photo that quietly hides itself if the file isn't there yet,
// leaving the tile's soft placeholder background in its place
function Photo({ src, className = 'pimg' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img className={className} src={src} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

const HERO = [
  { src: unsplash('1774413768903-057eb084133b', 1000, 1400), label: 'Varsity Bomber Jacket', tone: '#1f2a44' },
  { src: unsplash('1595950653106-6c9ebd614d3a', 900, 700), label: 'Retro Runner Sneakers', tone: '#9a9aa0' },
  { src: unsplash('1760013531865-89ff324f83a6', 900, 700), label: 'Chunky Knit Cardigan', tone: '#7a6450' },
];

const REVIEWS = [
  { name: 'Tolu, London', text: 'The heavyweight tee is the best basic I own. Ordered XXL for an oversized fit and it is perfect.' },
  { name: 'Kwame, Accra', text: 'Switching the prices to cedis made it easy. The leather palms are stitched properly, not glued.' },
  { name: 'Ngozi, Lagos', text: 'Cardigan and cobblers arrived in two days. My partner keeps stealing the cardigan, so unisex is right.' },
];

export default function Landing() {
  const { user } = useAuth();
  const { format, currency } = useCurrency();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const newDrops = PRODUCTS.filter((x) => x.isNew).slice(0, 4);
  const shoeWall = ['low-top-sneakers', 'leather-cobblers', 'leather-palms', 'slide-slippers']
    .map((id) => PRODUCTS.find((x) => x.id === id));
  const startLink = user ? '/shop' : '/signup';
  const promises = [
    'Prices in US dollars, switchable',
    `Free Nigerian delivery over ${format(SHIPPING.freeFrom)}`,
    'Unisex sizes S to XXXL',
    'Shoes EU 39 to 46',
    '14-day free returns',
    'Pay safely with Paystack',
  ];

  function scrollToCollections() {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  }

  function subscribe(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) return showToast('Enter a valid email address.', 'error');
    const list = load('tee_newsletter', []);
    save('tee_newsletter', [...new Set([...list, email.trim().toLowerCase()])]);
    setEmail('');
    showToast("You're on the list. Your 10% code is WELCOME10.", 'success');
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Everyday essentials, made for everybody.</h1>
          <p>
            Designer tees, cardigans, sneakers, palms, bags and caps. Unisex sizes from S to XXXL,
            shown in US dollars by default and delivered to your door.
          </p>
          <div className="hero-actions">
            <Link to={startLink} className="btn btn-dark">{user ? 'Shop the collection' : 'Start shopping'}</Link>
            <button className="btn btn-light" onClick={scrollToCollections}>Browse collections</button>
          </div>
          <p style={{ fontSize: '0.9rem' }}>Showing prices in {currency}. Switch currency any time from the header.</p>
        </div>
        <div className="hero-art">
          {HERO.map((h) => (
            <div key={h.src} className="hero-tile adire" style={{ '--tone': h.tone }}>
              <Photo src={h.src} />
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Store promises strip (repeated twice so the loop is seamless) */}
      <div className="marquee" aria-label={promises.join(', ')}>
        <div className="marquee-track" aria-hidden="true">
          {[...promises, ...promises].map((m, i) => <span key={i}>✦ {m}</span>)}
        </div>
      </div>

      {/* Collections */}
      <section className="section container" id="collections">
        <div className="section-head">
          <h2>Shop by collection</h2>
          <Link to="/shop">View everything</Link>
        </div>
        <div className="collections-grid">
          {COLLECTIONS.map((c) => (
            <Link key={c.id} to={`/shop?collection=${c.id}`} className="collection-tile adire" style={{ '--tone': c.tone }}>
              <Photo src={unsplash(c.cover, 700, 940)} className="pimg tile-photo" />
              <div className="tile-text">
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New drops */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>New drops</h2>
          <Link to="/shop?sort=new">See all new</Link>
        </div>
        <div className="product-grid">
          {newDrops.map((x) => <ProductCard key={x.id} product={x} />)}
        </div>
      </section>

      {/* Shoe wall */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>The shoe wall</h2>
          <Link to="/shop?collection=shoes">All shoes</Link>
        </div>
        <div className="product-grid">
          {shoeWall.map((x) => <ProductCard key={x.id} product={x} />)}
        </div>
      </section>

      {/* Lookbook */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="lookbook">
          <div className="lookbook-art adire" style={{ '--tone': '#1b1b1f', position: 'relative' }}>
            <Photo src={unsplash('1544022613-e87ca75a784a', 1000, 1100)} />
          </div>
          <div className="lookbook-text">
            <blockquote>“Built for heat, traffic and late nights. Every piece is unisex, so the best fit is the one you choose.”</blockquote>
            <p className="muted">The TEE ESSENTIALS design team, Lagos</p>
            <Link to={user ? '/shop?collection=knitwear' : '/signup'} className="btn btn-dark" style={{ justifySelf: 'start', alignSelf: 'start' }}>
              Shop the lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* Reasons to buy */}
      <section className="container values">
        <div className="value">
          <strong>Prices in {currency}</strong>
          <span className="muted">Shown in US dollars by default; switch to naira, pounds, euros and more from the header.</span>
        </div>
        <div className="value">
          <strong>Pay safely with Paystack</strong>
          <span className="muted">Card, bank transfer or USSD. We never see your card details.</span>
        </div>
        <div className="value">
          <strong>14-day free returns</strong>
          <span className="muted">Wrong size? Send it back unworn within 14 days for a refund or exchange.</span>
        </div>
      </section>

      {/* Reviews */}
      <section className="section container">
        <div className="section-head"><h2>Worn around the world</h2></div>
        <div className="reviews">
          {REVIEWS.map((r) => (
            <figure className="review" key={r.name}>
              <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote>{r.text}</blockquote>
              <figcaption className="muted">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container" style={{ paddingBottom: 72 }}>
        <div className="newsletter">
          <div>
            <h2>Get 10% off your first order</h2>
            <p style={{ opacity: 0.85, marginTop: 8 }}>New drops, restocks and styling ideas. One email a fortnight.</p>
          </div>
          <form onSubmit={subscribe} noValidate>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
            <button className="btn">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
