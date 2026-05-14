import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DemoModal from './components/DemoModal';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import { getSession, logoutAdmin } from './admin/api';

function App() {
  const [page, setPage] = useState('home');
  const [demoOpen, setDemoOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(undefined); // undefined = loading, null = gak login, object = login

  // Cek admin session
  useEffect(() => {
    const isAdminPath = window.location.pathname.startsWith('/admin');
    if (isAdminPath) {
      getSession().then(session => {
        setAdminUser(session?.user || null);
      });
    } else {
      setAdminUser(null);
    }
  }, []);

  // Scroll ke target section atau ke atas setiap kali page berganti
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

  const handleLoginSuccess = () => {
    setAdminUser({});
    history.replaceState(null, '', '/admin');
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
    window.location.href = '/admin';
  };

  // Render admin panel jika path /admin
  if (window.location.pathname.startsWith('/admin')) {
    if (adminUser === undefined) return <div className="admin-loading-full">Loading...</div>;
    if (!adminUser) return <AdminLogin onLogin={handleLoginSuccess} />;
    return <AdminLayout onLogout={handleLogout} />;
  }

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
