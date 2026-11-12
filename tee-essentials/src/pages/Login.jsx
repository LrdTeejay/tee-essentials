import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function AuthArt({ title, text }) {
  return (
    <section className="auth-art adire" style={{ '--tone': '#1f2a44' }}>
      <Link to="/" className="logo">TEE ESSENTIALS</Link>
      <div>
        <h2>{title}</h2>
        <p style={{ marginTop: 12, maxWidth: '36ch', opacity: 0.9 }}>{text}</p>
      </div>
      <small style={{ opacity: 0.75 }}>Unisex essentials. Shipped worldwide.</small>
    </section>
  );
}

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Enter your email and password.');
    setLoading(true);
    try {
      const user = await login(form);
      showToast(`Welcome back, ${user.name.split(' ')[0]}`, 'success');
      navigate(location.state?.from || '/shop', { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="auth">
      <AuthArt title="Welcome back." text="Your bag, wishlist and orders are waiting for you." />
      <section className="auth-panel">
        <div className="auth-card">
          <h1 className="auth-title">Log in</h1>
          <p className="auth-sub">Use the email you signed up with.</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email"
                value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input id="password" name="password" type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" value={form.password} onChange={handleChange} />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="auth-row">
              <label className="check-row">
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                Remember me
              </label>
              <button type="button" className="link-btn"
                onClick={() => showToast('Password reset needs an email server. In this demo, create a new account instead.')}>
                Forgot password?
              </button>
            </div>
            <button className="btn btn-dark btn-block" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="auth-switch">New to TEE ESSENTIALS? <Link to="/signup">Create an account</Link></p>
        </div>
      </section>
    </div>
  );
}
