export default function AboutEkosistem() {
  const entities = [
    { icon: '🏛️', label: 'Yayasan' },
    { icon: '🏫', label: 'Instansi Pendidikan' },
    { icon: '🕌', label: 'Boarding/Asrama' },
    { icon: '👨‍👩‍👧', label: 'Orang Tua' },
    { icon: '🎓', label: 'Siswa / Santri' },
  ];

  const jenjang = ['RA / TK', 'MI / SD', 'MTs / SMP', 'MA / SMA', 'PKBM', 'Pesantren'];

  return (
    <section className="about-ekosistem">
      <div className="about-ekosistem-inner">
        <div className="about-ekosistem-header">
          <div className="about-ekosistem-tag">Integrated Ecosystem</div>
          <h2>Semua terhubung dalam satu sistem</h2>
          <p>Mengintegrasikan yayasan, sekolah, asrama, orang tua, hingga siswa dalam satu platform terpadu.</p>
        </div>
        <div className="about-ekosistem-grid">
          {entities.map((e) => (
            <div className="about-ekosistem-card" key={e.label}>
              <div className="about-ekosistem-icon">{e.icon}</div>
              <div className="about-ekosistem-card-title">{e.label}</div>
            </div>
          ))}
        </div>
        <div className="about-jenjang">
          <div className="about-jenjang-label">Mendukung Semua Jenjang</div>
          <div className="about-jenjang-pills">
            {jenjang.map((j) => (
              <span className="about-jenjang-pill" key={j}>{j}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
