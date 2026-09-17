# TDD and QA Contract

This page is the specification-level test contract for Hy-Climb. It defines what future tests must prove before behavior is called done. It does not add a runner, a dependency, or a new command.

## Current Test Baseline

`docs/wiki/06-tdd-qa.md` was absent before this task. That absence is the failing documentation baseline for Plan Task 4.

`package.json` has these scripts only: `dev`, `build`, `lint`, and `preview`. There is no `test` script. `package.json` and `package-lock.json` list React, Vite, Tailwind, ESLint, and React Router packages, but no Vitest, Jest, Testing Library, Playwright, Cypress, or other test runner dependency.

Installing or configuring a test runner is out of scope for this plan task. The cases below are planned contracts, not runnable tests today.

## TDD Cycle

The Red-Green-Refactor contract is mandatory for future implementation work.

1. Red: write the smallest failing spec for one behavior. The failure must identify the missing or wrong contract, not a vague render failure.
2. Green: make the smallest source change needed to pass that spec.
3. Refactor: improve names, remove duplication, or move fixtures only while the spec stays green.
4. Repeat: add one normal case and one edge case for the same layer before moving up the pyramid.

## Test Pyramid

1. JSON contract tests, highest count. These guard `src/data/centers.json`, `src/data/config.json`, and `src/i18n/*.json` shape before UI code reads them.
2. Utility tests, high count. These guard deterministic helpers such as Naver Map URL creation, place-id validation, price formatting, and event date formatting.
3. Component tests, medium count. These guard filter state, translated labels, disabled buttons, banners, cards, and detail sections.
4. Routing integration tests, low count. These guard `BrowserRouter`, route params, invalid center redirect, and static SPA redirects.
5. Later E2E tests, smallest count. These verify the deployed or previewed mobile path, real navigation, new-tab map behavior, and Cloudflare direct-route fallback.

Every layer must include at least one normal case and one failure or edge case before the layer can be marked covered.

## Naming, Fixtures, and Mock Rules

Spec names should read as behavior sentences: `REQ-008 UC-003 builds a current-location directions URL from center naverPlaceId`. Keep the canonical REQ and UC in the test name so failures map back to product behavior.

Fixtures must be small and local to the layer. JSON contract tests may import real JSON. Utility tests should use one minimal center fixture and one minimal departure fixture. Component tests should use two or three center fixtures at most, including one affiliated center and one non-affiliated center. Routing and E2E tests should prefer real bundled data unless the test exists to prove malformed input behavior.

Mocks must be explicit and reset per case. Mock `window.open`, `localStorage`, `navigator.language`, and router navigation only at the layer that needs them. Don't mock `formatEventDate`, `getDefaultMapUrl`, or `getMeetingMapUrl` inside component tests unless the case is about wiring rather than behavior.

## Acceptance Format

Each test case must record these fields:

1. Link: the REQ and UC labels.
2. Precondition: fixture, route, localStorage, language, and time setup.
3. Action: one user action or one function call.
4. Expected result: the behavior that must pass.
5. Failure or edge result: the protected bad path.
6. Layer: JSON contract, utility, component, routing integration, or later E2E.
7. Planned tool: the future runner or helper expected to execute the case.

## Prioritized Planned Cases

### P0 JSON Contract Cases

Case JSON-01, centers schema minimum. Link: REQ-001, REQ-002, REQ-006, REQ-007, REQ-008, REQ-009, UC-001, UC-002, UC-003, UC-012. Precondition: import `src/data/centers.json`. Action: validate every center has `id`, `name`, `address`, `region`, `description`, non-empty `images`, boolean `isAffiliated`, and string `naverPlaceId`. Expected result: all bundled centers satisfy the minimum shape and ids are unique. Failure or edge result: missing `images[0]`, duplicated id, or non-string `naverPlaceId` fails before rendering. Layer: JSON contract. Planned tool: future Vitest JSON schema helper.

Case JSON-02, config schema minimum. Link: REQ-009, REQ-016, REQ-017, REQ-018, REQ-019, REQ-020, UC-012, UC-014, UC-015. Precondition: import `src/data/config.json`. Action: validate `departure.name`, `departure.nameEn`, `departure.naverPlaceId`, `instagram`, optional `event`, and optional `meeting`. Expected result: departure and Instagram are present, event and meeting can be inactive without breaking home rendering. Failure or edge result: missing departure place id fails because meeting directions cannot be generated. Layer: JSON contract. Planned tool: future Vitest JSON schema helper.

Case JSON-03, i18n key parity and fallback. Link: REQ-012, REQ-013, REQ-014, UC-013. Precondition: import `src/i18n/ko.json` and `src/i18n/en.json`. Action: compare required nested UI keys used by components. Expected result: required keys for nav, home, detail, footer, event, meeting, and known regions exist in both files. Failure or edge result: an unknown region such as a new Korean region may be absent from `en.json`, and the component must fall back to the raw region name. Layer: JSON contract. Planned tool: future Vitest JSON key walker.

Case JSON-04, Naver place-id policy. Link: REQ-011, UC-003, UC-012. Precondition: read all center and departure `naverPlaceId` values. Action: assert each one includes `PLACE_POI`. Expected result: current bundled data passes the documented place-id policy. Failure or edge result: a URL-shaped value, empty string, or place id without `PLACE_POI` fails as malformed input. Layer: JSON contract. Planned tool: future Vitest JSON contract helper.

### P0 Utility Cases

Case UTIL-01, default Naver directions URL. Link: REQ-008, UC-003. Precondition: center fixture with `naverPlaceId: "center,PLACE_POI"`. Action: call `getDefaultMapUrl(center)`. Expected result: returns `https://map.naver.com/p/directions/-/center,PLACE_POI/-/transit?c=12.00,0,0,0,dh`. Failure or edge result: malformed or missing center place id should be caught by the caller policy before the button opens. Layer: utility. Planned tool: future Vitest.

Case UTIL-02, meeting Naver directions URL. Link: REQ-009, UC-012. Precondition: center and departure fixtures with valid place ids. Action: call `getMeetingMapUrl(center, departure)`. Expected result: URL path contains departure first, then destination. Failure or edge result: missing departure must not produce a clickable enabled meeting button. Layer: utility. Planned tool: future Vitest.

Case UTIL-03, place-id validation. Link: REQ-011, UC-003, UC-012. Precondition: values `abc,PLACE_POI`, `https://map.naver.com/...`, `''`, `null`, and `undefined`. Action: call `isValidPlaceId(value)`. Expected result: only the string containing `PLACE_POI` returns true. Failure or edge result: a generic HTTPS URL returns false even though it is a valid URL. Layer: utility. Planned tool: future Vitest.

Case UTIL-04, known place-id policy discrepancy. Link: REQ-010, REQ-011, UC-003, UC-012. Precondition: `NaverMapButton` currently imports `isValidUrl`, while project rules say button disabled state uses `isValidPlaceId`. Action: create a future failing spec with a center whose `naverPlaceId` is `bad-place` and whose generated URL still starts with HTTPS. Expected result: the planned spec should fail against current behavior until the component uses place-id validation. Failure or edge result: misleading success output from HTTPS-only URL validation is rejected. Layer: utility plus component contract. Planned tool: future Vitest and Testing Library.

Case UTIL-05, event date formatting. Link: REQ-016, REQ-019, UC-014, UC-015. Precondition: date string `2026-05-16` and languages `ko` and `en`. Action: call `formatEventDate(date, lang)`. Expected result: Korean output contains month and day in Korean locale, English output is `May 16`. Failure or edge result: local timezone must not shift the day because the helper appends `T00:00:00`. Layer: utility. Planned tool: future Vitest with fixed timezone check.

Case UTIL-06, price formatting. Link: REQ-006, UC-002. Precondition: price `130000`. Action: call `formatPrice(130000)`. Expected result: `130,000원`. Failure or edge result: non-number input is outside the current JSON contract and should fail contract tests before the utility is called. Layer: utility. Planned tool: future Vitest.

### P1 Component Cases

Case COMP-01, language persistence and detection. Link: REQ-012, REQ-013, UC-013. Precondition: empty `localStorage.lang`, `navigator.language` set to Korean, then English. Action: mount `LangProvider` and read `lang`. Expected result: Korean browser starts as `ko`, non-Korean browser starts as `en`, and `setLang('en')` persists `lang`. Failure or edge result: stale `localStorage.lang` values outside `ko` and `en` are ignored. Layer: component. Planned tool: future Testing Library plus localStorage mock.

Case COMP-02, translation fallback and interpolation. Link: REQ-014, UC-013. Precondition: mounted provider with `lang: en`. Action: call `t('home.totalCount', { count: 11 })`, `t('regions.서울', null, '서울')`, and an unknown key. Expected result: variables are replaced, known English region is translated, and unknown key returns fallback or key. Failure or edge result: missing fallback doesn't crash. Layer: component. Planned tool: future Testing Library hook harness.

Case COMP-03, filters normal path. Link: REQ-003, REQ-004, UC-001. Precondition: centers in Suwon, Anyang, Gunpo, and Seoul, selected region null, affiliated false. Action: click `수원`, click `전체`, click `제휴`. Expected result: region filter narrows by exact `region`, `전체` resets to all, and affiliate chip narrows to `isAffiliated: true`. Failure or edge result: region state uses `null` for all, not the localized label, so language changes don't break the filter. Layer: component. Planned tool: future Testing Library.

Case COMP-04, map button enabled open behavior. Link: REQ-005, REQ-008, REQ-009, UC-003, UC-012. Precondition: valid center and valid departure, `window.open` mocked. Action: click default button, then meeting button. Expected result: default uses current-location URL, meeting uses departure-to-center URL, both call `window.open(url, '_blank', 'noopener,noreferrer')`. Failure or edge result: clicking inside a center card's button row must not navigate the card due to `stopPropagation`. Layer: component. Planned tool: future Testing Library.

Case COMP-05, map button disabled behavior. Link: REQ-010, REQ-011, UC-003, UC-012. Precondition: missing departure for meeting or invalid place-id fixture from the planned policy. Action: render button. Expected result: button has `disabled` and shows unavailable text. Failure or edge result: disabled button never calls `window.open`. Layer: component. Planned tool: future Testing Library.

Case COMP-06, event banner inactive, active, expired, and link. Link: REQ-016, REQ-017, REQ-018, UC-014. Precondition: event missing, inactive, active with future endDate, and active with past endDate. Action: render banner, toggle collapse, click link. Expected result: missing, inactive, and expired events render nothing. Active future event renders title, date, description toggle, persists `collapsedEventTitle`, and opens `linkUrl` with noopener settings. Failure or edge result: malformed `linkUrl` with a leading space is treated as a data issue and should be caught by JSON contract before E2E. Layer: component. Planned tool: future Testing Library with fake timers.

Case COMP-07, meeting banner inactive, known center, and unknown center. Link: REQ-019, REQ-020, UC-015. Precondition: inactive meeting, active meeting with `centerId`, active meeting with blank or unknown `centerId`. Action: render banner and click when a center is known. Expected result: inactive renders nothing, known center shows date, time, localized center name, and navigates to `/center/:id`. Unknown center shows the localized unknown-place key and is not clickable under current source behavior. Failure or edge result: current component spec says unknown center should return null, but source shows a non-clickable unknown-place banner. Future tests must lock the chosen policy before implementation. Layer: component. Planned tool: future Testing Library with router harness.

Case COMP-08, detail page data sections. Link: REQ-006, REQ-007, REQ-014, REQ-015, UC-002, UC-003, UC-012. Precondition: center with multiple images, prices, affiliate prices, SNS, parking, and i18n. Action: render `CenterDetail` in Korean and English. Expected result: localized fields render, image thumbnails change active image, optional sections render only when data exists, and both map buttons appear. Failure or edge result: missing optional arrays don't render empty headings. Layer: component. Planned tool: future Testing Library.

### P1 Routing Integration Cases

Case ROUTE-01, home route. Link: REQ-001, REQ-016, REQ-019, UC-001, UC-014, UC-015. Precondition: `BrowserRouter` at `/`. Action: render `App`. Expected result: navbar, home heading, event slot, meeting slot, filters, center list, and footer render in the expected order. Failure or edge result: inactive event and meeting do not leave broken UI gaps. Layer: routing integration. Planned tool: future Testing Library MemoryRouter or Vite integration harness.

Case ROUTE-02, center route valid id. Link: REQ-005, REQ-006, UC-002. Precondition: route `/center/center_01`. Action: render `App`. Expected result: detail page for `center_01` renders. Failure or edge result: browser back returns to the list when the navigation came from a card. Layer: routing integration. Planned tool: future Testing Library with router history.

Case ROUTE-03, center route invalid id. Link: REQ-021, UC-004. Precondition: route `/center/not-real`. Action: render detail route. Expected result: client redirects to `/` with replace. Failure or edge result: stale or malformed ids don't render a partial detail page. Layer: routing integration. Planned tool: future Testing Library with router history.

Case ROUTE-04, catchall and static redirect. Link: REQ-022, REQ-023, UC-004. Precondition: route `/unknown` and Cloudflare style direct hit `/center/center_01`. Action: render route and inspect `public/_redirects`. Expected result: unknown route shows NotFoundPage inside the SPA, while direct route is served by `/*  /index.html  200`. Failure or edge result: missing `_redirects` would cause Cloudflare direct-route 404. Layer: routing integration. Planned tool: future integration test plus static file assertion.

### P2 Later E2E Cases

Case E2E-01, mobile happy path. Link: REQ-001, REQ-003, REQ-005, REQ-008, UC-001, UC-002, UC-003. Precondition: preview or deployed site available on a mobile viewport. Action: open home, filter a region, open a center, click current-location directions. Expected result: list filters, detail opens, and a Naver Map URL opens in a new tab. Failure or edge result: popup blocking or mobile deep-link differences are recorded as browser-specific behavior, not unit failures. Layer: later E2E. Planned tool: future Playwright, not installed in this task.

Case E2E-02, meeting path. Link: REQ-009, REQ-019, REQ-020, UC-012, UC-015. Precondition: meeting active with known center in a preview build. Action: open home, click meeting banner, click meeting directions. Expected result: navigates to the planned center and opens departure-to-center Naver Map URL. Failure or edge result: inactive or unknown meeting does not offer misleading navigation. Layer: later E2E. Planned tool: future Playwright, not installed in this task.

Case E2E-03, language persistence path. Link: REQ-012, REQ-013, REQ-014, UC-013. Precondition: browser storage cleared. Action: toggle language, reload, navigate home to detail and back. Expected result: selected language persists across reload and route changes. Failure or edge result: stale invalid storage value falls back to browser language. Layer: later E2E. Planned tool: future Playwright, not installed in this task.

Case E2E-04, deploy direct route. Link: REQ-023, UC-004. Precondition: Cloudflare Pages deployment. Action: directly open `/center/center_01`. Expected result: page loads with status 200 and renders detail content. Failure or edge result: missing or ignored redirect file surfaces as 404. Layer: later E2E. Planned tool: future Playwright plus deployment smoke check.

## Regression Policy

A bug fix must begin with a failing spec at the lowest layer that can prove the bug. If the bug escaped because the wrong layer was covered, add the missing layer too. For example, a malformed `naverPlaceId` that still opens a HTTPS-looking URL needs both a utility policy case and a component disabled-state case.

Manual checks in `tasks.md` are historical evidence, not substitutes for automated regression tests. Once a future runner exists, manual checks should stay only for mobile deep-link and deployed Cloudflare behavior that cannot be proven reliably in unit or component tests.

Flaky tests must be quarantined by cause, not ignored. Time-sensitive banner specs need fake timers or a fixed system date. Storage specs need per-test localStorage cleanup. New-tab specs must mock `window.open` and assert exact arguments rather than relying on a real popup.

Misleading success output is a regression risk. A test must not pass simply because a rendered button exists, an HTTPS URL exists, or a route returns some page. It must assert the exact route, disabled state, URL path, storage key, or translated text named by the case.

## Definition of Done

1. The relevant REQ and UC have normal and edge cases at the lowest useful layer.
2. Data contracts pass before UI tests read real JSON.
3. Component tests assert user-visible text, disabled state, click behavior, and safe `window.open` arguments.
4. Routing integration tests prove valid routes, invalid ids, catchall routes, and static SPA redirect coverage.
5. Later E2E tests prove only the browser or deployment behavior that lower layers cannot cover.
6. No test result is claimed until a runner exists and the command has actually run.
7. Package files remain unchanged unless a separate approved task installs and configures a runner.

## Probe Register

Malformed input: applicable. Planned coverage includes malformed place ids, missing departure, invalid storage values, missing JSON fields, unknown center ids, and bad event links.

Stale state: applicable. Planned coverage includes stale `localStorage.lang`, stale `collapsedEventTitle`, router history after redirect, and inactive event or meeting toggles.

Dirty worktree: applicable. This documentation task owns only `docs/wiki/06-tdd-qa.md` and `.omo/evidence/task-4-llm-wiki-methodology.md`. Package, source, root docs, and lockfile must stay byte-unchanged.

Flaky-test planning: applicable. Planned coverage calls for fake timers, storage reset, exact `window.open` assertions, and deployment smoke checks separated from unit tests.

Misleading_success_output: applicable. Planned coverage rejects passing on generic HTTPS URLs, generic rendered pages, or present buttons without asserting exact behavior.

Secrets: not applicable. The app uses static public data and no credentials.

Network dependency: not applicable for JSON, utility, component, or routing integration layers. It is applicable only to later E2E map and deployment smoke checks.

Database state: not applicable. This app has no backend or database.

Authentication and authorization: not applicable. This app has no login or role model.
