import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/supabase/auth-context'
import { I18nProvider } from '@/lib/i18n'
import AppShell from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'AdmitTrack — College Admissions Workspace',
  description: 'Your personal workspace for US college admissions preparation',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AdmitTrack',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <I18nProvider>
            <AppShell>{children}</AppShell>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
