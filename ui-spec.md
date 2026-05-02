# UI 명세

Phase 3~5 컴포넌트 작업 시 참조. Tailwind CSS 기반.

---

## 디자인 원칙

- 미니멀 & 모던 — 장식 없이 타이포그래피와 여백으로 구성
- 모바일 퍼스트 — 최대 너비 `max-w-sm` (384px) 중앙 정렬
- 색상은 최소화 — zinc 계열이 주, orange는 제휴 배지 포인트에만 사용
- 폰트: `'Pretendard Variable', -apple-system, sans-serif`

---

## 색상 토큰

| 이름 | hex | Tailwind | 용도 |
|---|---|---|---|
| Primary | `#18181B` | `zinc-900` | 텍스트, 주요 버튼 bg, 네비, 활성 칩 |
| Accent | `#EA580C` | `orange-600` | 제휴 배지 텍스트 |
| Surface | `#FFFFFF` | `white` | 카드, 버튼, 네비 배경 |
| Background | `#F9F9F9` | `zinc-50` | 페이지 배경 |
| Muted bg | `#F4F4F5` | `zinc-100` | 비활성 버튼, 호버, 이미지 placeholder |
| Border | `#E4E4E7` | `zinc-200` | 카드·버튼·구분선 테두리 |
| Text secondary | `#71717A` | `zinc-500` | 주소, 서브 텍스트 |
| Text muted | `#A1A1AA` | `zinc-400` | 힌트, 카운트, placeholder |
| Badge bg | `#FFF7ED` | `orange-50` | 제휴 배지 배경 |
| Badge border | `#FED7AA` | `orange-200` | 제휴 배지 테두리 |

---

## 타이포그래피

```
페이지 타이틀  : text-[22px] font-extrabold tracking-tight text-zinc-900
카드 타이틀    : text-[15px] font-bold text-zinc-900
섹션 헤드      : text-[16px] font-bold tracking-tight text-zinc-900
버튼·칩 레이블  : text-[12px] font-semibold
본문           : text-[13px] font-normal text-zinc-700 leading-relaxed
서브 정보      : text-[12px] font-normal text-zinc-500
섹션 라벨      : text-[10px] font-semibold uppercase tracking-widest text-zinc-400
```

---

## 간격 & 형태

```
페이지 수평 패딩  : px-4 (16px)
카드 내부 패딩    : p-[14px]
요소 간 간격      : gap-2 (8px) ~ gap-3 (12px)
섹션 간격         : mb-6 (24px)

border-radius:
  버튼·입력       : rounded-xl (12px) 또는 rounded-lg (8px)
  카드            : rounded-2xl (16px)
  사진 썸네일     : rounded-xl (12px)
  배지·필터 칩    : rounded-full (999px)
```

---

## 컴포넌트 스타일

### Navbar

```jsx
<nav className="h-[52px] bg-white border-b border-zinc-200 flex items-center justify-between px-4 sticky top-0 z-10">
  <span className="text-[18px] font-extrabold text-zinc-900 tracking-tight">
    Hy-Climb
  </span>
  {/* 햄버거 아이콘 */}
</nav>
```

---

### CenterFilter (필터 칩)

```jsx
<button
  className={`
    px-[14px] py-[6px] rounded-full text-[12px] font-medium border
    transition-colors duration-150
    ${selected === region
      ? 'bg-zinc-900 text-white border-zinc-900'
      : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'}
  `}
>
  {region}
</button>
```

---

### 제휴 배지

```jsx
<span className="px-2 py-[3px] rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
  제휴
</span>
```

---

### NaverMapButton

```jsx
// type="default" — 일반 길찾기 (UC03)
<button className="w-full py-[11px] rounded-xl text-[13px] font-semibold border border-zinc-200 text-zinc-900 bg-white hover:bg-zinc-50 transition-colors">
  길찾기
</button>

// type="meeting" — 한대앞역 출발 (UC12)
<button className="w-full py-[11px] rounded-xl text-[13px] font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
  한대앞역 출발 길찾기
</button>

// disabled
<button disabled className="w-full py-[11px] rounded-xl text-[13px] font-semibold bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed">
  길찾기 (준비 중)
</button>
```

---

### CenterCard

```jsx
<div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
  {/* 대표 이미지 */}
  <img
    src={center.images[0]}
    alt={center.name}
    className="w-full h-[160px] object-cover bg-zinc-100"
    onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
  />

  <div className="p-[14px]">
    {/* 헤더 */}
    <div className="flex items-start justify-between mb-[3px]">
      <h3 className="text-[15px] font-bold text-zinc-900">{center.name}</h3>
      {center.isAffiliated && <AffiliateBadge />}
    </div>

    {/* 주소 */}
    <p className="text-[12px] text-zinc-500 mb-3">{center.address}</p>

    {/* 버튼 그룹 */}
    <div className="flex gap-[6px]">
      <NaverMapButton center={center} type="default" className="flex-1" />
      <NaverMapButton center={center} type="meeting" departure={departure} className="flex-1" />
    </div>
  </div>
</div>
```

---

### CenterDetail

```jsx
<div>
  {/* 대표 이미지 */}
  <img className="w-full h-[220px] object-cover bg-zinc-100" />

  <div className="p-4">
    {/* 헤더 */}
    <div className="flex items-center justify-between mb-1">
      <h1 className="text-[20px] font-extrabold text-zinc-900 tracking-tight">{center.name}</h1>
      {center.isAffiliated && <AffiliateBadge />}
    </div>

    {/* 주소 */}
    <p className="text-[12px] text-zinc-500 mb-3">{center.address}</p>

    {/* 소개 */}
    <p className="text-[13px] text-zinc-700 leading-relaxed mb-4">{center.description}</p>

    {/* 사진 목록 */}
    <div className="flex gap-2 mb-5 overflow-x-auto">
      {center.images.map((img) => (
        <img className="w-[72px] h-[56px] rounded-xl object-cover bg-zinc-100 flex-shrink-0" />
      ))}
    </div>

    {/* 길찾기 */}
    <div className="border-t border-zinc-200 pt-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">길찾기</p>
      <div className="flex flex-col gap-[6px]">
        <NaverMapButton center={center} type="default" />
        <NaverMapButton center={center} type="meeting" departure={departure} />
      </div>
    </div>
  </div>
</div>
```

---

## 전역 레이아웃

```jsx
// App.jsx wrapper — 모바일 퍼스트 중앙 정렬
<div className="min-h-screen bg-zinc-50">
  <div className="max-w-sm mx-auto bg-white min-h-screen">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
</div>
```

---

## Tailwind 설정

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', '-apple-system', 'sans-serif'],
      },
    },
  },
}
```

```html
<!-- index.html <head> — Pretendard 폰트 로드 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
```

---

### PriceList (가격표 — CenterDetail 내부)

```jsx
{/* 제휴 가격 섹션 — affiliatePrices 존재할 때만 렌더링 */}
{center.affiliatePrices?.length > 0 && (
  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold bg-orange-600 text-white">
        제휴
      </span>
      <span className="text-[11px] font-semibold text-orange-700">동아리 회원 가격</span>
    </div>
    {center.affiliatePrices.map((item) => (
      <div key={item.name} className="flex justify-between items-center py-[5px] border-b border-orange-200 last:border-b-0">
        <span className="text-[11px] text-orange-900">{item.name}</span>
        <span className="text-[11px] font-bold text-orange-700">{formatPrice(item.price)}</span>
      </div>
    ))}
  </div>
)}

{/* 일반 가격 섹션 — prices 존재할 때만 렌더링 */}
{center.prices?.length > 0 && (
  <div>
    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
      일반 이용 가격
    </p>
    {center.prices.map((item) => (
      <div key={item.name} className="flex justify-between items-center py-[7px] border-b border-zinc-100 last:border-b-0">
        <span className="text-[12px] text-zinc-600">{item.name}</span>
        <span className="text-[12px] font-semibold text-zinc-900">{formatPrice(item.price)}</span>
      </div>
    ))}
  </div>
)}
```

**스타일 규칙:**
- 제휴 가격 카드: `bg-orange-50 border border-orange-200 rounded-xl p-3`
- 제휴 항목 구분선: `border-orange-200`
- 일반 가격 항목 구분선: `border-zinc-100` (은은하게)
- 가격 포맷: `formatPrice()` 유틸 사용 (`130,000원` 형식)
- 섹션 없을 때 미표시 (`?.length > 0` 조건부 렌더링)

---

### ImageCarousel (캐러셀)

```jsx
{/* 캐러셀 컨테이너 */}
<div className="relative w-full h-[220px] overflow-hidden bg-zinc-100">
  <img className="w-full h-full object-cover" />

  {/* 좌우 버튼 — 사진 2장 이상일 때만 */}
  <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center">
    ‹
  </button>
  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center">
    ›
  </button>

  {/* 인디케이터 점 */}
  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
    {/* 활성: w-2 h-2 rounded-full bg-white */}
    {/* 비활성: w-2 h-2 rounded-full bg-white/50 */}
  </div>
</div>
```

---

### SnsLinks (SNS 아이콘 버튼)

```jsx
{/* SNS 링크 그룹 — snsLinks 있을 때만 렌더링 */}
{center.snsLinks?.length > 0 && (
  <div className="flex gap-3 items-center mb-4">
    {/* 각 링크 아이콘 버튼 */}
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors"
    >
      {/* 20×20 SVG 아이콘 */}
    </a>
  </div>
)}
```

아이콘 크기: `width="20" height="20"` (SVG inline)
버튼 크기: `w-8 h-8` (32×32px)

---

### ParkingInfo (주차 정보)

```jsx
{center.parking && (
  <div className="flex items-start gap-2 py-3 border-b border-zinc-100">
    {/* 주차 아이콘 (16×16 SVG) */}
    <div>
      <span className="text-[12px] font-medium text-zinc-700">
        {t(`detail.parkingTypes.${center.parking.type}`)}
      </span>
      {center.parking.description && (
        <p className="text-[11px] text-zinc-500 mt-[2px]">
          {lang === 'en' ? center.i18n?.parking?.description : center.parking.description}
        </p>
      )}
    </div>
  </div>
)}
```

---

### LangToggle (Navbar 내 언어 전환 버튼)

```jsx
{/* Navbar 우측에 배치 */}
<button
  onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
  className="px-2 py-[2px] rounded text-[11px] font-semibold border border-zinc-200 text-zinc-500 hover:border-zinc-400 transition-colors"
>
  {lang === 'ko' ? 'EN' : 'KO'}
</button>
```

---

### Footer — 인스타그램 링크

```jsx
<footer className="border-t border-zinc-100 px-4 py-6 text-center">
  <a
    href={config.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
  >
    {/* 인스타그램 SVG 아이콘 16×16, fill="#E1306C" */}
    <span>@hyclimb</span>
  </a>
  <p className="text-[11px] text-zinc-300 mt-2">© 2025 Hy-Climb</p>
</footer>
```