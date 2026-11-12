import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { COUNTRIES, detectCountry } from '../data/currencies';
import { EMAIL_RE, PASS_RE } from '../utils/helpers';
import { AuthArt } from './Login';

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like you@example.com.';
  if (!PASS_RE.test(f.password)) e.password = 'Use 8 or more characters with letters and numbers.';
  if (f.confirm !== f.password) e.confirm = "Passwords don't match.";
  if (!f.terms) e.terms = 'Accept the terms to create your account.';
  return e;
}

export default function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', country: detectCountry(), password: '', confirm: '', terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setLoading(true);
    try {
      const user = await signup(form);
      showToast(`Welcome to TEE ESSENTIALS, ${user.name.split(' ')[0]}. Use WELCOME10 for 10% off.`, 'success');
      navigate('/shop', { replace: true });
    } catch (err) {
      setErrors({ email: err.message });
      setLoading(false);
    }
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
    <div className="auth">
      <AuthArt title="Your everyday, upgraded." text="Create an account to save favourites, check out faster and track every order." />
      <section className="auth-panel">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Takes under a minute.</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {field('name', 'Full name', { autoComplete: 'name', placeholder: 'Adaeze Okafor' })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}

            <div className="field">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" value={form.country} onChange={handleChange}>
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              <span className="muted" style={{ fontSize: '0.8rem' }}>
                Used for delivery. Prices show in US dollars; switch currency from the header any time.
              </span>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input id="password" name="password" type={showPass ? 'text' : 'password'}
                  autoComplete="new-password" placeholder="At least 8 characters"
                  value={form.password} onChange={handleChange}
                  className={errors.password ? 'invalid' : ''} aria-invalid={!!errors.password} />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {field('confirm', 'Confirm password', { type: showPass ? 'text' : 'password', autoComplete: 'new-password' })}

            <label className="check-row">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              I agree to the terms and privacy policy
            </label>
            {errors.terms && <span className="field-error">{errors.terms}</span>}

            <button className="btn btn-dark btn-block" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </section>
    </div>
  );
}
