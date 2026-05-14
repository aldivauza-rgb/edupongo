import { useState, useEffect } from 'react';
import { testimonialsApi } from '../api';

const EMPTY = { text: '', name: '', role: '', initial: '', sort_order: 0, is_active: true };

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState('');

  const load = async () => { try { setItems(await testimonialsApi.getAll() || []); } catch (e) {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (item) => { setEdit(item.id); setForm(item); setShowForm(true); };

  const save = async () => {
    try {
      if (edit) await testimonialsApi.update(edit, form); else await testimonialsApi.create(form);
      setShowForm(false); setEdit(null); setMsg('Tersimpan!'); load();
    } catch (e) { setMsg('Gagal simpan'); }
  };

  const remove = async (id) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try { await testimonialsApi.remove(id); setMsg('Terhapus!'); load(); } catch (e) { setMsg('Gagal hapus'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Testimoni</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ Tambah Testimoni</button>
      </div>
      {msg && <div className="admin-alert admin-alert-success" onClick={() => setMsg('')}>{msg}</div>}

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{edit ? 'Edit Testimoni' : 'Tambah Testimoni'}</h3>
            <div className="admin-form">
              <div className="admin-field"><label>Nama</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div className="admin-field"><label>Role/Jabatan</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} /></div>
              <div className="admin-field"><label>Inisial (1 huruf)</label><input maxLength={1} value={form.initial} onChange={e => setForm({...form, initial: e.target.value})} /></div>
              <div className="admin-field"><label>Teks Testimoni</label><textarea className="admin-textarea" rows={4} value={form.text} onChange={e => setForm({...form, text: e.target.value})} /></div>
              <div className="admin-field"><label>Urutan</label><input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: +e.target.value})} /></div>
              <div className="admin-field">
                <label className="admin-check-label"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /> Aktif</label>
              </div>
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-primary" onClick={save}>Simpan</button>
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Nama</th><th>Role</th><th>Testimoni</th><th>Urutan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.role}</td>
                  <td className="admin-cell-content"><span className="admin-text-preview">{item.text}</span></td>
                  <td>{item.sort_order}</td>
                  <td>{item.is_active ? <span className="admin-badge admin-badge-green">Aktif</span> : 'Nonaktif'}</td>
                  <td>
                    <div className="admin-btn-group">
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => openEdit(item)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => remove(item.id)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="admin-empty">Belum ada data</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
