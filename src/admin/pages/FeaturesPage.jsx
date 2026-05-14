import { useState, useEffect } from 'react';
import { featuresApi } from '../api';

const TABS = ['semua', 'guru', 'kepsek', 'ortu'];
const EMPTY = { icon: '✅', tag: '', title: '', description: '', tab: 'semua', sort_order: 0, is_active: true };

export default function FeaturesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try { setItems(await featuresApi.getAll() || []); } catch (e) { setMsg('Gagal load'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (item) => { setEdit(item.id); setForm(item); setShowForm(true); };

  const save = async () => {
    try {
      if (edit) await featuresApi.update(edit, form);
      else await featuresApi.create(form);
      setShowForm(false); setEdit(null); setMsg('Tersimpan!'); load();
    } catch (e) { setMsg('Gagal simpan'); }
  };

  const remove = async (id) => {
    if (!confirm('Hapus fitur ini?')) return;
    try { await featuresApi.remove(id); setMsg('Terhapus!'); load(); }
    catch (e) { setMsg('Gagal hapus'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Fitur</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ Tambah Fitur</button>
      </div>
      {msg && <div className="admin-alert admin-alert-success" onClick={() => setMsg('')}>{msg}</div>}

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{edit ? 'Edit Fitur' : 'Tambah Fitur'}</h3>
            <div className="admin-form">
              <div className="admin-field"><label>Icon (emoji)</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} /></div>
              <div className="admin-field"><label>Tag</label><input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} /></div>
              <div className="admin-field"><label>Judul</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="admin-field"><label>Deskripsi</label><textarea className="admin-textarea" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="admin-field"><label>Tab</label>
                <select value={form.tab} onChange={e => setForm({...form, tab: e.target.value})}>
                  {TABS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
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
            <thead><tr><th>Icon</th><th>Tag</th><th>Judul</th><th>Tab</th><th>Urutan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td style={{fontSize:24}}>{item.icon}</td>
                  <td><span className="admin-badge">{item.tag}</span></td>
                  <td>{item.title}</td>
                  <td>{item.tab}</td>
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
