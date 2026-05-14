import { supabase } from './supabase';

function adminClient() {
  if (!supabase) throw new Error('Supabase not configured');
  return supabase;
}

/* ─── BLOG ───────────────────────────────────────────────────── */
export async function getBlogs() {
  const { data, error } = await adminClient().from('edp_blog').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createBlog(blog) {
  const { data, error } = await adminClient().from('edp_blog').insert(blog).select();
  if (error) throw error;
  return data?.[0];
}

export async function updateBlog(id, blog) {
  const { data, error } = await adminClient().from('edp_blog').update(blog).eq('id', id).select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteBlog(id) {
  const { error } = await adminClient().from('edp_blog').delete().eq('id', id);
  if (error) throw error;
}

/* ─── TESTIMONI ──────────────────────────────────────────────── */
export async function getTestimonials() {
  const { data, error } = await adminClient().from('edp_testimonials').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createTestimoni(testimoni) {
  const { data, error } = await adminClient().from('edp_testimonials').insert(testimoni).select();
  if (error) throw error;
  return data?.[0];
}

export async function updateTestimoni(id, testimoni) {
  const { data, error } = await adminClient().from('edp_testimonials').update(testimoni).eq('id', id).select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteTestimoni(id) {
  const { error } = await adminClient().from('edp_testimonials').delete().eq('id', id);
  if (error) throw error;
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
export async function getFAQs() {
  const { data, error } = await adminClient().from('edp_faqs').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createFAQ(faq) {
  const { data, error } = await adminClient().from('edp_faqs').insert(faq).select();
  if (error) throw error;
  return data?.[0];
}

export async function updateFAQ(id, faq) {
  const { data, error } = await adminClient().from('edp_faqs').update(faq).eq('id', id).select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteFAQ(id) {
  const { error } = await adminClient().from('edp_faqs').delete().eq('id', id);
  if (error) throw error;
}
