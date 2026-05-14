export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
              <rect width="28" height="28" rx="8" fill="#F5C842"/>
              <path d="M9 9.5C9 8.67 9.67 8 10.5 8H17.5C18.33 8 19 8.67 19 9.5V11H13.5C12.67 11 12 11.67 12 12.5C12 13.33 12.67 14 13.5 14H17V15.5C17 16.33 16.33 17 15.5 17H10.5C9.67 17 9 16.33 9 15.5V9.5Z" fill="#1A4FD6"/>
              <circle cx="19" cy="20" r="2" fill="#1A4FD6"/>
            </svg>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 22, fontWeight: 600, color: '#FFFFFF', letterSpacing: -0.5 }}>edupongo</span>
          </a>
          <p className="footer-tagline">Platform manajemen sekolah terintegrasi untuk sekolah, pesantren, dan yayasan pendidikan di Indonesia.</p>
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
          <h4>Perusahaan</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>Tentang Kami</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Karir</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Hubungi Kami</a></li>
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
