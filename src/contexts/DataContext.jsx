import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const DataContext = createContext(null)

const CENTERS_SELECT = `
  id, name, address, region, description, images, is_affiliated, naver_place_id, phone,
  parking_type, parking_description,
  center_prices ( is_affiliate, name, name_en, price, sort_order ),
  center_sns_links ( type, url, sort_order ),
  center_translations ( locale, name, address, description, parking_description )
`

function mapPrice(p) {
  return { name: p.name, nameEn: p.name_en ?? undefined, price: p.price }
}

function mapSnsLink(s) {
  return { type: s.type, url: s.url }
}

function mapCenter(row) {
  const rows = row.center_prices ?? []
  const prices = rows.filter((p) => !p.is_affiliate)
  const affiliatePrices = rows.filter((p) => p.is_affiliate)
  const en = (row.center_translations ?? []).find((t) => t.locale === 'en')

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
    prices: prices.length ? prices.map(mapPrice) : undefined,
    affiliatePrices: affiliatePrices.length ? affiliatePrices.map(mapPrice) : undefined,
    snsLinks: row.center_sns_links?.length ? row.center_sns_links.map(mapSnsLink) : undefined,
    parking: row.parking_type
      ? { type: row.parking_type, description: row.parking_description ?? undefined }
      : undefined,
    i18n: en
      ? {
          name: en.name ?? undefined,
          address: en.address ?? undefined,
          description: en.description ?? undefined,
          parking: en.parking_description ? { description: en.parking_description } : undefined,
        }
      : undefined,
  }
}

function mapConfig(configRow, eventRow, meetingRow) {
  return {
    departure: {
      name: configRow.departure_name,
      nameEn: configRow.departure_name_en,
      naverPlaceId: configRow.departure_naver_place_id,
    },
    instagram: configRow.instagram,
    event: eventRow
      ? {
          active: eventRow.active,
          title: eventRow.title,
          titleEn: eventRow.title_en ?? undefined,
          description: eventRow.description ?? undefined,
          descriptionEn: eventRow.description_en ?? undefined,
          date: eventRow.event_date ?? undefined,
          endDate: eventRow.end_date ?? undefined,
          linkUrl: eventRow.link_url ?? undefined,
          linkLabel: eventRow.link_label ?? undefined,
          linkLabelEn: eventRow.link_label_en ?? undefined,
        }
      : undefined,
    meeting: meetingRow
      ? {
          active: meetingRow.active,
          centerId: meetingRow.center_id ?? '',
          date: meetingRow.meeting_date,
          time: meetingRow.meeting_time,
        }
      : undefined,
  }
}

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({ centers: [], config: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [centersResult, configResult, eventResult, meetingResult] = await Promise.all([
        supabase
          .from('centers')
          .select(CENTERS_SELECT)
          .order('id')
          .order('sort_order', { foreignTable: 'center_prices' })
          .order('sort_order', { foreignTable: 'center_sns_links' }),
        supabase
          .from('app_config')
          .select('instagram, departure_name, departure_name_en, departure_naver_place_id')
          .eq('id', true)
          .maybeSingle(),
        supabase.from('events').select('*').eq('active', true).maybeSingle(),
        supabase.from('meetings').select('*').eq('active', true).maybeSingle(),
      ])

      if (cancelled) return

      const error = centersResult.error ?? configResult.error ?? eventResult.error ?? meetingResult.error
      if (error) {
        setState({ centers: [], config: null, loading: false, error })
        return
      }

      setState({
        centers: centersResult.data.map(mapCenter),
        config: mapConfig(configResult.data, eventResult.data, meetingResult.data),
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
