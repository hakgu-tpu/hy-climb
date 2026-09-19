# Architecture

## System boundary

Hy-Climb is a Vite SPA for Hy-Climb club members who need climbing center listings, detail pages, bilingual UI, and Naver Map direction links. The app runs fully in the browser. Center and site-config data is read at runtime from a Supabase Postgres backend through [`src/lib/supabaseClient.js`](../../src/lib/supabaseClient.js) and [`src/contexts/DataContext.jsx`](../../src/contexts/DataContext.jsx); there is no other runtime API server. The public app itself has no authentication, accounts, or write path; operators edit content directly in Supabase Studio for now (`docs/wiki/09-decisions.md` `WIKI-DEC-005`). Browser `localStorage` is still used for language selection and event collapse state.

The current stack is defined by [`package.json`](../../package.json): React `^19.2.5`, React DOM `^19.2.5`, React Router DOM `^7.14.2`, Vite `^8.0.10`, Tailwind CSS `^4.2.4`, and `@tailwindcss/vite` `^4.2.4`. Root project notes still mention React Router v6 and Tailwind v3, but the package file and implementation are the canonical source.

## Runtime flow

[`src/main.jsx`](../../src/main.jsx) mounts React with `createRoot` inside `StrictMode`, imports [`src/index.css`](../../src/index.css), and renders [`src/App.jsx`](../../src/App.jsx). `App` wraps the whole app in [`LangProvider`](../../src/contexts/LangContext.jsx), then in `BrowserRouter`, then renders the shared mobile shell with [`Navbar`](../../src/components/layout/Navbar.jsx), routed page content, and [`Footer`](../../src/components/layout/Footer.jsx).

The home route imports center and config JSON at build time, renders the page heading and count, then renders [`EventBanner`](../../src/components/EventBanner.jsx), [`MeetingBanner`](../../src/components/MeetingBanner.jsx), and [`CenterList`](../../src/components/center/CenterList.jsx). Detail routes resolve `:id` against `centersData.centers`; unknown ids redirect to `/` with `Navigate`.

## Routing

Routing lives in [`src/App.jsx`](../../src/App.jsx) and uses `BrowserRouter`, `Routes`, and `Route` from React Router DOM 7.

| Path | Element | Behavior |
|---|---|---|
| `/` | `HomePage` | Shows banners, filters, and center cards. |
| `/center/:id` | `CenterDetailPage` | Finds the matching center and renders detail content. |
| `*` | `NotFoundPage` | Shows the not found copy when reached inside the SPA. |

Cloudflare Pages must serve all direct route hits through [`public/_redirects`](../../public/_redirects), which maps every path to `/index.html` with status `200`.

## Data and i18n

The app reads center and site-config rows at runtime from Supabase. [`src/contexts/DataContext.jsx`](../../src/contexts/DataContext.jsx) fetches the `centers` table and the singleton `app_config` row once on mount through the shared client in [`src/lib/supabaseClient.js`](../../src/lib/supabaseClient.js), maps Postgres `snake_case` columns back to the app's existing camelCase field names (`isAffiliated`, `naverPlaceId`, `affiliatePrices`, `snsLinks`), and exposes `{ centers, config, loading, error }` through React context to [`HomePage`](../../src/pages/HomePage.jsx), [`CenterDetailPage`](../../src/pages/CenterDetailPage.jsx), and [`Footer`](../../src/components/layout/Footer.jsx). The reference page for the row shape is `docs/wiki/07-reference/02-data-schema.md`.

The `centers` table owns center ids, names, addresses, regions, descriptions, image file names, affiliation status, Naver place segments, prices, SNS links, parking details, and optional English fields. The `app_config` table (one row) owns the departure point, official Instagram URL, event banner state, and meeting banner state. [`src/data/centers.json`](../../src/data/centers.json) and [`src/data/config.json`](../../src/data/config.json) remain in the repo as the source [`supabase/seed.sql`](../../supabase/seed.sql) was generated from; no app code imports them anymore.

[`LangContext`](../../src/contexts/LangContext.jsx) supports `ko` and `en`. It initializes from `localStorage.getItem('lang')`, then from `navigator.language`, and stores future selections back to `localStorage`. UI strings come from [`src/i18n/ko.json`](../../src/i18n/ko.json) and [`src/i18n/en.json`](../../src/i18n/en.json). Center data uses per-record fallback patterns such as `center.i18n?.name ?? center.name`, and region labels fall back through `t('regions.' + region, null, region)`.

## External integrations

Naver Map integration is URL based. [`src/utils/naverMap.js`](../../src/utils/naverMap.js) builds default direction URLs from the current location marker segment and meeting direction URLs from `config.departure.naverPlaceId` to `center.naverPlaceId`.

External links open in new browser contexts. [`NaverMapButton`](../../src/components/center/NaverMapButton.jsx), [`SnsLinks`](../../src/components/center/SnsLinks.jsx), and [`EventBanner`](../../src/components/EventBanner.jsx) call `window.open(url, '_blank', 'noopener,noreferrer')`. [`Footer`](../../src/components/layout/Footer.jsx) uses an anchor with `target="_blank"` and `rel="noopener noreferrer"` for the official Instagram URL.

The Pretendard variable font is loaded from jsDelivr in [`index.html`](../../index.html), with the family also configured in [`tailwind.config.js`](../../tailwind.config.js) and globally applied in [`src/index.css`](../../src/index.css).

## Deployment

The deployment artifact is produced by `npm run build`, which runs `vite build` and writes static files to `dist/`. Cloudflare Pages can serve that directory as a static site. Browser history routes depend on [`public/_redirects`](../../public/_redirects) being copied into the built output.

## Constraints and non-goals

This service is mobile first and centers the app in a `max-w-sm` shell. Data is maintained by editing rows in Supabase Table Editor, not by editing JSON in the repository (`docs/wiki/09-decisions.md` `WIKI-DEC-005` Phase 1). There is no admin UI, search index, in-app authentication, or analytics contract in the current implementation. Supabase Postgres is the persisted data store and Data API.

Component files use functional components. Imports use the `@/` alias for `src/`, configured in [`vite.config.js`](../../vite.config.js). Buttons that the app marks unavailable must use `disabled` and a visible unavailable label.

## Supabase backend

Status: mixed. Items 1-2 and 6 below are `Current` (implemented in this repo). Items 3-4 are `Current` as database-level infrastructure but not yet exercised by any app code (no sign-in UI exists). Item 5's Phase 1 is `Current`; Phase 2 is `Proposed`, unnumbered, no stable ID. Durable decision: `docs/wiki/09-decisions.md` `WIKI-DEC-005`, approved 2026-09-16.

Evidence for Current items: [`supabase/migrations/20260916100000_init_schema.sql`](../../supabase/migrations/20260916100000_init_schema.sql), [`supabase/seed.sql`](../../supabase/seed.sql), [`src/lib/supabaseClient.js`](../../src/lib/supabaseClient.js), [`src/contexts/DataContext.jsx`](../../src/contexts/DataContext.jsx), [`src/pages/HomePage.jsx`](../../src/pages/HomePage.jsx), [`src/pages/CenterDetailPage.jsx`](../../src/pages/CenterDetailPage.jsx), [`src/components/layout/Footer.jsx`](../../src/components/layout/Footer.jsx).

Shape:

1. **Data store** (Current, schema in progress): Supabase Postgres is the source of truth. `centers` and `app_config` (single row) tables mirror the field sets `centers.json`/`config.json` used; see `docs/wiki/07-reference/02-data-schema.md`. `docs/wiki/09-decisions.md` `WIKI-DEC-006` (2026-09-19) replaces the jsonb list/object columns on both tables with relational tables and flat columns; the jsonb shape stays `Current` until `src/contexts/DataContext.jsx` and `hy-climb-admin` are switched over.
2. **Public read path** (Current): The SPA reads through `@supabase/supabase-js` using the publishable (anon-equivalent) key at runtime. Row Level Security grants `SELECT` to the anon and authenticated roles on `centers` and `app_config`; explicit `GRANT` statements back this (the migration doesn't rely on the Supabase dashboard's "automatically expose new tables" default).
3. **Admin write path** (Current in the database, unused by app code): A `profiles` table (`id uuid references auth.users`, `role text`) identifies operators. RLS grants `INSERT`/`UPDATE`/`DELETE` on `centers` and `app_config` only to authenticated users whose `profiles.role` is an operator/admin role. No anon write grant exists, verified live: an anon `PATCH` against `centers` returns Postgres error `42501 permission denied`.
4. **Authentication** (Current in Supabase, unused by app code): Supabase Auth password-based sign-in (`supabase.auth.signInWithPassword`) issuing a JWT session/refresh token pair. Accounts are created by invite for operators and content maintainers only; there is no public self-signup and no app UI calls Supabase Auth yet. Public site visitors remain unauthenticated, matching current behavior.
5. **Admin surface**: Phase 1 (Current): operators can still edit `centers`/`app_config` rows directly in Supabase Studio. Table Editor runs as the Postgres owner and bypasses RLS, so Supabase project membership — not `profiles.role` — is the real access boundary for Phase 1; see [`supabase/README.md`](../../supabase/README.md). Phase 2 (in progress, owner-decided 2026-09-17): a separate repository, `hy-climb-admin` (Vite + React + Tailwind, same stack as this app, its own GitHub repo and its own Cloudflare Pages project/domain, not linked from this public app), gated by the same Supabase Auth sign-in and RLS. Domain obscurity is defense-in-depth, not a substitute for auth/RLS. That repo is out of scope for this wiki; only the shared Supabase schema it depends on (this section, and Storage below) is canonical here.
6. **Migration path** (Current): [`supabase/seed.sql`](../../supabase/seed.sql), generated from the JSON files, seeded the 11 existing centers and the `app_config` row. It drops the `naverMapUrl` field, which isn't in the documented contract and unused by [`src/utils/naverMap.js`](../../src/utils/naverMap.js). `HomePage`, `CenterDetailPage`, and `Footer` moved from static JSON imports to the `DataContext` Supabase data-access layer.
7. **Image storage** (Current, schema only): [`supabase/migrations/20260917100000_center_images_storage.sql`](../../supabase/migrations/20260917100000_center_images_storage.sql) adds a public `center-images` Storage bucket for images the admin app uploads, with the same operator-only write policy pattern. `centers.images` entries can now be either a bare filename (legacy, resolved against `public/images/centers/` in this repo) or an absolute `https://` Storage URL (new, uploaded via the admin app). [`src/utils/centerImageUrl.js`](../../src/utils/centerImageUrl.js) resolves both forms; `CenterCard`, `CenterDetail`, and `ImageCarousel` all use it instead of hardcoding the `/images/centers/` prefix.

Affected existing concepts/IDs: `STK-003`, `GOAL-005`, `REQ-003`, `REQ-006`, `REQ-011`, `REQ-014`, `REQ-016` through `REQ-020`, `UC-014`, `UC-015`, features `FEAT-001` through `FEAT-010` (data source changed, behavior did not), and the Proposed CMS capability in `docs/wiki/04-features.md` (superseded non-goal items noted there).

Remaining non-goal: No public visitor accounts, payments, reservations, analytics, real-time subscriptions, offline sync, or a specific Phase 2 admin UI framework exist or are scheduled by this entry. `FEAT-001` through `FEAT-010` acceptance criteria are unchanged; only their code paths changed (`docs/wiki/04-features.md`).

Remaining owner-decision requirement: The Project owner must separately approve the Phase 2 admin app's domain, framework, and timeline before that work starts; today's approval covers only the shape recorded here. No stable ID is created by this section; a Phase 2 admin surface would need its own `FEAT-0xx` scoping when approved.

## Known discrepancies

The root summary in [`CLAUDE.md`](../../CLAUDE.md) says React Router v6 and Tailwind CSS v3. The live package versions are React Router DOM 7.14.2 and Tailwind CSS 4.2.4.

The root notes say `NaverMapButton` should validate `naverPlaceId` with `isValidPlaceId()` and check for `PLACE_POI`. The live component imports `isValidUrl()` instead, generates a URL first, and enables any generated `https://` URL. The discrepancy is recorded here without changing behavior.

The legacy event spec describes nested `event.i18n` fields. The live config and component use flat `titleEn`, `descriptionEn`, and `linkLabelEn` fields.

The legacy meeting spec says a meeting with an unknown `centerId` does not render. The live component renders a regular meeting banner with the localized unknown venue copy when no center is found.
