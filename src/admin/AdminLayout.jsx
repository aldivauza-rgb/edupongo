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
  chevronLeft: 'M15 18l-6-6 6-6',
  plus: 'M12 5v14m-7-7h14',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
  edit: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  trash: 'M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeOff: 'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22',
  x: 'M18 6L6 18M6 6l12 12',
  check: 'M20 6L9 17l-5-5',
  chevronDown: 'M6 9l6 6 6-6',
};

/* ─── Sidebar Button ────────────────────────────────────────── */
function NavBtn({ icon, label, active, onClick }) {
  return (
    <button className={`admin-nav-btn${active ? ' active' : ''}`} onClick={onClick}>
      <Icon d={icon} />
      {label}
    </button>
  );
}

/* ─── Pages ─────────────────────────────────────────────────── */
const PAGES = {
  blog:      { label: 'Blog',      render: (p) => <BlogPage {...p} /> },
  testimoni: { label: 'Testimoni', render: (p) => <TestimoniPage {...p} /> },
  faq:       { label: 'FAQ',       render: (p) => <FAQPage {...p} /> },
  akun:      { label: 'Akun Admin',render: (p) => <AkunPage {...p} /> },
  log:       { label: 'Log Aktivitas', render: (p) => <LogPage {...p} /> },
};

export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('blog');
  const [snack, setSnack] = useState(null);

  const showSnack = (type, message) => {
    setSnack({ type, message });
    setTimeout(() => setSnack(null), 3200);
  };

  const closeSnack = () => setSnack(null);

  return (
    <div className="admin-layout">
      {/* ─── SIDEBAR ─────────────────────────────────────────── */}
      <aside className="admin-sidebar">
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-circle">
            <div className="admin-sidebar-logo-dot" />
          </div>
          <span className="admin-sidebar-logo-text">CMS</span>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          <NavBtn icon={I.newspaper} label="Blog" active={page === 'blog'} onClick={() => setPage('blog')} />
          <NavBtn icon={I.messageCircle} label="Testimoni" active={page === 'testimoni'} onClick={() => setPage('testimoni')} />
          <NavBtn icon={I.helpCircle} label="FAQ" active={page === 'faq'} onClick={() => setPage('faq')} />
          <NavBtn icon={I.userCog} label="Akun Admin" active={page === 'akun'} onClick={() => setPage('akun')} />
        </nav>

        {/* Bottom section */}
        <div className="admin-nav-bottom">
          <NavBtn icon={I.history} label="Log Aktivitas" active={page === 'log'} onClick={() => setPage('log')} />
          <button className="admin-user-block" onClick={onLogout} title="Keluar">
            <div className="admin-user-avatar">A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="admin-user-name">admin</div>
              <div className="admin-user-role">Administrator</div>
            </div>
            <Icon d={I.chevronRight} size={16} color="#5D6B82" />
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────────────────────────── */}
      <main className="admin-main">
        {PAGES[page]?.render({ showSnack })}
      </main>

      {/* ─── SNACKBAR ────────────────────────────────────────── */}
      {snack && (
        <div className={`admin-snackbar admin-snackbar-${snack.type}`}>
          <Icon d={snack.type === 'error' ? I.x : I.check} size={18} />
          <span style={{ flex: 1 }}>{snack.message}</span>
          <button className="admin-snackbar-close" onClick={closeSnack}>
            <Icon d={I.x} size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
