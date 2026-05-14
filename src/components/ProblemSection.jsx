const problems = [
  { icon: '📋', title: 'Rekap presensi manual setiap hari', desc: 'Guru menghabiskan puluhan menit hanya untuk mencatat kehadiran siswa di buku — padahal itu bisa otomatis.' },
  { icon: '📝', title: 'Rapor dikerjakan sampai larut malam', desc: 'Input nilai satu per satu, format berbeda tiap kurikulum, dan deadline yang selalu mepet membuat guru kelelahan.' },
  { icon: '🏫', title: 'PPDB bikin orang tua antre berjam-jam', desc: 'Pendaftaran manual, berkas fisik yang bisa hilang, dan pengumuman yang tidak merata — pengalaman yang tidak perlu terjadi.' },
  { icon: '📱', title: 'Orang tua tidak tahu aktivitas anak', desc: 'Info dari sekolah telat, atau harus telepon dulu. Padahal orang tua yang terhubung = anak yang lebih berprestasi.' },
  { icon: '💰', title: 'Laporan keuangan tidak transparan', desc: 'Rekap SPP manual, tagihan yang sering tidak akurat, dan laporan yang butuh waktu berminggu-minggu untuk disiapkan.' },
  { icon: '💻', title: 'Ujian masih di kertas, koreksi manual', desc: 'Guru mengkoreksi ratusan lembar jawaban satu per satu — sementara hasilnya bisa keluar otomatis kalau pakai sistem yang tepat.' },
];

export default function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="section-tag">Kenali Masalahnya</div>
      <h2 className="section-title">Sekolah Anda masih menghadapi ini?</h2>
      <p className="section-sub">Masalah administrasi manual bukan soal malas — tapi soal sistem yang belum tepat. Saatnya berubah.</p>
      <div className="problem-grid">
        {problems.map((p, i) => (
          <div className="problem-card" key={i}>
            <span className="problem-icon">{p.icon}</span>
            <div className="problem-x">✕</div>
            <div className="problem-title">{p.title}</div>
            <div className="problem-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
