export default function CTASection({ onOpenDemo }) {
  return (
    <section className="cta-section">
      <h2 className="cta-title">Siap bawa sekolah Anda<br />ke level berikutnya?</h2>
      <p className="cta-sub">Bergabung dengan 100+ sekolah yang sudah membuktikan bahwa administrasi bisa lebih mudah — dan guru bisa lebih fokus mengajar.</p>
      <div className="cta-results">
        {['Presensi & rapor otomatis', 'PPDB online tanpa antre', 'Orang tua terhubung real-time', 'Didampingi tim Edupongo'].map((item) => (
          <div className="cta-result-item" key={item}>
            <div className="cta-check">✓</div>
            {item}
          </div>
        ))}
      </div>
      <div className="cta-btn-group">
        <a href="#" className="btn-cta-white" onClick={(e) => { e.preventDefault(); onOpenDemo(); }}>Jadwalkan Demo Gratis</a>
        <a href="#" className="btn-cta-outline" onClick={(e) => e.preventDefault()}>Hubungi Kami</a>
      </div>
    </section>
  );
}
