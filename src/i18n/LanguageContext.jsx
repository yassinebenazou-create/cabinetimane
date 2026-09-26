import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext, languageStorageKey } from './language.js'
import { arabicTranslations, translateDeep } from './translations.js'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'fr'
  }

  return window.localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'fr'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = useCallback((nextLanguage) => {
    const normalizedLanguage = nextLanguage === 'ar' ? 'ar' : 'fr'
    setLanguageState(normalizedLanguage)
    window.localStorage.setItem(languageStorageKey, normalizedLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const translate = useCallback(
    (text) => (language === 'ar' ? arabicTranslations[text] ?? text : text),
    [language],
  )

  const localize = useCallback((value) => translateDeep(value, translate), [translate])

  const value = useMemo(
    () => ({
      language,
      isRtl: language === 'ar',
      setLanguage,
      translate,
      localize,
    }),
    [language, localize, setLanguage, translate],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
