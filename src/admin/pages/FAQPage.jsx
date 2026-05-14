import { useState } from 'react';
import { IconPlus, IconSearch, IconFilter } from '@tabler/icons-react';

const CATEGORIES = [
  { id: 'umum', icon: '🔑', label: 'Umum', count: 4 },
  { id: 'fitur', icon: '⚙️', label: 'Fitur & Platform', count: 4 },
  { id: 'implementasi', icon: '🚀', label: 'Implementasi', count: 3 },
  { id: 'keamanan', icon: '🔒', label: 'Keamanan & Data', count: 3 },
];

const FAQ_DATA = {
  umum: [
    { q: 'Apakah Edupongo cocok untuk pesantren dan boarding school?', a: 'Ya: dan ini justru yang membedakan Edupongo dari platform manajemen sekolah lainnya. Edupongo dirancang dari awal untuk memahami ekosistem pesantren: dari manajemen santri, koordinasi asrama, hingga integrasi yayasan dalam satu sistem. Sudah dipakai oleh beberapa pondok pesantren dan boarding school di Jawa.' },
    { q: 'Jenjang sekolah apa saja yang bisa menggunakan Edupongo?', a: 'Edupongo dapat digunakan oleh SD, SMP, SMA, SMK, hingga pesantren dan boarding school dari berbagai jenjang.' },
    { q: 'Apakah Edupongo mendukung Kurikulum Merdeka?', a: 'Ya, Edupongo sudah mendukung penuh Kurikulum Merdeka termasuk pelaporan capaian pembelajaran dan P5.' },
    { q: 'Sudah berapa lama Edupongo beroperasi?', a: 'Edupongo telah beroperasi sejak 2014, lebih dari 10 tahun mendampingi sekolah-sekolah di Indonesia.' },
  ],
  fitur: [
    { q: 'Metode presensi apa saja yang didukung?', a: 'Edupongo mendukung 3 metode: presensi via web, fingerprint, dan GPS berbasis lokasi di aplikasi mobile.' },
    { q: 'Apakah ada aplikasi mobile untuk orang tua?', a: 'Ya, tersedia aplikasi mobile untuk orang tua agar bisa memantau kehadiran dan perkembangan anak secara real-time.' },
    { q: 'Apakah bisa diintegrasikan dengan sistem yang sudah ada?', a: 'Edupongo menyediakan API yang dapat diintegrasikan dengan sistem manajemen sekolah yang sudah berjalan.' },
    { q: 'Apakah tersedia fitur laporan dan analitik?', a: 'Ya, tersedia dashboard analitik lengkap dengan laporan kehadiran, akademik, dan keuangan yang bisa diekspor.' },
  ],
  implementasi: [
    { q: 'Berapa lama proses implementasi Edupongo?', a: 'Proses setup awal biasanya selesai dalam 1-2 hari kerja, termasuk pelatihan tim sekolah.' },
    { q: 'Apakah ada dukungan teknis setelah implementasi?', a: 'Ya, kami menyediakan dukungan teknis via WhatsApp, email, dan kunjungan langsung jika diperlukan.' },
    { q: 'Bagaimana proses migrasi data dari sistem lama?', a: 'Tim kami akan membantu proses migrasi data secara penuh tanpa biaya tambahan.' },
  ],
  keamanan: [
    { q: 'Apakah data sekolah kami aman?', a: 'Data disimpan dengan enkripsi SSL dan backup otomatis setiap hari. Server kami berlokasi di Indonesia.' },
    { q: 'Siapa yang bisa mengakses data sekolah kami?', a: 'Hanya admin sekolah yang terdaftar yang dapat mengakses data. Edupongo tidak membagikan data ke pihak ketiga.' },
    { q: 'Apakah Edupongo sudah tersertifikasi?', a: 'Ya, Edupongo memiliki HaKI terdaftar dan telah lolos seleksi RISTEK-BRIN sebagai bukti kualitas platform kami.' },
  ],
};

export default function FAQPage({ showSnack }) {
  const [cat, setCat] = useState('umum');
  const [openId, setOpenId] = useState(null);

  const toggle = (idx) => setOpenId(openId === idx ? null : idx);
  const items = FAQ_DATA[cat] || [];

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">FAQ</h1>
          <p className="admin-page-subtitle">Kelola pertanyaan yang sering ditanyakan.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => showSnack?.('info', 'Fitur tambah FAQ sedang dikembangkan.')}>
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
              <button key={c.id} className={`admin-cat-btn${cat === c.id ? ' active' : ''}`} onClick={() => setCat(c.id)}>
                <span className="admin-cat-btn-icon">{c.icon}</span>
                <span className="admin-cat-btn-label">{c.label}</span>
                <span className="admin-cat-btn-count">{c.count} pertanyaan</span>
              </button>
            ))}
          </div>
          <button className="admin-btn admin-btn-outline admin-btn-sm admin-btn-block" style={{ marginTop: 12 }} onClick={() => showSnack?.('info', 'Fitur tambah kategori sedang dikembangkan.')}>
            <IconPlus size={14} stroke={1.5} /> Tambah Kategori
          </button>
        </div>

        <div style={{ flex: 1, minWidth: 0, background: 'var(--adm-surface)', borderRadius: 'var(--adm-radius-lg)', border: '1px solid var(--adm-border)', padding: '4px 24px' }}>
          {items.map((faq, idx) => (
            <div className="admin-accordion-item" key={idx}>
              <button className="admin-accordion-trigger" onClick={() => toggle(idx)}>
                <span className="admin-accordion-title">{faq.q}</span>
                <span className={`admin-accordion-icon${openId === idx ? ' open' : ''}`}>
                  <IconPlus size={20} stroke={1.5} />
                </span>
              </button>
              {openId === idx && (
                <div className="admin-accordion-content">{faq.a}</div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="admin-empty">Tidak ada pertanyaan di kategori ini.</div>
          )}
        </div>
      </div>
    </div>
  );
}
