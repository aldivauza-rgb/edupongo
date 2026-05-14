import { useState, useEffect } from 'react';
import { IconPlus, IconSearch, IconFilter, IconEdit, IconTrash, IconArrowLeft, IconUpload } from '@tabler/icons-react';
import ConfirmModal from '../components/ConfirmModal';
import * as api from '../../lib/admin-api';

const CATEGORIES = [
  { id: 'umum', icon: '🔑', label: 'Umum' },
  { id: 'fitur', icon: '⚙️', label: 'Fitur & Platform' },
  { id: 'implementasi', icon: '🚀', label: 'Implementasi' },
  { id: 'keamanan', icon: '🔒', label: 'Keamanan & Data' },
];

/* ─── Inline FAQ Form ──────────────────────────────────────── */
function FAQForm({ editData, onBack, onSubmit }) {
  const [form, setForm] = useState({
    category: editData?.category || 'umum',
    q: editData?.q || '',
    a: editData?.a || '',
  });
  const [errors, setErrors] = useState({});
  const [publishModal, setPublishModal] = useState(false);

  const set = (f) => (v) => setForm((prev) => ({ ...prev, [f]: v }));

  const validate = () => {
    const err = {};
    if (!form.q.trim()) err.q = 'Pertanyaan harus diisi';
    if (!form.a.trim()) err.a = 'Jawaban harus diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleDraft = () => {
    if (!validate()) return;
    onSubmit({ ...form, q: form.q.trim(), a: form.a.trim(), status: 'draf' });
  };

  const handlePublishClick = () => {
    if (!validate()) return;
    setPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishModal(false);
    onSubmit({ ...form, q: form.q.trim(), a: form.a.trim(), status: 'terbit' });
  };

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} />
        Kembali
      </button>

      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E8E9F1' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#010E23', margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
          {editData ? 'Edit FAQ' : 'Tambah FAQ'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
          <div className="admin-field">
            <label className="admin-label">Kategori</label>
            <select className="admin-select" value={form.category} onChange={(e) => set('category')(e.target.value)} style={{ width: '100%' }}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <div className="admin-field">
            <label className="admin-label">Pertanyaan <span className="text-danger">*</span></label>
            <input className={`admin-input${errors.q ? ' admin-input-error' : ''}`} placeholder="Tulis pertanyaan..." value={form.q} onChange={(e) => { set('q')(e.target.value); if (errors.q) setErrors((p) => ({ ...p, q: null })); }} />
            {errors.q && <small className="admin-error-text">{errors.q}</small>}
          </div>

          <div className="admin-field">
            <label className="admin-label">Jawaban <span className="text-danger">*</span></label>
            <textarea className={`admin-textarea${errors.a ? ' admin-input-error' : ''}`} placeholder="Tulis jawaban..." style={{ minHeight: 140, ...(errors.a ? { borderColor: '#B3202F' } : {}) }} value={form.a} onChange={(e) => { set('a')(e.target.value); if (errors.a) setErrors((p) => ({ ...p, a: null })); }} />
            {errors.a && <small className="admin-error-text">{errors.a}</small>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 28, paddingTop: 20, borderTop: '1px solid #E8E9F1' }}>
          <div style={{ flex: 1 }} />
          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onBack}>Batal</button>
          <button className="admin-btn admin-btn-outline admin-btn-sm" style={{ borderColor: '#101828', color: '#101828' }} onClick={handleDraft}>Simpan sebagai Draf</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handlePublishClick}>
            <IconUpload size={16} stroke={1.5} /> {editData ? 'Perbarui & Terbitkan' : 'Simpan & Terbitkan'}
          </button>
        </div>
      </div>

      {publishModal && (
        <ConfirmModal
          title="Terbitkan FAQ"
          message="FAQ akan langsung dapat diakses publik di website setelah diterbitkan."
          onClose={() => setPublishModal(false)}
          onConfirm={confirmPublish}
          confirmLabel="Ya, Terbitkan"
        />
      )}
    </div>
  );
}

/* ─── FAQ List Page ────────────────────────────────────────── */
export default function FAQPage({ showSnack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('umum');
  const [openId, setOpenId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });

  useEffect(() => {
    api.getFAQs().then(data => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const grouped = {};
  items.forEach(i => {
    const c = i.category || 'umum';
    if (!grouped[c]) grouped[c] = [];
    grouped[c].push(i);
  });
  CATEGORIES.forEach(c => { if (!grouped[c.id]) grouped[c.id] = []; });

  const catItems = grouped[cat] || [];

  const toggle = (idx) => setOpenId(openId === idx ? null : idx);

  const openDelete = (item) => setDeleteModal({ show: true, item });
  const confirmDelete = async () => {
    try {
      await api.deleteFAQ(deleteModal.item.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteModal.item.id));
      setDeleteModal({ show: false, item: null });
      showSnack('success', 'Berhasil', 'FAQ telah dihapus');
    } catch { showSnack('error', 'Gagal', 'Gagal menghapus FAQ'); }
  };

  const handleSave = async (data) => {
    try {
      const payload = {
        question: data.q.trim(),
        answer: data.a.trim(),
        category: data.category,
        status: data.status,
      };
      if (editItem) {
        await api.updateFAQ(editItem.id, payload);
        setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...payload } : i));
        showSnack('success', 'Berhasil', 'FAQ telah diperbarui');
      } else {
        const created = await api.createFAQ(payload);
        setItems((prev) => [created, ...prev]);
        showSnack('success', 'Berhasil', 'FAQ telah diterbitkan');
      }
      setShowForm(false);
      setEditItem(null);
    } catch {
      showSnack('error', 'Gagal', 'Terjadi kesalahan');
    }
  };

  const handleEdit = (item) => {
    setEditItem({ ...item, q: item.question, a: item.answer });
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setEditItem(null);
  };

  if (showForm) {
    return <FAQForm editData={editItem} onBack={handleBack} onSubmit={handleSave} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">FAQ</h1>
          <p className="admin-page-subtitle">Kelola pertanyaan yang sering ditanyakan.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <IconPlus size={16} stroke={1.5} /> Tambah FAQ
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <div className="admin-search-icon">
            <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          </div>
          <input className="admin-search-input" placeholder="Cari pertanyaan..." />
        </div>
        <button className="admin-filter-btn">
          <IconFilter size={16} stroke={1.5} /> Filter
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div className="admin-cat-list">
            {CATEGORIES.map((c) => (
              <button key={c.id} className={`admin-cat-btn${cat === c.id ? ' active' : ''}`} onClick={() => { setCat(c.id); setOpenId(null); }}>
                <span className="admin-cat-btn-icon">{c.icon}</span>
                <span className="admin-cat-btn-label">{c.label}</span>
                <span className="admin-cat-btn-count">{(grouped[c.id] || []).length} pertanyaan</span>
              </button>
            ))}
          </div>
          <button className="admin-btn admin-btn-outline admin-btn-sm admin-btn-block" style={{ marginTop: 12 }} onClick={() => showSnack?.('warning', 'Perhatian', 'Fitur tambah kategori sedang dikembangkan.')}>
            <IconPlus size={14} stroke={1.5} /> Tambah Kategori
          </button>
        </div>

        <div style={{ flex: 1, minWidth: 0, background: 'var(--adm-surface)', borderRadius: 'var(--adm-radius-lg)', border: '1px solid var(--adm-border)', padding: '4px 24px' }}>
          {loading ? (
            <div className="admin-empty" style={{ padding: '40px 0' }}>Memuat data...</div>
          ) : catItems.length === 0 ? (
            <div className="admin-empty">Tidak ada pertanyaan di kategori ini.</div>
          ) : catItems.map((faq) => (
            <div className="admin-accordion-item" key={faq.id}>
              <button className="admin-accordion-trigger" onClick={() => toggle(faq.id)}>
                <span className="admin-accordion-title">{faq.question}</span>
                <span className={`admin-accordion-icon${openId === faq.id ? ' open' : ''}`}>
                  <IconPlus size={20} stroke={1.5} />
                </span>
              </button>
              {openId === faq.id && (
                <div className="admin-accordion-content">
                  <p style={{ margin: '0 0 12px' }}>{faq.answer}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => handleEdit(faq)}>
                      <IconEdit size={15} stroke={1.5} />
                    </button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => openDelete(faq)}>
                      <IconTrash size={15} stroke={1.5} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {deleteModal.show && (
        <ConfirmModal
          title="Hapus FAQ"
          message={`Apakah kamu yakin ingin menghapus "${deleteModal.item?.question}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setDeleteModal({ show: false, item: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
