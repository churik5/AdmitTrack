'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

function ConfirmedContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  if (error) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-5">
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
    )
  }

  return (
    <div className="w-full max-w-sm text-center">
      <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
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
  )
}

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense>
        <ConfirmedContent />
      </Suspense>
    </div>
  )
}
