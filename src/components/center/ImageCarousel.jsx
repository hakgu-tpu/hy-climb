import { useRef, useState } from 'react'

const ImageCarousel = ({ images, centerName, current, onChange }) => {
  const total = images.length
  const single = total === 1
  const containerRef = useRef(null)
  const touchStartX = useRef(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)

  const prev = () => onChange((current - 1 + total) % total)
  const next = () => onChange((current + 1) % total)

  // 양 끝에서 저항감 (rubber band)
  const applyResistance = (dx) => {
    if (current === 0 && dx > 0) return dx * 0.2
    if (current === total - 1 && dx < 0) return dx * 0.2
    return dx
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setDragging(true)
  }

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return
    setDragX(e.touches[0].clientX - touchStartX.current)
  }

  const handleTouchEnd = () => {
    const w = containerRef.current?.offsetWidth ?? 390
    if (dragX > w * 0.3) prev()
    else if (dragX < -(w * 0.3)) next()
    setDragX(0)
    setDragging(false)
    touchStartX.current = null
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220px] overflow-hidden bg-zinc-100"
      onTouchStart={!single ? handleTouchStart : undefined}
      onTouchMove={!single ? handleTouchMove : undefined}
      onTouchEnd={!single ? handleTouchEnd : undefined}
    >
      {/* 슬라이드 트랙 — 모든 이미지를 가로로 나열 */}
      <div
        className="flex h-full"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(calc(-${(current / total) * 100}% + ${applyResistance(dragX)}px))`,
          transition: dragging ? 'none' : 'transform 0.25s ease',
          willChange: 'transform',
        }}
      >
        {images.map((img, i) => (
          <div key={img} style={{ width: `${100 / total}%` }} className="h-full flex-shrink-0">
            <img
              src={`/images/centers/${img}`}
              alt={`${centerName} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/placeholder.svg'
              }}
            />
          </div>
        ))}
      </div>

      {!single && (
        <>
          <button
            onClick={prev}
            aria-label="이전 사진"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center text-xl leading-none"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="다음 사진"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center text-xl leading-none"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onChange(i)}
                aria-label={`사진 ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCarousel
