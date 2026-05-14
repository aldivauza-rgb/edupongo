import { useState, useEffect, useRef } from 'react';
import { getWhyCards } from '../lib/api';

const FALLBACK = [
  { title: 'Administrasi lebih efisien, data tersimpan rapi', desc: 'Semua data siswa, guru, dan keuangan tersimpan terpusat dan mudah diakses kapanpun: tidak ada lagi data yang berserakan di berbagai file Excel.' },
  { title: 'PPDB tanpa antre: dari mana saja, kapan saja', desc: 'Proses penerimaan siswa baru yang biasanya butuh berminggu-minggu bisa diselesaikan lebih cepat, lebih rapi, dan lebih transparan.' },
  { title: 'Orang tua terhubung langsung dengan sekolah', desc: 'Tidak ada lagi informasi yang telat sampai. Orang tua bisa pantau kehadiran, nilai, dan tagihan anak langsung dari HP mereka.' },
  { title: 'Presensi fleksibel: 3 metode dalam satu platform', desc: 'Manual via web, fingerprint untuk sekolah yang sudah punya mesin, atau GPS berbasis lokasi di aplikasi mobile. Pilih yang paling cocok.' },
  { title: 'Satu-satunya yang cover ekosistem pesantren', desc: 'Edupongo dirancang untuk memahami kebutuhan unik pesantren dan boarding school: dari manajemen santri hingga koordinasi asrama dan yayasan.' },
  { title: 'Terpercaya sejak 2014: bukan startup kemarin sore', desc: '10+ tahun mendampingi sekolah di Indonesia. HaKI terdaftar, lolos seleksi RISTEK-BRIN, dan terus berkembang bersama kebutuhan sekolah.' },
];

export default function WhySection() {
  const [cards, setCards] = useState(FALLBACK);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    getWhyCards().then(data => {
      if (data && data.length) setCards(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (!track || !stage || !grid) return;

    let totalScrollDistance = 0;
    let isActive = false;
    let targetProgress = 0;
    let currentProgress = 0;
    let animId = null;

    function setup() {
      if (window.innerWidth <= 768) {
        track.style.height = 'auto';
        grid.style.transform = '';
        isActive = false;
        return;
      }
      isActive = true;
      const gsw = grid.scrollWidth;
      const sw = stage.clientWidth - 200;
      totalScrollDistance = gsw - sw;
      if (totalScrollDistance <= 0) {
        track.style.height = '100vh';
        grid.style.transform = '';
        isActive = false;
        return;
      }
      track.style.height = (window.innerHeight + totalScrollDistance) + 'px';
    }

    function update() {
      if (!isActive) return;
      const rect = track.getBoundingClientRect();
      const sr = track.offsetHeight - window.innerHeight;
      targetProgress = Math.max(0, Math.min(1, -rect.top / sr));
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    }

    function animate() {
      if (!isActive) {
        currentProgress = targetProgress;
      } else {
        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.001) {
          currentProgress += diff * 0.08;
          grid.style.transform = `translateX(${-currentProgress * totalScrollDistance}px)`;
        } else if (currentProgress !== targetProgress) {
          currentProgress = targetProgress;
          grid.style.transform = `translateX(${-currentProgress * totalScrollDistance}px)`;
        }
      }
      animId = requestAnimationFrame(animate);
    }

    let rt;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(() => { setup(); update(); }, 150);
    }

    setup();
    update();
    animate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [cards]);

  return (
    <section className="why-section">
      <div className="why-pin-track" ref={trackRef}>
        <div className="why-pin-stage" ref={stageRef}>
          <div className="why-pin-header">
            <div className="section-tag">Kenapa Edupongo</div>
            <h2 className="section-title">Kenapa sekolah memilih Edupongo?</h2>
            <p className="section-sub">Bukan sekadar software: tapi partner digitalisasi sekolah yang memahami kebutuhan unik pendidikan Indonesia.</p>
          </div>
          <div className="why-grid" ref={gridRef}>
            {cards.map((c, i) => (
              <div className="why-card" key={i}>
                <div className="why-check">✅</div>
                <div className="why-title">{c.title}</div>
                <div className="why-desc">{c.desc || c.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
