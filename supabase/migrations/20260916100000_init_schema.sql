-- Hy-Climb Supabase schema: profiles, centers, app_config, RLS.
-- Shape approved in docs/wiki/09-decisions.md (WIKI-DEC-005) and detailed in
-- docs/wiki/05-architecture.md and docs/wiki/07-reference/02-data-schema.md.
--
-- GRANTs below are explicit rather than relying on the Supabase dashboard's
-- "Automatically expose new tables" default, so access doesn't depend on a
-- project setting: a GRANT lets a role attempt an operation at all, RLS then
-- filters which rows it can see or touch.

grant usage on schema public to anon, authenticated;

-- ---------------------------------------------------------------------------
-- profiles: identifies operators/admins for RLS. Accounts are invite-only;
-- there is no public signup surface in the app. anon has no grant at all.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'operator' check (role in ('admin', 'operator')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

grant select, insert, update, delete on public.profiles to authenticated;

-- Every new auth.users row (created by an admin, never by public signup)
-- gets a default operator profile; promote to 'admin' later in Studio.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role) values (new.id, 'operator');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- SECURITY DEFINER so a policy on profiles/centers/app_config can check role
-- without a profiles policy querying profiles and self-recursing.
create function public.is_operator()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid()) in ('admin', 'operator'),
    false
  );
$$;

create function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid()) = 'admin',
    false
  );
$$;

revoke all on function public.is_operator() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_operator() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

create policy "profiles_self_or_admin_read"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id or public.is_admin());

create policy "profiles_admin_insert"
  on public.profiles for insert
  to authenticated
  with check (public.is_admin());

create policy "profiles_admin_update"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "profiles_admin_delete"
  on public.profiles for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- shared updated_at trigger
-- ---------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- centers: mirrors src/data/centers.json
-- (docs/wiki/07-reference/02-data-schema.md Contract section)
-- ---------------------------------------------------------------------------
create table public.centers (
  id text primary key,
  name text not null,
  address text not null,
  region text not null,
  description text not null,
  images text[] not null check (cardinality(images) >= 1),
  is_affiliated boolean not null default false,
  naver_place_id text not null,
  phone text,
  prices jsonb,
  affiliate_prices jsonb,
  sns_links jsonb,
  parking jsonb,
  i18n jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.centers enable row level security;

grant select on public.centers to anon, authenticated;
grant insert, update, delete on public.centers to authenticated;

create trigger centers_set_updated_at
  before update on public.centers
  for each row execute function public.set_updated_at();

create policy "centers_public_read"
  on public.centers for select
  to anon, authenticated
  using (true);

create policy "centers_operator_insert"
  on public.centers for insert
  to authenticated
  with check (public.is_operator());

create policy "centers_operator_update"
  on public.centers for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "centers_operator_delete"
  on public.centers for delete
  to authenticated
  using (public.is_operator());

-- ---------------------------------------------------------------------------
-- app_config: mirrors src/data/config.json, singleton row (id must be true)
-- ---------------------------------------------------------------------------
create table public.app_config (
  id boolean primary key default true check (id),
  departure jsonb not null,
  instagram text not null,
  event jsonb,
  meeting jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_config enable row level security;

grant select on public.app_config to anon, authenticated;
grant insert, update, delete on public.app_config to authenticated;

create trigger app_config_set_updated_at
  before update on public.app_config
  for each row execute function public.set_updated_at();

create policy "app_config_public_read"
  on public.app_config for select
  to anon, authenticated
  using (true);

create policy "app_config_operator_insert"
  on public.app_config for insert
  to authenticated
  with check (public.is_operator());

create policy "app_config_operator_update"
  on public.app_config for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "app_config_operator_delete"
  on public.app_config for delete
  to authenticated
  using (public.is_operator());
