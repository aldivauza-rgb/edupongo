import { useState } from 'react';
import { IconCheck, IconArrowRight } from '@tabler/icons-react';

const FEATURES = [
  {
    key: 'presensi',
    tab: 'Presensi Digital',
    tag: 'Otomatis & Akurat',
    title: 'Presensi Digital',
    subtitle: 'Manual, Fingerprint, atau GPS',
    desc: 'Catat kehadiran ratusan siswa dan guru dalam hitungan detik. Pilih metode yang paling sesuai, ketiganya terintegrasi langsung ke laporan dan notifikasi orang tua.',
    points: ['Multi-metode: manual, fingerprint, GPS', 'Notifikasi real-time ke orang tua', 'Laporan otomatis per kelas & periode'],
  },
  {
    key: 'rapor',
    tab: 'Rapor Online',
    tag: 'Guru Fokus Ngajar',
    title: 'Rapor Digital',
    subtitle: 'K13, Kurikulum Merdeka & Program Unggulan',
    desc: 'Input nilai sekali, rapor terformat otomatis. Mendukung tiga kurikulum sekaligus, guru tidak perlu ulang format dari nol setiap ganti kebijakan.',
    points: ['Support K13, Kurmer, & Program Unggulan', 'Format rapor otomatis sesuai kurikulum aktif', 'Akses digital rapor untuk orang tua'],
  },
  {
    key: 'ppdb',
    tab: 'PPDB Online',
    tag: 'Tanpa Antre, Tanpa Bolak-balik',
    title: 'PPDB Online',
    subtitle: 'Pendaftaran, Berkas & Pengumuman Terpusat',
    desc: 'Calon siswa daftar dari rumah, upload berkas dari HP. Sekolah verifikasi dan umumkan hasil dari satu dashboard, tanpa berkas fisik.',
    points: ['Pendaftaran & upload berkas 100% online', 'Verifikasi & seleksi dari satu dashboard', 'Pengumuman hasil otomatis ke pendaftar'],
  },
  {
    key: 'cbt',
    tab: 'Computer Based Test',
    tag: 'Nilai Langsung Keluar',
    title: 'Computer Based Test',
    subtitle: 'Ujian Online & Analisa Butir Soal',
    desc: 'Siswa ujian di komputer, hasil keluar otomatis. Guru bisa analisa butir soal langsung dari platform; tidak ada lagi koreksi manual.',
    points: ['Bank soal & pengacakan otomatis', 'Nilai keluar instan setelah submit', 'Analisa butir soal per siswa & per soal'],
  },
  {
    key: 'media',
    tab: 'Media Pembelajaran',
    tag: 'Satu Klik, Langsung Terkirim',
    title: 'Media Pembelajaran',
    subtitle: 'Materi Tersimpan & Terbagi Mudah',
    desc: 'Guru upload materi sekali, siswa akses dari aplikasi kapanpun. Tidak ada lagi kirim file lewat WhatsApp yang berantakan.',
    points: ['Upload PDF, video, dokumen & link', 'Akses kapanpun dari aplikasi siswa', 'Terorganisir per mata pelajaran & kelas'],
  },
  {
    key: 'bayar',
    tab: 'Pembayaran',
    tag: 'Transparan & Real-Time',
    title: 'Pembayaran Terintegrasi',
    subtitle: 'SPP, Tagihan & Laporan Otomatis',
    desc: 'Orang tua bayar SPP dari aplikasi, bendahara lihat status real-time. Laporan keuangan tersedia kapanpun tanpa rekap manual.',
    points: ['Bayar SPP & tagihan langsung dari HP', 'Status pembayaran real-time untuk bendahara', 'Laporan keuangan otomatis tanpa rekap manual'],
  },
];

/* ─── Mockup: Browser Frame Wrapper ─────────────────────── */
function BrowserFrame({ children, title }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(4,108,242,0.12), 0 4px 16px rgba(0,0,0,0.06)',
      border: '1px solid #E8ECF4',
    }}>
      <div style={{ background: '#F4F6FB', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #E8ECF4' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
        </div>
        <div style={{ flex: 1, background: '#E8ECF4', borderRadius: 6, padding: '5px 12px', fontSize: 12, color: '#97A2B0', fontFamily: 'Inter, sans-serif' }}>
          {title}
        </div>
      </div>
      <div style={{ padding: '20px 22px' }}>{children}</div>
    </div>
  );
}

/* ─── Mockups ────────────────────────────────────────────── */
const rows = [
  { nama: 'Ahmad Rizki', nis: '001', status: 'Hadir', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Budi Santoso', nis: '002', status: 'Hadir', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Citra Dewi', nis: '003', status: 'Alfa', color: '#DC2626', bg: '#FEF2F2' },
  { nama: 'Dani Pratama', nis: '004', status: 'Izin', color: '#D97706', bg: '#FFFBEB' },
  { nama: 'Eka Putri', nis: '005', status: 'Hadir', color: '#059669', bg: '#ECFDF5' },
];

function PresensiMockup() {
  return (
    <BrowserFrame title="app.edupongo.com/presensi">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>Presensi Kelas VII-A</div>
            <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 2 }}>Senin, 20 Mei 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['28', '#059669', 'Hadir'], ['1', '#DC2626', 'Alfa'], ['2', '#D97706', 'Izin']].map(([n, c, l]) => (
              <div key={l} style={{ background: '#F8FAFF', borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: c }}>{n}</div>
                <div style={{ fontSize: 10, color: '#97A2B0' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #F0F2F7' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', background: '#F8FAFF', padding: '8px 12px', gap: 12 }}>
            {['Nama Siswa', 'NIS', 'Status'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#97A2B0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '9px 12px', gap: 12, borderTop: '1px solid #F0F2F7', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#010E23' }}>{r.nama}</div>
              <div style={{ fontSize: 12, color: '#97A2B0', textAlign: 'right' }}>{r.nis}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: r.color, background: r.bg, borderRadius: 6, padding: '3px 8px', textAlign: 'center', whiteSpace: 'nowrap' }}>{r.status}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, background: '#046CF2', borderRadius: 8, padding: '10px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
          Kirim Notifikasi ke Orang Tua
        </div>
      </div>
    </BrowserFrame>
  );
}

const mapel = [
  { nama: 'Matematika', kkm: 75, nilai: 87, grade: 'A' },
  { nama: 'Bahasa Indonesia', kkm: 75, nilai: 92, grade: 'A' },
  { nama: 'IPA', kkm: 75, nilai: 78, grade: 'B+' },
  { nama: 'IPS', kkm: 75, nilai: 84, grade: 'A-' },
  { nama: 'Bahasa Inggris', kkm: 75, nilai: 89, grade: 'A' },
];

function RaporMockup() {
  return (
    <BrowserFrame title="app.edupongo.com/rapor">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>Rapor Digital: Ahmad Rizki</div>
            <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 2 }}>Semester Ganjil 2025/2026 · Kelas VII-A</div>
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600, color: '#046CF2' }}>K13</div>
        </div>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #F0F2F7' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', background: '#F8FAFF', padding: '8px 12px', gap: 16 }}>
            {['Mata Pelajaran', 'KKM', 'Nilai', 'Grade'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#97A2B0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {mapel.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', padding: '9px 12px', gap: 16, borderTop: '1px solid #F0F2F7', alignItems: 'center' }}>
              <div style={{ fontSize: 13, color: '#010E23' }}>{m.nama}</div>
              <div style={{ fontSize: 12, color: '#97A2B0', textAlign: 'center' }}>{m.kkm}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#046CF2', textAlign: 'center' }}>{m.nilai}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#059669', background: '#ECFDF5', borderRadius: 6, padding: '2px 8px', textAlign: 'center' }}>{m.grade}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#F8FAFF', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#046CF2' }}>86.0</div>
            <div style={{ fontSize: 11, color: '#97A2B0' }}>Rata-rata</div>
          </div>
          <div style={{ flex: 1, background: '#F8FAFF', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#010E23' }}>3 / 32</div>
            <div style={{ fontSize: 11, color: '#97A2B0' }}>Peringkat</div>
          </div>
          <div style={{ flex: 1, background: '#ECFDF5', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#059669' }}>Naik</div>
            <div style={{ fontSize: 11, color: '#097858' }}>Status</div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const pendaftar = [
  { nama: 'Farah Aulia', asal: 'SMPN 3 Malang', status: 'Lolos', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Gibran Ramadhan', asal: 'MTsN 1 Malang', status: 'Verifikasi', color: '#D97706', bg: '#FFFBEB' },
  { nama: 'Hani Safitri', asal: 'SMPN 5 Malang', status: 'Lolos', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Irfan Maulana', asal: 'SMPN 8 Malang', status: 'Lolos', color: '#059669', bg: '#ECFDF5' },
];

function PPDBMockup() {
  return (
    <BrowserFrame title="app.edupongo.com/ppdb">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>PPDB Online 2025/2026</div>
          <div style={{ marginTop: 10, background: '#F8FAFF', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
            {[['247', 'Pendaftar'], ['200', 'Kuota'], ['33', 'Sisa Bangku']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#046CF2' }}>{n}</div>
                <div style={{ fontSize: 11, color: '#97A2B0' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #F0F2F7' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', background: '#F8FAFF', padding: '8px 12px', gap: 12 }}>
            {['Nama', 'Asal Sekolah', 'Status'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#97A2B0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {pendaftar.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '9px 12px', gap: 12, borderTop: '1px solid #F0F2F7', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#010E23' }}>{p.nama}</div>
              <div style={{ fontSize: 12, color: '#97A2B0' }}>{p.asal}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: p.color, background: p.bg, borderRadius: 6, padding: '3px 8px', whiteSpace: 'nowrap' }}>{p.status}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#046CF2', borderRadius: 8, padding: '9px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#fff' }}>+ Tambah Pendaftar</div>
          <div style={{ flex: 1, background: '#F8FAFF', border: '1px solid #E5E7EB', borderRadius: 8, padding: '9px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#374151' }}>Export Excel</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function CBTMockup() {
  const [sel, setSel] = useState(2);
  const opts = ['3', '4', '5', '6'];
  return (
    <BrowserFrame title="app.edupongo.com/ujian">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>Ujian: Matematika</div>
            <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 2 }}>Kelas VII-A · 40 Soal</div>
          </div>
          <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '6px 12px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#DC2626' }}>42:15</div>
            <div style={{ fontSize: 10, color: '#DC2626' }}>Sisa Waktu</div>
          </div>
        </div>
        <div style={{ background: '#F8FAFF', borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#97A2B0', marginBottom: 8 }}>Soal 12 dari 40</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#010E23', lineHeight: 1.6 }}>
            Jika 2x + 5 = 15, maka nilai x yang tepat adalah...
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {opts.map((o, i) => (
            <div key={i} onClick={() => setSel(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 9, border: `1.5px solid ${sel === i ? '#046CF2' : '#E5E7EB'}`, background: sel === i ? '#EFF6FF' : '#fff', cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${sel === i ? '#046CF2' : '#D1D5DB'}`, background: sel === i ? '#046CF2' : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sel === i && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: sel === i ? 600 : 400, color: sel === i ? '#046CF2' : '#374151' }}>x = {o}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: '#97A2B0' }}>11 soal selesai · 29 tersisa</div>
          <div style={{ background: '#046CF2', borderRadius: 8, padding: '8px 18px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Selanjutnya →</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const files = [
  { icon: '📄', nama: 'Materi Aljabar - Bab 3.pdf', ukuran: '2.4 MB', type: 'PDF' },
  { icon: '🎬', nama: 'Video Penjelasan Persamaan.mp4', ukuran: '48 MB', type: 'VIDEO' },
  { icon: '📋', nama: 'Latihan Soal Ulangan Harian.pdf', ukuran: '1.1 MB', type: 'PDF' },
  { icon: '🔗', nama: 'Khan Academy: Algebra', ukuran: 'Link', type: 'LINK' },
];

function MediaMockup() {
  return (
    <BrowserFrame title="app.edupongo.com/media-pembelajaran">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>Media Pembelajaran</div>
            <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 2 }}>Matematika · Kelas VII-A</div>
          </div>
          <div style={{ background: '#046CF2', borderRadius: 8, padding: '7px 12px', fontSize: 11, fontWeight: 600, color: '#fff' }}>+ Upload</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #F0F2F7', background: '#FAFBFE' }}>
              <div style={{ fontSize: 22 }}>{f.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#010E23', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.nama}</div>
                <div style={{ fontSize: 11, color: '#97A2B0', marginTop: 2 }}>{f.ukuran}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#046CF2', background: '#EFF6FF', borderRadius: 5, padding: '2px 7px', flexShrink: 0 }}>{f.type}</div>
              <div style={{ fontSize: 12, color: '#046CF2', fontWeight: 600, flexShrink: 0 }}>Buka</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, background: '#F8FAFF', border: '1.5px dashed #D1D5DB', borderRadius: 10, padding: '14px 0', textAlign: 'center', fontSize: 12, color: '#97A2B0' }}>
          + Drag & drop file atau klik untuk upload
        </div>
      </div>
    </BrowserFrame>
  );
}

const tagihan = [
  { nama: 'Ahmad Rizki', jumlah: 'Rp 450.000', status: 'Lunas', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Budi Santoso', jumlah: 'Rp 450.000', status: 'Lunas', color: '#059669', bg: '#ECFDF5' },
  { nama: 'Citra Dewi', jumlah: 'Rp 450.000', status: 'Belum Bayar', color: '#DC2626', bg: '#FEF2F2' },
  { nama: 'Dani Pratama', jumlah: 'Rp 450.000', status: 'Lunas', color: '#059669', bg: '#ECFDF5' },
];

function PembayaranMockup() {
  return (
    <BrowserFrame title="app.edupongo.com/pembayaran">
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#010E23' }}>Pembayaran SPP</div>
            <div style={{ fontSize: 12, color: '#97A2B0', marginTop: 2 }}>Bulan Mei 2026 · Kelas VII-A</div>
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600, color: '#046CF2' }}>Rp 450.000</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[['Rp 11.700.000', 'Terkumpul', '#059669'], ['4', 'Belum Bayar', '#DC2626']].map(([n, l, c]) => (
            <div key={l} style={{ flex: 1, background: '#F8FAFF', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: c }}>{n}</div>
              <div style={{ fontSize: 11, color: '#97A2B0', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #F0F2F7' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', background: '#F8FAFF', padding: '8px 12px', gap: 12 }}>
            {['Nama Siswa', 'Tagihan', 'Status'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#97A2B0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {tagihan.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '9px 12px', gap: 12, borderTop: '1px solid #F0F2F7', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#010E23' }}>{t.nama}</div>
              <div style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{t.jumlah}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.color, background: t.bg, borderRadius: 6, padding: '3px 8px', whiteSpace: 'nowrap' }}>{t.status}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

const MOCKUP_MAP = {
  presensi: <PresensiMockup />,
  rapor: <RaporMockup />,
  ppdb: <PPDBMockup />,
  cbt: <CBTMockup />,
  media: <MediaMockup />,
  bayar: <PembayaranMockup />,
};

/* ─── Main Component ─────────────────────────────────────── */
export default function FeatureShowcase({ onNavigate }) {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <section id="fitur" style={{ background: '#fff', padding: '80px 100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="section-tag">Solusi Lengkap</span>
        <h2 className="section-title" style={{ marginBottom: 12 }}>
          Semua yang sekolah butuhkan<br />ada di satu platform
        </h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Dari kehadiran hingga keuangan, pilih fitur yang paling kamu butuhkan hari ini.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 52 }}>
        {FEATURES.map((f, i) => (
          <button
            key={f.key}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 22px', borderRadius: 999,
              border: active === i ? 'none' : '1.5px solid #E5E7EB',
              background: active === i ? '#046CF2' : '#fff',
              color: active === i ? '#fff' : '#374151',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s ease',
              boxShadow: active === i ? '0 4px 14px rgba(4,108,242,0.3)' : 'none',
            }}
          >
            {f.tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div key={feature.key} style={{ display: 'flex', gap: 64, alignItems: 'center' }}>
        {/* Left */}
        <div style={{ flex: '0 0 38%', maxWidth: '38%' }}>
          <div style={{
            display: 'inline-block',
            background: '#EFF6FF', color: '#046CF2',
            fontSize: 12, fontWeight: 600, padding: '4px 12px',
            borderRadius: 100, marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: 0.5,
          }}>
            {feature.tag}
          </div>
          <h3 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 32, fontWeight: 700,
            color: '#010E23', lineHeight: 1.2,
            marginBottom: 6,
          }}>
            {feature.title}
          </h3>
          <p style={{ fontSize: 16, fontWeight: 500, color: '#5D6B82', marginBottom: 16, lineHeight: 1.5 }}>
            {feature.subtitle}
          </p>
          <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.75, marginBottom: 24 }}>
            {feature.desc}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feature.points.map((pt) => (
              <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#EFF6FF', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                }}>
                  <IconCheck size={12} stroke={2.5} color="#046CF2" />
                </div>
                <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{pt}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate('solution')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 22px', borderRadius: 10,
              border: '1.5px solid #046CF2', background: 'transparent',
              color: '#046CF2', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Lihat Semua Fitur
            <IconArrowRight size={16} stroke={2} />
          </button>
        </div>

        {/* Right: Mockup */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {MOCKUP_MAP[feature.key]}
        </div>
      </div>
    </section>
  );
}
