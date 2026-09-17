# Task 2 LLM Wiki Methodology

## 범위

작업 대상은 격리 worktree `/var/folders/k8/f9vvd9qj26q5vw6dxs5lb_k40000gn/T/opencode/climb-llm-wiki-t2` 안의 `docs/wiki/product.md`와 `.omo/evidence/task-2-llm-wiki-methodology.md`뿐이다. 소스 코드, 기존 루트 문서, 다른 위키 페이지, git stage, commit, install은 건드리지 않았다.

## 기준 상태

`docs/wiki/product.md`는 최초 작성 전 읽기 시도에서 `File not found`로 확인됐다. `component-spec.md`, `data-schema.md`, `tasks.md`는 `docs/` 아래가 아니라 worktree 루트에 있었다. 이번 verifier correction에서는 기존 owned docs와 verifier가 지적한 `NaverMapButton.jsx`, `naverMap.js`, `MeetingBanner.jsx`, `EventBanner.jsx`, `component-spec.md`, `tasks.md`, `centers.json` 관련 부분을 다시 읽고 수정했다.

## 읽은 자료

| 분류 | 파일 |
|---|---|
| 지시와 제품 개요 | `CLAUDE.md` |
| 컴포넌트 명세 | `component-spec.md` |
| 데이터 명세 | `data-schema.md` |
| 진행과 기존 UC | `tasks.md` |
| 라우팅과 페이지 | `src/App.jsx`, `src/pages/HomePage.jsx`, `src/pages/CenterDetailPage.jsx`, `src/pages/NotFoundPage.jsx` |
| 센터 UI | `CenterList.jsx`, `CenterFilter.jsx`, `CenterCard.jsx`, `CenterDetail.jsx`, `NaverMapButton.jsx`, `ImageCarousel.jsx`, `SnsLinks.jsx`, `ParkingInfo.jsx` |
| 배너와 레이아웃 | `EventBanner.jsx`, `MeetingBanner.jsx`, `Navbar.jsx`, `LangToggle.jsx`, `Footer.jsx` |
| 언어와 유틸 | `LangContext.jsx`, `ko.json`, `en.json`, `naverMap.js`, `formatEventDate.js` |
| 데이터와 배포 | `centers.json`, `config.json`, `public/_redirects`, `package.json` |

## UC alias 탐지와 correction

검색식 `UC[0-9]{2}|UC-[0-9]{3}`로 기존 참조를 찾았다. 발견된 기존 alias는 `UC01`, `UC02`, `UC03`, `UC04`, `UC12`, `UC13`, `UC14`, `UC15`다.

| 기존 alias | 문서화한 기준 UC | correction 후 판단 |
|---|---|---|
| `UC01` | `UC-001` | 목록 표시와 필터링이 모두 `UC01`로 쓰였으므로 하나의 canonical UC에 정상 흐름과 subflow로 보존했다. |
| `UC02` | `UC-002` | 카드 클릭 후 상세 페이지 이동으로 보존했다. |
| `UC03` | `UC-003` | 일반 길찾기 의미로 보존했다. |
| `UC04` | `UC-004` | `tasks.md`의 `UC01 ~ UC04` 완료 기준과 route 확인 항목을 근거로 route edge behavior로 보존했다. |
| `UC12` | `UC-012` | 한대앞역 출발 길찾기로 보존했다. |
| `UC13` | `UC-013` | 언어 전환으로 보존했다. |
| `UC14` | `UC-014` | 이벤트 배너로 보존했다. |
| `UC15` | `UC-015` | 정기모임 배너로 보존했다. |

`UC-005`부터 `UC-011`까지는 기존 `UC12`를 재활용하지 않기 위해 비웠다. 이전 산출물의 `UC01 -> UC-001, UC-002`와 `UC02 -> UC-003` 같은 다대일 또는 번호 불일치 매핑은 correction에서 제거했다.

## Verifier finding 반영

| finding | 반영 내용 |
|---|---|
| one-to-one alias mapping | `UC01 -> UC-001`, `UC02 -> UC-002`, `UC03 -> UC-003`, `UC04 -> UC-004`, `UC12 -> UC-012`, `UC13 -> UC-013`, `UC14 -> UC-014`, `UC15 -> UC-015`로 고정했다. |
| UC01 split | 목록 표시와 필터링을 별도 canonical UC로 나누지 않고 `UC-001`의 정상 흐름과 subflow로 합쳤다. |
| malformed naverPlaceId | `CLAUDE.md`와 `naverMap.js` 정책은 `isValidPlaceId()`와 `PLACE_POI`를 요구하지만, 현재 `NaverMapButton.jsx`는 `isValidUrl(url)`만 쓰므로 malformed `naverPlaceId`도 HTTPS URL이면 활성화될 수 있다고 명시했다. |
| MeetingBanner stale spec | 루트 `component-spec.md`는 센터 불일치 시 `null` 반환이라고 쓰지만, 현재 `MeetingBanner.jsx`는 장소 미정 배너를 렌더링한다. Current behavior를 구현 기준으로 문서화하고 루트 spec을 stale discrepancy로 기록했다. |
| tasks.md stale 3-center proof | `tasks.md`의 3개 센터 번들 확인은 live `centers.json` 11개와 맞지 않으므로 stale historical evidence로 표시했다. |
| EventBanner link condition | `EventBanner.jsx`에서 링크 버튼은 `isExpanded && description` 확장 영역 안에서 다시 `event.linkUrl`이 있을 때만 렌더링된다. active event와 `linkUrl`만 있고 description이 없으면 링크는 노출되지 않는다고 수정했다. |

## 도출 원칙

1. 현재 코드와 JSON에서 확인되는 동작만 적었다.
2. 선택 필드는 데이터가 있을 때만 표시되는 조건부 동작으로 적었다.
3. 현재 `config.json`에서 이벤트와 정기모임은 비활성이므로, 기본 화면에는 보이지 않는다고 적었다.
4. 백엔드, 인증, CMS, 분석, 예약, 결제 같은 미구현 기능은 범위 밖으로 따로 적었다.
5. 모든 `REQ`는 `STK`, `GOAL`, `UC` 열에 연결했다.
6. 모든 `UC`에는 선행조건, 정상 흐름, 대체 또는 실패 흐름, 우선순위, 인수 문장을 넣었다.

## UltraQA probes

| 클래스 | 결과 | 근거 |
|---|---|---|
| stale_state | 통과 | correction 전 owned docs와 verifier 관련 구현 파일을 다시 읽었다. `tasks.md`의 3개 센터 확인은 live 11개 데이터와 맞지 않는 stale historical evidence로 표시했다. `EventBanner.jsx`의 현재 링크 조건도 다시 확인했다. |
| dirty_worktree | 통과 | 작성 대상은 owned file 두 개뿐이다. 최종 검증에서 git status로 변경 범위를 확인한다. |
| malformed input | 통과 | 없는 상세 ID는 홈으로 이동, 알 수 없는 route는 404, 이미지 로드 실패는 placeholder, 없는 optional 데이터는 섹션 생략, 비활성 또는 만료 배너는 미표시, current malformed `naverPlaceId` 활성화 가능성을 문서화했다. |
| route edge behavior | 통과 | `/`, `/center/:id`, `*`, `public/_redirects`의 실제 구현을 제품 요구와 `UC-004`에 반영했다. |
| misleading_success_output | 통과 | 현재 데이터의 이벤트와 정기모임이 `active: false`라 기본 화면에 배너가 보이지 않는다는 제한, `tasks.md` 3-center proof의 stale 상태, 이벤트 링크가 `isExpanded && description && event.linkUrl`에서만 노출되는 제한을 명시했다. |
| security | 해당 없음 | 산출물이 정적 제품 문서이고 보안 리뷰나 코드 변경이 아니다. |
| performance | 해당 없음 | 런타임 성능을 바꾸지 않고 문서만 수정했다. |
| accessibility | 해당 없음 | UI를 변경하지 않았다. 접근성 관련 구현 사실만 소스에서 확인한 범위로 문서화했다. |
| data migration | 해당 없음 | 저장 데이터 형식과 JSON을 변경하지 않았다. |
| concurrency | 해당 없음 | 동시성 코드나 서버 상태가 없다. |
| external service availability | 해당 없음 | 네이버 지도와 외부 SNS는 열리는 URL 계약만 문서화했고 실제 외부 서비스 상태를 성공 조건으로 삼지 않았다. |

## 대표 경로 워크

| 경로 | 확인한 문서화 결과 |
|---|---|
| 홈 목록과 필터 path | `UC-001`, `REQ-001`, `REQ-002`, `REQ-003`, `REQ-004`에 목록, 지역 필터, 제휴 필터를 하나의 UC로 적었다. |
| 상세 happy path | `UC-002`, `REQ-005`, `REQ-006`, `REQ-007`, `REQ-014`, `REQ-015`에 조건부 상세 섹션과 갤러리를 적었다. |
| 일반 길찾기 happy and malformed path | `UC-003`, `REQ-008`, `REQ-010`, `REQ-011`에 HTTPS URL, 새 탭 계약, `PLACE_POI` 정책 미적용 discrepancy를 적었다. |
| 정기모임 길찾기 path | `UC-012`, `REQ-009`, `REQ-010`, `REQ-011`에 한대앞역 출발 URL과 `PLACE_POI` 정책 미적용 discrepancy를 적었다. |
| 언어 happy path | `UC-013`, `REQ-012`, `REQ-013`, `REQ-014`에 감지, 토글, fallback을 적었다. |
| 이벤트와 모임 설정 path | `UC-014`, `UC-015`, `REQ-016`부터 `REQ-020`까지 활성, 비활성, EventBanner 링크 노출 조건, MeetingBanner 장소 미정 current behavior를 적었다. |
| 라우팅 failure path | `UC-004`, `REQ-021`, `REQ-022`, `REQ-023`에 잘못된 상세 ID, unknown path, static fallback을 적었다. |

## Cleanup receipt

지속 실행 프로세스, 임시 서버, 설치된 의존성, staged 파일, commit은 없다. 최종 `git status --short` 범위 확인 결과 변경 파일은 `docs/wiki/product.md`와 `.omo/evidence/task-2-llm-wiki-methodology.md`뿐이다.
