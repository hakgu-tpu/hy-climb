# Product Stakeholder Authority Split Evidence Receipt

Date: 2026-08-09

## Verdict

PASS for the documentation split verification after documentation-quality remediation. The four target wiki files exist, the stakeholder and `STK-003` authority split is readable, target Markdown links resolve, the required legacy IDs remain mapped, the Proposed CMS boundary is constrained, and no CMS/auth/RBAC implementation was introduced by this verification task.

`npm run build` passed. `npm run lint` did not pass because of the known pre-existing baseline issue in `src/contexts/LangContext.jsx` Fast Refresh export shape; lint is therefore recorded as failed baseline, not passed.

## Changed-Path Scope

This receipt is the only file edited by this verification task:

- `.omo/evidence/product-stakeholder-authority-split.md`

The documentation files verified were read-only in this task:

- `docs/wiki/03-product.md`
- `docs/wiki/01-index.md`
- `docs/wiki/03-product/01-stakeholder-catalog.md`
- `docs/wiki/03-product/02-operational-authority.md`

Scoped git checks showed the target docs are under an untracked `docs/` tree, so `git diff -- docs/wiki/...` is empty and must not be interpreted as a clean whole-doc diff. Repository state also contained pre-existing unrelated dirty paths: deleted `.claude/settings.local.json`, modified `.gitignore`, `CLAUDE.md`, `README.md`, `component-spec.md`, `data-schema.md`, `tasks.md`, `ui-spec.md`, and untracked `.claude/`, `.obsidian/`, `.omo/`, and `docs/`.

## Readback Results

Read commands/tools:

- Read `docs/wiki/03-product.md`.
- Read `docs/wiki/01-index.md`.
- Read `docs/wiki/03-product/01-stakeholder-catalog.md`.
- Read `docs/wiki/03-product/02-operational-authority.md`.
- `rg -n 'STK-00[1-5]|STK-006|UC01|UC02|UC03|UC04|UC12|UC13|UC14|UC15|GOAL-[0-9]{3}|REQ-[0-9]{3}|UC-[0-9]{3}|FEAT-[0-9]{3}|CMS|Proposed|Product Owner|publisher|authentication|RBAC|runtime auth' docs/wiki`
- `rg -n '\[[^]]+\]\([^)]+\)|\[\[' docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md`
- `rg -n 'Governing Proposed CMS memo|evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, no stable ID rule|상태: `Proposed`|Trigger|영향 받는 기존 개념|Non-goal|Product Owner|새 stable role ID|새 기능 ID, 요구사항 ID, 유스케이스 ID, 목표 ID를 만들지 않는다|새 stable role ID, stakeholder ID, feature ID를 만들지 않는다' docs/wiki/03-product.md docs/wiki/03-product/02-operational-authority.md`

Observed exact content checkpoints:

- `docs/wiki/03-product.md` uses relative Markdown links `[이해관계자 카탈로그](03-product/01-stakeholder-catalog.md)` and `[STK-003 운영 권한 모델](03-product/02-operational-authority.md)`.
- `docs/wiki/01-index.md` uses relative Markdown links for canonical navigation, including `[03-product.md](03-product.md)`, `[03-product/01-stakeholder-catalog.md](03-product/01-stakeholder-catalog.md)`, and `[03-product/02-operational-authority.md](03-product/02-operational-authority.md)`.
- `docs/wiki/03-product/01-stakeholder-catalog.md` uses relative Markdown links `[제품 랜딩](../03-product.md)` and `[운영 권한 경계](02-operational-authority.md)`.
- `docs/wiki/03-product/02-operational-authority.md` points directly to the governing Proposed CMS memo with `[03-product.md의 Proposed CMS 전환 메모](../03-product.md#proposed-cms-전환-메모)`.
- `docs/wiki/03-product.md` preserves stakeholder rows `STK-001` through `STK-005` and no positive `STK-006` stakeholder assignment.
- `docs/wiki/03-product/01-stakeholder-catalog.md` repeats only `STK-001` through `STK-005`, states it creates no new stable ID, and says `STK-006` is not created.
- `docs/wiki/03-product.md` preserves all legacy UC alias pairs: `UC01 -> UC-001`, `UC02 -> UC-002`, `UC03 -> UC-003`, `UC04 -> UC-004`, `UC12 -> UC-012`, `UC13 -> UC-013`, `UC14 -> UC-014`, and `UC15 -> UC-015`.
- `docs/wiki/03-product.md` keeps `UC-005` through `UC-011` empty to avoid reusing the legacy `UC12` alias.
- `docs/wiki/03-product.md` includes the Proposed CMS note with affected existing concepts only: `STK-003`, `GOAL-005`, `REQ-003`, `REQ-006`, `REQ-011`, `REQ-014`, `REQ-016`, `REQ-017`, `REQ-018`, `REQ-019`, `REQ-020`, `UC-014`, `UC-015`, `FEAT-008`, and `FEAT-009`.
- `docs/wiki/03-product/02-operational-authority.md` status is exactly `상태: `Proposed`.`.
- `docs/wiki/03-product/02-operational-authority.md` says the governing memo stores evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, and no stable ID rule, and also states this page creates no new stable role ID, stakeholder ID, or feature ID.
- Both `docs/wiki/03-product.md` and `docs/wiki/03-product/02-operational-authority.md` define exactly six CMS categories: `센터 카탈로그`, `운영 이벤트·정기모임`, `다국어 콘텐츠`, `미디어 자산`, `공통 운영·외부 연동 설정`, and `게시·검증 메타데이터`.
- CMS publisher boundaries are stated: `인증된 콘텐츠 게시 승인자` can independently publish only approved operational content inside the future CMS boundary, while Product Owner approval remains required for data model changes, authorization policy changes, stable ID changes, and product-scope/current behavior changes.
- Current public static SPA boundaries are stated: no login/authentication, no RBAC, no admin screen, and no CMS runtime in the current implementation.

## Link and Runtime-Scope Checks

Command:

```bash
python3 - <<'PY'
from pathlib import Path
import re
root = Path('/Users/idealjin/Desktop/Project/Climb')
wiki = root / 'docs/wiki'
paths = [
    'docs/wiki/03-product.md',
    'docs/wiki/01-index.md',
    'docs/wiki/03-product/01-stakeholder-catalog.md',
    'docs/wiki/03-product/02-operational-authority.md',
]
for rel in paths:
    print(f'EXISTS {rel}: {(root / rel).is_file()}')

def candidates_for(source, target):
    base = (root / source).parent
    raw = target.split('#', 1)[0]
    values = []
    if raw:
        values.append(base / raw)
        values.append(wiki / raw)
        if Path(raw).suffix == '':
            values.append((base / raw).with_suffix('.md'))
            values.append((wiki / raw).with_suffix('.md'))
    return values

for rel in paths:
    text = (root / rel).read_text()
    targets = []
    targets.extend(re.findall(r'\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)', text))
    targets.extend(re.findall(r'\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]', text))
    for target in targets:
        if '://' in target or target.startswith('#'):
            continue
        candidates = candidates_for(rel, target)
        existing = next((p for p in candidates if p.exists()), None)
        resolved = existing or candidates[0]
        print(f'LINK {rel} -> {target}: {existing is not None} ({resolved.resolve().relative_to(root) if resolved.resolve().is_relative_to(root) else resolved.resolve()})')
PY
```

Result: all four target files printed `EXISTS ...: True`; every target Markdown link printed `LINK ...: True`, including the landing split links, stakeholder page relative links, and the `02-operational-authority.md` anchor link to `../03-product.md#proposed-cms-전환-메모`.

Final remediation link/content commands:

```bash
python3 - <<'PY'
from pathlib import Path
import re
root = Path('/Users/idealjin/Desktop/Project/Climb')
paths = [
    Path('docs/wiki/03-product.md'),
    Path('docs/wiki/01-index.md'),
    Path('docs/wiki/03-product/01-stakeholder-catalog.md'),
    Path('docs/wiki/03-product/02-operational-authority.md'),
]
heading_re = re.compile(r'^#+\s+(.+?)\s*$', re.M)
def slug(text):
    text = re.sub(r'[`*_]', '', text).strip().lower()
    text = re.sub(r'\s+', '-', text)
    return text
for rel in paths:
    text = (root / rel).read_text()
    print(f'FILE {rel} EXISTS {(root / rel).is_file()}')
    print(f'OBSIDIAN_LINKS {rel}: {bool(re.search(r"\[\[", text))}')
    headings = {slug(match.group(1)) for match in heading_re.finditer(text)}
    for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', text):
        raw_path, _, anchor = target.partition('#')
        if '://' in raw_path or raw_path.startswith('mailto:'):
            continue
        destination = ((root / rel).parent / raw_path).resolve() if raw_path else (root / rel).resolve()
        path_ok = destination.exists()
        anchor_ok = True
        if anchor and path_ok:
            target_headings = headings if destination == (root / rel).resolve() else {slug(m.group(1)) for m in heading_re.finditer(destination.read_text())}
            anchor_ok = anchor.lower() in target_headings
        print(f'LINK {rel} -> {target}: path={path_ok} anchor={anchor_ok}')
PY

rg -n '\[[^]]+\]\([^)]+\)|\[\[' docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md

rg -n 'Governing Proposed CMS memo|evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, no stable ID rule|상태: `Proposed`|Trigger|영향 받는 기존 개념|Non-goal|Product Owner|새 stable role ID|새 기능 ID, 요구사항 ID, 유스케이스 ID, 목표 ID를 만들지 않는다|새 stable role ID, stakeholder ID, feature ID를 만들지 않는다' docs/wiki/03-product.md docs/wiki/03-product/02-operational-authority.md
```

Result: all four files existed, `OBSIDIAN_LINKS ...: False` for every target file, every Markdown link had `path=True`, and the Proposed CMS anchor had `anchor=True`. The content search showed `02-operational-authority.md` line 7 points to the governing memo and explicitly names evidence, trigger, affected IDs, non-goal, owner-decision requirement, and no stable ID rule; `03-product.md` line 55 contains the governing Proposed memo metadata and affected ID list.

Command:

```bash
rg -n 'auth|authentication|RBAC|login|admin|cms|CMS|role|permission' src public package.json
```

Result: the only match under `src`, `public`, and `package.json` was `src/assets/react.svg` containing SVG `role="img"`. No runtime authentication, RBAC, login, admin, CMS, permission, or app role code was found in the current public static SPA surface.

## Git Scope Commands

Commands:

```bash
GIT_MASTER=1 git status --short
GIT_MASTER=1 git diff -- docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md .omo/evidence/product-stakeholder-authority-split.md
GIT_MASTER=1 git diff --stat -- docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md .omo/evidence/product-stakeholder-authority-split.md
```

Results before writing this receipt:

- `GIT_MASTER=1 git status --short` showed unrelated dirty tracked files plus untracked `.omo/` and `docs/` trees.
- The scoped `git diff` and scoped `git diff --stat` emitted no output because the target docs and evidence path were untracked, not because the entire docs/evidence scope was clean.

Final scoped check after this receipt update:

- `GIT_MASTER=1 git status --short -- docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md .omo/evidence/product-stakeholder-authority-split.md` reported those five scoped paths as untracked.
- `GIT_MASTER=1 git diff -- docs/wiki/03-product.md docs/wiki/01-index.md docs/wiki/03-product/01-stakeholder-catalog.md docs/wiki/03-product/02-operational-authority.md .omo/evidence/product-stakeholder-authority-split.md` emitted no output because the scoped paths are untracked, not because the untracked docs/evidence tree is clean.

## Build and Lint Commands

Command:

```bash
npm run build
```

Result: PASS. Vite built 48 modules and emitted `dist/index.html`, `dist/assets/index-D9BOGmAH.css`, and `dist/assets/index-s3-MShRp.js`. Node also printed a deprecation warning for `module.register()`, but the build exited successfully.

Command:

```bash
npm run lint
```

Result: FAIL, pre-existing baseline. ESLint reported exactly one error:

```text
/Users/idealjin/Desktop/Project/Climb/src/contexts/LangContext.jsx
  43:14  error  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

✖ 1 problem (1 error, 0 warnings)
```

This matches the expected known baseline finding and was not introduced or changed by this docs/evidence verification task.
