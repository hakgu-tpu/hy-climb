-- Normalizes the jsonb list/object columns introduced by the init schema
-- into relational tables and flat columns, per docs/wiki/09-decisions.md
-- WIKI-DEC-006.
--
-- Additive only: existing jsonb columns on centers/app_config are left in
-- place. Run 20260919100100_normalize_data_backfill.sql right after this to
-- populate the new tables/columns from them. Do not drop the old jsonb
-- columns until src/contexts/DataContext.jsx (hy-climb) and hy-climb-admin
-- are confirmed working against the new tables — that's a separate,
-- deliberately later migration.

-- ---------------------------------------------------------------------------
-- centers: flatten the 1:1 `parking` object into columns
-- ---------------------------------------------------------------------------
alter table public.centers
  add column parking_type text check (parking_type in ('self', 'nearby', 'none')),
  add column parking_description text;

-- ---------------------------------------------------------------------------
-- center_translations: replaces centers.i18n, keyed by locale so it extends
-- past English without another schema change.
-- ---------------------------------------------------------------------------
create table public.center_translations (
  center_id text not null references public.centers (id) on delete cascade,
  locale text not null,
  name text,
  address text,
  description text,
  parking_description text,
  primary key (center_id, locale)
);

alter table public.center_translations enable row level security;

grant select on public.center_translations to anon, authenticated;
grant insert, update, delete on public.center_translations to authenticated;

create policy "center_translations_public_read"
  on public.center_translations for select
  to anon, authenticated
  using (true);

create policy "center_translations_operator_insert"
  on public.center_translations for insert
  to authenticated
  with check (public.is_operator());

create policy "center_translations_operator_update"
  on public.center_translations for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "center_translations_operator_delete"
  on public.center_translations for delete
  to authenticated
  using (public.is_operator());

-- ---------------------------------------------------------------------------
-- center_prices: replaces centers.prices and centers.affiliate_prices, one
-- table distinguished by is_affiliate instead of two near-identical arrays.
-- ---------------------------------------------------------------------------
create table public.center_prices (
  id bigint generated always as identity primary key,
  center_id text not null references public.centers (id) on delete cascade,
  is_affiliate boolean not null default false,
  name text not null,
  name_en text,
  price integer not null check (price >= 0),
  sort_order integer not null default 0
);

alter table public.center_prices enable row level security;

grant select on public.center_prices to anon, authenticated;
grant insert, update, delete on public.center_prices to authenticated;

create policy "center_prices_public_read"
  on public.center_prices for select
  to anon, authenticated
  using (true);

create policy "center_prices_operator_insert"
  on public.center_prices for insert
  to authenticated
  with check (public.is_operator());

create policy "center_prices_operator_update"
  on public.center_prices for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "center_prices_operator_delete"
  on public.center_prices for delete
  to authenticated
  using (public.is_operator());

-- ---------------------------------------------------------------------------
-- center_sns_links: replaces centers.sns_links
-- ---------------------------------------------------------------------------
create table public.center_sns_links (
  id bigint generated always as identity primary key,
  center_id text not null references public.centers (id) on delete cascade,
  type text not null check (type in ('instagram', 'blog', 'youtube', 'website')),
  url text not null,
  sort_order integer not null default 0
);

alter table public.center_sns_links enable row level security;

grant select on public.center_sns_links to anon, authenticated;
grant insert, update, delete on public.center_sns_links to authenticated;

create policy "center_sns_links_public_read"
  on public.center_sns_links for select
  to anon, authenticated
  using (true);

create policy "center_sns_links_operator_insert"
  on public.center_sns_links for insert
  to authenticated
  with check (public.is_operator());

create policy "center_sns_links_operator_update"
  on public.center_sns_links for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "center_sns_links_operator_delete"
  on public.center_sns_links for delete
  to authenticated
  using (public.is_operator());

-- ---------------------------------------------------------------------------
-- app_config: flatten the 1:1 `departure` object into columns
-- ---------------------------------------------------------------------------
alter table public.app_config
  add column departure_name text,
  add column departure_name_en text,
  add column departure_naver_place_id text;

-- ---------------------------------------------------------------------------
-- events: replaces app_config.event. Multiple rows are allowed so event
-- history is kept instead of overwritten; at most one may be active.
-- ---------------------------------------------------------------------------
create table public.events (
  id bigint generated always as identity primary key,
  active boolean not null default false,
  title text not null,
  title_en text,
  description text,
  description_en text,
  event_date date,
  end_date date,
  link_url text,
  link_label text,
  link_label_en text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index events_one_active on public.events (active) where active;

alter table public.events enable row level security;

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

create policy "events_public_read"
  on public.events for select
  to anon, authenticated
  using (true);

create policy "events_operator_insert"
  on public.events for insert
  to authenticated
  with check (public.is_operator());

create policy "events_operator_update"
  on public.events for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "events_operator_delete"
  on public.events for delete
  to authenticated
  using (public.is_operator());

-- ---------------------------------------------------------------------------
-- meetings: replaces app_config.meeting, same history + one-active pattern.
-- ---------------------------------------------------------------------------
create table public.meetings (
  id bigint generated always as identity primary key,
  active boolean not null default false,
  center_id text references public.centers (id) on delete set null,
  meeting_date date,
  meeting_time time,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index meetings_one_active on public.meetings (active) where active;

alter table public.meetings enable row level security;

grant select on public.meetings to anon, authenticated;
grant insert, update, delete on public.meetings to authenticated;

create trigger meetings_set_updated_at
  before update on public.meetings
  for each row execute function public.set_updated_at();

create policy "meetings_public_read"
  on public.meetings for select
  to anon, authenticated
  using (true);

create policy "meetings_operator_insert"
  on public.meetings for insert
  to authenticated
  with check (public.is_operator());

create policy "meetings_operator_update"
  on public.meetings for update
  to authenticated
  using (public.is_operator())
  with check (public.is_operator());

create policy "meetings_operator_delete"
  on public.meetings for delete
  to authenticated
  using (public.is_operator());
