import { useState } from 'react';
import { loginAdmin } from './api';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginAdmin(email, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Login gagal. Cek email dan password.');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-identity">
        <div className="admin-login-ring" />
        <div className="admin-login-ring" />
        <div className="admin-login-ring" />
        <div className="admin-login-identity-inner">
          <h1>Edupongo CMS</h1>
          <p>Kelola konten website sekolah dari satu tempat.</p>
        </div>
      </div>
      <div className="admin-login-form-wrap">
        <div className="admin-login-card">
          <h2>Masuk</h2>
          <p>Masuk untuk mengelola konten website</p>
          {error && <div className="admin-alert admin-alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="admin-field">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@edupongo.com" />
            </div>
            <div className="admin-field">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-block" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
          <a href="/" className="admin-back-link">← Kembali ke Website</a>
        </div>
      </div>
    </div>
  );
}
