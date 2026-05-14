import { useState, useRef, useEffect } from 'react';
import { IconPlus, IconFilter, IconEdit, IconTrash, IconArrowLeft, IconChevronDown, IconChevronLeft, IconChevronRight, IconSearch, IconUpload, IconPhoto } from '@tabler/icons-react';
import ConfirmModal from '../components/ConfirmModal';

const DUMMY = [
  { id: 1, name: 'MA Plus Al Hadi', kota: 'Bojonegoro', warna: '#C97B3F', status: 'terbit' },
  { id: 2, name: 'PKBM Fanana', kota: 'Insan Baksya', warna: '#2ECC71', status: 'terbit' },
  { id: 3, name: "Ponpes Mamba'ul Ulum", kota: 'Ulum', warna: '#E74C3C', status: 'terbit' },
  { id: 4, name: 'SMP An Nawawiyah', kota: 'Rembang', warna: '#3498DB', status: 'terbit' },
  { id: 5, name: 'MI An Nuroniyah', kota: 'Rembang', warna: '#9B59B6', status: 'terbit' },
  { id: 6, name: 'SMK An Nuroniyah', kota: 'Rembang', warna: '#27AE60', status: 'terbit' },
  { id: 7, name: "SMP Mamba'ul Maarif", kota: 'Jombang', warna: '#1ABC9C', status: 'terbit' },
  { id: 8, name: 'SMP Darrunajah 2', kota: 'Karangploso', warna: '#3498DB', status: 'draf' },
];

const COLORS = [
  '#E74C3C', '#E67E22', '#F39C12', '#2ECC71',
  '#27AE60', '#1ABC9C', '#3498DB', '#2980B9',
  '#9B59B6', '#8E44AD', '#C0392B', '#16A085',
];

const getColor = (name) => {
  if (!name) return '#3498DB';
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % COLORS.length;
  return COLORS[index];
};

const PREFIXES = ['SMP ', 'MA ', 'SMK ', 'MI ', 'PKBM ', 'MTs ', 'Ponpes '];

const getInitial = (name) => {
  if (!name) return '?';
  const trimmed = name.trim();
  for (const prefix of PREFIXES) {
    if (trimmed.startsWith(prefix)) {
      const rest = trimmed.slice(prefix.length).trim();
      if (rest) return rest.charAt(0).toUpperCase();
    }
  }
  return trimmed.charAt(0).toUpperCase();
};

/* ─── Inline Form ──────────────────────────────────────────── */
function PartnerForm({ editData, onBack, onSubmit }) {
  const [form, setForm] = useState({
    name: editData?.name || '',
    kota: editData?.kota || '',
    foto: editData?.foto || null,
  });
  const [errors, setErrors] = useState({});
  const [publishModal, setPublishModal] = useState(false);
  const fileRef = useRef(null);

  const set = (f) => (v) => setForm((prev) => ({ ...prev, [f]: v }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Nama sekolah harus diisi';
    if (!form.kota.trim()) err.kota = 'Kota/Kabupaten harus diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildPayload = (status) => ({
    name: form.name.trim(),
    kota: form.kota.trim(),
    warna: getColor(form.name.trim()),
    foto: form.foto,
    status,
  });

  const handleDraft = () => {
    if (!validate()) return;
    onSubmit(buildPayload('draf'));
  };

  const handlePublishClick = () => {
    if (!validate()) return;
    setPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishModal(false);
    onSubmit(buildPayload('terbit'));
  };

  const handleFile = (file) => {
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setForm((prev) => ({ ...prev, foto: e.target.result }));
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, foto: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const logoColor = getColor(form.name.trim());
  const initChar = getInitial(form.name);

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} /> Kembali
      </button>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E8E9F1' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#010E23', margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
          {editData ? 'Edit Partner' : 'Tambah Partner'}
        </h2>
        <div style={{ display: 'flex', gap: 28 }}>
          {/* Left: Fields */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
            <div className="admin-field">
              <label className="admin-label">Nama Sekolah <span className="text-danger">*</span></label>
              <input className={`admin-input${errors.name ? ' admin-input-error' : ''}`} placeholder="mis. SMP An Nawawiyah" value={form.name} onChange={(e) => { set('name')(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: null })); }} />
              {errors.name && <small className="admin-error-text">{errors.name}</small>}
            </div>
            <div className="admin-field">
              <label className="admin-label">Kota/Kabupaten <span className="text-danger">*</span></label>
              <input className={`admin-input${errors.kota ? ' admin-input-error' : ''}`} placeholder="mis. Rembang, Jawa Tengah" value={form.kota} onChange={(e) => { set('kota')(e.target.value); if (errors.kota) setErrors((p) => ({ ...p, kota: null })); }} />
              {errors.kota && <small className="admin-error-text">{errors.kota}</small>}
            </div>
          </div>

          {/* Right: Upload Logo */}
          <div style={{ width: 240 }}>
            <label className="admin-label" style={{ marginBottom: 6, display: 'block', color: '#354764' }}>Logo Sekolah</label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: '100%', border: '1.5px dashed #E8E9F1',
                borderRadius: 12, background: '#F9F9F9', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden', padding: '32px 20px',
              }}
            >
              {form.foto ? (
                <>
                  <div style={{ position: 'absolute', inset: 0, background: `url(${form.foto}) center/cover no-repeat` }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.4))' }} />
                  <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 6 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                      style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 500, color: '#010E23', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                    >
                      Ganti
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setForm((prev) => ({ ...prev, foto: null })); }}
                      style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 500, color: '#E74C3C', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 14, background: logoColor || '#E8E9F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: 28, color: '#fff' }}>{initChar}</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#010E23' }}>{form.name || 'Nama Sekolah'}</div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{form.kota || 'Kota'}</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 12 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #E8E9F1', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 500, color: '#010E23' }}>
                      <IconPhoto size={14} stroke={1.5} /> Unggah Logo
                    </span>
                  </div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            <div style={{ fontSize: 11, color: '#97A2B0', textAlign: 'center', marginTop: 6 }}>Format PNG, JPG, SVG · maks 2MB.</div>
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
          title="Terbitkan Partner"
          message="Partner akan langsung dapat diakses publik di website setelah diterbitkan."
          onClose={() => setPublishModal(false)}
          onConfirm={confirmPublish}
          confirmLabel="Ya, Terbitkan"
        />
      )}
    </div>
  );
}

/* ─── List Page ────────────────────────────────────────────── */
export default function PartnerPage({ showSnack, userName }) {
  const [items, setItems] = useState(DUMMY);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVal, setFilterVal] = useState({ status: '' });
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const hasFilter = filterVal.status;

  const filtered = items.filter((i) => {
    if (search && !i.name?.toLowerCase().includes(search.toLowerCase()) && !(i.kota || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterVal.status && i.status !== filterVal.status) return false;
    return true;
  });
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const openDelete = (item) => setDeleteModal({ show: true, item });
  const confirmDelete = async () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteModal.item.id));
    setDeleteModal({ show: false, item: null });
    showSnack('success', 'Berhasil', 'Partner telah dihapus');
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (editItem) {
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...data } : i));
      showSnack('success', 'Berhasil', 'Partner telah diperbarui');
    } else {
      const created = { ...data, id: Date.now() };
      setItems((prev) => [created, ...prev]);
      showSnack('success', 'Berhasil', 'Partner telah diterbitkan');
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleBack = () => {
    setShowForm(false);
    setEditItem(null);
  };

  if (showForm) {
    return <PartnerForm editData={editItem} onBack={handleBack} onSubmit={handleSave} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Partner Sekolah</h1>
          <p className="admin-page-subtitle">Kelola daftar sekolah partner yang tampil di website. {total} total &middot; {items.filter((i) => i.status === 'terbit').length} terbit</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <IconPlus size={16} stroke={1.5} /> Tambah Partner
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <div className="admin-search-icon">
            <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          </div>
          <input className="admin-search-input" placeholder="Cari sekolah..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button className={`admin-filter-btn${hasFilter ? ' active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
            <IconFilter size={16} stroke={1.5} /> Filter
          </button>
          {filterOpen && (
            <div className="admin-filter-popup" ref={filterRef}>
              <div className="admin-filter-popup-header">
                <span className="admin-filter-popup-header-title">Filter</span>
                <button className="admin-filter-popup-header-reset" onClick={() => { setFilterVal({ status: '' }); setPage(1); }}>Reset</button>
              </div>
              <div className="admin-filter-grid">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Status</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.status} onChange={(e) => setFilterVal((p) => ({ ...p, status: e.target.value }))}>
                      <option value="">Semua Status</option>
                      <option value="terbit">Terbit</option>
                      <option value="draf">Draf</option>
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
              <div className="admin-filter-popup-actions">
                <button className="admin-filter-btn-reset" onClick={() => { setFilterVal({ status: '' }); setPage(1); }}>Reset All</button>
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
              <th style={{ width: 70 }}>Logo</th>
              <th>Nama Sekolah</th>
              <th style={{ width: 130 }}>Kota</th>
              <th style={{ width: 90 }}>Status</th>
              <th style={{ width: 90 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={5} className="admin-empty">Tidak ada data</td></tr>
            ) : paged.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.warna || '#3498DB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{getInitial(item.name)}</span>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--adm-text)' }}>{item.name}</div>
                </td>
                <td><span style={{ fontSize: 12, color: '#5D6B82' }}>{item.kota}</span></td>
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
          title="Hapus Partner"
          message={`Apakah kamu yakin ingin menghapus "${deleteModal.item?.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setDeleteModal({ show: false, item: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
