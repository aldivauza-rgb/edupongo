import { useState, useRef } from 'react';
import { IconArrowLeft, IconUpload, IconPhoto } from '@tabler/icons-react';
import ConfirmModal from '../components/ConfirmModal';

const AVATAR_COLORS = ['#046CF2', '#007955', '#E07B00', '#8B5CF6', '#DC2626', '#0891B2'];

export default function TambahTestimoniPage({ editData, onBack, onSubmit }) {
  const [form, setForm] = useState({
    name: editData?.name || '',
    instansi: editData?.instansi || '',
    date: editData?.date || new Date().toISOString().split('T')[0],
    text: editData?.text || '',
    foto: editData?.foto || null,
  });
  const [errors, setErrors] = useState({});
  const [publishModal, setPublishModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const set = (f) => (v) => setForm((prev) => ({ ...prev, [f]: v }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Nama & jabatan harus diisi';
    if (!form.instansi.trim()) err.instansi = 'Instansi harus diisi';
    if (!form.text.trim()) err.text = 'Isi testimoni harus diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildPayload = (status) => {
    const initial = form.name.trim().charAt(0).toUpperCase();
    const colorIdx = initial.charCodeAt(0) % AVATAR_COLORS.length;
    return {
      name: form.name.trim(),
      initial,
      bg: AVATAR_COLORS[colorIdx],
      instansi: form.instansi.trim(),
      text: form.text.trim(),
      status,
      publisher: 'Admin Humas',
      date: form.date,
    };
  };

  const handleDraft = () => {
    if (!validate()) return;
    onSubmit(buildPayload('draf'));
  };

  const handlePublishClick = () => {
    if (!validate()) return;
    setPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishModal(false);
    onSubmit(buildPayload('terbit'));
  };

  const handleFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setForm((prev) => ({ ...prev, foto: e.target.result }));
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, foto: null }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const initChar = form.name.trim() ? form.name.trim().charAt(0).toUpperCase() : '?';

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} />
        Kembali
      </button>

      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E8E9F1' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#010E23', margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
          {editData ? 'Edit Testimoni' : 'Tambah Testimoni'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="admin-field">
              <label className="admin-label">Nama &amp; Jabatan <span className="text-danger">*</span></label>
              <input className={`admin-input${errors.name ? ' admin-input-error' : ''}`} placeholder="mis. Wakil Kepala Sekolah" value={form.name} onChange={(e) => { set('name')(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: null })); }} />
              {errors.name && <small className="admin-error-text">{errors.name}</small>}
            </div>

            <div className="admin-field">
              <label className="admin-label">Instansi <span className="text-danger">*</span></label>
              <input className={`admin-input${errors.instansi ? ' admin-input-error' : ''}`} placeholder="mis. MA Unggulan Wahab Hasbulloh, Jombang" value={form.instansi} onChange={(e) => { set('instansi')(e.target.value); if (errors.instansi) setErrors((p) => ({ ...p, instansi: null })); }} />
              {errors.instansi && <small className="admin-error-text">{errors.instansi}</small>}
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div className="admin-field">
                  <label className="admin-label">Dipublikasikan oleh</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', border: '1px solid #E8E9F1', borderRadius: 12, background: '#F1F2F5' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 11, color: '#fff', flexShrink: 0 }}>A</div>
                    <span style={{ fontSize: 13, color: '#5D6B82' }}>Admin Humas</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="admin-field">
                  <label className="admin-label">Tanggal</label>
                  <input type="date" className="admin-input" value={form.date} onChange={(e) => set('date')(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-label">Isi Testimoni <span className="text-danger">*</span></label>
              <textarea className={`admin-textarea${errors.text ? ' admin-input-error' : ''}`} placeholder="Tulis isi testimoni di sini..." style={{ minHeight: 120, ...(errors.text ? { borderColor: '#B3202F' } : {}) }} value={form.text} onChange={(e) => { set('text')(e.target.value); if (errors.text) setErrors((p) => ({ ...p, text: null })); }} />
              {errors.text && <small className="admin-error-text">{errors.text}</small>}
            </div>
          </div>

          {/* RIGHT */}
          <div className="admin-field">
            <label className="admin-label">Foto (Opsional)</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#046CF2' : '#E8E9F1'}`,
                borderRadius: 12, padding: 24,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 12, cursor: 'pointer', transition: 'border-color 0.15s',
                background: dragOver ? '#EEF4FF' : '#F9FAFB', minHeight: 240,
              }}
            >
              {form.foto ? (
                <img src={form.foto} alt="Preview" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 24, color: '#fff' }}>{initChar}</span>
                </div>
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#010E23' }}>Unggah foto, atau telusuri</div>
                <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 4 }}>Format JPG atau PNG, maks 2MB.</div>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid #E8E9F1' }}>
          <div style={{ fontSize: 12, color: '#5D6B82' }}>
            * Testimoni tersimpan sebagai draf bila tidak diterbitkan.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onBack}>Batal</button>
            <button className="admin-btn admin-btn-outline admin-btn-sm" style={{ borderColor: '#101828', color: '#101828' }} onClick={handleDraft}>Simpan sebagai Draf</button>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handlePublishClick}>
              <IconUpload size={16} stroke={1.5} /> {editData ? 'Perbarui & Terbitkan' : 'Simpan & Terbitkan'}
            </button>
          </div>
        </div>
      </div>

      {publishModal && (
        <ConfirmModal
          title="Terbitkan Testimoni"
          message="Testimoni akan langsung dapat diakses publik di website setelah diterbitkan."
          onClose={() => setPublishModal(false)}
          onConfirm={confirmPublish}
          confirmLabel="Ya, Terbitkan"
        />
      )}
    </div>
  );
}
