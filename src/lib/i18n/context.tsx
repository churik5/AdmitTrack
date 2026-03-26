'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { Locale, Translations } from './types'
import { en } from './en'
import { ru } from './ru'

const translations: Record<Locale, Translations> = { en, ru }

const LOCALE_KEY = 'admittrack_locale'

interface I18nContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  availableLocales: { code: Locale; label: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const AVAILABLE_LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ru', label: 'Русский', flag: 'RU' },
]

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {}
  // Check browser language
  const browserLang = navigator.language.slice(0, 2)
  if (browserLang === 'ru') return 'ru'
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocaleState(getInitialLocale())
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(LOCALE_KEY, newLocale)
    } catch {}
    // Update html lang attribute
    document.documentElement.lang = newLocale
  }, [])

  const t = translations[locale]

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, availableLocales: AVAILABLE_LOCALES }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
