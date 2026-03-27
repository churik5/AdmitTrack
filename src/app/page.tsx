'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/lib/hooks/useProfile'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const { t } = useI18n()
  const router = useRouter()
  const { profile, loading } = useProfile()

  useEffect(() => {
    if (loading) return
    if (profile?.onboardingComplete) {
      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
  }, [profile, loading, router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-surface-400 text-sm">{t.common.loading}</div>
    </div>
  )
}
