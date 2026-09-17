import { useParams, Navigate } from 'react-router-dom'
import CenterDetail from '@/components/center/CenterDetail'
import { useAppData } from '@/contexts/DataContext'
import { useLang } from '@/contexts/LangContext'

const CenterDetailPage = () => {
  const { id } = useParams()
  const { t } = useLang()
  const { centers, config, loading, error } = useAppData()

  if (loading) {
    return <p className="px-4 pt-5 text-[13px] text-zinc-400">{t('common.loading')}</p>
  }

  if (error) {
    return <p className="px-4 pt-5 text-[13px] text-red-500">{t('common.error')}</p>
  }

  const center = centers.find((c) => c.id === id)

  if (!center) return <Navigate to="/" replace />

  return <CenterDetail center={center} departure={config.departure} />
}

export default CenterDetailPage
