'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  Activity,
  Award,
  FileText,
  Microscope,
  FolderOpen,
  StickyNote,
  BookOpen,
  List,
  CheckSquare,
  User,
  LogOut,
  DollarSign,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/supabase/auth-context'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

interface NavItem {
  labelKey: keyof import('@/lib/i18n/types').Translations['nav']
  href: string
  icon: React.ElementType
  dataTour?: string
}

interface NavGroup {
  titleKey: keyof import('@/lib/i18n/types').Translations['nav']
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    titleKey: 'main',
    items: [
      { labelKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
      { labelKey: 'universities', href: '/universities', icon: GraduationCap },
      { labelKey: 'deadlines', href: '/deadlines', icon: Calendar },
    ],
  },
  {
    titleKey: 'application',
    items: [
      { labelKey: 'activities', href: '/activities', icon: Activity },
      { labelKey: 'honors', href: '/honors', icon: Award },
      { labelKey: 'essays', href: '/essays', icon: FileText },
      { labelKey: 'research', href: '/research', icon: Microscope },
    ],
  },
  {
    titleKey: 'organize',
    items: [
      { labelKey: 'documents', href: '/documents', icon: FolderOpen },
      { labelKey: 'notes', href: '/notes', icon: StickyNote },
      { labelKey: 'financialAid', href: '/financial-aid', icon: DollarSign },
    ],
  },
  {
    titleKey: 'help',
    items: [
      { labelKey: 'guides', href: '/guides', icon: BookOpen },
      { labelKey: 'examples', href: '/examples', icon: List },
      { labelKey: 'checklist', href: '/checklist', icon: CheckSquare },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()
  const { t } = useI18n()
  const { mode, toggleTheme } = useTheme()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col w-[16rem] h-screen fixed left-0 top-0 z-30',
        // Parchment column with right-edge hairline seam
        'bg-surface-50/85 dark:bg-surface-900/85 backdrop-blur-md',
        'border-r border-ink-900/15 dark:border-surface-700',
      )}
    >
      {/* Right seam — double hairline */}
      <span aria-hidden className="absolute top-0 bottom-0 right-[-4px] w-px bg-ink-900/10 dark:bg-surface-100/10" />

      {/* ============== MASTHEAD ============== */}
      <div className="px-6 pt-7 pb-5 border-b border-ink-900/20 dark:border-surface-700 relative">
        <Link href="/dashboard" className="block group">
          <p className="kicker text-[9px] mb-2">Anno MMXXVI</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[1.9rem] leading-none tracking-tight text-ink-900 dark:text-surface-100 font-[500]">
              Admit
            </span>
            <span className="font-display italic text-[1.9rem] leading-none tracking-tight text-brand-700 font-[500]">
              Track
            </span>
          </div>
          <p className="mt-2 font-serif italic text-[11px] text-ink-700/70 dark:text-surface-400">
            a chronicle of applications
          </p>
        </Link>
        {/* Crimson stub under masthead */}
        <span className="absolute -bottom-px left-6 h-[3px] w-12 bg-brand-700" />
      </div>

      {/* ============== NAVIGATION ============== */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={group.titleKey}>
            <div className="flex items-center gap-2 px-2 mb-2">
              <span className="kicker text-[9px]">
                {romanize(gIdx + 1)}
              </span>
              <span className="font-display italic text-[12px] text-ink-700 dark:text-surface-300">
                {t.nav[group.titleKey]}
              </span>
              <span className="flex-1 h-px bg-ink-900/12 dark:bg-surface-100/10" />
            </div>
            <ul className="space-y-[1px]">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...(item.href === '/universities'
                        ? { 'data-tour': 'nav-universities' }
                        : item.href === '/deadlines'
                        ? { 'data-tour': 'nav-deadlines' }
                        : {})}
                      className={cn(
                        'group relative flex items-center gap-3 px-3 py-[7px] text-[14px] font-serif transition-all duration-200',
                        active
                          ? 'text-brand-700 dark:text-brand-600 font-semibold'
                          : 'text-ink-700 dark:text-surface-300 hover:text-brand-700 dark:hover:text-brand-600'
                      )}
                    >
                      {/* Active marginal mark — ◆ / crimson bar */}
                      {active ? (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                          <span className="w-[3px] h-5 bg-brand-700 rounded-none" />
                        </span>
                      ) : (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-transparent group-hover:bg-brand-700/30 transition-colors duration-200" />
                      )}
                      <item.icon
                        size={15}
                        strokeWidth={active ? 2 : 1.5}
                        className={cn(
                          'shrink-0 transition-colors ml-1',
                          active ? 'text-brand-700 dark:text-brand-600' : 'text-ink-900/50 dark:text-surface-400 group-hover:text-brand-700'
                        )}
                      />
                      <span className="tracking-[0.01em]">{t.nav[item.labelKey]}</span>
                      {active && (
                        <span className="ml-auto text-brand-700 text-[10px] leading-none">❦</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ============== COLOPHON / PROFILE ============== */}
      <div className="px-4 py-3 border-t border-ink-900/15 dark:border-surface-700 space-y-[1px]">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-3 px-3 py-2 text-[13px] font-serif transition-colors duration-200 rounded-sm',
            isActive('/profile')
              ? 'text-brand-700 dark:text-brand-600 font-semibold'
              : 'text-ink-700 dark:text-surface-300 hover:text-brand-700'
          )}
        >
          <User size={15} strokeWidth={1.5} className={isActive('/profile') ? 'text-brand-700' : 'text-ink-900/50 dark:text-surface-400'} />
          {t.nav.profile}
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 text-[13px] font-serif text-ink-700 dark:text-surface-300 hover:text-brand-700 transition-colors duration-200 w-full rounded-sm"
        >
          {mode === 'light' ? (
            <Sun size={15} strokeWidth={1.5} className="text-ink-900/50 dark:text-surface-400" />
          ) : mode === 'dark' ? (
            <Moon size={15} strokeWidth={1.5} className="text-ink-900/50 dark:text-surface-400" />
          ) : (
            <Monitor size={15} strokeWidth={1.5} className="text-ink-900/50 dark:text-surface-400" />
          )}
          {mode === 'light' ? t.common.lightMode : mode === 'dark' ? t.common.darkMode : t.common.systemMode}
        </button>
        {user && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-3 py-2 text-[13px] font-serif text-ink-700/70 dark:text-surface-400 hover:text-brand-700 transition-colors duration-200 w-full rounded-sm"
          >
            <LogOut size={15} strokeWidth={1.5} className="text-ink-900/40 dark:text-surface-500" />
            {t.common.signOut}
          </button>
        )}
      </div>

      {/* Legal — colophon line */}
      <div className="px-6 py-3 border-t border-ink-900/10 dark:border-surface-800 flex items-center gap-3 font-serif italic text-[10px] text-ink-900/45 dark:text-surface-500">
        <Link href="/privacy" target="_blank" className="hover:text-brand-700 transition-colors">Privacy</Link>
        <span className="text-ink-900/25">·</span>
        <Link href="/terms" target="_blank" className="hover:text-brand-700 transition-colors">Terms</Link>
        <span className="text-ink-900/25">·</span>
        <Link href="/support" target="_blank" className="hover:text-brand-700 transition-colors">Support</Link>
      </div>
    </aside>
  )
}

function romanize(n: number): string {
  const map: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let result = ''
  for (const [value, numeral] of map) {
    while (n >= value) {
      result += numeral
      n -= value
    }
  }
  return result
}
