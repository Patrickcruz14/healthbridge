import { createContext, useContext, useState } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'filipino'
  )

  const toggleLanguage = () => {
    const newLang = language === 'filipino' ? 'english' : 'filipino'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}