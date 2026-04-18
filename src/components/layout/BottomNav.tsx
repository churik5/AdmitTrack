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
  LogOut,
  DollarSign,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useAuth } from '@/lib/supabase/auth-context'
import { useTheme } from '@/lib/theme'

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
  { labelKey: 'financialAid', href: '/financial-aid', icon: DollarSign },
  { labelKey: 'guides', href: '/guides', icon: BookOpen },
  { labelKey: 'examples', href: '/examples', icon: List },
  { labelKey: 'checklist', href: '/checklist', icon: CheckSquare },
  { labelKey: 'profile', href: '/profile', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [showMore, setShowMore] = useState(false)
  const { t } = useI18n()
  const { signOut } = useAuth()
  const { mode, toggleTheme } = useTheme()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      {/* More sheet overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[#1a1510]/45 backdrop-blur-[3px] animate-fade-in"
            onClick={() => setShowMore(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-surface-0 dark:bg-[#241e15] border-t border-ink-900/20 dark:border-[#48402e] rounded-t-md shadow-modal animate-slide-up max-h-[75vh] overflow-y-auto">
            <div className="relative flex items-center justify-between px-6 pt-5 pb-4">
              <div>
                <p className="kicker text-[9px] mb-1">§ Directory</p>
                <h3 className="font-display text-[1.3rem] text-ink-900 dark:text-surface-100 font-[500]">
                  {t.nav.more}
                </h3>
              </div>
              <button
                onClick={() => setShowMore(false)}
                className="p-2 text-ink-900/45 hover:text-brand-700 transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
              <span className="absolute bottom-0 left-6 right-6 h-px bg-ink-900/20 dark:bg-surface-100/12" />
              <span className="absolute -bottom-[3px] left-6 h-[3px] w-10 bg-brand-700" />
            </div>
            <div className="grid grid-cols-3 gap-1 p-4">
              {moreItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMore(false)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 py-3 px-2 rounded-sm text-[10px] font-sans uppercase tracking-[0.1em] transition-colors duration-200',
                      active
                        ? 'text-brand-700 dark:text-brand-600 font-semibold'
                        : 'text-ink-700 dark:text-surface-300 hover:text-brand-700 dark:hover:text-brand-600'
                    )}
                  >
                    <item.icon
                      size={20}
                      strokeWidth={active ? 1.75 : 1.5}
                      className={active ? 'text-brand-700 dark:text-brand-600' : 'text-ink-900/50 dark:text-surface-400'}
                    />
                    {t.nav[item.labelKey]}
                  </Link>
                )
              })}
            </div>
            <div className="px-5 py-3 border-t border-ink-900/15 dark:border-surface-700 space-y-1">
              <button
                onClick={() => { toggleTheme(); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-[11px] font-sans uppercase tracking-[0.18em] text-ink-700 dark:text-surface-300 hover:text-brand-700 transition-colors"
              >
                {mode === 'light' ? <Sun size={14} strokeWidth={1.5} /> : mode === 'dark' ? <Moon size={14} strokeWidth={1.5} /> : <Monitor size={14} strokeWidth={1.5} />}
                {mode === 'light' ? t.common.lightMode : mode === 'dark' ? t.common.darkMode : t.common.systemMode}
              </button>
              <button
                onClick={() => { setShowMore(false); signOut(); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-[11px] font-sans uppercase tracking-[0.18em] text-brand-700 dark:text-brand-600 hover:text-brand-900 transition-colors"
              >
                <LogOut size={14} strokeWidth={1.5} />
                {t.common.signOut}
              </button>
            </div>
            <div className="px-5 py-3 border-t border-ink-900/10 dark:border-surface-800 flex justify-center gap-3 font-serif italic text-[10px] text-ink-900/45 dark:text-surface-500">
              <Link href="/privacy" target="_blank" onClick={() => setShowMore(false)} className="hover:text-brand-700 transition-colors">Privacy</Link>
              <span className="text-ink-900/25">·</span>
              <Link href="/terms" target="_blank" onClick={() => setShowMore(false)} className="hover:text-brand-700 transition-colors">Terms</Link>
              <span className="text-ink-900/25">·</span>
              <Link href="/support" target="_blank" onClick={() => setShowMore(false)} className="hover:text-brand-700 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-surface-50/90 dark:bg-[#1a1510]/90 backdrop-blur-md border-t border-ink-900/20 dark:border-[#3d3425] md:hidden safe-area-bottom">
        {/* Top crimson hairline */}
        <span aria-hidden className="absolute -top-px left-0 right-0 h-px bg-brand-700/30" />
        <div className="flex items-center justify-around px-2 py-1.5">
          {mainItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                {...(item.href === '/universities' ? { 'data-tour': 'nav-universities-mobile' } : item.href === '/deadlines' ? { 'data-tour': 'nav-deadlines-mobile' } : {})}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 min-h-[48px] py-2 px-3 text-[9px] font-sans uppercase tracking-[0.14em] transition-colors duration-200',
                  active ? 'text-brand-700 font-semibold' : 'text-ink-900/55 dark:text-surface-400'
                )}
              >
                {active && <span aria-hidden className="absolute top-0 h-[3px] w-7 bg-brand-700 rounded-sm" />}
                <item.icon size={19} strokeWidth={active ? 1.75 : 1.5} />
                {t.nav[item.labelKey]}
              </Link>
            )
          })}
          <button
            onClick={() => setShowMore(true)}
            className={cn(
              'relative flex flex-col items-center gap-0.5 min-h-[48px] py-2 px-3 text-[9px] font-sans uppercase tracking-[0.14em] transition-colors duration-200',
              showMore ? 'text-brand-700 font-semibold' : 'text-ink-900/55 dark:text-surface-400'
            )}
          >
            <MoreHorizontal size={19} strokeWidth={1.5} />
            {t.nav.more}
          </button>
        </div>
      </nav>
    </>
  )
}
