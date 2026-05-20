import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import SolutionPage from './pages/SolutionPage';
import { IconArrowUp, IconBrandWhatsapp } from '@tabler/icons-react';
import DemoModal from './components/DemoModal';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import { getSession, onAuthChange, logout as authLogout } from './lib/auth';

function App() {
  const [page, setPage] = useState('home');
  const [demoOpen, setDemoOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(undefined);

  // Cek admin session via Supabase Auth
  useEffect(() => {
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (!isAdmin) {
      setAdminUser(false);
      return;
    }
    getSession().then((session) => {
      setAdminUser(session ? { user: session.user } : false);
    });
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const sub = onAuthChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setAdminUser(session ? { user: session.user } : false);
        // Jangan redirect kalau user lagi di halaman publik
        if (window.location.pathname.startsWith('/admin')) {
          window.history.replaceState(null, '', '/admin');
        }
      } else if (event === 'SIGNED_OUT') {
        setAdminUser(false);
        localStorage.removeItem('cms_active_page');
        window.location.href = '/admin';
      }
    });
    return () => sub?.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    // Supabase Auth sudah handle session, tinggal set state
    getSession().then((session) => {
      setAdminUser(session ? { user: session.user } : false);
      window.history.replaceState(null, '', '/admin');
    });
  };

  const handleLogout = async () => {
    try {
      await authLogout();
    } catch {
      // force logout lokal kalau gagal
    }
    setAdminUser(false);
    localStorage.removeItem('cms_active_page');
    window.location.href = '/admin';
  };

  // Admin routing
  if (window.location.pathname.startsWith('/admin')) {
    if (adminUser === undefined) {
      return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#E8E9F1', fontFamily: 'Inter, sans-serif' }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      );
    }
    if (!adminUser) return <AdminLogin onLogin={handleLoginSuccess} />;
    return <AdminLayout onLogout={handleLogout} />;
  }

  // Back to top button state
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Scroll effect
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#' && hash !== '#about') {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  useEffect(() => {
    // Path-based routing untuk /blog dan /blog/[slug]
    const pathname = window.location.pathname;
    if (pathname.startsWith('/blog')) {
      setPage('blog');
      return;
    }

    function routeFromHash() {
      const hash = window.location.hash;
      if (hash === '#about') setPage('about');
      else if (hash === '#blog') setPage('blog');
      else if (hash === '#solution') setPage('solution');
      else if (hash === '' || hash === '#') setPage('home');
      else setPage('home');
    }
    routeFromHash();
    window.addEventListener('hashchange', routeFromHash);
    return () => window.removeEventListener('hashchange', routeFromHash);
  }, []);

  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  const navigate = useCallback((target, hash) => {
    if (target === 'about') {
      window.location.hash = '#about';
    } else if (target === 'blog') {
      window.history.pushState(null, '', '/blog');
      setPage('blog');
    } else if (target === 'solution') {
      window.location.hash = '#solution';
    } else if (target === 'home') {
      if (hash) {
        if (page === 'home') {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', hash);
          }
        } else {
          window.location.hash = hash;
        }
      } else {
        window.location.hash = '#';
      }
    }
  }, [page]);

  return (
    <>
      <Navbar page={page} onNavigate={navigate} onOpenDemo={openDemo} />
      <div className={`page-view ${page !== 'home' ? 'hidden' : ''}`}>
        {page === 'home' && <HomePage onNavigate={navigate} onOpenDemo={openDemo} />}
      </div>
      <div className={`page-view ${page !== 'about' ? 'hidden' : ''}`}>
        {page === 'about' && <AboutPage onOpenDemo={openDemo} />}
      </div>
      <div className={`page-view ${page !== 'blog' ? 'hidden' : ''}`}>
        {page === 'blog' && <BlogPage />}
      </div>
      <div className={`page-view ${page !== 'solution' ? 'hidden' : ''}`}>
        {page === 'solution' && <SolutionPage onNavigate={navigate} onOpenDemo={openDemo} />}
      </div>
      <Footer onNavigate={navigate} onOpenDemo={openDemo} />
      <DemoModal open={demoOpen} onClose={closeDemo} />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6281295802674?text=Halo%20Edupongo%2C%20saya%20tertarik%20dengan%20platform%20manajemen%20sekolah%20Edupongo%20dan%20ingin%20mendapatkan%20informasi%20lengkap%20mengenai%20fitur%2C%20harga%2C%20serta%20proses%20implementasinya.%20Boleh%20dibantu%3F%20%F0%9F%99%8F"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: 88, right: 32, zIndex: 998,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#25D366', borderRadius: 999,
          padding: '10px 18px',
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.4)'; }}
      >
        <IconBrandWhatsapp size={16} color="#fff" stroke={2} />
        <span style={{
          color: '#fff', fontSize: 14, fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
        }}>Konsultasi yuk</span>
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 999,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 18px', background: '#fff',
          borderRadius: 999, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          color: '#010E23', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: showTop ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = ''; }}
      >
        Back to Top
        <IconArrowUp size={16} stroke={2} color="#010E23" />
      </button>
    </>
  );
}

export default App;
