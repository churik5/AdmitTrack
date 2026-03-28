'use client'

import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support &mdash; AdmitTrack</h1>
          <p className="text-sm text-gray-500 mb-8">
            AdmitTrack is a platform for organizing admissions-related information across the web app and iOS app.
          </p>

          <div className="prose prose-gray prose-sm max-w-none">
            <p>If you need help with your account, experience a bug, or have a question about the Service, contact:</p>

            <a
              href="mailto:appbuilddesk@gmail.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 transition-colors no-underline my-6"
            >
              <div className="p-2 bg-brand-100 rounded-lg">
                <Mail size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 m-0">Email</p>
                <p className="text-xs text-gray-500 m-0">appbuilddesk@gmail.com</p>
              </div>
            </a>

            <p>Please include:</p>
            <ul>
              <li>the email address connected to your account;</li>
              <li>a short description of the issue;</li>
              <li>the platform you use (web or iOS);</li>
              <li>screenshots, if relevant.</li>
            </ul>

            <p>We will review support requests and respond as reasonably possible.</p>

            <h2>Privacy-related requests</h2>
            <p>For privacy or account deletion questions, contact:<br />
              <a href="mailto:appbuilddesk@gmail.com">appbuilddesk@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
        </div>
      </div>
    </div>
  )
}
