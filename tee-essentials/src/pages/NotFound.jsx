import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page container center">
      <h1>This page doesn't exist</h1>
      <p className="muted">Check the address, or head back to the shop.</p>
      <Link to="/" className="btn btn-dark">Go to the homepage</Link>
    </div>
  );
}
