-- =============================================================
-- RLS POLICIES — AUTHENTICATED-ONLY WRITE (plus SELECT)
-- Jalankan di Supabase SQL Editor
-- =============================================================

-- 1. Hapus policy anon write yang lama (gak aman)
drop policy if exists "anon_can_insert_edp_testimonials" on edp_testimonials;
drop policy if exists "anon_can_update_edp_testimonials" on edp_testimonials;
drop policy if exists "anon_can_delete_edp_testimonials" on edp_testimonials;

drop policy if exists "anon_can_insert_edp_faqs" on edp_faqs;
drop policy if exists "anon_can_update_edp_faqs" on edp_faqs;
drop policy if exists "anon_can_delete_edp_faqs" on edp_faqs;

drop policy if exists "anon_can_insert_edp_blog" on edp_blog;
drop policy if exists "anon_can_update_edp_blog" on edp_blog;
drop policy if exists "anon_can_delete_edp_blog" on edp_blog;

-- Bonus: hapus kalau ada policy anon ALL (nama lama dari setup awal)
drop policy if exists "anon_all_edp_blog" on edp_blog;

-- 2. Policy untuk edp_testimonials
-- CATATAN: Butuh SELECT untuk authenticated juga, karena CMS login pake Supabase Auth
create policy "auth_select_edp_testimonials" on edp_testimonials
  for select to authenticated using (true);
create policy "auth_insert_edp_testimonials" on edp_testimonials
  for insert to authenticated with check (true);
create policy "auth_update_edp_testimonials" on edp_testimonials
  for update to authenticated using (true);
create policy "auth_delete_edp_testimonials" on edp_testimonials
  for delete to authenticated using (true);

-- 3. Policy untuk edp_faqs
create policy "auth_select_edp_faqs" on edp_faqs
  for select to authenticated using (true);
create policy "auth_insert_edp_faqs" on edp_faqs
  for insert to authenticated with check (true);
create policy "auth_update_edp_faqs" on edp_faqs
  for update to authenticated using (true);
create policy "auth_delete_edp_faqs" on edp_faqs
  for delete to authenticated using (true);

-- 4. Policy untuk edp_blog
create policy "anon_select_edp_blog" on edp_blog
  for select to anon using (true);
create policy "auth_select_edp_blog" on edp_blog
  for select to authenticated using (true);
create policy "auth_insert_edp_blog" on edp_blog
  for insert to authenticated with check (true);
create policy "auth_update_edp_blog" on edp_blog
  for update to authenticated using (true);
create policy "auth_delete_edp_blog" on edp_blog
  for delete to authenticated using (true);

-- 5. Policy untuk edp_partners
create policy "anon_select_edp_partners" on edp_partners
  for select to anon using (true);
create policy "auth_select_edp_partners" on edp_partners
  for select to authenticated using (true);
create policy "auth_insert_edp_partners" on edp_partners
  for insert to authenticated with check (true);
create policy "auth_update_edp_partners" on edp_partners
  for update to authenticated using (true);
create policy "auth_delete_edp_partners" on edp_partners
  for delete to authenticated using (true);
