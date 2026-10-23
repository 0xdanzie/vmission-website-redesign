-- =============================================================================
-- Migration: 20261023120000_secure_donations_editor_verification.sql
-- Scope: Corrective security hardening for donations and inquiries tables.
--        1. Allows Editors to review and verify donation payments without exposing
--           sensitive donor details (PAN, email, phone, notes) or receipt issuance.
--        2. Preserves full Administrator capabilities across donations and 80-G receipts.
--        3. Revokes direct authenticated table-level SELECT/UPDATE/DELETE on donations,
--           replacing them with role-checked, column-filtered RPC functions.
--        4. Restricts inquiries UPDATE privileges to column-level status only.
--        5. Adds check constraints preventing empty or whitespace-only values.
-- Dependencies:
--   - public.set_updated_at() trigger function (from 20261022141500)
--   - app_private.is_staff(text) role helper (from 20261022141500)
--   - 20261022231000_create_inquiries_and_donations.sql (Applied remote baseline)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Table Constraints: Non-empty, non-whitespace checks
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'chk_inquiries_purpose_non_empty'
  ) then
    alter table public.inquiries
      add constraint chk_inquiries_purpose_non_empty
      check (length(trim(purpose)) > 0);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'chk_donations_category_non_empty'
  ) then
    alter table public.donations
      add constraint chk_donations_category_non_empty
      check (length(trim(category)) > 0);
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 2. Privilege Adjustments: Deny-by-default on donations & status-only on inquiries
-- -----------------------------------------------------------------------------

-- Inquiries: Revoke table-level UPDATE and grant strictly column-level UPDATE on status
revoke update on table public.inquiries from anon, authenticated;
grant update (status) on table public.inquiries to authenticated;

-- Donations: Revoke table-level SELECT, UPDATE, DELETE from authenticated.
-- Direct table access is replaced with role-checked, column-filtered RPC functions below.
-- This guarantees Editors cannot read sensitive columns or update receipt_status via PostgREST.
revoke select, update, delete on table public.donations from authenticated;
revoke all on table public.donations from public, anon;

-- Public (anon & authenticated): Preserved COLUMN-LEVEL INSERT grants ONLY for donor forms
grant insert (donor_name, donor_email, donor_phone, donor_pan, category, amount, method, utr_number, tx_date)
  on table public.donations
  to anon, authenticated;

-- Service role: full administrative privileges
grant select, insert, update, delete on table public.inquiries, public.donations to service_role;

-- -----------------------------------------------------------------------------
-- 3. Staff Donation Listing RPC (Role-Filtered Column Projection)
-- -----------------------------------------------------------------------------

-- Retrieves donation records for authenticated staff.
-- Administrators: Full access to all columns including donor_email, donor_phone, donor_pan, notes, receipt_status.
-- Editors: Narrow allowlist projection (id, donor_name, category, amount, method, utr_number, verification_status, tx_date, created_at, updated_at).
-- Sensitive fields (PAN, email, phone, notes, receipt_status) are projected as NULL for Editors.
create or replace function public.get_staff_donations()
returns table (
  id text,
  donor_name text,
  donor_email text,
  donor_phone text,
  donor_pan text,
  category text,
  amount numeric,
  method text,
  utr_number text,
  verification_status text,
  receipt_status text,
  tx_date date,
  notes text,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_is_admin boolean;
  v_is_editor boolean;
begin
  -- Role authorization check
  v_is_admin := app_private.is_staff('admin');
  v_is_editor := app_private.is_staff('editor');

  if not v_is_editor then
    raise exception 'Unauthorized: Staff permissions required to view donation queue'
      using errcode = '42501';
  end if;

  if v_is_admin then
    -- Administrator: full record set with all sensitive fields
    return query
    select
      d.id,
      d.donor_name,
      d.donor_email,
      d.donor_phone,
      d.donor_pan,
      d.category,
      d.amount,
      d.method,
      d.utr_number,
      d.verification_status,
      d.receipt_status,
      d.tx_date,
      d.notes,
      d.created_at,
      d.updated_at
    from public.donations d
    order by d.created_at desc;
  else
    -- Editor: strictly limited verification allowlist
    -- Mask sensitive donor details and receipt status
    return query
    select
      d.id,
      d.donor_name,
      null::text as donor_email,
      null::text as donor_phone,
      null::text as donor_pan,
      d.category,
      d.amount,
      d.method,
      d.utr_number,
      d.verification_status,
      null::text as receipt_status,
      d.tx_date,
      null::text as notes,
      d.created_at,
      d.updated_at
    from public.donations d
    order by d.created_at desc;
  end if;
end;
$$;

revoke all on function public.get_staff_donations() from public, anon;
grant execute on function public.get_staff_donations() to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 4. Payment Verification RPC (Editor & Administrator)
-- -----------------------------------------------------------------------------

-- Allows authorized Editors and Administrators to mark offering payments
-- as Pending, Verified, or Rejected. Cannot modify receipt_status or other fields.
create or replace function public.update_donation_verification(
  p_donation_id text,
  p_verification_status text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Requires staff editor or admin role
  if not app_private.is_staff('editor') then
    raise exception 'Unauthorized: Staff permissions required to update verification status'
      using errcode = '42501';
  end if;

  if p_verification_status not in ('Pending', 'Verified', 'Rejected') then
    raise exception 'Invalid verification_status: %', p_verification_status
      using errcode = '22023';
  end if;

  update public.donations
  set verification_status = p_verification_status,
      updated_at = now()
  where id = p_donation_id;

  if not found then
    raise exception 'Donation record not found: %', p_donation_id
      using errcode = 'P0002';
  end if;

  return true;
end;
$$;

revoke all on function public.update_donation_verification(text, text) from public, anon;
grant execute on function public.update_donation_verification(text, text) to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 5. 80-G Receipt Management RPC (Administrator Only)
-- -----------------------------------------------------------------------------

-- Allows verified Administrators only to issue or toggle 80-G certificate status.
-- Editors are strictly rejected with 42501 error.
create or replace function public.update_donation_receipt(
  p_donation_id text,
  p_receipt_status text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Strictly administrator only
  if not app_private.is_staff('admin') then
    raise exception 'Unauthorized: Administrator privileges required to manage 80-G receipts'
      using errcode = '42501';
  end if;

  if p_receipt_status not in ('Issued', 'Pending') then
    raise exception 'Invalid receipt_status: %', p_receipt_status
      using errcode = '22023';
  end if;

  update public.donations
  set receipt_status = p_receipt_status,
      updated_at = now()
  where id = p_donation_id;

  if not found then
    raise exception 'Donation record not found: %', p_donation_id
      using errcode = 'P0002';
  end if;

  return true;
end;
$$;

revoke all on function public.update_donation_receipt(text, text) from public, anon;
grant execute on function public.update_donation_receipt(text, text) to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 6. Donation Deletion RPC (Administrator Only)
-- -----------------------------------------------------------------------------

-- Allows verified Administrators only to delete donation records.
-- Editors are strictly rejected with 42501 error.
create or replace function public.delete_admin_donation(
  p_donation_id text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Strictly administrator only
  if not app_private.is_staff('admin') then
    raise exception 'Unauthorized: Administrator privileges required to delete donation records'
      using errcode = '42501';
  end if;

  delete from public.donations
  where id = p_donation_id;

  if not found then
    raise exception 'Donation record not found: %', p_donation_id
      using errcode = 'P0002';
  end if;

  return true;
end;
$$;

revoke all on function public.delete_admin_donation(text) from public, anon;
grant execute on function public.delete_admin_donation(text) to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 7. Internal Offering Creation RPC (Administrator Only)
-- -----------------------------------------------------------------------------

-- Allows verified Administrators to log verified offerings received directly at the Ashram.
-- Enforces app_private.is_staff('admin') check with security definer and clean search_path.
create or replace function public.log_admin_donation(
  p_donor_name text,
  p_category text,
  p_amount numeric,
  p_method text,
  p_utr_number text,
  p_donor_email text default null,
  p_donor_phone text default null,
  p_donor_pan text default null,
  p_verification_status text default 'Verified',
  p_receipt_status text default 'Issued',
  p_tx_date date default current_date,
  p_notes text default null
)
returns public.donations
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_donation public.donations;
begin
  -- 1. Strictly administrator only
  if not app_private.is_staff('admin') then
    raise exception 'Unauthorized: Administrator privileges required to log offerings'
      using errcode = '42501';
  end if;

  -- 2. Validate statuses
  if p_verification_status not in ('Pending', 'Verified', 'Rejected') then
    raise exception 'Invalid verification_status: %', p_verification_status
      using errcode = '22023';
  end if;

  if p_receipt_status not in ('Issued', 'Pending') then
    raise exception 'Invalid receipt_status: %', p_receipt_status
      using errcode = '22023';
  end if;

  -- 3. Insert record using fully qualified table name
  insert into public.donations (
    donor_name,
    donor_email,
    donor_phone,
    donor_pan,
    category,
    amount,
    method,
    utr_number,
    verification_status,
    receipt_status,
    tx_date,
    notes
  ) values (
    trim(p_donor_name),
    nullif(trim(p_donor_email), ''),
    nullif(trim(p_donor_phone), ''),
    nullif(trim(p_donor_pan), ''),
    trim(p_category),
    p_amount,
    trim(p_method),
    trim(p_utr_number),
    p_verification_status,
    p_receipt_status,
    coalesce(p_tx_date, current_date),
    nullif(trim(p_notes), '')
  )
  returning * into v_donation;

  return v_donation;
end;
$$;

revoke all on function public.log_admin_donation(text, text, numeric, text, text, text, text, text, text, text, date, text) from public, anon;
grant execute on function public.log_admin_donation(text, text, numeric, text, text, text, text, text, text, text, date, text) to authenticated, service_role;
