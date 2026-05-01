import { useNavigate } from 'react-router-dom'
import NaverMapButton from '@/components/center/NaverMapButton'
import AffiliateBadge from '@/components/center/AffiliateBadge'

const CenterCard = ({ center, departure }) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-2xl border border-zinc-200 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/center/${center.id}`)}
    >
      <img
        src={`/images/centers/${center.images[0]}`}
        alt={center.name}
        className="w-full h-[160px] object-cover bg-zinc-100"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = '/images/placeholder.svg'
        }}
      />
      <div className="p-[14px]">
        <div className="flex items-start justify-between gap-2 mb-[3px]">
          <h3 className="text-[15px] font-bold text-zinc-900 leading-snug">{center.name}</h3>
          {center.isAffiliated && <AffiliateBadge />}
        </div>
        <p className="text-[12px] text-zinc-500 mb-3">{center.address}</p>
        <div
          className="flex gap-[6px]"
          onClick={(e) => e.stopPropagation()}
        >
          <NaverMapButton center={center} type="default" className="flex-1" />
          <NaverMapButton center={center} type="meeting" departure={departure} className="flex-1" />
        </div>
      </div>
    </div>
  )
}

export default CenterCard
