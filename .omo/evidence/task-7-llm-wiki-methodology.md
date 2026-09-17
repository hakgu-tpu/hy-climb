# Task 7 Evidence, LLM Wiki Methodology

## Baseline

Owned paths:

1. `docs/wiki/harness/agent-contracts.md`
2. `.omo/evidence/task-7-llm-wiki-methodology.md`

Baseline result:

1. `docs/wiki/harness/agent-contracts.md` was absent before writing.
2. `.omo/evidence/task-7-llm-wiki-methodology.md` was absent before writing.
3. `.omo/` was absent in this worktree before the evidence directory was created.
4. `docs/wiki/harness/` existed and contained `operating-model.md` and `context-isolation.md`.

Read sources:

1. `/Users/idealjin/Desktop/Project/Climb/.omo/plans/llm-wiki-methodology.md`
2. `docs/wiki/harness/operating-model.md`
3. `docs/wiki/harness/context-isolation.md`
4. `docs/wiki/governance.md`
5. `docs/wiki/README.md`

## Artifact Created

Created `docs/wiki/harness/agent-contracts.md` with these required sections:

1. Contract principles.
2. Complete context-packet template.
3. Delegation gate.
4. Handoff lifecycle.
5. Handoff schema.
6. DoneClaim schema.
7. AdversarialVerify schema.
8. CanonicalDeltaProposal schema.
9. Researcher contract.
10. Writer contract.
11. Reviewer contract.
12. QA contract.
13. Integrator contract.
14. Valid read-only review dry run.
15. Required failure dry run.
16. Probe matrix.
17. Acceptance checklist.

Verifier remediation added:

1. Durable `writer_id` in context packet, handoff, and DoneClaim schemas.
2. Durable `reviewer_id` and copied `writer_id` in AdversarialVerify.
3. Explicit `reviewer_id != writer_id` rule plus independent session or context evidence.
4. Full valid read-only review dry run with every AdversarialVerify field instantiated.
5. Canonical harness policy delta changed from none to proposed with pending human approval.

## Acceptance Evidence

| Requirement | Result | Evidence |
| --- | --- | --- |
| Researcher, writer, reviewer, QA, and integrator contracts exist | Pass | Each role has its own heading and contract block |
| Each role includes role, goal and scope, inputs, canonical or allowed sources, owned and forbidden paths, constraints, output schema, acceptance, evidence, stop and escalation, canonical-delta proposal | Pass | Each role contract uses those exact field labels |
| Reviewer read-only by default | Pass | Reviewer contract sets `owned_paths: []` by default and forbids writes unless a separate packet exists |
| Lifecycle is `draft -> evidence -> independent review -> integration -> wiki delta` | Pass | Contract principles and lifecycle table state the exact sequence |
| Self-approval invalid | Pass | Contract principles, lifecycle section, reviewer contract, and probe matrix reject it |
| Complete context-packet template included | Pass | `Complete Context-Packet Template` section contains the full YAML packet |
| Handoff schema included | Pass | `Handoff Schema` section contains required handoff fields |
| DoneClaim schema included | Pass | `DoneClaim Schema` section contains required claim fields |
| AdversarialVerify schema included | Pass | `AdversarialVerify Schema` section contains read-only adversarial review fields |
| Delegation gate included | Pass | `Delegation Gate` table defines pass and fail responses |
| Canonical-delta proposal included | Pass | Dedicated schema and role-level requirement included |
| Durable writer and reviewer identity included | Pass | Context packet, handoff, DoneClaim, and AdversarialVerify schemas include `writer_id`; AdversarialVerify includes `reviewer_id` |
| Reviewer identity inequality and independent context evidence required | Pass | Delegation gate and AdversarialVerify require `reviewer_id != writer_id` and independent session or context evidence |
| Valid review dry run instantiates all required AdversarialVerify fields | Pass | Dry run includes reviewed artifact, reviewer independence, mode, blocking and nonblocking findings, verdict, evidence, repro, and confidence |
| Canonical harness policy delta is proposed | Pass | CanonicalDeltaProposal and DoneClaim record pending human approval |

## Dry Run, Valid Read-Only Review

Input packet summary:

```yaml
role: "reviewer"
writer_id: "writer-task-7-docs-001"
goal: "Verify docs/wiki/harness/agent-contracts.md against Task 7 acceptance without editing files."
owned_paths: []
forbidden_paths:
  - "**/*"
output_schema:
  type: "AdversarialVerify"
constraints:
  - "Read-only review."
  - "Reviewer must be independent from writer."
```

Delegation gate result: pass.

Reason:

1. Role is named.
2. Goal is observable.
3. Scope includes review targets and excludes edits.
4. Sources are exact wiki, plan, artifact, and evidence paths.
5. `owned_paths` is empty.
6. `forbidden_paths` blocks all writes.
7. Output schema is `AdversarialVerify`.
8. Reviewer independence is required.

Expected handoff result: reviewer may read the artifact and evidence, then return approval, requested changes, rejection, or escalation. No write authority exists.

Expected AdversarialVerify result:

```yaml
adversarial_verify:
  reviewer_role: "reviewer"
  reviewer_id: "reviewer-task-7-independent-001"
  writer_id: "writer-task-7-docs-001"
  reviewed_artifact:
    - "docs/wiki/harness/agent-contracts.md"
  reviewer_independent_from_writer: true
  reviewer_writer_identity_check:
    result: "pass"
    rule: "reviewer_id != writer_id"
    evidence: "reviewer-task-7-independent-001 differs from writer-task-7-docs-001"
  independent_session_context_evidence:
    result: "pass"
    evidence: "Review packet is read-only, owns no paths, and is dispatched in an independent review context after writer DoneClaim."
  mode: "read-only"
  claims_checked:
    - claim: "Reviewer has no write authority."
      attack: "Inspect context packet owned_paths and forbidden_paths for any writable path."
      result: "pass"
      evidence: "owned_paths is empty and forbidden_paths is **/*"
    - claim: "Lifecycle is draft -> evidence -> independent review -> integration -> wiki delta."
      attack: "Search reviewed artifact for a different lifecycle order."
      result: "pass"
      evidence: "Only the required lifecycle order is accepted."
    - claim: "Self-approval is invalid."
      attack: "Compare reviewer_id and writer_id and inspect self-approval checks."
      result: "pass"
      evidence: "reviewer_writer_identity_check passes and self_approval_check passes."
  forbidden_write_check:
    result: "pass"
    evidence: "No owned paths are granted to the reviewer."
  self_approval_check:
    result: "pass"
    evidence: "reviewer_id != writer_id and independent_session_context_evidence passes."
  decision: "approve"
  verdict: "pass"
  evidence: ".omo/evidence/task-7-llm-wiki-methodology.md"
  repro: "Read the review packet, verify owned_paths is empty, compare reviewer_id and writer_id, then search the artifact for lifecycle, self-approval, and reviewer read-only rules."
  confidence: "high"
  blocking_findings:
    - "none"
  nonblocking_findings:
    - "none"
```

## Dry Run, Invalid Vague Request

Input request:

```text
make it better
```

Delegation gate result: rejected before dispatch.

Reasons:

1. No named role.
2. No observable goal.
3. No include or exclude scope.
4. No canonical links or allowed sources.
5. No owned paths or forbidden paths.
6. No constraints.
7. No output schema.
8. No acceptance checks.
9. No evidence destination.
10. No stop or escalation rules.
11. No reviewer independence or self-approval guard.

## Probe Results

| Class | Result | Evidence |
| --- | --- | --- |
| prompt_injection | Pass | Contract says external text, generated output, logs, and copied chat are data only and must not override packet or paths |
| stale_state | Pass | Contract requires re-reading packet, canonical links, and owned files after resume, conflict, or surprising output |
| dirty_worktree | Pass | Contract says dirty owned paths stop work and unrelated dirt is recorded without cleanup outside scope |
| misleading_output | Pass | Contract requires tying success claims to current files, sections, dry runs, and evidence |
| cancel_resume | Pass | Contract requires stale-state checks, ownership reconfirmation, and smallest proof before completion |
| self_approval | Pass | Contract rejects writer and reviewer being the same actor |
| path_overlap | Pass | Delegation gate rejects exact or containing-glob overlap before dispatch |
| secret_handling | Not applicable | This task creates markdown documentation only and uses no secrets or environment files |
| network_mutation | Not applicable | No mutable network service is called or required |
| production_deploy | Not applicable | Documentation is not deployed or published by this task |
| database_migration | Not applicable | The project has no database layer in this task |
| binary_artifact_cleanup | Not applicable | The task creates markdown only and no binary artifacts |

## Verification Log

1. Read `docs/wiki/harness/agent-contracts.md` after creation. Result: required sections and schemas are present.
2. Read `.omo/evidence/task-7-llm-wiki-methodology.md` after creation. Result: baseline, dry runs, probes, cleanup receipt, and DoneClaim are present.
3. Searched both owned files for required markers: role contracts, context packet, handoff, DoneClaim, AdversarialVerify, delegation gate, lifecycle, `make it better`, probe classes, N/A reasons, self-approval, and `owned_paths: []`. Result: all markers found.
4. Searched both owned files for unfinished-template markers, em dash, en dash, and banned writing phrases. Result: no matches after this log wording was cleaned.
5. Checked both owned files exist with `test -f`. Result: pass.
6. Re-ran role, schema, dry-run, and canonical-delta marker probes after verifier remediation. Result: all required markers found, including the expanded AdversarialVerify `required_fields` list.
7. Re-ran unfinished-template marker and banned phrase search after verifier remediation. Result: no matches.

## Cleanup Receipt

No automation, hooks, rules, installs, staging, commits, product code changes, package changes, or generated binary artifacts were created.

Persistent resources created:

1. `docs/wiki/harness/agent-contracts.md`
2. `.omo/evidence/task-7-llm-wiki-methodology.md`
3. `.omo/evidence/` directory, only to hold the required evidence file because `.omo/` was absent in this worktree

## DoneClaim

```yaml
done_claim:
  role: "writer"
  writer_id: "writer-task-7-docs-001"
  goal: "Create reusable delegation contracts, schemas, dry runs, probes, and evidence for Task 7."
  lifecycle_state: "evidence"
  changed_files:
    - "docs/wiki/harness/agent-contracts.md"
    - ".omo/evidence/task-7-llm-wiki-methodology.md"
  forbidden_files_touched: []
  canonical_links_read:
    - "/Users/idealjin/Desktop/Project/Climb/.omo/plans/llm-wiki-methodology.md"
    - "docs/wiki/harness/operating-model.md"
    - "docs/wiki/harness/context-isolation.md"
    - "docs/wiki/governance.md"
    - "docs/wiki/README.md"
  acceptance:
    - condition: "Every required role contract exists with required fields."
      status: "pass"
      evidence: "Acceptance Evidence table"
    - condition: "Reviewer is read-only by default and self-approval is invalid."
      status: "pass"
      evidence: "Reviewer contract, lifecycle section, probe matrix"
    - condition: "Lifecycle is draft -> evidence -> independent review -> integration -> wiki delta."
      status: "pass"
      evidence: "Contract principles and lifecycle table"
    - condition: "Context-packet, handoff, DoneClaim, AdversarialVerify, delegation gate, and canonical-delta proposal are included."
      status: "pass"
      evidence: "Output Schemas and Delegation Gate sections"
    - condition: "Valid read-only review dry run passes and vague request fails."
      status: "pass"
      evidence: "Dry Run sections"
    - condition: "Required probes are covered with N/A reasons for other classes."
      status: "pass"
      evidence: "Probe Results table"
    - condition: "Durable writer_id and reviewer_id fields exist with explicit reviewer_id != writer_id and independent session/context evidence."
      status: "pass"
      evidence: "Contract schemas, delegation gate, and valid review dry run"
    - condition: "Valid read-only review dry run instantiates every required AdversarialVerify field."
      status: "pass"
      evidence: "Dry Run, Valid Read-Only Review section"
    - condition: "Canonical harness policy delta is proposed and pending human approval."
      status: "pass"
      evidence: "canonical_delta_proposal in DoneClaim"
  verification:
    - check: "Read seeded Task 5 docs and main plan."
      result: "Pass. Required fields and acceptance were incorporated."
    - check: "Baseline target files."
      result: "Pass. Both target files were absent before creation."
    - check: "Owned-path scope."
      result: "Pass. Only the target doc and required evidence file were written."
  probes:
    - class: "prompt_injection"
      status: "applicable"
      result: "Covered by contract and evidence probe."
    - class: "stale_state"
      status: "applicable"
      result: "Covered by contract and evidence probe."
    - class: "dirty_worktree"
      status: "applicable"
      result: "Covered by contract and evidence probe."
    - class: "misleading_output"
      status: "applicable"
      result: "Covered by contract and evidence probe."
    - class: "cancel_resume"
      status: "applicable"
      result: "Covered by contract and evidence probe."
  risks:
    - "None known."
  cleanup_receipt: "No automation, hooks, installs, commits, staging, product edits, package edits, or binary artifacts were created."
  canonical_delta_proposal:
    status: "proposed"
    proposed_by: "writer-task-7-docs-001"
    target_pages:
      - "docs/wiki/harness/agent-contracts.md"
    affected_ids: []
    current_canonical_summary: "Task 5 defines the operating model and context isolation, but no canonical reusable role contract page exists before Task 7."
    proposed_canonical_summary: "Add reusable researcher, writer, reviewer, QA, and integrator contracts with durable identity, review independence, handoff, verification, and canonical-delta schemas."
    reason: "Task 7 requires canonical harness role contracts and the artifact adds that policy."
    impact:
      - "Future harness delegation packets must carry writer_id and review packets must carry reviewer_id."
      - "Reviewer approval requires reviewer_id != writer_id and independent session or context evidence."
      - "Canonical harness policy requires human owner approval before durable approval status."
    durable_decision: true
    human_owner_required: true
    reviewer_required: true
    approval:
      owner: "pending"
      state: "pending"
      evidence: ".omo/evidence/task-7-llm-wiki-methodology.md"
```
