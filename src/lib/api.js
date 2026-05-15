import { supabase } from './supabase';

// Fallback data kalau Supabase belum terisi
const FALLBACK = {
  edp_features: [],
  edp_testimonials: [],
  edp_faqs: [],
  edp_stats: [],
  edp_why_cards: [],
  edp_problem_cards: [],
  edp_site_content: [],
  edp_blog: [],
};

async function fetchData(table, order = 'sort_order', filterStatus = false) {
  if (!supabase) return FALLBACK[table] || [];
  try {
    let query = supabase.from(table).select('*').eq('is_active', true);
    if (filterStatus) query = query.eq('status', 'terbit');
    const { data, error } = await query.order(order);
    if (error) throw error;
    return data || [];
  } catch {
    console.warn(`Supabase fetch ${table} gagal, pakai data statis`);
    return FALLBACK[table] || [];
  }
}

export async function getFeatures()       { return fetchData('edp_features'); }
export async function getTestimonials()   { return fetchData('edp_testimonials', 'sort_order', true); }
export async function getFAQs()           { return fetchData('edp_faqs', 'sort_order', true); }
export async function getWhyCards()       { return fetchData('edp_why_cards'); }
export async function getProblemCards()   { return fetchData('edp_problem_cards'); }
export async function getStats()          { return fetchData('edp_stats'); }
export async function getSiteContent()    { return fetchData('edp_site_content'); }
export async function getPartners()       { return fetchData('edp_partners', 'sort_order', true); }
export async function getBlogs() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('edp_blog')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'terbit')
      .order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    console.warn('Supabase fetch edp_blog gagal');
    return [];
  }
}
