const SITE = {
  name: 'Edupongo',
  url: 'https://edupongo.com',
  defaultDesc: 'Platform manajemen sekolah terintegrasi untuk sekolah, pesantren, dan yayasan pendidikan di Indonesia. Presensi, rapor, PPDB, CBT, dan lebih banyak lagi.',
  defaultImage: 'https://edupongo.com/hero-dashboard.jpg',
};

/* Generate URL-friendly slug dari judul artikel */
export function toSlug(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/* Cari blog berdasarkan slug */
export function findBlogBySlug(blogs, slug) {
  return blogs.find(b => toSlug(b.title) === slug) || null;
}

/* Update meta tags di <head> secara dinamis */
export function updatePageSEO({ title, description, image, url, type = 'website' } = {}) {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — Platform Manajemen Sekolah Terintegrasi`;
  const desc = description || SITE.defaultDesc;
  const img = image || SITE.defaultImage;
  const canonical = url || window.location.href;

  document.title = fullTitle;

  const set = (attr, key, val) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  set('name', 'description', desc);
  set('property', 'og:type', type);
  set('property', 'og:site_name', SITE.name);
  set('property', 'og:title', fullTitle);
  set('property', 'og:description', desc);
  set('property', 'og:image', img);
  set('property', 'og:url', canonical);
  set('name', 'twitter:card', 'summary_large_image');
  set('name', 'twitter:title', fullTitle);
  set('name', 'twitter:description', desc);
  set('name', 'twitter:image', img);

  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonical);
}
