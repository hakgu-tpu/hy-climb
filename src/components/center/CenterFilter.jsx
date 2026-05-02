import { useLang } from '@/contexts/LangContext'

const CenterFilter = ({ centers, selected, onChange, affiliatedOnly, onAffiliatedChange }) => {
  const { t } = useLang()
  const regions = [...new Set(centers.map((c) => c.region))]

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
      <button
        onClick={() => onAffiliatedChange(!affiliatedOnly)}
        className={`
          flex-shrink-0 px-[14px] py-[6px] rounded-full text-[12px] font-medium border
          transition-colors duration-150
          ${affiliatedOnly
            ? 'bg-orange-600 text-white border-orange-600'
            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'}
        `}
      >
        {t('detail.affiliated')}
      </button>
      <div className="w-px bg-zinc-200 flex-shrink-0 my-1" />
      <button
        onClick={() => onChange(null)}
        className={`
          flex-shrink-0 px-[14px] py-[6px] rounded-full text-[12px] font-medium border
          transition-colors duration-150
          ${selected === null
            ? 'bg-zinc-900 text-white border-zinc-900'
            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'}
        `}
      >
        {t('home.filterAll')}
      </button>
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`
            flex-shrink-0 px-[14px] py-[6px] rounded-full text-[12px] font-medium border
            transition-colors duration-150
            ${selected === region
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'}
          `}
        >
          {t('regions.' + region, null, region)}
        </button>
      ))}
    </div>
  )
}

export default CenterFilter
