const schools = [
  'SMA Lab UM Malang', 'SMA Al-Azhar 7 Solo', 'MAN 3 Jombang',
  'MA Unggulan Wahab Hasbulloh', 'SMP Darrunajah 2 Karangploso', 'MA Plus Al Hadi Bojonegoro',
  'PKBM Fanana Insan Baksya', 'Ponpes Maskan Mamba\'ul Ulum', 'SMP Islam An Nawawiyah Rembang',
  'MI An Nuroniyah Rembang', 'SMK An Nuroniyah Rembang', 'SMP Mamba\'ul Maarif Denanyar',
  'Pondok Pesantren Al Asmaul Husna', 'Ponpes Tambakberas Jombang', 'dan 85+ sekolah lainnya',
];

export default function AboutTrust() {
  return (
    <section className="about-trust">
      <div className="about-trust-inner">
        <div className="about-trust-header">
          <div className="about-trust-tag">Dipercaya & Terbukti</div>
          <h2>Mereka yang menjadikan kami partner manajemen sekolahnya</h2>
          <p>Dari SMA negeri hingga pondok pesantren — beragam sekolah dengan kebutuhan unik telah mempercayakan sistem mereka pada Edupongo.</p>
        </div>
        <div className="about-trust-stats">
          {[
            { num: '100+', label: 'Sekolah Aktif', sub: 'se-Indonesia' },
            { num: '30rb+', label: 'Pengguna Aktif', sub: 'Play & App Store' },
            { num: '30+', label: 'Kota', sub: 'Tersebar di Indonesia' },
          ].map((s) => (
            <div className="about-trust-stat" key={s.label}>
              <div className="about-trust-stat-num">{s.num}</div>
              <div className="about-trust-stat-label">{s.label}</div>
              <div className="about-trust-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="about-school-list-title">Sekolah Mitra Kami</div>
        <div className="about-school-grid">
          {schools.map((s, i) => (
            <div className="about-school-item" key={i}>
              <span className="check">✓</span> {s}
              {i === schools.length - 1 && '…'}
            </div>
          ))}
        </div>
        <p className="about-school-more">Konsultasikan kebutuhan sekolah Anda — gratis, tanpa komitmen.</p>
      </div>
    </section>
  );
}
