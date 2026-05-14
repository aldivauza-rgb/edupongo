import { useState } from 'react';
import BlogPage from './pages/BlogPage';
import TestimoniPage from './pages/TestimoniPage';
import FAQPage from './pages/FAQPage';
import AkunPage from './pages/AkunPage';
import LogPage from './pages/LogPage';

/* ─── Icons ─────────────────────────────────────────────────── */
function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'block' }}>
      {typeof d === 'string' ? <path d={d} /> : d}
    </svg>
  );
}

const I = {
  newspaper: 'M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 4h12M8 10h8M8 14h4',
  messageCircle: 'M21 12a9 9 0 01-9 9H3.5a.5.5 0 01-.5-.5V12a9 9 0 1118 0zM8 10h.01M12 10h.01M16 10h.01',
  helpCircle: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01',
  userCog: 'M12 15v2m-6 4a4 4 0 014-4h4a4 4 0 014 4m-6-16a4 4 0 100 8 4 4 0 000-8z',
  history: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  chevronRight: 'M9 18l6-6-6-6',
  x: 'M18 6L6 18M6 6l12 12',
  check: 'M20 6L9 17l-5-5',
};

/* ─── Pages ─────────────────────────────────────────────────── */
const PAGES = {
  blog:      { label: 'Blog',         render: (p) => <BlogPage {...p} /> },
  testimoni: { label: 'Testimoni',    render: (p) => <TestimoniPage {...p} /> },
  faq:       { label: 'FAQ',          render: (p) => <FAQPage {...p} /> },
  akun:      { label: 'Akun Admin',   render: (p) => <AkunPage {...p} /> },
  log:       { label: 'Log Aktivitas',render: (p) => <LogPage {...p} /> },
};

export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('blog');
  const [snack, setSnack] = useState(null);
  const [hover, setHover] = useState(null);

  const showSnack = (type, message) => {
    setSnack({ type, message });
    setTimeout(() => setSnack(null), 3200);
  };

  const navBtn = (key, icon, label) => {
    const active = page === key;
    const hov = hover === key;
    return (
      <button
        key={key}
        onClick={() => setPage(key)}
        onMouseEnter={() => setHover(key)}
        onMouseLeave={() => setHover(null)}
        style={{
          width: '100%', height: 46, borderRadius: 11, border: 'none',
          padding: '0 11px', display: 'flex', alignItems: 'center', gap: 9,
          background: active ? '#046CF2' : hov ? '#051B3E' : 'transparent',
          color: active || hov ? '#F9F9F9' : '#8A96A8',
          fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap', cursor: 'pointer',
          textAlign: 'left', lineHeight: 1.4, fontFamily: 'Inter, sans-serif',
          transition: 'background 0.15s', flexShrink: 0,
        }}
      >
        <Icon d={icon} size={18} />
        {label}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ─── SIDEBAR ─────────────────────────────────────────── */}
      <aside style={{
        width: 260, minWidth: 260, height: '100vh',
        background: '#010E23', display: 'flex', flexDirection: 'column',
        padding: '26px 14px', position: 'sticky', top: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 6px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10, background: 'transparent' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'white', opacity: 0.35 }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: 0.5, color: 'white' }}>CMS</span>
        </div>

        {/* Navigation — semua menu di sini, gap 2px */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, background: 'transparent' }}>
          {navBtn('blog', I.newspaper, 'Blog')}
          {navBtn('testimoni', I.messageCircle, 'Testimoni')}
          {navBtn('faq', I.helpCircle, 'FAQ')}
          {navBtn('akun', I.userCog, 'Akun Admin')}
        </nav>

        {/* Bottom section — dorong ke bawah */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto', background: 'transparent' }}>
          {navBtn('log', I.history, 'Log Aktivitas')}

          <button
            onClick={onLogout}
            title="Keluar"
            style={{
              background: '#051B3E', borderRadius: 11, padding: '0 11px', height: 58,
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              border: 'none', width: '100%', fontFamily: 'Inter, sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0A2A5E'}
            onMouseLeave={e => e.currentTarget.style.background = '#051B3E'}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, color: '#F9F9F9', flexShrink: 0 }}>
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 12, color: '#F9F9F9', whiteSpace: 'nowrap' }}>admin</div>
              <div style={{ fontSize: 11, color: '#5D6B82', whiteSpace: 'nowrap' }}>Administrator</div>
            </div>
            <Icon d={I.chevronRight} size={16} style={{ color: '#5D6B82' }} />
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, background: '#E8E9F1', display: 'flex', flexDirection: 'column' }}>
        {PAGES[page]?.render({ showSnack })}
      </main>

      {/* ─── SNACKBAR ────────────────────────────────────────── */}
      {snack && (
        <div className={`admin-snackbar admin-snackbar-${snack.type}`}>
          <Icon d={snack.type === 'error' ? I.x : I.check} size={18} />
          <span style={{ flex: 1 }}>{snack.message}</span>
          <button className="admin-snackbar-close" onClick={() => setSnack(null)}>
            <Icon d={I.x} size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
