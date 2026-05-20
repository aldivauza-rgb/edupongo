import { useState, useEffect, useRef } from 'react';
import { IconPlus, IconFilter, IconEdit, IconTrash, IconTag, IconChevronDown, IconChevronLeft, IconChevronRight, IconSearch, IconArrowLeft, IconUpload, IconCirclePlus, IconPhoto, IconCalendar, IconLink, IconCopy, IconCheck, IconSparkles } from '@tabler/icons-react';
import ConfirmModal from '../components/ConfirmModal';
import RichEditor from '../../components/RichEditor';
import * as api from '../../lib/admin-api';
import { supabase } from '../../lib/supabase';
import { toSlug } from '../../lib/seo';

function formatDate(d) {
  const full = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  if (!d) return '';
  const dt = new Date(d);
  return `${dt.getDate()} ${full[dt.getMonth()]} ${dt.getFullYear()}`;
}

/* ─── Inline Form ──────────────────────────────────────────── */
function BlogForm({ editData, onBack, onSubmit, userName }) {
  const [form, setForm] = useState({
    title: editData?.title || '',
    kategori: editData?.kategori || 'Artikel',
    date: editData?.date || new Date().toISOString().split('T')[0],
    author: editData?.author || userName || 'admin',
    content: editData?.content || '',
    thumbnail: editData?.thumbnail || '',
  });
  const [errors, setErrors] = useState({});
  const [publishModal, setPublishModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const set = (f) => (v) => setForm((prev) => ({ ...prev, [f]: v }));


  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Judul harus diisi';
    if (!form.kategori.trim()) err.kategori = 'Kategori harus dipilih';
    if (!form.content.trim()) err.content = 'Konten harus diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleUpload = async (file) => {
    if (!file || !supabase) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, thumbnail: 'Maks 2MB' }));
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `blog_${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from('blog-thumbnails')
        .upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage
        .from('blog-thumbnails')
        .getPublicUrl(data.path);
      setForm((prev) => ({ ...prev, thumbnail: publicUrl }));
      setErrors((p) => ({ ...p, thumbnail: null }));
    } catch {
      setErrors((p) => ({ ...p, thumbnail: 'Gagal upload' }));
    } finally {
      setUploading(false);
    }
  };

  const handleDraft = () => {
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim(), content: form.content.trim(), status: 'draf' });
  };

  const handlePublishClick = () => {
    if (!validate()) return;
    setPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishModal(false);
    onSubmit({ ...form, title: form.title.trim(), content: form.content.trim(), status: 'terbit' });
  };

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} /> Kembali
      </button>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E8E9F1' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#010E23', margin: '0 0 28px', fontFamily: 'Inter, sans-serif' }}>
          {editData ? 'Edit Blog' : 'Tambah Blog'}
        </h2>
        {/* ── ROW 1: 2 columns (60% / 40%) ── */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* LEFT COLUMN */}
          <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="admin-field">
              <label className="admin-label">Judul Blog <span className="text-danger">*</span></label>
              <input className={`admin-input${errors.title ? ' admin-input-error' : ''}`} placeholder="Masukkan judul Blog" value={form.title} onChange={(e) => { set('title')(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: null })); }} />
              {errors.title && <small className="admin-error-text">{errors.title}</small>}
              {form.title && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, padding: '3px 10px', background: '#F0F6FF', borderRadius: 6 }}>
                  <IconLink size={12} stroke={1.5} color="#046CF2" />
                  <span style={{ fontSize: 11, color: '#046CF2', fontFamily: 'Inter, sans-serif' }}>
                    edupongo.com/blog/<strong>{toSlug(form.title)}</strong>
                  </span>
                </div>
              )}
            </div>
            <div className="admin-field">
              <label className="admin-label">Penulis <span className="text-danger">*</span></label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 16px', background: '#F5F6FA', borderRadius: 12, border: '1px solid #E8E9F1' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                  {(userName || 'A')[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 13, color: '#010E23' }}>{userName || 'admin'}</span>
                <span style={{ fontSize: 12, color: '#97A2B0' }}>· otomatis</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div className="admin-field">
                  <label className="admin-label">Tanggal</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 14px', background: '#F5F6FA', borderRadius: 12, border: '1px solid #E8E9F1' }}>
                    <span style={{ fontSize: 13, color: '#5D6B82', flex: 1 }}>{form.date}</span>
                    <IconCalendar size={18} stroke={1.5} color="#97A2B0" />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="admin-field">
                  <label className="admin-label">Kategori <span className="text-danger">*</span></label>
                  <select className={`admin-select${errors.kategori ? ' admin-input-error' : ''}`} value={form.kategori} onChange={(e) => { set('kategori')(e.target.value); if (errors.kategori) setErrors((p) => ({ ...p, kategori: null })); }} style={{ width: '100%', height: 46 }}>
                    <option value="">Pilih kategori</option>
                    <option value="Artikel">Artikel</option>
                    <option value="Fitur">Fitur</option>
                  </select>
                  {errors.kategori && <small className="admin-error-text">{errors.kategori}</small>}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Thumbnail */}
          <div style={{ flex: '0 0 calc(40% - 24px)', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label className="admin-label">Thumbnail <span className="text-danger">*</span></label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  flex: 1, borderRadius: 12, minHeight: 200,
                  border: `1.5px dashed ${errors.thumbnail ? '#B3202F' : '#E8E9F1'}`, background: '#F9F9F9',
                  cursor: 'pointer', overflow: 'hidden', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {uploading ? (
                  <span style={{ fontSize: 13, color: '#97A2B0' }}>Mengupload...</span>
                ) : form.thumbnail ? (
                  <>
                    <img src={form.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 8, zIndex: 2 }}>
                      <button onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Ganti</button>
                      <button onClick={(e) => { e.stopPropagation(); setForm((p) => ({ ...p, thumbnail: '' })); }} style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 500, color: '#E74C3C', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Hapus</button>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 20, textAlign: 'center' }}>
                    <IconPhoto size={36} stroke={1.5} color="#D1D5DB" />
                    <div style={{ fontSize: 13, color: '#6B7280' }}>
                      Unggah gambar, atau <span style={{ color: '#046CF2', fontWeight: 500 }}>telusuri</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#D1D5DB' }}>Ukuran 1920×1080px · PNG atau JPG</span>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} style={{ display: 'none' }} />
              {errors.thumbnail && <small className="admin-error-text">{errors.thumbnail}</small>}
            </div>
          </div>
        </div>

        {/* ── ROW 2: Full width — Konten Blog ── */}
        <div style={{ marginTop: 24 }}>
          <div style={{
            fontSize: 12, fontWeight: 500,
            color: '#354764', display: 'block', marginBottom: 6,
          }}>
            Konten Blog <span style={{ color: '#EA2227' }}>*</span>
          </div>
          {errors.content && <small className="admin-error-text" style={{ display: 'block', marginBottom: 4 }}>{errors.content}</small>}
          <RichEditor
            value={form.content}
            onChange={(val) => {
              setForm((prev) => ({ ...prev, content: val }));
              if (errors.content) setErrors((p) => ({ ...p, content: null }));
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, paddingTop: 20, borderTop: '1px solid #E8E9F1' }}>
          <span style={{ fontSize: 12, color: '#5D6B82' }}>* Data tersimpan sebagai draf bila tidak diterbitkan.</span>
          <div style={{ flex: 1 }} />
          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onBack}>Batal</button>
          <button className="admin-btn admin-btn-outline admin-btn-sm" style={{ borderColor: '#101828', color: '#101828' }} onClick={handleDraft}>Simpan sebagai Draf</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handlePublishClick}>
            <IconUpload size={16} stroke={1.5} /> Simpan &amp; Terbitkan
          </button>
        </div>
      </div>
      {publishModal && (
        <ConfirmModal
          title="Terbitkan Blog"
          message="Blog akan langsung dapat diakses publik di website setelah diterbitkan."
          onClose={() => setPublishModal(false)}
          onConfirm={confirmPublish}
          confirmLabel="Ya, Terbitkan"
        />
      )}
    </div>
  );
}

/* ─── Kategori Manager ──────────────────────────────────────── */
function KategoriManager({ items, allKategori, extraKategori, setExtraKategori, onBack, showSnack }) {
  const [inputVal, setInputVal] = useState('');
  const [hapusModal, setHapusModal] = useState(null);

  const countByKategori = (kat) => {
    if (kat === 'Semua') return items.length;
    return items.filter((i) => i.kategori === kat).length;
  };

  const handleTambah = () => {
    const v = inputVal.trim();
    if (!v) return;
    if (allKategori.some((k) => k.toLowerCase() === v.toLowerCase())) {
      showSnack?.('warning', 'Gagal', 'Kategori sudah ada');
      return;
    }
    setExtraKategori((prev) => [...prev, v]);
    setInputVal('');
    showSnack?.('success', 'Berhasil', 'Kategori berhasil ditambahkan');
  };

  const handleHapus = () => {
    if (!hapusModal || hapusModal === 'Semua') return;
    setExtraKategori((prev) => prev.filter((k) => k !== hapusModal));
    setHapusModal(null);
    showSnack?.('success', 'Berhasil', 'Kategori berhasil dihapus');
  };

  return (
    <div className="admin-page-wrap">
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5D6B82', padding: 0, marginBottom: 20 }}>
        <IconArrowLeft size={16} stroke={1.5} /> Kembali
      </button>

      <h1 style={{ fontWeight: 700, fontSize: 30, color: '#000', margin: '0 0 4px' }}>Atur Kategori</h1>
      <p style={{ fontSize: 14, color: '#5D6B82', margin: '0 0 24px' }}>
        <strong style={{ fontWeight: 700, color: '#010E23' }}>Semua</strong> · {allKategori.length} kategori
      </p>

      <div style={{ background: '#fff', borderRadius: 14, padding: 24 }}>
        {/* Tambah Kategori */}
        <label style={{ fontSize: 12, fontWeight: 500, color: '#354764', display: 'block', marginBottom: 6 }}>Tambah Kategori Baru</label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            placeholder="Nama kategori baru"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTambah()}
            style={{ flex: 1, height: 46, borderRadius: 12, border: '1px solid #E8E9F1', padding: '0 14px', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif', color: '#010E23' }}
            onFocus={(e) => e.target.style.borderColor = '#046CF2'}
            onBlur={(e) => e.target.style.borderColor = '#E8E9F1'}
          />
          <button onClick={handleTambah} style={{ height: 46, padding: '0 24px', borderRadius: 12, background: '#046CF2', color: '#fff', fontWeight: 500, fontSize: 14, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}>
            <IconCirclePlus size={16} stroke={1.5} /> Tambah
          </button>
        </div>

        {/* Daftar Kategori */}
        <div style={{ fontWeight: 700, fontSize: 14, color: '#010E23', marginTop: 20, marginBottom: 12 }}>
          Daftar Kategori <span style={{ color: '#5D6B82' }}>·</span> {allKategori.length}
        </div>

        {allKategori.map((kat) => (
          <div key={kat} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, border: '1px solid #F1F2F5', background: '#FAFAFA', marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconTag size={16} stroke={1.5} color="#046CF2" />
            </div>
            <span style={{ fontWeight: 500, fontSize: 14, color: '#010E23', flex: 1 }}>{kat}</span>
            <span style={{ fontSize: 12, color: '#5D6B82' }}>{countByKategori(kat)}</span>
            {kat === 'Semua' ? (
              <span style={{ fontSize: 12, color: '#97A2B0', whiteSpace: 'nowrap' }}>Tidak dapat dihapus</span>
            ) : (
              <button
                onClick={() => setHapusModal(kat)}
                style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #FFE0E2', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <IconTrash size={15} stroke={1.5} color="#E74C3C" />
              </button>
            )}
          </div>
        ))}
      </div>

      {hapusModal && (
        <ConfirmModal
          title="Hapus Kategori"
          message={`Blog dalam kategori ini akan dipindahkan ke kategori Semua. Yakin ingin menghapus?`}
          onClose={() => setHapusModal(null)}
          onConfirm={handleHapus}
          confirmLabel="Ya, Hapus"
          confirmStyle={{ background: '#E74C3C' }}
        />
      )}
    </div>
  );
}

/* ─── Insight Card ─────────────────────────────────────────── */
function InsightCard({ items, allKategori, showSnack }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);
  const [period, setPeriod] = useState('all'); // 'all' | '7' | '30'
  const [periodMap, setPeriodMap] = useState(null); // { kategori: likeCount }

  const published = items.filter(i => i.status === 'terbit');

  useEffect(() => {
    if (period === 'all') { setPeriodMap(null); return; }
    supabase?.rpc('get_category_likes_by_period', { days_back: parseInt(period) })
      .then(({ data }) => {
        if (data) {
          const m = {};
          data.forEach(r => { m[r.kategori] = parseInt(r.like_count || 0); });
          setPeriodMap(m);
        }
      })
      .catch(() => setPeriodMap(null));
  }, [period]);

  if (published.length === 0) return null;

  // Hitung likes per kategori
  const systemKat = (allKategori || []).filter(k => k !== 'Semua');
  const byKat = {};
  systemKat.forEach(k => { byKat[k] = { likes: 0, count: 0 }; });
  published.forEach(i => {
    const k = i.kategori || 'Artikel';
    if (!byKat[k]) byKat[k] = { likes: 0, count: 0 };
    byKat[k].likes += i.likes || 0;
    byKat[k].count++;
  });

  // Jika ada filter periode, override likes dari periodMap
  const displayKat = Object.entries(byKat).map(([k, v]) => [
    k,
    { count: v.count, likes: periodMap ? (periodMap[k] || 0) : v.likes },
  ]);
  const katSorted = displayKat.sort((a, b) => b[1].likes - a[1].likes);
  const top3 = katSorted.slice(0, 3);

  const allTimeLikes = published.reduce((s, i) => s + (i.likes || 0), 0);
  const totalLikes = period === 'all'
    ? allTimeLikes
    : (periodMap ? Object.values(periodMap).reduce((s, v) => s + v, 0) : allTimeLikes);

  const topArticle = [...published].sort((a, b) => (b.likes || 0) - (a.likes || 0))[0];

  const buildPrompt = () => {
    const katList = katSorted
      .map(([k, v]) => `- ${k}: ${v.likes} likes dari ${v.count} artikel`)
      .join('\n');
    const engagementList = katSorted
      .map(([k, v]) => `- ${k}: ${v.count > 0 ? (v.likes / v.count).toFixed(1) : '0.0'} likes/artikel`)
      .join('\n');
    const topArt = topArticle
      ? `"${topArticle.title}" — ${topArticle.likes || 0} likes (kategori: ${topArticle.kategori})`
      : '-';
    const recentTitles = published.slice(0, 5)
      .map(a => `- "${a.title}" (${a.kategori}, ${a.likes || 0} likes)`)
      .join('\n');

    return `/edupongo-blog-strategist

Halo! Ini data dashboard blog Edupongo terbaru. Tolong analisa dan berikan 3 rekomendasi ide artikel.

═══ DATA DASHBOARD BLOG EDUPONGO ═══

Total artikel terbit : ${published.length}
Total likes          : ${totalLikes}

PERFORMA PER KATEGORI (total likes):
${katList}

ENGAGEMENT RATE PER KATEGORI (likes ÷ jumlah artikel):
${engagementList}

ARTIKEL TERPOPULER:
${topArt}

5 ARTIKEL TERBARU:
${recentTitles}

KATEGORI AKTIF DI SISTEM:
${katSorted.map(([k]) => k).join(', ')}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt());
      setCopied(true);
      showSnack?.('success', 'Prompt tersalin!', 'Paste ke Claude untuk rekomendasi & penulisan artikel');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showSnack?.('error', 'Gagal', 'Tidak bisa copy ke clipboard');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #F0F6FF 0%, #F8F9FF 100%)',
      border: '1px solid #DBEAFE', borderRadius: 14,
      padding: '20px 24px', marginBottom: 56, position: 'relative',
    }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: open ? 16 : 0, cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#046CF2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconSparkles size={15} stroke={1.5} color="#fff" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#010E23', fontFamily: 'Inter, sans-serif' }}>Insight Konten</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#046CF2', background: '#DBEAFE', padding: '2px 8px', borderRadius: 999, marginLeft: 2 }}>
          berdasarkan {totalLikes} likes
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
      </div>

      {open && <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Kiri — kategori ranking */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#5D6B82', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Kategori Terpopuler
            </div>
            <div style={{ display: 'flex', gap: 4, background: '#E8E9F1', borderRadius: 8, padding: 3 }}>
              {[['all','Semua'],['7','7 Hari'],['30','30 Hari']].map(([val, label]) => (
                <button key={val} onClick={() => setPeriod(val)} style={{
                  padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  background: period === val ? '#fff' : 'transparent',
                  color: period === val ? '#010E23' : '#6B7280',
                  boxShadow: period === val ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {top3.map(([kat, val], idx) => {
              const rankColors = ['#F59E0B','#6B7280','#CD7C3E'];
              const rankBg = ['#FEF3C7','#F1F2F5','#FDF0E6'];
              return (
                <div key={kat} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#fff', borderRadius: 10, border: '1px solid #E8E9F1' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, background: rankBg[idx], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: rankColors[idx] }}>
                    #{idx + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#010E23', flex: 1 }}>{kat}</span>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>{val.count} artikel</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: val.likes > 0 ? '#E74C3C' : '#D1D5DB', minWidth: 48, textAlign: 'right' }}>♥ {val.likes}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kanan — top artikel */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#5D6B82', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            Artikel Paling Disukai
          </div>
          {topArticle && (
            <div style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E0EAFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 11, background: '#FEE2E2', color: '#E74C3C', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>
                  ♥ {topArticle.likes || 0} likes
                </span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>{topArticle.kategori}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#010E23', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {topArticle.title}
              </div>
            </div>
          )}
        </div>
      </div>}

      {open && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid #DBEAFE' }}>
          <span style={{ fontSize: 12, color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
            Copy prompt → paste ke Claude untuk rekomendasi artikel baru + penulisan + prompt thumbnail Gemini
          </span>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: copied ? '#059669' : '#046CF2', color: '#fff',
              fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif',
              transition: 'background 0.2s',
            }}
          >
            {copied ? <IconCheck size={14} stroke={2} /> : <IconCopy size={14} stroke={1.5} />}
            {copied ? 'Tersalin!' : 'Copy Prompt'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── List Page ────────────────────────────────────────────── */
export default function BlogPage({ showSnack, userName }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [showKategori, setShowKategori] = useState(false);
  const [extraKategori, setExtraKategori] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVal, setFilterVal] = useState({ bulan: '', tahun: '', status: '', kategori: '' });
  const filterRef = useRef(null);

  useEffect(() => {
    api.getBlogs().then(data => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const hasFilter = filterVal.bulan || filterVal.tahun || filterVal.status || filterVal.kategori;

  const filtered = items.filter((i) => {
    if (search && !i.title?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterVal.kategori && i.kategori !== filterVal.kategori) return false;
    if (filterVal.status && i.status !== filterVal.status) return false;
    if (filterVal.bulan) {
      const d = new Date(i.date);
      if (d.getMonth() + 1 !== parseInt(filterVal.bulan)) return false;
    }
    if (filterVal.tahun) {
      const d = new Date(i.date);
      if (d.getFullYear() !== parseInt(filterVal.tahun)) return false;
    }
    return true;
  });
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const openDelete = (item) => setDeleteModal({ show: true, item });
  const confirmDelete = async () => {
    try {
      await api.deleteBlog(deleteModal.item.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteModal.item.id));
      setDeleteModal({ show: false, item: null });
      showSnack('success', 'Berhasil', 'Blog telah dihapus');
    } catch { showSnack('error', 'Gagal', 'Gagal menghapus blog'); }
  };

  const handleEdit = (item) => {
    setEditItem({ ...item, date: item.date ? item.date.split('T')[0] : '' });
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editItem) {
        await api.updateBlog(editItem.id, data);
        setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...data } : i));
        showSnack('success', 'Berhasil', 'Blog telah diperbarui');
      } else {
        const created = await api.createBlog(data);
        setItems((prev) => [created, ...prev]);
        showSnack('success', 'Berhasil', 'Blog telah diterbitkan');
      }
      setShowForm(false);
      setEditItem(null);
    } catch {
      showSnack('error', 'Gagal', 'Terjadi kesalahan');
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setEditItem(null);
  };

  const handleKategoriBack = () => setShowKategori(false);

  const allKategori = ['Semua', ...new Set([...items.map((i) => i.kategori).filter(Boolean), ...extraKategori])];

  if (showKategori) {
    return <KategoriManager items={items} allKategori={allKategori} extraKategori={extraKategori} setExtraKategori={setExtraKategori} onBack={handleKategoriBack} showSnack={showSnack} />;
  }

  if (showForm) {
    return <BlogForm editData={editItem} onBack={handleBack} onSubmit={handleSave} userName={userName} />;
  }

  return (
    <div className="admin-page-wrap">
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-subtitle">
            Kelola artikel Blog yang tampil di website. {total} total &middot; {items.filter((i) => i.status === 'terbit').length} terbit
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setShowKategori(true)}><IconTag size={16} stroke={1.5} /> Atur Kategori</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { setEditItem(null); setShowForm(true); }}><IconPlus size={16} stroke={1.5} /> Tambah Blog</button>
        </div>
      </div>

      {!loading && <InsightCard items={items} allKategori={allKategori} showSnack={showSnack} />}

      <div className="admin-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 46, borderRadius: 12, border: '1px solid #E8E9F1', background: '#fff', flex: 1, maxWidth: 500 }}>
          <IconSearch size={16} stroke={1.5} color="#97A2B0" />
          <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#010E23' }} placeholder="Cari Sesuatu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button className={`admin-filter-btn${hasFilter ? ' active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}><IconFilter size={16} stroke={1.5} /> Filter</button>
          {filterOpen && (
            <div className="admin-filter-popup" ref={filterRef}>
              <div className="admin-filter-popup-header">
                <span className="admin-filter-popup-header-title">Filter</span>
                <button className="admin-filter-popup-header-reset" onClick={() => { setFilterVal({ bulan: '', tahun: '', status: '', kategori: '' }); setPage(1); }}>Reset</button>
              </div>
              <div className="admin-filter-grid">
                <div>
                  <label>Bulan</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.bulan} onChange={(e) => setFilterVal((p) => ({ ...p, bulan: e.target.value }))}>
                      <option value="">Semua Bulan</option>
                      {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Tahun</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.tahun} onChange={(e) => setFilterVal((p) => ({ ...p, tahun: e.target.value }))}>
                      <option value="">Semua Tahun</option>
                      {[2024,2025,2026].map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Status</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.status} onChange={(e) => setFilterVal((p) => ({ ...p, status: e.target.value }))}>
                      <option value="">Semua Status</option>
                      <option value="terbit">Terbit</option>
                      <option value="draf">Draf</option>
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div>
                  <label>Kategori</label>
                  <div style={{ position: 'relative' }}>
                    <select className="admin-filter-select" value={filterVal.kategori} onChange={(e) => setFilterVal((p) => ({ ...p, kategori: e.target.value }))}>
                      <option value="">Semua Kategori</option>
                      <option value="Artikel">Artikel</option>
                      <option value="Fitur">Fitur</option>
                    </select>
                    <IconChevronDown size={16} stroke={1.5} color="#6B7280" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
              <div className="admin-filter-popup-actions">
                <button className="admin-filter-btn-reset" onClick={() => { setFilterVal({ bulan: '', tahun: '', status: '', kategori: '' }); setPage(1); }}>Reset All</button>
                <button className="admin-filter-btn-apply" onClick={() => { setFilterOpen(false); setPage(1); }}>Terapkan</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Thumbnail</th>
              <th>Judul</th>
              <th style={{ width: 120 }}>Tanggal</th>
              <th style={{ width: 110 }}>Penulis</th>
              <th style={{ width: 90 }}>Status</th>
              <th style={{ width: 90 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="admin-empty">Memuat data...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={6} className="admin-empty">Tidak ada data</td></tr>
            ) : paged.map((item) => (
              <tr key={item.id}>
                <td>{item.thumbnail ? <img src={item.thumbnail} alt={item.title} className="admin-thumb" /> : <img src={`https://placehold.co/60x60/E8E9F1/97A2B0?text=${encodeURIComponent((item.title?.split(' ')[0] || 'B'))}`} alt={item.title} className="admin-thumb" />}</td>
                <td>
                  <div className="admin-cell-title">{item.title}</div>
                  <div className="admin-cell-sub" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{item.kategori}</span>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <span style={{ color: item.likes > 0 ? '#E74C3C' : '#97A2B0', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                      ♥ {item.likes || 0}
                    </span>
                  </div>
                </td>
                <td><span className="admin-cell-date">{formatDate(item.date)}</span></td>
                <td><span className="admin-cell-author" style={{ whiteSpace: 'nowrap' }}>{item.author || 'Admin'}</span></td>
                <td><span className={`admin-badge admin-badge-${item.status === 'terbit' ? 'terbit' : 'draf'}`}>{item.status === 'terbit' ? 'Terbit' : 'Draf'}</span></td>
                <td>
                  <div className="admin-action-group">
                    <button className="admin-action-btn admin-action-btn-edit" title="Edit" onClick={() => handleEdit(item)}><IconEdit size={15} stroke={1.5} /></button>
                    <button className="admin-action-btn admin-action-btn-delete" title="Hapus" onClick={() => openDelete(item)}><IconTrash size={15} stroke={1.5} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="admin-pagination">
          <div className="admin-pagination-left">
            Show <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select> entries &middot; {total > 0 ? start + 1 : 0}-{Math.min(start + perPage, total)} dari {total}
          </div>
          <div className="admin-pagination-controls">
            <button className="admin-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}><IconChevronLeft size={14} stroke={1.5} /></button>
            <button className="admin-page-btn active">{page}</button>
            <button className="admin-page-btn" disabled={start + perPage >= total} onClick={() => setPage(page + 1)}><IconChevronRight size={14} stroke={1.5} /></button>
          </div>
        </div>
      </div>
      {deleteModal.show && (
        <ConfirmModal
          title="Hapus Blog"
          message={`Apakah kamu yakin ingin menghapus "${deleteModal.item?.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setDeleteModal({ show: false, item: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
