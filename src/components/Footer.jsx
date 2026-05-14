import { IconBrandInstagram, IconBrandTiktok, IconBrandFacebook } from '@tabler/icons-react';

export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
            <img src="/logo-white.png" alt="Edupongo" style={{ height: 36, width: 'auto' }} />
          </a>
          <p className="footer-tagline">Platform manajemen sekolah terintegrasi untuk sekolah, pesantren, dan yayasan pendidikan di Indonesia.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/edupongoapp/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconBrandInstagram size={18} stroke={1.5} />
            </a>
            <a href="https://www.tiktok.com/@edupongo.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <IconBrandTiktok size={18} stroke={1.5} />
            </a>
            <a href="https://www.facebook.com/EdupongoApp" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <IconBrandFacebook size={18} stroke={1.5} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Fitur</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Presensi Digital</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Rapor Online</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>PPDB Online</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Computer Based Test</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Media Pembelajaran</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Pembayaran</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Tentang Kami</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>Tentang Kami</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Tutorial</a></li>
          </ul>
        </div>

        <div className="footer-contact footer-links">
          <h4>Kontak</h4>
          <p>📧 <a href="mailto:contact@edupongo.com">contact@edupongo.com</a></p>
          <p>📱 <a href="tel:+6281295802674">+62 812-9580-2674 (Fajrul)</a></p>
          <p>📍 Jl. Papa Biru III No. 5B<br />Malang, Jawa Timur 65141</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Edupongo. All rights reserved.</span>
        <div className="footer-bottom-badges">
          <span className="footer-badge">HaKI Kemenkumham</span>
          <span className="footer-badge">Sejak 2014</span>
          <span className="footer-badge">100+ Sekolah</span>
        </div>
      </div>
    </footer>
  );
}
