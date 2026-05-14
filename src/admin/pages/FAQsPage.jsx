import { useState, useEffect } from 'react';
import { faqsApi } from '../api';

const CATS = ['umum', 'fitur', 'implementasi', 'keamanan'];
const EMPTY = { question: '', answer: '', category: 'umum', sort_order: 0, is_active: true };

export default function FAQsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState('');

  const load = async () => { try { setItems(await faqsApi.getAll() || []); } catch (e) {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEdit(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (item) => { setEdit(item.id); setForm(item); setShowForm(true); };

  const save = async () => {
    try {
      if (edit) await faqsApi.update(edit, form); else await faqsApi.create(form);
      setShowForm(false); setEdit(null); setMsg('Tersimpan!'); load();
    } catch (e) { setMsg('Gagal simpan'); }
  };

  const remove = async (id) => {
    if (!confirm('Hapus FAQ ini?')) return;
    try { await faqsApi.remove(id); setMsg('Terhapus!'); load(); } catch (e) { setMsg('Gagal hapus'); }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>FAQ</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ Tambah FAQ</button>
      </div>
      {msg && <div className="admin-alert admin-alert-success" onClick={() => setMsg('')}>{msg}</div>}

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content admin-modal-wide">
            <h3>{edit ? 'Edit FAQ' : 'Tambah FAQ'}</h3>
            <div className="admin-form">
              <div className="admin-field"><label>Pertanyaan</label><textarea className="admin-textarea" rows={2} value={form.question} onChange={e => setForm({...form, question: e.target.value})} /></div>
              <div className="admin-field"><label>Jawaban</label><textarea className="admin-textarea" rows={4} value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} /></div>
              <div className="admin-field"><label>Kategori</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
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
            <thead><tr><th>Pertanyaan</th><th>Kategori</th><th>Urutan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="admin-cell-content"><span className="admin-text-preview">{item.question}</span></td>
                  <td><span className="admin-badge">{item.category}</span></td>
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
              {items.length === 0 && <tr><td colSpan={5} className="admin-empty">Belum ada data</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
