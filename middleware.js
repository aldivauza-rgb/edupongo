/**
 * Vercel Edge Middleware — OG tag injector untuk crawler sosial media.
 *
 * WhatsApp, Google, Twitter, dsb tidak run JavaScript, jadi mereka selalu
 * baca OG tags dari HTML statis. Middleware ini intercept request dari crawler
 * ke /blog/[slug] dan serve HTML dengan OG tags yang benar (title + thumbnail
 * per artikel). Request dari user biasa langsung pass-through ke SPA.
 */

const CRAWLERS =
  /whatsapp|facebookexternalhit|twitterbot|linkedinbot|googlebot|slackbot|bingbot|yandex|applebot|discordbot|telegrambot/i;

export const config = { matcher: ['/blog/:slug+'] };

function toSlug(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  // Bukan crawler → pass through ke SPA
  if (!CRAWLERS.test(ua)) return;

  const { pathname, origin } = new URL(request.url);
  const slug = pathname.replace(/^\/blog\//, '');
  if (!slug) return;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/edp_blog?select=title,content,thumbnail,date,kategori&is_active=eq.true&status=eq.terbit`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    );

    if (!res.ok) return;
    const blogs = await res.json();
    const blog = blogs.find((b) => toSlug(b.title) === slug);
    if (!blog) return;

    const siteUrl = 'https://edupongo.com';
    const articleUrl = `${siteUrl}/blog/${slug}`;
    const title = escapeHtml(blog.title);
    const desc = escapeHtml(stripHtml(blog.content).slice(0, 160));
    const image = blog.thumbnail || `${siteUrl}/hero-dashboard.jpg`;
    const isoDate = blog.date ? new Date(blog.date).toISOString() : '';

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title} | Edupongo</title>
  <meta name="description" content="${desc}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Edupongo">
  <meta property="og:title" content="${title} | Edupongo">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${articleUrl}">
  ${isoDate ? `<meta property="article:published_time" content="${isoDate}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} | Edupongo">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${image}">
  <link rel="canonical" href="${articleUrl}">
</head>
<body>
  <p><a href="${articleUrl}">${title}</a></p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return; // error → pass through ke SPA
  }
}
