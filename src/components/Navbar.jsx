import { useState } from 'react';

const Logo = () => (
  <img src="/logo-color.png" alt="Edupongo" style={{ height: 32, width: 'auto', flexShrink: 0 }} />
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
