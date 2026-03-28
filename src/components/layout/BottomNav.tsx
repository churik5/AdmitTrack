'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  FileText,
  MoreHorizontal,
  Activity,
  Award,
  Microscope,
  FolderOpen,
  StickyNote,
  BookOpen,
  List,
  CheckSquare,
  User,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

interface NavItem {
  labelKey: keyof import('@/lib/i18n/types').Translations['nav']
  href: string
  icon: React.ElementType
}

const mainItems: NavItem[] = [
  { labelKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'universities', href: '/universities', icon: GraduationCap },
  { labelKey: 'essays', href: '/essays', icon: FileText },
  { labelKey: 'deadlines', href: '/deadlines', icon: Calendar },
]

const moreItems: NavItem[] = [
  { labelKey: 'activities', href: '/activities', icon: Activity },
  { labelKey: 'honors', href: '/honors', icon: Award },
  { labelKey: 'research', href: '/research', icon: Microscope },
  { labelKey: 'documents', href: '/documents', icon: FolderOpen },
  { labelKey: 'notes', href: '/notes', icon: StickyNote },
  { labelKey: 'guides', href: '/guides', icon: BookOpen },
  { labelKey: 'examples', href: '/examples', icon: List },
  { labelKey: 'checklist', href: '/checklist', icon: CheckSquare },
  { labelKey: 'profile', href: '/profile', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [showMore, setShowMore] = useState(false)
  const { t } = useI18n()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      {/* More sheet overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-surface-900/25 backdrop-blur-[2px] animate-fade-in"
            onClick={() => setShowMore(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-modal animate-slide-up max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
              <h3 className="text-base font-display text-surface-900">{t.nav.more}</h3>
              <button
                onClick={() => setShowMore(false)}
                className="p-1.5 text-surface-400 hover:text-surface-600 rounded-xl hover:bg-surface-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 p-4">
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMore(false)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl text-xs font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-surface-500 hover:bg-surface-50'
                  )}
                >
                  <item.icon size={22} className={isActive(item.href) ? 'text-brand-600' : 'text-surface-400'} />
                  {t.nav[item.labelKey]}
                </Link>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-surface-100 flex justify-center gap-3 text-[11px] text-surface-300">
              <Link href="/privacy" onClick={() => setShowMore(false)} className="hover:text-surface-500 transition-colors">Privacy</Link>
              <Link href="/terms" onClick={() => setShowMore(false)} className="hover:text-surface-500 transition-colors">Terms</Link>
              <Link href="/support" onClick={() => setShowMore(false)} className="hover:text-surface-500 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-t border-surface-200/60 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-1.5">
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[11px] font-medium transition-all duration-200',
                isActive(item.href) ? 'text-brand-600' : 'text-surface-400'
              )}
            >
              <item.icon size={21} />
              {t.nav[item.labelKey]}
            </Link>
          ))}
          <button
            onClick={() => setShowMore(true)}
            className={cn(
              'flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[11px] font-medium transition-all duration-200',
              showMore ? 'text-brand-600' : 'text-surface-400'
            )}
          >
            <MoreHorizontal size={21} />
            {t.nav.more}
          </button>
        </div>
      </nav>
    </>
  )
}
