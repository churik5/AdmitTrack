'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useI18n } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { GraduationCap, CheckCircle, Eye, EyeOff, KeyRound, Loader2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const { t, locale, setLocale, availableLocales } = useI18n()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()

    // Listen for PASSWORD_RECOVERY event from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setSessionReady(true)
      }
    })

    // Handle code from URL (PKCE flow)
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then((result) => {
        if (!result.error) {
          setSessionReady(true)
        } else {
          setError(result.error.message)
        }
      })
    }

    // Handle hash tokens (implicit flow)
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      // Supabase client auto-detects hash tokens, just wait for auth state change
    }

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session) {
        setSessionReady(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password.length < 6) {
      setError(t.auth.minPassword)
      return
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordsDontMatch)
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      await supabase.auth.signOut()
      setDone(true)
      setLoading(false)
    }
  }

  const LanguageSwitcher = () => (
    <div className="fixed top-4 right-4 flex gap-1">
      {availableLocales.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
            locale === l.code
              ? 'bg-brand-600 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  )

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <LanguageSwitcher />
        <div className="w-full max-w-sm text-center animate-fade-in">
          <Loader2 size={32} className="text-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-sm text-surface-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <LanguageSwitcher />
        <div className="w-full max-w-sm text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-display text-surface-900 mb-2">{t.auth.passwordUpdated}</h2>
          <p className="text-sm text-surface-500 mb-6 leading-relaxed">
            {t.auth.passwordUpdatedDesc}
          </p>
          <Link href="/login">
            <Button className="w-full">{t.common.signIn}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <LanguageSwitcher />
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-5 shadow-elevated">
            <GraduationCap size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-display text-surface-900 tracking-tight">{t.auth.resetPassword}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">{t.auth.newPassword}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base pr-10"
                required
                minLength={6}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">{t.common.confirmPassword}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !password || !confirmPassword}
            icon={<KeyRound size={16} />}
          >
            {loading ? t.auth.updating : t.auth.updatePassword}
          </Button>
        </form>
      </div>
    </div>
  )
}
