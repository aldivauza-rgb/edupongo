const schools = [
  { name: 'SMA Lab UM', sub: 'Malang', color: '#1A4FD6', initial: 'S' },
  { name: 'SMA Al-Azhar 7', sub: 'Solo', color: '#0D9E6E', initial: 'A' },
  { name: 'MAN 3 Jombang', sub: 'Jombang', color: '#D65A1A', initial: 'M' },
  { name: 'MA Unggulan Wahab', sub: 'Hasbulloh', color: '#7C3AED', initial: 'M' },
  { name: 'SMP Darrunajah 2', sub: 'Karangploso', color: '#0891B2', initial: 'S' },
  { name: 'MA Plus Al Hadi', sub: 'Bojonegoro', color: '#B45309', initial: 'M' },
  { name: 'PKBM Fanana', sub: 'Insan Baksya', color: '#059669', initial: 'P' },
  { name: 'Ponpes Mamba\'ul', sub: 'Ulum', color: '#DC2626', initial: 'P' },
  { name: 'SMP An Nawawiyah', sub: 'Rembang', color: '#1A4FD6', initial: 'S' },
  { name: 'MI An Nuroniyah', sub: 'Rembang', color: '#7C3AED', initial: 'M' },
  { name: 'SMK An Nuroniyah', sub: 'Rembang', color: '#0D9E6E', initial: 'S' },
  { name: 'SMP Mamba\'ul Maarif', sub: 'Jombang', color: '#0891B2', initial: 'S' },
  { name: 'Ponpes Al Asmaul', sub: 'Husna', color: '#D65A1A', initial: 'P' },
];

function MarqueeRow({ schools: items, reverse = false, duration = 30 }) {
  return (
    <div className="marquee-outer" style={{ marginBottom: reverse ? 0 : 20 }}>
      <div
        className="marquee-track"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `${duration}s`,
        }}
      >
        {[...items, ...items].map((s, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-logo-initial" style={{ background: s.color }}>{s.initial}</div>
            <div className="marquee-logo-text">
              <div className="marquee-logo-name">{s.name}</div>
              <div className="marquee-logo-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientSection() {
  const reversed = [...schools].reverse();
  return (
    <section className="client-section" id="sekolah">
      <div className="client-header">
        <div className="section-tag">Partner Sekolah</div>
        <h2 className="section-title">Sekolah yang mempercayai Edupongo</h2>
        <p className="section-sub" style={{ margin: '12px auto 0' }}>
          Dari sekolah negeri, swasta Islam, hingga pesantren dan boarding school: di berbagai kota di Indonesia.
        </p>
      </div>
      <MarqueeRow schools={schools} />
      <MarqueeRow schools={reversed} reverse duration={38} />
      <p className="client-more">dan 87+ sekolah lainnya di seluruh Indonesia…</p>
    </section>
  );
}
