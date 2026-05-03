import centersData from '@/data/centers.json'
import configData from '@/data/config.json'
import CenterList from '@/components/center/CenterList'
import EventBanner from '@/components/EventBanner'
import MeetingBanner from '@/components/MeetingBanner'
import { useLang } from '@/contexts/LangContext'

const { centers } = centersData

const HomePage = () => {
  const { t } = useLang()

  return (
    <div>
      <div className="px-4 pt-5 pb-1">
        <h1 className="text-[22px] font-extrabold tracking-tight text-zinc-900">
          {t('home.heading')}
        </h1>
        <p className="text-[12px] text-zinc-400 mt-[2px]">
          {t('home.totalCount', { count: centers.length })}
        </p>
      </div>
      <EventBanner event={configData.event} />
      <MeetingBanner meeting={configData.meeting} centers={centers} />
      <CenterList centers={centers} departure={configData.departure} />
    </div>
  )
}

export default HomePage
