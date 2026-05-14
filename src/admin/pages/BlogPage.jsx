import { useState } from 'react';

/* ─── Icons (inline) ────────────────────────────────────────── */
function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  );
}
const I = {
  plus: 'M12 5v14m-7-7h14',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  edit: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  trash: 'M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
  x: 'M18 6L6 18M6 6l12 12',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
};

/* ─── Dummy Data ────────────────────────────────────────────── */
const DUMMY = [
  { id: 1, title: 'Kenapa Sekolah Memilih Edupongo?', kategori: 'Artikel', date: '2026-05-10', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 2, title: 'Satu-satunya yang Cover Ekosistem Pesantren', kategori: 'Fitur', date: '2026-05-05', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 3, title: 'Terpercaya Sejak 2014: Bukan Startup Kemarin Sore', kategori: 'Artikel', date: '2026-05-01', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 4, title: 'Presensi Fleksibel: 3 Metode dalam Satu Platform', kategori: 'Fitur', date: '2026-04-28', author: 'Admin Humas', status: 'draf', img: '' },
];

function formatDate(d) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const full = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dt = new Date(d);
  return `${dt.getDate()} ${full[dt.getMonth()]} ${dt.getFullYear()}`;
}

export default function BlogPage({ showSnack }) {
  const [items] = useState(DUMMY);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className="admin-page-wrap">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-subtitle">
            Kelola artikel Blog yang tampil di website. {total} total &middot; {items.filter((i) => i.status === 'terbit').length} terbit
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary admin-btn-sm">
            <Icon d={I.tag} size={16} /> Atur Kategori
          </button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => showSnack?.('info', 'Fitur tambah blog sedang dikembangkan.')}>
            <Icon d={I.plus} size={16} /> Tambah Blog
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 46, borderRadius: 12, border: '1px solid #E8E9F1', background: '#fff', flex: 1, maxWidth: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#97A2B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#010E23' }} placeholder="Cari Sesuatu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <button className="admin-filter-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Thumbnail</th>
              <th>Judul</th>
              <th style={{ width: 120 }}>Tanggal</th>
              <th style={{ width: 130 }}>Penulis</th>
              <th style={{ width: 100 }}>Status</th>
              <th style={{ width: 90 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={`https://placehold.co/60x60/E8E9F1/97A2B0?text=${encodeURIComponent(item.title.split(' ')[0])}`} alt={item.title} className="admin-thumb" />
                </td>
                <td>
                  <div className="admin-cell-title">{item.title}</div>
                  <div className="admin-cell-sub">{item.kategori}</div>
                </td>
                <td><span className="admin-cell-date">{formatDate(item.date)}</span></td>
                <td><span className="admin-cell-author" style={{ whiteSpace: 'nowrap' }}>{item.author}</span></td>
                <td>
                  <span className={`admin-badge admin-badge-${item.status === 'terbit' ? 'terbit' : 'draf'}`}>
                    {item.status === 'terbit' ? 'Terbit' : 'Draf'}
                  </span>
                </td>
                <td>
                  <div className="admin-action-group">
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => showSnack?.('info', 'Edit blog: ' + item.title)}>
                      <Icon d={I.edit} size={15} />
                    </button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => showSnack?.('info', 'Konfirmasi hapus: ' + item.title)}>
                      <Icon d={I.trash} size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={6} className="admin-empty">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="admin-pagination">
          <div className="admin-pagination-info">
            Menampilkan {start + 1}-{Math.min(start + perPage, total)} dari {total}
          </div>
          <div className="admin-pagination-controls">
            <button className="admin-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <Icon d={I.chevronLeft} size={14} />
            </button>
            <button className="admin-page-btn active">{page}</button>
            <button className="admin-page-btn" disabled={start + perPage >= total} onClick={() => setPage(page + 1)}>
              <Icon d={I.chevronRight} size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
