import { useLang } from '@/contexts/LangContext'

const ParkingAvailableIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7h4a3 3 0 010 6H9" />
  </svg>
)

const ParkingNoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7h4a3 3 0 010 6H9" />
    <line x1="4" y1="4" x2="20" y2="20" />
  </svg>
)

const ParkingInfo = ({ parking, i18nParking }) => {
  const { t, lang } = useLang()

  if (!parking) return null

  const Icon = parking.type === 'none' ? ParkingNoneIcon : ParkingAvailableIcon
  const description =
    lang === 'en' && i18nParking?.description
      ? i18nParking.description
      : parking.description

  return (
    <div className="flex items-start gap-2 py-3 border-b border-zinc-100">
      <div className="mt-[1px] flex-shrink-0">
        <Icon />
      </div>
      <div>
        <span className="text-[12px] font-medium text-zinc-700">
          {t(`detail.parkingTypes.${parking.type}`)}
        </span>
        {description && (
          <p className="text-[11px] text-zinc-500 mt-[2px]">{description}</p>
        )}
      </div>
    </div>
  )
}

export default ParkingInfo
