'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  mode: ThemeMode
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_KEY = 'admittrack_theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved
  } catch {}
  return 'system'
}

function resolveTheme(mode: ThemeMode): Theme {
  if (mode === 'system') return getSystemTheme()
  return mode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system')
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const initialMode = getInitialMode()
    const initialTheme = resolveTheme(initialMode)
    setModeState(initialMode)
    setThemeState(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  // Listen for OS theme changes when mode is 'system'
  useEffect(() => {
    if (mode !== 'system') return

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? 'dark' : 'light'
      setThemeState(resolved)
      document.documentElement.classList.toggle('dark', resolved === 'dark')
    }

    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [mode])

  const setTheme = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    const resolved = resolveTheme(newMode)
    setThemeState(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    try {
      localStorage.setItem(THEME_KEY, newMode)
    } catch {}
  }, [])

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light'
    setTheme(next)
  }, [mode, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
