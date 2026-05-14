export default function EcosystemSection() {
  return (
    <section className="ecosystem-section" id="ekosistem">
      <div className="section-tag">Ekosistem Terintegrasi</div>
      <h2 className="section-title">Satu platform.<br />Semua terhubung.</h2>
      <p className="section-sub">Dari yayasan, sekolah, hingga pesantren: Edupongo menghubungkan semua pihak dalam satu sistem yang saling terhubung secara real-time.</p>

      <div className="ecosystem-flow">
        <div className="eco-node">
          <div className="eco-icon">🏛️</div>
          <span className="eco-label">Yayasan</span>
        </div>
        <span className="eco-arrow">→</span>
        <div className="eco-node">
          <div className="eco-icon">🏫</div>
          <span className="eco-label">Sekolah</span>
        </div>
        <span className="eco-arrow">→</span>
        <div className="eco-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="14" fill="#1A4FD6"/>
            <path d="M15 16C15 14.6 16.1 13.5 17.5 13.5H29.5C30.9 13.5 32 14.6 32 16V18.5H22.5C21.1 18.5 20 19.6 20 21C20 22.4 21.1 23.5 22.5 23.5H29V26C29 27.4 27.9 28.5 26.5 28.5H17.5C16.1 28.5 15 27.4 15 26V16Z" fill="#F5C842"/>
            <circle cx="32" cy="34" r="3.5" fill="#F5C842"/>
          </svg>
        </div>
        <span className="eco-arrow">→</span>
        <div className="eco-node">
          <div className="eco-icon">👨‍🏫</div>
          <span className="eco-label">Guru</span>
        </div>
        <span className="eco-arrow">→</span>
        <div className="eco-node">
          <div className="eco-icon">👨‍👩‍👧</div>
          <span className="eco-label">Orang Tua</span>
        </div>
      </div>

      <div className="ecosystem-types">
        {['RA / TK', 'MI / SD', 'MTs / SMP', 'MA / SMA / SMK', 'Pesantren & Boarding', 'PKBM'].map((t) => (
          <span className="eco-type-badge" key={t}>{t}</span>
        ))}
      </div>
    </section>
  );
}
