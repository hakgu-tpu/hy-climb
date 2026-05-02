// "2026-05-15" → ko: "5월 15일" / en: "May 15"
// T00:00:00 고정으로 로컬 타임존 오프셋에 의한 날짜 밀림 방지
export function formatEventDate(dateStr, lang = 'ko') {
  const d = new Date(dateStr + 'T00:00:00')
  return lang === 'en'
    ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
}
