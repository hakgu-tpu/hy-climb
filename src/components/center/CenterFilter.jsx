const CenterFilter = ({ centers, selected, onChange }) => {
  const regions = ['전체', ...new Set(centers.map((c) => c.region))]

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
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
          {region}
        </button>
      ))}
    </div>
  )
}

export default CenterFilter
