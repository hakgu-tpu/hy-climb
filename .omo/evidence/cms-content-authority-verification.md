# CMS Content Authority Verification

AdversarialVerify: `confirmed`

## Scope And Sources

Verified from disk in the main repo on 2026-08-09.

Read sources:

1. `CLAUDE.md`
2. `docs/wiki/01-index.md`
3. `docs/wiki/02-governance.md`
4. `docs/wiki/03-product.md`
5. `docs/wiki/04-features.md`
6. `docs/wiki/08-harness/02-operating-model.md`
7. `docs/wiki/08-harness/05-worktree-and-ownership.md`
8. `.omo/evidence/cms-content-authority-baseline.json`
9. `.omo/evidence/cms-stakeholder-authority.md`
10. `.omo/evidence/cms-feature-proposal.md`
11. `package.json`

## Baseline Hash Comparison

Baseline file: `.omo/evidence/cms-content-authority-baseline.json`.

| Path | Baseline SHA256 | Current SHA256 | Result |
| --- | --- | --- | --- |
| `docs/wiki/03-product.md` | `83029cc7804017be1351af9ba174d50be26219b26089174f3c910b97359b2c74` | `1f5fa61a9f241d04d3ab963555987661824a6669e3cd6c73189158c45d3022a2` | changed as expected by stakeholder/authority update |
| `docs/wiki/04-features.md` | `b4cf47574771570335c24463ac22ccde56e759cf9d2949ac3c45e059262fb252` | `653fdeb54273abfdd39976a35dfbb8d8219fcca393b12c81330df6e47a488f52` | changed as expected by proposed capability update |

Current `04-features.md` feature matrix block SHA256, from `## Feature Trace Matrix` through before `## Coverage Summary`: `919daf7870a946d2ba1b60af5e08693781b57f18d58d6db7d8ecd6b803c90140`.

## Stable ID And Catalog Verification

`docs/wiki/03-product.md` preserves these baseline catalogs:

1. Stakeholders: `STK-001`, `STK-002`, `STK-003`, `STK-004`, `STK-005`.
2. Goals: `GOAL-001`, `GOAL-002`, `GOAL-003`, `GOAL-004`, `GOAL-005`, `GOAL-006`.
3. Requirements: `REQ-001` through `REQ-023`.
4. Active use cases: `UC-001`, `UC-002`, `UC-003`, `UC-004`, `UC-012`, `UC-013`, `UC-014`, `UC-015`.
5. Features: `FEAT-001` through `FEAT-010`.
6. Alias mappings remain exact: `UC01 -> UC-001`, `UC02 -> UC-002`, `UC03 -> UC-003`, `UC04 -> UC-004`, `UC12 -> UC-012`, `UC13 -> UC-013`, `UC14 -> UC-014`, `UC15 -> UC-015`.

Note: the product page still contains historical reservation text for `UC-005` through `UC-011`; this is not an active catalog expansion and matches the baseline evidence treatment.

`docs/wiki/04-features.md` preserves the current feature matrix rows exactly once and in order: `FEAT-001`, `FEAT-002`, `FEAT-003`, `FEAT-004`, `FEAT-005`, `FEAT-006`, `FEAT-007`, `FEAT-008`, `FEAT-009`, `FEAT-010`.

The only `FEAT-011` token is in the negative sentence `No stable ID: This proposed capability has no FEAT-011...`; there is no `FEAT-011` matrix row and no new stable feature ID assigned.

## Six Korean Category Verification

The six required labels appear once in `docs/wiki/03-product.md` and once in `docs/wiki/04-features.md`, with identical spelling:

1. `센터 카탈로그`
2. `운영 이벤트·정기모임`
3. `다국어 콘텐츠`
4. `미디어 자산`
5. `공통 운영·외부 연동 설정`
6. `게시·검증 메타데이터`

## Authority And Auth Verification

Confirmed in `docs/wiki/03-product.md`:

1. `STK-003` remains `동아리 운영진` and still says current management is by static JSON and images.
2. The CMS note is explicitly `상태: Proposed` and says it is not current implementation criteria.
3. Product Owner authority remains for implementation scope, data model, authorization policy, stable IDs, and product scope changes.
4. `콘텐츠 운영자` manages the six categories only in a future CMS.
5. `인증된 콘텐츠 게시 승인자` can independently publish approved operational content only inside that CMS.
6. CMS authorization is separated from public static SPA access.
7. The public static SPA has no runtime auth or RBAC.
8. CMS is not public app login and not a flow that authenticates public app users for content editing.

Confirmed in `docs/wiki/04-features.md`:

1. `## Proposed CMS 운영 콘텐츠 관리 Capability` is a Proposed, unnumbered candidate.
2. It is not a current implementation, not an approved product feature, and not a new stable ID.
3. Non-goal excludes CMS implementation, backend services, runtime data fetching, public app login, public app RBAC, source data edits, schema changes, package changes, and new-feature acceptance criteria.
4. Product Owner approval is required for content model, authorization policy, promotion to implementation scope, stable ID creation, and current product or feature behavior changes.
5. Independent publishing is limited to an authenticated content publisher after CMS authentication and only if Product Owner approves that CMS policy.

## Out-Of-Scope And Proposed Boundary

Confirmed preserved current fact in `docs/wiki/03-product.md`:

1. The out-of-scope table still contains `CMS와 관리자 편집 | 운영진은 파일 수정으로만 데이터를 바꿀 수 있음`.
2. The final note says the row is current implementation fact.
3. The final note says future CMS candidates are recorded only in `Proposed CMS 전환 메모`.
4. The final note says this must not be interpreted as approved current implementation or public static SPA auth.

## Failure Probes

| Probe | Evidence | Result |
| --- | --- | --- |
| New FEAT ID | Feature matrix rows are exactly `FEAT-001` through `FEAT-010`; `FEAT-011` appears only in a negative no-stable-ID sentence. | rejected |
| Unapproved CMS as current | Product page says Proposed CMS is not current implementation criteria; feature page says Proposed candidate is not current implementation or approved product feature. | rejected |
| Public auth claim | Product and feature pages both state public static SPA has no runtime auth or RBAC; CMS is not public app login. | rejected |
| Unauthenticated publish | Independent publish is tied to `인증된 콘텐츠 게시 승인자` or authenticated content publisher after CMS authentication. | rejected |
| Missing Product Owner policy boundary | Both pages reserve model, policy, stable ID, scope, and promotion decisions for Product Owner approval. | rejected |

## Git And Path Containment

Commands used with git-master prefix:

1. `GIT_MASTER=1 git status --short`
2. `GIT_MASTER=1 git diff --stat`
3. `GIT_MASTER=1 git diff --staged --stat`
4. `GIT_MASTER=1 git status --short -- docs/wiki/03-product.md docs/wiki/04-features.md .omo/evidence/cms-stakeholder-authority.md .omo/evidence/cms-feature-proposal.md .omo/evidence/cms-content-authority-baseline.json`
5. `GIT_MASTER=1 git status --short -- src public package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js .claude/rules`
6. `GIT_MASTER=1 git diff --stat -- src public package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js .claude/rules`

Observed dirty state:

1. Pre-existing unstaged root/spec changes remain: `.gitignore`, `CLAUDE.md`, `README.md`, `component-spec.md`, `data-schema.md`, `tasks.md`, `ui-spec.md`.
2. Pre-existing staged deletion remains: `.claude/settings.local.json`. Its content was not read or exposed.
3. Untracked operational/wiki paths include `.omo/` and `docs/`, including the CMS baseline, worker evidence files, and the two canonical docs under review.
4. Targeted status for `src`, `public`, `package.json`, `package-lock.json`, `vite.config.js`, `tailwind.config.js`, and `postcss.config.js` returned no changes.
5. Targeted diff stat for product source, data/config, package, and common config paths returned no changes.
6. Targeted status for `.claude/rules` returned `?? .claude/rules/`; this is an untracked rules directory in the dirty repo, not a diff caused by the CMS docs update. I did not inspect or modify local settings.

Conclusion: no product source, data, config, package, or build configuration diff is attributable to the CMS documentation update. Root/spec dirt exists from the broader dirty checkout and is recorded as unrelated baseline noise.

## Regression Commands

`package.json` defines `lint` as `eslint .` and `build` as `vite build`.

1. `npm run lint`: failed with one diagnostic in `src/contexts/LangContext.jsx:43:14`, `react-refresh/only-export-components`. Baseline evidence recorded lint/build as not run, so this is recorded as current diagnostic rather than proven CMS-doc regression. The CMS update touched Markdown/evidence paths only and targeted source/package diffs are empty.
2. `npm run build`: passed. Vite transformed 48 modules and produced production output. Node emitted a deprecation warning for `module.register()`, but build completed successfully.

## Cleanup And Misleading Output Handling

1. Stale handling: reread canonical wiki pages and worker evidence from disk before making this verification file.
2. Dirty handling: recorded unrelated dirty and staged paths; did not stage, reset, clean, commit, push, install, or edit them.
3. Misleading output handling: treated lint failure as current repo diagnostic, not as CMS docs failure, because targeted source/package diffs are empty.
4. Build artifact handling: after `npm run build`, `GIT_MASTER=1 git status --short -- dist .omo/evidence/cms-content-authority-verification.md` returned no `dist` entry before this evidence file was created, so no cleanup action was needed.
5. Hung cleanup handling: no server, worktree, branch, install, staged file, package mutation, persistent runtime process, or visible generated artifact was created by this verification task; hung cleanup is not present.

## Final Verdict

`confirmed`: the CMS stakeholder/feature documentation update preserves `STK-003`, stable catalogs, alias mappings, and the current `FEAT-001` through `FEAT-010` matrix; adds only Proposed, unnumbered CMS capability language; keeps the six Korean category labels identical across product and feature docs; separates CMS auth from public app auth/RBAC; preserves Product Owner boundaries; and requires authenticated CMS publishing authority for independent publishing.

Open verification note: `npm run lint` currently fails on a source Fast Refresh rule diagnostic unrelated to the docs update. `npm run build` passes.
