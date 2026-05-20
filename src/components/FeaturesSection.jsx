import { useState, useEffect } from 'react';
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
  data.forEach(f => {
    const t = f.tab || 'semua';
    if (grouped[t]) grouped[t].push(f);
  });
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

export default function FeaturesSection() {
  const [active, setActive] = useState('semua');
  const [panels, setPanels] = useState(FALLBACK_PANELS);

  useEffect(() => {
    getFeatures().then(data => {
      if (data && data.length) setPanels(buildPanels(data));
    }).catch(() => {});
  }, []);

  const panel = panels[active];

  return (
    <section className="features-section" id="fitur">
      <div className="features-header">
        <div>
          <div className="section-tag">Solusi Lengkap</div>
          <h2 className="section-title">Semua yang sekolah butuhkan<br />ada di satu platform</h2>
        </div>
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

      <div className={`features-panel active`} key={active}>
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
  );
}
