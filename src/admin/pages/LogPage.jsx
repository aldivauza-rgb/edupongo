import { useState } from 'react';
import { IconSearch, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const DUMMY = [
  { time: '2026-05-14T21:30', admin: 'admin', aksi: 'Tambah', page: 'Blog', detail: 'Menambah artikel "Kenapa Sekolah Memilih Edupongo?"' },
  { time: '2026-05-14T20:15', admin: 'admin', aksi: 'Edit', page: 'Testimoni', detail: 'Mengedit testimoni dari "Wakil Kepala Sekolah MA Wahab Hasbulloh"' },
  { time: '2026-05-14T18:44', admin: 'admin', aksi: 'Hapus', page: 'FAQ', detail: 'Menghapus pertanyaan "Bagaimana cara daftar?"' },
  { time: '2026-05-13T09:02', admin: 'admin', aksi: 'Login', page: 'Sistem', detail: 'Login berhasil dari browser Chrome' },
  { time: '2026-05-12T14:30', admin: 'admin', aksi: 'Tambah', page: 'FAQ', detail: 'Menambah pertanyaan "Apakah Edupongo cocok untuk pesantren?"' },
  { time: '2026-05-12T11:20', admin: 'admin', aksi: 'Edit', page: 'Blog', detail: 'Mengedit artikel "Terpercaya Sejak 2014"' },
  { time: '2026-05-11T16:55', admin: 'admin', aksi: 'Hapus', page: 'Testimoni', detail: 'Menghapus testimoni dari "Guru Senior SMK Telkom"' },
  { time: '2026-05-11T08:10', admin: 'admin', aksi: 'Login', page: 'Sistem', detail: 'Login berhasil dari browser Safari' },
];

const ACTION_CLASS = { Tambah: 'admin-log-tambah', Edit: 'admin-log-edit', Hapus: 'admin-log-hapus', Login: 'admin-log-login' };

function formatTime(d) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const dt = new Date(d);
  const dateStr = `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
  const timeStr = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
  return { dateStr, timeStr };
}

export default function LogPage({ showSnack }) {
  const [items] = useState(DUMMY);
  const [search, setSearch] = useState('');
  const [filterAksi, setFilterAksi] = useState('');
  const [filterPage, setFilterPage] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = items.filter((i) => {
    if (search && !i.detail.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterAksi && i.aksi !== filterAksi) return false;
    if (filterPage && i.page !== filterPage) return false;
    return true;
  });
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Log Aktivitas</h1>
          <p className="admin-page-subtitle">Riwayat semua aksi yang dilakukan admin di CMS.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <div className="admin-search-icon">
            <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          </div>
          <input className="admin-search-input" placeholder="Cari aktivitas..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="admin-select" value={filterAksi} onChange={(e) => { setFilterAksi(e.target.value); setPage(1); }}>
          <option value="">Semua Tipe</option>
          <option value="Tambah">Tambah</option>
          <option value="Edit">Edit</option>
          <option value="Hapus">Hapus</option>
          <option value="Login">Login</option>
        </select>
        <select className="admin-select" value={filterPage} onChange={(e) => { setFilterPage(e.target.value); setPage(1); }}>
          <option value="">Semua Halaman</option>
          <option value="Blog">Blog</option>
          <option value="Testimoni">Testimoni</option>
          <option value="FAQ">FAQ</option>
          <option value="Sistem">Sistem</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Waktu</th>
              <th style={{ width: 80 }}>Admin</th>
              <th style={{ width: 90 }}>Aksi</th>
              <th style={{ width: 100 }}>Halaman</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item, idx) => {
              const { dateStr, timeStr } = formatTime(item.time);
              return (
                <tr key={idx}>
                  <td><span style={{ fontSize: 12, color: 'var(--adm-text-dark)' }}>{dateStr} &middot; {timeStr}</span></td>
                  <td><span style={{ fontSize: 12, color: 'var(--adm-text-dark)' }}>{item.admin}</span></td>
                  <td><span className={`admin-log-badge ${ACTION_CLASS[item.aksi]}`}>{item.aksi}</span></td>
                  <td><span style={{ fontSize: 12, color: 'var(--adm-text-dark)' }}>{item.page}</span></td>
                  <td><span style={{ fontSize: 12, color: 'var(--adm-text-secondary)' }}>{item.detail}</span></td>
                </tr>
              );
            })}
            {paged.length === 0 && (
              <tr><td colSpan={5} className="admin-empty">Tidak ada data</td></tr>
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
