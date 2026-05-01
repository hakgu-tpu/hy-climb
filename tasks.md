# Hy-Climb MVP 개발 태스크

세션 시작 시 이 파일을 확인하고, 완료된 항목은 [x]로 체크.
한 세션에 하나의 Phase만 진행. 동작 확인 후 완료 처리.

---

## Phase 1 — 프로젝트 스캐폴딩

```bash
# 세션 시작 프롬프트
@docs/tasks.md Phase 1 작업을 진행해줘
```

- [x] Vite + React 프로젝트 생성 (`npm create vite@latest hy-climb -- --template react`)
- [x] 의존성 설치 (`react-router-dom`, `tailwindcss`, `@tailwindcss/vite`)
- [x] vite.config.js — `@/` alias 설정 + `@tailwindcss/vite` 플러그인
- [x] `tailwind.config.js` 세팅 (Pretendard 폰트 포함)
- [x] `index.html` Pretendard CDN 추가
- [x] 폴더 구조 생성 (`src/components/layout`, `src/components/center`, `src/pages`, `src/data`, `src/utils`)
- [x] `public/_redirects` 파일 생성 (`/*  /index.html  200`)
- [x] `public/images/centers/` 폴더 생성
- [x] `npm run dev` 로 정상 실행 확인

---

## Phase 2 — 데이터 파일 및 유틸리티

```bash
# 세션 시작 프롬프트
@docs/tasks.md @docs/data-schema.md Phase 2 작업을 진행해줘
```

- [x] `src/data/centers.json` 생성 (센터 3개: 그래비티클라이밍 수원역점 실데이터 + 샘플 2개)
- [x] `src/data/config.json` 생성 (한대앞역 출발지 정보)
- [x] `src/utils/naverMap.js` 작성
  - [x] `getDefaultMapUrl(center)` 구현
  - [x] `getMeetingMapUrl(center, departure)` 구현
  - [x] `isValidUrl(url)` 구현
  - [x] `formatPrice(amount)` 구현 (추가)
- [x] `naverMap.js` 함수 동작 확인 (빌드 성공 + 콘솔 테스트 통과)

---

## Phase 3 — 공통 레이아웃 컴포넌트

```bash
# 세션 시작 프롬프트
@docs/tasks.md @docs/component-spec.md Phase 3 작업을 진행해줘
```

- [x] `src/components/layout/Navbar.jsx` 작성
  - [x] 로고(Hy-Climb) 표시
  - [x] 메인 링크 (`/`)
- [x] `src/components/layout/Footer.jsx` 작성
- [x] `src/pages/NotFoundPage.jsx` 작성
- [x] `src/App.jsx` — React Router 라우팅 설정
  - [x] `BrowserRouter` 적용
  - [x] `/` → `HomePage`, `/center/:id` → `CenterDetailPage`, `*` → 404
  - [x] 전체 레이아웃: `max-w-sm mx-auto bg-white min-h-screen flex flex-col`
- [x] `src/main.jsx` 진입점 설정 (기존 정상)
- [x] `npm run dev` 로 Navbar + Footer 렌더링 확인

---

## Phase 4 — Center 컴포넌트

```bash
# 세션 시작 프롬프트
@docs/tasks.md @docs/component-spec.md Phase 4 작업을 진행해줘
```

- [x] `NaverMapButton.jsx` 작성
  - [x] `type="default"` → `getDefaultMapUrl` 호출
  - [x] `type="meeting"` → `getMeetingMapUrl` 호출
  - [x] URL 유효하지 않으면 `disabled` 처리
- [x] `AffiliateBadge.jsx` 작성 (공유 컴포넌트 추가)
- [x] `CenterFilter.jsx` 작성
  - [x] centers에서 region 자동 추출
  - [x] "전체" 칩 항상 첫 번째 고정
- [x] `CenterCard.jsx` 작성
  - [x] 대표 이미지, 센터명, 주소 표시
  - [x] 이미지 로드 실패 시 placeholder 처리
  - [x] NaverMapButton 두 개 (default, meeting)
- [x] `CenterList.jsx` 작성
  - [x] `selectedRegion` 상태 관리
  - [x] CenterFilter + CenterCard 목록 렌더링
- [x] `CenterDetail.jsx` 작성
  - [x] 사진 썸네일 가로 스크롤 갤러리
  - [x] 제휴 가격 섹션 조건부 렌더링 (affiliatePrices)
  - [x] 일반 가격 섹션 조건부 렌더링 (prices)
  - [x] 길찾기 섹션: 섹션 라벨 + NaverMapButton 두 개 세로 배치

---

## Phase 5 — 페이지 연결 및 전체 동작 확인

```bash
# 세션 시작 프롬프트
@docs/tasks.md Phase 5 작업을 진행해줘
```

- [x] `src/pages/HomePage.jsx` 작성
  - [x] centers.json, config.json import
  - [x] 페이지 타이틀 "제휴 클라이밍 센터" + 총 개수
  - [x] CenterList 렌더링
- [x] `src/pages/CenterDetailPage.jsx` 작성
  - [x] `useParams`로 id 추출
  - [x] 존재하지 않는 id → `/` 리다이렉트
  - [x] CenterDetail 렌더링
- [x] `src/pages/NotFoundPage.jsx` 작성 (Phase 3에서 완료)
- [x] UC별 동작 확인
  - [x] UC01: 메인 진입 → 센터 목록 표시 (HTTP 200, 3개 센터 데이터 번들 확인)
  - [x] UC01: 지역 필터 칩 클릭 → 목록 필터링 (selectedRegion 상태 + onChange 확인)
  - [x] UC02: 카드 클릭 → 상세 페이지 이동 (navigate('/center/:id') 확인)
  - [x] UC03: 길찾기 버튼 → 새 탭 오픈 (window.open + noopener,noreferrer 확인)
  - [x] UC12: 한대앞역 출발 버튼 → 네이버 지도 새 탭 오픈 (getMeetingMapUrl URL 확인)
  - [x] 브라우저 뒤로가기 → 메인 복귀 (BrowserRouter history stack 동작)
  - [x] 없는 id 접근 → 클라이언트 Navigate to="/" 리다이렉트 확인

---

## Phase 6 — 배포 설정

```bash
# 세션 시작 프롬프트
@docs/tasks.md Phase 6 작업을 진행해줘
```

- [x] `npm run build` 빌드 성공 확인
- [x] `npm run preview` 로 빌드 결과 확인
- [ ] Cloudflare Pages 연결
  - [ ] GitHub 저장소 연결
  - [ ] 빌드 명령: `npm run build`
  - [ ] 출력 디렉토리: `dist`
- [ ] 배포 후 라우팅 동작 확인 (`/center/center_01` 직접 접근 시 404 없는지)
- [ ] 모바일 환경 네이버 지도 딥링크 확인

---

## 완료 기준

모든 Phase 체크박스 완료 + 아래 항목 통과 시 MVP 완료.

- [ ] 전체 UC01 ~ UC04, UC12 시나리오 수동 테스트 통과
- [ ] 모바일 브라우저에서 길찾기 버튼 동작 확인
- [ ] Cloudflare Pages 배포 URL에서 정상 동작 확인
