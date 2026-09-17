# F2 Fresh Audit After Cleanup Remediation

AdversarialVerify: confirmed

## Scope

Fresh F2 audit in `/Users/idealjin/Desktop/Project/Climb` after cleanup-schema remediation. I re-read current routing and reran the checks from current files. I edited only `.omo/evidence/final-F2-llm-wiki-methodology.md`.

Checked surfaces:

- `docs/wiki/**/*.md`
- `README.md`
- `CLAUDE.md`
- `component-spec.md`, `data-schema.md`, `ui-spec.md`, `tasks.md`
- `.claude/rules/*.md`
- `package.json`, `package-lock.json`

## Verdict

confirmed

All required structural checks pass. The new cleanup schema did not introduce dead links, angle/TODO placeholders, duplicate or orphan active IDs, TDD custom or legacy IDs, copied-policy paragraphs, dependency-version drift, structural readability failures, or inconsistent cleanup variables.

## Commands And Fresh Results

### Routing And File Discovery

Command:

```bash
rg --files docs/wiki README.md CLAUDE.md .claude/rules package.json package-lock.json component-spec.md data-schema.md ui-spec.md tasks.md .omo/evidence/final-F2-llm-wiki-methodology.md
```

Result: discovered 15 wiki markdown files, 3 `.claude/rules` files, root routing/stub files, `package.json`, `package-lock.json`, and this F2 evidence file. `CLAUDE.md` still routes readers to `docs/wiki/README.md`; `docs/wiki/README.md` links only existing canonical pages.

### Dead Local Links

Command:

```bash
node - <<'NODE'
// In-memory markdown link walker over docs/wiki, README.md, CLAUDE.md,
// root redirect stubs, and .claude/rules. Resolves local paths and anchors.
NODE
```

Result:

```json
{
  "filesChecked": 24,
  "deadLocalLinkCount": 0,
  "deadLocalLinks": []
}
```

### Angle Tokens And TODO/Fill Markers

Command:

```bash
rg -n "<[^>]+>" docs/wiki README.md CLAUDE.md .claude/rules component-spec.md data-schema.md ui-spec.md tasks.md
```

Result: no output. Angle-token count is 0.

Command:

```bash
rg -n "TODO|TBD|FIXME|XXX|PLACEHOLDER|lorem|ipsum|작성 예정|미정|나중에|WIP|\?\?\?|TODO:|fill in|fill-in|fill me|replace me|to be filled|TBA" docs/wiki README.md CLAUDE.md .claude/rules component-spec.md data-schema.md ui-spec.md tasks.md
```

Result: no output. TODO/fill marker count is 0.

### Canonical IDs, Duplicates, Orphans

Command:

```bash
node - <<'NODE'
// In-memory canonical ID scan over docs/wiki. Active definitions are catalog
// table first cells and UC headings. Stable references are checked for active defs.
NODE
```

Result:

```json
{
  "wikiFileCount": 15,
  "activeIdCount": 52,
  "activeIdFormatFailures": [],
  "duplicateActiveIdCount": 0,
  "duplicateActiveIds": [],
  "orphanActiveRefCount": 0,
  "orphanActiveRefs": [],
  "reservedGapRefCount": 2,
  "reservedGapRefs": [
    ["UC-005", ["docs/wiki/product.md:34"]],
    ["UC-011", ["docs/wiki/product.md:34"]]
  ],
  "malformedStableTokenCount": 37
}
```

Interpretation: active canonical IDs pass. The 37 malformed-token hits are legacy `UCxx` alias mentions in alias-mapping prose, not active IDs. Reserved `UC-005` and `UC-011` references are N/A because `product.md:34` documents the intentionally unused `UC-005` through `UC-011` range.

### TDD Custom And Legacy IDs

Command:

```bash
node - <<'NODE'
// Scan docs/wiki/tdd-qa.md for legacy UCxx tokens, custom REQ-[A-Z]+-NN
// tokens, and canonical stable tokens.
NODE
```

Result:

```json
{
  "legacyUcTokenCount": 0,
  "legacyUcSamples": [],
  "customReqTokenCount": 0,
  "customReqSamples": [],
  "canonicalStableTokenCount": 108
}
```

Command:

```bash
rg -n "\b(UC\d{2}|REQ-[A-Z]+-\d{2})\b" docs/wiki/tdd-qa.md
```

Result: no output.

### Dependency-Version Parity

Command:

```bash
node - <<'NODE'
// Compare package.json dependencies/devDependencies with package-lock.json
// root package dependencies/devDependencies.
NODE
```

Result:

```json
{
  "lockfileVersion": 3,
  "dependencyVersionParityFailureCount": 0,
  "dependencyVersionParityFailures": []
}
```

### Copied Policy Paragraphs In Routing/Stubs

Command:

```bash
node - <<'NODE'
// Compare normalized nonblank routing/stub lines against docs/wiki lines.
// Report consecutive copied runs of 3+ lines.
NODE
```

Result:

```json
{
  "stubFiles": [
    ".claude/rules/product-source.md",
    ".claude/rules/quality-test.md",
    ".claude/rules/wiki-harness.md",
    "CLAUDE.md",
    "README.md",
    "component-spec.md",
    "data-schema.md",
    "tasks.md",
    "ui-spec.md"
  ],
  "copiedPolicyParagraphRunCount": 0,
  "copiedPolicyParagraphRuns": []
}
```

### Structural Readability

Command:

```bash
node - <<'NODE'
// Structural readability scan over docs/wiki. Checks one H1 per page,
// headings, tables/bullets, examples/templates/cases, purpose/scope labels,
// and Korean flow labels where Korean use-case prose exists.
NODE
```

Result:

```json
{
  "fileCount": 15,
  "failures": []
}
```

Structural interpretation: Korean-heavy pages pass through concrete headings, labels, tables, mappings, and flow fields. `product.md` includes `정상 흐름`, `대체 또는 실패 흐름`, and `인수 문장`. Harness pages use summaries/principles plus YAML schemas, tables, templates, examples, and dry-run cases. English-only or low-Korean pages are N/A for Korean prose praise but still pass structural checks.

### Cleanup Schema Variable Consistency

Command:

```bash
node - <<'NODE'
// Check cleanup schema fields across operating-model, agent-contracts,
// context-isolation, worktree-and-ownership, and quality-and-evolution.
// Validates required cleanup fields, $UPPER_SNAKE_CASE variable format,
// and repeated cleanup variable values.
NODE
```

Result:

```json
{
  "filesChecked": [
    "docs/wiki/harness/operating-model.md",
    "docs/wiki/harness/agent-contracts.md",
    "docs/wiki/harness/context-isolation.md",
    "docs/wiki/harness/worktree-and-ownership.md",
    "docs/wiki/harness/quality-and-evolution.md"
  ],
  "invalidVariableFormatCount": 0,
  "invalidVariableFormat": [],
  "missingRequiredCleanupFields": [],
  "cleanupFieldLocationCounts": {
    "cleanup_timeout_seconds": 7,
    "cleanup_command_or_tool": 9,
    "cleanup_success_observable": 7,
    "cleanup_retry_limit": 7,
    "cleanup_escalation_target": 3,
    "cleanup_receipt": 3
  },
  "inconsistentCleanupVariableCount": 0,
  "inconsistentCleanupVariables": []
}
```

Interpretation: cleanup schema fields are present where schema blocks define packet or claim shapes. Variable placeholders use `$UPPER_SNAKE_CASE`. The nullable and non-null teardown variable variants are context-appropriate: schema templates use `_OR_NULL`, hung-cleanup dry runs use the non-null teardown command variable.

### Dirty Worktree Boundary

Command:

```bash
git status --short
```

Result before final evidence rewrite:

```text
D  .claude/settings.local.json
 M .gitignore
 M CLAUDE.md
 M README.md
 M component-spec.md
 M data-schema.md
 M tasks.md
 M ui-spec.md
?? .claude/
?? .omo/
?? docs/
```

Boundary: dirty/untracked cleanup-remediation state exists outside this audit. I did not edit, stage, commit, install, build, or modify anything outside this F2 evidence file.

## Gate Summary

| Gate | Fresh Result |
|---|---|
| Dead local links | PASS, 0 |
| Angle tokens | PASS, 0 |
| TODO/fill markers | PASS, 0 |
| Active canonical ID format | PASS, 0 failures |
| Duplicate active canonical IDs | PASS, 0 |
| Orphan active canonical references | PASS, 0 |
| TDD custom/legacy ID scan | PASS, 0 legacy `UCxx`, 0 custom `REQ-[A-Z]+-NN` |
| Dependency-version parity | PASS, 0 failures |
| Copied policy paragraphs in routing/stubs | PASS, 0 copied runs of 3+ consecutive nonblank lines |
| Structural readability | PASS, 0 failures |
| Cleanup schema variable consistency | PASS, 0 missing required fields, 0 invalid variable formats, 0 inconsistent cleanup variables |

## N/A And Cleanup Classes

- Reserved `UC-005` through `UC-011` references are N/A because they document intentionally unused ID gaps.
- Legacy `UCxx` alias prose outside TDD is N/A for active-ID format because active IDs use `PREFIX-###` and alias mapping is explicitly preserved.
- English-only or low-Korean pages are N/A for Korean prose readability but still pass structural checks.
- Absent non-npm lockfiles are N/A because the present lockfile is `package-lock.json` and parity with `package.json` passes.
- Cleanup: no persistent resources, installs, stages, commits, generated files, or non-evidence edits were created by this audit.
