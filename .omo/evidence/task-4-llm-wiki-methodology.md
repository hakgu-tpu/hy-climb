# Task 4 Evidence, LLM Wiki TDD Methodology

## DoneClaim

Plan Task 4 is complete. I created `docs/wiki/tdd-qa.md` as a specification-level TDD and QA contract, and I did not add, install, configure, stage, commit, or edit any package, source, or root documentation files.

## Baseline Captured

The target wiki document was absent before this task. Reading `docs/wiki` returned file not found, so the failing baseline was missing methodology coverage.

`package.json` contains `dev`, `build`, `lint`, and `preview` scripts only. It has no `test` script.

`package.json` and `package-lock.json` do not declare Vitest, Jest, Testing Library, Playwright, Cypress, or another test runner. Installing one is out of scope.

## Package Byte Receipt

Before writing the owned docs, package hashes were:

`package.json`: `14adeaa36ce433961e75148b5f6f71623cfe70afc0c25ef0e4c208dba35bf7e1`

`package-lock.json`: `d35fd38bc280d47df13af8a7e51fae036e1c96d03bfbf4059be0a188e67d4020`

Final verification repeated these hashes after writing docs, and both matched exactly.

## Source Inputs Read

I read the package files, `src/utils/naverMap.js`, `src/utils/formatEventDate.js`, `src/contexts/LangContext.jsx`, center filters, Naver map button, center list, card, detail, pages, event and meeting banners, data JSON, i18n JSON, `public/_redirects`, component and data specs, and the manual checks in `tasks.md`.

## Contract Decisions

The contract states no test runner exists today and avoids claiming any test execution.

The planned cases cover JSON contract, utility, component, routing integration, and later E2E layers. Each case includes REQ/UC link, precondition, action, expected result, failure or edge result, layer, and planned tool.

The Naver place-id discrepancy is documented as a planned failing spec: source rules mention `isValidPlaceId`, but `NaverMapButton` currently checks generated URL strings with `isValidUrl`.

Meeting banner behavior is documented as a contract choice point: the component spec says unknown center should return null, while current source renders a non-clickable TBD banner.

## Required Probes

Malformed input: covered by planned invalid place ids, missing departure, missing JSON fields, invalid storage values, unknown center ids, and bad event links.

Stale_state: covered by planned stale `localStorage.lang`, stale `collapsedEventTitle`, inactive event and meeting flags, and redirect history checks.

Dirty_worktree: checked before edits with `git status --short`, which printed no tracked or untracked changes at that point.

Flaky-test planning: covered through fake timers, storage reset per case, exact `window.open` assertions, and deployment checks separated from lower layers.

Misleading_success_output: covered by requiring exact URL paths, disabled state, safe new-tab args, route identity, and translated text rather than generic rendered output.

Other probes not applicable: secrets, database state, and authentication are not present in this static app. Network dependency is not applicable below later E2E because lower layers can run with local fixtures and mocks.

## Cleanup Receipt

Owned files for this task are `docs/wiki/tdd-qa.md` and `.omo/evidence/task-4-llm-wiki-methodology.md` only. No dependency install, package edit, source edit, root doc edit, staging, commit, or branch action was performed.
