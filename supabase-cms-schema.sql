-- ============================================================
-- Edupongo Landing Page CMS — Database Schema
-- Jalankan di Supabase Dashboard > SQL Editor
-- ============================================================

-- ─── SITE CONTENT (teks statis) ──────────────────────────────
create table if not exists site_content (
  id         uuid primary key default gen_random_uuid(),
  page       text not null default 'home',
  section    text not null,
  key        text not null,
  content    text not null default '',
  updated_at timestamptz not null default now(),
  unique(page, section, key)
);

-- ─── FEATURES ─────────────────────────────────────────────────
create table if not exists features (
  id          uuid primary key default gen_random_uuid(),
  icon        text not null default '✅',
  tag         text not null default '',
  title       text not null,
  description text not null default '',
  tab         text not null default 'semua' check (tab in ('semua','guru','kepsek','ortu')),
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── TESTIMONIALS ─────────────────────────────────────────────
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  text       text not null,
  name       text not null,
  role       text not null default '',
  initial    text not null default '',
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── FAQS ─────────────────────────────────────────────────────
create table if not exists faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  category   text not null default 'umum' check (category in ('umum','fitur','implementasi','keamanan')),
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── STATS ────────────────────────────────────────────────────
create table if not exists stats (
  id         uuid primary key default gen_random_uuid(),
  page       text not null default 'home' check (page in ('home','about')),
  number     text not null,
  label      text not null,
  sublabel   text not null default '',
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── WHY CARDS ────────────────────────────────────────────────
create table if not exists why_cards (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── PROBLEM CARDS ────────────────────────────────────────────
create table if not exists problem_cards (
  id          uuid primary key default gen_random_uuid(),
  icon        text not null default '📋',
  title       text not null,
  description text not null,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────
alter table site_content   enable row level security;
alter table features       enable row level security;
alter table testimonials   enable row level security;
alter table faqs           enable row level security;
alter table stats          enable row level security;
alter table why_cards      enable row level security;
alter table problem_cards  enable row level security;

-- Izinkan semua operasi untuk authenticated users
create policy "allow_all_authenticated_site_content"  on site_content  for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_features"      on features      for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_testimonials"  on testimonials  for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_faqs"          on faqs          for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_stats"         on stats         for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_why_cards"     on why_cards     for all to authenticated using (true) with check (true);
create policy "allow_all_authenticated_problem_cards" on problem_cards for all to authenticated using (true) with check (true);

-- Izinkan SELECT untuk public (anon)
create policy "allow_public_select_site_content"  on site_content  for select to anon using (true);
create policy "allow_public_select_features"      on features      for select to anon using (true);
create policy "allow_public_select_testimonials"  on testimonials  for select to anon using (true);
create policy "allow_public_select_faqs"          on faqs          for select to anon using (true);
create policy "allow_public_select_stats"         on stats         for select to anon using (true);
create policy "allow_public_select_why_cards"     on why_cards     for select to anon using (true);
create policy "allow_public_select_problem_cards" on problem_cards for select to anon using (true);
