import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email harus diisi';
    if (!password) newErrors.password = 'Kata sandi harus diisi';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnack({ type: 'success', message: 'Login berhasil! Selamat datang di CMS.' });
      setTimeout(() => onLogin(), 900);
    }, 1200);
  };

  return (
    <div className="admin-login">
      {/* LEFT - Brand Panel */}
      <div className="admin-login-brand">
        <div className="admin-login-gradient" />
        <div className="admin-login-ring ring-1" />
        <div className="admin-login-ring ring-2" />
        <div className="admin-login-ring ring-3" />
        <div className="admin-login-brand-inner">
          <div className="d-inline-flex align-items-center gap-3 mb-4">
            <div className="admin-logo">
              <div className="admin-logo-dot" />
            </div>
            <span className="admin-logo-text">CMS</span>
          </div>
          <h1 className="admin-brand-title">Content Management System</h1>
          <p className="admin-brand-desc">
            Kelola semua konten website anda dari satu tempat. Aman, cepat, dan mudah.
          </p>
        </div>
      </div>

      {/* RIGHT - Form Panel */}
      <div className="admin-login-form-wrap">
        <div className="admin-login-card">
          <h2 className="admin-card-title">
            Selamat datang di content management system
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="admin-label">
                Email <span className="text-danger">*</span>
              </label>
              <div className="admin-input-wrap">
                <input
                  type="email"
                  className={`admin-input${errors.email ? ' admin-input-error' : ''}`}
                  placeholder="admin@cms.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                />
                {email && (
                  <button type="button" className="admin-input-icon" onClick={() => setEmail('')} tabIndex={-1}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </button>
                )}
              </div>
              {errors.email && <small className="admin-error-text">{errors.email}</small>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="admin-label">
                Kata Sandi <span className="text-danger">*</span>
              </label>
              <div className="admin-input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`admin-input${errors.password ? ' admin-input-error' : ''}`}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                />
                <button type="button" className="admin-input-icon" onClick={() => setShowPass((s) => !s)} tabIndex={-1}>
                  {showPass ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <small className="admin-error-text">{errors.password}</small>}
            </div>

            {/* Submit */}
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
              Masuk
            </button>
          </form>

          <div className="admin-card-footer">
            Powered by <strong>inagata</strong>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {snack && (
        <div className={`admin-snackbar admin-snackbar-${snack.type}`}>
          {snack.message}
        </div>
      )}
    </div>
  );
}
