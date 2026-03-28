'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function ConfirmedPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const tokenHash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    if (!tokenHash || !type) {
      setStatus('error')
      return
    }

    const supabase = createClient()
    supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'signup' | 'email',
    }).then(({ error }) => {
      if (error) {
        setStatus('error')
      } else {
        supabase.auth.signOut()
        setStatus('success')
      }
    })
  }, [searchParams])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center animate-fade-in">
          <Loader2 size={32} className="text-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-sm text-surface-500">Verifying your email...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-display text-surface-900 mb-2">Verification failed</h1>
          <p className="text-sm text-surface-500 mb-6 leading-relaxed">
            The link is invalid or has expired. Please try signing up again.
          </p>
          <Link href="/signup">
            <Button className="w-full">Sign Up</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-display text-surface-900 mb-2">Email confirmed!</h1>
        <p className="text-sm text-surface-500 mb-6 leading-relaxed">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <Link href="/login">
          <Button className="w-full">Sign In</Button>
        </Link>
      </div>
    </div>
  )
}
