-- =============================================================================
-- Migration: 20261022164500_create_publications_courses_events_acharyas.sql
-- Scope: publications, courses, events, and acharyas tables with
--        explicit minimal grants, RLS policies, draft/published status,
--        and timestamp triggers.
-- Dependencies:
--   - public.set_updated_at() trigger function (from 20261022141500)
--   - app_private.is_staff(text) role helper (from 20261022141500)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Acharyas Table (acharyas)
-- -----------------------------------------------------------------------------
create table public.acharyas (
  slug text primary key,
  name text not null,
  honorific text not null,
  role text not null,
  short_bio text not null,
  full_bio text not null,
  lineage text not null,
  image text not null,
  teachings text[] not null default '{}',
  related_audio text[] not null default '{}',
  programs text[] not null default '{}',
  is_founder boolean not null default false,
  milestones jsonb not null default '[]',
  verification_state text not null default 'SUMMARY-VERIFIED' check (verification_state in ('SOURCE-VERIFIED', 'SUMMARY-VERIFIED')),
  archival_notice text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_acharyas_published on public.acharyas(is_published);
create index idx_acharyas_sort_order on public.acharyas(sort_order);

create trigger tr_acharyas_updated_at
  before update on public.acharyas
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. Courses Table (courses)
-- -----------------------------------------------------------------------------
create table public.courses (
  id text primary key,
  slug text not null unique,
  canonical_id text,
  title text not null,
  subtitle text not null,
  format text not null check (format in ('Online', 'Residential', 'Camp', 'Study Group')),
  status text not null default 'AVAILABLE' check (status in ('AVAILABLE', 'ADMISSION_BASED', 'PARTIAL_DIGITIZING', 'STUDY_CIRCLE')),
  teacher text not null,
  duration text not null,
  fee text not null,
  eligibility text not null,
  description text not null,
  what_you_learn text[] not null default '{}',
  structure text not null,
  dress_code text,
  sample_lessons jsonb not null default '[]',
  questionnaire text[] not null default '{}',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_courses_slug on public.courses(slug);
create index idx_courses_canonical_id on public.courses(canonical_id);
create index idx_courses_format on public.courses(format);
create index idx_courses_published on public.courses(is_published);

create trigger tr_courses_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. Events Table (events)
-- -----------------------------------------------------------------------------
create table public.events (
  id text primary key,
  canonical_id text,
  title text not null,
  type text not null check (type in ('Satsang', 'Gyana Yagna', 'Camp', 'Celebration', 'Course', 'Workshop')),
  entity_type text,
  teacher text not null,
  location text not null,
  city text not null,
  start_date text not null,
  end_date text not null,
  description text not null,
  schedule jsonb not null default '[]',
  registration text not null check (registration in ('open', 'closed', 'limited')),
  fee text,
  is_past boolean not null default false,
  is_archival boolean not null default false,
  source_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_events_canonical_id on public.events(canonical_id);
create index idx_events_type on public.events(type);
create index idx_events_start_date on public.events(start_date);
create index idx_events_published on public.events(is_published);

create trigger tr_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. Publications Table (publications)
-- -----------------------------------------------------------------------------
create table public.publications (
  id text primary key,
  canonical_id text,
  type text not null check (type in ('Vedanta Sandesh', 'Vedanta Piyush', 'E-Books', 'Study & Chant Texts')),
  title text not null,
  month text,
  year integer,
  cover_image text,
  language text not null default 'English',
  download_url text not null default '#',
  archive_url text,
  read_online_url text,
  mirrors jsonb default '{}',
  description text,
  is_latest boolean not null default false,
  page_count integer,
  author text,
  local_cover text,
  source_cover_url text,
  canonical_source text,
  alternate_sources text[] default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_publications_canonical_id on public.publications(canonical_id);
create index idx_publications_type on public.publications(type);
create index idx_publications_year on public.publications(year);
create index idx_publications_published on public.publications(is_published);

create trigger tr_publications_updated_at
  before update on public.publications
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 5. Explicit Schema & Table Grants
-- -----------------------------------------------------------------------------
-- Schema usage for service_role (needed for seed scripts when auto-exposure is disabled)
grant usage on schema public to service_role;

-- service_role: read existing IDs and insert missing records during seed imports
grant select, insert on table
  public.acharyas,
  public.courses,
  public.events,
  public.publications
to service_role;

-- acharyas
grant select on table public.acharyas to anon, authenticated;
grant insert, update, delete on table public.acharyas to authenticated;

-- courses
grant select on table public.courses to anon, authenticated;
grant insert, update, delete on table public.courses to authenticated;

-- events
grant select on table public.events to anon, authenticated;
grant insert, update, delete on table public.events to authenticated;

-- publications
grant select on table public.publications to anon, authenticated;
grant insert, update, delete on table public.publications to authenticated;

-- -----------------------------------------------------------------------------
-- 6. Row Level Security & Policies
-- -----------------------------------------------------------------------------

-- --- 6a. Acharyas RLS ---
alter table public.acharyas enable row level security;

create policy "Allow public read published acharyas"
  on public.acharyas
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Allow staff read unpublished acharyas"
  on public.acharyas
  for select
  to authenticated
  using (is_published = false and app_private.is_staff('editor'));

create policy "Allow staff insert acharyas"
  on public.acharyas
  for insert
  to authenticated
  with check (app_private.is_staff('editor'));

create policy "Allow staff update acharyas"
  on public.acharyas
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

create policy "Allow staff delete acharyas"
  on public.acharyas
  for delete
  to authenticated
  using (app_private.is_staff('editor'));

-- --- 6b. Courses RLS ---
alter table public.courses enable row level security;

create policy "Allow public read published courses"
  on public.courses
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Allow staff read unpublished courses"
  on public.courses
  for select
  to authenticated
  using (is_published = false and app_private.is_staff('editor'));

create policy "Allow staff insert courses"
  on public.courses
  for insert
  to authenticated
  with check (app_private.is_staff('editor'));

create policy "Allow staff update courses"
  on public.courses
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

create policy "Allow staff delete courses"
  on public.courses
  for delete
  to authenticated
  using (app_private.is_staff('editor'));

-- --- 6c. Events RLS ---
alter table public.events enable row level security;

create policy "Allow public read published events"
  on public.events
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Allow staff read unpublished events"
  on public.events
  for select
  to authenticated
  using (is_published = false and app_private.is_staff('editor'));

create policy "Allow staff insert events"
  on public.events
  for insert
  to authenticated
  with check (app_private.is_staff('editor'));

create policy "Allow staff update events"
  on public.events
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

create policy "Allow staff delete events"
  on public.events
  for delete
  to authenticated
  using (app_private.is_staff('editor'));

-- --- 6d. Publications RLS ---
alter table public.publications enable row level security;

create policy "Allow public read published publications"
  on public.publications
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Allow staff read unpublished publications"
  on public.publications
  for select
  to authenticated
  using (is_published = false and app_private.is_staff('editor'));

create policy "Allow staff insert publications"
  on public.publications
  for insert
  to authenticated
  with check (app_private.is_staff('editor'));

create policy "Allow staff update publications"
  on public.publications
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

create policy "Allow staff delete publications"
  on public.publications
  for delete
  to authenticated
  using (app_private.is_staff('editor'));
