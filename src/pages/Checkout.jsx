import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { COUNTRIES } from '../data/currencies';
import { SHIPPING } from '../data/products';
import { uid } from '../utils/helpers';
import ProductImage from '../components/ProductImage';

// Trim spaces and stray quotes from the key (fixes "Please enter a valid Key")
const PAYSTACK_KEY = (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim().replace(/^["']|["']$/g, '');

export default function Checkout() {
  const { user, updateProfile } = useAuth();
  const { lines, totals, code, applyCode, removeCode, placeOrder } = useShop();
  const { format, formatNGN, currency, isNaira } = useCurrency();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const placed = useRef(false);

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || '',
    line1: user.address?.line1 || '',
    city: user.address?.city || '',
    state: user.address?.state || '',
    postcode: user.address?.postcode || '',
    country: user.country || 'NG',
  });
  const [errors, setErrors] = useState({});
  const [shipId, setShipId] = useState(null);
  const [method, setMethod] = useState('paystack');
  const [codeInput, setCodeInput] = useState('');
  const [saveAddress, setSaveAddress] = useState(true);
  const [paying, setPaying] = useState(false);

  if (lines.length === 0 && !placed.current) return <Navigate to="/shop" replace />;

  // Shipping methods depend on the delivery country
  const inNigeria = form.country === 'NG';
  const shipOptions = SHIPPING.options.filter((o) => (inNigeria ? o.region === 'NG' : o.region === 'INTL'));
  const ship = shipOptions.find((o) => o.id === shipId) || shipOptions[0];
  const freeShip = ship.id === 'standard-ng' && totals.afterDiscount >= SHIPPING.freeFrom;
  const shipCost = freeShip ? 0 : ship.price;
  const total = totals.afterDiscount + shipCost;
  const payMethod = inNigeria ? method : 'paystack'; // pay on delivery is Nigeria only

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter the full name for delivery.';
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a phone number the courier can call.';
    if (form.line1.trim().length < 5) e.line1 = 'Enter a house number and street.';
    if (form.city.trim().length < 2) e.city = 'Enter a town or city.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCode(e) {
    e.preventDefault();
    const result = applyCode(codeInput);
    showToast(result.message, result.ok ? 'success' : 'error');
    if (result.ok) setCodeInput('');
  }

  function finishOrder(reference) {
    placed.current = true;
    if (saveAddress) {
      updateProfile({
        phone: form.phone.trim(),
        address: { line1: form.line1.trim(), city: form.city.trim(), state: form.state.trim(), postcode: form.postcode.trim() },
      });
    }
    const order = placeOrder({
      shipping: { id: ship.id, label: ship.label, eta: ship.eta, cost: shipCost },
      details: { ...form, email: user.email },
      reference,
      method: payMethod,
      displayCurrency: currency,
    });
    navigate(`/order/${order.id}`, { replace: true });
  }

  function payWithPaystack() {
    if (!window.PaystackPop) {
      return showToast('Payment could not load. Check your connection, turn off ad blockers and refresh.', 'error');
    }
    if (!PAYSTACK_KEY.startsWith('pk_')) {
      return showToast('Paystack key missing. Add VITE_PAYSTACK_PUBLIC_KEY (see README).', 'error');
    }
    setPaying(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: user.email,
      amount: Math.round(total * 100), // naira -> kobo
      currency: 'NGN',
      ref: uid('TEEPAY-'),
      metadata: {
        custom_fields: [
          { display_name: 'Customer', variable_name: 'customer', value: form.name },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone },
          { display_name: 'Ship to', variable_name: 'ship_to', value: `${form.city}, ${form.country}` },
          { display_name: 'Items', variable_name: 'items', value: String(totals.count) },
        ],
      },
      // Plain functions: Paystack expects regular callbacks, not async ones
      callback: function (response) {
        showToast('Payment received. Thank you!', 'success');
        finishOrder(response.reference);
      },
      onClose: function () {
        setPaying(false);
        showToast('Payment window closed. Nothing was charged and your bag is saved.');
      },
    });
    handler.openIframe();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return showToast('Check the highlighted fields.', 'error');
    if (payMethod === 'paystack') payWithPaystack();
    else finishOrder(uid('POD-'));
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={form[name]} onChange={handleChange}
        className={errors[name] ? 'invalid' : ''} aria-invalid={!!errors[name]} {...props} />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="page container">
      <Link to="/shop" className="muted">← Continue shopping</Link>
      <h1 className="page-title" style={{ marginTop: 10 }}>Checkout</h1>

      <form className="checkout" onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gap: 20 }}>
          <section className="panel">
            <h2>Delivery details</h2>
            <div className="form">
              <div className="row-2">
                {field('name', 'Full name', { autoComplete: 'name' })}
                {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+234 803 123 4567' })}
              </div>
              {field('line1', 'Address', { autoComplete: 'address-line1', placeholder: 'House number and street' })}
              <div className="row-2">
                {field('city', 'Town or city', { autoComplete: 'address-level2' })}
                {field('state', 'State or region', { autoComplete: 'address-level1' })}
              </div>
              <div className="row-2">
                {field('postcode', 'Postcode (optional)', { autoComplete: 'postal-code' })}
                <div className="field">
                  <label htmlFor="country">Country</label>
                  <select id="country" name="country" value={form.country}
                    onChange={(e) => { handleChange(e); setShipId(null); }}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <label className="check-row">
                <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
                Save these details to my account
              </label>
            </div>
          </section>

          <section className="panel">
            <h2>Shipping method</h2>
            <div className="ship-options">
              {shipOptions.map((o) => {
                const free = o.id === 'standard-ng' && totals.afterDiscount >= SHIPPING.freeFrom;
                return (
                  <button type="button" key={o.id} className={`ship-option ${ship.id === o.id ? 'on' : ''}`}
                    onClick={() => setShipId(o.id)} aria-pressed={ship.id === o.id}>
                    <span><strong>{o.label}</strong><br /><span className="muted">{o.eta}</span></span>
                    <strong>{free ? 'Free' : format(o.price)}</strong>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="panel">
            <h2>Payment</h2>
            <div className="ship-options">
              <button type="button" className={`ship-option ${payMethod === 'paystack' ? 'on' : ''}`}
                onClick={() => setMethod('paystack')} aria-pressed={payMethod === 'paystack'}>
                <span><strong>Pay now with Paystack</strong><br /><span className="muted">Card, bank transfer or USSD</span></span>
                <span>🔒</span>
              </button>
              {inNigeria && (
                <button type="button" className={`ship-option ${payMethod === 'delivery' ? 'on' : ''}`}
                  onClick={() => setMethod('delivery')} aria-pressed={payMethod === 'delivery'}>
                  <span><strong>Pay on delivery</strong><br /><span className="muted">Cash or transfer to the courier (Nigeria only)</span></span>
                  <span>💵</span>
                </button>
              )}
            </div>
          </section>
        </div>

        <aside className="panel sticky">
          <h2>Order summary</h2>
          {lines.map((l) => (
            <div className="summary-item" key={l.lineId}>
              <div className="bag-thumb"><ProductImage product={l.product} /></div>
              <span>
                {l.product.name}<br />
                <span className="muted">{l.color}{l.size !== 'One size' ? `, ${l.size}` : ''} × {l.qty}</span>
              </span>
              <span>{format(l.product.price * l.qty)}</span>
            </div>
          ))}

          {code ? (
            <p className="summary-row" style={{ margin: '14px 0', color: 'var(--green)' }}>
              <span>Code {code} applied</span>
              <button type="button" className="link-btn" onClick={removeCode}>Remove</button>
            </p>
          ) : (
            <div className="discount-row">
              <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Discount code"
                aria-label="Discount code" />
              <button type="button" className="btn btn-light btn-sm" onClick={handleCode} disabled={!codeInput.trim()}>
                Apply
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gap: 8 }}>
            <div className="summary-row"><span>Subtotal</span><span>{format(totals.subtotal)}</span></div>
            {totals.discount > 0 && (
              <div className="summary-row" style={{ color: 'var(--green)' }}><span>Discount</span><span>−{format(totals.discount)}</span></div>
            )}
            <div className="summary-row"><span>Shipping ({ship.label})</span><span>{shipCost ? format(shipCost) : 'Free'}</span></div>
            <div className="summary-row total"><span>Total</span><span>{format(total)}</span></div>
            {!isNaira && payMethod === 'paystack' && (
              <p className="fx-note">
                Paystack charges in naira: <strong>{formatNGN(total)}</strong>. Your bank converts this to {currency}, so the final amount may differ slightly.
              </p>
            )}
            <button className="btn btn-dark btn-block" disabled={paying} style={{ marginTop: 6 }}>
              {paying ? 'Waiting for payment…' : payMethod === 'paystack' ? `Pay ${format(total)}` : 'Place order'}
            </button>
            <p className="muted" style={{ fontSize: '0.8rem', textAlign: 'center' }}>
              Secured by Paystack. We never see or store your card details.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
