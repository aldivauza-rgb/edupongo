import { IconX } from '@tabler/icons-react';

export default function ConfirmModal({ title, message, onClose, onConfirm, confirmLabel = 'Ya, Hapus', loading, confirmStyle }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 28px 0' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#010E23' }}>{title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#97A2B0', flexShrink: 0 }}>
            <IconX size={20} stroke={1.5} />
          </button>
        </div>
        <div className="admin-modal-body">{message}</div>
        <div className="admin-modal-footer">
          <button className="admin-btn admin-btn-outline" onClick={onClose} disabled={loading}>
            Batal
          </button>
          <button className="admin-btn admin-btn-primary" onClick={onConfirm} disabled={loading} style={{ background: '#046CF2', color: '#fff', ...confirmStyle }}>
            {loading ? 'Menghapus...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
