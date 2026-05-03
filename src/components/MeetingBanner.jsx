import { useNavigate } from 'react-router-dom'
import { useLang } from '@/contexts/LangContext'
import { formatEventDate } from '@/utils/formatEventDate'

const formatMeetingTime = (time, lang) => {
  const [h, m] = time.split(':').map(Number)
  if (lang === 'en') {
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return m === 0 ? `${h12} ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`
  }
  const period = h >= 12 ? '오후' : '오전'
  const h12 = h % 12 || 12
  return m === 0 ? `${period} ${h12}시` : `${period} ${h12}시 ${m}분`
}

const MeetingBanner = ({ meeting, centers }) => {
  const { t, lang } = useLang()
  const navigate = useNavigate()

  if (!meeting?.active) return null

  const meetingCenter = centers.find(c => c.id === meeting.centerId)
  if (!meetingCenter) return null

  const centerName = lang === 'en' ? (meetingCenter.i18n?.name ?? meetingCenter.name) : meetingCenter.name

  return (
    <div
      className="flex items-center justify-between gap-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl px-[14px] py-[10px] mx-4 mb-3 cursor-pointer transition-colors"
      onClick={() => navigate(`/center/${meetingCenter.id}`)}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] font-bold px-2 py-[2px] rounded-full bg-white text-zinc-900">
          {t('meeting.badge')}
        </span>
        <span className="text-[12px] text-zinc-400">
          {formatEventDate(meeting.date, lang)} {formatMeetingTime(meeting.time, lang)}
        </span>
      </div>
      <span className="text-[13px] font-bold text-white truncate text-right ml-2">
        {centerName}
      </span>
    </div>
  )
}

export default MeetingBanner
