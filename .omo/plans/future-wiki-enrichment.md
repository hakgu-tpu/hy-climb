# future-wiki-enrichment - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** A future-facing Wiki that clearly separates what Hy-Climb does today, what may be considered next, and what is intentionally out of scope. Every idea remains reviewable without becoming an accidental product commitment.

**Why this approach:** The app is still a small static service, so the plan strengthens data quality, accessibility review, content operations, and testing readiness before proposing platform growth. Future ideas stay concentrated and reversible instead of spreading speculative requirements through technical contracts.

**What it will NOT do:** It will not change the application, data, design, or build setup. It will not approve search, a backend, CMS, accounts, payments, analytics, automation, or any other future feature.

**Effort:** Medium
**Risk:** Medium - speculative wording could be mistaken for approved requirements unless every page follows the same status contract.
**Decisions I made for you:** I treated this as open-ended and chose conservative defaults: preserve the static SPA, keep new themes unnumbered, prioritize data hardening before accessibility/i18n and content operations, defer search until growth evidence exists, and keep test/harness automation unselected.

Your next move: after automatic high-accuracy review passes, explicitly start execution if these defaults are acceptable. Full execution detail follows below.

---

> TL;DR (machine): Documentation-only enrichment of 16 numbered Wiki files with immutable ID baseline, Current/Proposed/Deferred taxonomy, evidence-backed future themes, deferred platform scope, and agent-executable consistency QA.

## Scope
### Must have
- Every numbered Wiki page contains an appropriate `Current`, `Proposed`, and `Deferred` section or an index-specific status explanation.
- Objective state contract: every `Current` statement cites a current repository/Wiki path; every `Proposed` item contains evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, and no new stable ID; every `Deferred` item states that it is out of scope unless separately owner-approved and contains no implementation acceptance language.
- Existing stable IDs and legacy aliases remain byte-for-byte identical as a set; no new `STK`, `GOAL`, `REQ`, `UC`, `FEAT`, `WIKI-DEC`, ADR, or candidate ID is introduced.
- `03-product.md` and `04-features.md` centralize unnumbered roadmap themes and the strict priority order: data hardening → accessibility/i18n audit → content operations → conditional search/sort.
- Proposed themes state evidence, trigger, non-goal, affected current concepts, and owner-decision requirement without implying approval.
- Technical/reference pages describe only consequences of proposed themes; they do not modify current contracts.
- TDD and harness pages distinguish `implemented`, `documented/planned`, and `absent`, with measurable entry criteria but no enforcement claim.
- Backend, CMS/admin, auth/accounts, payment/reservation, analytics, notifications, CI, Hooks, test runner selection, and Agent Teams remain explicitly Deferred.
- Active Markdown links remain valid and the numbered Obsidian order remains unchanged.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not edit outside these exact Wiki files: `docs/wiki/01-index.md`, `docs/wiki/02-governance.md`, `docs/wiki/03-product.md`, `docs/wiki/04-features.md`, `docs/wiki/05-architecture.md`, `docs/wiki/06-tdd-qa.md`, `docs/wiki/07-reference/01-component-spec.md`, `docs/wiki/07-reference/02-data-schema.md`, `docs/wiki/07-reference/03-ui-spec.md`, `docs/wiki/08-harness/01-index.md`, `docs/wiki/08-harness/02-operating-model.md`, `docs/wiki/08-harness/03-context-isolation.md`, `docs/wiki/08-harness/04-agent-contracts.md`, `docs/wiki/08-harness/05-worktree-and-ownership.md`, `docs/wiki/08-harness/06-quality-and-evolution.md`, `docs/wiki/09-decisions.md`; and exact evidence files named below.
- Do not change application code, JSON/i18n data, root docs, package files, `.claude`, `.obsidian`, Git index, or runtime behavior. Orchestrator-only state updates are separately allowed at `.omo/plans/future-wiki-enrichment.md`, `.omo/boulder.json`, `.omo/start-work/ledger.jsonl`, and runtime files recursively discovered under `.omo/run-continuation/`; the recursive form is a scanner classification, not writer ownership.
- Do not add, rename, repurpose, approve, or deprecate any stable ID.
- Do not use commitment language such as “will build,” “approved roadmap,” or “next release” for Proposed/Deferred items.
- Do not claim accessibility compliance, deployed Cloudflare verification, selected test tools, current search need, or completed data hardening.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: documentation TDD. Capture the pre-edit stable-ID/status failures and a filesystem hash manifest first; no test framework is installed.
- Per-task checks use Read/search plus one-off in-memory Node scripts for headings, status vocabulary, forbidden language, links, and ID-set equality.
- Final safety checks run `npm run build` and compare `npm run lint` to the existing single-error baseline, while proving no non-Wiki product files changed.
- Exact implementation evidence: `.omo/evidence/task-1-future-wiki-enrichment.json`, `.omo/evidence/task-2-future-wiki-enrichment.md`, `.omo/evidence/task-3-future-wiki-enrichment.md`, `.omo/evidence/task-4-future-wiki-enrichment.md`, `.omo/evidence/task-5-future-wiki-enrichment.md`, `.omo/evidence/task-6-future-wiki-enrichment.md`, `.omo/evidence/task-7-future-wiki-enrichment.md`, `.omo/evidence/task-8-future-wiki-enrichment.md`, `.omo/evidence/task-9-future-wiki-enrichment.md`, `.omo/evidence/task-10-future-wiki-enrichment.md`, `.omo/evidence/task-11-future-wiki-enrichment.md`, `.omo/evidence/task-12-future-wiki-enrichment.md`, `.omo/evidence/task-13-future-wiki-enrichment.json`. Exact final evidence: `.omo/evidence/final-F1-future-wiki-enrichment.md`, `.omo/evidence/final-F2-future-wiki-enrichment.md`, `.omo/evidence/final-F3-future-wiki-enrichment.txt`, `.omo/evidence/final-F4-future-wiki-enrichment.md`.

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.
- Foundation: Task 1 serially records the immutable ID/path/content baseline and enriches the index/governance contract.
- Wave 1: Tasks 2-6 enrich product, features, architecture, TDD/QA, and decisions in parallel after the baseline exists.
- Wave 2: Tasks 7-12 enrich three reference pages and six harness pages in disjoint ownership lanes.
- Integration: Task 13 serially reconciles cross-page wording, roadmap order, links, and baseline equality.
- Parallel writers must use disjoint paths; no two agents may edit one Wiki page concurrently.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | none | 2-13 | none |
| 2 | 1 | 7, 8, 9, 13 | 3, 4, 5, 6 |
| 3 | 1 | 7, 8, 9, 13 | 2, 4, 5, 6 |
| 4 | 1 | 7, 8, 9, 13 | 2, 3, 5, 6 |
| 5 | 1 | 7, 8, 9, 10, 11, 12, 13 | 2, 3, 4, 6 |
| 6 | 1 | 10, 11, 12, 13 | 2, 3, 4, 5 |
| 7 | 2, 3, 4 | 13 | 8-12 |
| 8 | 2, 3, 4 | 13 | 7, 9-12 |
| 9 | 2, 3, 4 | 13 | 7, 8, 10-12 |
| 10 | 5, 6 | 13 | 7-9, 11, 12 |
| 11 | 5, 6 | 13 | 7-10, 12 |
| 12 | 5, 6 | 13 | 7-11 |
| 13 | 1-12 | F1-F4 | none |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [x] 1. Lock the immutable baseline and enrichment vocabulary
  What to do / Must NOT do: Before editing, record in `.omo/evidence/task-1-future-wiki-enrichment.json` the complete stable-ID/alias set and a sorted path/SHA-256 manifest for every project-controlled file. A recursive scanner may use patterns only for enumeration; patterns grant no ownership. Exclude only `.git/`, `node_modules/`, and `dist/`. Classify mutable paths as: (A) the 16 exact Wiki files in Scope; (B) the 17 exact evidence files in Verification; (C) orchestrator-only `.omo/plans/future-wiki-enrichment.md`, `.omo/boulder.json`, `.omo/start-work/ledger.jsonl`, and runtime files recursively discovered under `.omo/run-continuation/`. Every other project-controlled file is immutable, including `.omo/plans/llm-wiki-methodology.md`, `.omo/drafts/future-wiki-enrichment.md`, `.omo/drafts/llm-wiki-methodology.md`, every pre-existing `.omo/evidence` file not named in group B, `src/`, `public/`, package/config files, root docs, `.claude/`, `.obsidian/`, `.gitignore`, and local settings. The evidence also records sorted Wiki path/H1/link/hash data. Update only `docs/wiki/01-index.md` and `docs/wiki/02-governance.md` with the exact objective state contract: Current requires a current path citation; Proposed requires evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, and no stable ID; Deferred is out of scope unless separately owner-approved and has no implementation acceptance language. Also define horizon-not-approval, unnumbered-candidate, and promotion boundaries. Do not add or approve IDs/decisions.
  Parallelization: Foundation | Blocked by: none | Blocks: 2-13 | Owned paths: `docs/wiki/01-index.md`, `docs/wiki/02-governance.md`, `.omo/evidence/task-1-future-wiki-enrichment.json`
  References: `docs/wiki/01-index.md`; `docs/wiki/02-governance.md`; `docs/wiki/09-decisions.md`; `.omo/evidence/final-F2-llm-wiki-methodology.md`; ISO/IEC/IEEE 29148 `https://www.iso.org/standard/72089.html`.
  Acceptance criteria: Evidence contains every specified sorted manifest and SHA-256 hash without relying on Git; both pages define the exact objective state contract; baseline ID set equals post-edit ID set; no new ID-shaped token appears; a verifier can prove later that content/evidence diffs are limited to the 16 numbered Wiki Markdown files and 17 named `future-wiki-enrichment` evidence files, while orchestrator-state diffs are separately limited to Task 1 group C.
  QA scenarios (Node stdin scanner + Read): happy—current IDs/hashes are captured and both pages pass status-language assertions; failure—an in-memory added `REQ-999` or “will build” Proposed sentence is rejected. Evidence `.omo/evidence/task-1-future-wiki-enrichment.json`.
  Commit: N | No commit unless explicitly requested.

- [ ] 2. Enrich product discovery and future journey themes
  What to do / Must NOT do: Update `03-product.md` with Current, Proposed, Deferred separation. Preserve every existing catalog and current fact. Add unnumbered candidate stakeholder/journey themes for first-time visitors, regular climbers, event/meeting participants, bilingual visitors, and content maintainers. Each theme states evidence, hypothesis, trigger, non-goal, and that it is not approved. Keep platform-expanding themes Deferred.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: 7-9, 13 | Owned paths: `docs/wiki/03-product.md`, `.omo/evidence/task-2-future-wiki-enrichment.md`
  References: `docs/wiki/03-product.md`; `src/pages/HomePage.jsx`; `src/components/center/CenterList.jsx`; `src/components/center/CenterDetail.jsx`; `src/components/EventBanner.jsx`; `src/components/MeetingBanner.jsx`; `src/data/centers.json`; `docs/wiki/04-features.md` current risks.
  Acceptance criteria: Existing STK/GOAL/REQ/UC/FEAT catalogs and aliases are unchanged; candidate themes are unnumbered and clearly Proposed; backend/CMS/auth/payment/reservation/analytics/notifications remain Deferred; no market-demand claim is made.
  QA scenarios (Read + ID manifest check): happy—every candidate includes evidence/trigger/non-goal/status; failure—search/sort or CMS described as an approved requirement causes rejection. Evidence `.omo/evidence/task-2-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 3. Add a conservative proposed roadmap to feature traceability
  What to do / Must NOT do: Update `04-features.md` without changing the current traceability table. Add a separate unnumbered roadmap matrix in exact priority order: data contract/discrepancy hardening; accessibility+i18n audit; safe JSON/i18n/image content operations; conditional search/sort. Columns: status, evidence, trigger, affected existing IDs, technical implication, non-goal, owner decision. Search/sort requires observed catalog growth or user evidence.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: 7-9, 13 | Owned paths: `docs/wiki/04-features.md`, `.omo/evidence/task-3-future-wiki-enrichment.md`
  References: `docs/wiki/04-features.md`; `docs/wiki/03-product.md`; `src/components/center/NaverMapButton.jsx`; `src/data/config.json`; `src/i18n/ko.json`; `src/i18n/en.json`; `src/components/center/CenterList.jsx`; `docs/wiki/05-architecture.md` known discrepancies.
  Acceptance criteria: Current table rows/IDs/code paths remain unchanged; roadmap contains four unnumbered rows in required order; each row is Proposed except platform features Deferred; no “will build/next release/approved roadmap” text.
  QA scenarios (Node table parser + Read): happy—four ordered rows and all required columns pass; failure—search/sort without trigger or accessibility “compliant” wording fails. Evidence `.omo/evidence/task-3-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 4. Document static-SPA architecture implications and triggers
  What to do / Must NOT do: Update `05-architecture.md` with explicit Current/Proposed/Deferred sections. Proposed implications are build-time data validation, i18n/accessibility audit surfaces, safer content modularization when churn rises, and deployment smoke verification criteria. Do not claim deployed Cloudflare verification or architecture migration. Backend/server/CMS/auth/payment/analytics stay Deferred and owner-dependent.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: 7-9, 13 | Owned paths: `docs/wiki/05-architecture.md`, `.omo/evidence/task-4-future-wiki-enrichment.md`
  References: `docs/wiki/05-architecture.md`; `package.json`; `src/data/centers.json`; `src/data/config.json`; `public/_redirects`; `docs/wiki/07-reference/02-data-schema.md`; `docs/wiki/06-tdd-qa.md` deployment cases.
  Acceptance criteria: Current runtime/version/routing facts remain; proposed items have triggers and preserve static deployment; Cloudflare wording says redirect file exists but deployment is unverified; no server architecture is proposed as active work.
  QA scenarios (Read + package/version/link checks): happy—Current statements resolve to code/config and each Proposed item has a trigger; failure—“Cloudflare verified” or “migrate to backend” outside Deferred fails. Evidence `.omo/evidence/task-4-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 5. Add test-roadmap decisions and measurable quality entry criteria
  What to do / Must NOT do: Update `06-tdd-qa.md` while preserving all planned cases and canonical links. Add Current/Proposed/Deferred status table, pending runner-decision template, transition criteria from planned to automated, documentation-enrichment QA, and measurable-but-nonbinding metrics for layer coverage, flaky/quarantine handling, cleanup timeout, stale-resume failures, and validator false positives. Candidate tools are examples, not selected.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: 7-12, 13 | Owned paths: `docs/wiki/06-tdd-qa.md`, `.omo/evidence/task-5-future-wiki-enrichment.md`
  References: `docs/wiki/06-tdd-qa.md`; `package.json`; `docs/wiki/08-harness/06-quality-and-evolution.md`; `docs/wiki/09-decisions.md`; Kent Beck Canon TDD `https://newsletter.kentbeck.com/p/canon-tdd`; TDD prerequisites `https://newsletter.kentbeck.com/p/tdd-prerequisites`.
  Acceptance criteria: Existing test-case text and IDs remain; current table says no runner/test script; Proposed criteria name approval/entry/exit evidence; CI/hooks/Playwright enforcement stays Deferred; no numeric target is presented as currently achieved.
  QA scenarios (Read + package dependency scan): happy—status table matches package reality and runner remains pending; failure—claiming Vitest/Playwright selected or tests passing fails. Evidence `.omo/evidence/task-5-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 6. Add proposal-promotion and deferral templates without new decisions
  What to do / Must NOT do: Update `09-decisions.md` with Current/Proposed/Deferred framing and reusable templates for proposing, promoting, deferring, rejecting, or superseding a candidate. Templates require evidence, affected current IDs, owner, rationale, test impact, scope impact, and explicit status transition. Do not create a new WIKI-DEC/ADR or change existing decisions.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: 10-12, 13 | Owned paths: `docs/wiki/09-decisions.md`, `.omo/evidence/task-6-future-wiki-enrichment.md`
  References: `docs/wiki/09-decisions.md`; `docs/wiki/02-governance.md`; MADR template `https://github.com/adr/madr/blob/main/template/adr-template.md`; `.omo/drafts/future-wiki-enrichment.md` approval gate.
  Acceptance criteria: Existing decision IDs/status/approval records remain unchanged; templates use schema variables rather than IDs; promotion requires owner approval; inclusion/horizon never counts as approval.
  QA scenarios (Read + ID manifest): happy—a sample in-memory proposal cannot reach approved without owner/evidence fields; failure—template creates `WIKI-DEC-005` or auto-approves a roadmap row and is rejected. Evidence `.omo/evidence/task-6-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 7. Document proposed component implications without changing contracts
  What to do / Must NOT do: Update `07-reference/01-component-spec.md` with Current/Proposed/Deferred handling. Preserve every component contract and discrepancy. Proposed items cover audit candidates only: keyboard semantics for clickable cards/banners, accessible language toggle/labels, carousel localization, and map validation alignment. Do not claim WCAG compliance or redesign components.
  Parallelization: Wave 2 | Blocked by: 2-4 | Blocks: 13 | Owned paths: `docs/wiki/07-reference/01-component-spec.md`, `.omo/evidence/task-7-future-wiki-enrichment.md`
  References: `docs/wiki/07-reference/01-component-spec.md`; `src/components/center/CenterCard.jsx`; `src/components/MeetingBanner.jsx`; `src/components/layout/LangToggle.jsx`; `src/components/center/SnsLinks.jsx`; `src/components/center/ImageCarousel.jsx`; `src/components/center/NaverMapButton.jsx`; `docs/wiki/04-features.md` proposed roadmap matrix.
  Acceptance criteria: Current contracts/headings and known discrepancies remain; every proposed audit candidate links by plain reference to an existing roadmap theme/current ID, includes observable audit question, and is not implementation acceptance.
  QA scenarios (Read + contract-section hash comparison): happy—current contract sections match baseline and proposed audit list has no compliance claim; failure—new component API or redesign instruction fails. Evidence `.omo/evidence/task-7-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 8. Add data-hardening and content-operation candidates
  What to do / Must NOT do: Update `07-reference/02-data-schema.md` with Current/Proposed/Deferred handling. Preserve the schema and examples. Proposed candidates cover build-time contract validation, URL trimming, place-ID policy checks, i18n key/region parity, duplicate IDs, image-path checks, and a safe preview/review workflow for JSON/i18n/images. Content operations must not imply CMS/database/admin.
  Parallelization: Wave 2 | Blocked by: 2-4 | Blocks: 13 | Owned paths: `docs/wiki/07-reference/02-data-schema.md`, `.omo/evidence/task-8-future-wiki-enrichment.md`
  References: `docs/wiki/07-reference/02-data-schema.md`; `src/data/centers.json`; `src/data/config.json`; `src/i18n/ko.json`; `src/i18n/en.json`; `src/utils/naverMap.js`; `docs/wiki/04-features.md` data-hardening roadmap row.
  Acceptance criteria: Existing field definitions/invariants remain; every proposed validation maps to an observed risk and is marked non-implemented; CMS/database/admin models appear only Deferred; no new field is added.
  QA scenarios (Read + schema-field manifest): happy—baseline field set is identical and proposed checks cite evidence; failure—a new `openingHours` field or CMS schema is treated as current/proposed implementation and fails. Evidence `.omo/evidence/task-8-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 9. Add accessibility and i18n audit themes without redesign
  What to do / Must NOT do: Update `07-reference/03-ui-spec.md` with Current/Proposed/Deferred handling. Preserve current mobile-first visual contract. Add proposed audit questions for keyboard operation, focus visibility, semantic controls, accessible names, carousel labels, bilingual key parity/fallback, and map-link clarity. State no WCAG compliance evidence and no visual redesign approval.
  Parallelization: Wave 2 | Blocked by: 2-4 | Blocks: 13 | Owned paths: `docs/wiki/07-reference/03-ui-spec.md`, `.omo/evidence/task-9-future-wiki-enrichment.md`
  References: `docs/wiki/07-reference/03-ui-spec.md`; `src/components/center/CenterCard.jsx`; `src/components/MeetingBanner.jsx`; `src/components/layout/LangToggle.jsx`; `src/components/center/SnsLinks.jsx`; `src/components/center/ImageCarousel.jsx`; `src/i18n/ko.json`; `src/i18n/en.json`; `docs/wiki/04-features.md` current risks.
  Acceptance criteria: Existing tokens/layout/components remain; audit candidates are test questions with evidence paths; no compliance grade, redesign, design system, or personalized UI is proposed.
  QA scenarios (Read + forbidden-claim scan): happy—every candidate says audit/proposed and references current UI; failure—“WCAG compliant” or “redesign” outside Deferred fails. Evidence `.omo/evidence/task-9-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 10. Extend harness navigation and operating scenarios for documentation enrichment
  What to do / Must NOT do: Update `08-harness/01-index.md` and `02-operating-model.md` with Current/Proposed/Deferred framing, a documentation-enrichment context packet profile, and scenario matrix for single researcher, disjoint Wiki writers, cross-page integrator, stale resume, owner promotion, and deferred automation. Preserve all existing operating/cleanup rules.
  Parallelization: Wave 2 | Blocked by: 5, 6 | Blocks: 13 | Owned paths: `docs/wiki/08-harness/01-index.md`, `docs/wiki/08-harness/02-operating-model.md`, `.omo/evidence/task-10-future-wiki-enrichment.md`
  References: `docs/wiki/08-harness/01-index.md`; `docs/wiki/08-harness/02-operating-model.md`; `docs/wiki/08-harness/04-agent-contracts.md`; `docs/wiki/08-harness/05-worktree-and-ownership.md`; `docs/wiki/08-harness/06-quality-and-evolution.md`; `.omo/evidence/task-9-llm-wiki-methodology.md`.
  Acceptance criteria: Existing levels/schemas/cleanup text remain; scenario matrix labels current manual capability versus proposed metric/validator; documentation proposals cannot approve product scope.
  QA scenarios (Read + required-field scan): happy—each scenario names context, ownership, evidence, review, cleanup, and escalation; failure—Agent Teams/Hook described as current enforcement fails. Evidence `.omo/evidence/task-10-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 11. Add proposal isolation and review-contract fields
  What to do / Must NOT do: Update `08-harness/03-context-isolation.md` and `04-agent-contracts.md` with Current/Proposed/Deferred framing. Add proposal-specific packet/review fields: pages touched, existing IDs referenced, candidate themes, forbidden approvals, evidence strength, owner decision, current/proposed contamination check, and canonical delta status. Preserve identity, cleanup, timeout, and self-approval contracts.
  Parallelization: Wave 2 | Blocked by: 5, 6 | Blocks: 13 | Owned paths: `docs/wiki/08-harness/03-context-isolation.md`, `docs/wiki/08-harness/04-agent-contracts.md`, `.omo/evidence/task-11-future-wiki-enrichment.md`
  References: `docs/wiki/08-harness/03-context-isolation.md`; `docs/wiki/08-harness/04-agent-contracts.md`; `docs/wiki/02-governance.md`; `docs/wiki/09-decisions.md`; `.omo/drafts/future-wiki-enrichment.md` decisions; `docs/wiki/08-harness/03-context-isolation.md` prompt-injection/stale-state scenarios.
  Acceptance criteria: Existing contract fields remain; new fields are schema variables, not stable IDs; reviewer must reject unsupported Current claims and Proposed items worded as commitments; no automation is created.
  QA scenarios (Read + template instantiation): happy—sample proposed roadmap packet passes with unnumbered themes; failure—sample creates an approved REQ or imports external text as instruction and is rejected. Evidence `.omo/evidence/task-11-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 12. Add Wiki ownership metrics and automation entry criteria
  What to do / Must NOT do: Update `08-harness/05-worktree-and-ownership.md` and `06-quality-and-evolution.md` with Current/Proposed/Deferred framing. Mark canonical Wiki pages high-collision, require serialized integration for cross-page terminology, add documented health metrics (overlap blocks, stale resumes, cleanup failures, validator false positives, escalation count, decision latency), and specify evidence-based entry criteria for nonblocking validators, test runner, Hooks, CI, CODEOWNERS, PR templates, and optional Agent Teams. All automation remains Deferred.
  Parallelization: Wave 2 | Blocked by: 5, 6 | Blocks: 13 | Owned paths: `docs/wiki/08-harness/05-worktree-and-ownership.md`, `docs/wiki/08-harness/06-quality-and-evolution.md`, `.omo/evidence/task-12-future-wiki-enrichment.md`
  References: `docs/wiki/08-harness/05-worktree-and-ownership.md`; `docs/wiki/08-harness/06-quality-and-evolution.md`; `package.json`; `docs/wiki/09-decisions.md`; `.omo/evidence/task-9-llm-wiki-methodology.md`; `.omo/evidence/final-F4-llm-wiki-methodology.md`.
  Acceptance criteria: Existing ownership/cleanup gates remain; metrics define collection method and interpretation without claimed baseline values; every automation stage has entry/evidence/owner/rollback fields and remains Deferred.
  QA scenarios (Read + status/automation scan): happy—metrics and entry criteria are documentation-only; failure—Hook/CI/test runner described as enabled or required now fails. Evidence `.omo/evidence/task-12-future-wiki-enrichment.md`.
  Commit: N | No commit unless explicitly requested.

- [ ] 13. Reconcile all pages and prove no proposal became a commitment
  What to do / Must NOT do: Serial integration pass over the 16 exact Wiki files listed under Owned paths. Normalize Current/Proposed/Deferred wording, priority order, candidate theme names, cross-links, and Deferred scope. Remove duplication while preserving page-specific detail. Compare post-edit IDs, aliases, current contract hashes/headings, H1 titles, numbered tree, and the complete Task 1 project-controlled path/hash manifest. Content differences/new files are allowed only in the 16 exact Wiki files and `.omo/evidence/task-1-future-wiki-enrichment.json`, `.omo/evidence/task-2-future-wiki-enrichment.md`, `.omo/evidence/task-3-future-wiki-enrichment.md`, `.omo/evidence/task-4-future-wiki-enrichment.md`, `.omo/evidence/task-5-future-wiki-enrichment.md`, `.omo/evidence/task-6-future-wiki-enrichment.md`, `.omo/evidence/task-7-future-wiki-enrichment.md`, `.omo/evidence/task-8-future-wiki-enrichment.md`, `.omo/evidence/task-9-future-wiki-enrichment.md`, `.omo/evidence/task-10-future-wiki-enrichment.md`, `.omo/evidence/task-11-future-wiki-enrichment.md`, `.omo/evidence/task-12-future-wiki-enrichment.md`, and `.omo/evidence/task-13-future-wiki-enrichment.json`. Orchestrator state may differ only at the four Task 1 group-C locations. Final F1-F4 evidence is created only after Task 13. Do not expand scope or rewrite historical `.omo` evidence.
  Parallelization: Integration | Blocked by: 1-12 | Blocks: F1-F4 | Owned paths: `docs/wiki/01-index.md`, `docs/wiki/02-governance.md`, `docs/wiki/03-product.md`, `docs/wiki/04-features.md`, `docs/wiki/05-architecture.md`, `docs/wiki/06-tdd-qa.md`, `docs/wiki/07-reference/01-component-spec.md`, `docs/wiki/07-reference/02-data-schema.md`, `docs/wiki/07-reference/03-ui-spec.md`, `docs/wiki/08-harness/01-index.md`, `docs/wiki/08-harness/02-operating-model.md`, `docs/wiki/08-harness/03-context-isolation.md`, `docs/wiki/08-harness/04-agent-contracts.md`, `docs/wiki/08-harness/05-worktree-and-ownership.md`, `docs/wiki/08-harness/06-quality-and-evolution.md`, `docs/wiki/09-decisions.md`, `.omo/evidence/task-13-future-wiki-enrichment.json`
  References: `.omo/evidence/task-1-future-wiki-enrichment.json`; `.omo/evidence/task-2-future-wiki-enrichment.md`; `.omo/evidence/task-3-future-wiki-enrichment.md`; `.omo/evidence/task-4-future-wiki-enrichment.md`; `.omo/evidence/task-5-future-wiki-enrichment.md`; `.omo/evidence/task-6-future-wiki-enrichment.md`; `.omo/evidence/task-7-future-wiki-enrichment.md`; `.omo/evidence/task-8-future-wiki-enrichment.md`; `.omo/evidence/task-9-future-wiki-enrichment.md`; `.omo/evidence/task-10-future-wiki-enrichment.md`; `.omo/evidence/task-11-future-wiki-enrichment.md`; `.omo/evidence/task-12-future-wiki-enrichment.md`; `.omo/drafts/future-wiki-enrichment.md`; `docs/wiki/01-index.md`; `docs/wiki/02-governance.md`; `docs/wiki/03-product.md`; `docs/wiki/04-features.md`; `docs/wiki/05-architecture.md`; `docs/wiki/06-tdd-qa.md`; `docs/wiki/07-reference/01-component-spec.md`; `docs/wiki/07-reference/02-data-schema.md`; `docs/wiki/07-reference/03-ui-spec.md`; `docs/wiki/08-harness/01-index.md`; `docs/wiki/08-harness/02-operating-model.md`; `docs/wiki/08-harness/03-context-isolation.md`; `docs/wiki/08-harness/04-agent-contracts.md`; `docs/wiki/08-harness/05-worktree-and-ownership.md`; `docs/wiki/08-harness/06-quality-and-evolution.md`; `docs/wiki/09-decisions.md`.
  Acceptance criteria: All 16 pages pass the objective state contract; exact stable-ID set and aliases equal baseline; numbered tree/H1/link graph unchanged; historical `.omo/evidence` files and every forbidden surface have identical path/hash manifests; content/evidence diffs are limited to numbered Wiki Markdown and explicitly named new `future-wiki-enrichment` evidence files, and any orchestrator-state diffs are limited to Task 1 group C; roadmap priority is consistent; forbidden commitments/claims are absent.
  QA scenarios (Node full-tree validator + Read): happy—zero link/status/ID/scope/wording failures; failure—in-memory mutation adding `REQ-999`, “will build search,” “WCAG compliant,” or enabled Hook is rejected. Evidence `.omo/evidence/task-13-future-wiki-enrichment.json`.
  Commit: N | No commit unless explicitly requested.

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit — read-only Oracle verifies every page, baseline manifest, roadmap order, stable-ID equality, and all evidence; writes `.omo/evidence/final-F1-future-wiki-enrichment.md`.
- [ ] F2. Documentation quality audit — independent reviewer checks duplication, readability, Current/Proposed/Deferred consistency, dead links, unsupported claims, and candidate-theme centralization; writes `.omo/evidence/final-F2-future-wiki-enrichment.md`.
- [ ] F3. Deterministic Obsidian/LLM navigation QA — independent QA walks the numbered order and proposal-review workflow, runs full-tree validator, build, and lint baseline; writes `.omo/evidence/final-F3-future-wiki-enrichment.txt`.
- [ ] F4. Scope/security audit — read-only reviewer proves no product/data/package/root/rules/Git-state drift, no secrets, no approval laundering, and no deferred automation implementation; writes `.omo/evidence/final-F4-future-wiki-enrichment.md`.

## Commit strategy
- No commits unless explicitly requested.
- If later requested, split by independent concern: governance/product roadmap; architecture/reference implications; TDD/harness maturity; final cross-page reconciliation.
- Never include `.omo/evidence`, runtime continuation state, `.obsidian`, or local settings in a documentation commit unless separately approved.

## Success criteria
- All 16 numbered Wiki pages communicate Current, Proposed, and Deferred content without mixing status or horizon.
- Existing stable IDs, legacy aliases, current contracts, H1 titles, numbered paths, and active links remain intact.
- Future roadmap themes are unnumbered, reversible, evidence-backed, and explicitly not approved.
- Data hardening precedes accessibility/i18n, content operations, and conditional search/sort everywhere.
- Static SPA remains the only current architecture; backend/CMS/auth/payment/reservation/analytics/notifications remain Deferred.
- Test runner and harness automation remain unselected and unimplemented, with measurable entry criteria only.
- Full validator, build, and lint non-regression checks pass, and all four final reviewers approve.
