#!/usr/bin/env node
/**
 * Generate public/sitemap.xml dari data blog Supabase.
 * Jalankan: npm run sitemap
 * Atau otomatis saat build: npm run build
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dir = dirname(fileURLToPath(import.meta.url));

// Baca .env manual (tanpa dotenv dependency)
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dir, '../.env'), 'utf-8');
    raw.split('\n').forEach(line => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    });
  } catch { /* .env tidak ada, lanjut */ }
}

function toSlug(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const SITE_URL = 'https://edupongo.com';

const STATIC_URLS = [
  { loc: `${SITE_URL}/`,          changefreq: 'weekly',  priority: '1.0' },
  { loc: `${SITE_URL}/blog`,      changefreq: 'daily',   priority: '0.9' },
  { loc: `${SITE_URL}/#about`,    changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/#solution`, changefreq: 'monthly', priority: '0.8' },
];

function urlEntry({ loc, changefreq, priority, lastmod }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n');
}

async function generate() {
  loadEnv();

  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  let blogUrls = [];

  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const { data } = await supabase
        .from('edp_blog')
        .select('title, date')
        .eq('is_active', true)
        .eq('status', 'terbit')
        .order('date', { ascending: false });

      if (data?.length) {
        blogUrls = data.map(b => ({
          loc: `${SITE_URL}/blog/${toSlug(b.title)}`,
          changefreq: 'monthly',
          priority: '0.7',
          lastmod: b.date ? new Date(b.date).toISOString().split('T')[0] : undefined,
        }));
        console.log(`✓ ${data.length} artikel blog ditemukan`);
      }
    } catch (e) {
      console.warn('⚠ Gagal fetch dari Supabase, hanya URL statis yang dihasilkan:', e.message);
    }
  } else {
    console.warn('⚠ VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tidak ditemukan, hanya URL statis');
  }

  const allUrls = [...STATIC_URLS, ...blogUrls];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allUrls.map(urlEntry),
    '</urlset>',
  ].join('\n');

  const out = resolve(__dir, '../public/sitemap.xml');
  writeFileSync(out, xml, 'utf-8');
  console.log(`✓ sitemap.xml diperbarui (${allUrls.length} URL) → ${out}`);
}

generate().catch(e => { console.error(e); process.exit(1); });
