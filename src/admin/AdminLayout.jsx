import { useState } from 'react';
import { IconNews, IconMessage, IconHelp, IconUserCog, IconHistory, IconChevronRight, IconX, IconCheck } from '@tabler/icons-react';
import BlogPage from './pages/BlogPage';
import TestimoniPage from './pages/TestimoniPage';
import FAQPage from './pages/FAQPage';
import AkunPage from './pages/AkunPage';
import LogPage from './pages/LogPage';

/* ─── Pages ─────────────────────────────────────────────────── */
const PAGES = {
  blog:      { label: 'Blog',         render: (p) => <BlogPage {...p} /> },
  testimoni: { label: 'Testimoni',    render: (p) => <TestimoniPage {...p} /> },
  faq:       { label: 'FAQ',          render: (p) => <FAQPage {...p} /> },
  akun:      { label: 'Akun Admin',   render: (p) => <AkunPage {...p} /> },
  log:       { label: 'Log Aktivitas',render: (p) => <LogPage {...p} /> },
};

const icons = { IconNews, IconMessage, IconHelp, IconUserCog, IconHistory, IconChevronRight, IconX, IconCheck };

export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('blog');
  const [snack, setSnack] = useState(null);
  const [hover, setHover] = useState(null);

  const showSnack = (type, message) => {
    setSnack({ type, message });
    setTimeout(() => setSnack(null), 3200);
  };

  const navBtn = (key, IconCmp, label) => {
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
          padding: '0 12px', display: 'flex', alignItems: 'center', gap: 10,
          background: active ? '#046CF2' : hov ? '#051B3E' : 'transparent',
          color: active || hov ? '#F9F9F9' : '#8A96A8',
          fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap', cursor: 'pointer',
          textAlign: 'left', lineHeight: 1.4, fontFamily: 'Inter, sans-serif',
          transition: 'background 0.15s', flexShrink: 0,
        }}
      >
        <IconCmp size={18} stroke={1.5} />
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

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, background: 'transparent', alignItems: 'stretch', justifyContent: 'flex-start', padding: 0, margin: 0, listStyle: 'none' }}>
          {navBtn('blog', IconNews, 'Blog')}
          {navBtn('testimoni', IconMessage, 'Testimoni')}
          {navBtn('faq', IconHelp, 'FAQ')}
          {navBtn('akun', IconUserCog, 'Akun Admin')}
        </nav>

        {/* Bottom section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto', background: 'transparent' }}>
          {navBtn('log', IconHistory, 'Log Aktivitas')}

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
            <IconChevronRight size={16} stroke={1.5} style={{ color: '#5D6B82' }} />
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
          {snack.type === 'error' ? <IconX size={18} /> : <IconCheck size={18} />}
          <span style={{ flex: 1 }}>{snack.message}</span>
          <button className="admin-snackbar-close" onClick={() => setSnack(null)}>
            <IconX size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
