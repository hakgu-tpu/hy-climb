---
slug: future-wiki-enrichment
status: plan-generated-reviewing
intent: unclear
pending-action: complete automatic high-accuracy review, then offer execution
approach: Enrich all 16 numbered Wiki pages with evidence-backed Current sections, unnumbered reversible Proposed themes, and explicit Deferred boundaries while preserving the static SPA and every existing stable ID.
---

# Draft: future-wiki-enrichment

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
<!-- id | outcome (one line) | status: active|deferred | evidence path -->
| id | outcome | status | evidence path |
| --- | --- | --- | --- |
| C1 | Shared Current/Proposed/Deferred vocabulary and immutable ID baseline | active | `01-index.md`, `02-governance.md`, task-1 evidence |
| C2 | Future product themes and traceable roadmap without approval laundering | active | `03-product.md`, `04-features.md` |
| C3 | Proportionate static-SPA architecture and quality evolution | active | `05-architecture.md`, `06-tdd-qa.md` |
| C4 | Reference-page implications for components, data, and UI | active | `07-reference/**` |
| C5 | Multi-agent governance and automation entry criteria | active | `08-harness/**` |
| C6 | Proposal promotion and decision boundaries | active | `09-decisions.md` |
| C7 | Runtime implementation, test stack, backend, CMS, auth, payments, analytics | deferred | Deferred sections only |

## Open assumptions (announced defaults)
<!-- Intent is UNCLEAR: research resolves ambiguity, defaults are adopted (not asked), and each is surfaced in the plan's human TL;DR for veto. -->
<!-- assumption | adopted default | rationale | reversible? -->
| assumption | adopted default | rationale | reversible? |
| --- | --- | --- | --- |
| Future content status | All new ideas are unnumbered `Proposed` or `Deferred` | Stable IDs are permanent and inclusion must not imply approval | yes |
| Product boundary | Preserve mobile-first static Vite SPA | Current scale and code do not justify platform expansion | yes |
| Priority | Data hardening, then accessibility/i18n audit, then content operations, then conditional search/sort | Strongest current evidence and lowest architecture cost | yes |
| Search/sort | Growth-triggered, not needed now | Eleven centers and existing filters do not prove need | yes |
| Accessibility | Audit proposed; no compliance claim | Repository has partial semantics but no WCAG evidence | yes |
| Test tooling | Candidate names allowed, runner choice pending | No test script/dependencies currently exist | yes |
| Harness automation | Metrics and entry criteria only | Hooks/CI/Agent Teams are not implemented or approved | yes |

## Findings (cited - path:lines)
- `03-product.md` and source code show current journeys are browsing/filtering, detail, Naver directions, language switching, and config-driven event/meeting banners.
- `src/data/centers.json` has 11 centers in four regions, so search/sort is a growth hypothesis, not a current requirement.
- Known hardening evidence includes Naver place validation divergence, leading whitespace in `config.event.linkUrl`, and Korean/English region-label mismatch.
- `05-architecture.md` confirms browser-only static JSON architecture with no backend, API, DB, auth, SSR, or analytics.
- `06-tdd-qa.md` documents cases, but `package.json` still has no test command or runner dependency.
- `08-harness/06-quality-and-evolution.md` documents future stages while the repo has no Hooks, CI, CODEOWNERS, or Agent Teams enforcement.
- Oracle approved the roadmap defaults only with strict wording: no accessibility compliance, Cloudflare verification, selected runner, or current search need claims.

## Decisions (with rationale)
- Every numbered page receives explicit Current/Proposed/Deferred handling; index pages stay minimal.
- Existing stable ID definitions and references are immutable during this pass; candidate themes receive no IDs.
- Horizons indicate ordering, never approval or delivery commitment.
- Product roadmap themes are centralized in `03-product.md` and `04-features.md`; technical pages contain only implications and links.
- Data hardening means proposed build-time validation/content hygiene, not changing JSON or adding a database.
- Content operations means safe JSON/i18n/image editing workflow, not CMS/admin implementation.
- Search/sort remains conditional on observed catalog growth or user evidence.
- Any later promotion to approved requires a separate owner decision recorded in `09-decisions.md`.

## Scope IN
- Documentation-only enrichment of all 16 numbered Wiki Markdown files.
- Current evidence summaries, proposed candidate themes, deferred boundaries, roadmap triggers, quality metrics, and proposal templates.
- Stable-ID and status-language regression checks, active link checks, and docs-only scope verification.

## Scope OUT (Must NOT have)
- No source, JSON, i18n, package, tests, root docs, `.claude`, `.obsidian`, or runtime configuration edits.
- No new stable IDs, decisions, requirements, use cases, or features.
- No approved product commitments, UI redesign, accessibility compliance claim, search requirement, or deployed Cloudflare verification claim.
- No backend, CMS/admin, auth/accounts, payment/reservation, analytics, notifications, CI, Hooks, test runner, or Agent Teams implementation.

## Open questions
- None. Irreversible stable-ID creation is avoided by keeping candidates unnumbered; future promotion remains an explicit owner decision.

## Approval gate
status: approved-plan-generated
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->
Approval evidence: user selected future-design focus, full Wiki coverage, and approved the conservative Current/Proposed/Deferred planning defaults.
