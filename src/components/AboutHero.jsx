export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-inner">
        <div className="about-hero-content">
          <div className="about-hero-tag">Tentang Edupongo</div>
          <h1 className="about-hero-title">
            Bukan sekadar software: <span className="highlight">partner digitalisasi</span> pendidikan Indonesia.
          </h1>
          <p className="about-hero-sub">
            Sejak 2014, Edupongo telah mendampingi sekolah di Indonesia mengelola administrasi, memperkuat komunikasi sekolah-orang tua, dan menyederhanakan kerja guru. Lebih dari 10 tahun bukan startup kemarin sore.
          </p>
          <div className="about-hero-stats">
            {[
              { num: '10+', label: 'Tahun Pengalaman' },
              { num: '100+', label: 'Sekolah se-Indonesia' },
              { num: '30rb+', label: 'Pengguna Aktif' },
            ].map((s) => (
              <div key={s.label}>
                <span className="about-hero-stat-num">{s.num}</span>
                <span className="about-hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero-image">
          <img src="/hero-dashboard.jpg" alt="Dashboard Edupongo" />
        </div>
      </div>
    </section>
  );
}
