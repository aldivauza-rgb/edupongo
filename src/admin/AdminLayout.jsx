import { useState } from 'react';
import { logoutAdmin } from './api';
import ContentPage from './pages/ContentPage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQsPage from './pages/FAQsPage';
import StatsPage from './pages/StatsPage';
import WhyPage from './pages/WhyPage';
import ProblemPage from './pages/ProblemPage';

const MENU = [
  { key: 'content', label: 'Konten Teks', icon: '📝' },
  { key: 'features', label: 'Fitur', icon: '⚙️' },
  { key: 'testimonials', label: 'Testimoni', icon: '💬' },
  { key: 'faqs', label: 'FAQ', icon: '❓' },
  { key: 'stats', label: 'Statistik', icon: '📊' },
  { key: 'why', label: 'Kenapa Edupongo', icon: '✅' },
  { key: 'problem', label: 'Problem Section', icon: '⚠️' },
];

export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('content');

  const renderPage = () => {
    switch (page) {
      case 'content': return <ContentPage />;
      case 'features': return <FeaturesPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'faqs': return <FAQsPage />;
      case 'stats': return <StatsPage />;
      case 'why': return <WhyPage />;
      case 'problem': return <ProblemPage />;
      default: return <ContentPage />;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">Edupongo CMS</div>
        </div>
        <nav className="admin-sidebar-nav">
          {MENU.map(m => (
            <button
              key={m.key}
              className={`admin-sidebar-item ${page === m.key ? 'active' : ''}`}
              onClick={() => setPage(m.key)}
            >
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-sidebar-link" target="_blank">Buka Website →</a>
          <button className="admin-sidebar-logout" onClick={onLogout}>Logout</button>
        </div>
      </aside>
      <main className="admin-main">
        {renderPage()}
      </main>
    </div>
  );
}
