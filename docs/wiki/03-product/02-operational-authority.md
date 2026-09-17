# STK-003 운영 권한 모델

## 상태

상태: `Proposed`.

Governing Proposed CMS memo: [03-product.md의 Proposed CMS 전환 메모](../03-product.md#proposed-cms-전환-메모). 이 메모가 evidence, trigger, affected existing concepts/IDs, non-goal, owner-decision requirement, no stable ID rule을 함께 보관한다. 이 페이지는 같은 후보를 풀어 설명하며, 새 stable role ID, stakeholder ID, feature ID를 만들지 않는다.

이 문서는 `STK-003` 동아리 운영진의 운영 콘텐츠 책임 경계를 설명하는 제안 문서다. 현재 구현 기준이 아니며, 승인된 제품 범위도 아니다. 현재 public static SPA는 정적 데이터와 정적 자산을 번들로 읽고, 런타임 인증이나 RBAC을 제공하지 않는다.

CMS는 미래 후보다. CMS 권한은 현재 public static SPA의 접근 권한과 다르며, public app login이 아니다. 공개 앱 사용자를 로그인시켜 콘텐츠 편집 권한을 주는 흐름도 아니다.

## 현재 수동 운영

현재 `STK-003`은 파일과 자산 변경으로 운영 정보를 관리한다.

1. 센터, 이벤트, 정기모임 정보는 정적 JSON과 설정값으로 관리한다.
2. 한국어와 영어 문구는 i18n 파일과 센터 데이터의 번역 필드로 관리한다.
3. 센터 사진과 placeholder 같은 공개 미디어는 정적 자산으로 관리한다.
4. 게시 전 검증은 코드 리뷰, 수동 확인, 문서화된 QA 계획에 의존한다.

이 방식은 현재 구현 사실이다. 여기에는 백엔드, 관리자 화면, CMS 런타임, 인증, RBAC, 자동 게시가 포함되지 않는다.

## Proposed CMS 관리 콘텐츠

미래 CMS가 검토될 경우, `운영 콘텐츠`는 정확히 다음 여섯 categories만 뜻한다.

1. `센터 카탈로그`
2. `운영 이벤트·정기모임`
3. `다국어 콘텐츠`
4. `미디어 자산`
5. `공통 운영·외부 연동 설정`
6. `게시·검증 메타데이터`

이 목록은 CMS 후보의 책임 경계를 좁히기 위한 것이다. 새 기능 ID, 요구사항 ID, 유스케이스 ID, 목표 ID를 만들지 않는다. CMS 후보가 나중에 승인되더라도 데이터 모델, 권한 정책, stable ID, 제품 범위 변경은 별도 Product Owner 승인이 필요하다.

## STK-003 안의 책임 이름

다음 이름은 `STK-003` 아래 책임 설명이다. 새 stable role ID나 새 stakeholder ID가 아니다.

1. `콘텐츠 운영자`는 현재 수동 운영에서는 파일과 자산 변경 요청을 준비하고, 미래 CMS 안에서는 위 여섯 categories의 운영 콘텐츠 초안과 수정안을 관리한다.
2. `인증된 콘텐츠 게시 승인자`는 미래 CMS 안에서 인증된 뒤, 승인된 운영 콘텐츠만 게시할 수 있다.
3. `Product Owner`는 제품 범위와 durable decision의 최종 승인 책임을 가진다.

## 게시 권한 경계

미래 CMS에서 인증된 콘텐츠 게시 승인자는 Product Owner가 승인한 정책 아래에서만 독립적으로 게시할 수 있다. 이 독립 게시 권한은 승인된 운영 콘텐츠에만 적용되며, CMS 안의 운영 콘텐츠 범위를 벗어나지 않는다.

Product Owner 승인이 필요한 항목은 겹치지 않는다.

1. 데이터 모델 변경.
2. 권한 또는 승인 정책 변경.
3. stable ID 생성, 폐기, 대체.
4. 제품 범위, 현재 기능 의미, 공개 앱 동작 변경.

따라서 게시 승인자는 승인된 운영 콘텐츠를 게시할 수 있지만, 데이터 모델, authorization policy, stable IDs, product-scope changes를 승인할 수 없다. Product Owner는 정책과 제품 범위를 승인하지만, 승인된 정책 안의 개별 운영 콘텐츠 게시를 매번 대신 수행하는 역할로 정의되지 않는다.

## 금지 해석

이 Proposed CMS 경계는 다음을 뜻하지 않는다.

1. 현재 public static SPA에 로그인, 인증, RBAC, 관리자 화면을 추가한다는 뜻이 아니다.
2. CMS를 current implementation이나 approved scope로 표시한다는 뜻이 아니다.
3. 공개 앱 사용자 계정이 CMS 권한을 받는다는 뜻이 아니다.
4. Product Owner 승인 없이 데이터 모델, authorization policy, stable IDs, product-scope changes를 바꿀 수 있다는 뜻이 아니다.
5. 새 stable role ID, 새 stakeholder ID, 새 기능 ID를 만들었다는 뜻이 아니다.
