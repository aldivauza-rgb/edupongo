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
          <img src="/logo-icon.png" alt="Edupongo" style={{ width: 56, height: 56, objectFit: 'contain' }} />
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
