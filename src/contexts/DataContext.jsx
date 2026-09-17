import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const DataContext = createContext(null)

function mapCenter(row) {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    region: row.region,
    description: row.description,
    images: row.images,
    isAffiliated: row.is_affiliated,
    naverPlaceId: row.naver_place_id,
    phone: row.phone ?? undefined,
    prices: row.prices ?? undefined,
    affiliatePrices: row.affiliate_prices ?? undefined,
    snsLinks: row.sns_links ?? undefined,
    parking: row.parking ?? undefined,
    i18n: row.i18n ?? undefined,
  }
}

function mapConfig(row) {
  return {
    departure: row.departure,
    instagram: row.instagram,
    event: row.event ?? undefined,
    meeting: row.meeting ?? undefined,
  }
}

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({ centers: [], config: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [centersResult, configResult] = await Promise.all([
        supabase.from('centers').select('*').order('id'),
        supabase.from('app_config').select('*').eq('id', true).maybeSingle(),
      ])

      if (cancelled) return

      const error = centersResult.error ?? configResult.error
      if (error) {
        setState({ centers: [], config: null, loading: false, error })
        return
      }

      setState({
        centers: centersResult.data.map(mapCenter),
        config: mapConfig(configResult.data),
        loading: false,
        error: null,
      })
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>
}

export const useAppData = () => useContext(DataContext)
