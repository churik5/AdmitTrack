'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { GraduationCap, Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const { t, locale, setLocale, availableLocales } = useI18n()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
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

        <div className="w-full max-w-sm text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
            <Mail size={30} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-display text-surface-900 mb-2">{t.auth.resetLinkSent}</h2>
          <p className="text-sm text-surface-500 mb-6 leading-relaxed">
            {t.auth.resetLinkSentDesc}
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-5 shadow-elevated">
            <GraduationCap size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-display text-surface-900 tracking-tight">{t.auth.resetPassword}</h1>
          <p className="text-sm text-surface-500 mt-2">{t.auth.resetPasswordSubtitle}</p>
        </div>

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

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email.trim()}
            icon={<Mail size={16} />}
          >
            {loading ? t.auth.sending : t.auth.sendResetLink}
          </Button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1">
            <ArrowLeft size={14} />
            {t.auth.backToSignIn}
          </Link>
        </p>
      </div>
    </div>
  )
}
