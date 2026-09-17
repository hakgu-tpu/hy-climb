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

## Seed existing data

`supabase/seed.sql` is generated from the current `src/data/centers.json` / `src/data/config.json` and inserts the same 11 centers plus the singleton `app_config` row. Run it once in the SQL Editor after the migration. It drops the `naverMapUrl` field from `centers.json`: that field isn't in the documented data contract (`docs/wiki/07-reference/02-data-schema.md`) and nothing in `src/` reads it (`src/utils/naverMap.js` builds URLs from `naverPlaceId` instead).

Regenerate it later with the same shape if the JSON files change before the app is switched over to Supabase.

## Editing content for now

Per `WIKI-DEC-005` Phase 1, operators edit `centers` and `app_config` rows directly in Table Editor. Table Editor also runs as the Postgres owner and bypasses RLS, so any invited user with Dashboard access can edit regardless of their `profiles.role` — Dashboard access itself (who you invite as a Supabase project member) is the access boundary for Phase 1, not the RLS policies. RLS policies matter once a Phase 2 admin app authenticates as `authenticated` users through `supabase-js` instead of the Dashboard.

## App client

`src/lib/supabaseClient.js` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the environment (see `.env.example`; the real `.env` is gitignored). The publishable key is the client-safe anon-equivalent key — it's meant to ship in the built bundle and relies on RLS, not secrecy, for protection. Never put the `service_role`/secret key here.

## Not included yet

The public SPA's data-loading code (`HomePage`, `CenterDetailPage`, `EventBanner`, `MeetingBanner`) still imports the static JSON files; it hasn't been switched to query Supabase through `src/lib/supabaseClient.js` yet. That's a separate follow-up step.
