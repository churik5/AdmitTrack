'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

interface AppShellProps {
  children: ReactNode
}

const AUTH_PAGES = ['/login', '/signup', '/privacy', '/terms', '/support', '/confirmed', '/forgot-password', '/reset-password']

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAuthPage = AUTH_PAGES.includes(pathname)

  if (isAuthPage) {
    return (
      <div className="min-h-screen grain-overlay">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen grain-overlay">
      <Sidebar />
      <main className="md:ml-[15rem] pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
