import { useState, useRef, useEffect } from 'react';
import { IconNews, IconMessage, IconHelp, IconHistory, IconChevronDown, IconExternalLink, IconX, IconCircleCheck, IconCircleX, IconAlertTriangle, IconUser, IconLogout, IconCamera, IconInfoCircle } from '@tabler/icons-react';
import BlogPage from './pages/BlogPage';
import TestimoniPage from './pages/TestimoniPage';
import FAQPage from './pages/FAQPage';
import LogPage from './pages/LogPage';

/* ─── Pages ─────────────────────────────────────────────────── */
const PAGES = {
  blog:      { label: 'Blog',         render: (p) => <BlogPage {...p} /> },
  testimoni: { label: 'Testimoni',    render: (p) => <TestimoniPage {...p} /> },
  faq:       { label: 'FAQ',          render: (p) => <FAQPage {...p} /> },
  log:       { label: 'Log Aktivitas',render: (p) => <LogPage {...p} /> },
};

const SNACK_ICONS = {
  success: IconCircleCheck,
  error: IconCircleX,
  warning: IconAlertTriangle,
};
const SNACK_COLORS = {
  success: '#059669',
  error: '#DC2626',
  warning: '#D97706',
};

/* ─── Detail Akun Modal ─────────────────────────────────────── */
function DetailAkunModal({ onClose, showSnack }) {
  const [name, setName] = useState('admin');
  const fileRef = useRef(null);

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, borderRadius: 14 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 0' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#010E23' }}>Detail Akun</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#97A2B0', flexShrink: 0 }}>
            <IconX size={20} stroke={1.5} />
          </button>
        </div>

        <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 28, color: '#fff' }}>
                A
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
              >
                <IconCamera size={14} stroke={1.5} color="#6B7280" />
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png" style={{ display: 'none' }} />
            </div>
            <span style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>Klik ikon kamera untuk mengubah foto</span>
          </div>

          {/* Nama */}
          <div className="admin-field">
            <label className="admin-label">Nama</label>
            <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} style={{ height: 46, borderRadius: 10, border: '1px solid #E5E7EB' }} />
          </div>

          {/* Password */}
          <div className="admin-field">
            <label className="admin-label">Password</label>
            <div style={{ background: '#F8FAFF', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <IconInfoCircle size={16} stroke={1.5} color="#6B7280" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
                Untuk mengubah password, silakan hubungi <strong>pihak Inagata</strong> sebagai administrator sistem.
              </span>
            </div>
          </div>

          {/* Role */}
          <div className="admin-field">
            <label className="admin-label">Role</label>
            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#010E23' }}>Administrator</span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Ditetapkan oleh sistem</span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onClose}>Batal</button>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { showSnack?.('success', 'Berhasil', 'Nama admin berhasil diperbarui.'); onClose(); }}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AdminLayout ────────────────────────────────────────────── */
export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('blog');
  const [snack, setSnack] = useState(null);
  const [hover, setHover] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const userBlockRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (userBlockRef.current && !userBlockRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const showSnack = (type, title, message) => {
    setSnack({ type, title, message });
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

  const SnackIcon = snack ? SNACK_ICONS[snack.type] || IconCircleCheck : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ─── SIDEBAR ─────────────────────────────────────────── */}
      <aside style={{
        width: 260, minWidth: 260, height: '100vh',
        background: '#010E23', display: 'flex', flexDirection: 'column',
        padding: '26px 14px', position: 'sticky', top: 0, overflow: 'visible',
      }}>
        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
          </nav>

        {/* Bottom section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto', background: 'transparent' }}>
          {navBtn('log', IconHistory, 'Log Aktivitas')}

          {/* User block with dropdown */}
          <div ref={userBlockRef} style={{ position: 'relative' }}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ background: '#051B3E', borderRadius: 11, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}
            >
              <div style={{ padding: '8px 10px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>
                  A
                </div>
                <span style={{ flex: 1, fontWeight: 500, fontSize: 12, color: '#fff' }}>Administrator</span>
                <IconChevronDown size={16} stroke={1.5} style={{ color: '#5D6B82', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              <a
                href="https://edupongo.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <IconExternalLink size={15} stroke={1.5} color="#93C5FD" />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#93C5FD' }}>Lihat Website</span>
              </a>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 8,
                background: '#051B3E', borderRadius: 10, padding: 6,
                display: 'flex', flexDirection: 'column', gap: 2,
                zIndex: 9999, boxShadow: '0 -8px 24px rgba(0,0,0,0.4)',
              }}>
                <button
                  onClick={() => { setDropdownOpen(false); setDetailModal(true); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: '#F9F9F9', fontSize: 13, fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconUser size={16} stroke={1.5} color="#F9F9F9" />
                  Detail Akun
                </button>
                <button
                  onClick={onLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: '#EF4444', fontSize: 13, fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <IconLogout size={16} stroke={1.5} color="#EF4444" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, background: '#E8E9F1', display: 'flex', flexDirection: 'column', padding: '28px 32px' }}>
        {PAGES[page]?.render({ showSnack })}
      </main>

      {/* ─── SNACKBAR ────────────────────────────────────────── */}
      {snack && (
        <div className={`admin-snackbar admin-snackbar-${snack.type}`}>
          {SnackIcon && <SnackIcon size={20} color={SNACK_COLORS[snack.type] || '#6B7280'} stroke={1.5} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2, color: 'inherit' }}>{snack.title}</div>
            <div style={{ fontSize: 12, color: 'inherit', lineHeight: 1.4 }}>{snack.message}</div>
          </div>
          <button className="admin-snackbar-close" onClick={() => setSnack(null)}>
            <IconX size={16} />
          </button>
        </div>
      )}

      {/* ─── DETAIL AKUN MODAL ───────────────────────────────── */}
      {detailModal && (
        <DetailAkunModal onClose={() => setDetailModal(false)} showSnack={showSnack} />
      )}
    </div>
  );
}
