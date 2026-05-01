import centersData from '@/data/centers.json'
import configData from '@/data/config.json'
import CenterList from '@/components/center/CenterList'

const { centers } = centersData

const HomePage = () => (
  <div>
    <div className="px-4 pt-5 pb-1">
      <h1 className="text-[22px] font-extrabold tracking-tight text-zinc-900">
        클라이밍 센터
      </h1>
      <p className="text-[12px] text-zinc-400 mt-[2px]">총 {centers.length}개 센터</p>
    </div>
    <CenterList centers={centers} departure={configData.departure} />
  </div>
)

export default HomePage
