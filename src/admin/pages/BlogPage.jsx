import { useState } from 'react';
import { IconPlus, IconFilter, IconEdit, IconTrash, IconTag, IconChevronLeft, IconChevronRight, IconSearch } from '@tabler/icons-react';

const DUMMY = [
  { id: 1, title: 'Kenapa Sekolah Memilih Edupongo?', kategori: 'Artikel', date: '2026-05-10', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 2, title: 'Satu-satunya yang Cover Ekosistem Pesantren', kategori: 'Fitur', date: '2026-05-05', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 3, title: 'Terpercaya Sejak 2014: Bukan Startup Kemarin Sore', kategori: 'Artikel', date: '2026-05-01', author: 'Admin Humas', status: 'terbit', img: '' },
  { id: 4, title: 'Presensi Fleksibel: 3 Metode dalam Satu Platform', kategori: 'Fitur', date: '2026-04-28', author: 'Admin Humas', status: 'draf', img: '' },
];

function formatDate(d) {
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
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-subtitle">
            Kelola artikel Blog yang tampil di website. {total} total &middot; {items.filter((i) => i.status === 'terbit').length} terbit
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary admin-btn-sm">
            <IconTag size={16} stroke={1.5} /> Atur Kategori
          </button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => showSnack?.('info', 'Fitur tambah blog sedang dikembangkan.')}>
            <IconPlus size={16} stroke={1.5} /> Tambah Blog
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 46, borderRadius: 12, border: '1px solid #E8E9F1', background: '#fff', flex: 1, maxWidth: 500 }}>
          <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#010E23' }} placeholder="Cari Sesuatu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <button className="admin-filter-btn">
          <IconFilter size={16} stroke={1.5} /> Filter
        </button>
      </div>

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
                      <IconEdit size={15} stroke={1.5} />
                    </button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => showSnack?.('info', 'Konfirmasi hapus: ' + item.title)}>
                      <IconTrash size={15} stroke={1.5} />
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

        <div className="admin-pagination">
          <div className="admin-pagination-info">
            Menampilkan {start + 1}-{Math.min(start + perPage, total)} dari {total}
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
    </div>
  );
}
