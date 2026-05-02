import { useLang } from '@/contexts/LangContext'

const LangToggle = () => {
  const { lang, setLang } = useLang()

  return (
    <button
      onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
      className="px-2 py-[2px] rounded text-[11px] font-semibold border border-zinc-200 text-zinc-500 hover:border-zinc-400 transition-colors"
    >
      {lang === 'ko' ? 'KO' : 'EN'}
    </button>
  )
}

export default LangToggle
