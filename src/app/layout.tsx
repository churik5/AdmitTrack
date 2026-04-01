import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/supabase/auth-context'
import { I18nProvider } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import AppShell from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'AdmitTrack — College Admissions Workspace',
  description: 'Your personal workspace for US college admissions preparation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <I18nProvider>
            <ThemeProvider>
              <AppShell>{children}</AppShell>
            </ThemeProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
