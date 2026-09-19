# Data Schema

## Purpose

This page defines the canonical data contracts for Hy-Climb. The live source is a Supabase Postgres database, per [`supabase/migrations/`](../../../supabase/migrations/) (`docs/wiki/09-decisions.md` `WIKI-DEC-005`, `WIKI-DEC-006`, `docs/wiki/05-architecture.md` Supabase backend). [`src/i18n/ko.json`](../../../src/i18n/ko.json) and [`src/i18n/en.json`](../../../src/i18n/en.json) remain live UI-copy sources. [`src/data/centers.json`](../../../src/data/centers.json) and [`src/data/config.json`](../../../src/data/config.json) are no longer imported by app code; they exist only as the source [`supabase/seed.sql`](../../../supabase/seed.sql) was generated from.

Two shapes now matter, and this page describes both:

* **Contract, below**: the in-app JS object shape [`src/contexts/DataContext.jsx`](../../../src/contexts/DataContext.jsx) hands to `HomePage`, `CenterDetailPage`, `CenterCard`, `EventBanner`, `MeetingBanner`, etc. Unchanged since `WIKI-DEC-005`; this is what component code reads.
* **Supabase table contracts, further down**: the physical Postgres storage shape `DataContext.jsx` reads and reshapes into the Contract above. Changed by `WIKI-DEC-006` from single jsonb columns to normalized tables/flat columns.

## Contract

Field-level shape of the JS object each center resolves to, after `DataContext.jsx` maps Postgres columns/rows (for example `is_affiliated` → `isAffiliated`, `center_prices` rows → the `prices`/`affiliatePrices` arrays, `center_sns_links` rows → `snsLinks`).

| Field | Type | Required | Contract |
|---|---|---|---|
| `id` | string | Yes | Unique URL identifier such as `center_01`. |
| `name` | string | Yes | Korean center name. |
| `address` | string | Yes | Korean address. |
| `region` | string | Yes | Region label used to build filter chips. |
| `description` | string | Yes | Korean description. |
| `images` | string array | Yes | Either a bare file name under [`public/images/centers`](../../../public/images/centers) (legacy), or an absolute `https://` Supabase Storage URL from the `center-images` bucket (new, uploaded via the admin app). |
| `isAffiliated` | boolean | Yes | Controls affiliate badge and affiliate filter membership. |
| `naverPlaceId` | string | Yes | Naver direction segment used by map URL builders. |
| `phone` | string | No | Detail page phone text. |
| `prices` | `PriceItem[]` | No | Regular prices. |
| `affiliatePrices` | `PriceItem[]` | No | Club member prices, displayed above regular prices. |
| `snsLinks` | `SnsLink[]` | No | Center social links. |
| `parking` | `Parking` | No | Parking label and description. |
| `i18n` | `CenterI18n` | No | English center fields. |

`PriceItem` has required `name` and `price`, plus optional `nameEn`. `price` is a number in Korean won and is displayed by `formatPrice(price)` as `price.toLocaleString('ko-KR') + '원'`.

`SnsLink` has `type` and `url`. Supported types are `instagram`, `blog`, `youtube`, and `website`.

`Parking` has `type` and optional `description`. `type` is `self`, `nearby`, or `none`.

`CenterI18n` may include `name`, `address`, `description`, and `parking.description`. English UI falls back to the Korean field when an English value is missing.

The `app_config` table (one row, `id = true`) owns site-wide runtime configuration, mapped by `DataContext.jsx` into the same shape below.

| Field | Type | Required | Contract |
|---|---|---|---|
| `departure` | object | Yes | Fixed start point for meeting directions. |
| `instagram` | string | Yes | Official club Instagram URL shown in the footer. |
| `event` | object | No | Event banner state. Missing or inactive means hidden. |
| `meeting` | object | No | Regular meeting banner state. Missing or inactive means hidden. |

`departure` contains required `name`, required `nameEn`, and required `naverPlaceId`.

`event` uses `active`, `title`, optional `titleEn`, optional `description`, optional `descriptionEn`, optional `date`, optional `endDate`, optional `linkUrl`, optional `linkLabel`, and optional `linkLabelEn`. The live app does not use nested `event.i18n`.

`meeting` uses required `active`, optional `centerId`, required `date` in `YYYY-MM-DD` shape, and required `time` in `HH:mm` shape.

The i18n files contain nested UI copy. `ko.json` and `en.json` must include the keys consumed by `nav`, `home`, `detail`, `footer`, `event`, `meeting`, and `regions`. Translation lookup supports `{{varName}}` replacement.

## Invariants

Center records must keep `images` non-empty because cards read `images[0]` directly. Each entry is resolved by [`src/utils/centerImageUrl.js`](../../../src/utils/centerImageUrl.js): an `http`-prefixed value is used as-is (Supabase Storage), anything else is treated as a file name relative to `/images/centers/` (legacy bundled images). Missing image files are tolerated at render time through `/images/placeholder.svg`.

Center ids must stay unique, stable, and URL-safe. `meeting.centerId` must refer to a center id when a clickable meeting banner is desired. If no matching center is found, the live banner shows the localized unknown venue copy.

Naver place segments are copied from Naver Map direction URLs. The intended shape includes `PLACE_POI`. Current utility support includes `isValidPlaceId(id)`, but the live button component does not call it.

English display fields are additive. Korean source fields remain required and are the fallback for every translated center data field.

## Validation

Column types and the `images` non-empty invariant (`check (cardinality(images) >= 1)`) are enforced by Postgres constraints in the migration. There is no build-time or app-level schema validation of Supabase rows; a row that violates a `check` constraint is rejected by the database at write time, not caught by `npm run build`.

Data edge cases to test manually are missing optional `phone`, `prices`, `affiliatePrices`, `snsLinks`, `parking`, English center fields, event fields, and meeting center matches. The expected behavior is conditional rendering or Korean fallback, not crashes.

Malformed `naverPlaceId` needs special handling in documentation: `isValidPlaceId()` checks for a string containing `PLACE_POI`, but `NaverMapButton` currently only validates that the generated URL starts with `https://`. Missing or bad place ids can still make enabled buttons. Record this discrepancy when reviewing data quality.

Check event expiry with an `endDate` earlier than the current date and with no `endDate`. The live code hides events only when inactive or when `new Date()` is after `endDate + 'T23:59:59'`.

## Supabase table contracts

Status: `Current` for `hy-climb` (this repo). Implemented by [`supabase/migrations/20260916100000_init_schema.sql`](../../../supabase/migrations/20260916100000_init_schema.sql), [`20260919100000_normalize_schema.sql`](../../../supabase/migrations/20260919100000_normalize_schema.sql), and [`20260919100100_normalize_data_backfill.sql`](../../../supabase/migrations/20260919100100_normalize_data_backfill.sql). Linked to `docs/wiki/05-architecture.md` Supabase backend and `docs/wiki/09-decisions.md` `WIKI-DEC-005`, `WIKI-DEC-006`.

Evidence: [`src/contexts/DataContext.jsx`](../../../src/contexts/DataContext.jsx) queries every table below and reshapes the result into the Contract section above. Verified live 2026-09-19: row counts across the normalized tables match the original jsonb data exactly (52 `center_prices`, 6 `center_sns_links`, 11 `center_translations`, 1 `events`, 1 `meetings`), and the public site renders correctly from them (home list, center detail, EN translations, departure name).

| Table | Column | Source field (old jsonb shape) | Notes |
|---|---|---|---|
| `centers` | `id` (text, PK), `name`, `address`, `region`, `description` | same | Unchanged since `WIKI-DEC-005`. |
| `centers` | `images` (text[]) | `images` | Unchanged; still a Postgres array, not normalized into a table — `hy-climb-admin`'s image list UI already treats it as a list and only sends the array at save time. |
| `centers` | `is_affiliated`, `naver_place_id`, `phone` | `isAffiliated`, `naverPlaceId`, `phone` | Unchanged. |
| `centers` | `parking_type`, `parking_description` | `parking.type`, `parking.description` | New flat columns (`WIKI-DEC-006`); `parking` is 1:1 per center, not a list, so it's columns, not a table. |
| `center_prices` | `center_id` (FK), `is_affiliate` (bool), `name`, `name_en`, `price`, `sort_order` | `prices[]` (`is_affiliate=false`) / `affiliate_prices[]` (`is_affiliate=true`) | One table for both lists, distinguished by `is_affiliate`. |
| `center_sns_links` | `center_id` (FK), `type`, `url`, `sort_order` | `sns_links[]` | `type` constrained to `instagram`/`blog`/`youtube`/`website`. |
| `center_translations` | `center_id` (FK), `locale`, `name`, `address`, `description`, `parking_description` | `i18n` | Keyed by `locale` (`'en'` today) instead of a single English-only object. |
| `app_config` | `id` (singleton PK), `instagram`, `departure_name`, `departure_name_en`, `departure_naver_place_id` | `instagram`, `departure.*` | `departure` flattened to columns; 1:1, not a list. |
| `events` | `id`, `active`, `title`, `title_en`, `description`, `description_en`, `event_date`, `end_date`, `link_url`, `link_label`, `link_label_en` | `app_config.event` | Multiple rows allowed (event history); a partial unique index (`where active`) allows at most one `active = true` row. |
| `meetings` | `id`, `active`, `center_id` (FK), `meeting_date`, `meeting_time` | `app_config.meeting` | Same history + one-active pattern as `events`. |
| `profiles` | `id` (uuid, references `auth.users`), `role` (text) | new | Operator/admin identity for RLS; not exposed to public reads. |

The old jsonb columns (`centers.prices`, `affiliate_prices`, `sns_links`, `parking`, `i18n`; `app_config.departure`, `event`, `meeting`) still exist in the database — `hy-climb-admin` reads and writes them until its own cutover to the tables above, tracked separately (not in this wiki, per `WIKI-DEC-005`'s scope note). They will be dropped in a later migration once that cutover is verified; see `supabase/README.md`.

Row Level Security: every table above allows `SELECT` for `anon` and `authenticated` roles. `INSERT`/`UPDATE`/`DELETE` require `auth.uid()` to match a `profiles` row with an operator/admin role, checked through the `SECURITY DEFINER` functions `is_operator()`/`is_admin()` (avoids the self-referencing-policy recursion a direct subquery on `profiles` would hit). `profiles` itself is not publicly readable. Verified live: an anon `PATCH` on `centers` returns `42501 permission denied`.

Affected existing concepts/IDs: Same list as `docs/wiki/05-architecture.md` Supabase backend section.

Non-goal: This does not select a migration tool, ORM, or Phase 2 admin UI framework. It does not change `FEAT-001` through `FEAT-010` acceptance criteria.

Owner-decision requirement: See `docs/wiki/09-decisions.md` `WIKI-DEC-005` (approved and implemented, 2026-09-16/17) and `WIKI-DEC-006` (approved 2026-09-19, `hy-climb` side implemented and verified 2026-09-19; `hy-climb-admin` side pending).

## Code references

[`supabase/migrations/20260916100000_init_schema.sql`](../../../supabase/migrations/20260916100000_init_schema.sql) is the original schema/RLS/GRANT source. [`supabase/migrations/20260917100000_center_images_storage.sql`](../../../supabase/migrations/20260917100000_center_images_storage.sql) adds the `center-images` Storage bucket and its RLS policies. [`supabase/migrations/20260919100000_normalize_schema.sql`](../../../supabase/migrations/20260919100000_normalize_schema.sql) and [`20260919100100_normalize_data_backfill.sql`](../../../supabase/migrations/20260919100100_normalize_data_backfill.sql) add the normalized tables/columns and backfill them from the old jsonb columns.

[`src/utils/centerImageUrl.js`](../../../src/utils/centerImageUrl.js) resolves an `images` entry to either an absolute Storage URL or a `/images/centers/`-relative path.

[`src/lib/supabaseClient.js`](../../../src/lib/supabaseClient.js) creates the Supabase client from `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY`.

[`src/contexts/DataContext.jsx`](../../../src/contexts/DataContext.jsx) is the live center/config data source; it queries Supabase and maps rows to the field names in the Contract section above.

[`src/data/centers.json`](../../../src/data/centers.json) and [`src/data/config.json`](../../../src/data/config.json) are the source [`supabase/seed.sql`](../../../supabase/seed.sql) was generated from; no app code imports them.

[`src/i18n/ko.json`](../../../src/i18n/ko.json) and [`src/i18n/en.json`](../../../src/i18n/en.json) contain UI strings.

[`src/contexts/LangContext.jsx`](../../../src/contexts/LangContext.jsx) defines language detection, storage, key lookup, fallback, and variable replacement.

[`src/utils/naverMap.js`](../../../src/utils/naverMap.js) defines Naver URL builders, place id validation, URL validation, and price formatting.

[`src/components/center`](../../../src/components/center) consumes center fields, prices, SNS links, parking, and place ids.

[`src/components/EventBanner.jsx`](../../../src/components/EventBanner.jsx) and [`src/components/MeetingBanner.jsx`](../../../src/components/MeetingBanner.jsx) consume `config.event` and `config.meeting` from `DataContext`.
