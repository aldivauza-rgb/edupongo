export default function Hero({ onOpenDemo }) {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        Dipercaya 100+ Sekolah se-Indonesia Sejak 2014
      </div>

      <h1>Cara Lebih Mudah<br />Kelola <span>Sekolah Anda</span></h1>

      <p className="hero-sub">
        Satu platform untuk semua: dari PPDB, presensi, rapor digital, hingga komunikasi orang tua. Sekolah lebih teratur, guru lebih fokus, orang tua lebih terhubung.
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
        <img src="/hero-dashboard.jpg" alt="Dashboard Edupongo" className="hero-dashboard-img" />
      </div>
    </section>
  );
}
