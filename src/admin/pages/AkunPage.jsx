import { useState } from 'react';

function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  );
}
const I = {
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeOff: 'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22',
  camera: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM9 13a3 3 0 106 0 3 3 0 00-6 0z',
};

export default function AkunPage({ showSnack }) {
  const [form, setForm] = useState({ name: 'admin', email: 'admin@cms.com', role: 'Administrator' });
  const [pass, setPass] = useState({ current: '', baru: '', confirm: '' });
  const [show, setShow] = useState({ current: false, baru: false, confirm: false });

  const toggleShow = (f) => setShow((s) => ({ ...s, [f]: !s[f] }));

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Akun Admin</h1>
          <p className="admin-page-subtitle">Kelola informasi dan keamanan akun administrator.</p>
        </div>
      </div>

      <div className="admin-card-grid">
        {/* Card 1 — Profile Info */}
        <div className="admin-card">
          <h3 className="admin-card-title">Informasi Profil</h3>
          <div className="admin-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="admin-avatar-lg">A</div>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => showSnack?.('info', 'Fitur ganti foto sedang dikembangkan.')}>
                <Icon d={I.camera} size={14} /> Ganti Foto
              </button>
            </div>

            <div className="admin-field">
              <label className="admin-label">Nama Lengkap</label>
              <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Email</label>
              <input className="admin-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Role</label>
              <input className="admin-input" value={form.role} readOnly />
            </div>

            <button className="admin-btn admin-btn-primary admin-btn-block" onClick={() => showSnack?.('success', 'Profil berhasil diperbarui.')}>
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Card 2 — Change Password */}
        <div className="admin-card">
          <h3 className="admin-card-title">Ubah Kata Sandi</h3>
          <div className="admin-card-body">
            {['current', 'baru', 'confirm'].map((f) => {
              const labels = { current: 'Kata Sandi Saat Ini', baru: 'Kata Sandi Baru', confirm: 'Konfirmasi Kata Sandi Baru' };
              return (
                <div className="admin-field" key={f}>
                  <label className="admin-label">{labels[f]}</label>
                  <div className="admin-input-wrap">
                    <input
                      className="admin-input"
                      type={show[f] ? 'text' : 'password'}
                      placeholder={labels[f]}
                      value={pass[f]}
                      onChange={(e) => setPass({ ...pass, [f]: e.target.value })}
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" className="admin-input-icon" onClick={() => toggleShow(f)} tabIndex={-1}>
                      <Icon d={show[f] ? I.eyeOff : I.eye} size={18} />
                    </button>
                  </div>
                </div>
              );
            })}

            <div style={{ fontSize: 12, color: 'var(--adm-text-muted)', marginTop: -8 }}>
              Minimal 8 karakter, kombinasi huruf dan angka.
            </div>

            <button className="admin-btn admin-btn-primary admin-btn-block" onClick={() => showSnack?.('success', 'Kata sandi berhasil diubah.')}>
              Ubah Kata Sandi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
