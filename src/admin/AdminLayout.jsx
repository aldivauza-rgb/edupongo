import { useState } from 'react';
import { logoutAdmin } from './api';
import ContentPage from './pages/ContentPage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQsPage from './pages/FAQsPage';
import StatsPage from './pages/StatsPage';
import WhyPage from './pages/WhyPage';
import ProblemPage from './pages/ProblemPage';

/* ─── Ikon SVG ───────────────────────────────────────────── */
function Svg({ d, size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "block" }}>
      {typeof d === "string" ? <path d={d} /> : d}
    </svg>
  );
}
const I = {
  chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  monitor: "M22 14.97v-9c0-2-1-3-3-3H5c-2 0-3 1-3 3v9c0 2 1 3 3 3h14c2 0 3-1 3-3zM12 21.03v-3.06M2.5 10h19M8 21h8",
  user: "M12 12a5 5 0 100-10 5 5 0 000 10zM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7",
  bell: "M12 6.44V9.77M12.02 2c-3.68 0-6.66 2.98-6.66 6.66v2.1c0 .68-.29 1.72-.63 2.3L3.49 15.3c-.76 1.26-.24 2.67 1.15 3.14 4.63 1.55 9.63 1.55 14.26 0 1.29-.43 1.85-1.96 1.15-3.14l-1.24-2.05c-.34-.59-.63-1.62-.63-2.3v-2.3c0-3.67-3-6.65-6.68-6.65zM15.33 18.82A3.34 3.34 0 0112 22.16c-.92 0-1.83-.37-2.48-1.02-.65-.65-1.02-1.56-1.02-2.32",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99c-.91-.52-1.22-1.68-.7-2.59.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9z",
  inbox: "M22 14h-4l-2 3h-8l-2-3H2M5.97 3.55L2.38 9.99c-.26.46-.38.98-.38 1.49v2.51h20v-2.51c0-.51-.12-1.03-.38-1.49L18.03 3.55C17.36 2.35 16.09 1.5 14.72 1.5H9.28c-1.37 0-2.64.85-3.31 2.05z",
  chevronR: "M8.91 19.92l6.52-6.52a2 2 0 000-2.83L8.91 4.08",
  chevronD: "M19.92 8.95l-6.52 6.52a2 2 0 01-2.83 0L4.08 8.95",
  logout: "M9.17 14.83l5.66-5.66M14.83 14.83L9.17 9.17M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z",
};

/* ─── Sidebar Button ─────────────────────────────────────── */
function NavBtn({ icon, label, active, disabled, onClick, badge, chevron, chevronOpen }) {
  const base = { width: "100%", height: 48, borderRadius: 12, border: "none", padding: "0 12px", display: "flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", transition: "background 0.15s", fontFamily: "Inter", fontSize: 14, fontWeight: 500, textAlign: "left", lineHeight: 1.4, whiteSpace: "nowrap", flexShrink: 0 };
  const hoverBg = "#051B3E";
  const hoverColor = "#F9F9F9";
  const [h, setH] = useState(false);
  const isActive = active || h;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...base, background: active ? "#046CF2" : h ? hoverBg : "transparent", color: active ? "#F9F9F9" : h ? hoverColor : "#8A96A8", opacity: disabled ? 0.5 : 1 }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <Svg d={icon} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge != null && (
        <span style={{ minWidth: 24, height: 24, borderRadius: 12, padding: "0 8px", background: "#E6F0FE", color: "#046CF2", fontFamily: "Inter", fontWeight: 600, fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{badge}</span>
      )}
      {chevron && (
        <Svg d={chevron} size={16} style={{ transform: chevronOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }} />
      )}
    </button>
  );
}

function SubItem({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      style={{ width: "100%", height: 38, borderRadius: 10, background: active ? "#046CF2" : h ? "#051B3E" : "transparent", border: "none", padding: "0 12px 0 41px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "background 0.15s", fontFamily: "Inter", fontSize: 13, fontWeight: 500, textAlign: "left", lineHeight: 1.4, whiteSpace: "nowrap", color: active ? "#F9F9F9" : h ? "#F9F9F9" : "#97A2B0" }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: active || h ? "#F9F9F9" : "#97A2B0", flexShrink: 0 }} />
      {label}
    </button>
  );
}

/* ─── Pages ───────────────────────────────────────────────── */
const PAGES = {
  content:    { label: "Konten Teks", render: () => <ContentPage /> },
  features:   { label: "Fitur", render: () => <FeaturesPage /> },
  testimonials: { label: "Testimoni", render: () => <TestimonialsPage /> },
  faqs:       { label: "FAQ", render: () => <FAQsPage /> },
  stats:      { label: "Statistik", render: () => <StatsPage /> },
  why:        { label: "Kenapa Edupongo", render: () => <WhyPage /> },
  problem:    { label: "Problem Section", render: () => <ProblemPage /> },
};

export default function AdminLayout({ onLogout }) {
  const [page, setPage] = useState('content');
  const [profilOpen, setProfilOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);

  const activeLabel = PAGES[page]?.label || "";
  const navTo = (p) => () => setPage(p);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", background: "#E8E9F1" }}>
      {/* ─── SIDEBAR ─────────────────────────────────────────── */}
      <aside style={{
        width: 260, minWidth: 260, height: "100vh", position: "sticky", top: 0, flexShrink: 0, overflowY: "auto",
        background: "#010E23", padding: "28px 16px", display: "flex", flexDirection: "column",
      }}>
        {/* LOGO */}
        <div style={{ padding: "0 8px", marginBottom: 32, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid white", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "white", opacity: 0.35 }} />
          </div>
          <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 17, color: "white", letterSpacing: 0.5 }}>CMS</span>
        </div>

        {/* NAV MENU */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minHeight: 0 }}>
          <NavBtn icon={I.chart} label="Analisis Web" disabled />
          <NavBtn icon={I.monitor} label="Slideshow" disabled />

          {/* Profil — collapsible, chevron → collapsed, ↓ expanded */}
          <NavBtn icon={I.user} label="Profil"
            onClick={() => setProfilOpen(o => !o)}
            chevron={I.chevronR} chevronOpen={profilOpen}
          />
          {profilOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {["Sambutan", "Tentang Kami", "Visi & Misi", "Struktur Organisasi", "Akreditasi", "Statistik"].map(s => (
                <SubItem key={s} label={s} />
              ))}
            </div>
          )}

          {/* Informasi — collapsible, chevron ↓ collapsed, ↑ expanded */}
          <NavBtn icon={I.bell} label="Informasi"
            onClick={() => setInfoOpen(o => !o)}
            chevron={I.chevronD} chevronOpen={!infoOpen}
          />
          {infoOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {["Berita", "Agenda", "Fasilitas", "Dokumen Rilis", "Majalah"].map(s => (
                <SubItem key={s} label={s} />
              ))}
            </div>
          )}

          <NavBtn icon={I.gear} label="Kelola Akun" disabled />

          <div style={{ margin: "16px 8px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
            <NavBtn icon={I.inbox} label="Pemberitahuan" badge="2" />
          </div>
        </nav>

        {/* BOTTOM — User block (click = logout) */}
        <div style={{ flexShrink: 0 }}>
          <div
            onClick={onLogout}
            title="Keluar"
            style={{
              background: "#051B3E", borderRadius: 12, padding: 12, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 12, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#0A2A5E"}
            onMouseLeave={e => e.currentTarget.style.background = "#051B3E"}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#046CF2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter", fontWeight: 600, fontSize: 13, color: "#F9F9F9", flexShrink: 0 }}>
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: "#F9F9F9", whiteSpace: "nowrap" }}>admin</div>
              <div style={{ fontFamily: "Inter", fontSize: 12, lineHeight: 1.5, color: "#5D6B82", whiteSpace: "nowrap" }}>Administrator</div>
            </div>
            <Svg d={I.chevronR} size={18} />
          </div>
        </div>
      </aside>

      {/* ─── MAIN ───────────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, background: "#E8E9F1", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 32px 0" }}>
          <h2 style={{ fontSize: "clamp(18px, 1.4vw, 24px)", fontWeight: 700, color: "#010E23", margin: 0, fontFamily: "Inter, sans-serif" }}>{activeLabel}</h2>
        </div>
        <div style={{ flex: 1, padding: "20px 32px 32px" }}>
          {PAGES[page]?.render()}
        </div>
      </main>
    </div>
  );
}
