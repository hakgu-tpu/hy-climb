import { getDefaultMapUrl, getMeetingMapUrl, isValidUrl } from '@/utils/naverMap'

const NaverMapButton = ({ center, type, departure, className = '' }) => {
  const url = type === 'meeting'
    ? (departure ? getMeetingMapUrl(center, departure) : null)
    : getDefaultMapUrl(center)

  const disabled = !isValidUrl(url)
  const label = type === 'meeting' ? `${departure?.name ?? ''} 출발 길찾기` : '길찾기'

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (disabled) {
    return (
      <button
        disabled
        className={`w-full py-[11px] rounded-xl text-[13px] font-semibold bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed ${className}`}
      >
        {label} (준비 중)
      </button>
    )
  }

  const base = `w-full py-[11px] rounded-xl text-[13px] font-semibold transition-colors ${className}`

  return type === 'meeting' ? (
    <button onClick={handleClick} className={`${base} bg-zinc-900 text-white hover:bg-zinc-800`}>
      {label}
    </button>
  ) : (
    <button onClick={handleClick} className={`${base} border border-zinc-200 text-zinc-900 bg-white hover:bg-zinc-50`}>
      {label}
    </button>
  )
}

export default NaverMapButton
