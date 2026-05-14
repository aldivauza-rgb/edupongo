import { useState, useEffect } from 'react';
import { IconPlus, IconFilter, IconEdit, IconTrash, IconChevronLeft, IconChevronRight, IconSearch } from '@tabler/icons-react';
import TambahTestimoniPage from './TambahTestimoniPage';
import ConfirmModal from '../components/ConfirmModal';
import * as api from '../../lib/admin-api';

const AVATAR_COLORS = ['#046CF2', '#007955', '#E07B00', '#8B5CF6', '#DC2626', '#0891B2'];
const getAvatarColor = (name) => {
  const char = (name || 'A').charAt(0).toUpperCase();
  return AVATAR_COLORS[char.charCodeAt(0) % AVATAR_COLORS.length];
};

export default function TestimoniPage({ showSnack, userName }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });

  useEffect(() => {
    api.getTestimonials().then(data => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = items.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    (i.role || '').toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const openDelete = (item) => setDeleteModal({ show: true, item });
  const confirmDelete = async () => {
    try {
      await api.deleteTestimoni(deleteModal.item.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteModal.item.id));
      setDeleteModal({ show: false, item: null });
      showSnack('success', 'Berhasil', 'Testimoni telah dihapus');
    } catch { showSnack('error', 'Gagal', 'Gagal menghapus testimoni'); }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editItem) {
        await api.updateTestimoni(editItem.id, data);
        setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...data } : i));
        showSnack('success', 'Berhasil', 'Testimoni telah diperbarui');
      } else {
        const created = await api.createTestimoni(data);
        setItems((prev) => [created, ...prev]);
        showSnack('success', 'Berhasil', 'Testimoni telah diterbitkan');
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
    return <TambahTestimoniPage editData={editItem} onBack={handleBack} onSubmit={handleSave} userName={userName} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Testimoni</h1>
          <p className="admin-page-subtitle">Kelola testimoni yang tampil di website.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <IconPlus size={16} stroke={1.5} /> Tambah Testimoni
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <div className="admin-search-icon">
            <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          </div>
          <input className="admin-search-input" placeholder="Cari testimoni..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <button className="admin-filter-btn">
          <IconFilter size={16} stroke={1.5} /> Filter
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Foto</th>
              <th>Nama &amp; Jabatan</th>
              <th>Isi Testimoni</th>
              <th style={{ width: 90 }}>Status</th>
              <th style={{ width: 90 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="admin-empty">Memuat data...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={5} className="admin-empty">Tidak ada data</td></tr>
            ) : paged.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: getAvatarColor(item.name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 15, color: '#fff', flexShrink: 0 }}>
                    {item.initial || (item.name || '?').charAt(0).toUpperCase()}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--adm-text)' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--adm-text-secondary)', marginTop: 2 }}>{item.role}</div>
                </td>
                <td>
                  <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: 13, color: 'var(--adm-text-dark)', lineHeight: 1.5, maxWidth: 350 }}>
                    {item.text}
                  </div>
                </td>
                <td>
                  <span className={`admin-badge admin-badge-${item.status === 'terbit' ? 'terbit' : 'draf'}`}>
                    {item.status === 'terbit' ? 'Terbit' : 'Draf'}
                  </span>
                </td>
                <td>
                  <div className="admin-action-group">
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => handleEdit(item)}>
                      <IconEdit size={15} stroke={1.5} />
                    </button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => openDelete(item)}>
                      <IconTrash size={15} stroke={1.5} />
                    </button>
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
            <button className="admin-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <IconChevronLeft size={14} stroke={1.5} />
            </button>
            <button className="admin-page-btn active">{page}</button>
            <button className="admin-page-btn" disabled={start + perPage >= total} onClick={() => setPage(page + 1)}>
              <IconChevronRight size={14} stroke={1.5} />
            </button>
          </div>
        </div>
      </div>

      {deleteModal.show && (
        <ConfirmModal
          title="Hapus Testimoni"
          message={`Apakah kamu yakin ingin menghapus "${deleteModal.item?.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setDeleteModal({ show: false, item: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
