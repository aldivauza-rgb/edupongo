import { supabase } from './supabase';

// Fallback data kalau Supabase belum terisi
const FALLBACK = {
  features: [],
  testimonials: [],
  faqs: [],
  stats: [],
  why_cards: [],
  problem_cards: [],
  site_content: [],
};

async function fetchData(table, order = 'sort_order') {
  if (!supabase) return FALLBACK[table] || [];
  try {
    const { data, error } = await supabase.from(table).select('*').eq('is_active', true).order(order);
    if (error) throw error;
    return data || [];
  } catch {
    console.warn(`Supabase fetch ${table} gagal, pakai data statis`);
    return FALLBACK[table] || [];
  }
}

export async function getFeatures()       { return fetchData('features'); }
export async function getTestimonials()   { return fetchData('testimonials'); }
export async function getFAQs()           { return fetchData('faqs'); }
export async function getWhyCards()       { return fetchData('why_cards'); }
export async function getProblemCards()   { return fetchData('problem_cards'); }
export async function getStats()          { return fetchData('stats'); }
export async function getSiteContent()    { return fetchData('site_content'); }
