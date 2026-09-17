# CMS Stakeholder Authority Evidence

## Scope

1. Edited `docs/wiki/03-product.md` only for product governance wording.
2. Created this evidence file at `.omo/evidence/cms-stakeholder-authority.md`.
3. Read baseline evidence from `.omo/evidence/cms-content-authority-baseline.json`.
4. Did not edit `docs/wiki/04-features.md`, source files, data files, root docs, rules, package files, or git state.
5. Did not run install, build, lint, commit, or package commands.

## Baseline Evidence Used

1. Baseline product SHA from `.omo/evidence/cms-content-authority-baseline.json`: `83029cc7804017be1351af9ba174d50be26219b26089174f3c910b97359b2c74`.
2. Current product SHA after the documentation delta: `1f5fa61a9f241d04d3ab963555987661824a6669e3cd6c73189158c45d3022a2`.
3. Baseline recorded that proposed CMS is not current implementation, public static SPA has no runtime auth or RBAC, and target edits are docs only.

## Product Delta Recorded

1. Preserved `STK-003` ID and name, `동아리 운영진`.
2. Refined `STK-003` description to keep current static JSON and image editing while pointing to a Proposed CMS responsibility boundary.
3. Added a clearly labeled `Proposed CMS 전환 메모`.
4. Defined `운영 콘텐츠` as exactly six categories: `센터 카탈로그`, `운영 이벤트·정기모임`, `다국어 콘텐츠`, `미디어 자산`, `공통 운영·외부 연동 설정`, `게시·검증 메타데이터`.
5. Added the role boundary for `콘텐츠 운영자`, `인증된 콘텐츠 게시 승인자`, and Product Owner without creating a new stable role ID.
6. Kept `CMS와 관리자 편집` as a current out of scope fact, then added a Proposed CMS transition note below the out of scope table.

## Preservation Checks

1. SHA check ran with a local Python file read and SHA256 calculation. It confirmed the product doc changed from the baseline SHA to `1f5fa61a9f241d04d3ab963555987661824a6669e3cd6c73189158c45d3022a2`.
2. Stable ID preservation check found no missing or unexpected new `STK`, `GOAL`, `REQ`, `UC`, or `FEAT` IDs compared with the baseline list. Existing reserved text for `UC-005` through `UC-011` was treated as historical reserved text, not a new stable catalog entry.
3. Alias preservation check confirmed `UC01`, `UC02`, `UC03`, `UC04`, `UC12`, `UC13`, `UC14`, and `UC15` still map to their canonical `UC-0xx` IDs.
4. `STK-003` row check confirmed the row still uses ID `STK-003` and name `동아리 운영진`.
5. New stable role ID check returned false.

## Exact Category Checks

1. `센터 카탈로그`: present once.
2. `운영 이벤트·정기모임`: present once.
3. `다국어 콘텐츠`: present once.
4. `미디어 자산`: present once.
5. `공통 운영·외부 연동 설정`: present once.
6. `게시·검증 메타데이터`: present once.

## Authority Wording Checks

1. `콘텐츠 운영자` manages the six categories through a future CMS, present.
2. `인증된 콘텐츠 게시 승인자` may independently publish approved operational content in that CMS, present.
3. Product Owner remains responsible for data model, policy, stable ID, and product scope changes, present.
4. CMS authorization is separate from public static SPA access, present.
5. Public static SPA has no runtime auth or RBAC, present.
6. CMS is not public app login, present.

## Current Implementation Claim Scan

1. Positive claim probe for current CMS runtime returned false.
2. Positive claim probe for current RBAC returned false.
3. Positive claim probe for current runtime auth returned false.
4. Positive claim probe for CMS being public app login returned false.
5. Positive claim probe for public app users getting content edit authority returned false.

## Link And Heading Checks

1. H1 count in `docs/wiki/03-product.md`: `1`.
2. Local markdown link count in `docs/wiki/03-product.md`: `0`.
3. Missing local links: none.

## Failure Probes

1. Auto publish without authenticated publisher: rejected by explicit non goal wording that no policy is created for auto publishing without `인증된 콘텐츠 게시 승인자`.
2. Product Owner excluded from schema or policy decision: rejected by explicit Product Owner responsibility wording and explicit non goal wording.
3. CMS described as public login: rejected by explicit statement that CMS is not public app login and by explicit non goal wording.

## Adversarial Probes And Cleanup

1. Stale probe: reread `docs/wiki/03-product.md`, governance docs, and baseline evidence from disk before and after the edit. The Proposed note follows the wiki status contract.
2. Dirty probe: baseline evidence recorded unrelated dirty worktree paths before this task. This task did not clean, revert, or edit those unrelated paths.
3. Malformed probe: scanned for positive current implementation claims that would turn CMS, auth, RBAC, or public login into current app behavior. All returned false.
4. Misleading probe: kept the current `CMS와 관리자 편집` out of scope row and added a separate Proposed transition note so the historical fact is not contradicted.
5. Cleanup: no worktrees, branches, staged files, installs, servers, build artifacts, screenshots, or runtime resources were created by this task.
