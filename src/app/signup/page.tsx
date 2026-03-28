'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/supabase/auth-context'
import { useI18n } from '@/lib/i18n'
import Button from '@/components/ui/Button'
import { GraduationCap, UserPlus, Eye, EyeOff } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const { t, locale, setLocale, availableLocales } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) return

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

    const { error: authError } = await signUp(email.trim(), password)

    if (authError) {
      setError(authError)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        {/* Language Switcher */}
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

        <div className="w-full max-w-sm text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-display text-surface-900 mb-2">{t.auth.checkEmail}</h2>
          <p className="text-sm text-surface-500 mb-6 leading-relaxed">
            {t.auth.checkEmailDesc}
          </p>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              {t.auth.backToSignIn}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Language Switcher */}
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

      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-5 shadow-elevated">
            <GraduationCap size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-display text-surface-900 tracking-tight">AdmitTrack</h1>
          <p className="text-sm text-surface-500 mt-2">{t.auth.signUpSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">{t.common.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-base"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">{t.common.password}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base pr-10"
                required
                minLength={6}
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
            disabled={loading || !email.trim() || !password || !confirmPassword}
            icon={<UserPlus size={16} />}
          >
            {loading ? t.auth.creatingAccount : t.common.signUp}
          </Button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          {t.auth.hasAccount}{' '}
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium">
            {t.auth.signInLink}
          </Link>
        </p>

        <p className="text-center text-xs text-surface-400 mt-4">
          {locale === 'ru' ? 'Регистрируясь, вы соглашаетесь с' : 'By signing up, you agree to our'}{' '}
          <Link href="/terms" className="underline hover:text-surface-600">
            {locale === 'ru' ? 'Условиями использования' : 'Terms of Use'}
          </Link>
          {' '}{locale === 'ru' ? 'и' : 'and'}{' '}
          <Link href="/privacy" className="underline hover:text-surface-600">
            {locale === 'ru' ? 'Политикой конфиденциальности' : 'Privacy Policy'}
          </Link>
        </p>
      </div>
    </div>
  )
}
