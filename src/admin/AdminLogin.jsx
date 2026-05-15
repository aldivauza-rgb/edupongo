import { useState } from 'react';
import { loginWithEmail } from '../lib/auth';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email harus diisi';
    if (!password) newErrors.password = 'Kata sandi harus diisi';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setAuthError('');
    setLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      onLogin();
    } catch (err) {
      const msg = err.message || 'Terjadi kesalahan';
      if (msg.includes('Invalid login credentials')) {
        setAuthError('Email atau kata sandi salah.');
      } else if (msg.includes('Email not confirmed')) {
        setAuthError('Email belum dikonfirmasi. Cek inbox email Anda.');
      } else if (msg.includes('rate limit')) {
        setAuthError('Terlalu banyak percobaan. Coba lagi beberapa saat.');
      } else {
        setAuthError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* LEFT — Brand Panel */}
      <div className="admin-login-brand">
        <div className="admin-login-gradient" />
        <div className="admin-login-ring ring-1" />
        <div className="admin-login-ring ring-2" />
        <div className="admin-login-brand-inner">
          <div className="admin-login-logo-wrap">
            <div className="admin-logo-circle">
              <div className="admin-logo-dot" />
            </div>
            <span className="admin-logo-cms-label">CMS</span>
          </div>
          <h1 className="admin-login-brand-title">Content Management System</h1>
          <p className="admin-login-brand-desc">
            Kelola semua konten website anda dari satu tempat. Aman, cepat, dan mudah.
          </p>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div className="admin-login-form-wrap">
        <div className="admin-login-card">
          <h2 className="admin-login-card-title">
            Selamat datang di<br />content management system
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label className="admin-label" style={{ marginBottom: 8, display: 'block' }}>
                Email <span style={{ color: '#B3202F' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  style={{
                    width: '100%', height: 48, padding: email ? '0 46px 0 16px' : '0 16px',
                    background: '#F5F6FA', border: `1px solid ${errors.email ? '#B3202F' : '#E8E9F1'}`,
                    borderRadius: 12, fontSize: 13, color: '#010E23', outline: 'none',
                    fontFamily: "'Inter', sans-serif", transition: 'border-color 0.15s',
                  }}
                  placeholder="admin@cms.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                />
                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail('')}
                    style={{
                      position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                      width: 36, height: 36, border: 'none', borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', background: 'transparent', color: '#97A2B0', padding: 0,
                    }}
                    tabIndex={-1}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </button>
                )}
              </div>
              {errors.email && (
                <small style={{ display: 'block', marginTop: 4, color: '#B3202F', fontSize: 12, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  {errors.email}
                </small>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label className="admin-label" style={{ marginBottom: 8, display: 'block' }}>
                Kata Sandi <span style={{ color: '#B3202F' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  style={{
                    width: '100%', height: 48, padding: '0 46px 0 16px',
                    background: '#F5F6FA', border: `1px solid ${errors.password ? '#B3202F' : '#E8E9F1'}`,
                    borderRadius: 12, fontSize: 13, color: '#010E23', outline: 'none',
                    fontFamily: "'Inter', sans-serif", transition: 'border-color 0.15s',
                  }}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                    width: 36, height: 36, border: 'none', borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', background: 'transparent', color: '#97A2B0', padding: 0,
                  }}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <small style={{ display: 'block', marginTop: 4, color: '#B3202F', fontSize: 12, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  {errors.password}
                </small>
              )}
            </div>

            {/* Auth Error */}
            {authError && (
              <div style={{
                padding: '10px 14px', borderRadius: 10, background: '#FEF2F2',
                border: '1px solid #FECACA', color: '#991B1B', fontSize: 13,
                fontWeight: 500, fontFamily: "'Inter', sans-serif", marginBottom: 16,
              }}>
                {authError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 48, borderRadius: 12, border: 'none',
                background: '#046CF2', color: 'white', fontWeight: 600, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1,
                fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8, transition: 'background 0.15s',
              }}
            >
              {loading && (
                <span style={{
                  width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white', borderRadius: '50%', animation: 'admSpinner 0.6s linear infinite',
                  display: 'inline-block',
                }} />
              )}
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#97A2B0', fontFamily: "'Inter', sans-serif" }}>
            Powered by <span style={{ fontWeight: 800, color: '#010E23' }}>inagata</span>
          </div>
        </div>
      </div>
    </div>
  );
}
