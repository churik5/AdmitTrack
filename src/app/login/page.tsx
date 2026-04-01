'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/supabase/auth-context'
import { useI18n } from '@/lib/i18n'
import Button from '@/components/ui/Button'
import { GraduationCap, LogIn, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const { t, locale, setLocale, availableLocales } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) return

    setLoading(true)
    setError('')

    const { error: authError } = await signIn(email.trim(), password)

    if (authError) {
      setError(authError)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
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
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700'
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
          <p className="text-sm text-surface-500 mt-2">{t.auth.signInSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
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

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
              {t.auth.forgotPassword}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email.trim() || !password}
            icon={<LogIn size={16} />}
          >
            {loading ? t.auth.signingIn : t.common.signIn}
          </Button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          {t.auth.noAccount}{' '}
          <Link href="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
            {t.auth.createOne}
          </Link>
        </p>
      </div>
    </div>
  )
}
