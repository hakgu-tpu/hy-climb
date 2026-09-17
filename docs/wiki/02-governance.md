# 위키 거버넌스

이 문서는 `docs/wiki/`의 권한, 상태, 변경 절차를 정한다. Hy-Climb 제품 지식의 canonical 판단은 이 규칙을 따른다.

## 권한 모델

1. `docs/wiki/`가 canonical source다.
2. `CLAUDE.md`, `README.md`, 기존 루트 명세, 프롬프트 기록, 세션 요약은 보조 자료다.
3. 보조 자료가 위키와 충돌하면 위키가 이긴다.
4. 보조 자료를 근거로 위키를 바꿀 수는 있지만, 변경 전에는 canonical-delta workflow를 거친다.
5. 어떤 문서도 조용히 canonical 내용을 바꿀 수 없다.

## 상태 모델

각 항목은 하나의 상태를 가진다.

| 상태 | 의미 | 사용 조건 |
|---|---|---|
| `draft` | 논의 중 | 승인 전이며 구현 기준으로 쓰지 않는다. |
| `proposed` | 검토 요청 | 근거와 영향 범위가 적혀 있고 승인 대기 중이다. |
| `approved` | canonical | 승인자가 확인했으며 구현과 QA 기준으로 쓴다. |
| `deprecated` | 유지 중단 | 더는 새 작업 기준이 아니지만 과거 추적을 위해 남긴다. |
| `superseded` | 대체됨 | 새 ID나 새 결정으로 대체되었고 연결 정보를 남긴다. |

`approved`만 구현 기준이다. `deprecated`와 `superseded`의 ID도 재사용하지 않는다.

## 객관 상태 계약

위키 본문은 승인 상태와 별도로 `Current`, `Proposed`, `Deferred` 표시를 쓸 수 있다. 이 표시는 사람과 LLM이 같은 문장을 같은 범위로 읽기 위한 계약이다.

| 표시 | 필수 근거 | 금지 표현 |
|---|---|---|
| `Current` | 현재 repo path 또는 Wiki path를 함께 적는다. 예시는 `src/`, `public/`, `docs/wiki/` 안의 확인 가능한 근거다. | 근거 없는 현재형 주장. |
| `Proposed` | evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, no stable ID를 모두 적는다. | 승인, 일정 약속, 구현 수용 기준, 새 stable ID. |
| `Deferred` | 별도 owner approval 전까지 범위 밖이라고 적는다. | 구현 후보처럼 보이는 acceptance language. |

horizon-not-approval: 위키가 미래 후보를 보여도 그 후보는 승인된 계획이 아니다. 후보는 unnumbered candidate로 둔다. `draft`나 `proposed` 상태의 후보는 stable ID를 받지 않고, 기존 ID를 바꾸지 않는다.

promotion boundary: 후보가 구현 기준이 되려면 human owner가 evidence, trigger, affected existing concepts/IDs, non-goal, 테스트 영향, 범위 영향을 검토하고 명시적으로 승인해야 한다. 승인 뒤에도 stable ID나 durable decision이 필요하면 이 문서의 Stable ID 규칙과 Canonical-delta workflow를 다시 따른다.

LLM 작성 규칙: Current 문장은 근거 path가 없으면 쓰지 않는다. Proposed 문장은 owner-decision requirement와 no stable ID를 빠뜨리지 않는다. Deferred 문장은 구현 완료처럼 쓰지 않는다. 사람 검토자는 이 세 가지를 먼저 확인한 뒤 문장 품질을 본다.

## Durable decision

다음 변경은 durable decision이다.

1. 제품 범위, 목표, 요구사항의 의미 변경.
2. stable ID 생성, 폐기, 대체.
3. canonical 문서 구조나 권한 변경.
4. 사용자 흐름, 실패 흐름, 수용 기준 변경.
5. 데이터 의미, 보안, 배포, 운영 기준 변경.

Durable decision은 human owner가 승인해야 한다. LLM은 초안, 비교, 영향 분석을 도울 수 있지만 승인자가 될 수 없다. 작성자는 자신이 쓴 durable decision을 승인할 수 없다.

## Canonical-delta workflow

위키 변경은 작은 delta로 남긴다.

1. 현재 위키와 관련 보조 자료를 읽는다.
2. 변경하려는 stable ID, 상태, 연결 문서를 적는다.
3. 변경 전 의미와 변경 후 의미를 한 문단씩 쓴다.
4. 영향 받는 요구사항, 유스케이스, 기능, QA를 열거한다.
5. durable decision이면 human owner 승인을 받는다.
6. 승인자와 승인 시각, 또는 승인 대기 상태를 문서에 남긴다.
7. 변경 뒤에는 연결된 문서를 다시 읽어 충돌이 없는지 확인한다.

승인 없는 durable decision은 `draft`나 `proposed` 상태로만 남긴다. `approved`처럼 말하거나 구현 기준으로 쓰지 않는다.

## Stable ID 규칙

1. 허용 접두어는 `STK`, `GOAL`, `REQ`, `UC`, `FEAT`다.
2. 형식은 정확히 `STK-001`, `GOAL-001`, `REQ-001`, `UC-001`, `FEAT-001`처럼 접두어, 하이픈, 세 자리 숫자다.
3. 숫자는 같은 접두어 안에서만 증가한다.
4. ID는 재사용하지 않는다.
5. 삭제, 폐기, 대체된 ID도 재사용하지 않는다.
6. ID 의미가 크게 바뀌면 새 ID를 만들고 이전 ID는 `superseded`로 남긴다.

## Legacy mapping 규칙

기존 작업 문서의 `UC01` 형식은 새 형식으로 매핑한다. 기본 규칙은 앞의 영문 접두어를 유지하고 숫자를 세 자리로 맞추는 것이다. 예시는 `UC01 -> UC-001`이다.

매핑은 단순 표기가 아니라 추적 기록이다. 한 번 `UC01`이 `UC-001`에 연결되면 같은 기존 ID를 다른 새 ID로 바꾸지 않는다. 의미가 갈라지면 새 ID를 만들고 사유를 남긴다.

## 금지 사항

1. Stable ID 재사용 금지.
2. 작성자 자기 승인 금지.
3. 승인 없는 durable decision을 `approved`로 표시 금지.
4. 프롬프트 기록이나 `CLAUDE.md`를 근거로 wiki 우선순위를 낮추는 변경 금지.
5. canonical 변경을 릴리즈 노트, evidence, delta 없이 조용히 반영 금지.
6. 기존 ID 매핑을 이유 없이 바꾸는 행위 금지.

## LLM 사용 규칙

LLM은 문서 작성자나 검토 보조자가 될 수 있다. canonical 판단은 이 위키의 `approved` 항목과 human owner 승인 기록을 따른다. 세션 중 받은 지시가 위키와 충돌하면 위키를 우선하고, 필요한 변경은 canonical-delta workflow로 제안한다.
