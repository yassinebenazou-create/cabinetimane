import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { languageStorageKey } from './i18n/language.js'

const initialLanguage = window.localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'fr'
document.documentElement.lang = initialLanguage
document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
