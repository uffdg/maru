import { useMemo, useState } from 'react';
import { LanguageContext } from './languageContext';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const value = useMemo(
    () => ({
      lang,
      toggle: () => setLang((current) => (current === 'en' ? 'es' : 'en')),
      setLang,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
