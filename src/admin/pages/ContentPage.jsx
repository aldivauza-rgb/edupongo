import { useState, useEffect } from 'react';
import { contentApi } from '../api';

export default function ContentPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getAll();
      setItems(data || []);
    } catch (e) { setMsg('Gagal load data'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (id, content) => {
    setSaving(true);
    try {
      await contentApi.update(id, { content });
      setEditing(null);
      setMsg('Tersimpan!');
      load();
    } catch (e) { setMsg('Gagal menyimpan'); }
    setSaving(false);
  };

  return (
    <div className="admin-page">
      <h2>Konten Teks</h2>
      <p className="admin-desc">Edit teks yang muncul di halaman website.</p>
      {msg && <div className="admin-alert admin-alert-success" onClick={() => setMsg('')}>{msg}</div>}

      {loading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Halaman</th><th>Section</th><th>Key</th><th>Konten</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><span className="admin-badge">{item.page}</span></td>
                  <td>{item.section}</td>
                  <td><code>{item.key}</code></td>
                  <td className="admin-cell-content">
                    {editing === item.id ? (
                      <textarea
                        className="admin-textarea"
                        defaultValue={item.content}
                        rows={3}
                        id={`edit-${item.id}`}
                      />
                    ) : (
                      <span className="admin-text-preview">{item.content}</span>
                    )}
                  </td>
                  <td>
                    {editing === item.id ? (
                      <div className="admin-btn-group">
                        <button className="admin-btn admin-btn-sm admin-btn-primary"
                          onClick={() => {
                            const val = document.getElementById(`edit-${item.id}`).value;
                            save(item.id, val);
                          }}
                          disabled={saving}
                        >{saving ? '...' : 'Simpan'}</button>
                        <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setEditing(null)}>Batal</button>
                      </div>
                    ) : (
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setEditing(item.id)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="admin-empty">Belum ada data. Jalankan SQL schema dulu.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
