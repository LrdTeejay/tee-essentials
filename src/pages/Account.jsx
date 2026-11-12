import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { COUNTRIES, CURRENCIES } from '../data/currencies';
import { initials } from '../utils/helpers';
import CurrencySelect from '../components/CurrencySelect';

export default function Account() {
  const { user, updateProfile, logout } = useAuth();
  const { orders, wishlist } = useShop();
  const { format, currency, rateSource } = useCurrency();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || '',
    country: user.country || 'NG',
    line1: user.address?.line1 || '',
    city: user.address?.city || '',
    state: user.address?.state || '',
    postcode: user.address?.postcode || '',
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const spent = orders.reduce((s, o) => s + o.total, 0);

  function handleSave(e) {
    e.preventDefault();
    if (form.name.trim().length < 2) return showToast('Enter your full name.', 'error');
    const { line1, city, state, postcode, ...rest } = form;
    updateProfile({ ...rest, name: form.name.trim(), address: { line1, city, state, postcode } });
    showToast('Changes saved', 'success');
  }

  function handleLogout() {
    if (!window.confirm('Log out of TEE ESSENTIALS on this device?')) return;
    logout();
    showToast("You're logged out. See you soon.");
    navigate('/', { replace: true });
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={`a-${name}`}>{label}</label>
      <input id={`a-${name}`} name={name} value={form[name]} onChange={handleChange} {...props} />
    </div>
  );

  return (
    <div className="page container">
      <h1 className="page-title">My account</h1>
      <div className="account">
        <section className="panel">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span className="icon-btn adire" style={{ width: 56, height: 56, color: '#fff', fontWeight: 800 }}>
              {initials(user.name)}
            </span>
            <div>
              <h2 style={{ marginBottom: 2 }}>{user.name}</h2>
              <p className="muted">{user.email}</p>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><span className="muted">Orders</span><strong>{orders.length}</strong></div>
            <div className="stat"><span className="muted">Saved items</span><strong>{wishlist.length}</strong></div>
            <div className="stat" style={{ gridColumn: 'span 2' }}><span className="muted">Total spent</span><strong>{format(spent)}</strong></div>
          </div>

          <div style={{ marginTop: 22 }}>
            <p className="option-label"><span>Display currency</span><CurrencySelect /></p>
            <p className="muted" style={{ fontSize: '0.85rem' }}>
              Showing {CURRENCIES[currency].name}. {rateSource === 'live' ? 'Rates update daily.' : 'Using approximate rates until live rates load.'}
            </p>
          </div>

          <button className="btn btn-light btn-block" style={{ marginTop: 22 }} onClick={handleLogout}>Log out</button>
        </section>

        <form className="panel form" onSubmit={handleSave}>
          <h2 style={{ marginBottom: 0 }}>Personal details</h2>
          <div className="row-2">
            {field('name', 'Full name', { autoComplete: 'name' })}
            {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
          </div>
          <div className="field">
            <label htmlFor="a-country">Country</label>
            <select id="a-country" name="country" value={form.country} onChange={handleChange}>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
          <h2 style={{ margin: '8px 0 0' }}>Default delivery address</h2>
          {field('line1', 'Address', { autoComplete: 'address-line1' })}
          <div className="row-2">
            {field('city', 'Town or city', { autoComplete: 'address-level2' })}
            {field('state', 'State or region', { autoComplete: 'address-level1' })}
          </div>
          {field('postcode', 'Postcode', { autoComplete: 'postal-code' })}
          <button className="btn btn-dark" style={{ justifySelf: 'start' }}>Save changes</button>
        </form>
      </div>
    </div>
  );
}
