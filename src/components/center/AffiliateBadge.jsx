import { useLang } from '@/contexts/LangContext'

const AffiliateBadge = () => {
  const { t } = useLang()
  return (
    <span className="flex-shrink-0 px-2 py-[3px] rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
      {t('detail.affiliated')}
    </span>
  )
}

export default AffiliateBadge
