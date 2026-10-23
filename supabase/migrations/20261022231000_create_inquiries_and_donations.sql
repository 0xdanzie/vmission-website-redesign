-- =============================================================================
-- Migration: 20261022231000_create_inquiries_and_donations.sql
-- Scope: inquiries and donations tables with column-level public grants,
--        truthful public write-only RLS, staff enquiry review, and
--        restricted admin-only financial record verification and visibility.
-- Dependencies:
--   - public.set_updated_at() trigger function (from 20261022141500)
--   - app_private.is_staff(text) role helper (from 20261022141500)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Inquiries Table (inquiries)
-- -----------------------------------------------------------------------------
create table public.inquiries (
  id text primary key default gen_random_uuid()::text,
  name text not null check (length(trim(name)) > 0),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  purpose text not null,
  message text not null check (length(trim(message)) >= 10),
  status text not null default 'New' check (status in ('New', 'In Review', 'Resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_inquiries_status on public.inquiries(status);
create index idx_inquiries_created_at on public.inquiries(created_at desc);

create trigger tr_inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. Donations & Seva Offerings Table (donations)
-- -----------------------------------------------------------------------------
create table public.donations (
  id text primary key default gen_random_uuid()::text,
  donor_name text not null check (length(trim(donor_name)) > 0),
  donor_email text,
  donor_phone text,
  donor_pan text,
  category text not null,
  amount numeric not null check (amount > 0),
  method text not null check (
    method in (
      'NEFT / RTGS',
      'NEFT/RTGS',
      'UPI',
      'PayTM',
      'Cheque',
      'PayPal',
      'Telegraphic Wire',
      'Western Union'
    )
  ),
  utr_number text not null check (length(trim(utr_number)) > 0),
  verification_status text not null default 'Pending' check (verification_status in ('Pending', 'Verified', 'Rejected')),
  receipt_status text not null default 'Pending' check (receipt_status in ('Issued', 'Pending')),
  tx_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_donations_verification_status on public.donations(verification_status);
create index idx_donations_receipt_status on public.donations(receipt_status);
create index idx_donations_created_at on public.donations(created_at desc);
create index idx_donations_tx_date on public.donations(tx_date desc);

-- -----------------------------------------------------------------------------
-- 3. Explicit Grants (Automatic table exposure disabled in this Supabase project)
-- -----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

-- Explicitly revoke any broad table-level INSERT grants from public roles
revoke insert on table public.inquiries from anon, authenticated;
revoke insert on table public.donations from anon, authenticated;

-- Public (anon & authenticated): COLUMN-LEVEL INSERT grants ONLY on fields submitted by public forms.
-- Excluded: id, notes, status, verification_status, receipt_status, created_at, updated_at.
-- Database generates IDs (gen_random_uuid()) and defaults all statuses and timestamps.
grant insert (name, email, phone, purpose, message)
  on table public.inquiries
  to anon, authenticated;

grant insert (donor_name, donor_email, donor_phone, donor_pan, category, amount, method, utr_number, tx_date)
  on table public.donations
  to anon, authenticated;

-- Staff: can review, update, and manage inquiries
grant select, update, delete on table public.inquiries to authenticated;

-- Admin: can review, update, and manage financial donation records
grant select, update, delete on table public.donations to authenticated;

-- Service role: full administrative privileges
grant select, insert, update, delete on table public.inquiries, public.donations to service_role;

-- -----------------------------------------------------------------------------
-- 4. Row Level Security & Policies
-- -----------------------------------------------------------------------------

-- --- 4a. Inquiries RLS ---
alter table public.inquiries enable row level security;

-- Public can submit enquiries; server guarantees status = 'New'
create policy "Allow public submit inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (status = 'New');

-- Staff (admin and editor) can read enquiries
create policy "Allow staff read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (app_private.is_staff('editor'));

-- Staff (admin and editor) can update enquiry status
create policy "Allow staff update inquiries"
  on public.inquiries
  for update
  to authenticated
  using (app_private.is_staff('editor'))
  with check (app_private.is_staff('editor'));

-- Only admins can delete enquiry records
create policy "Allow admin delete inquiries"
  on public.inquiries
  for delete
  to authenticated
  using (app_private.is_staff('admin'));

-- --- 4b. Donations RLS (Strict Financial Data Privacy) ---
alter table public.donations enable row level security;

-- Public can submit donation acknowledgements; server guarantees Pending states
create policy "Allow public submit donation acknowledgements"
  on public.donations
  for insert
  to anon, authenticated
  with check (
    verification_status = 'Pending'
    and receipt_status = 'Pending'
  );

-- Only verified administrators can view donor financial offerings
create policy "Allow admin read donations"
  on public.donations
  for select
  to authenticated
  using (app_private.is_staff('admin'));

-- Only verified administrators can verify donations or update 80-G receipts
create policy "Allow admin update donations"
  on public.donations
  for update
  to authenticated
  using (app_private.is_staff('admin'))
  with check (app_private.is_staff('admin'));

-- Only verified administrators can delete donation records
create policy "Allow admin delete donations"
  on public.donations
  for delete
  to authenticated
  using (app_private.is_staff('admin'));
