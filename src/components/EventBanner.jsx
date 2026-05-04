import { useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import { formatEventDate } from '@/utils/formatEventDate'

const STORAGE_KEY = 'collapsedEventTitle'

const isExpired = (endDate) => {
  if (!endDate) return false
  return new Date() > new Date(endDate + 'T23:59:59')
}

const EventBanner = ({ event }) => {
  const { t, lang } = useLang()

  const [isExpanded, setIsExpanded] = useState(() => {
    if (!event?.active || isExpired(event?.endDate)) return true
    const collapsed = localStorage.getItem(STORAGE_KEY)
    return collapsed !== event.title
  })

  if (!event?.active || isExpired(event.endDate)) return null

  const title       = lang === 'en' ? (event.titleEn       ?? event.title)       : event.title
  const description = lang === 'en' ? (event.descriptionEn ?? event.description) : event.description
  const linkLabel   = lang === 'en' ? (event.linkLabelEn ?? event.linkLabel) : event.linkLabel

  const handleToggle = () => {
    if (isExpanded) {
      localStorage.setItem(STORAGE_KEY, event.title)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setIsExpanded(prev => !prev)
  }

  return (
    <div className="bg-violet-50 border border-violet-200 rounded-xl p-[14px] mx-4 mb-3">
      {/* 헤더 - 항상 표시 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="flex-shrink-0 px-2 py-[2px] rounded-full text-[10px] font-bold tracking-wide bg-violet-700 text-white">
            EVENT
          </span>
          <span className="text-[14px] font-bold text-violet-900 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {event.date && (
            <span className="text-[11px] text-violet-500">{formatEventDate(event.date, lang)}</span>
          )}
          {description && (
            <button
              onClick={handleToggle}
              aria-label={isExpanded ? t('event.collapse') : t('event.expand')}
              className="flex-shrink-0 border border-violet-300 rounded-md px-2 py-[3px] text-[11px] font-medium text-violet-600 hover:border-violet-500 hover:text-violet-800 transition-colors"
            >
              {isExpanded ? t('event.collapse') : t('event.expand')}
            </button>
          )}
        </div>
      </div>

      {/* 확장 영역 */}
      {isExpanded && description && (
        <div className="mt-2">
          <p className="text-[12px] text-violet-700 leading-relaxed whitespace-pre-line mb-2">{description}</p>
          {event.linkUrl && (
            <div className="flex justify-end">
              <button
                onClick={() => window.open(event.linkUrl, '_blank', 'noopener,noreferrer')}
                className="text-[11px] font-semibold px-3 py-[5px] rounded-lg bg-violet-700 text-white hover:bg-violet-800 transition-colors"
              >
                {linkLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventBanner
