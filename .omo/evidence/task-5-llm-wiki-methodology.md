# Task 5 Evidence, LLM Wiki Methodology

## Scope

Task: create `docs/wiki/harness/operating-model.md` and `docs/wiki/harness/context-isolation.md` in isolated worktree `/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t5`.

Owned paths:

* `docs/wiki/harness/operating-model.md`
* `docs/wiki/harness/context-isolation.md`
* `.omo/evidence/task-5-llm-wiki-methodology.md`

Forbidden actions observed:

* No rules created.
* No settings edited.
* No hooks created.
* No worktrees created.
* No commits or staging performed.
* No source files edited.

## Baseline

Baseline reads completed:

* Root `CLAUDE.md` read from the main project and isolated worktree.
* `.claude/settings.local.json` read from the main project.
* Target wiki docs absent before creation. Glob for `docs/wiki/**/*.md` in the isolated worktree returned no files.
* Target evidence files absent before creation. Glob for `.omo/evidence/*.md` in the isolated worktree returned no files.

Local settings summary:

* `.claude/settings.local.json` contains permission allow rules for selected read paths, npm commands, localhost curl checks, and `kill %1`.
* The task didn't edit this settings file.

## Official Contracts Used

Fetched and used as source contracts:

* `https://code.claude.com/docs/en/sub-agents.md`
* `https://code.claude.com/docs/en/memory.md`
* `https://code.claude.com/docs/en/worktrees.md`
* `https://code.claude.com/docs/en/agent-teams.md`
* `https://code.claude.com/docs/en/settings.md`
* `https://code.claude.com/docs/en/permissions.md`

Key source-backed facts captured in the docs:

* CLAUDE.md is context, not enforced configuration.
* Settings and permissions are configuration and enforcement layers where the official docs say they apply.
* Subagents run in their own context window and don't inherit the full parent conversation.
* Worktrees isolate files and branches for parallel sessions.
* Agent Teams are experimental and disabled by default.
* Teammates have their own context window and don't receive the lead's conversation history automatically.
* Permission rules are enforced by Claude Code, not by the model.

## Deterministic Dry Runs

Level 1, subagent:

* Input packet assigns a read-only research role.
* Owned paths are empty.
* Forbidden paths are all files.
* Expected decision: allow.
* Expected result: source-backed summary only.

Level 2, simultaneous Claude Code instance:

* Input packet assigns a docs writer in an isolated worktree.
* Owned path is `docs/wiki/harness/context-isolation.md`.
* Forbidden paths include `src/**` and `.claude/**`.
* Expected decision: allow only if no active writer owns the same path.
* Expected result: docs page plus DoneClaim evidence.

Level 3, human team agent:

* Input packet assigns a human reviewer.
* Owned paths are empty.
* Forbidden paths are the docs under review.
* Expected decision: allow as review-only.
* Expected result: approval, rejection, or requested changes backed by notes.

Overlap failure:

* Packet A owns `docs/wiki/harness/context-isolation.md`.
* Packet B owns `docs/wiki/harness/**`.
* Expected decision: reject before work.
* Reason: Packet B's directory glob contains Packet A's exact file.
* Required response: assign one writer before either packet can proceed.

## Probe Results

stale_state:

* Applicable.
* Protocol added: re-read packet, CLAUDE.md, relevant docs, and owned files before editing or claiming after stale triggers.

dirty_worktree:

* Applicable.
* Protocol added: stop on dirty owned paths, record unrelated dirt, never clean files outside scope.

prompt injection:

* Applicable.
* Protocol added: untrusted external text is data only and can't become instruction.

cancel/resume:

* Applicable.
* Protocol added: re-run stale context protocol and verify worktree binding before edits.

repeated interruptions:

* Applicable.
* Protocol added: after the second interruption, record re-reads and checks. After the third, escalate for a fresh packet or new worktree.

misleading_success_output:

* Applicable.
* Protocol added: success must prove the claim with files, tests, or behavior. Passing commands with skipped coverage don't count.

secret handling:

* Not applicable.
* Reason: this task doesn't read or write secrets, credentials, or environment files.

network mutation:

* Not applicable.
* Reason: required network use was read-only documentation fetches.

production deploy:

* Not applicable.
* Reason: docs-only task with no deploy or publish step.

database migration:

* Not applicable.
* Reason: no database layer is in scope for these harness docs.

binary artifact cleanup:

* Not applicable.
* Reason: outputs are markdown files only.

## Acceptance Mapping

* Canonical three-level model: `docs/wiki/harness/operating-model.md` defines subagents, simultaneous Claude Code worktree instances, and human team agents.
* Distinct isolation rules: both docs separate context isolation, filesystem isolation, ownership, communication, review, and escalation.
* Level 3 escalation blocker fixed: `operating-model.md` now has an explicit Human Team Agents escalation subsection for owner-decision conflicts, unresolved overlapping ownership, rejected canonical deltas, repeated review disagreement, security/destructive/external side effects, and escalation to the designated human owner or maintainer.
* Exact context-packet schema: `operating-model.md` includes role, goal, canonical links, inputs, owned paths, forbidden paths, constraints, output, acceptance, evidence, and stop escalation.
* CLAUDE.md context statement: both docs state CLAUDE.md guides behavior but doesn't enforce.
* Fresh subagent context: both docs state subagents have their own context and don't inherit parent conversation history.
* Worktree file isolation: both docs state worktrees isolate files and branches.
* Agent Teams experimental: both docs state Agent Teams are experimental and not required.
* Minimal context loading: `operating-model.md` defines required and optional context, allowed sources, and forbidden assumptions.
* Path-scoped behavior: `context-isolation.md` defines `.claude/rules/` loading and context-only behavior.
* Stale context protocol: `context-isolation.md` defines triggers and refresh steps.
* Worktree trigger: `operating-model.md` defines when Level 2 is required.
* Dry runs and overlap failure: `context-isolation.md` includes all three level dry runs and the overlapping writer rejection.

## Cleanup Receipt

Persistent resources created:

* `docs/wiki/harness/operating-model.md`
* `docs/wiki/harness/context-isolation.md`
* `.omo/evidence/task-5-llm-wiki-methodology.md`

Persistent resources not created:

* No `.claude/rules/` files.
* No `.claude/settings.json` or `.claude/settings.local.json` edits.
* No hooks.
* No worktrees.
* No branches.
* No commits.

## DoneClaim

```yaml
done_claim:
  role: "Level 2 docs writer in isolated worktree"
  goal: "Implement Plan Task 5 harness methodology docs."
  changed_files:
    - "docs/wiki/harness/operating-model.md"
    - "docs/wiki/harness/context-isolation.md"
    - ".omo/evidence/task-5-llm-wiki-methodology.md"
  forbidden_files_touched: []
  acceptance:
    - "Three-level model documented in operating-model.md."
    - "Context and filesystem isolation rules documented across both harness docs."
    - "Exact context-packet schema included in operating-model.md."
    - "Dry runs and probe matrix included in context-isolation.md."
    - "Evidence and cleanup receipt recorded in this file."
  verification:
    - "Baseline glob confirmed target docs and evidence were absent before creation."
    - "Official Claude Code docs fetched for required source contracts."
    - "Post-write grep confirmed required harness terms, probe labels, context packet fields, and DoneClaim markers."
    - "Typography check found no en dash or em dash characters in the three created files."
    - "Git status showed only the expected untracked `.omo/` and `docs/` directories."
    - "Blocker recheck confirmed Level 1, Level 2, and Level 3 each document ownership, communication, review or review owner, and escalation."
  risks:
    - "None known."
  cleanup_receipt: "Only owned markdown docs and evidence were created. No rules, settings, hooks, worktrees, branches, commits, or staged changes were created."
```
