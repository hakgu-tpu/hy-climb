# 컴포넌트 명세

Phase 3~5 작업 시 참조. Props, 동작, 예외 처리 정의.

---

## NaverMapButton.jsx

UC03(일반 길찾기)과 UC12(정기모임 길찾기)를 type prop 하나로 분기하는 공통 버튼 컴포넌트.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `center` | object | ✅ | centers.json의 센터 객체 |
| `type` | `"default" \| "meeting"` | ✅ | 길찾기 종류 |
| `departure` | object | type="meeting"일 때 필수 | config.departure 객체 |
| `className` | string | ❌ | 추가 CSS 클래스 |

### 동작

- `type="default"` → `getDefaultMapUrl(center)` → 새 탭 오픈
- `type="meeting"` → `getMeetingMapUrl(center, departure)` → 새 탭 오픈
- URL이 유효하지 않으면 버튼 `disabled` + "준비 중" 표시
- 버튼 라벨:
  - default: `"길찾기"`
  - meeting: `"${departure.name} 출발 길찾기"` (예: "한대앞역 출발 길찾기")

### 예외

- `naverMapUrl` 없거나 유효하지 않은 URL → `disabled` 처리
- `naverPlaceId` 없음 (type="meeting") → `disabled` 처리

---

## CenterFilter.jsx

지역 필터 칩 컴포넌트. centers 목록에서 region 값을 자동 추출해 칩을 생성.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `centers` | Center[] | ✅ | 전체 센터 목록 |
| `selected` | string | ✅ | 현재 선택된 지역 (`"전체"` 또는 지역명) |
| `onChange` | `(region: string) => void` | ✅ | 칩 클릭 시 호출 |

### 동작

- centers에서 `region` 추출 후 중복 제거
- `"전체"` 칩을 항상 첫 번째로 고정
- 선택된 칩에 활성 스타일 적용

---

## CenterCard.jsx

센터 목록에서 각 센터를 카드 형태로 표시.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `center` | Center | ✅ | 센터 객체 |
| `departure` | object | ✅ | config.departure 객체 |

### 동작

- 대표 이미지 (`images[0]`), 센터명, 주소, 제휴 배지 표시
- 이미지 로드 실패 시 `onError` → placeholder 이미지 (`/images/placeholder.jpg`) 대체
- 카드 전체 클릭 → `/center/:id` 이동
- NaverMapButton(type="default"), NaverMapButton(type="meeting") 두 개 렌더링

---

## CenterList.jsx

CenterFilter + CenterCard 목록을 통합 관리.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `centers` | Center[] | ✅ | 전체 센터 목록 |
| `departure` | object | ✅ | config.departure 객체 |

### 내부 상태

- `selectedRegion` : string — `"전체"` 초기값

### 동작

- `selectedRegion === "전체"` → 전체 목록 표시
- 그 외 → `center.region === selectedRegion` 필터링
- CenterFilter에 `onChange` 콜백으로 `setSelectedRegion` 전달

---

## CenterDetail.jsx

센터 상세 정보 표시. CenterDetailPage에서 렌더링.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `center` | Center | ✅ | 센터 객체 |
| `departure` | object | ✅ | config.departure 객체 |

### 동작

- 이미지 목록 표시 (여러 장일 경우 가로 스크롤 또는 슬라이더)
- 센터명, 주소, 제휴 배지, 소개 텍스트 표시
- 전화번호 있으면 표시
- 길찾기 영역: NaverMapButton(default) + NaverMapButton(meeting) 나란히 배치

---

## App.jsx

React Router 라우팅 설정.

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/center/:id" element={<CenterDetailPage />} />
        <Route path="*"           element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

---

## CenterDetailPage.jsx

URL 파라미터 처리 및 존재하지 않는 id 예외 처리.

```jsx
import { useParams, Navigate } from 'react-router-dom';
import centersData from '@/data/centers.json';
import configData  from '@/data/config.json';

export default function CenterDetailPage() {
  const { id } = useParams();
  const center = centersData.centers.find(c => c.id === id);

  if (!center) return <Navigate to="/" replace />;

  return <CenterDetail center={center} departure={configData.departure} />;
}
```

---

## PriceList — CenterDetail 내 가격표 섹션

독립 컴포넌트가 아닌 CenterDetail.jsx 내부 인라인 렌더링. data-schema.md의 표시 규칙 준수.

### Props (CenterDetail에서 center prop으로 전달)

| 데이터 | 타입 | 설명 |
|---|---|---|
| `center.prices` | PriceItem[] \| undefined | 일반 가격 목록 |
| `center.affiliatePrices` | PriceItem[] \| undefined | 제휴 전용 가격 목록 |

### 렌더링 순서 (CenterDetail 내부)

```
1. 사진 썸네일 갤러리
2. 제휴 가격 섹션   ← affiliatePrices 있을 때만
3. 일반 가격 섹션   ← prices 있을 때만
4. 길찾기 섹션 (border-top으로 구분)
```

### 동작

- `affiliatePrices`가 없거나 빈 배열이면 제휴 가격 섹션 전체 미렌더링
- `prices`가 없거나 빈 배열이면 일반 가격 섹션 전체 미렌더링
- 가격 포맷은 반드시 `formatPrice(item.price)` 유틸 사용
- `item.name`을 key로 사용 (센터 내에서 이름 중복 없다고 가정)