import { useState, useEffect, useRef } from 'react';
import { IconPlus, IconFilter, IconEdit, IconTrash, IconTag, IconChevronLeft, IconChevronRight, IconSearch, IconArrowLeft, IconUpload } from '@tabler/icons-react';
import ConfirmModal from '../components/ConfirmModal';
import * as api from '../../lib/admin-api';

function formatDate(d) {
  const full = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  if (!d) return '';
  const dt = new Date(d);
  return `${dt.getDate()} ${full[dt.getMonth()]} ${dt.getFullYear()}`;
}

/* ─── Inline Form ──────────────────────────────────────────── */
function BlogForm({ editData, onBack, onSubmit, userName }) {
  const [form, setForm] = useState({
    title: editData?.title || '',
    kategori: editData?.kategori || 'Artikel',
    date: editData?.date || new Date().toISOString().split('T')[0],
    author: editData?.author || userName || 'admin',
    content: editData?.content || '',
  });
  const [errors, setErrors] = useState({});
  const [publishModal, setPublishModal] = useState(false);

  const set = (f) => (v) => setForm((prev) => ({ ...prev, [f]: v }));

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Judul harus diisi';
    if (!form.content.trim()) err.content = 'Konten harus diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleDraft = () => {
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim(), content: form.content.trim(), status: 'draf' });
  };

  const handlePublishClick = () => {
    if (!validate()) return;
    setPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishModal(false);
    onSubmit({ ...form, title: form.title.trim(), content: form.content.trim(), status: 'terbit' });
  };

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} /> Kembali
      </button>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E8E9F1' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#010E23', margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
          {editData ? 'Edit Blog' : 'Tambah Blog'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
          <div className="admin-field">
            <label className="admin-label">Judul <span className="text-danger">*</span></label>
            <input className={`admin-input${errors.title ? ' admin-input-error' : ''}`} placeholder="Judul artikel" value={form.title} onChange={(e) => { set('title')(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: null })); }} />
            {errors.title && <small className="admin-error-text">{errors.title}</small>}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div className="admin-field">
                <label className="admin-label">Kategori</label>
                <select className="admin-select" value={form.kategori} onChange={(e) => set('kategori')(e.target.value)} style={{ width: '100%' }}>
                  <option value="Artikel">Artikel</option>
                  <option value="Fitur">Fitur</option>
                </select>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="admin-field">
                <label className="admin-label">Tanggal</label>
                <input type="date" className="admin-input" value={form.date} onChange={(e) => set('date')(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-label">Penulis</label>
            <input className="admin-input" value={form.author} onChange={(e) => set('author')(e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Konten <span className="text-danger">*</span></label>
            <textarea className={`admin-textarea${errors.content ? ' admin-input-error' : ''}`} placeholder="Tulis konten blog..." style={{ minHeight: 160, ...(errors.content ? { borderColor: '#B3202F' } : {}) }} value={form.content} onChange={(e) => { set('content')(e.target.value); if (errors.content) setErrors((p) => ({ ...p, content: null })); }} />
            {errors.content && <small className="admin-error-text">{errors.content}</small>}
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
          title="Terbitkan Blog"
          message="Blog akan langsung dapat diakses publik di website setelah diterbitkan."
          onClose={() => setPublishModal(false)}
          onConfirm={confirmPublish}
          confirmLabel="Ya, Terbitkan"
        />
      )}
    </div>
  );
}

/* ─── List Page ────────────────────────────────────────────── */
export default function BlogPage({ showSnack, userName }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVal, setFilterVal] = useState({ bulan: '', tahun: '', status: '', kategori: '' });
  const filterRef = useRef(null);

  useEffect(() => {
    api.getBlogs().then(data => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const hasFilter = filterVal.bulan || filterVal.tahun || filterVal.status || filterVal.kategori;

  const filtered = items.filter((i) => {
    if (search && !i.title?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterVal.kategori && i.kategori !== filterVal.kategori) return false;
    if (filterVal.status && i.status !== filterVal.status) return false;
    if (filterVal.bulan) {
      const d = new Date(i.date);
      if (d.getMonth() + 1 !== parseInt(filterVal.bulan)) return false;
    }
    if (filterVal.tahun) {
      const d = new Date(i.date);
      if (d.getFullYear() !== parseInt(filterVal.tahun)) return false;
    }
    return true;
  });
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const openDelete = (item) => setDeleteModal({ show: true, item });
  const confirmDelete = async () => {
    try {
      await api.deleteBlog(deleteModal.item.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteModal.item.id));
      setDeleteModal({ show: false, item: null });
      showSnack('success', 'Berhasil', 'Blog telah dihapus');
    } catch { showSnack('error', 'Gagal', 'Gagal menghapus blog'); }
  };

  const handleEdit = (item) => {
    setEditItem({ ...item, date: item.date ? item.date.split('T')[0] : '' });
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editItem) {
        await api.updateBlog(editItem.id, data);
        setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...data } : i));
        showSnack('success', 'Berhasil', 'Blog telah diperbarui');
      } else {
        const created = await api.createBlog(data);
        setItems((prev) => [created, ...prev]);
        showSnack('success', 'Berhasil', 'Blog telah diterbitkan');
      }
      setShowForm(false);
      setEditItem(null);
    } catch {
      showSnack('error', 'Gagal', 'Terjadi kesalahan');
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setEditItem(null);
  };

  if (showForm) {
    return <BlogForm editData={editItem} onBack={handleBack} onSubmit={handleSave} userName={userName} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-subtitle">
            Kelola artikel Blog yang tampil di website. {total} total &middot; {items.filter((i) => i.status === 'terbit').length} terbit
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary admin-btn-sm"><IconTag size={16} stroke={1.5} /> Atur Kategori</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { setEditItem(null); setShowForm(true); }}><IconPlus size={16} stroke={1.5} /> Tambah Blog</button>
        </div>
      </div>
      <div className="admin-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 46, borderRadius: 12, border: '1px solid #E8E9F1', background: '#fff', flex: 1, maxWidth: 500 }}>
          <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#010E23' }} placeholder="Cari Sesuatu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button className={`admin-filter-btn${hasFilter ? ' active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}><IconFilter size={16} stroke={1.5} /> Filter</button>
          {filterOpen && (
            <div className="admin-filter-popup" ref={filterRef}>
              <div>
                <label>Bulan</label>
                <select className="admin-filter-select" value={filterVal.bulan} onChange={(e) => setFilterVal((p) => ({ ...p, bulan: e.target.value }))}>
                  <option value="">Semua Bulan</option>
                  {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                </select>
              </div>
              <div>
                <label>Tahun</label>
                <select className="admin-filter-select" value={filterVal.tahun} onChange={(e) => setFilterVal((p) => ({ ...p, tahun: e.target.value }))}>
                  <option value="">Semua Tahun</option>
                  {[2024,2025,2026].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label>Status</label>
                <select className="admin-filter-select" value={filterVal.status} onChange={(e) => setFilterVal((p) => ({ ...p, status: e.target.value }))}>
                  <option value="">Semua Status</option>
                  <option value="terbit">Terbit</option>
                  <option value="draf">Draf</option>
                </select>
              </div>
              <div>
                <label>Kategori</label>
                <select className="admin-filter-select" value={filterVal.kategori} onChange={(e) => setFilterVal((p) => ({ ...p, kategori: e.target.value }))}>
                  <option value="">Semua Kategori</option>
                  <option value="Artikel">Artikel</option>
                  <option value="Fitur">Fitur</option>
                </select>
              </div>
              <div className="admin-filter-popup-actions">
                <button className="admin-filter-btn-reset" onClick={() => { setFilterVal({ bulan: '', tahun: '', status: '', kategori: '' }); setPage(1); }}>Reset All</button>
                <button className="admin-filter-btn-apply" onClick={() => { setFilterOpen(false); setPage(1); }}>Terapkan</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Thumbnail</th>
              <th>Judul</th>
              <th style={{ width: 120 }}>Tanggal</th>
              <th style={{ width: 110 }}>Penulis</th>
              <th style={{ width: 90 }}>Status</th>
              <th style={{ width: 90 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="admin-empty">Memuat data...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={6} className="admin-empty">Tidak ada data</td></tr>
            ) : paged.map((item) => (
              <tr key={item.id}>
                <td><img src={`https://placehold.co/60x60/E8E9F1/97A2B0?text=${encodeURIComponent((item.title?.split(' ')[0] || 'B'))}`} alt={item.title} className="admin-thumb" /></td>
                <td>
                  <div className="admin-cell-title">{item.title}</div>
                  <div className="admin-cell-sub">{item.kategori}</div>
                </td>
                <td><span className="admin-cell-date">{formatDate(item.date)}</span></td>
                <td><span className="admin-cell-author" style={{ whiteSpace: 'nowrap' }}>{item.author || 'Admin'}</span></td>
                <td><span className={`admin-badge admin-badge-${item.status === 'terbit' ? 'terbit' : 'draf'}`}>{item.status === 'terbit' ? 'Terbit' : 'Draf'}</span></td>
                <td>
                  <div className="admin-action-group">
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => handleEdit(item)}><IconEdit size={15} stroke={1.5} /></button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => openDelete(item)}><IconTrash size={15} stroke={1.5} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="admin-pagination">
          <div className="admin-pagination-left">
            Show <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select> entries &middot; {total > 0 ? start + 1 : 0}-{Math.min(start + perPage, total)} dari {total}
          </div>
          <div className="admin-pagination-controls">
            <button className="admin-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}><IconChevronLeft size={14} stroke={1.5} /></button>
            <button className="admin-page-btn active">{page}</button>
            <button className="admin-page-btn" disabled={start + perPage >= total} onClick={() => setPage(page + 1)}><IconChevronRight size={14} stroke={1.5} /></button>
          </div>
        </div>
      </div>
      {deleteModal.show && (
        <ConfirmModal
          title="Hapus Blog"
          message={`Apakah kamu yakin ingin menghapus "${deleteModal.item?.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setDeleteModal({ show: false, item: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
