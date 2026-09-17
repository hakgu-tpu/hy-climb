# CMS Feature Proposal Evidence

## Scope

Owned edits:

1. `docs/wiki/04-features.md`
2. `.omo/evidence/cms-feature-proposal.md`

Forbidden edits were not part of this task: `docs/wiki/03-product.md`, source files, data files, root docs, rule files, package files, Git state, and CMS implementation.

## Baseline Evidence

Baseline source: `.omo/evidence/cms-content-authority-baseline.json`.

The baseline records these facts:

1. `proposed_cms_is_not_current_implementation` is `true`.
2. `public_static_spa_has_no_runtime_auth_or_rbac` is `true`.
3. `target_edits_are_docs_only` is `true`.
4. The current feature set is exactly `FEAT-001` through `FEAT-010`.
5. The six CMS category labels were absent from the current docs before this proposal.

## Proposal Placement

`docs/wiki/04-features.md` keeps the `# Features` H1, the `## ID Policy`, `## Feature Trace Matrix`, and `## Coverage Summary` sections intact. The CMS text is added after the current coverage summary under `## Proposed CMS 운영 콘텐츠 관리 Capability`.

The current matrix remains a current-feature table only. The proposal is not a table row, not a new feature number, and not implementation authority.

## Required Content Probes

Required managed resource categories are present exactly as labels:

1. `센터 카탈로그`
2. `운영 이벤트·정기모임`
3. `다국어 콘텐츠`
4. `미디어 자산`
5. `공통 운영·외부 연동 설정`
6. `게시·검증 메타데이터`

Required fields are present:

1. `Evidence`
2. `Trigger`
3. `Affected existing concepts/IDs`
4. `Non-goal`
5. `Owner-decision requirement`
6. `No stable ID`

Required guardrails are present:

1. CMS is not a current implementation.
2. The public app remains static with no runtime auth or RBAC.
3. CMS authorization is separate from public app behavior.
4. An authenticated content publisher may independently publish after CMS authentication only if the Product Owner approves that CMS policy.
5. The Product Owner approves content model, authorization policy, stable ID creation, scope changes, and promotion to implementation scope.

## Failure Probes

Adversarial checks expected to fail if the wording drifts:

1. CMS present as current: rejected by the proposal status sentence and the non-goal sentence.
2. New `FEAT-011`: rejected by the `No stable ID` sentence.
3. Unauthenticated independent publisher: rejected because independent publish is limited to an authenticated publisher after CMS authentication and only after Product Owner policy approval.
4. Public app auth claim: rejected because the proposal states the public app remains static with no runtime auth or RBAC.
5. Auto-approval: rejected because Product Owner approval is required before promotion, model, policy, stable ID, or scope changes.

## Validation Results

Scripted readback probe over `docs/wiki/04-features.md` and `.omo/evidence/cms-feature-proposal.md` passed these checks:

1. `h1_intact=PASS`
2. `feature_ids_exact=PASS`, rows are `FEAT-001`, `FEAT-002`, `FEAT-003`, `FEAT-004`, `FEAT-005`, `FEAT-006`, `FEAT-007`, `FEAT-008`, `FEAT-009`, and `FEAT-010`.
3. `feature_rows_once=PASS`
4. `no_feat_011_row=PASS`
5. `all_categories_present=PASS`
6. `all_fields_present=PASS`
7. `guardrails_present=PASS`
8. `evidence_probe_terms_present=PASS`
9. `no_forbidden_public_auth_claim=PASS`

Feature matrix block hash after the docs-only proposal edit: `357816681f1fc39f9f8d33cf09608f5f8dc3353dac449408d6d4a9ccc1e6705f`. This records the current matrix block for review and confirms the proposal was kept outside the feature table.

## Cleanup DoneClaim

Changed files:

1. `docs/wiki/04-features.md`
2. `.omo/evidence/cms-feature-proposal.md`

Resource inventory: no server, install, build output, staged file, branch, worktree, runtime process, package change, source change, data change, or CMS implementation was created.

Cleanup command or tool: not applicable.

Cleanup timeout seconds: `null`.

Cleanup success observable: no persistent resource exists from this docs-only change.

Cleanup retry limit: `0`.

Cleanup receipt: this section.

Escalation target: orchestrator or Product Owner if the proposed CMS needs approval, stable IDs, implementation scope, or policy changes.

DoneClaim: docs-only proposal added, current matrix kept separate, no stable ID assigned, and adversarial failure probes recorded for review.
