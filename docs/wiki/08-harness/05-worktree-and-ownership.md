# Worktree And Ownership Protocol

This page defines how Hy-Climb runs concurrent writers without shared writes. It extends the harness operating model with a concrete dispatch, merge, and cleanup protocol.

## Source Contracts

Use the source list in [02-operating-model.md](02-operating-model.md) for Claude Code subagents, memory, worktrees, settings, permissions, and Agent Teams. This page relies on those recorded facts.

Ground truths for this protocol:

* Worktrees isolate filesystem state and branch state for each writer.
* Context isolation is separate from filesystem isolation. A worker can have a fresh context while still writing the same checkout unless a worktree is assigned.
* Subagents have separate context windows, but they are not path isolation by themselves.
* Agent Teams are experimental. They are not a dependency and don't replace worktree isolation, branch isolation, path ownership, or integrator review.

## Required Writer Shape

Every concurrent writer gets exactly one task ID, one worktree, one branch, and one owned path set.

Rules:

* Task IDs use `T###` or the project task ID already assigned by the orchestrator.
* Worktree directory names include the task ID and a short purpose, for example `climb-T014-center-card-copy`.
* Branch names include the task ID, for example `docs/T014-center-card-copy`.
* A writer may read shared context paths, but may write only owned paths.
* A writer must list forbidden paths. Empty forbidden lists are not allowed for concurrent work.
* Generated files, screenshots, evidence files, lockfiles, and caches count as writes and need an owner.
* A writer that needs a new write path stops and asks the orchestrator to assign that path before editing it.

## High Collision Paths

These paths are high collision because many features, docs, and data tasks touch them:

* `src/App.jsx`
* `src/contexts/LangContext.jsx`
* `src/data/centers.json`
* `src/data/config.json`
* `src/i18n/ko.json`
* `src/i18n/en.json`
* `docs/wiki/01-index.md`
* `docs/wiki/02-governance.md`
* `docs/wiki/07-reference/02-data-schema.md`
* `docs/wiki/07-reference/01-component-spec.md`
* `docs/wiki/07-reference/03-ui-spec.md`
* `docs/wiki/08-harness/02-operating-model.md`
* `docs/wiki/08-harness/03-context-isolation.md`
* `docs/wiki/08-harness/05-worktree-and-ownership.md`

Treat the full `docs/wiki/` tree as canonical wiki space. A writer may own one canonical page, but no writer may claim `docs/wiki/**` while another writer owns any page inside it.

Treat data and i18n as a coupled claim set when content changes cross languages or region labels. A writer changing center data usually needs `src/data/centers.json`, `src/i18n/ko.json`, `src/i18n/en.json`, and the matching schema page if the contract changes. If those paths can't be assigned together, split the work into read-only analysis and one serialized writer.

## Read Sharing And Write Exclusivity

Read sharing is allowed. Write sharing is not.

Allowed:

* Writer A reads `src/data/centers.json` while Writer B owns it for editing.
* Writer A owns `src/components/center/CenterCard.jsx` while Writer B owns `src/components/layout/Footer.jsx`.
* A reviewer reads every changed path without owning those paths.

Rejected:

* Two writers both own `src/data/centers.json`.
* One writer owns `docs/wiki/**` while another owns `docs/wiki/07-reference/02-data-schema.md`.
* One writer writes generated screenshots under a shared folder that wasn't assigned.
* A subagent edits the same checkout while a separate worktree writer owns the same path.

When a path is claimed by two writers, the orchestrator must reject or serialize the work before either writer edits. Serialization means Writer A finishes, returns evidence, and the integrator merges or rejects the result before Writer B starts from the new base.

## Dispatch Gate

Before dispatch, the orchestrator checks every active packet.

Required checks:

1. Normalize exact paths and globs.
2. Expand parent and child overlaps, for example `docs/wiki/**` and `docs/wiki/08-harness/05-worktree-and-ownership.md`.
3. Mark high collision paths for integrator review.
4. Confirm each writer has a unique worktree and branch.
5. Confirm the base revision is recorded.
6. Confirm owned paths include evidence outputs.
7. Confirm forbidden paths include shared source, rules, settings, and canonical paths outside scope.

Reject before work when any exact, parent, child, or generated path overlap exists between writers.

## Base And Stale Checks

Each writer records a base revision before editing. The writer doesn't need to create the worktree, branch, or commit, but the packet must identify the base that the assigned checkout is expected to match.

Worker start checks:

* Confirm the current directory matches the assigned worktree.
* Confirm the current branch matches the assigned branch if branch access is available.
* Confirm the current revision matches the packet base or record the difference as stale state.
* Read root `CLAUDE.md`, relevant harness pages, and owned files from disk.
* Check owned paths for pre-existing dirt. Dirty owned paths block work.
* Record unrelated dirty paths without cleaning them.

Stale state triggers:

* The worker resumes after interruption.
* The worker sees a command result that conflicts with file contents.
* The branch or worktree no longer matches the packet.
* The integrator reports that base moved before merge.

Stale state response:

1. Re-read the packet and linked canonical docs.
2. Re-read every owned file before editing.
3. Re-check ownership against active writers.
4. Re-run the smallest proof that still covers the claim.
5. Stop if the base can't be trusted.

## Writer Handback

A writer returns a DoneClaim, not a loose summary.

Required fields:

```yaml
done_claim:
  task_id: "T###"
  worktree: "$ABSOLUTE_OR_ORCHESTRATOR_KNOWN_WORKTREE_PATH"
  branch: "$BRANCH_NAME"
  base_revision: "$REVISION_RECORDED_BEFORE_EDITS"
  changed_files:
    - "$OWNED_PATH"
  forbidden_files_touched: []
  evidence_files:
    - "$OWNED_EVIDENCE_PATH"
  verification:
    - "$LINT_BUILD_PROBE_MANUAL_QA_OR_CONTENT_CHECK_WITH_RESULT"
  open_risks:
    - "none or a concrete risk"
  resource_inventory:
    - "$RESOURCE_TYPE_PID_PATH_OWNER_OR_NONE"
  cleanup_timeout_seconds: "$INTEGER_SECONDS_OR_NULL_WHEN_NO_PERSISTENT_RESOURCE_CAN_EXIST"
  cleanup_command_or_tool: "$EXACT_TEARDOWN_COMMAND_OR_APPROVED_TOOL_OR_NULL"
  cleanup_success_observable: "$BINARY_ABSENCE_CHECK_OR_NULL"
  cleanup_retry_limit: "$ZERO_OR_ONE"
  cleanup_escalation_target: "$INTEGRATOR_OR_NAMED_HUMAN_OWNER"
  cleanup_receipt: "No worktrees, branches, staged files, installs, servers, or generated artifacts left by this task unless listed."
```

Declared schema variables in this DoneClaim template use `$UPPER_SNAKE_CASE` names and must be replaced by the worker before handback.

The cleanup receipt is required even when the writer created no persistent resources. If resources were created by an approved task, list their paths, cleanup status, timeout seconds, exact teardown command or approved tool, binary success observable, retry count, and escalation target. Completion is blocked while an independent absence check still finds a declared resource.

## Pre-Merge Gates

The integrator is the only role that reconciles branches, path conflicts, and canonical deltas.

Before merge, the integrator checks:

* Lint baseline, using the project lint command when available.
* Build baseline, using the project build command when available.
* Evidence file exists and covers every acceptance point.
* Changed files are inside the owned path set.
* Forbidden files are untouched.
* High collision paths have explicit review notes.
* Documentation claims match current source files.
* Cleanup receipt is present.

If lint or build already fails on the base revision, the integrator records the baseline failure before judging writer changes. A writer's branch must not make the baseline worse.

## Integrator Merge Order

Merge order is deterministic.

1. Merge low collision docs and isolated component tasks first.
2. Merge source tasks with no shared dependencies next.
3. Merge data and i18n tasks after all readers have finished.
4. Merge canonical wiki changes after source and data claims they describe are settled.
5. Merge high collision paths last, one branch at a time.

After each merge, rerun the pre-merge gates that apply to the next branch. If the next branch is stale, the integrator sends it back for refresh instead of fixing it in place.

Integrator-only reconciliation means writers don't resolve conflicts across branches. Writers may answer questions or refresh their branch, but the integrator decides merge order, rejects overlap, and records final conflict decisions.

## Human Conflict Escalation

Escalate to a named human maintainer when:

* Two writers need the same path and the work can't be split safely.
* A writer needs a forbidden path to satisfy acceptance.
* Canonical wiki content disagrees with live source and no packet owns the canonical delta.
* A high collision merge changes behavior that wasn't in the acceptance criteria.
* Repeated interruptions make the worker state unclear after the third resume.
* The cleanup receipt is missing or contradicts observed files.
* Cleanup times out, uses an undeclared teardown action, or leaves a declared resource present after the allowed bounded retry.

The human decision must assign one writer, serialize the writers, reject one branch, or issue a new packet. The decision is recorded in evidence before work resumes.

## Deterministic Dry-Run Template

Use this template before dispatching real concurrent work.

```yaml
dry_run:
  task_id: "T###"
  role: "Level 2 writer in isolated worktree"
  worktree: "/tmp/orchestrator/climb-T###-short-name"
  branch: "docs/T###-short-name"
  base_revision: "$GIT_REVISION_OR_IMMUTABLE_SOURCE_SNAPSHOT"
  goal: "$ONE_SENTENCE_OUTCOME"
  read_only_paths:
    - "CLAUDE.md"
    - "docs/wiki/08-harness/02-operating-model.md"
  owned_paths:
    - "$PATHS_THE_WRITER_MAY_EDIT"
  forbidden_paths:
    - "src/**"
    - ".claude/**"
    - "$CANONICAL_PATHS_OUTSIDE_SCOPE"
  high_collision_paths:
    - "$OWNED_HIGH_COLLISION_PATH_OR_NONE"
  stale_check:
    - "Confirm worktree, branch, base revision, owned dirt, and forbidden dirt before editing."
  cleanup_timeout_seconds: "$INTEGER_SECONDS_OR_NULL_WHEN_NO_PERSISTENT_RESOURCE_CAN_EXIST"
  cleanup_command_or_tool: "$EXACT_TEARDOWN_COMMAND_OR_APPROVED_TOOL_OR_NULL"
  cleanup_success_observable: "$BINARY_ABSENCE_CHECK_OR_NULL"
  cleanup_retry_limit: "$ZERO_OR_ONE"
  cleanup_escalation_target: "$INTEGRATOR_OR_NAMED_HUMAN_OWNER"
  handoff:
    done_claim_required: true
    evidence_required: true
    cleanup_receipt_required: true
  merge_decision: "allowed|serialize|reject"
  merge_reason: "$WHY_THIS_PACKET_CAN_RUN_MUST_SERIALIZE_OR_MUST_BE_REJECTED"
```

Declared schema variables in this dry-run template use `$UPPER_SNAKE_CASE` names and must be replaced by the orchestrator before dispatch.

## `.omo` Operational State Ownership

During active plan execution, `.omo/plans`, `.omo/drafts`, `.omo/evidence`, `.omo/start-work/ledger.jsonl`, `.omo/boulder.json`, and `.omo/run-continuation/*.json` are orchestrator-owned operational state. They record planning, drafts, evidence, progress ledgers, boulder state, and continuation state. They are not product-policy sources and don't override canonical wiki pages.

Ownership rules for these paths:

* `.omo/plans` and `.omo/drafts` are read-only inputs for workers unless a packet assigns an exact file for editing.
* `.omo/evidence` files are writable only when the packet names the exact evidence path in `owned_paths`.
* `.omo/start-work/ledger.jsonl`, `.omo/boulder.json`, and `.omo/run-continuation/*.json` are orchestrator-owned during active execution and must not be edited by product or documentation workers unless the packet grants exact ownership.
* At run completion, the orchestrator deactivates or removes the matching `.omo/run-continuation/*.json` continuation record and writes the cleanup result to evidence.

## Dry-Run Outcomes

### Disjoint Component Writers

Writer A:

```yaml
task_id: "T021"
worktree: "/tmp/orchestrator/climb-T021-center-card"
branch: "feat/T021-center-card"
base_revision: "BASE"
owned_paths:
  - "src/components/center/CenterCard.jsx"
  - ".omo/evidence/T021.md"
forbidden_paths:
  - "src/data/centers.json"
  - "src/i18n/**"
  - "docs/wiki/**"
merge_decision: "allowed"
merge_reason: "No owned path overlaps another active writer."
```

Writer B:

```yaml
task_id: "T022"
worktree: "/tmp/orchestrator/climb-T022-footer-copy"
branch: "feat/T022-footer-copy"
base_revision: "BASE"
owned_paths:
  - "src/components/layout/Footer.jsx"
  - ".omo/evidence/T022.md"
forbidden_paths:
  - "src/data/centers.json"
  - "src/i18n/**"
  - "docs/wiki/**"
merge_decision: "allowed"
merge_reason: "No owned path overlaps another active writer."
```

Expected result: both tasks may run concurrently in separate worktrees. The integrator merges each after lint, build, evidence, and cleanup checks pass.

### Two Centers Data Writers

Writer C:

```yaml
task_id: "T031"
owned_paths:
  - "src/data/centers.json"
  - ".omo/evidence/T031.md"
merge_decision: "reject"
merge_reason: "Another active writer owns src/data/centers.json."
```

Writer D:

```yaml
task_id: "T032"
owned_paths:
  - "src/data/centers.json"
  - ".omo/evidence/T032.md"
merge_decision: "reject"
merge_reason: "Another active writer owns src/data/centers.json."
```

Expected result: rejected before work. Both writers claim `src/data/centers.json`. The orchestrator must serialize them or assign one writer to prepare a read-only proposal while the other owns the data write.

## Probe Matrix

| Class | Status | Required Response |
| --- | --- | --- |
| stale_state | Applicable | Re-read packet, base revision, linked docs, and owned files before edits or claims |
| dirty_worktree | Applicable | Stop on dirty owned paths, record unrelated dirt, don't clean outside scope |
| repeated_interruption | Applicable | After the second interruption, record rereads and rerun checks. After the third, escalate for a fresh packet or worktree |
| misleading_output | Applicable | Treat successful commands as evidence only when they cover the changed files and acceptance points |
| cleanup | Applicable | Require resource inventory, exact teardown command or approved tool, timeout seconds, binary success observable, cleanup receipt, and independent absence check for worktrees, branches, staged files, installs, servers, generated artifacts, and runtime state |
| hung_cleanup | Applicable | Stop on cleanup timeout, preserve non-secret diagnostics, allow at most one bounded safe retry, forbid broad or destructive process cleanup, escalate to the integrator or named human owner, and block completion while any declared resource remains |
| secret_handling | Not applicable | This protocol doesn't require secrets or credential files |
| network_mutation | Not applicable | Protocol work uses read-only docs and local files |
| production_deploy | Not applicable | No deploy or publish step belongs to writer isolation |
| database_migration | Not applicable | Hy-Climb has no database layer in this static app |
| binary_artifact_cleanup | Not applicable | The protocol doesn't require binary artifacts |

## Acceptance Checklist

Before a concurrent writer starts, the orchestrator must be able to answer yes to each item:

* Does the packet name one task ID, one worktree, one branch, and one base revision?
* Are owned and forbidden paths explicit?
* Are high collision paths named when present?
* Are shared paths read-only unless owned by exactly one writer?
* Is the handback shape a DoneClaim with evidence and cleanup receipt?
* Does the handback include resource inventory, timeout seconds, exact teardown command or approved tool, binary success observable, retry limit, and escalation target?
* Is `merge_decision` exactly one of `allowed`, `serialize`, or `reject` before edits start?
* Is human escalation defined for unresolved ownership or stale state?
