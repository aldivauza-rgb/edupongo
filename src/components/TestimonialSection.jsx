import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    text: 'Proses PPDB yang biasanya memakan waktu berminggu-minggu dan bikin orang tua antre panjang: sekarang bisa selesai lebih cepat, lebih rapi, dan orang tua tidak perlu datang berkali-kali.',
    name: 'Kepala Sekolah: SMP Islam An Nawawiyah',
    role: 'Rembang, Jawa Tengah',
    initial: 'B',
  },
  {
    text: 'Guru-guru kami dulu menghabiskan berjam-jam hanya untuk rekap presensi dan input rapor. Sekarang mereka punya waktu lebih untuk fokus ke hal yang seharusnya jadi tugas utama mereka: mengajar.',
    name: 'Kepala Sekolah: MA Plus Al Hadi',
    role: 'Bojonegoro, Jawa Timur',
    initial: 'A',
  },
  {
    text: 'Yang paling saya suka adalah orang tua sekarang bisa langsung tahu kalau anaknya tidak hadir. Dulu mereka baru tahu kalau sudah telepon ke sekolah: dan kadang kami sendiri yang kewalahan mengangkat telepon.',
    name: 'Wakil Kepala Sekolah: MA Unggulan Wahab Hasbulloh',
    role: 'Jombang, Jawa Timur',
    initial: 'W',
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx) => {
    setCurrent((idx + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="testi-section">
      <div className="testi-wrapper">
        <div className="testi-left">
          <div className="section-tag">Kata Mereka</div>
          <h2 className="section-title">Sekolah yang sudah merasakan bedanya</h2>
          <p className="section-sub">Bukan klaim kosong: ini cerita nyata dari kepala sekolah dan guru yang sudah pakai Edupongo.</p>
        </div>
        <div>
          <div className="testi-slider">
            <div className="testi-track">
              {testimonials.map((t, i) => (
                <div className={`testi-slide ${i === current ? 'active' : ''}`} key={i}>
                  <div className="testi-quote">"</div>
                  <div className="testi-text">{t.text}</div>
                  <div className="testi-person">
                    <div className="testi-avatar">{t.initial}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testi-controls">
              <div className="testi-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testi-dot ${i === current ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <div className="testi-arrows">
                <button className="testi-arrow" onClick={() => goTo(current - 1)}>←</button>
                <button className="testi-arrow" onClick={() => goTo(current + 1)}>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
