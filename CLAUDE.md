# Hy-Climb MVP

Hy-Climb 동아리의 제휴 클라이밍 센터 길찾기 정적 웹 서비스.

## 기술 스택

- **프레임워크**: Vite + React
- **라우팅**: React Router v6 (BrowserRouter)
- **CSS**: Tailwind CSS v3
- **폰트**: Pretendard Variable (CDN)
- **데이터**: JSON 파일 직접 import (백엔드 없음)
- **배포**: Cloudflare Pages (정적 빌드)
- **패키지 매니저**: npm

## 개발 명령어

```bash
npm install        # 의존성 설치
npm run dev        # 개발 서버 (localhost:5173)
npm run build      # 정적 빌드 → dist/
npm run preview    # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
  components/
    layout/       # Navbar, Footer
    center/       # CenterCard, CenterList, CenterDetail, CenterFilter, NaverMapButton
  pages/          # HomePage, CenterDetailPage
  data/           # centers.json, config.json
  utils/          # naverMap.js
public/
  images/centers/ # 센터 이미지
  _redirects      # SPA 라우팅 (/* /index.html 200)
```

## 핵심 규칙

- 컴포넌트는 함수형 + 화살표 함수로 작성
- 파일명은 PascalCase (컴포넌트), camelCase (유틸)
- JSON import는 `import data from '@/data/centers.json'` 형태
- `@/` 는 `src/` 의 절대경로 alias (vite.config.js에 설정됨)
- 외부 링크는 반드시 `window.open(url, '_blank', 'noopener,noreferrer')` 사용
- 버튼 비활성화 시 disabled 속성 + 시각적 안내 표시

## 데이터 파일 요약

- `centers.json` : 센터 목록 (id, name, address, region, description, images, isAffiliated, naverMapUrl, naverDestination, phone?, prices?, affiliatePrices?)
- `config.json`  : 정기모임 출발지 (departure.name, departure.naverDeparture)

상세 스키마 → @docs/data-schema.md

## 컴포넌트 요약

- `NaverMapButton` : type="default"(UC03) | type="meeting"(UC12) 분기
- `CenterFilter`   : region 필터 칩, "전체" 항상 첫 번째 고정
- `CenterList`     : 필터 상태 관리 + CenterCard 목록 렌더링
- `CenterDetail`   : 상세 정보 + 사진 + 두 종류 길찾기 버튼

컴포넌트 Props 상세 → @docs/component-spec.md

## UI 스펙 요약

- 색상: zinc-900 (primary), orange-600 (제휴 배지), zinc-200 (border)
- 폰트: Pretendard, 14px base, font-bold/semibold/medium 3단계
- 카드: `rounded-2xl border border-zinc-200 bg-white`
- 버튼 default: `rounded-xl border border-zinc-200 text-zinc-900 bg-white`
- 버튼 meeting: `rounded-xl bg-zinc-900 text-white`
- 필터 칩 활성: `rounded-full bg-zinc-900 text-white`
- 레이아웃: `max-w-sm mx-auto` 모바일 퍼스트

컴포넌트 Tailwind 클래스 상세 → @docs/ui-spec.md

## 진행 상황

작업 현황 → @docs/tasks.md