import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DemoModal from './components/DemoModal';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';

function App() {
  const [page, setPage] = useState('home');
  const [demoOpen, setDemoOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(undefined);

  // Cek admin session
  useEffect(() => {
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (!isAdmin) {
      setAdminUser(null);
      return;
    }
    const stored = sessionStorage.getItem('cms_user');
    setAdminUser(stored ? {} : null);
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('cms_user', '1');
    setAdminUser({});
    window.history.replaceState(null, '', '/admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cms_user');
    setAdminUser(null);
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
    function routeFromHash() {
      const hash = window.location.hash;
      if (hash === '#about') setPage('about');
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
      <Footer onNavigate={navigate} onOpenDemo={openDemo} />
      <DemoModal open={demoOpen} onClose={closeDemo} />
    </>
  );
}

export default App;
