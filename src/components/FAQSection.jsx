import { useState, useEffect } from 'react';
import { getFAQs } from '../lib/api';

const FALLBACK_DATA = {
  umum: [
    { q: 'Apakah Edupongo cocok untuk pesantren dan boarding school?', a: 'Ya: dan ini justru yang membedakan Edupongo dari platform manajemen sekolah lainnya. Edupongo dirancang dari awal untuk memahami ekosistem pesantren: dari manajemen santri, koordinasi asrama, hingga integrasi yayasan dalam satu sistem. Sudah dipakai oleh beberapa pondok pesantren dan boarding school di Jawa.' },
    { q: 'Jenjang sekolah apa saja yang bisa menggunakan Edupongo?', a: 'Edupongo mendukung semua jenjang: <strong>RA/TK, MI/SD, MTs/SMP, MA/SMA, dan SMK</strong>: baik negeri maupun swasta. Termasuk PKBM dan lembaga pendidikan nonformal lainnya. Satu platform yang sama bisa dipakai oleh seluruh unit di bawah satu yayasan.' },
    { q: 'Apakah Edupongo mendukung Kurikulum Merdeka?', a: 'Ya. Edupongo mendukung <strong>tiga kurikulum sekaligus</strong>: Kurikulum 13, Kurikulum Merdeka, dan Program Unggulan. Format rapor menyesuaikan otomatis sesuai kurikulum yang dipilih per kelas atau per rombel.' },
    { q: 'Sudah berapa lama Edupongo beroperasi?', a: 'Edupongo telah mendampingi sekolah-sekolah di Indonesia <strong>sejak 2014</strong>: lebih dari 10 tahun. Platform kami juga telah terdaftar <strong>HaKI di Kemenkumham RI</strong>.' },
  ],
  fitur: [
    { q: 'Metode presensi apa saja yang tersedia?', a: 'Edupongo menyediakan tiga metode presensi: <strong>Presensi manual</strong> via portal website, <strong>presensi fingerprint</strong>, dan <strong>presensi berbasis lokasi GPS</strong> melalui aplikasi mobile.' },
    { q: 'Bagaimana cara orang tua mengakses informasi anak?', a: 'Orang tua cukup download <strong>aplikasi Edupongo</strong> di Google Play Store atau App Store. Dari satu aplikasi, mereka bisa memantau kehadiran harian anak, melihat rapor digital, membayar tagihan SPP, dan berkomunikasi langsung dengan guru.' },
    { q: 'Apakah ada fitur ujian online (CBT)?', a: 'Ya. Edupongo dilengkapi fitur <strong>Computer Based Test (CBT)</strong>: guru bisa membuat bank soal, menjadwalkan ujian, dan hasilnya keluar otomatis. Tersedia juga fitur analisa butir soal.' },
    { q: 'Apakah ada aplikasi mobile untuk guru?', a: 'Ada. Edupongo menyediakan <strong>aplikasi mobile terpisah untuk guru</strong> yang mencakup presensi siswa, jurnal mengajar, media pembelajaran, dan perizinan PTK.' },
  ],
  implementasi: [
    { q: 'Berapa lama proses implementasi di sekolah?', a: 'Durasi implementasi bervariasi tergantung skala sekolah. <strong>Tim Edupongo mendampingi penuh</strong> dari awal hingga sekolah siap mandiri: mulai dari setup sistem, migrasi data, pelatihan, hingga go-live.' },
    { q: 'Apakah ada pelatihan untuk guru dan operator sekolah?', a: 'Ya. Setiap sekolah yang bergabung mendapatkan <strong>sesi pelatihan langsung</strong> untuk operator dan guru. Tim kami juga menyediakan panduan dan dokumentasi yang bisa diakses kapanpun.' },
    { q: 'Bagaimana cara memulai dengan Edupongo?', a: 'Langkah pertama adalah <strong>jadwalkan sesi demo gratis</strong> bersama tim kami. Hubungi kami di <strong>contact@edupongo.com</strong> atau klik tombol "Jadwalkan Demo" di halaman ini.' },
  ],
  keamanan: [
    { q: 'Apakah data siswa aman di Edupongo?', a: 'Keamanan data adalah prioritas utama kami. Seluruh data <strong>dienkripsi dan dikelola dengan standar keamanan ketat</strong>. Platform Edupongo telah terdaftar sebagai <strong>HaKI di Kemenkumham RI</strong>.' },
    { q: 'Siapa saja yang bisa mengakses data sekolah?', a: 'Akses data diatur dengan sistem <strong>role-based access control</strong>: setiap pengguna hanya bisa melihat data sesuai perannya. Kepala sekolah punya akses penuh, guru hanya bisa akses kelasnya, orang tua hanya data anak mereka.' },
    { q: 'Apa yang terjadi dengan data jika berhenti berlangganan?', a: 'Seluruh data tetap menjadi milik sekolah. Tim Edupongo akan membantu proses <strong>ekspor data secara lengkap</strong> dalam format yang bisa digunakan.' },
  ],
};

const CATEGORY_META = {
  umum: { icon: '💡', label: 'Umum' },
  fitur: { icon: '⚙️', label: 'Fitur & Platform' },
  implementasi: { icon: '🚀', label: 'Implementasi' },
  keamanan: { icon: '🔒', label: 'Keamanan & Data' },
};

function groupFAQs(items) {
  const grouped = { umum: [], fitur: [], implementasi: [], keamanan: [] };
  items.forEach(f => {
    const cat = f.category || 'umum';
    if (grouped[cat]) {
      grouped[cat].push({ q: f.question, a: f.answer });
    } else {
      grouped.umum.push({ q: f.question, a: f.answer });
    }
  });
  return grouped;
}

function buildCategories(data) {
  return Object.keys(CATEGORY_META).map(key => ({
    key,
    icon: CATEGORY_META[key].icon,
    label: CATEGORY_META[key].label,
    count: (data[key] || []).length,
  }));
}

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-trigger" onClick={onToggle}>
        <span className="faq-q">{q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-body">
        <div className="faq-a" dangerouslySetInnerHTML={{ __html: a }} />
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [faqData, setFaqData] = useState(FALLBACK_DATA);
  const [activeCat, setActiveCat] = useState('umum');
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    getFAQs().then(data => {
      if (data && data.length) setFaqData(groupFAQs(data));
    }).catch(() => {});
  }, []);

  const categories = buildCategories(faqData);

  const toggleItem = (cat, idx) => {
    setOpenItems((prev) => {
      const next = {};
      faqData[cat].forEach((_, i) => { next[`${cat}-${i}`] = false; });
      next[`${cat}-${idx}`] = !prev[`${cat}-${idx}`];
      return next;
    });
  };

  const switchCategory = (key) => {
    setActiveCat(key);
    setOpenItems({});
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-tag">FAQ</div>
      <h2 className="section-title">Pertanyaan yang sering ditanyakan</h2>
      <p className="section-sub">Klik pertanyaan untuk lihat jawabannya. Masih ada yang belum terjawab? Hubungi tim kami langsung.</p>
      <div className="faq-layout">
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`faq-cat-btn ${activeCat === cat.key ? 'active' : ''}`}
              onClick={() => switchCategory(cat.key)}
            >
              <span className="faq-cat-icon">{cat.icon}</span>
              {cat.label}
              <span className="faq-cat-count">{cat.count}</span>
            </button>
          ))}
        </div>
        <div className="faq-accordion">
          {Object.entries(faqData).map(([key, items]) => (
            <div className={`faq-group ${activeCat === key ? 'active' : ''}`} key={key}>
              {items.map((item, idx) => (
                <FAQItem
                  key={idx}
                  q={item.q}
                  a={item.a}
                  isOpen={!!openItems[`${key}-${idx}`]}
                  onToggle={() => toggleItem(key, idx)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
