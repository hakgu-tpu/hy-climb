import { useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import AffiliateBadge from '@/components/center/AffiliateBadge'
import NaverMapButton from '@/components/center/NaverMapButton'
import ImageCarousel from '@/components/center/ImageCarousel'
import SnsLinks from '@/components/center/SnsLinks'
import ParkingInfo from '@/components/center/ParkingInfo'
import { formatPrice } from '@/utils/naverMap'

const CenterDetail = ({ center, departure }) => {
  const { t, lang } = useLang()
  const [currentImage, setCurrentImage] = useState(0)

  const name = lang === 'en' ? (center.i18n?.name ?? center.name) : center.name
  const address = lang === 'en' ? (center.i18n?.address ?? center.address) : center.address
  const description = lang === 'en' ? (center.i18n?.description ?? center.description) : center.description

  return (
    <div>
      <ImageCarousel
        images={center.images}
        centerName={name}
        current={currentImage}
        onChange={setCurrentImage}
      />

      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h1 className="text-[20px] font-extrabold text-zinc-900 tracking-tight leading-snug">
            {name}
          </h1>
          {center.isAffiliated && <AffiliateBadge />}
        </div>

        {/* 주소 */}
        <p className="text-[12px] text-zinc-500 mb-1">{address}</p>

        {/* 전화번호 */}
        {center.phone && (
          <p className="text-[12px] text-zinc-500 mb-3">{center.phone}</p>
        )}

        {/* 소개 */}
        <p className="text-[13px] text-zinc-700 leading-relaxed mb-4">{description}</p>

        {/* 사진 썸네일 갤러리 */}
        {center.images.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none">
            {center.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setCurrentImage(i)}
                className={`flex-shrink-0 rounded-xl overflow-hidden transition-opacity ${
                  i === currentImage
                    ? 'ring-2 ring-zinc-900 ring-offset-1'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={`/images/centers/${img}`}
                  alt=""
                  className="w-[72px] h-[56px] object-cover bg-zinc-100"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/images/placeholder.svg'
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* SNS 링크 */}
        <SnsLinks snsLinks={center.snsLinks} />

        {/* 주차 정보 */}
        {center.parking && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
              {t('detail.sectionParking')}
            </p>
            <ParkingInfo parking={center.parking} i18nParking={center.i18n?.parking} />
          </div>
        )}

        {/* 제휴 가격 섹션 */}
        {center.affiliatePrices?.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold bg-orange-600 text-white">
                {t('detail.affiliated')}
              </span>
              <span className="text-[11px] font-semibold text-orange-700">
                {t('detail.sectionAffiliatePrice')}
              </span>
            </div>
            {center.affiliatePrices.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center py-[5px] border-b border-orange-200 last:border-b-0"
              >
                <span className="text-[11px] text-orange-900">
                  {lang === 'en' ? (item.nameEn ?? item.name) : item.name}
                </span>
                <span className="text-[11px] font-bold text-orange-700">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* 일반 가격 섹션 */}
        {center.prices?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
              {t('detail.sectionPrice')}
            </p>
            {center.prices.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center py-[7px] border-b border-zinc-100 last:border-b-0"
              >
                <span className="text-[12px] text-zinc-600">
                  {lang === 'en' ? (item.nameEn ?? item.name) : item.name}
                </span>
                <span className="text-[12px] font-semibold text-zinc-900">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* 길찾기 섹션 */}
        <div className="border-t border-zinc-200 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
            {t('detail.sectionDirections')}
          </p>
          <div className="flex flex-col gap-[6px]">
            <NaverMapButton center={center} type="default" />
            <NaverMapButton center={center} type="meeting" departure={departure} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CenterDetail
