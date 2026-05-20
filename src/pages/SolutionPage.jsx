import { useState, useEffect } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { getFeatures } from '../lib/api';

const FALLBACK = {
  semua: [
    { icon: '✅', tag: 'Otomatis & Akurat', title: 'Presensi Digital: Manual, Fingerprint, atau GPS', desc: 'Catat kehadiran ratusan siswa dan guru dalam hitungan detik. Pilih metode yang paling sesuai, ketiganya terintegrasi langsung ke laporan.' },
    { icon: '📊', tag: 'Guru Fokus Ngajar', title: 'Rapor Digital: K13, Kurikulum Merdeka & Program Unggulan', desc: 'Input nilai sekali, rapor terformat otomatis. Mendukung tiga kurikulum sekaligus, guru tidak perlu ulang format dari nol setiap ganti kebijakan.' },
    { icon: '🏫', tag: 'Tanpa Antre, Tanpa Bolak-balik', title: 'PPDB Online: Pendaftaran, Berkas & Pengumuman Terpusat', desc: 'Calon siswa daftar dari rumah, upload berkas dari HP. Sekolah verifikasi dan umumkan hasil dari satu dashboard, tanpa berkas fisik.' },
    { icon: '💳', tag: 'Transparan & Real-Time', title: 'Pembayaran Terintegrasi: SPP, Tagihan & Laporan Otomatis', desc: 'Orang tua bayar SPP dari aplikasi, bendahara lihat status real-time. Laporan keuangan tersedia kapanpun tanpa rekap manual.' },
    { icon: '🖥️', tag: 'Nilai Langsung Keluar', title: 'Computer Based Test: Ujian Online & Analisa Butir Soal', desc: 'Siswa ujian di komputer, hasil keluar otomatis. Guru bisa analisa butir soal langsung dari platform; tidak ada lagi koreksi manual.' },
    { icon: '📚', tag: 'Satu Klik, Langsung Terkirim', title: 'Media Pembelajaran: Materi Tersimpan & Terbagi Mudah', desc: 'Guru upload materi sekali, siswa akses dari aplikasi kapanpun. Tidak ada lagi kirim file lewat WhatsApp yang berantakan.' },
    { icon: '💬', tag: 'Tidak Ada Info yang Telat', title: 'Live Chat & Pengumuman: dari Sekolah ke Orang Tua dalam Detik', desc: 'Kirim pengumuman ke seluruh orang tua dalam satu klik. Live chat untuk komunikasi langsung antara guru, TU, dan orang tua.' },
    { icon: '📱', tag: 'Pantau Dari Mana Saja', title: 'Aplikasi Orang Tua: Presensi, Rapor & Pembayaran di Satu Tempat', desc: 'Orang tua tahu anak hadir atau tidak hari ini, tanpa telepon ke sekolah. Rapor, pengumuman, dan tagihan semua di satu aplikasi.' },
    { icon: '📖', tag: 'Hemat Waktu Guru', title: 'Jurnal Mengajar Digital: Dokumentasi Kelas Tanpa Repot', desc: 'Guru isi jurnal mengajar langsung dari HP dalam hitungan menit. Kepala sekolah pantau progress mengajar semua guru dari satu dashboard.' },
  ],
  guru: [
    { icon: '📖', tag: 'Selesai dalam Menit', title: 'Jurnal Mengajar Digital', desc: 'Isi jurnal mengajar langsung dari HP, tidak perlu buka laptop, tidak perlu tulis manual. Dokumentasi kelas selesai sebelum jam istirahat berakhir.' },
    { icon: '✅', tag: 'Otomatis & Akurat', title: 'Presensi Siswa dari Aplikasi', desc: 'Absen siswa langsung dari HP saat jam pelajaran dimulai. Tidak ada lagi kertas presensi yang bisa hilang atau rekap manual yang memakan waktu.' },
    { icon: '📊', tag: 'Tidak Perlu Ulang Format', title: 'Rapor Digital: K13, Kurmer & Program Unggulan', desc: 'Input nilai sekali, rapor terformat otomatis sesuai kurikulum yang berlaku. Tidak ada lagi lembur sampai tengah malam hanya untuk format rapor.' },
    { icon: '📚', tag: 'Rapi & Mudah Diakses', title: 'Media Pembelajaran Digital', desc: 'Upload materi, video, atau dokumen sekali; siswa bisa akses kapanpun dari aplikasi. Tidak perlu kirim ulang setiap pertemuan.' },
    { icon: '🖥️', tag: 'Koreksi Nol Detik', title: 'Computer Based Test', desc: 'Buat soal ujian di platform, siswa kerjakan online, nilai keluar otomatis. Guru bisa langsung lihat analisa hasil ujian per siswa dan per soal.' },
    { icon: '🪪', tag: 'Tanpa Antre di TU', title: 'Perizinan PTK dari HP', desc: 'Ajukan izin atau cuti langsung dari aplikasi; kepala sekolah approve dari dashboard mereka. Tidak perlu tanda tangan fisik bolak-balik.' },
  ],
  kepsek: [
    { icon: '📈', tag: 'Satu Dashboard, Semua Data', title: 'Pantau Sekolah Secara Real-Time', desc: 'Kehadiran siswa hari ini, progress jurnal mengajar guru, status pembayaran SPP, dan data PPDB, semuanya terlihat dari satu layar tanpa harus tanya ke masing-masing bagian.' },
    { icon: '🏫', tag: 'Lebih Rapi, Lebih Cepat', title: 'Manajemen PPDB Terpusat', desc: 'Kelola seluruh proses penerimaan siswa baru dari satu platform: dari pendaftaran, verifikasi berkas, seleksi, hingga pengumuman hasil. Transparan dan tercatat.' },
    { icon: '💰', tag: 'Laporan Kapanpun Siap', title: 'Laporan Keuangan Real-Time', desc: 'Lihat status tagihan, rekapitulasi pembayaran, dan laporan keuangan sekolah kapanpun tanpa harus minta ke bendahara. Data selalu up-to-date.' },
    { icon: '👥', tag: 'Data Lengkap & Terstruktur', title: 'Manajemen Data Guru & Pegawai', desc: 'Kelola data kepegawaian, presensi guru, jurnal aktivitas, dan perizinan dalam satu sistem. Tidak ada lagi data yang berceceran di berbagai file.' },
    { icon: '📢', tag: 'Sampai dalam Detik', title: 'Pengumuman & Humas Digital', desc: 'Kirim pengumuman ke orang tua, guru, atau seluruh warga sekolah dalam satu klik. Tidak ada lagi informasi yang telat atau tidak merata.' },
    { icon: '🎓', tag: 'Lengkap & Terpusat', title: 'Data Siswa, Alumni & BK', desc: 'Seluruh riwayat data siswa, mulai dari penerimaan, akademik, bimbingan konseling, hingga alumni, tersimpan rapi dan mudah diakses kapanpun.' },
  ],
  ortu: [
    { icon: '📍', tag: 'Tahu Setiap Hari', title: 'Data Presensi Anak Secara Real-Time', desc: 'Orang tua tahu anak hadir atau tidak hari ini, langsung dari notifikasi HP. Tidak perlu telepon ke sekolah lagi hanya untuk cek kehadiran.' },
    { icon: '📊', tag: 'Tidak Perlu Tunggu Akhir Semester', title: 'Akses Rapor Digital Kapanpun', desc: 'Lihat perkembangan akademik anak langsung dari aplikasi, tidak perlu tunggu hari pembagian rapor. Semua nilai dan catatan guru tersedia digital.' },
    { icon: '💳', tag: 'Bayar dari Mana Saja', title: 'Pembayaran SPP dari Aplikasi', desc: 'Bayar tagihan sekolah langsung dari HP, tidak perlu bawa uang tunai atau antre di sekolah. Riwayat pembayaran tersimpan otomatis dan bisa dicek kapanpun.' },
    { icon: '📢', tag: 'Langsung Sampai, Tidak Telat', title: 'Pengumuman Sekolah Real-Time', desc: 'Informasi dari sekolah sampai langsung ke HP orang tua begitu dikirim. Tidak ada lagi pengumuman yang terlewat karena tidak ada di grup WhatsApp.' },
    { icon: '💬', tag: 'Komunikasi Langsung', title: 'Live Chat dengan Guru & Sekolah', desc: 'Tanya langsung ke wali kelas atau TU dari aplikasi; semua percakapan tercatat rapi. Tidak perlu cari nomor WhatsApp pribadi guru lagi.' },
    { icon: '🙋', tag: 'Tanpa Harus Datang ke Sekolah', title: 'Perizinan Anak dari HP', desc: 'Ajukan izin tidak masuk langsung dari aplikasi; guru langsung menerima notifikasi dan status izin tercatat otomatis di sistem presensi sekolah.' },
  ],
};

const PERSONA_INTRO = {
  guru: { emoji: '👨‍🏫', title: 'Edupongo untuk Guru', desc: 'Kurangi beban administrasi: biar guru bisa fokus ke hal yang paling penting: mengajar dan mendidik siswa.' },
  kepsek: { emoji: '🏫', title: 'Edupongo untuk Kepala Sekolah', desc: 'Pantau seluruh operasional sekolah dari satu dashboard: tanpa harus menunggu laporan dari masing-masing bagian.' },
  ortu: { emoji: '👨‍👩‍👧', title: 'Edupongo untuk Orang Tua', desc: 'Terhubung langsung dengan aktivitas anak di sekolah: tanpa perlu telepon, tanpa harus datang.' },
};

const TABS = [
  { key: 'semua', label: 'Semua Fitur' },
  { key: 'guru', label: 'Untuk Guru' },
  { key: 'kepsek', label: 'Untuk Kepala Sekolah' },
  { key: 'ortu', label: 'Untuk Orang Tua' },
];

function buildPanels(data) {
  const grouped = { semua: [], guru: [], kepsek: [], ortu: [] };
  data.forEach(f => { const t = f.tab || 'semua'; if (grouped[t]) grouped[t].push(f); });
  grouped.semua = data;
  return {
    semua: { features: grouped.semua },
    guru: { intro: PERSONA_INTRO.guru, features: grouped.guru },
    kepsek: { intro: PERSONA_INTRO.kepsek, features: grouped.kepsek },
    ortu: { intro: PERSONA_INTRO.ortu, features: grouped.ortu },
  };
}

const FALLBACK_PANELS = {
  semua: { features: FALLBACK.semua },
  guru: { intro: PERSONA_INTRO.guru, features: FALLBACK.guru },
  kepsek: { intro: PERSONA_INTRO.kepsek, features: FALLBACK.kepsek },
  ortu: { intro: PERSONA_INTRO.ortu, features: FALLBACK.ortu },
};

export default function SolutionPage({ onNavigate, onOpenDemo }) {
  const [active, setActive] = useState('semua');
  const [panels, setPanels] = useState(FALLBACK_PANELS);

  useEffect(() => {
    getFeatures().then(data => {
      if (data && data.length) setPanels(buildPanels(data));
    }).catch(() => {});
  }, []);

  const panel = panels[active];

  return (
    <div style={{ background: '#fff' }}>
      {/* Page Hero — rata kiri */}
      <div className="solution-hero">
        <button
          onClick={() => onNavigate('home')}
          className="solution-back-btn"
        >
          <IconArrowLeft size={15} stroke={2} />
          Kembali ke Beranda
        </button>
        <div className="solution-hero-content">
          <span className="section-tag">Solusi Lengkap</span>
          <h1 className="section-title">Semua fitur yang sekolah<br />butuhkan, ada di sini</h1>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            Dari presensi hingga keuangan, semuanya tersedia dalam satu platform untuk seluruh operasional sekolah.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <section className="features-section" style={{ paddingTop: 20 }}>
        {/* Tabs saja, rata kiri, tanpa judul */}
        <div style={{ marginBottom: 36 }}>
          <div className="features-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`feature-tab ${active === t.key ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="features-panel active" key={active}>
          {panel.intro && (
            <div className="persona-intro">
              <span className="persona-emoji">{panel.intro.emoji}</span>
              <div className="persona-intro-text">
                <h3>{panel.intro.title}</h3>
                <p>{panel.intro.desc}</p>
              </div>
            </div>
          )}
          <div className="features-grid">
            {panel.features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-card-icon">{f.icon}</div>
                <div className="feature-card-tag">{f.tag}</div>
                <div className="feature-card-title">{f.title}</div>
                <div className="feature-card-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <MobileAppsSection />
    </div>
  );
}

/* ─── Store Badges ─────────────────────────────────────────── */
function PlayStoreBadge({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#000', borderRadius: 10, padding: '9px 16px', textDecoration: 'none', transition: 'opacity 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3.18 23.76c.37.21.8.22 1.18.05L15.6 12 4.36.19C3.98.02 3.55.03 3.18.24 2.45.66 2 1.42 2 2.28v19.44c0 .86.45 1.62 1.18 2.04z" fill="#EA4335"/>
        <path d="M20.82 10.19l-3.22-1.84L14.2 12l3.4 3.65 3.22-1.84c.92-.52.92-1.79 0-2.62z" fill="#FBBC04"/>
        <path d="M4.36 23.81L15.6 12 17.6 13.65 6.36 23.61c-.64.58-1.6.6-2.27.2z" fill="#34A853"/>
        <path d="M4.36.19l11.24 11.81L17.6 10.35 6.36.39C5.72-.19 4.76-.17 4.1.2z" fill="#4285F4"/>
      </svg>
      <div>
        <div style={{ fontSize: 9, color: '#ccc', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>GET IT ON</div>
        <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>Google Play</div>
      </div>
    </a>
  );
}

function AppStoreBadge({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#000', borderRadius: 10, padding: '9px 16px', textDecoration: 'none', transition: 'opacity 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div>
        <div style={{ fontSize: 9, color: '#ccc', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>DOWNLOAD ON THE</div>
        <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>App Store</div>
      </div>
    </a>
  );
}

/* ─── Phone Mockup ─────────────────────────────────────────── */
function PhoneMockup({ children, gradientFrom, gradientTo }) {
  return (
    <div style={{
      width: 180, height: 340, borderRadius: 30, background: '#111', padding: 6,
      boxShadow: '0 24px 60px rgba(0,0,0,0.22)', flexShrink: 0, margin: '0 auto',
    }}>
      {/* Notch */}
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 25, overflow: 'hidden', background: '#fff' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 20, background: '#111', borderRadius: '0 0 12px 12px', zIndex: 10 }} />
        {/* App header */}
        <div style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`, padding: '28px 14px 14px', height: 90 }}>
          {children}
        </div>
        {/* App body placeholder */}
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[90, 70, 85, 60, 75].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${gradientFrom}22`, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ height: 8, borderRadius: 4, background: '#E5E7EB', width: `${w}%` }} />
                <div style={{ height: 6, borderRadius: 4, background: '#F3F4F6', width: `${w - 20}%` }} />
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#fff' }}>
          {['⊞', '✉', '👤'].map((ic, i) => (
            <div key={i} style={{ fontSize: 16, opacity: i === 0 ? 1 : 0.35 }}>{ic}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── App Card ─────────────────────────────────────────────── */
function AppCard({ emoji, title, subtitle, target, desc, features, playUrl, appStoreUrl, gradientFrom, gradientTo, phoneContent }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: '32px 28px',
      border: '1.5px solid #E8ECF4',
      boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      {/* Phone mockup — hidden on mobile */}
      <div className="mobile-phone-mockup">
        <PhoneMockup gradientFrom={gradientFrom} gradientTo={gradientTo}>
          {phoneContent}
        </PhoneMockup>
      </div>

      {/* App info */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${gradientFrom}18`, borderRadius: 100, padding: '4px 12px', marginBottom: 10 }}>
          <span style={{ fontSize: 14 }}>{emoji}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: gradientFrom, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Inter, sans-serif' }}>{target}</span>
        </div>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, color: '#010E23', marginBottom: 6, lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 14 }}>{desc}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {features.map((f) => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#374151' }}>
              <span style={{ color: gradientFrom, fontWeight: 700, flexShrink: 0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Store badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {playUrl && <PlayStoreBadge href={playUrl} />}
        {appStoreUrl && <AppStoreBadge href={appStoreUrl} />}
      </div>
    </div>
  );
}

/* ─── Mobile Apps Section ──────────────────────────────────── */
function MobileAppsSection() {
  const apps = [
    {
      emoji: '👨‍🏫',
      target: 'Untuk Guru',
      title: 'Edupongo Guru',
      desc: 'Semua kebutuhan administrasi guru dalam satu aplikasi, dari presensi hingga komunikasi dengan orang tua.',
      features: [
        'Presensi siswa langsung dari HP',
        'Input nilai & cetak rapor digital',
        'Live Chat dengan orang tua',
        'Pengumuman & jurnal mengajar',
      ],
      playUrl: 'https://play.google.com/store/apps/details?id=com.igedupongo.androidwali',
      appStoreUrl: null,
      gradientFrom: '#046CF2',
      gradientTo: '#0348C4',
      phoneContent: (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>Edupongo Guru</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Selamat pagi, Pak! 👋</div>
          <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 10px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>28</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Hadir</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>2</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Izin</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>1</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Alfa</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      emoji: '👨‍👩‍👧',
      target: 'Untuk Orang Tua',
      title: 'Edupongo Orangtua',
      desc: 'Pantau perkembangan anak, bayar SPP, dan komunikasi langsung dengan sekolah dari satu aplikasi.',
      features: [
        'Pantau kehadiran anak real-time',
        'Akses rapor & nilai digital',
        'Bayar SPP langsung dari HP',
        'Chat & pengumuman dari sekolah',
      ],
      playUrl: 'https://play.google.com/store/apps/details?id=com.igedupongo.android',
      appStoreUrl: 'https://apps.apple.com/app/edupongo/id1481988621',
      gradientFrom: '#046CF2',
      gradientTo: '#0348C4',
      phoneContent: (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>Edupongo</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Ahmad Rizki · VII-A</div>
          <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#86EFAC', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Hadir hari ini ✓</span>
          </div>
        </div>
      ),
    },
    {
      emoji: '🎒',
      target: 'Untuk Siswa',
      title: 'Edupongo Siswa',
      desc: 'Akses materi, jadwal, nilai, dan pengumuman sekolah langsung dari smartphone siswa.',
      features: [
        'Lihat jadwal pelajaran harian',
        'Akses materi & tugas dari guru',
        'Cek nilai & rapor digital',
        'Notifikasi pengumuman sekolah',
      ],
      playUrl: 'https://play.google.com/store/apps/details?id=com.igedupongo.androidsiswa',
      appStoreUrl: null,
      gradientFrom: '#046CF2',
      gradientTo: '#0348C4',
      phoneContent: (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>Edupongo Siswa</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Halo, Ahmad! 🎒</div>
          <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '5px 10px', fontSize: 11, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ fontWeight: 600 }}>Hari ini: 4 pelajaran</div>
            <div style={{ opacity: 0.8, marginTop: 2 }}>Matematika · 08.00–09.30</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section style={{ background: '#F8FAFF', padding: '72px 100px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span className="section-tag">Aplikasi Mobile</span>
        <h2 className="section-title">Tersedia di smartphone<br />guru, siswa & orang tua</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Edupongo hadir dalam 3 aplikasi mobile, akses kapanpun, dari mana saja.
        </p>
      </div>
      <div className="mobile-apps-grid">
        {apps.map((app) => (
          <AppCard key={app.title} {...app} />
        ))}
      </div>
    </section>
  );
}
