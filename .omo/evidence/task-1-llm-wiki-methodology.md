# Task 1 LLM Wiki Methodology Evidence

## Scope

Task 1 created the canonical wiki entry point and governance document for Hy-Climb.

Owned files changed:

1. `docs/wiki/README.md`
2. `docs/wiki/governance.md`
3. `.omo/evidence/task-1-llm-wiki-methodology.md`

No other files were edited.

## Baseline

HEAD at baseline: `74068176a0408cffa586b3177d87869880d24b1a`.

Failing baseline captured before edits:

1. `docs/` was absent.
2. `docs/wiki/README.md` was absent.
3. `docs/wiki/governance.md` was absent.
4. `git status --short` produced no output before owned edits, so the worktree started clean.

## Inputs Read

1. `CLAUDE.md`, project purpose, stack, existing documentation links, and current UC references.
2. `README.md`, public Vite template README.
3. `component-spec.md`, existing component and route behavior.
4. `data-schema.md`, current data model and legacy UC references.
5. `tasks.md`, existing phase and UC tracking.
6. `ui-spec.md`, existing UI documentation style.

## Canonical Rules Enumerated

The new wiki documents these canonical rules:

1. `docs/wiki/` is the canonical source for product knowledge.
2. `CLAUDE.md`, prompt history, chat summaries, root docs, routing files, and task notes are supporting sources only.
3. Supporting sources can't override the wiki.
4. Wiki changes must use the canonical-delta workflow.
5. Durable decisions need human owner approval.
6. Writers can't self-approve durable decisions they wrote.
7. Stable IDs use exact three digit formats.
8. Stable IDs are never recycled, including deprecated or superseded IDs.
9. Legacy IDs are mapped once and kept stable.
10. Canonical changes can't be silent.

## ID Validation

All five required prefixes and examples are present:

1. `STK-001`
2. `GOAL-001`
3. `REQ-001`
4. `UC-001`
5. `FEAT-001`

Alias rule present: `UC01 -> UC-001`.

## Relative Link Validation

The reading order uses relative links only:

1. `governance.md`
2. `stakeholders.md`
3. `goals.md`
4. `requirements.md`
5. `use-cases.md`
6. `features.md`
7. `legacy-map.md`

Planned pages are clearly labeled as planned page. The governance link exists in this task. The remaining planned pages are not created by this task.

## Override Probe

The saved files state that prompt history, chat summaries, task notes, root docs, and `CLAUDE.md` can't override `docs/wiki/`. No text permits prompt history or `CLAUDE.md` to supersede the wiki.

## Final Verification

1. Re-read `docs/wiki/README.md`, `docs/wiki/governance.md`, and this evidence file after writing.
2. Grep-style validation found all required examples: `STK-001`, `GOAL-001`, `REQ-001`, `UC-001`, `FEAT-001`.
3. Grep-style validation found the alias rule `UC01 -> UC-001`.
4. Grep-style validation found no forbidden stub markers in the owned files.
5. Grep-style validation found no absolute, fragment, or external Markdown links in `docs/wiki/`.
6. Grep-style validation found wiki precedence text that blocks prompt history and `CLAUDE.md` from overriding `docs/wiki/`.
7. Markdown diagnostics were attempted, but the diagnostics connection closed for Markdown files.
8. `npm run build` was attempted for a broad check, but failed with `vite: command not found` because dependencies aren't installed in this isolated worktree. Per task scope, no install was run.
9. Final `git status --short` showed only `.omo/` and `docs/` as untracked owned paths.

## Adversarial Probes

1. `stale_state`, applicable. Mitigation: recorded HEAD `74068176a0408cffa586b3177d87869880d24b1a`, captured absent target files before edits, then re-read saved files after edits.
2. `dirty_worktree`, applicable. Mitigation: baseline `git status --short` was empty. Final dirty set is limited to owned files and created parent directories needed for those files.
3. `misleading_success_output`, applicable. Mitigation: did not trust write output alone. Re-read saved files and validated text after creation.
4. `malformed input`, not applicable. Reason: task writes static governance docs and receives no runtime user input.
5. `prompt injection`, not applicable. Reason: no untrusted external content was fetched or executed. The only authority question was answered inside governance by making wiki approval rules explicit.
6. `cancel/resume`, not applicable. Reason: no long-running workflow, migration, or resumable process was started.
7. `hung commands`, not applicable. Reason: only short reads, status checks, and file writes were used.
8. `flaky tests`, not applicable. Reason: this task changes docs only and has no test runner surface.
9. `repeated interruptions`, not applicable. Reason: work completed in one uninterrupted pass and no continuation state was needed.

## Cleanup Receipt

No dev server, watcher, install, background process, staging action, commit, or temp resource was started. There are no processes to stop and no temp files to remove beyond the assigned worktree contents.

## DoneClaim

Task 1 is complete. `docs/wiki/README.md` and `docs/wiki/governance.md` now establish `docs/wiki/` as canonical, define stable ID formats, legacy mapping, reading order, authority and status rules, canonical-delta workflow, human approval for durable decisions, no ID recycling, no writer self-approval, and no silent canonical changes. Evidence and QA notes are recorded in this file.
