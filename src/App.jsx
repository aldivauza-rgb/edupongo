import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [page, setPage] = useState('home');

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

  const navigate = useCallback((target, hash) => {
    if (target === 'about') {
      window.location.hash = '#about';
    } else if (target === 'home') {
      if (hash) {
        window.location.hash = hash;
      } else {
        window.location.hash = '#';
      }
    }
  }, []);

  return (
    <>
      <Navbar page={page} onNavigate={navigate} />
      <div className={`page-view ${page !== 'home' ? 'hidden' : ''}`}>
        {page === 'home' && <HomePage onNavigate={navigate} />}
      </div>
      <div className={`page-view ${page !== 'about' ? 'hidden' : ''}`}>
        {page === 'about' && <AboutPage />}
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
}

export default App;
