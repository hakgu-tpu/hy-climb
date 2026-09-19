# Supabase schema

Implements the shape approved in [`docs/wiki/09-decisions.md`](../docs/wiki/09-decisions.md) (`WIKI-DEC-005`, `WIKI-DEC-006`) and detailed in [`docs/wiki/05-architecture.md`](../docs/wiki/05-architecture.md) and [`docs/wiki/07-reference/02-data-schema.md`](../docs/wiki/07-reference/02-data-schema.md).

## Project settings (Data API)

When creating the project or in Project Settings → Data API:

- **Enable Data API**: on. `supabase-js` needs it for the public read path.
- **Automatically expose new tables**: off. Each migration grants access explicitly per table/role instead of relying on this dashboard default.
- **Enable automatic RLS**: on. Safety net for any future table created without an explicit `enable row level security`; every migration already enables RLS on its own tables.

## Apply the migrations

Create a Supabase project, then run every file in `supabase/migrations/` **in filename order** (each is a timestamp prefix), either:

- Paste each into the Supabase Dashboard's SQL Editor and run it, or
- `supabase link --project-ref <ref>` then `supabase db push`, if you use the Supabase CLI locally.

Order: `20260916100000_init_schema.sql` (core schema/RLS: `centers`, `app_config`, `profiles`) → `20260917100000_center_images_storage.sql` (`center-images` Storage bucket) → `20260919100000_normalize_schema.sql` (`center_prices`, `center_sns_links`, `center_translations`, `events`, `meetings`, plus flat `parking_*`/`departure_*` columns) → `20260919100100_normalize_data_backfill.sql` (only meaningful if the init schema's jsonb columns had data at the time; a no-op on a fresh project) → `20260919100200_drop_legacy_jsonb_columns.sql` (drops the superseded jsonb columns). All five have run against the live project as of 2026-09-19.

## Bootstrap the first admin

1. In the Dashboard, Authentication → Users → Invite user (or "Create new user" to set a password directly, no email needed), using the first operator's email. This fires the `on_auth_user_created` trigger, which creates a `profiles` row with `role = 'operator'`.
2. In the SQL Editor (runs as the Postgres owner, so it bypasses RLS), promote that user:

   ```sql
   update public.profiles set role = 'admin' where id = '<user-uuid-from-auth.users>';
   ```

Every later account is created the same way in Authentication → Users; there is no public sign-up route in either app.

## Editing content now

Operators edit content in [`hy-climb-admin`](https://github.com/hakgu-tpu/hy-climb-admin): `centers` (including prices, SNS links, parking, English translation, images), `events`, `meetings`, and `app_config` (Instagram, departure). It authenticates as `authenticated` Supabase users through `supabase-js`, so RLS (`is_operator()`/`is_admin()`) is the real access boundary there.

Supabase Studio's Table Editor also works (it runs as the Postgres owner and bypasses RLS, so any invited Dashboard member can edit regardless of `profiles.role`), but editing `center_prices`/`center_sns_links`/`center_translations`/`events`/`meetings` by hand in Studio risks breaking the `sort_order` ordering or the "at most one active `events`/`meetings` row" partial-unique-index invariant that `hy-climb-admin` enforces in its save logic — prefer the admin app.

## App client

Both apps read `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the environment (`hy-climb`: `src/lib/supabaseClient.js`; `hy-climb-admin`: same path in that repo). See `.env.example` in each repo; the real `.env` is gitignored. The publishable key is the client-safe anon-equivalent key — it's meant to ship in the built bundle and relies on RLS, not secrecy, for protection. Never put the `service_role`/secret key here.

## Schema normalization (WIKI-DEC-006) — complete

The jsonb columns `centers.prices`, `affiliate_prices`, `sns_links`, `parking`, `i18n`, and `app_config.departure`, `event`, `meeting` were replaced by relational tables (`center_prices`, `center_sns_links`, `center_translations`, `events`, `meetings`) and flat columns (`centers.parking_type`/`parking_description`, `app_config.departure_name`/`departure_name_en`/`departure_naver_place_id`), because editing them as raw JSON in `hy-climb-admin` was bad enough to trigger this rewrite. Both `hy-climb`'s `DataContext.jsx` and `hy-climb-admin` were switched over, the Project owner verified the admin app's write flows end-to-end, and the legacy jsonb columns were dropped — all 2026-09-19. Nothing in either app reads or writes them anymore.
