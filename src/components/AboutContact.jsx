export default function AboutContact() {
  return (
    <section className="about-contact">
      <div className="about-contact-inner">
        <div className="about-contact-left">
          <h2>Mari bicarakan <span className="accent">sekolah Anda</span>.</h2>
          <p>Tim kami siap mendengarkan kebutuhan spesifik sekolah, pesantren, atau yayasan Anda. Konsultasi gratis tanpa komitmen.</p>
          <a href="#" className="about-contact-cta" onClick={(e) => e.preventDefault()}>Jadwalkan Demo Gratis →</a>
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
          <a href="https://edupongo.com" className="about-contact-card">
            <div className="about-contact-card-icon">🌐</div>
            <div className="about-contact-card-label">Website</div>
            <div className="about-contact-card-value">www.edupongo.com</div>
          </a>
          <div className="about-contact-card">
            <div className="about-contact-card-icon">📍</div>
            <div className="about-contact-card-label">Kantor</div>
            <div className="about-contact-card-value">
              Jl. Papa Biru 3 No. 5B<br />
              <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Tulusrejo, Malang, Jawa Timur 65141</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
