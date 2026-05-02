import { createContext, useContext, useState } from 'react';
import ko from '@/i18n/ko.json';
import en from '@/i18n/en.json';

const messages = { ko, en };

function detectLang() {
  const stored = localStorage.getItem('lang');
  if (stored === 'ko' || stored === 'en') return stored;
  return navigator.language?.startsWith('ko') ? 'ko' : 'en';
}

function resolve(obj, key) {
  return key.split('.').reduce((cur, part) => cur?.[part], obj);
}

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectLang);

  const setLang = (next) => {
    localStorage.setItem('lang', next);
    setLangState(next);
  };

  const t = (key, vars) => {
    const str = resolve(messages[lang], key) ?? key;
    if (!vars) return str;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v),
      str
    );
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
