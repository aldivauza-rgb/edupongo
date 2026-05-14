export default function AboutContact({ onOpenDemo }) {
  return (
    <section className="about-contact">
      <div className="about-contact-inner">
        <div className="about-contact-left">
          <h2>Mari bicarakan <span className="accent">sekolah Anda</span>.</h2>
          <p>Tim kami siap mendengarkan kebutuhan spesifik sekolah, pesantren, atau yayasan Anda. Konsultasi gratis tanpa komitmen.</p>
          <a href="#" className="about-contact-cta" onClick={(e) => { e.preventDefault(); onOpenDemo(); }}>Jadwalkan Demo Gratis →</a>
        </div>
        <div className="about-contact-cards">
          <a href="tel:+6281295802674" className="about-contact-card">
            <div className="about-contact-card-icon">📞</div>
            <div className="about-contact-card-label">Telepon</div>
            <div className="about-contact-card-value">
              +62 812-9580-2674<br />
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Fajrul</span>
            </div>
          </a>
          <a href="mailto:contact@edupongo.com" className="about-contact-card">
            <div className="about-contact-card-icon">✉️</div>
            <div className="about-contact-card-label">Email</div>
            <div className="about-contact-card-value">contact@edupongo.com</div>
          </a>
        </div>
      </div>
    </section>
  );
}
