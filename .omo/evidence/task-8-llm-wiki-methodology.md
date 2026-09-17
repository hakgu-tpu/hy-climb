# Task 8 LLM Wiki Methodology Evidence

## Task

Create `docs/wiki/harness/worktree-and-ownership.md` and this evidence file. Do not create real worktrees or branches. Do not edit source, settings, rules, or other docs.

Assigned execution context:

* Worktree: `/private/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t8`
* Branch: `agent/llm-wiki-t8`
* Base revision: `74068176a0408cffa586b3177d87869880d24b1a`

## Baseline

Base revision recorded during verification: `74068176a0408cffa586b3177d87869880d24b1a`.

Absent baseline captured before writing:

* `docs/wiki/harness/worktree-and-ownership.md` was absent.
* `.omo/evidence/task-8-llm-wiki-methodology.md` was absent.
* `.omo/` was absent, so `.omo/evidence/` was created only to hold the owned evidence file.

Seeded context read before writing:

* `CLAUDE.md`
* `docs/wiki/README.md`
* `docs/wiki/harness/operating-model.md`
* `docs/wiki/harness/context-isolation.md`
* `docs/wiki/reference/component-spec.md`
* `docs/wiki/reference/data-schema.md`
* Current `src/` structure listing
* `package.json` scripts for lint and build names

Seeded docs are read-only baseline, not Task 8 owned writes. Their baseline SHA-256 hashes were recorded to distinguish read-only seeded docs from owned Task 8 outputs:

| Read-only baseline path | SHA-256 |
| --- | --- |
| `docs/wiki/README.md` | `3b829736efda33fbd27ae114c080d1d9ce0b0cf6a4a0dbf1554b2a786a26db3c` |
| `docs/wiki/architecture.md` | `74d64505725ebf592890f3136862d0f81b90df711e0dec8f163748d54fd29952` |
| `docs/wiki/governance.md` | `583bd46db22cceebf9c7330c9ac166ec89dfa07132249ce29d85e1239099aad6` |
| `docs/wiki/harness/context-isolation.md` | `75448a36559d6195bafe0f108ef0b2ea2068a8af9983d3c02e6ff91030a663e6` |
| `docs/wiki/harness/operating-model.md` | `dedd4517175eea351c51893f5a70da6fd77d9693a8deab953f6e01aadd43589d` |
| `docs/wiki/product.md` | `39257aa81776f23b58aaeea8f02d8f8137218f1487de7a23b7b156606a684fc4` |
| `docs/wiki/reference/component-spec.md` | `a294fac1f1ad35a5459fc234543750e78390431c5595f256570c45e01d92cb61` |
| `docs/wiki/reference/data-schema.md` | `b7300a19d5146fdfb719c9a74755d408db0a59357cf6978baca0e87ea630eac5` |
| `docs/wiki/reference/ui-spec.md` | `1078ff0e935e451ca89ead200ef50dc28ef19f0f976a71b41e1dfee4a4dd72e9` |
| `docs/wiki/tdd-qa.md` | `e6b028a80bc097538be747afc27c81ec4f882332772b0c2d23be48d2fccec26e` |

Official facts used were the already referenced contracts from `docs/wiki/harness/operating-model.md`: worktrees, subagents, memory, settings, permissions, and Agent Teams.

## Owned Files

Write-owned paths:

* `docs/wiki/harness/worktree-and-ownership.md`
* `.omo/evidence/task-8-llm-wiki-methodology.md`

Owned output hashes before this verifier fix:

| Owned path | SHA-256 before verifier fix |
| --- | --- |
| `docs/wiki/harness/worktree-and-ownership.md` | `8cd63996aac0b2fdec290795eb4d5adf0f2eb40e1b86b3377953bf65106e7355` |
| `.omo/evidence/task-8-llm-wiki-methodology.md` | `978f2c17b869696ad3cce46756beb30f6dadd0eb10a73d1ada57f4416d5ed2a2` |

Forbidden paths:

* `src/**`
* `.claude/**`
* `CLAUDE.md`
* `package.json`
* `package-lock.json`
* `docs/wiki/README.md`
* `docs/wiki/architecture.md`
* `docs/wiki/governance.md`
* `docs/wiki/harness/context-isolation.md`
* `docs/wiki/harness/operating-model.md`
* `docs/wiki/product.md`
* `docs/wiki/reference/component-spec.md`
* `docs/wiki/reference/data-schema.md`
* `docs/wiki/reference/ui-spec.md`
* `docs/wiki/tdd-qa.md`

Forbidden files touched: none.

Real worktrees or branches created: none.

Commits, staging, installs, source edits, rules edits, settings edits: none.

## Coverage Notes

The protocol page covers:

* One worktree and one branch per concurrent writer.
* Task IDs, path claims, owned paths, forbidden paths, and generated file ownership.
* Exact high collision paths: `src/App.jsx`, `src/contexts/LangContext.jsx`, `src/data/centers.json`, `src/data/config.json`, `src/i18n/ko.json`, `src/i18n/en.json`, and canonical wiki pages.
* Read-sharing with write exclusivity.
* Context isolation versus filesystem isolation.
* Agent Teams as experimental and not an isolation layer.
* Base revision and stale state checks.
* Integrator merge order.
* Pre-merge lint baseline, build baseline, evidence, owned path, forbidden path, high collision review, and cleanup checks.
* Integrator-only reconciliation.
* Writer handback and cleanup receipt.
* Human conflict escalation.
* Deterministic dry-run template with task ID, worktree, owned paths, forbidden paths, base revision, handoff, and exact `merge_decision: allowed|serialize|reject` enum.

## Dry Runs

### Disjoint Component Tasks

Result: `merge_decision: "allowed"`.

Writer A owns `src/components/center/CenterCard.jsx` and `.omo/evidence/T021.md`. Writer B owns `src/components/layout/Footer.jsx` and `.omo/evidence/T022.md`. Both have separate worktree names, branch names, task IDs, and evidence paths. No owned path overlaps. Shared data and canonical wiki paths are forbidden. Expected integrator action is to merge after lint, build, evidence, and cleanup checks pass.

### Two Centers Data Writers

Result: `merge_decision: "reject"` before work. A revised orchestrator packet could instead serialize the writers by running only one centers data writer at a time.

Writer C owns `src/data/centers.json`. Writer D also owns `src/data/centers.json`. The protocol rejects shared writes. The orchestrator must serialize the writers or convert one packet into read-only proposal work.

## Probe Results

| Class | Result |
| --- | --- |
| stale_state | Applicable. Protocol requires rereading packet, base revision, linked docs, and owned files before edits or claims. |
| dirty_worktree | Applicable. Protocol blocks dirty owned paths, records unrelated dirt, and forbids cleanup outside scope. |
| repeated_interruption | Applicable. Protocol raises evidence after the second interruption and escalates after the third. |
| misleading_output | Applicable. Protocol accepts successful commands only when they cover changed files and acceptance points. |
| cleanup | Applicable. Protocol requires a cleanup receipt covering worktrees, branches, staged files, installs, servers, and generated artifacts. |
| secret_handling | Not applicable. This task has no secrets or credential files in scope. |
| network_mutation | Not applicable. This task uses local files and referenced docs only. |
| production_deploy | Not applicable. This task doesn't deploy or publish. |
| database_migration | Not applicable. Hy-Climb is a static app with no database layer. |
| binary_artifact_cleanup | Not applicable. This task creates markdown files only. |

## Verification Results

Completed checks:

* Confirmed both owned files exist by reading them after creation.
* Ran `rg "src/App\.jsx|src/contexts/LangContext\.jsx|src/data/centers\.json|src/i18n/ko\.json|src/i18n/en\.json|Agent Teams|experimental|context isolation|filesystem isolation|base_revision|merge_decision|cleanup_receipt|DoneClaim|stale_state|dirty_worktree|repeated_interruption|misleading_output" "docs/wiki/harness/worktree-and-ownership.md" ".omo/evidence/task-8-llm-wiki-methodology.md"`. Required terms and exact paths were present.
* Ran a Python Unicode dash scan on both owned files. Result: `unicode_dash_count=0` for each file.
* Ran `git status --short --untracked-files=all`. It showed the two owned new files plus pre-existing seeded wiki docs as untracked. No source, rules, settings, branch, or staged changes were created by this task.
* Ran `npm run lint`. Result: failed before lint because `eslint` was not found. Dependencies are not installed in this worktree, and installing is forbidden by the task packet.
* Ran `npm run build -- --outDir "/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-t8-build" --emptyOutDir`. Result: failed before build because `vite` was not found. Dependencies are not installed in this worktree, and installing is forbidden by the task packet.
* Checked `/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-t8-build`. Result: path absent, so the failed build left no external build output.
* Ran `git branch --show-current`. Result: `agent/llm-wiki-t8`.
* Ran `git rev-parse --show-toplevel`. Result: `/private/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t8`.
* Ran `git rev-parse HEAD`. Result: `74068176a0408cffa586b3177d87869880d24b1a`.
* Ran SHA-256 hashes for read-only seeded docs and owned Task 8 files. Seeded docs are recorded as read-only baseline above; only `docs/wiki/harness/worktree-and-ownership.md` and `.omo/evidence/task-8-llm-wiki-methodology.md` are write-owned.
* Ran dry-run/template check for the old nested boolean merge field before patching. Result: verifier blocker found in the protocol template/examples and fixed to exact enum values.
* Re-ran branch/worktree/base checks after patching. Results remained `agent/llm-wiki-t8`, `/private/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t8`, and `74068176a0408cffa586b3177d87869880d24b1a`.
* Re-ran template and dry-run check after patching. Result: no legacy nested boolean merge field remained in the protocol or evidence files.
* Re-ran SHA-256 hashes after patching. Owned file hashes are `8ffb8fd61a45fbec424861c900d92d4d96086b176e963e132622c9ce987175e2` for `docs/wiki/harness/worktree-and-ownership.md` and `539d468938437ed28daabc4cbd1eadadb1e7a3312af788fd1305ecc51bdc4b9b` before this final evidence-only verification note.

## Cleanup Receipt

No real worktrees or branches were created. No files were staged or committed. No packages were installed. No dev server was started. No generated artifacts were intentionally created beyond the two owned markdown files and the required `.omo/evidence/` parent directory.

## DoneClaim

```yaml
done_claim:
  task_id: "task-8"
  role: "Level 2 docs writer in current isolated writing worktree"
  goal: "Create the worktree and ownership protocol plus methodology evidence."
  worktree: "/private/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t8"
  branch: "agent/llm-wiki-t8"
  base_revision: "74068176a0408cffa586b3177d87869880d24b1a"
  owned_paths:
    - "docs/wiki/harness/worktree-and-ownership.md"
    - ".omo/evidence/task-8-llm-wiki-methodology.md"
  forbidden_paths:
    - "src/**"
    - ".claude/**"
    - "CLAUDE.md"
    - "package.json"
    - "package-lock.json"
    - "docs/wiki/README.md"
    - "docs/wiki/architecture.md"
    - "docs/wiki/governance.md"
    - "docs/wiki/harness/context-isolation.md"
    - "docs/wiki/harness/operating-model.md"
    - "docs/wiki/product.md"
    - "docs/wiki/reference/component-spec.md"
    - "docs/wiki/reference/data-schema.md"
    - "docs/wiki/reference/ui-spec.md"
    - "docs/wiki/tdd-qa.md"
  changed_files:
    - "docs/wiki/harness/worktree-and-ownership.md"
    - ".omo/evidence/task-8-llm-wiki-methodology.md"
  evidence_files:
    - ".omo/evidence/task-8-llm-wiki-methodology.md"
  forbidden_files_touched: []
  acceptance:
    - "Protocol defines one worktree and branch per writer, task IDs, path claims, high collision paths, read-sharing with write exclusivity, stale checks, merge order, handback, cleanup, and human escalation."
    - "Protocol distinguishes context isolation from filesystem isolation and treats Agent Teams as experimental."
    - "Deterministic dry-run template includes task ID, worktree, owned paths, forbidden paths, base revision, handoff, and exact merge_decision enum."
    - "Dry runs mark two disjoint component tasks as merge_decision allowed and two centers.json writers as merge_decision reject."
    - "Probe matrix covers stale state, dirty worktree, repeated interruption, misleading output, cleanup, and marks other classes not applicable."
  verification:
    - "Owned files exist and content search found required terms and exact high collision paths."
    - "Unicode dash scan returned zero en dash or em dash characters in both owned files."
    - "npm run lint failed because eslint was not found; install was forbidden."
    - "npm run build with external outDir failed because vite was not found; install was forbidden and no build output was created."
    - "Branch/worktree/base checks confirmed agent/llm-wiki-t8, the assigned worktree path, and base revision."
    - "Status plus SHA-256 hashes separate read-only seeded docs from the two write-owned Task 8 files."
  risks:
    - "Lint and build couldn't execute without installing dependencies."
  cleanup_receipt: "No real worktrees, branches, staged files, commits, installs, servers, or generated artifacts were created beyond owned markdown outputs."
```
