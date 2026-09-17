# Component Specification

## Purpose

This page defines the public contracts of the React components that make up the Hy-Climb SPA. It migrates the root component notes into a stable reference shape and corrects them against the live files under [`src/`](../../../src).

## Contract

`App` in [`src/App.jsx`](../../../src/App.jsx) has no props. It must wrap the app with `LangProvider`, then `BrowserRouter`, then the mobile shell containing `Navbar`, routed `main`, and `Footer`. Its route table is `/`, `/center/:id`, and `*`.

`LangProvider` in [`src/contexts/LangContext.jsx`](../../../src/contexts/LangContext.jsx) provides `{ lang, setLang, t }`. `lang` is `ko` or `en`. `setLang(next)` stores the language in `localStorage` under `lang`. `t(key, vars, fallback)` resolves dot notation keys, replaces `{{name}}` style tokens, and returns `fallback` or the key when a string is missing.

`Navbar` and `Footer` in [`src/components/layout`](../../../src/components/layout) take no props. `Navbar` links to `/` and includes `LangToggle`. `LangToggle` toggles `ko` and `en` and displays `KO` in Korean mode and `EN` in English mode. `Footer` reads `config.instagram`, renders the official Instagram link when present, and displays localized footer copy.

`HomePage` in [`src/pages/HomePage.jsx`](../../../src/pages/HomePage.jsx) imports centers and config JSON. It renders the localized heading, total center count, `EventBanner`, `MeetingBanner`, and `CenterList`.

`CenterDetailPage` in [`src/pages/CenterDetailPage.jsx`](../../../src/pages/CenterDetailPage.jsx) reads `id` with `useParams()`, finds `centersData.centers.find((c) => c.id === id)`, redirects to `/` if missing, and otherwise renders `CenterDetail` with `configData.departure`.

`CenterList` in [`src/components/center/CenterList.jsx`](../../../src/components/center/CenterList.jsx) accepts `centers` and `departure`. It owns `selectedRegion`, initially `null`, and `affiliatedOnly`, initially `false`. It filters with `!selectedRegion || c.region === selectedRegion` and `!affiliatedOnly || c.isAffiliated`.

`CenterFilter` in [`src/components/center/CenterFilter.jsx`](../../../src/components/center/CenterFilter.jsx) accepts `centers`, `selected`, `onChange`, `affiliatedOnly`, and `onAffiliatedChange`. It derives unique regions from the center array, renders the affiliated chip, a divider, the all chip, then one chip per region. Region labels use `t('regions.' + region, null, region)`.

`CenterCard` in [`src/components/center/CenterCard.jsx`](../../../src/components/center/CenterCard.jsx) accepts `center` and `departure`. It displays `center.images[0]`, localized name and address, an `AffiliateBadge` when affiliated, and default plus meeting `NaverMapButton` buttons. Card clicks navigate to `/center/{center.id}`. Button group clicks stop propagation.

`CenterDetail` in [`src/components/center/CenterDetail.jsx`](../../../src/components/center/CenterDetail.jsx) accepts `center` and `departure`. It owns `currentImage`, passes it to `ImageCarousel`, renders localized center copy, optional phone, optional thumbnails, optional `SnsLinks`, optional `ParkingInfo`, optional affiliate prices, optional regular prices, then direction buttons.

`ImageCarousel` in [`src/components/center/ImageCarousel.jsx`](../../../src/components/center/ImageCarousel.jsx) accepts `images`, `centerName`, `current`, and `onChange`. It is controlled by the parent. It renders swipe handling, previous and next buttons, and indicator dots only when more than one image exists. Image load failures use `/images/placeholder.svg`.

`NaverMapButton` in [`src/components/center/NaverMapButton.jsx`](../../../src/components/center/NaverMapButton.jsx) accepts `center`, `type`, optional `departure`, optional `className`, and optional `compact`. `type` is `default` or `meeting`. Default buttons use `getDefaultMapUrl(center)`. Meeting buttons use `getMeetingMapUrl(center, departure)` only when `departure` exists. Disabled state is based on `isValidUrl(url)`, not `isValidPlaceId()`.

`SnsLinks` in [`src/components/center/SnsLinks.jsx`](../../../src/components/center/SnsLinks.jsx) accepts `snsLinks`. Empty or missing input returns `null`. Supported types are `instagram`, `blog`, `youtube`, and `website`. Buttons open the URL with `window.open(url, '_blank', 'noopener,noreferrer')`.

`ParkingInfo` in [`src/components/center/ParkingInfo.jsx`](../../../src/components/center/ParkingInfo.jsx) accepts `parking` and optional `i18nParking`. Missing parking returns `null`. `parking.type === 'none'` selects the disabled parking icon. `self` and `nearby` select the available parking icon. The label uses `detail.parkingTypes.{type}` and the description uses English parking text only when available in English mode.

`EventBanner` in [`src/components/EventBanner.jsx`](../../../src/components/EventBanner.jsx) accepts optional `event`. Missing, inactive, or expired events render `null`. Expiry uses `endDate + 'T23:59:59'`. Collapse state is stored under `collapsedEventTitle`. English event fields are flat `titleEn`, `descriptionEn`, and `linkLabelEn`.

`MeetingBanner` in [`src/components/MeetingBanner.jsx`](../../../src/components/MeetingBanner.jsx) accepts optional `meeting` and required `centers`. Missing or inactive meeting returns `null`. A matching `meeting.centerId` makes the banner clickable and navigates to that center. Missing center data displays the localized unknown venue copy and does not navigate.

## Invariants

The mobile app shell stays `max-w-sm mx-auto bg-white min-h-screen flex flex-col` inside a `zinc-50` page background. `Navbar` remains sticky at the top and `Footer` remains after the routed content.

Center ids are URL ids. Unknown detail ids must redirect to `/`. The all filter is represented by `selectedRegion === null`, not by a translated string. Missing English center fields must fall back to Korean fields. Missing region translations must fall back to the region string.

External programmatic opens use `window.open(url, '_blank', 'noopener,noreferrer')`. Disabled map buttons must have a `disabled` attribute and show the localized unavailable label. Image failures must fall back to `/images/placeholder.svg`.

## Validation

Check route behavior by loading `/`, `/center/{valid id}`, and `/center/{invalid id}`. The invalid route must land on `/`. Check language switching by toggling `LangToggle`, reloading, and confirming `localStorage.lang` preserves the choice.

Check center filtering with all, one region, affiliated only, and the combined region plus affiliated state. Check a center with multiple images for carousel buttons, touch movement, indicator clicks, thumbnail clicks, and placeholder image fallback.

For malformed data, verify the documented behavior instead of assuming schema enforcement. Missing `departure` disables meeting buttons because no URL is generated. Missing or malformed `naverPlaceId` may still produce an `https://` URL and remain enabled because `NaverMapButton` validates URL shape only. This is a known discrepancy, not a component fix.

## Code references

[`src/App.jsx`](../../../src/App.jsx) defines providers, shell, and routes.

[`src/pages/HomePage.jsx`](../../../src/pages/HomePage.jsx), [`src/pages/CenterDetailPage.jsx`](../../../src/pages/CenterDetailPage.jsx), and [`src/pages/NotFoundPage.jsx`](../../../src/pages/NotFoundPage.jsx) define page-level behavior.

[`src/contexts/LangContext.jsx`](../../../src/contexts/LangContext.jsx) defines language state and translation lookup.

[`src/components/layout`](../../../src/components/layout) contains shared layout components.

[`src/components/center`](../../../src/components/center) contains center listing, detail, map, image, parking, SNS, and badge components.

[`src/components/EventBanner.jsx`](../../../src/components/EventBanner.jsx) and [`src/components/MeetingBanner.jsx`](../../../src/components/MeetingBanner.jsx) define home page announcement components.
