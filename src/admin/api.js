import { supabase } from '../lib/supabase';

// ─── AUTH ────────────────────────────────────────────────────
export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─── SITE CONTENT ────────────────────────────────────────────
export const contentApi = {
  async getAll() {
    const { data, error } = await supabase.from('site_content').select('*').order('page').order('section');
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('site_content').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
};

// ─── FEATURES ────────────────────────────────────────────────
export const featuresApi = {
  async getAll() {
    const { data, error } = await supabase.from('features').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('features').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('features').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('features').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─── TESTIMONIALS ────────────────────────────────────────────
export const testimonialsApi = {
  async getAll() {
    const { data, error } = await supabase.from('testimonials').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('testimonials').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('testimonials').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─── FAQS ────────────────────────────────────────────────────
export const faqsApi = {
  async getAll() {
    const { data, error } = await supabase.from('faqs').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('faqs').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('faqs').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─── STATS ───────────────────────────────────────────────────
export const statsApi = {
  async getAll() {
    const { data, error } = await supabase.from('stats').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('stats').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('stats').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('stats').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─── WHY CARDS ───────────────────────────────────────────────
export const whyApi = {
  async getAll() {
    const { data, error } = await supabase.from('why_cards').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('why_cards').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('why_cards').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('why_cards').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─── PROBLEM CARDS ───────────────────────────────────────────
export const problemApi = {
  async getAll() {
    const { data, error } = await supabase.from('problem_cards').select('*').order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(payload) {
    const { data, error } = await supabase.from('problem_cards').insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, payload) {
    const { data, error } = await supabase.from('problem_cards').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('problem_cards').delete().eq('id', id);
    if (error) throw error;
  },
};
