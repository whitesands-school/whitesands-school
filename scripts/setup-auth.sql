-- Whitesands admin auth — one-time setup.
--
-- Paste this whole file into the Supabase SQL editor and run it.
-- Idempotent: re-running is safe.
--
-- We piggy-back on Supabase Auth (auth.users) for the actual credentials and
-- sessions. The `public.profiles` table just stores the role for each user.
-- Roles: 'super_admin' (can manage users) and 'admin' (can edit content).

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null unique,
  role        text not null check (role in ('super_admin', 'admin')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

-- Authenticated users may read their own profile (needed so the app can
-- discover the caller's role on the server). Service role bypasses RLS.
drop policy if exists "self_read_profile" on public.profiles;
create policy "self_read_profile" on public.profiles
  for select
  using (auth.uid() = id);

-- Keep updated_at fresh on any change
create or replace function public.profiles_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.profiles_set_updated_at();
