# 컴포넌트 명세

Props, 동작, 예외 처리 정의.

---

## App.jsx

`LangProvider`로 전체를 감싸고 BrowserRouter 라우팅 설정.

```jsx
const App = () => (
  <LangProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"           element={<HomePage />} />
              <Route path="/center/:id" element={<CenterDetailPage />} />
              <Route path="*"           element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  </LangProvider>
)
```

---

## LangContext (src/contexts/LangContext.jsx)

```jsx
// 제공 값
const { lang, setLang, t } = useLang();

// lang              : 'ko' | 'en'
// setLang(lang)     : 언어 변경 + localStorage 저장
// t(key)            : 번역 문자열 반환, 없으면 key 그대로 반환
// t(key, vars)      : {{varName}} 템플릿 치환
// t(key, vars, fallback) : 키 없을 때 key 대신 fallback 반환
//                     vars 없이 fallback만 쓸 때는 null 전달
//                     예) t('regions.수원', null, '수원')
```

- 초기 언어 감지 순서: `localStorage` → `navigator.language` (ko → 'ko', 그 외 → 'en')
- dot-notation 키로 중첩 JSON 탐색 (`t('detail.parkingTypes.self')`)

---

## Navbar.jsx

```jsx
<nav className="h-[52px] bg-white border-b border-zinc-200 flex items-center justify-between px-4 sticky top-0 z-10">
  <Link to="/">Hy-Climb</Link>
  <LangToggle />
</nav>
```

---

## LangToggle.jsx

Props 없음. `useLang()` 직접 참조.

- 현재 lang이 `'ko'`면 버튼에 **"KO"** 표시
- 현재 lang이 `'en'`이면 버튼에 **"EN"** 표시
- 클릭 시 ko ↔ en 토글

```
스타일: px-2 py-[2px] rounded text-[11px] font-semibold border border-zinc-200 text-zinc-500 hover:border-zinc-400
```

---

## Footer.jsx

- `config.instagram` URL로 Instagram 링크 표시
- `t('footer.instagram')`, `t('footer.copyright')` 사용

```jsx
<footer className="border-t border-zinc-100 px-4 py-6 mt-auto text-center">
  <a href={config.instagram} target="_blank" rel="noopener noreferrer">
    {/* Instagram SVG 아이콘 16×16, fill="#E1306C" */}
    <span>{t('footer.instagram')}</span>
  </a>
  <p>{t('footer.copyright')}</p>
</footer>
```

---

## CenterDetailPage.jsx

URL 파라미터 처리 및 존재하지 않는 id 예외 처리.

```jsx
const { id } = useParams();
const center = centersData.centers.find(c => c.id === id);
if (!center) return <Navigate to="/" replace />;
return <CenterDetail center={center} departure={configData.departure} />;
```

---

## CenterDetail.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `center` | Center | ✅ | 센터 객체 |
| `departure` | object | ✅ | config.departure 객체 |

### 내부 상태

- `currentImage` : number — 현재 표시 중인 이미지 인덱스. ImageCarousel과 썸네일 strip이 공유

### 렌더링 순서

```
1. ImageCarousel                            ← currentImage / setCurrentImage 전달
2. 헤더 (센터명 + 제휴 배지)               ← i18n 적용
3. 주소                                    ← i18n 적용
4. 전화번호                                ← phone 있을 때만
5. 소개 텍스트                             ← i18n 적용
6. 사진 썸네일 strip                       ← images 2장 이상일 때만. 클릭 시 currentImage 변경
7. SnsLinks                                ← snsLinks 있을 때만
8. 주차 정보 섹션 (ParkingInfo)            ← parking 있을 때만
9. 제휴 가격 섹션 (오렌지 카드)            ← affiliatePrices 있을 때만
10. 일반 가격 섹션                         ← prices 있을 때만
11. 길찾기 섹션 (border-top 구분)
```

### i18n 처리

```js
const name        = lang === 'en' ? (center.i18n?.name        ?? center.name)        : center.name
const address     = lang === 'en' ? (center.i18n?.address     ?? center.address)     : center.address
const description = lang === 'en' ? (center.i18n?.description ?? center.description) : center.description

// 가격 항목명
lang === 'en' ? (item.nameEn ?? item.name) : item.name
```

### 썸네일 strip 스타일

- 선택된 썸네일: `ring-2 ring-zinc-900 ring-offset-1`
- 미선택: `opacity-50 hover:opacity-80`

---

## ImageCarousel.jsx

controlled 컴포넌트. 인덱스 상태는 부모(CenterDetail)가 관리.

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `images` | string[] | ✅ | 이미지 파일명 배열 |
| `centerName` | string | ✅ | alt 텍스트용 센터명 |
| `current` | number | ✅ | 현재 표시 인덱스 |
| `onChange` | `(index: number) => void` | ✅ | 인덱스 변경 콜백 |

### 동작

- 사진 1장 → 좌우 버튼·인디케이터 미표시
- 사진 2장 이상 → `‹ ›` 버튼 + 하단 인디케이터 점 표시
- 인디케이터 점 클릭 → `onChange(i)` 호출
- 이미지 로드 실패 → `/images/placeholder.svg` 대체

---

## SnsLinks.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `snsLinks` | SnsLink[] | ✅ | SNS 링크 목록 |

### 아이콘 매핑

| type | 아이콘 | 색상 |
|---|---|---|
| `instagram` | 인스타그램 로고 SVG | `#E1306C` |
| `blog` | 네이버 N 로고 SVG | `#03C75A` |
| `youtube` | 유튜브 로고 SVG | `#FF0000` |
| `website` | 글로브 SVG (stroke) | `#71717A` |

### 동작

- `snsLinks`가 없거나 빈 배열이면 `null` 반환
- 클릭 시 `window.open(url, '_blank', 'noopener,noreferrer')`
- 버튼 크기: `w-8 h-8` (32×32px), 아이콘 크기: 20×20px

---

## ParkingInfo.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `parking` | Parking | ✅ | parking 객체 |
| `i18nParking` | `{ description?: string }` | ❌ | `center.i18n?.parking`. 영문 주차 설명 |

### 동작

- `type="none"` → 취소선 P 아이콘 + `t('detail.parkingTypes.none')`
- `type="self"` / `"nearby"` → P 아이콘 + 해당 번역 키
- `description` 있으면 아이콘 옆 아래 줄에 부연 설명 표시
- `lang === 'en'`이고 `i18nParking?.description` 있으면 영문 설명 사용

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
- URL이 유효하지 않으면 버튼 `disabled` + `"라벨 (준비 중)"` 표시
- 버튼 라벨:
  - default: `t('detail.btnDirections')`
  - meeting: `t('detail.btnMeeting', { departure: departureName })`
    - `departureName` = `lang === 'en' ? (departure.nameEn ?? departure.name) : departure.name`

---

## AffiliateBadge.jsx

Props 없음. `t('detail.affiliated')` 사용.

---

## CenterCard.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `center` | Center | ✅ | 센터 객체 |
| `departure` | object | ✅ | config.departure 객체 |

### 동작

- `useLang()`으로 `lang` 참조 → 센터명·주소 i18n 처리
  ```js
  const name    = lang === 'en' ? (center.i18n?.name    ?? center.name)    : center.name
  const address = lang === 'en' ? (center.i18n?.address ?? center.address) : center.address
  ```
- 대표 이미지(`images[0]`), 센터명, 주소, 제휴 배지 표시
- 이미지 로드 실패 → `/images/placeholder.svg`
- 카드 전체 클릭 → `/center/:id` 이동
- 버튼 영역 클릭 → `e.stopPropagation()`으로 카드 클릭과 분리

---

## CenterList.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `centers` | Center[] | ✅ | 전체 센터 목록 |
| `departure` | object | ✅ | config.departure 객체 |

### 내부 상태

- `selectedRegion` : `string | null` — 초기값 `null` (전체 표시)
- `affiliatedOnly` : boolean — 초기값 `false`

### 필터 로직

```js
const regionMatch    = !selectedRegion || c.region === selectedRegion
const affiliatedMatch = !affiliatedOnly || c.isAffiliated
```

> `selectedRegion === null`이 "전체" 의미. 문자열 `'전체'`에 의존하지 않으므로 언어 전환 시에도 필터 상태 유지.

---

## CenterFilter.jsx

### Props

| prop | 타입 | 필수 | 설명 |
|---|---|---|---|
| `centers` | Center[] | ✅ | 전체 센터 목록 |
| `selected` | `string \| null` | ✅ | 현재 선택된 지역. `null` = 전체 |
| `onChange` | `(region: string \| null) => void` | ✅ | 지역 칩 클릭 시 호출 |
| `affiliatedOnly` | boolean | ✅ | 제휴 필터 활성 여부 |
| `onAffiliatedChange` | `(v: boolean) => void` | ✅ | 제휴 칩 클릭 시 호출 |

### 동작

- "전체" 칩: `onChange(null)` 호출, `selected === null`이면 활성 스타일
- 지역 칩: `onChange(region)` 호출, `selected === region`이면 활성 스타일
- "제휴" 칩: 활성 시 오렌지 배경
- 칩 라벨:
  - 전체: `t('home.filterAll')`
  - 제휴: `t('detail.affiliated')`
  - 지역: `t('regions.' + region, null, region)` — 미등록 지역은 한국어 원문 폴백
