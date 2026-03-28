'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ConfirmedPage() {
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
