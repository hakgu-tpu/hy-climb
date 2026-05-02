import { useLang } from '@/contexts/LangContext'
import { formatEventDate } from '@/utils/formatEventDate'

const isExpired = (endDate) => {
  if (!endDate) return false
  return new Date() > new Date(endDate + 'T23:59:59')
}

const EventBanner = ({ event }) => {
  const { t, lang } = useLang()

  if (!event?.active || isExpired(event.endDate)) return null

  const title       = lang === 'en' ? (event.titleEn       ?? event.title)       : event.title
  const description = lang === 'en' ? (event.descriptionEn ?? event.description) : event.description

  return (
    <div className="bg-violet-50 border border-violet-200 rounded-xl p-[14px] mx-4 mb-3">
      <div className="flex items-center gap-2 mb-[6px]">
        <span className="px-2 py-[2px] rounded-full text-[10px] font-bold tracking-wide bg-violet-700 text-white flex-shrink-0">
          EVENT
        </span>
        <span className="text-[14px] font-bold text-violet-900">{title}</span>
      </div>

      {description && (
        <p className="text-[12px] text-violet-700 mb-2 leading-relaxed whitespace-pre-line">{description}</p>
      )}

      {event.date && (
        <p className="text-[12px] text-violet-500 mb-2">{formatEventDate(event.date, lang)}</p>
      )}

      {event.linkUrl && (
        <button
          onClick={() => window.open(event.linkUrl, '_blank', 'noopener,noreferrer')}
          className="text-[12px] font-semibold px-3 py-[6px] rounded-lg bg-violet-700 text-white hover:bg-violet-800 transition-colors"
        >
          {t('event.linkLabel')}
        </button>
      )}
    </div>
  )
}

export default EventBanner
