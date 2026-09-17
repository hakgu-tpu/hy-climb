# llm-wiki-methodology - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** A single trustworthy project wiki that connects stakeholders, requirements, use cases, features, architecture, and planned tests. It also defines how multiple AI agents and human operators divide work, exchange evidence, review independently, and avoid overwriting each other.

**Why this approach:** The wiki holds durable knowledge while the harness loads only the relevant slice for each task. Parallel work is isolated by ownership and separate workspaces, so adding agents does not multiply prompt size, conflicting rules, or unreviewed assumptions.

**What it will NOT do:** It will not install a test framework, add CI or blocking hooks, build an agent scheduler, or depend on experimental agent-team features. It will not invent new product functionality.

**Effort:** Medium
**Risk:** Medium - moving scattered specifications into one canonical structure requires careful link and terminology reconciliation.
**Decisions to sanity-check:** The wiki is authoritative; humans approve durable policy changes; concurrent writers use separate worktrees; automation is deferred until the manual protocol is proven.

Your next move: start execution, or request the optional high-accuracy plan review first. Full execution detail follows below.

---

> TL;DR (machine): Medium-effort documentation architecture; deliver canonical traceability wiki, multi-agent harness contracts, scoped Claude routing, and TDD plan without test/hook/CI implementation.

## Scope
### Must have
- `docs/wiki/README.md` as the canonical entry point, reading order, authority model, and update workflow.
- Stable `STK`, `GOAL`, `REQ`, `UC`, and `FEAT` IDs with end-to-end traceability to code paths and planned evidence.
- Exact ID policy: canonical IDs use a three-digit suffix (`STK-001`, `GOAL-001`, `REQ-001`, `UC-001`, `FEAT-001`); existing `UC01`-style identifiers remain searchable legacy aliases mapped to the matching canonical number; deprecated IDs are never recycled.
- Canonical project pages for product, features, architecture, TDD/QA, governance, and decisions.
- Harness pages covering subagents, concurrent agent instances, and multiple humans using agents.
- Bounded context-packet, delegation, handoff, ownership, writer/reviewer/integrator, and escalation templates.
- One-worktree-per-concurrent-writer and one-owner-per-path rules; no shared-write parallelism.
- Thin root `CLAUDE.md` and path-scoped `.claude/rules/*.md` files that route to, rather than duplicate, the wiki.
- Migration or retirement of root `component-spec.md`, `data-schema.md`, `ui-spec.md`, and `tasks.md` so there is one canonical location.
- Documentation validation, `npm run build` success, and a lint non-regression gate against the verified baseline of exactly one pre-existing `react-refresh/only-export-components` error at `src/contexts/LangContext.jsx:43:14`.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not install Vitest, Testing Library, Playwright, or any other test dependency.
- Do not add CI, blocking Hooks, permissions policy, generated context tooling, or an agent scheduler.
- Do not rely on experimental Claude Code Agent Teams; document it only as a later option.
- Do not copy full wiki policies into `CLAUDE.md`, `.claude/rules`, prompts, or plan artifacts.
- Do not allow two parallel writers to modify the same path or let a writer approve its own work.
- Do not add backend, authentication, CMS, analytics, or other unapproved product scope.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: TDD-at-specification-level. Acceptance cases are written before future implementation; no automated test framework is introduced in this plan.
- Per-task documentation checks: exact file existence, heading/ID/link assertions, orphan-ID detection, and forbidden-duplication checks using read/grep or one-off Node commands.
- Repository safety gates: `npm run build` must exit 0. `npm run lint` currently exits nonzero with exactly one pre-existing error at `src/contexts/LangContext.jsx:43:14` (`react-refresh/only-export-components`); post-change output must contain that same single diagnostic and no additional or changed diagnostics. Fixing that product-code baseline is outside this documentation plan.
- Evidence: .omo/evidence/task-<N>-llm-wiki-methodology.<ext>

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.
- Wave 1 (five disjoint wiki foundations): canonical index/governance, product model, architecture migration, TDD/QA plan, and harness operating model.
- Wave 2 (five integration artifacts): feature traceability, agent contracts, worktree governance, maturity roadmap/decisions, and thin routing/migration cleanup. Todos 6-9 may start as soon as their dependency-matrix prerequisites pass; Todo 10 is the only full integration pass and waits for Todos 1-9.
- Parallel workers must use separate worktrees and may modify only the paths assigned in their todo. Todo 10 resolves all final cross-links after earlier artifacts are complete.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | none | 6, 9, 10 | 2, 3, 4, 5 |
| 2 | none | 6, 10 | 1, 3, 4, 5 |
| 3 | none | 6, 10 | 1, 2, 4, 5 |
| 4 | none | 6, 10 | 1, 2, 3, 5 |
| 5 | none | 7, 8, 9, 10 | 1, 2, 3, 4 |
| 6 | 1, 2, 3, 4 | 10 | 7, 8, 9 |
| 7 | 5 | 10 | 6, 8, 9 |
| 8 | 5 | 10 | 6, 7, 9 |
| 9 | 1, 5 | 10 | 6, 7, 8 |
| 10 | 1-9 | F1-F4 | none |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [x] 1. Establish the canonical wiki entry point and governance rules
  What to do / Must NOT do: Create `docs/wiki/README.md` and `docs/wiki/governance.md`. Document the plan-specified three-digit ID and legacy-alias policy, audience, reading order, authority hierarchy, current/proposed/deprecated status labels, canonical-delta workflow, human approval for durable decisions, and a no-copy rule for derived prompts/routing files. Do not invent a different ID format or duplicate detailed product/harness content.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 6, 9, 10 | Owned paths: `docs/wiki/README.md`, `docs/wiki/governance.md`
  References (executor has NO interview context - be exhaustive): `CLAUDE.md:1-89`; `README.md:1-15`; official Claude memory docs `https://code.claude.com/docs/en/memory.md`; decisions in `.omo/drafts/llm-wiki-methodology.md`.
  Acceptance criteria (agent-executable): Both files exist; README declares `docs/wiki/` canonical; all five prefixes and the exact `XXX-001` format are defined; legacy aliases such as `UC01 -> UC-001` are specified; governance prohibits ID recycling, writer self-approval, and silent canonical changes; zero `TODO`, `<fill>`, or placeholder markers remain.
  QA scenarios (Read + Grep): happy—follow README reading order and resolve every referenced local page; failure—search for an authority rule that permits prompt history or `CLAUDE.md` to override the wiki and return zero matches. Evidence `.omo/evidence/task-1-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 2. Build the stakeholder-to-use-case product model
  What to do / Must NOT do: Create `docs/wiki/product.md` from existing behavior only. Catalog stakeholders, goals, functional/non-functional requirements, use cases, priorities, preconditions, normal/alternate/failure flows, and acceptance statements. Preserve existing UC meanings while normalizing IDs; do not invent future features.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 6, 10 | Owned path: `docs/wiki/product.md`
  References: `CLAUDE.md:1-89`; `component-spec.md`; `data-schema.md`; `tasks.md`; `src/pages/HomePage.jsx`; `src/pages/CenterDetailPage.jsx`; `src/components/EventBanner.jsx`; `src/components/MeetingBanner.jsx`.
  Acceptance criteria: Every active use case found in the existing specs/tasks has exactly one canonical `UC-*` entry; every `REQ-*` links to at least one `STK-*`, `GOAL-*`, and `UC-*`; each use case includes one failure or edge path.
  QA scenarios (Grep + Read): happy—sample list browsing, region filtering, map routing, language switching, event/meeting banners, and detail behavior resolve end-to-end; failure—detect and report any orphan `REQ-*` or duplicate ID. Evidence `.omo/evidence/task-2-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 3. Consolidate current architecture and detailed contracts
  What to do / Must NOT do: Create `docs/wiki/architecture.md` plus `docs/wiki/reference/{component-spec,data-schema,ui-spec}.md` by migrating and correcting current root specifications. Record actual Vite/React Router/Tailwind versions from `package.json`, static JSON runtime, routing/redirects, i18n, external navigation, component boundaries, data contracts, known policy/implementation discrepancies, and explicit non-goals. Do not copy live center records into prose.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 6, 10 | Owned paths: `docs/wiki/architecture.md`, `docs/wiki/reference/*.md`
  References: `package.json`; `vite.config.js`; `src/App.jsx`; `public/_redirects`; `src/data/*.json`; `src/i18n/*.json`; root `component-spec.md`, `data-schema.md`, `ui-spec.md`; `src/utils/naverMap.js`; `src/components/center/NaverMapButton.jsx`.
  Acceptance criteria: Architecture versions match `package.json`; `architecture.md` contains the headings `System boundary`, `Runtime flow`, `Routing`, `Data and i18n`, `External integrations`, `Deployment`, `Constraints and non-goals`, and `Known discrepancies`; each reference page contains `Purpose`, `Contract`, `Invariants`, `Validation`, and `Code references`; zero unresolved local links or placeholder markers remain; `NaverMapButton` validation-policy discrepancy is recorded as current status rather than silently fixed.
  QA scenarios (Read + Bash `npm run build`): happy—trace app bootstrap through routes, pages, data, and deployment redirect; failure—compare documented dependency majors against `package.json` and fail on mismatch. Evidence `.omo/evidence/task-3-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 4. Define the TDD and QA specification contract
  What to do / Must NOT do: Create `docs/wiki/tdd-qa.md`. Define Red-Green-Refactor at requirement/use-case level, test pyramid, naming/fixture/mock rules, executable acceptance format, regression policy, completion definition, and planned layers: JSON contract, utilities, components, routing integration, and later browser E2E. Catalog prioritized planned cases for `naverMap.js`, `formatEventDate.js`, `LangContext`, filtering, map buttons, routes, data/i18n, event/meeting banners. Do not install or configure a framework.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 6, 10 | Owned path: `docs/wiki/tdd-qa.md`
  References: `package.json:6-12`; `src/utils/naverMap.js`; `src/utils/formatEventDate.js`; `src/contexts/LangContext.jsx`; `src/components/center/CenterFilter.jsx`; `src/components/center/NaverMapButton.jsx`; `src/pages/CenterDetailPage.jsx`; `tasks.md` manual checks.
  Acceptance criteria: Each planned case states linked requirement/use case, precondition, action, expected result, failure/edge result, target layer, and planned tool; page explicitly states no test runner currently exists and installation is out of scope.
  QA scenarios (Grep + Read): happy—each test layer has at least one concrete case; failure—search `package.json` and lockfile diff to prove no dependency/script was added. Evidence `.omo/evidence/task-4-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 5. Define the three-level multi-agent operating model and context isolation
  What to do / Must NOT do: Create `docs/wiki/harness/operating-model.md` and `docs/wiki/harness/context-isolation.md`. Separately define subagents, concurrent Claude Code instances, and human team agents; explain fresh context windows, canonical context packets, allowed sources, forbidden assumptions, minimal context loading, path-scoped rules, stale-context handling, and when worktrees are mandatory. Correct the false assumptions that `CLAUDE.md` is enforcement or that parent conversation context automatically transfers.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 7, 8, 9, 10 | Owned paths: `docs/wiki/harness/operating-model.md`, `docs/wiki/harness/context-isolation.md`
  References: official docs `https://code.claude.com/docs/en/sub-agents.md`, `memory.md`, `worktrees.md`, `agent-teams.md`, `settings.md`, `permissions.md`; current `CLAUDE.md`; `.claude/settings.local.json`.
  Acceptance criteria: All three levels have distinct isolation, ownership, communication, review, and escalation rules; context packet schema includes role, goal, canonical links, inputs, owned/forbidden paths, constraints, output, acceptance, evidence, and stop/escalation conditions.
  QA scenarios (Read): happy—simulate one task at each level and identify the exact context packet and isolation mechanism; failure—scenario where two writers claim one path must be rejected before execution. Evidence `.omo/evidence/task-5-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 6. Create the feature catalog and end-to-end traceability matrix
  What to do / Must NOT do: Create `docs/wiki/features.md` after product, architecture, and TDD pages stabilize. Use one row per feature linking stakeholder, goal, requirement, use case, feature, code paths, acceptance/test case, status, and known risks. Do not create IDs for source files or concrete future test files; reference them by path/planned name.
  Parallelization: Wave 2 | Blocked by: 1, 2, 3, 4 | Blocks: 10 | Owned path: `docs/wiki/features.md`
  References: `docs/wiki/product.md`; `docs/wiki/architecture.md`; `docs/wiki/tdd-qa.md`; `src/components/**`; `src/pages/**`; `src/utils/**`; `src/data/**`.
  Acceptance criteria: Every active `REQ-*`, `UC-*`, and `FEAT-*` appears in the matrix; every feature has at least one code path and one acceptance/test reference; no orphan or duplicate IDs remain.
  QA scenarios (one-off Node ID scan + Read): happy—scan wiki Markdown and report zero orphan requirement/use-case/feature IDs; failure—temporary in-memory sample containing an orphan ID is rejected by the same scan logic without modifying repository files. Evidence `.omo/evidence/task-6-llm-wiki-methodology.txt`.
  Commit: N | No commit unless explicitly requested.

- [x] 7. Define delegation contracts, role separation, and artifact handoffs
  What to do / Must NOT do: Create `docs/wiki/harness/agent-contracts.md` with reusable researcher, writer, reviewer, QA, and integrator templates. Require scope, inputs, allowed sources, owned/forbidden paths, output schema, evidence, quality checks, stop/escalation criteria, and canonical-delta proposal. Define writer/reviewer independence and that only the integrator updates shared canonical artifacts after approval.
  Parallelization: Wave 2 | Blocked by: 5 | Blocks: 10 | Owned path: `docs/wiki/harness/agent-contracts.md`
  References: `docs/wiki/harness/operating-model.md`; `docs/wiki/harness/context-isolation.md`; official `sub-agents.md` and `hooks.md`; `.omo/plans/llm-wiki-methodology.md` delegation structure.
  Acceptance criteria: Every role template contains all required contract fields; reviewer template is read-only by default; handoff lifecycle is `draft -> evidence -> independent review -> integration -> wiki delta`; self-approval is explicitly invalid.
  QA scenarios (Read): happy—instantiate a sample read-only review contract and verify no write authority; failure—an underspecified “make it better” contract fails the documented delegation gate. Evidence `.omo/evidence/task-7-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 8. Define worktree isolation, ownership, and conflict-resolution protocol
  What to do / Must NOT do: Create `docs/wiki/harness/worktree-and-ownership.md`. Specify one worktree/branch per concurrent writer, unique task IDs, path claims, high-collision paths, read-sharing vs write exclusivity, integrator merge order, stale-base checks, handback, cleanup, and human-team conflict escalation. Agent Teams must be described as experimental and not an isolation boundary.
  Parallelization: Wave 2 | Blocked by: 5 | Blocks: 10 | Owned path: `docs/wiki/harness/worktree-and-ownership.md`
  References: official `worktrees.md` and `agent-teams.md`; `src/App.jsx`; `src/contexts/LangContext.jsx`; `src/data/*.json`; `src/i18n/*.json`; `docs/wiki/` canonical pages.
  Acceptance criteria: Protocol forbids overlapping write claims; names exact high-collision paths; distinguishes subagent context isolation from filesystem isolation; defines pre-merge lint/build/evidence checks and integrator-only reconciliation; includes a deterministic dry-run template with task ID, worktree, owned paths, forbidden paths, base revision, handoff, and merge decision fields.
  QA scenarios (Read): happy—two disjoint component tasks receive separate worktrees/path claims and can proceed; failure—two tasks touching `src/data/centers.json` are serialized or repartitioned, never launched as shared writers. Evidence `.omo/evidence/task-8-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 9. Define harness quality gates, decisions, and staged evolution
  What to do / Must NOT do: Create `docs/wiki/harness/quality-and-evolution.md` and `docs/wiki/decisions.md`. Define scope, canonical consistency, delegation, independent review, ownership, QA, and owner-decision gates. Record ADR-lite entries for wiki authority, context isolation, worktree ownership, and deferred automation. Stage later additions: nonblocking validators, then `SubagentStop`, CI/CODEOWNERS/PR templates, then optional agent-team orchestration. Do not add actual settings/hooks/scripts.
  Parallelization: Wave 2 | Blocked by: 1, 5 | Blocks: 10 | Owned paths: `docs/wiki/harness/quality-and-evolution.md`, `docs/wiki/decisions.md`
  References: official `hooks.md`, `settings.md`, `permissions.md`, `agent-teams.md`; `docs/wiki/governance.md`; `.claude/settings.local.json`.
  Acceptance criteria: Each gate has machine-checkable pass/fail evidence; roadmap has explicit entry criteria; `SubagentStop` is limited to objective missing-evidence/handoff checks and uses current schema/exit semantics; no current automation file is created.
  QA scenarios (Read + directory diff): happy—trace a rejected handoff back to a concrete failed gate; failure—subjective architecture disagreement cannot be encoded as a blocking Hook. Evidence `.omo/evidence/task-9-llm-wiki-methodology.md`.
  Commit: N | No commit unless explicitly requested.

- [x] 10. Integrate canonical docs, retire duplicate roots, and add thin Claude routing
  What to do / Must NOT do: After Todos 1-9, update `README.md` and `CLAUDE.md` to point to the wiki. Replace root `component-spec.md`, `data-schema.md`, `ui-spec.md`, and `tasks.md` with short non-authoritative redirect stubs to their exact `docs/wiki/` successors; retain no original policy/body paragraphs. Create exactly three thin rules: `.claude/rules/product-source.md` with `paths` for `src/**/*`, `public/**/*`, `package.json`, `vite.config.js`, and `index.html`; `.claude/rules/wiki-harness.md` with `paths` for `docs/wiki/**/*`, `.omo/plans/**/*`, `.omo/drafts/**/*`, `CLAUDE.md`, and `README.md`; `.claude/rules/quality-test.md` with `paths` for `docs/wiki/tdd-qa.md`, `docs/wiki/features.md`, `src/**/*.test.*`, `src/**/*.spec.*`, and `tests/**/*`. Each rule only instructs the agent to read named canonical pages. Add `.claude/settings.local.json` to `.gitignore`; using the git-master workflow, run `git rm --cached -- .claude/settings.local.json` so the tracked local configuration is removed from the repository index while preserved in the working tree. Do not place full policies in routing files and do not add Hooks/team settings automation.
  Parallelization: Wave 2 integration | Blocked by: 1-9 | Blocks: F1-F4 | Owned paths: `README.md`, `CLAUDE.md`, root legacy docs, `.claude/rules/*.md`, `.gitignore`, `.claude/settings.local.json` index state, all wiki cross-links
  References: all `docs/wiki/**`; current `CLAUDE.md`; current root specs; official `memory.md` and `claude-directory.md`; `.gitignore`.
  Acceptance criteria: README is product-specific; CLAUDE is concise and points to canonical pages; each root legacy doc contains only a deprecation notice and successor link; the three named rules exist with exactly the specified path groups and canonical links; no routing/root-stub file contains a copied wiki paragraph of three or more consecutive nonblank lines; `.gitignore` includes `.claude/settings.local.json`; `GIT_MASTER=1 git ls-files --error-unmatch .claude/settings.local.json` fails while the local file remains present; zero unresolved local links, `TODO`, `<fill>`, or placeholder markers remain; `npm run build` exits 0; `npm run lint` reports only the verified pre-existing `src/contexts/LangContext.jsx:43:14 react-refresh/only-export-components` error and no new diagnostics.
  QA scenarios (Bash + Read): happy—start from README and CLAUDE and resolve product, feature, architecture, TDD, and harness guidance without dead links; failure—compare representative routing text with wiki and fail if a full policy is duplicated or a link is missing. Evidence `.omo/evidence/task-10-llm-wiki-methodology.txt`.
  Commit: N | No commit unless explicitly requested.

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — a read-only Oracle who did not write/integrate the audited artifacts verifies every must-have, trace chain, three-level harness rule, and per-task evidence; writes `.omo/evidence/final-F1-llm-wiki-methodology.md`; rejects omissions or unapproved automation.
- [x] F2. Documentation structure audit — a read-only reviewer who did not write/integrate the audited artifacts verifies required headings, exact ID format, zero orphan IDs, zero dead local links, dependency-version parity, zero placeholder markers, and zero copied policy paragraphs of three or more consecutive nonblank lines; writes `.omo/evidence/final-F2-llm-wiki-methodology.md`.
- [x] F3. Deterministic workflow dry-run — an independent QA agent uses only the written templates to simulate one subagent, one worktree-isolated concurrent instance, and one human-team handoff from context packet through path claim, review, integration decision, and wiki delta; no live Agent Team is required. It alone may run commands and write `.omo/evidence/final-F3-llm-wiki-methodology.txt`; `npm run build` must exit 0, and `npm run lint` must match the one-error verified baseline exactly with no new diagnostics.
- [x] F4. Scope fidelity/security audit — a read-only reviewer who did not write/integrate the audited artifacts confirms no test framework, CI, Hook, scheduler, experimental-team dependency, product feature, secret, unsafe permission expansion, or tracked local settings file was introduced; writes `.omo/evidence/final-F4-llm-wiki-methodology.md`.

## Commit strategy
- No commits are created unless the user explicitly requests them.
- If later requested, use atomic documentation commits: canonical wiki foundations; harness/TDD model; routing and legacy-doc migration.
- `.claude/settings.local.json` must be untracked and ignored while remaining available locally; local agent logs and transient evidence are not committed unless the user explicitly changes the policy.

## Success criteria
- `docs/wiki/` is the sole canonical source for product methodology, architecture, quality, and harness policy.
- Every active requirement and use case traces through feature, code path, and planned acceptance/test evidence.
- The harness separately governs subagents, concurrent agent instances, and human team agents.
- Context is bounded by explicit packets and path-scoped routing; parent chat history is never an implicit dependency.
- Concurrent writers use separate worktrees and disjoint path ownership; writer, reviewer, and integrator duties are separated.
- Existing root documentation is migrated or reduced to non-authoritative routing without broken links.
- No test framework, CI, Hook automation, scheduler, or new product scope is added.
- Documentation checks and `npm run build` pass; lint has no regression beyond the explicitly recorded single pre-existing diagnostic; all four final reviewers approve.
