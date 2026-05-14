export default function AdminLayout({ onLogout }) {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#E8E9F1', fontFamily: 'Inter, sans-serif' }}>
      <div className="text-center">
        <h1 className="fw-bold mb-3" style={{ color: '#010E23' }}>CMS Dashboard</h1>
        <p className="text-muted mb-4">Dashboard sedang dalam pengembangan.</p>
        <button className="btn btn-outline-secondary" onClick={onLogout}>Keluar</button>
      </div>
    </div>
  );
}
