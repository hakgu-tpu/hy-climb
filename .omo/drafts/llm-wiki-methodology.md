---
slug: llm-wiki-methodology
status: plan-generated
intent: clear
pending-action: await explicit execution or high-accuracy review choice
approach: Build a repo-local canonical wiki and a documentation-first multi-agent harness; keep Claude routing thin, isolate concurrent writers with worktrees and path ownership, and defer hooks/test-stack automation.
---

# Draft: llm-wiki-methodology

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
<!-- id | outcome (one line) | status: active|deferred | evidence path -->
| id | outcome | status | evidence path |
| --- | --- | --- | --- |
| C1 | Canonical human+LLM project wiki with stable traceability IDs | active | `docs/wiki/` |
| C2 | TDD/QA plan linking requirements, use cases, features, code, and evidence | active | `docs/wiki/tdd-qa.md`, `docs/wiki/features.md` |
| C3 | Multi-agent operating model for subagents, concurrent sessions, and human teams | active | `docs/wiki/harness/` |
| C4 | Prompt isolation and delegation/handoff contracts | active | `docs/wiki/harness/context-isolation.md`, `docs/wiki/harness/agent-contracts.md` |
| C5 | Worktree, ownership, review, and conflict-control protocol | active | `docs/wiki/harness/worktree-and-ownership.md` |
| C6 | Thin Claude Code routing layer that points to canonical wiki pages | active | `CLAUDE.md`, `.claude/rules/` |
| C7 | Hooks, CI, scheduler, and test framework automation | deferred | `docs/wiki/harness/quality-and-evolution.md` |

## Open assumptions (announced defaults)
<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
<!-- assumption | adopted default | rationale | reversible? -->
| assumption | adopted default | rationale | reversible? |
| --- | --- | --- | --- |
| Wiki location | `docs/wiki/` in the repository | Versioned with code and available to humans and agents | yes |
| Canonical approval | Human owner approves durable wiki/ADR changes; writer cannot self-approve | Prevents agent assumptions becoming policy | yes |
| MVP optimization | Solo/small-team speed with protocols that scale to multiple humans | Current app is small; heavy governance would be waste | yes |
| Harness enforcement | Documentation and thin scoped rules first | Manual protocol must stabilize before hooks automate it | yes |
| Test strategy | TDD plan and acceptance cases only; no test framework installation | Matches approved scope | yes |

## Findings (cited - path:lines)
- `CLAUDE.md:1-89` is the only shared project instruction file and references a `docs/` structure that does not currently exist.
- `package.json:6-12` exposes dev/build/lint/preview only; there is no automated test command.
- Verified baseline: `npm run lint` reports exactly one pre-existing `react-refresh/only-export-components` error at `src/contexts/LangContext.jsx:43:14`; this documentation scope uses a no-new-diagnostics gate rather than modifying product code.
- `component-spec.md`, `data-schema.md`, `ui-spec.md`, and `tasks.md` contain scattered feature/use-case contracts but no end-to-end traceability matrix.
- `.claude/settings.local.json:1` is local permission state, not a suitable team policy source.
- Official Claude Code docs: `CLAUDE.md` context is concatenated; `.claude/rules/*.md` supports path-scoped loading; subagents have fresh contexts; worktrees are the file-isolation primitive; agent teams remain experimental.
- High-collision paths include `src/App.jsx`, `src/contexts/LangContext.jsx`, `src/data/*.json`, `src/i18n/*.json`, and canonical wiki pages.

## Decisions (with rationale)
- Audience is balanced human+LLM: Korean explanatory prose plus stable machine-readable IDs and tables.
- Wiki becomes canonical; root instructions and scoped rules are derived routing layers and must link back to wiki anchors.
- Trace chain is `STK -> GOAL -> REQ -> UC -> FEAT -> code path -> acceptance/test evidence`; IDs are stable and never recycled.
- Canonical IDs use three-digit suffixes (`STK-001`, `GOAL-001`, `REQ-001`, `UC-001`, `FEAT-001`); existing `UC01`-style IDs remain legacy aliases mapped by number.
- Harness covers three levels explicitly: subagents, concurrent local agent instances, and multiple humans operating agents.
- Context packets include role, allowed sources, owned paths, forbidden paths/assumptions, output artifact, acceptance criteria, and escalation conditions.
- Writer, reviewer, and integrator are logically separate; no writer approves its own canonical change.
- Concurrent writers use separate worktrees and disjoint path ownership; shared-write parallelism is forbidden.
- Hooks, CI, generated context packets, scheduler automation, and test framework setup are roadmap items, not MVP deliverables.
- Root legacy specifications become redirect-only stubs after migration; `.claude/settings.local.json` is preserved locally but removed from Git tracking and ignored.

## Scope IN
- Canonical wiki information architecture and migration of existing project specifications.
- Stakeholders, goals, requirements, use cases, feature catalog, architecture, and traceability.
- TDD/QA policy with planned unit, contract, component, routing, and later E2E scenarios.
- Multi-agent operating model, context isolation, delegation contracts, artifact handoffs, ownership, reviews, quality gates, and evolution.
- Thin `CLAUDE.md` and `.claude/rules` routing to canonical pages.
- Agent-executable documentation validation and unchanged app build/lint verification.

## Scope OUT (Must NOT have)
- No Vitest, Testing Library, Playwright, CI, blocking hooks, or orchestration scheduler implementation.
- No experimental Agent Teams dependency for the MVP workflow.
- No duplicated policy bodies in `CLAUDE.md` or `.claude/rules`.
- No shared-write parallelism and no direct integration from unreviewed agent output.
- No new product features or backend/auth/CMS scope.

## Open questions
- None. User selected balanced human+LLM audience, wiki as canonical source, and wiki plus TDD plan; the expanded harness design was explicitly requested.

## Approval gate
status: approved-and-planned
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->
Approval evidence: user answered owner-decision questions and then requested proceeding with the mutually reinforcing multi-agent harness scope.
