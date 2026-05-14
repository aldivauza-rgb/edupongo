import { useState } from 'react';
import { logoutAdmin } from './api';
import ContentPage from './pages/ContentPage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQsPage from './pages/FAQsPage';
import StatsPage from './pages/StatsPage';
import WhyPage from './pages/WhyPage';
import ProblemPage from './pages/ProblemPage';

const MENU_GROUPS = [
  {
    title: 'Konten',
    items: [
      { key: 'content', label: 'Konten Teks', icon: 'M4 6h16M4 12h16M4 18h16' },
    ],
  },
  {
    title: 'Konten Dinamis',
    items: [
      { key: 'features', label: 'Fitur', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
      { key: 'testimonials', label: 'Testimoni', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
      { key: 'faqs', label: 'FAQ', icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' },
      { key: 'stats', label: 'Statistik', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
      { key: 'why', label: 'Kenapa Edupongo', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { key: 'problem', label: 'Problem Section', icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' },
    ],
  },
];

function SidebarIcon({ path }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

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

  const currentLabel = MENU_GROUPS.flatMap(g => g.items).find(i => i.key === page)?.label || '';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-badge">CMS</div>
            Edupongo
          </div>
        </div>
        <nav className="admin-sidebar-nav">
          {MENU_GROUPS.map((group, gi) => (
            <div key={gi}>
              <div className="admin-sidebar-section-title">{group.title}</div>
              {group.items.map(m => (
                <button
                  key={m.key}
                  className={`admin-sidebar-item ${page === m.key ? 'active' : ''}`}
                  onClick={() => setPage(m.key)}
                >
                  <SidebarIcon path={m.icon} />
                  {m.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-sidebar-link" target="_blank">Buka Website →</a>
          <button className="admin-sidebar-logout" onClick={onLogout}>Keluar</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <h2>{currentLabel}</h2>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}
