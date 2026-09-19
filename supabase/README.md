# Supabase schema

Implements the shape approved in [`docs/wiki/09-decisions.md`](../docs/wiki/09-decisions.md) (`WIKI-DEC-005`) and detailed in [`docs/wiki/05-architecture.md`](../docs/wiki/05-architecture.md) and [`docs/wiki/07-reference/02-data-schema.md`](../docs/wiki/07-reference/02-data-schema.md).

## Project settings (Data API)

When creating the project or in Project Settings → Data API:

- **Enable Data API**: on. `supabase-js` needs it for the public read path.
- **Automatically expose new tables**: off. The migration below grants access explicitly per table/role instead of relying on this dashboard default.
- **Enable automatic RLS**: on. Safety net for any future table created without an explicit `enable row level security`; this migration already enables RLS on every table itself.

## Apply the migration

Create a Supabase project, then run `supabase/migrations/20260916100000_init_schema.sql` once, either:

- Paste it into the Supabase Dashboard's SQL Editor and run it, or
- `supabase link --project-ref <ref>` then `supabase db push`, if you use the Supabase CLI locally.

## Bootstrap the first admin

1. In the Dashboard, Authentication → Users → Invite user, using the first operator's email. This fires the `on_auth_user_created` trigger, which creates a `profiles` row with `role = 'operator'`.
2. In the SQL Editor (runs as the Postgres owner, so it bypasses RLS), promote that user:

   ```sql
   update public.profiles set role = 'admin' where id = '<user-uuid-from-auth.users>';
   ```

Every later account is invited the same way in Authentication → Users; there is no public sign-up route in the app.

## Storage (center images)

`supabase/migrations/20260917100000_center_images_storage.sql` creates a public `center-images` Storage bucket and matching `storage.objects` RLS policies (public read, operator-only write via `is_operator()`), for the `hy-climb-admin` app's image upload. Run it in the SQL Editor the same way as the schema migration. It doesn't touch any existing image files; `public/images/centers/` in this repo is untouched and still serves the 11 seeded centers' images.

## Seed existing data

`supabase/seed.sql` is generated from the current `src/data/centers.json` / `src/data/config.json` and inserts the same 11 centers plus the singleton `app_config` row. Run it once in the SQL Editor after the migration. It drops the `naverMapUrl` field from `centers.json`: that field isn't in the documented data contract (`docs/wiki/07-reference/02-data-schema.md`) and nothing in `src/` reads it (`src/utils/naverMap.js` builds URLs from `naverPlaceId` instead).

Regenerate it later with the same shape if the JSON files change before the app is switched over to Supabase.

## Editing content for now

Per `WIKI-DEC-005` Phase 1, operators edit `centers` and `app_config` rows directly in Table Editor. Table Editor also runs as the Postgres owner and bypasses RLS, so any invited user with Dashboard access can edit regardless of their `profiles.role` — Dashboard access itself (who you invite as a Supabase project member) is the access boundary for Phase 1, not the RLS policies. RLS policies matter once a Phase 2 admin app authenticates as `authenticated` users through `supabase-js` instead of the Dashboard.

## App client

`src/lib/supabaseClient.js` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the environment (see `.env.example`; the real `.env` is gitignored). The publishable key is the client-safe anon-equivalent key — it's meant to ship in the built bundle and relies on RLS, not secrecy, for protection. Never put the `service_role`/secret key here.

## Schema normalization

Per [`docs/wiki/09-decisions.md`](../docs/wiki/09-decisions.md) `WIKI-DEC-006`, the jsonb columns (`centers.prices`, `affiliate_prices`, `sns_links`, `parking`, `i18n`, and `app_config.departure`, `event`, `meeting`) were replaced by relational tables/flat columns, because editing them as raw JSON in `hy-climb-admin` was bad enough to trigger this rewrite.

Run, in order, after `20260916100000_init_schema.sql`:

1. `supabase/migrations/20260919100000_normalize_schema.sql` — creates `center_translations`, `center_prices`, `center_sns_links`, `events`, `meetings`, and adds `centers.parking_type`/`parking_description` and `app_config.departure_name`/`departure_name_en`/`departure_naver_place_id`. Additive only; the old jsonb columns stay. **Done, 2026-09-19.**
2. `supabase/migrations/20260919100100_normalize_data_backfill.sql` — copies the jsonb contents into the new tables/columns. Only run once (re-running duplicates rows). **Done, 2026-09-19.**
3. `supabase/migrations/20260919100200_drop_legacy_jsonb_columns.sql` — drops `centers.prices`, `affiliate_prices`, `sns_links`, `parking`, `i18n` and `app_config.departure`, `event`, `meeting`. **Not run yet.** `src/contexts/DataContext.jsx` (this repo) was switched over and verified live on 2026-09-19. `hy-climb-admin` was rewritten to use the normalized tables the same day, but its authenticated save/create/delete flows (center edit, price/SNS-link rows, event/meeting activation) haven't been verified end-to-end yet — do that first, in the deployed admin app, logged in as an operator. Once confirmed, run step 3; it's irreversible.

## Not included yet

Nothing — both `hy-climb` and `hy-climb-admin` read/write the normalized tables. Only the legacy-column drop (step 3 above) is pending, gated on manual verification of the admin app's write flows.
