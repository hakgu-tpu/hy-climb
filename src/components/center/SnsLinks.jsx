const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E1306C">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const BlogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#03C75A">
    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
  </svg>
)

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
)

const WebsiteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
)

const ICON_MAP = {
  instagram: InstagramIcon,
  blog: BlogIcon,
  youtube: YoutubeIcon,
  website: WebsiteIcon,
}

const SnsLinks = ({ snsLinks }) => {
  if (!snsLinks?.length) return null

  return (
    <div className="flex gap-3 items-center mb-4">
      {snsLinks.map(({ type, url }) => {
        const Icon = ICON_MAP[type]
        if (!Icon) return null
        return (
          <button
            key={type}
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors"
            aria-label={type}
          >
            <Icon />
          </button>
        )
      })}
    </div>
  )
}

export default SnsLinks
