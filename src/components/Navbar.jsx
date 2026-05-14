import { useState } from 'react';

const Logo = ({ dark, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
    <rect width="28" height="28" rx="8" fill={dark ? '#F5C842' : '#1A4FD6'} />
    <path d="M9 9.5C9 8.67 9.67 8 10.5 8H17.5C18.33 8 19 8.67 19 9.5V11H13.5C12.67 11 12 11.67 12 12.5C12 13.33 12.67 14 13.5 14H17V15.5C17 16.33 16.33 17 15.5 17H10.5C9.67 17 9 16.33 9 15.5V9.5Z" fill={dark ? '#1A4FD6' : '#F5C842'} />
    <circle cx="19" cy="20" r="2" fill={dark ? '#1A4FD6' : '#F5C842'} />
  </svg>
);

export default function Navbar({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('ID');

  const closeMenu = () => setMenuOpen(false);

  const handleNav = (target, hash) => {
    closeMenu();
    onNavigate(target, hash);
  };

  const handleClick = (e, target, hash) => {
    e.preventDefault();
    handleNav(target, hash);
  };

  return (
    <nav>
      <a href="#" onClick={(e) => handleClick(e, 'home')} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <Logo />
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 600, color: '#0D0D0D', letterSpacing: -0.5 }}>edupongo</span>
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <button onClick={() => handleNav('about')} style={page === 'about' ? { color: 'var(--blue)' } : {}}>
            Tentang Kami
          </button>
        </li>
        <li>
          <button onClick={() => handleNav('home', '#fitur')}>
            Solusi
          </button>
        </li>
        <li>
          <button onClick={() => handleNav('home', '#faq')}>
            FAQ
          </button>
        </li>
        <li>
          <button className="nav-mobile-cta-inline" onClick={() => {}}>
            Jadwalkan Demo
          </button>
        </li>
      </ul>

      <div className="nav-cta">
        <div className={`lang-switch ${langOpen ? 'open' : ''}`}>
          <button className="lang-trigger" onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}>
            <span style={{ fontSize: 15 }}>🌐</span>
            <span>{lang}</span>
            <span className="lang-chevron">▲</span>
          </button>
          <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
            {['ID', 'EN'].map((l) => (
              <button
                key={l}
                className={`lang-option ${lang === l ? 'active' : ''}`}
                onClick={() => { setLang(l); setLangOpen(false); }}
              >
                {l === 'ID' ? 'Indonesian (ID)' : 'English (EN)'}
              </button>
            ))}
          </div>
        </div>
        <a href="#" className="btn-primary" onClick={(e) => e.preventDefault()}>Jadwalkan Demo</a>
      </div>

      <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
