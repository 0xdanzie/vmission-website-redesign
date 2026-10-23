-- =============================================================================
-- Migration: 20261022141500_create_teachings_and_admin_profiles.sql
-- Scope: teachings and admin_profiles tables with private helper schema,
--        explicit minimal grants, role escalation guards, and distinct RLS policies.
-- Execution Order:
--   1. Schemas & generic trigger functions
--   2. Core tables (admin_profiles, teachings)
--   3. Helper functions referencing core tables (app_private.is_staff)
--   4. Indexes & table triggers
--   5. Explicit grants, RLS activation, and security policies
--   6. First-admin bootstrap instructions (comments)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Private Non-Exposed Schema & Generic Trigger Functions
-- -----------------------------------------------------------------------------
create schema if not exists app_private;

-- Restrict schema access: unexposed to PostgREST HTTP APIs
revoke all on schema app_private from public, anon;
grant usage on schema app_private to authenticated;

-- Timestamp update trigger function
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- -----------------------------------------------------------------------------
-- 2. Staff Profiles Table (admin_profiles)
-- -----------------------------------------------------------------------------
create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 3. Teachings Table (teachings)
-- -----------------------------------------------------------------------------
create table public.teachings (
  id text primary key,
  -- Unique constraint creates the required unique index automatically
  slug text not null unique,
  title text not null,
  scripture text not null,
  teacher text not null,
  format text not null check (format in ('Audio', 'Video', 'PDF', 'E-Book')),
  language text not null default 'Hindi',
  duration text,
  description text not null,
  topic text not null,

  category_slug text not null check (
    category_slug in (
      'bhagavad-gita',
      'upanishads',
      'prakarana-granth',
      'meditation',
      'chanting',
      'devotional',
      'inspiring-stories'
    )
  ),
  category_name text,

  -- Media references
  src text,
  audio_url text,
  youtube_playlist_id text,
  youtube_video_id text,
  source_host text,

  -- Thumbnail & related entities
  thumbnail_src text,
  related_publication_ids text[] default '{}',
  related_study_text jsonb,

  -- Archival verification metadata (no false 'MIGRATED' default for new entries)
  source_status text,
  verification_status text,
  migration_status text,

  -- Publication state: draft by default
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 4. Role Check Helper Function (Depends on public.admin_profiles)
-- -----------------------------------------------------------------------------
-- Defined after public.admin_profiles exists to satisfy language sql validation
create or replace function app_private.is_staff(required_role text default null)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and (
        required_role is null
        or role = required_role
        or (required_role = 'editor' and role in ('admin', 'editor'))
      )
  );
$$;

revoke all on function app_private.is_staff(text) from public, anon;
grant execute on function app_private.is_staff(text) to authenticated;

-- -----------------------------------------------------------------------------
-- 5. Indexes and Timestamp Triggers
-- -----------------------------------------------------------------------------
create index idx_admin_profiles_role on public.admin_profiles(role);

create index idx_teachings_category on public.teachings(category_slug);
create index idx_teachings_teacher on public.teachings(teacher);
create index idx_teachings_published on public.teachings(is_published);

create trigger tr_admin_profiles_updated_at
  before update on public.admin_profiles
  for each row execute function public.set_updated_at();

create trigger tr_teachings_updated_at
  before update on public.teachings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 6. Explicit Schema & Table Grants
-- -----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

-- teachings: read access for public/anon; CRUD for authenticated staff (governed by RLS)
grant select on table public.teachings to anon, authenticated;
grant insert, update, delete on table public.teachings to authenticated;

-- admin_profiles: strictly NO grants to anon; authenticated staff only (governed by RLS)
grant select, insert, update, delete on table public.admin_profiles to authenticated;

-- -----------------------------------------------------------------------------
-- 7. Row Level Security & Policies
-- -----------------------------------------------------------------------------
alter table public.admin_profiles enable row level security;

create policy "Allow staff read own profile or admin read all"
  on public.admin_profiles
  for select
  to authenticated
  using (auth.uid() = id or app_private.is_staff('admin'));

create policy "Allow only admins to insert staff profiles"
  on public.admin_profiles
  for insert
  to authenticated
  with check (app_private.is_staff('admin'));

create policy "Allow only admins to update staff profiles"
  on public.admin_profiles
  for update
  to authenticated
  using (app_private.is_staff('admin'))
  with check (app_private.is_staff('admin'));

create policy "Allow only admins to delete staff profiles"
  on public.admin_profiles
  for delete
  to authenticated
  using (app_private.is_staff('admin'));

alter table public.teachings enable row level security;

-- 7a. Split Read Access
create policy "Allow public read published teachings"
  on public.teachings
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Allow staff read unpublished teachings"
  on public.teachings
  for select
  to authenticated
  using (is_published = false and app_private.is_staff('editor'));

-- 7b. Staff Write Access
create policy "Allow staff insert teachings"
  on public.teachings
  for insert
  to authenticated
  with check (app_private.is_staff('editor'));

create policy "Allow staff update teachings"
  on public.teachings
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

create policy "Allow staff delete teachings"
  on public.teachings
  for delete
  to authenticated
  using (app_private.is_staff('editor'));

-- =============================================================================
-- 8. Controlled First-Admin Bootstrap Procedure (Run Once After User Signup)
-- =============================================================================
-- Step 1: Create the staff user account in Supabase Auth (via Dashboard or Auth API).
--         Example email: office@vmission.org.in
-- Step 2: Run this controlled promotion query with the registered user's email:
--
-- insert into public.admin_profiles (id, email, full_name, role)
-- select
--   id,
--   email,
--   'Vedanta Ashram Office Coordinator',
--   'admin'
-- from auth.users
-- where email = 'office@vmission.org.in'
-- on conflict (id) do update set
--   role = 'admin',
--   updated_at = now();
-- =============================================================================
