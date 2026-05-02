export function getDefaultMapUrl(center) {
  return `https://map.naver.com/p/directions/-/${center.naverPlaceId}/-/transit?c=12.00,0,0,0,dh`;
}

export function getMeetingMapUrl(center, departure) {
  return `https://map.naver.com/p/directions/${departure.naverPlaceId}/${center.naverPlaceId}/-/transit?c=12.00,0,0,0,dh`;
}

export function isValidPlaceId(id) {
  return typeof id === 'string' && id.includes('PLACE_POI');
}

export function isValidUrl(url) {
  return typeof url === 'string' && url.startsWith('https://');
}

export function formatPrice(amount) {
  return amount.toLocaleString('ko-KR') + '원';
}
