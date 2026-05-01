import { useParams, Navigate } from 'react-router-dom'
import centersData from '@/data/centers.json'
import configData from '@/data/config.json'
import CenterDetail from '@/components/center/CenterDetail'

const CenterDetailPage = () => {
  const { id } = useParams()
  const center = centersData.centers.find((c) => c.id === id)

  if (!center) return <Navigate to="/" replace />

  return <CenterDetail center={center} departure={configData.departure} />
}

export default CenterDetailPage
