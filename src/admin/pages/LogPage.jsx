import { useState, useRef, useEffect } from 'react';
import { IconSearch, IconFilter, IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVal, setFilterVal] = useState({ aksi: '', halaman: '', bulan: '', tahun: '' });
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const hasFilter = filterVal.aksi || filterVal.halaman || filterVal.bulan || filterVal.tahun;

  const filtered = items.filter((i) => {
    if (search && !i.detail.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterVal.aksi && i.aksi !== filterVal.aksi) return false;
    if (filterVal.halaman && i.page !== filterVal.halaman) return false;
    if (filterVal.bulan) {
      const d = new Date(i.time);
      if (d.getMonth() + 1 !== parseInt(filterVal.bulan)) return false;
    }
    if (filterVal.tahun) {
      const d = new Date(i.time);
      if (d.getFullYear() !== parseInt(filterVal.tahun)) return false;
    }
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
        <div style={{ position: 'relative' }}>
          <button className={`admin-filter-btn${hasFilter ? ' active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
            <IconFilter size={16} stroke={1.5} /> Filter
          </button>
          {filterOpen && (
            <div className="admin-filter-popup" ref={filterRef}>
              <div className="admin-filter-popup-header">
                <span className="admin-filter-popup-header-title">Filter</span>
                <button className="admin-filter-popup-header-reset" onClick={() => { setFilterVal({ aksi: '', halaman: '', bulan: '', tahun: '' }); setPage(1); }}>Reset</button>
              </div>
              <div className="admin-filter-grid">
                <div>
                  <label>Tipe Aksi</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.aksi} onChange={(e) => setFilterVal((p) => ({ ...p, aksi: e.target.value }))}>
                      <option value="">Semua Aksi</option>
                      <option value="Tambah">Tambah</option>
                      <option value="Edit">Edit</option>
                      <option value="Hapus">Hapus</option>
                      <option value="Login">Login</option>
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Halaman</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.halaman} onChange={(e) => setFilterVal((p) => ({ ...p, halaman: e.target.value }))}>
                      <option value="">Semua Halaman</option>
                      <option value="Blog">Blog</option>
                      <option value="Testimoni">Testimoni</option>
                      <option value="FAQ">FAQ</option>
                      <option value="Sistem">Sistem</option>
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Bulan</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.bulan} onChange={(e) => setFilterVal((p) => ({ ...p, bulan: e.target.value }))}>
                      <option value="">Semua Bulan</option>
                      {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Tahun</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.tahun} onChange={(e) => setFilterVal((p) => ({ ...p, tahun: e.target.value }))}>
                      <option value="">Semua Tahun</option>
                      {[2024,2025,2026].map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
              <div className="admin-filter-popup-actions">
                <button className="admin-filter-btn-reset" onClick={() => { setFilterVal({ aksi: '', halaman: '', bulan: '', tahun: '' }); setPage(1); }}>Reset All</button>
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
    </div>
  );
}
