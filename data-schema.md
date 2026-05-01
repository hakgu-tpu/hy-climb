# 데이터 스키마

Phase 2 작업 시 참조. `src/data/` 폴더의 JSON 파일 명세.

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
| `name` | string | ✅ | 센터명 |
| `address` | string | ✅ | 도로명 주소 |
| `region` | string | ✅ | 지역 (`"강남"`, `"홍대"`, `"신촌"` 등). 필터 칩 자동 생성에 사용 |
| `description` | string | ✅ | 간단 소개 (2~3줄 분량) |
| `images` | string[] | ✅ | 이미지 파일명 배열. `public/images/centers/` 기준 상대 경로 |
| `isAffiliated` | boolean | ✅ | 제휴 여부. `true`면 "제휴" 배지 표시 |
| `naverMapUrl` | string | ✅ | 네이버 지도 단축 URL (`https://naver.me/xxxx`). UC03 길찾기 버튼에 사용 |
| `naverDestination` | string | ✅ | 네이버 지도 목적지 세그먼트. UC12 정기모임 URL 조합에 사용. 아래 추출 방법 참고 |
| `phone` | string | ❌ | 전화번호 (선택) |
| `prices` | PriceItem[] | ❌ | 일반 이용 가격 목록 (선택) |
| `affiliatePrices` | PriceItem[] | ❌ | 제휴 회원 전용 가격 목록. `isAffiliated: true`인 센터에만 사용 |

### naverDestination 추출 방법

네이버 지도에서 해당 센터로 가는 길찾기 URL을 열면 아래 구조가 나타남.

```
https://map.naver.com/p/directions/-/{naverDestination}/-/transit
                                    ↑ 이 부분을 복사해서 저장
```

예시: `그래비티클라이밍 수원역점`의 경우
```
3ziNUg,2AzuBI,그래비티클라이밍 수원역점,1774691117,PLACE_POI
```

구성 요소: `경도인코딩,위도인코딩,장소명,PlaceID,PLACE_POI`

> 네이버 자체 좌표 인코딩 방식이므로 PlaceID만으로는 생성 불가.
> 반드시 네이버 지도 실제 URL에서 복사할 것.

### PriceItem 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 이용권 이름 (예: "1개월", "일일 이용") |
| `price` | number | ✅ | 가격 (원 단위 정수) |

### 가격 표시 규칙

- `affiliatePrices` 존재 → 제휴 가격 섹션을 일반 가격 위에 오렌지 배경으로 강조 표시
- `affiliatePrices` 없음 → 제휴 가격 섹션 미표시 (비제휴 센터 또는 제휴 가격 미확정)
- `prices` 없음 → 가격 섹션 전체 미표시
- 가격 포맷: `toLocaleString('ko-KR')` + "원" (예: 130,000원)

### 예시

```json
{
  "centers": [
    {
      "id": "center_01",
      "name": "그래비티클라이밍 수원역점",
      "address": "경기도 수원시 팔달구 000-0",
      "region": "수원",
      "description": "초보자부터 고수까지 즐길 수 있는 수원역 인근 클라이밍 센터.",
      "images": ["center_01_main.jpg", "center_01_2.jpg"],
      "isAffiliated": true,
      "naverMapUrl": "https://naver.me/xxxxxxxxxx",
      "naverDestination": "3ziNUg,2AzuBI,그래비티클라이밍 수원역점,1774691117,PLACE_POI",
      "phone": "031-000-0000",
      "prices": [
        { "name": "주말이용권(8주)", "price": 130000 },
        { "name": "3개월", "price": 330000 },
        { "name": "1개월", "price": 130000 },
        { "name": "일일 이용", "price": 20000 },
        { "name": "1일 체험 강습 (예약 필수)", "price": 25000 },
        { "name": "암벽화 1일 대여료", "price": 3000 },
        { "name": "초크 1일 대여료", "price": 2000 }
      ],
      "affiliatePrices": [
        { "name": "동아리 회원 1개월", "price": 110000 },
        { "name": "동아리 회원 일일", "price": 15000 }
      ]
    },
    {
      "id": "center_02",
      "name": "클라이밍 센터 B",
      "address": "서울시 마포구 홍대입구 000-0",
      "region": "홍대",
      "description": "홍대 위치의 아늑한 클라이밍 센터입니다.",
      "images": ["center_02_main.jpg"],
      "isAffiliated": false,
      "naverMapUrl": "https://naver.me/yyyyyyyyyy",
      "naverDestination": "{경도인코딩},{위도인코딩},클라이밍 센터 B,{PlaceID},PLACE_POI",
      "prices": [
        { "name": "1개월", "price": 120000 },
        { "name": "일일 이용", "price": 18000 }
      ]
    }
  ]
}
```

---

## config.json

정기모임 출발지 정보. UC12 한대앞역 출발 길찾기 버튼에 사용.
출발지 변경 시 이 파일만 수정하면 모든 버튼에 자동 반영.

### 구조

```json
{
  "departure": {
    "name": string,
    "naverDeparture": string
  }
}
```

### departure 객체

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `name` | string | ✅ | 출발지명. 버튼 라벨 표시용 (`"한대앞역"`) |
| `naverDeparture` | string | ✅ | 네이버 지도 출발지 세그먼트. centers.json의 naverDestination과 동일한 방법으로 추출 |

### naverDeparture 추출 방법

네이버 지도에서 한대앞역 → 임의 목적지 길찾기 URL을 열면:

```
https://map.naver.com/p/directions/{naverDeparture}/{목적지}/-/transit
                                    ↑ 이 부분을 복사해서 저장
```

### 예시

```json
{
  "departure": {
    "name": "한대앞역",
    "naverDeparture": "{경도인코딩},{위도인코딩},한대앞역,{PlaceID},PLACE_POI"
  }
}
```

---

## naverMap.js 유틸리티

`src/utils/naverMap.js` 구현 명세.

```js
// UC03 — 현재 위치에서 센터까지 (네이버 단축 URL 그대로 사용)
export function getDefaultMapUrl(center) {
  return center.naverMapUrl;
}

// UC12 — 한대앞역 출발 고정 길찾기
// URL 구조: https://map.naver.com/p/directions/{출발지}/{도착지}/{경유지}/{이동수단}
export function getMeetingMapUrl(center, departure) {
  const dest = encodeURIComponent(center.naverDestination);
  const dep  = encodeURIComponent(departure.naverDeparture);
  return `https://map.naver.com/p/directions/${dep}/${dest}/-/transit`;
}

// 공통 — URL 유효성 검사 (버튼 disabled 판단용)
export function isValidUrl(url) {
  return typeof url === 'string' && url.startsWith('https://');
}

// 가격 포맷 유틸
export function formatPrice(price) {
  return price.toLocaleString('ko-KR') + '원';
}
```

> **naverDestination / naverDeparture 값 검증 방법**
> 완성된 URL을 브라우저에서 직접 열어 길찾기가 정상 동작하는지 반드시 확인할 것.
> 장소명에 한글·공백이 포함되므로 encodeURIComponent 처리 필수.