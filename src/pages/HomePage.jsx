import CenterList from '@/components/center/CenterList'
import EventBanner from '@/components/EventBanner'
import MeetingBanner from '@/components/MeetingBanner'
import { useLang } from '@/contexts/LangContext'
import { useAppData } from '@/contexts/DataContext'

const HomePage = () => {
  const { t } = useLang()
  const { centers, config, loading, error } = useAppData()

  if (loading) {
    return <p className="px-4 pt-5 text-[13px] text-zinc-400">{t('common.loading')}</p>
  }

  if (error) {
    return <p className="px-4 pt-5 text-[13px] text-red-500">{t('common.error')}</p>
  }

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
      <EventBanner event={config.event} />
      <MeetingBanner meeting={config.meeting} centers={centers} />
      <CenterList centers={centers} departure={config.departure} />
    </div>
  )
}

export default HomePage
