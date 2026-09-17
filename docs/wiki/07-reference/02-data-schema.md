# Data Schema

## Purpose

This page defines the canonical data contracts for Hy-Climb. The live source is a Supabase Postgres database: the `centers` table and the single-row `app_config` table, per [`supabase/migrations/20260916100000_init_schema.sql`](../../../supabase/migrations/20260916100000_init_schema.sql) (`docs/wiki/09-decisions.md` `WIKI-DEC-005`, `docs/wiki/05-architecture.md` Supabase backend). [`src/i18n/ko.json`](../../../src/i18n/ko.json) and [`src/i18n/en.json`](../../../src/i18n/en.json) remain live UI-copy sources. [`src/data/centers.json`](../../../src/data/centers.json) and [`src/data/config.json`](../../../src/data/config.json) are no longer imported by app code; they exist only as the source [`supabase/seed.sql`](../../../supabase/seed.sql) was generated from. The field-level contract below is unchanged from that JSON shape, only the storage moved. Center records are not copied here, so this page stays stable while data changes.

## Contract

The `centers` table holds one row per center, read through [`src/contexts/DataContext.jsx`](../../../src/contexts/DataContext.jsx), which maps these Postgres columns back to the camelCase field names below (for example `is_affiliated` → `isAffiliated`, `naver_place_id` → `naverPlaceId`, `affiliate_prices` → `affiliatePrices`, `sns_links` → `snsLinks`).

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

Status: `Current`. Implemented by [`supabase/migrations/20260916100000_init_schema.sql`](../../../supabase/migrations/20260916100000_init_schema.sql), linked to `docs/wiki/05-architecture.md` Supabase backend and `docs/wiki/09-decisions.md` `WIKI-DEC-005`.

Evidence: This maps the Contract section above onto the live Postgres tables; no field was renamed or dropped when storage moved from JSON to Supabase.

| Table | Column | Source field | Notes |
|---|---|---|---|
| `centers` | `id` (text, PK) | `id` | Same URL-safe id contract. |
| `centers` | `name`, `address`, `region`, `description` | same names | Required Korean text, unchanged. |
| `centers` | `images` (text[]) | `images` | Same non-empty invariant, enforced by a `check (cardinality(images) >= 1)` constraint. |
| `centers` | `is_affiliated` (bool) | `isAffiliated` | Same badge/filter behavior. |
| `centers` | `naver_place_id` (text) | `naverPlaceId` | Same map URL contract, same known `isValidPlaceId()` discrepancy. |
| `centers` | `phone`, `prices`, `affiliate_prices`, `sns_links`, `parking`, `i18n` (jsonb where structured) | same names | Nullable, same optional contract as today. |
| `app_config` | `departure`, `instagram`, `event`, `meeting` (jsonb) | same names | One row, `id boolean primary key default true check (id)` singleton pattern. |
| `profiles` | `id` (uuid, references `auth.users`), `role` (text) | new | Operator/admin identity for RLS; not exposed to public reads. |

Row Level Security: `centers` and `app_config` allow `SELECT` for `anon` and `authenticated` roles. `INSERT`/`UPDATE`/`DELETE` on `centers` and `app_config` require `auth.uid()` to match a `profiles` row with an operator/admin role, checked through the `SECURITY DEFINER` functions `is_operator()`/`is_admin()` (avoids the self-referencing-policy recursion a direct subquery on `profiles` would hit). `profiles` itself is not publicly readable. Verified live: an anon `PATCH` on `centers` returns `42501 permission denied`.

Affected existing concepts/IDs: Same list as `docs/wiki/05-architecture.md` Supabase backend section.

Non-goal: This does not select a migration tool, ORM, or Phase 2 admin UI framework. It does not add schema fields beyond mirroring the original JSON contract.

Owner-decision requirement: See `docs/wiki/09-decisions.md` `WIKI-DEC-005`. Approved and implemented, 2026-09-16/17.

## Code references

[`supabase/migrations/20260916100000_init_schema.sql`](../../../supabase/migrations/20260916100000_init_schema.sql) is the live schema/RLS/GRANT source. [`supabase/migrations/20260917100000_center_images_storage.sql`](../../../supabase/migrations/20260917100000_center_images_storage.sql) adds the `center-images` Storage bucket and its RLS policies.

[`src/utils/centerImageUrl.js`](../../../src/utils/centerImageUrl.js) resolves an `images` entry to either an absolute Storage URL or a `/images/centers/`-relative path.

[`src/lib/supabaseClient.js`](../../../src/lib/supabaseClient.js) creates the Supabase client from `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY`.

[`src/contexts/DataContext.jsx`](../../../src/contexts/DataContext.jsx) is the live center/config data source; it queries Supabase and maps rows to the field names in the Contract section above.

[`src/data/centers.json`](../../../src/data/centers.json) and [`src/data/config.json`](../../../src/data/config.json) are the source [`supabase/seed.sql`](../../../supabase/seed.sql) was generated from; no app code imports them.

[`src/i18n/ko.json`](../../../src/i18n/ko.json) and [`src/i18n/en.json`](../../../src/i18n/en.json) contain UI strings.

[`src/contexts/LangContext.jsx`](../../../src/contexts/LangContext.jsx) defines language detection, storage, key lookup, fallback, and variable replacement.

[`src/utils/naverMap.js`](../../../src/utils/naverMap.js) defines Naver URL builders, place id validation, URL validation, and price formatting.

[`src/components/center`](../../../src/components/center) consumes center fields, prices, SNS links, parking, and place ids.

[`src/components/EventBanner.jsx`](../../../src/components/EventBanner.jsx) and [`src/components/MeetingBanner.jsx`](../../../src/components/MeetingBanner.jsx) consume `config.event` and `config.meeting` from `DataContext`.
