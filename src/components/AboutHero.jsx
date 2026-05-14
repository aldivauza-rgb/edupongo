import { useState, useEffect } from 'react';
import { getStats } from '../lib/api';

const FALLBACK_STATS = [
  { num: '10+', label: 'Tahun Pengalaman' },
  { num: '100+', label: 'Sekolah se-Indonesia' },
  { num: '30rb+', label: 'Pengguna Aktif' },
];

export default function AboutHero() {
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    getStats().then(data => {
      if (data && data.length) {
        const aboutStats = data.filter(s => s.page === 'about');
        if (aboutStats.length) setStats(aboutStats);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="about-hero">
      <div className="about-hero-inner">
        <div className="about-hero-tag">Tentang Edupongo</div>
        <h1 className="about-hero-title">
          Bukan sekadar software: <span className="highlight">partner digitalisasi</span> pendidikan Indonesia.
        </h1>
        <p className="about-hero-sub">
          Sejak 2014, Edupongo telah mendampingi sekolah di Indonesia mengelola administrasi, memperkuat komunikasi sekolah-orang tua, dan menyederhanakan kerja guru. Lebih dari 10 tahun bukan startup kemarin sore.
        </p>
        <div className="about-hero-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <span className="about-hero-stat-num">{s.number || s.num}</span>
              <span className="about-hero-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
