const milestones = [
  { year: '2016', title: 'Santripreneur Digital Product', desc: 'Edupongo lahir sebagai produk digital untuk pesantren: fondasi awal sebelum berkembang lebih luas.' },
  { year: '2017', title: 'Cakrawala Awards', desc: 'Pengakuan pertama atas inovasi platform manajemen sekolah berbasis teknologi.' },
  { year: '2019', title: 'PBBT RISTEK-BRIN', desc: 'Lolos seleksi Program Bantuan Bisnis Teknologi dari Kementerian Riset & Teknologi.' },
  { year: '2021', title: 'BekUp Scale Program', desc: 'Bagian dari program akselerasi bisnis digital nasional: memperluas jangkauan ke lebih banyak sekolah.' },
  { year: '2026', title: '100+ Sekolah, 30rb+ Pengguna', desc: 'Terus tumbuh bersama sekolah-sekolah di seluruh Indonesia dengan ekosistem yang semakin lengkap.' },
];

export default function AboutMilestone() {
  return (
    <section className="about-milestone">
      <div className="about-milestone-inner">
        <div className="about-milestone-header">
          <div className="about-milestone-tag">Perjalanan Kami</div>
          <h2>Lebih dari 10 tahun mendampingi sekolah Indonesia</h2>
          <p>Setiap milestone adalah hasil kerja sama dengan ratusan sekolah yang percaya pada misi kami.</p>
        </div>
        <div className="about-timeline">
          {milestones.map((m) => (
            <div className="about-timeline-item" key={m.year}>
              <div className="about-timeline-dot"></div>
              <div className="about-timeline-card">
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-title">{m.title}</div>
                <div className="about-timeline-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="about-haki-badge">
          <div className="about-haki-icon">✓</div>
          <div className="about-haki-content">
            <h4>Terdaftar HaKI Kemenkumham RI</h4>
            <p>Edupongo telah terdaftar Hak Kekayaan Intelektual di Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum dan HAM Republik Indonesia.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
