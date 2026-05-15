import { useState, useEffect } from 'react';
import { IconArrowLeft, IconCalendar, IconUser, IconTag } from '@tabler/icons-react';
import { getBlogs } from '../lib/api';

function formatDate(d) {
  if (!d) return '';
  const full = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dt = new Date(d);
  return `${full[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function excerpt(content, max = 180) {
  const text = stripHtml(content);
  return text.length > max ? text.slice(0, max) + '…' : text;
}

/* ─── Blog Detail ─────────────────────────────────────────── */
function BlogDetail({ blog, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [blog]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none',
          background: 'none', cursor: 'pointer', padding: 0, marginBottom: 28,
          fontSize: 14, fontWeight: 500, color: '#6B7280', fontFamily: 'inherit',
        }}
      >
        <IconArrowLeft size={18} stroke={1.5} />
        Kembali ke Blog
      </button>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <div style={{
          width: '100%', height: 320, borderRadius: 14, overflow: 'hidden',
          background: '#F3F4F6', marginBottom: 24,
        }}>
          <img
            src={blog.thumbnail}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Category & Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#EEF2FF', color: '#046CF2', fontSize: 12, fontWeight: 600,
          padding: '4px 12px', borderRadius: 999,
        }}>
          <IconTag size={13} stroke={1.5} />
          {blog.kategori || 'Artikel'}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9CA3AF' }}>
          <IconCalendar size={15} stroke={1.5} />
          {formatDate(blog.date)}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9CA3AF' }}>
          <IconUser size={15} stroke={1.5} />
          {blog.author || 'Admin'}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 32, fontWeight: 800, color: '#010E23', lineHeight: 1.3,
        margin: '0 0 8px', fontFamily: 'inherit',
      }}>
        {blog.title}
      </h1>

      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />

      {/* Content */}
      <div
        className="blog-content"
        style={{
          fontSize: 16, lineHeight: 1.8, color: '#374151',
          fontFamily: 'inherit',
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}

/* ─── Blog List ───────────────────────────────────────────── */
function BlogList({ blogs, loading, onSelect }) {
  const [search, setSearch] = useState('');
  const [filterKat, setFilterKat] = useState('');

  const categories = [...new Set(blogs.map((b) => b.kategori || 'Artikel').filter(Boolean))];

  const filtered = blogs.filter((b) => {
    if (search && !b.title?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterKat && b.kategori !== filterKat) return false;
    return true;
  });

  return (
    <>
      {/* Header Section */}
      <div style={{ background: '#F8F9FA', padding: '64px 0 48px', width: '100%' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', textAlign: 'left' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '6px 14px', background: '#EEF4FF', color: '#046CF2',
            borderRadius: 999, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Blog
          </span>
          <h1 style={{
            fontSize: 36, fontWeight: 800, color: '#010E23',
            lineHeight: 1.2, margin: 0, maxWidth: 600,
            fontFamily: 'inherit',
          }}>
            Artikel, tips, dan informasi seputar dunia pendidikan dan teknologi sekolah.
          </h1>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 220, height: 44, padding: '0 16px', borderRadius: 10,
            border: '1px solid #E5E7EB', fontSize: 14, color: '#010E23', outline: 'none',
            fontFamily: 'inherit', background: '#fff',
          }}
        />
        <select
          value={filterKat}
          onChange={(e) => setFilterKat(e.target.value)}
          style={{
            height: 44, padding: '0 32px 0 14px', borderRadius: 10,
            border: '1px solid #E5E7EB', fontSize: 14, color: '#010E23', outline: 'none',
            fontFamily: 'inherit', background: '#fff',
            appearance: 'none', cursor: 'pointer',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236B7280' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
          }}
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 80px' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#9CA3AF', fontSize: 14 }}>
          Memuat artikel...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#9CA3AF', fontSize: 14 }}>
          {search || filterKat ? 'Tidak ada artikel yang cocok dengan pencarian.' : 'Belum ada artikel.'}
        </div>
      ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px 32px',
        }}>
          {filtered.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelect(blog)}
              style={{
                cursor: 'pointer', transition: 'transform 0.2s',
                display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Thumbnail with category badge */}
              {blog.thumbnail ? (
                <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 220, flexShrink: 0, borderRadius: 12, background: '#F3F4F6' }}>
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span style={{
                    position: 'absolute', bottom: 16, left: 16,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: '#fff', color: '#046CF2', fontSize: 12, fontWeight: 600,
                    padding: '4px 12px', borderRadius: 999,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    <IconTag size={12} stroke={1.5} />
                    {blog.kategori || 'Artikel'}
                  </span>
                </div>
              ) : (
                <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 220, flexShrink: 0, borderRadius: 12, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: '#fff', color: '#046CF2', fontSize: 12, fontWeight: 600,
                    padding: '4px 12px', borderRadius: 999,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    <IconTag size={12} stroke={1.5} />
                    {blog.kategori || 'Artikel'}
                  </span>
                </div>
              )}

              {/* Date */}
              <span style={{ fontSize: 12, color: '#6B7280', marginTop: 14 }}>
                {formatDate(blog.date)}
              </span>

              {/* Title — max 2 lines */}
              <h2 style={{
                fontSize: 18, fontWeight: 700, color: '#010E23', lineHeight: 1.4,
                margin: '6px 0 0 0', fontFamily: 'inherit',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {blog.title}
              </h2>

              {/* Excerpt — max 4 lines */}
              <p style={{
                fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: '10px 0 0 0',
                display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {excerpt(blog.content)}
              </p>
            </article>
          ))}
        </div>
      )}
      </div>
  </>
  );
}

/* ─── BlogPage ────────────────────────────────────────────── */
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getBlogs().then(setBlogs).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (selected) {
    return <BlogDetail blog={selected} onBack={() => setSelected(null)} />;
  }

  return <BlogList blogs={blogs} loading={loading} onSelect={setSelected} />;
}
