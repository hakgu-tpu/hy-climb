# 데이터 스키마

`src/data/` 폴더의 JSON 파일 명세.

---

## centers.json

제휴 클라이밍 센터 목록. UC01 목록 조회, UC02 상세, UC03·UC12 길찾기에 사용.

### 구조

```json
{
  "centers": [Center]
}
```

### Center 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `id` | string | ✅ | 고유 식별자. `"center_01"` 형식. URL 파라미터로 사용 |
| `name` | string | ✅ | 센터명 (한국어) |
| `address` | string | ✅ | 도로명 주소 (한국어) |
| `region` | string | ✅ | 지역 (`"수원"`, `"안양"`, `"군포"` 등). 필터 칩 자동 생성에 사용 |
| `description` | string | ✅ | 간단 소개 (한국어) |
| `images` | string[] | ✅ | 이미지 파일명 배열. `public/images/centers/` 기준 상대 경로 |
| `isAffiliated` | boolean | ✅ | 제휴 여부. `true`면 "제휴" 배지 표시 |
| `naverPlaceId` | string | ✅ | 네이버 장소 세그먼트. UC03·UC12 길찾기 URL 생성에 사용. 아래 추출 방법 참고 |
| `phone` | string | ❌ | 전화번호 |
| `prices` | PriceItem[] | ❌ | 일반 이용 가격 목록 |
| `affiliatePrices` | PriceItem[] | ❌ | 제휴 회원 전용 가격 목록. `isAffiliated: true`인 센터에만 사용 |
| `snsLinks` | SnsLink[] | ❌ | SNS/블로그 링크 목록 |
| `parking` | Parking | ❌ | 주차 정보 |
| `i18n` | I18n | ❌ | 영문 번역 데이터 |

### naverPlaceId 추출 방법

네이버 지도에서 해당 센터로 가는 길찾기 URL을 열면 아래 구조가 나타남.

```
https://map.naver.com/p/directions/-/{naverPlaceId}/-/transit
                                    ↑ 이 부분을 복사해서 저장
```

예시: `그래비티클라이밍 수원역점`의 경우
```
3ziNUg,2AzuBI,그래비티클라이밍 수원역점,1774691117,PLACE_POI
```

구성 요소: `경도인코딩,위도인코딩,장소명,PlaceID,PLACE_POI`

> 네이버 자체 좌표 인코딩 방식이므로 PlaceID만으로는 생성 불가.
> 반드시 네이버 지도 실제 URL에서 복사할 것.

---

### PriceItem 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 이용권 이름 (한국어, 예: "1개월", "일일 이용") |
| `nameEn` | string | ❌ | 이용권 이름 영문 번역. 없으면 `name` 그대로 표시 |
| `price` | number | ✅ | 가격 (원 단위 정수) |

---

### SnsLink 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `type` | `"instagram" \| "blog" \| "youtube" \| "website"` | ✅ | SNS 종류. 아이콘 자동 결정 |
| `url` | string | ✅ | 링크 URL |

---

### Parking 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `type` | `"self" \| "nearby" \| "none"` | ✅ | `self`: 자체 주차, `nearby`: 근처 주차장, `none`: 주차 불가 |
| `description` | string | ❌ | 주차 상세 안내 (한국어, 예: "건물 지하 2층 무료 2시간") |

---

### I18n 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ❌ | 영문 센터명 |
| `address` | string | ❌ | 영문 주소 |
| `description` | string | ❌ | 영문 소개 |
| `parking.description` | string | ❌ | 영문 주차 안내 |

사용 패턴:
```js
center.i18n?.name ?? center.name           // 영문명 없으면 원문
center.i18n?.parking?.description          // 영문 주차 설명
lang === 'en' ? (item.nameEn ?? item.name) : item.name  // 가격 항목명
```

---

### 가격 표시 규칙

- `affiliatePrices` 존재 → 제휴 가격 섹션을 일반 가격 위에 오렌지 배경으로 강조 표시
- `affiliatePrices` 없음 → 제휴 가격 섹션 미표시
- `prices` 없음 → 가격 섹션 전체 미표시
- 가격 포맷: `formatPrice(item.price)` 유틸 사용 → `toLocaleString('ko-KR')` + "원" (예: `130,000원`)
- 가격 항목명: `lang === 'en'`이면 `item.nameEn ?? item.name`, 한국어면 `item.name`

---

### 예시

```json
{
  "centers": [
    {
      "id": "center_01",
      "name": "그래비티클라이밍 수원역점",
      "address": "경기도 수원시 팔달구 갓매산로 31 홍익스포츠프라자 2층",
      "region": "수원",
      "description": "수원역 인근 클라이밍 센터. 파격 할인 제공.",
      "images": ["center_01_main.jpg", "center_01_2.jpg"],
      "isAffiliated": true,
      "naverPlaceId": "3ziNUg,2AzuBI,그래비티클라이밍%20수원역점,1774691117,PLACE_POI",
      "phone": "031-242-5014",
      "prices": [
        { "name": "1개월", "nameEn": "1-Month Pass", "price": 130000 },
        { "name": "일일 이용", "nameEn": "Day Pass", "price": 20000 }
      ],
      "affiliatePrices": [
        { "name": "동아리 회원 1개월", "nameEn": "Club Member 1-Month Pass", "price": 100000 }
      ],
      "snsLinks": [
        { "type": "instagram", "url": "https://www.instagram.com/gravity_suwon_station/" }
      ],
      "parking": {
        "type": "self",
        "description": "홍익스포츠프라자 건물 주차장 이용 가능 (2시간 무료)"
      },
      "i18n": {
        "name": "Gravity Climbing Suwon Station",
        "address": "2F Hongik Sports Plaza, 31 Gatmaesanro, Paldal-gu, Suwon-si",
        "description": "Gravity Climbing center near Suwon Station.",
        "parking": {
          "description": "Building parking available (2 hours free)"
        }
      }
    }
  ]
}
```

---

## config.json

정기모임 출발지 정보 + 공식 SNS 링크.

### 구조

```json
{
  "departure": {
    "name": "한대앞역",
    "nameEn": "Handaefront Station",
    "naverPlaceId": "3zcpZJ,2ABgcV,한대앞역2번출구,21404720,PLACE_POI"
  },
  "instagram": "https://www.instagram.com/hy_climb/",
  "event": {
    "active": true,
    "title": "볼더링 파티 🎉",
    "description": "4월 30일 오후 5시, 한대앞역에서 같이 출발해요!",
    "date": "2026-04-30",
    "endDate": "2026-04-30",
    "linkUrl": "https://forms.gle/xxxx",
    "linkLabel": "신청하기",
    "i18n": {
      "title": "Bouldering Party 🎉",
      "description": "April 30th, 5PM. Let's go together from Handaap Station!",
      "linkLabel": "Apply"
    }
  },
  "meeting": {
    "active": true,
    "centerId": "center_01",
    "date": "2026-05-07",
    "time": "17:00"
  }
}

```

### departure 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 출발지명 (한국어). 버튼 라벨 표시용 |
| `nameEn` | string | ✅ | 출발지명 (영문). 영어 모드 버튼 라벨용 |
| `naverPlaceId` | string | ✅ | 네이버 지도 출발지 세그먼트. Center의 naverPlaceId와 동일한 방법으로 추출 |

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `instagram` | string | ✅ | 동아리 공식 Instagram URL. Footer 링크에 사용 |
| `event` | Event | ❌ | 이벤트 정보, 없거나 active: false면 EventBanner 미표시 |
| `meeting` | Meeting | ❌ | 이번 정기모임 정보. 없거나 active: false면 MeetingBanner 미표시 |

### meeting 객체
 
| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `active` | boolean | ✅ | false면 MeetingBanner 미표시 |
| `centerId` | string | ✅ | 이번 정기모임 목적지. centers.json의 id 참조 |
| `date` | string | ✅ | 정기모임 날짜 (YYYY-MM-DD) |
| `time` | string | ✅ | 정기모임 시간 ("17:00" 형식) |

### naverPlaceId 추출 방법

네이버 지도에서 한대앞역 → 임의 목적지 길찾기 URL을 열면:

```
https://map.naver.com/p/directions/{departure.naverPlaceId}/{목적지}/-/transit
                                    ↑ 이 부분을 복사해서 저장
```

### event 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `active` | boolean | ✅ | false면 무조건 미표시. 빠른 온/오프 스위치 |
| `title` | string | ✅ | 이벤트 제목 |
| `description` | string | ❌| 부연 설명 |
| `date` | string| ❌ | 이벤트 날짜 (YYYY-MM-DD). 배너에 날짜 표시용 |
| `endDate` | string | ❌ | 이 날짜 이후엔 자동 숨김. 없으면 active로만 제어 |
| `linkUrl` | string | ❌ | 클릭 시 이동할 URL (신청 폼, 인스타 등). 없으면 배너만 표시 |
| `linkLabel` | string | ❌ | 링크 버튼 라벨 |
| `i18n` | object | ❌ | 영문 번역 |

---

## naverMap.js 유틸리티

`src/utils/naverMap.js` 구현 명세.

```js
// UC03 — 현재 위치에서 센터까지
export function getDefaultMapUrl(center) {
  return `https://map.naver.com/p/directions/-/${center.naverPlaceId}/-/transit?c=12.00,0,0,0,dh`;
}

// UC12 — 출발지 고정 길찾기 (departure.naverPlaceId → center.naverPlaceId)
export function getMeetingMapUrl(center, departure) {
  return `https://map.naver.com/p/directions/${departure.naverPlaceId}/${center.naverPlaceId}/-/transit?c=12.00,0,0,0,dh`;
}

// naverPlaceId 유효성 검사 (버튼 disabled 판단용)
// PLACE_POI 포함 여부로 검사
export function isValidPlaceId(id) {
  return typeof id === 'string' && id.includes('PLACE_POI');
}

// URL 유효성 검사
export function isValidUrl(url) {
  return typeof url === 'string' && url.startsWith('https://');
}

// 가격 포맷 유틸
export function formatPrice(price) {
  return price.toLocaleString('ko-KR') + '원';
}
```

> URL을 브라우저에서 직접 열어 길찾기가 정상 동작하는지 반드시 확인할 것.

---

## i18n (언어 전환) — UC13

UI 고정 텍스트는 `src/i18n/` 폴더에서 관리.

```
src/i18n/
  ko.json    한국어 (기본)
  en.json    영어
```

### 키 구조 (nested)

```json
{
  "nav": {
    "title": "Hy-Climb",
    "back": "목록으로"
  },
  "home": {
    "heading": "클라이밍 센터",
    "totalCount": "총 {{count}}곳",
    "filterAll": "전체"
  },
  "detail": {
    "affiliated": "제휴",
    "sectionPrice": "이용 가격",
    "sectionAffiliatePrice": "동아리 회원 가격",
    "sectionParking": "주차",
    "sectionSns": "SNS",
    "sectionDirections": "길찾기",
    "btnDirections": "길찾기",
    "btnMeeting": "{{departure}} 출발 길찾기",
    "btnUnavailable": "준비 중",
    "parkingTypes": {
      "self": "자체 주차",
      "nearby": "근처 주차",
      "none": "주차 불가"
    }
  },
  "footer": {
    "instagram": "Hy-Climb 인스타그램",
    "copyright": "© 2026 Hy-Climb 동아리"
  },
  "langToggle": "EN",
  "regions": {
    "수원": "수원",
    "안양": "안양",
    "군포": "군포"
  }
}
```

> `regions` 키: `center.region` 값을 표시 라벨로 변환. en.json에서는 `"수원": "Suwon"` 등 영문 매핑. 미등록 지역은 `t('regions.신규지역', null, '신규지역')` 패턴으로 원문 폴백.

### 언어 전환 전략

- `localStorage.getItem('lang')` 우선 적용
- 없으면 `navigator.language`로 자동 감지 (ko → 한국어, 그 외 → 영어)
- React Context (`LangContext`, `src/contexts/LangContext.jsx`)로 전역 공유
- `LangProvider`로 `App` 전체를 감싸야 함

### 번역 적용 범위

| 항목 | 방법 |
|---|---|
| UI 고정 텍스트 | `t(key)` / `t(key, vars)` |
| 센터 이름·주소·소개 | `center.i18n?.field ?? center.field` |
| 가격 항목명 | `lang === 'en' ? (item.nameEn ?? item.name) : item.name` |
| 주차 설명 | `lang === 'en' && i18nParking?.description ? i18nParking.description : parking.description` |
| 길찾기 버튼 출발지명 | `lang === 'en' ? (departure.nameEn ?? departure.name) : departure.name` |
| 지역 필터 칩 라벨 | `t('regions.' + center.region, null, center.region)` |

### 사용 예시

```js
const { t, lang, setLang } = useLang();

t('home.heading')                                    // "클라이밍 센터"
t('home.totalCount', { count: 5 })                   // "총 5곳"
t('detail.btnMeeting', { departure: '한대앞역' })      // "한대앞역 출발 길찾기"
t('detail.parkingTypes.self')                        // "자체 주차"
t('regions.수원', null, '수원')                       // ko: "수원" / en: "Suwon"
t('regions.미등록지역', null, '미등록지역')            // 미등록 시 원문 폴백
```
