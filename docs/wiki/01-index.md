# Hy-Climb 위키

`docs/wiki/`는 Hy-Climb 제품 지식의 canonical source다. 구현 코드, 라우팅 파일, 기존 작업 노트, 프롬프트 기록, `CLAUDE.md`는 이 위키를 읽기 위한 보조 자료다. 서로 다르면 `docs/wiki/`가 우선한다.

## 목적

이 위키는 사람이 오래 유지할 결정과 LLM이 반복해서 참조할 작업 지식을 같은 규칙으로 묶는다. 새 기능, 요구사항, 정책, 유스케이스, 기능 단위는 여기서 ID를 받고 상태를 가진다.

## 상태 읽기 계약

사람과 LLM은 같은 상태 단어를 같은 뜻으로 읽는다. `Current`, `Proposed`, `Deferred`는 승인 단계가 아니라 문장의 근거와 사용 범위를 나누는 표시다.

| 표시 | 읽는 법 | 구현 기준 여부 |
|---|---|---|
| `Current` | 현재 저장소나 위키에서 확인되는 사실이다. 문장 안에 근거가 되는 repo 또는 Wiki path가 있어야 한다. | 현재 구현과 QA를 설명할 수 있다. |
| `Proposed` | 검토 후보일 뿐이다. evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, no stable ID를 함께 적는다. | 구현 기준이 아니다. |
| `Deferred` | 별도 owner approval 전까지 범위 밖이다. 구현 수용 기준이나 완료 표현을 쓰지 않는다. | 구현 기준이 아니다. |

`Proposed`는 horizon-not-approval 원칙을 따른다. 위키에 보인다는 사실은 승인이나 일정 약속이 아니다. 후보는 unnumbered candidate로만 쓴다. stable ID, durable decision, acceptance language는 promotion boundary를 넘은 뒤에만 생긴다. Promotion boundary는 human owner가 evidence, 영향 받는 기존 ID, non-goal, 테스트 영향, 범위 영향을 보고 명시적으로 승인하는 지점이다.

LLM은 이 표를 먼저 확인한다. Current로 쓸 문장은 repo path나 Wiki path를 붙이고, Proposed나 Deferred를 Current처럼 말하지 않는다. 사람은 Proposed 후보를 읽을 때 아이디어와 승인된 작업을 분리해서 판단한다.

## 읽는 순서

아래 링크는 현재 존재하는 canonical page만 포함한 공식 읽기 순서다. [03-product.md](03-product.md)는 제품 랜딩이며, 기존 호환성을 위해 이해관계자, 목표, 요구사항, 유스케이스, 기존 UC 별칭 매핑을 계속 통합 보관한다. 세부 보조 문서는 [03-product/01-stakeholder-catalog.md](03-product/01-stakeholder-catalog.md)와 [03-product/02-operational-authority.md](03-product/02-operational-authority.md)에서 확인한다.

1. [02-governance.md](02-governance.md), 권한, 상태, 변경 절차를 먼저 확인한다.
2. [03-product.md](03-product.md), 제품 랜딩, 제품 범위, 이해관계자, 목표, 요구사항, 유스케이스, 기존 UC 별칭 매핑을 확인한다.
3. [03-product/01-stakeholder-catalog.md](03-product/01-stakeholder-catalog.md), 이해관계자 세부 참조를 확인한다.
4. [03-product/02-operational-authority.md](03-product/02-operational-authority.md), `STK-003` 운영 권한과 Proposed CMS 경계를 확인한다.
5. [04-features.md](04-features.md), 구현 단위와 연결된 요구사항을 확인한다.
6. [05-architecture.md](05-architecture.md), 런타임 구조와 배포 형태를 확인한다.
7. [06-tdd-qa.md](06-tdd-qa.md), planned QA contract와 검증 기준을 확인한다.
8. [07-reference/01-component-spec.md](07-reference/01-component-spec.md), 컴포넌트 기준을 확인한다.
9. [07-reference/02-data-schema.md](07-reference/02-data-schema.md), 데이터 스키마 기준을 확인한다.
10. [07-reference/03-ui-spec.md](07-reference/03-ui-spec.md), UI 기준을 확인한다.
11. [08-harness/02-operating-model.md](08-harness/02-operating-model.md), LLM harness 운영 기준을 확인한다.
12. [08-harness/03-context-isolation.md](08-harness/03-context-isolation.md), stale context와 prompt injection 경계를 확인한다.
13. [08-harness/04-agent-contracts.md](08-harness/04-agent-contracts.md), worker packet과 DoneClaim 형식을 확인한다.
14. [08-harness/05-worktree-and-ownership.md](08-harness/05-worktree-and-ownership.md), path ownership와 `.omo` 운영 상태 소유권을 확인한다.
15. [08-harness/06-quality-and-evolution.md](08-harness/06-quality-and-evolution.md), gate와 roadmap 경계를 확인한다.
16. [09-decisions.md](09-decisions.md), approved durable methodology decisions를 확인한다.

## Stable ID 형식

모든 stable ID는 접두어, 하이픈, 세 자리 숫자를 쓴다. 숫자는 `001`부터 시작한다.

| 종류 | 형식 | 예시 |
|---|---|---|
| 이해관계자 | `STK-###` | `STK-001` |
| 목표 | `GOAL-###` | `GOAL-001` |
| 요구사항 | `REQ-###` | `REQ-001` |
| 유스케이스 | `UC-###` | `UC-001` |
| 기능 | `FEAT-###` | `FEAT-001` |

## 기존 ID 매핑

기존 문서의 `UC01`, `UC02`, `UC03`, `UC12` 같은 형식은 새 stable ID로 매핑한다. 예시는 `UC01 -> UC-001`이다. 매핑은 [03-product.md](03-product.md)의 기존 UC 별칭 매핑에 기록되며, 한 번 연결된 기존 ID와 새 ID는 바꾸지 않는다.

## Canonical 규칙

1. `docs/wiki/` 밖의 문서가 다르게 말하면 위키를 따른다.
2. 프롬프트 기록, 채팅 요약, 작업 메모, `CLAUDE.md`는 위키를 덮어쓸 수 없다.
3. 위키를 바꾸려면 [02-governance.md](02-governance.md)의 canonical-delta workflow를 따른다.
4. stable ID는 재사용하지 않는다. 삭제된 항목의 ID도 다시 쓰지 않는다.
5. 사람이 승인해야 오래 남는 정책, 범위, 데이터 의미가 durable decision이 된다.
6. 작성자는 자신이 쓴 durable decision을 스스로 승인할 수 없다.
7. canonical 변경은 조용히 합치지 않는다. 변경 이유, 영향, 승인자를 남긴다.

## 작성 원칙

문장은 짧게 쓴다. 사람이 읽을 배경과 LLM이 찾을 키워드를 함께 남긴다. 제품 정책과 구현 지침을 섞지 말고, 구현 세부사항은 연결된 기능 문서에서 요구사항과 연결한다.
