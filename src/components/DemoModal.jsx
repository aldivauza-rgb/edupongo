import { useState } from 'react';
import { supabase } from '../lib/supabase';

const initial = { name: '', email: '', phone: '', school: '', position: '', students: '' };

export default function DemoModal({ open, onClose }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('demo_requests').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      school: form.school,
      position: form.position || null,
      students: form.students || null,
    });

    setLoading(false);

    if (insertError) {
      setError('Gagal mengirim. Coba lagi atau hubungi kami langsung.');
      return;
    }

    setDone(true);
    setForm(initial);
  }

  if (done) {
    return (
      <div className="demo-overlay" onClick={onClose}>
        <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
          <button className="demo-close" onClick={() => { onClose(); setDone(false); }}>✕</button>
          <div className="demo-header" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2>Terkirim!</h2>
            <p>Tim Edupongo akan menghubungi Anda dalam 1×24 jam via WhatsApp atau email.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="demo-close" onClick={onClose}>✕</button>

        <div className="demo-header">
          <h2>Daftar Demo Gratis</h2>
          <p>Isi data sekolah Anda, tim kami akan menghubungi dalam 1×24 jam.</p>
        </div>

        <form className="demo-form" onSubmit={handleSubmit}>
          <div className="demo-field">
            <label>Nama Lengkap</label>
            <input type="text" placeholder="cth: Fajrul Falah" value={form.name} onChange={set('name')} required />
          </div>

          <div className="demo-field">
            <label>Email</label>
            <input type="email" placeholder="cth: fajrul@sekolah.sch.id" value={form.email} onChange={set('email')} required />
          </div>

          <div className="demo-field">
            <label>No. Telepon / WhatsApp</label>
            <input type="tel" placeholder="cth: 0812-9580-2674" value={form.phone} onChange={set('phone')} required />
          </div>

          <div className="demo-field">
            <label>Nama Sekolah / Instansi / Yayasan</label>
            <input type="text" placeholder="cth: SMA Negeri 1 Malang" value={form.school} onChange={set('school')} required />
          </div>

          <div className="demo-row">
            <div className="demo-field">
              <label>Jabatan</label>
              <input type="text" placeholder="cth: Kepala Sekolah" value={form.position} onChange={set('position')} />
            </div>
            <div className="demo-field">
              <label>Jumlah Siswa</label>
              <select value={form.students} onChange={set('students')}>
                <option value="">Pilih Jumlah</option>
                <option value="<50">{'<'} 50</option>
                <option value="50-200">50 – 200</option>
                <option value="201-500">201 – 500</option>
                <option value="501-1000">501 – 1.000</option>
                <option value=">1000">{'>'} 1.000</option>
              </select>
            </div>
          </div>

          {error && <p style={{ color: '#e00', fontSize: 14, margin: 0 }}>{error}</p>}

          <button type="submit" className="demo-submit" disabled={loading}>
            {loading ? 'Mengirim...' : 'Daftar Demo Gratis'}
          </button>
        </form>
      </div>
    </div>
  );
}
