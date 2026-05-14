export default function CTASection({ onOpenDemo }) {
  return (
    <section className="cta-section">
      <h2 className="cta-title">Siap bawa sekolah Anda<br />ke <span style={{ color: 'var(--yellow)' }}>level berikutnya</span>?</h2>
      <p className="cta-sub">Bergabung dengan 100+ sekolah yang sudah membuktikan bahwa administrasi bisa lebih mudah — dan guru bisa lebih fokus mengajar.</p>
      <div className="cta-results">
        {[
          { text: 'Presensi & rapor otomatis' },
          { text: 'PPDB online tanpa antre' },
          { text: 'Orang tua terhubung real-time' },
          { text: 'Didampingi tim Edupongo' },
        ].map((item, i) => (
          <div className="cta-result-item" key={i}>
            <div className="cta-check">✓</div>
            {item.text}{item.accent ? <span style={{ color: 'var(--yellow)' }}>{item.accent}</span> : null}
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
