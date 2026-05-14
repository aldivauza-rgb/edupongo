export default function TrustBar() {
  const logos = ['SMA Lab UM Malang', 'SMA Al-Azhar 7 Solo', 'MAN 3 Jombang', 'MA Unggulan Wahab Hasbulloh', 'SMP Darrunajah 2', 'dan 95+ sekolah lainnya'];
  const badges = [
    { icon: '🏆', text: 'Cakrawala Awards 2017' },
    { icon: '🔬', text: 'PBBT RISTEK-BRIN 2019' },
    { icon: '🚀', text: 'BekUp Scale Program 2021' },
    { icon: '✅', text: 'HaKI Kemenkumham RI' },
  ];

  return (
    <div className="trust-bar">
      <div className="trust-bar-label">Dipercaya oleh sekolah terbaik di Indonesia</div>
      <div className="trust-logos">
        {logos.map((l) => (
          <div className="trust-logo-item" key={l}>{l}</div>
        ))}
      </div>
      <div className="trust-badges">
        {badges.map((b) => (
          <div className="trust-badge" key={b.text}>
            <div className="trust-badge-icon">{b.icon}</div>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}
