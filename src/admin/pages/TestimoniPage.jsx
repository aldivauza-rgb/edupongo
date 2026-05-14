import { useState } from 'react';
import TambahTestimoniPage from './TambahTestimoniPage';

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
  edit: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  trash: 'M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
};

const DUMMY = [
  { id: 1, name: 'Wakil Kepala Sekolah', initial: 'W', bg: '#046CF2', instansi: 'MA Unggulan Wahab Hasbulloh, Jombang, Jawa Timur', status: 'terbit', text: 'Yang paling saya suka adalah orang tua sekarang bisa langsung tahu kalau anaknya tidak hadir. Dulu mereka baru tahu kalau sudah telepon ke sekolah: dan kadang kami sendiri yang kewalahan mengangkat telepon.' },
  { id: 2, name: 'Kepala Sekolah', initial: 'K', bg: '#007955', instansi: 'SMP Negeri 3 Surabaya, Jawa Timur', status: 'terbit', text: 'Sistem ini benar-benar mengubah cara kami bekerja. Laporan yang dulu butuh waktu berhari-hari sekarang bisa selesai dalam hitungan menit.' },
  { id: 3, name: 'Guru Senior', initial: 'G', bg: '#E07B00', instansi: 'SMK Telkom Malang, Jawa Timur', status: 'draf', text: 'Fitur presensi GPS sangat membantu kami memantau kehadiran guru di lapangan secara real-time.' },
];

export default function TestimoniPage({ showSnack }) {
  const [items, setItems] = useState(DUMMY);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const perPage = 10;

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.instansi.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const handleAddTestimoni = (data) => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    setItems((prev) => [{ id: newId, ...data }, ...prev]);
    setShowForm(false);
    showSnack?.('success', `Testimoni ${data.status === 'terbit' ? 'diterbitkan' : 'disimpan sebagai draf'}.`);
  };

  if (showForm) {
    return <TambahTestimoniPage onBack={() => setShowForm(false)} onSubmit={handleAddTestimoni} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Testimoni</h1>
          <p className="admin-page-subtitle">Kelola testimoni yang tampil di website.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowForm(true)}>
            <Icon d={I.plus} size={16} /> Tambah Testimoni
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <div className="admin-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input className="admin-search-input" placeholder="Cari testimoni..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <button className="admin-filter-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
          Filter
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
            {paged.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 15, color: '#fff', flexShrink: 0 }}>
                    {item.initial}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--adm-text)' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--adm-text-secondary)', marginTop: 2 }}>{item.instansi}</div>
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
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => showSnack?.('info', 'Edit testimoni: ' + item.name)}>
                      <Icon d={I.edit} size={15} />
                    </button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => showSnack?.('info', 'Konfirmasi hapus testimoni')}>
                      <Icon d={I.trash} size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
