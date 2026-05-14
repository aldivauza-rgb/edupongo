import { useState } from 'react';
import { IconEye, IconEyeOff, IconPhoto } from '@tabler/icons-react';

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
        {/* Card 1 */}
        <div className="admin-card">
          <h3 className="admin-card-title">Informasi Profil</h3>
          <div className="admin-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="admin-avatar-lg">A</div>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => showSnack?.('info', 'Fitur ganti foto sedang dikembangkan.')}>
                <IconPhoto size={14} stroke={1.5} /> Ganti Foto
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

        {/* Card 2 */}
        <div className="admin-card">
          <h3 className="admin-card-title">Ubah Kata Sandi</h3>
          <div className="admin-card-body">
            {['current', 'baru', 'confirm'].map((f) => {
              const labels = { current: 'Kata Sandi Saat Ini', baru: 'Kata Sandi Baru', confirm: 'Konfirmasi Kata Sandi Baru' };
              return (
                <div className="admin-field" key={f}>
                  <label className="admin-label">{labels[f]}</label>
                  <div className="admin-input-wrap">
                    <input className="admin-input" type={show[f] ? 'text' : 'password'} placeholder={labels[f]} value={pass[f]} onChange={(e) => setPass({ ...pass, [f]: e.target.value })} style={{ paddingRight: 44 }} />
                    <button type="button" className="admin-input-icon" onClick={() => toggleShow(f)} tabIndex={-1}>
                      {show[f] ? <IconEyeOff size={18} stroke={1.5} /> : <IconEye size={18} stroke={1.5} />}
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
