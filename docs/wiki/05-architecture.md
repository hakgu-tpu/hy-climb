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

The `centers` table (plus `center_prices`, `center_sns_links`, `center_translations`) owns center ids, names, addresses, regions, descriptions, image file names, affiliation status, Naver place segments, prices, SNS links, parking details, and optional English fields; see `docs/wiki/07-reference/02-data-schema.md` for the exact table split. `app_config`, `events`, and `meetings` own the departure point, official Instagram URL, event banner state, and meeting banner state. [`src/data/centers.json`](../../src/data/centers.json) and [`src/data/config.json`](../../src/data/config.json) remain in the repo as a historical snapshot of the original data (no app code imports them, and the seed script generated from them was removed once the live data no longer matched their shape).

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

Status: `Current`, all items. Durable decisions: `docs/wiki/09-decisions.md` `WIKI-DEC-005` (approved 2026-09-16) and `WIKI-DEC-006` (approved and fully implemented 2026-09-19).

Evidence: [`supabase/migrations/`](../../supabase/migrations/) (five files, all run against the live project as of 2026-09-19; see `supabase/README.md`), [`src/lib/supabaseClient.js`](../../src/lib/supabaseClient.js), [`src/contexts/DataContext.jsx`](../../src/contexts/DataContext.jsx), [`src/pages/HomePage.jsx`](../../src/pages/HomePage.jsx), [`src/pages/CenterDetailPage.jsx`](../../src/pages/CenterDetailPage.jsx), [`src/components/layout/Footer.jsx`](../../src/components/layout/Footer.jsx).

Shape:

1. **Data store**: Supabase Postgres is the source of truth: `centers`, `center_prices`, `center_sns_links`, `center_translations`, `app_config`, `events`, `meetings`, `profiles`. See `docs/wiki/07-reference/02-data-schema.md` for the full table contract. The original jsonb-column shape (`centers.prices`/`affiliate_prices`/`sns_links`/`parking`/`i18n`, `app_config.departure`/`event`/`meeting`) existed briefly (`WIKI-DEC-005`, 2026-09-16 through 2026-09-19) and was dropped once both apps below were switched over and verified.
2. **Public read path**: The SPA reads through `@supabase/supabase-js` using the publishable (anon-equivalent) key at runtime. Row Level Security grants `SELECT` to the anon and authenticated roles on every table; explicit `GRANT` statements back this (the migrations don't rely on the Supabase dashboard's "automatically expose new tables" default).
3. **Admin write path**: A `profiles` table (`id uuid references auth.users`, `role text`) identifies operators. RLS grants `INSERT`/`UPDATE`/`DELETE` only to authenticated users whose `profiles.role` is an operator/admin role, checked through `is_operator()`/`is_admin()`. No anon write grant exists, verified live: an anon `PATCH` against `centers` returns Postgres error `42501 permission denied`.
4. **Authentication**: Supabase Auth password-based sign-in (`supabase.auth.signInWithPassword`) issuing a JWT session/refresh token pair, used by `hy-climb-admin`'s login page. Accounts are created for operators and content maintainers only, no public self-signup. Public site visitors remain unauthenticated; this app (`hy-climb`) never calls Supabase Auth.
5. **Admin surface**: A separate repository, [`hy-climb-admin`](https://github.com/hakgu-tpu/hy-climb-admin) (Vite + React + Tailwind, same stack as this app, its own GitHub repo and Cloudflare Pages project/domain, not linked from this public app), gated by Supabase Auth sign-in and RLS. It manages `centers` (including prices, SNS links, parking, English translation, images via the `center-images` Storage bucket), `events`, `meetings`, and `app_config` (Instagram, departure). Operator account/role management stays a Supabase Studio task, out of scope for that app. Domain obscurity is defense-in-depth, not a substitute for auth/RLS. That repo's internal code is out of scope for this wiki; only the shared Supabase schema it depends on is canonical here.
6. **Image storage**: [`supabase/migrations/20260917100000_center_images_storage.sql`](../../supabase/migrations/20260917100000_center_images_storage.sql) adds a public `center-images` Storage bucket, same operator-only write policy pattern. `centers.images` entries are either a bare filename (legacy, resolved against `public/images/centers/` in this repo) or an absolute `https://` Storage URL (uploaded via `hy-climb-admin`). [`src/utils/centerImageUrl.js`](../../src/utils/centerImageUrl.js) resolves both forms; `CenterCard`, `CenterDetail`, and `ImageCarousel` all use it instead of hardcoding the `/images/centers/` prefix.
7. **Events and meetings keep history**: Unlike the original singleton `app_config.event`/`meeting` fields, `events` and `meetings` allow multiple rows; a partial unique index (`where active`) allows at most one active row per table at a time. `hy-climb-admin` enforces this by deactivating any other active row before activating a new one.

Non-goal: No public visitor accounts, payments, reservations, analytics, real-time subscriptions, or offline sync exist or are scheduled by this shape. `FEAT-001` through `FEAT-010` acceptance criteria in `docs/wiki/04-features.md` are unchanged; only their code paths changed.

## Known discrepancies

The root summary in [`CLAUDE.md`](../../CLAUDE.md) says React Router v6 and Tailwind CSS v3. The live package versions are React Router DOM 7.14.2 and Tailwind CSS 4.2.4.

The root notes say `NaverMapButton` should validate `naverPlaceId` with `isValidPlaceId()` and check for `PLACE_POI`. The live component imports `isValidUrl()` instead, generates a URL first, and enables any generated `https://` URL. The discrepancy is recorded here without changing behavior.

The legacy event spec describes nested `event.i18n` fields. The live config and component use flat `titleEn`, `descriptionEn`, and `linkLabelEn` fields.

The legacy meeting spec says a meeting with an unknown `centerId` does not render. The live component renders a regular meeting banner with the localized unknown venue copy when no center is found.
