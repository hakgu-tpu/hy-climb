import { useState } from 'react'
import CenterFilter from '@/components/center/CenterFilter'
import CenterCard from '@/components/center/CenterCard'

const CenterList = ({ centers, departure }) => {
  const [selectedRegion, setSelectedRegion] = useState('전체')

  const filtered = selectedRegion === '전체'
    ? centers
    : centers.filter((c) => c.region === selectedRegion)

  return (
    <div>
      <CenterFilter
        centers={centers}
        selected={selectedRegion}
        onChange={setSelectedRegion}
      />
      <div className="flex flex-col gap-3 px-4 pb-6">
        {filtered.map((center) => (
          <CenterCard key={center.id} center={center} departure={departure} />
        ))}
      </div>
    </div>
  )
}

export default CenterList
