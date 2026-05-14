import { useState, useEffect } from 'react';
import { statsApi } from '../api';

const EMPTY = { page: 'home', number: '', label: '', sublabel: '', sort_order: 0, is_active: true };

export default function StatsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState('');

  const load = async () => { try { setItems(await statsApi.getAll() || []); } catch (e) {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (item) => { setEdit(item.id); setForm(item); setShowForm(true); };

  const save = async () => {
    try {
      if (edit) await statsApi.update(edit, form); else await statsApi.create(form);
      setShowForm(false); setEdit(null); setMsg('Tersimpan!'); load();
    } catch (e) { setMsg('Gagal simpan'); }
  };

  const remove = async (id) => {
    if (!confirm('Hapus stat ini?')) return;
    try { await statsApi.remove(id); setMsg('Terhapus!'); load(); } catch (e) { setMsg('Gagal hapus'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Statistik</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ Tambah Stat</button>
      </div>
      {msg && <div className="admin-alert admin-alert-success" onClick={() => setMsg('')}>{msg}</div>}

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{edit ? 'Edit Stat' : 'Tambah Stat'}</h3>
            <div className="admin-form">
              <div className="admin-field"><label>Halaman</label>
                <select value={form.page} onChange={e => setForm({...form, page: e.target.value})}>
                  <option value="home">Home</option><option value="about">Tentang Kami</option>
                </select>
              </div>
              <div className="admin-field"><label>Angka (contoh: 100+)</label><input value={form.number} onChange={e => setForm({...form, number: e.target.value})} /></div>
              <div className="admin-field"><label>Label</label><input value={form.label} onChange={e => setForm({...form, label: e.target.value})} /></div>
              <div className="admin-field"><label>Sub-label (opsional)</label><input value={form.sublabel} onChange={e => setForm({...form, sublabel: e.target.value})} /></div>
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
            <thead><tr><th>Halaman</th><th>Angka</th><th>Label</th><th>Sub</th><th>Urutan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><span className="admin-badge">{item.page}</span></td>
                  <td><strong>{item.number}</strong></td>
                  <td>{item.label}</td>
                  <td>{item.sublabel}</td>
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
              {items.length === 0 && <tr><td colSpan={7} className="admin-empty">Belum ada data</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
