import { useState, useEffect } from 'react';
import { getPartners } from '../lib/api';

const PREFIXES = ['SMP ', 'MA ', 'SMK ', 'MI ', 'PKBM ', 'MTs ', 'Ponpes '];

function getInitial(name) {
  if (!name) return '?';
  const trimmed = name.trim();
  for (const prefix of PREFIXES) {
    if (trimmed.startsWith(prefix)) {
      const rest = trimmed.slice(prefix.length).trim();
      if (rest) return rest.charAt(0).toUpperCase();
    }
  }
  return trimmed.charAt(0).toUpperCase();
}

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
          <div className="marquee-item" key={s.id || i}>
            <div className="marquee-logo-initial" style={{ background: s.warna || '#3498DB' }}>{getInitial(s.name)}</div>
            <div className="marquee-logo-text">
              <div className="marquee-logo-name">{s.name}</div>
              <div className="marquee-logo-sub">{s.kota}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientSection() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getPartners().then((data) => {
      if (data?.length) {
        setSchools(data);
      } else {
        // Fallback — data statis kalau Supabase kosong
        setSchools([
          { id: 1, name: 'SMA Lab UM', kota: 'Malang', warna: '#1A4FD6' },
          { id: 2, name: 'SMA Al-Azhar 7', kota: 'Solo', warna: '#0D9E6E' },
          { id: 3, name: 'MAN 3 Jombang', kota: 'Jombang', warna: '#D65A1A' },
          { id: 4, name: 'MA Unggulan Wahab Hasbulloh', kota: 'Jombang', warna: '#7C3AED' },
          { id: 5, name: 'SMP Darrunajah 2', kota: 'Karangploso', warna: '#0891B2' },
          { id: 6, name: 'MA Plus Al Hadi', kota: 'Bojonegoro', warna: '#B45309' },
          { id: 7, name: 'PKBM Fanana', kota: 'Insan Baksya', warna: '#059669' },
          { id: 8, name: "Ponpes Mamba'ul Ulum", kota: 'Ulum', warna: '#DC2626' },
          { id: 9, name: 'SMP An Nawawiyah', kota: 'Rembang', warna: '#1A4FD6' },
          { id: 10, name: 'MI An Nuroniyah', kota: 'Rembang', warna: '#7C3AED' },
          { id: 11, name: 'SMK An Nuroniyah', kota: 'Rembang', warna: '#0D9E6E' },
          { id: 12, name: "SMP Mamba'ul Maarif", kota: 'Jombang', warna: '#0891B2' },
          { id: 13, name: 'Ponpes Al Asmaul Husna', kota: 'Husna', warna: '#D65A1A' },
        ]);
      }
    }).catch(() => {
      // Fallback kalau error
      setSchools([
        { id: 1, name: 'MA Plus Al Hadi', kota: 'Bojonegoro', warna: '#C97B3F' },
        { id: 2, name: 'PKBM Fanana', kota: 'Insan Baksya', warna: '#2ECC71' },
      ]);
    });
  }, []);

  const reversed = [...schools].reverse();
  return (
    <section className="client-section" id="sekolah">
      <div className="client-header">
        <div className="section-tag">Mitra Sekolah</div>
        <h2 className="section-title">Sekolah yang mempercayai Edupongo</h2>
        <p className="section-sub" style={{ margin: '12px auto 0' }}>
          Dari sekolah negeri, swasta Islam, hingga pesantren dan boarding school: di berbagai kota di Indonesia.
        </p>
      </div>
      {schools.length > 0 && (
        <>
          <MarqueeRow schools={schools} />
          <MarqueeRow schools={reversed} reverse duration={38} />
        </>
      )}
      <p className="client-more">dan 87+ sekolah lainnya di seluruh Indonesia…</p>
    </section>
  );
}
