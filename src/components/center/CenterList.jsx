import { useState } from 'react'
import CenterFilter from '@/components/center/CenterFilter'
import CenterCard from '@/components/center/CenterCard'

const CenterList = ({ centers, departure }) => {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [affiliatedOnly, setAffiliatedOnly] = useState(false)

  const filtered = centers.filter((c) => {
    const regionMatch = !selectedRegion || c.region === selectedRegion
    const affiliatedMatch = !affiliatedOnly || c.isAffiliated
    return regionMatch && affiliatedMatch
  })

  return (
    <div>
      <CenterFilter
        centers={centers}
        selected={selectedRegion}
        onChange={setSelectedRegion}
        affiliatedOnly={affiliatedOnly}
        onAffiliatedChange={setAffiliatedOnly}
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
