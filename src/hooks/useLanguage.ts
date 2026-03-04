import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useLanguage() {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en')

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng)
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const toggleLanguage = () => {
    const nextLang = currentLang.includes('zh') ? 'en' : 'zh'
    i18n.changeLanguage(nextLang)
  }

  return {
    currentLang,
    toggleLanguage,
    t: i18n.t.bind(i18n),
  }
}
