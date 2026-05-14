export default function Hero({ onOpenDemo }) {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        Dipercaya 100+ Sekolah se-Indonesia Sejak 2014
      </div>

      <h1>Cara Lebih Mudah<br />Kelola <span>Sekolah Anda</span></h1>

      <p className="hero-sub">
        Satu platform untuk semua — dari PPDB, presensi, rapor digital, hingga komunikasi orang tua. Sekolah lebih teratur, guru lebih fokus, orang tua lebih terhubung.
      </p>

      <div className="hero-cta">
        <a href="#" className="btn-primary btn-primary-lg" onClick={(e) => { e.preventDefault(); onOpenDemo(); }}>Jadwalkan Demo Gratis</a>
        <a href="#" className="btn-outline-lg" onClick={(e) => e.preventDefault()}>Lihat Semua Fitur</a>
      </div>

      <div className="hero-stats">
        {[
          { num: '100+', label: 'Sekolah aktif' },
          { num: '30rb+', label: 'Pengguna aktif' },
          { num: '10+', label: 'Tahun pengalaman' },
          { num: 'HaKI', label: 'Terdaftar Kemenkumham' },
        ].map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-number">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-dashboard">
        <div className="dashboard-bar">
          <div className="dash-dots">
            {[1, 2, 3].map((d) => <div className="dash-dot" key={d} />)}
          </div>
          <div className="dash-url">demo.edupongo.com</div>
        </div>
        <div className="dashboard-content">
          <div className="dash-sidebar">
            {['Beranda', 'Presensi', 'Rapor', 'PPDB', 'Keuangan', 'Guru'].map((item, i) => (
              <div className={`dash-menu-item ${i === 0 ? 'active' : ''}`} key={item}>
                <div className="dash-menu-icon"></div> {item}
              </div>
            ))}
          </div>
          <div className="dash-main">
            <div className="dash-cards">
              <div className="dash-card blue">
                <div className="dash-card-label">Siswa Hadir</div>
                <div className="dash-card-value">312</div>
              </div>
              <div className="dash-card">
                <div className="dash-card-label">PPDB Masuk</div>
                <div className="dash-card-value">47</div>
              </div>
              <div className="dash-card">
                <div className="dash-card-label">Tagihan Lunas</div>
                <div className="dash-card-value">89%</div>
              </div>
            </div>
            <div className="dash-chart">
              {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
                <div className={`chart-bar ${h === 100 ? 'active' : ''}`} key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
