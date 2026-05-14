export default function DemoModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="demo-close" onClick={onClose}>✕</button>

        <div className="demo-header">
          <h2>Daftar Demo Gratis</h2>
          <p>Isi data sekolah Anda, tim kami akan menghubungi dalam 1×24 jam.</p>
        </div>

        <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
          <div className="demo-field">
            <label>Nama Lengkap</label>
            <input type="text" placeholder="cth: Fajrul Falah" required />
          </div>

          <div className="demo-field">
            <label>Email</label>
            <input type="email" placeholder="cth: fajrul@sekolah.sch.id" required />
          </div>

          <div className="demo-field">
            <label>No. Telepon / WhatsApp</label>
            <input type="tel" placeholder="cth: 0812-9580-2674" required />
          </div>

          <div className="demo-field">
            <label>Nama Sekolah / Instansi / Yayasan</label>
            <input type="text" placeholder="cth: SMA Negeri 1 Malang" required />
          </div>

          <div className="demo-row">
            <div className="demo-field">
              <label>Jabatan</label>
              <input type="text" placeholder="cth: Kepala Sekolah" />
            </div>
            <div className="demo-field">
              <label>Jumlah Siswa</label>
              <select>
                <option value="">Pilih Jumlah</option>
                <option value="<50">{'<'} 50</option>
                <option value="50-200">50 – 200</option>
                <option value="201-500">201 – 500</option>
                <option value="501-1000">501 – 1.000</option>
                <option value=">1000">{'>'} 1.000</option>
              </select>
            </div>
          </div>

          <button type="submit" className="demo-submit">Daftar Demo Gratis</button>
        </form>
      </div>
    </div>
  );
}
