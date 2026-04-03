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
  const { theme, toggleTheme } = useTheme()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <aside className="hidden md:flex flex-col w-[15rem] h-screen bg-white/70 dark:bg-surface-900/70 backdrop-blur-md border-r border-surface-200/60 dark:border-surface-700/60 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-100 dark:border-surface-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-soft">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <span className="text-base font-display text-surface-900 dark:text-surface-100 tracking-tight">AdmitTrack</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.titleKey}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-[0.12em]">
              {t.nav[group.titleKey]}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...(item.href === '/universities' ? { 'data-tour': 'nav-universities' } : item.href === '/deadlines' ? { 'data-tour': 'nav-deadlines' } : {})}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                        active
                          ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium shadow-soft'
                          : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-200'
                      )}
                    >
                      <item.icon size={17} className={active ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400'} />
                      {t.nav[item.labelKey]}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Profile & Sign Out */}
      <div className="px-3 py-3 border-t border-surface-100 dark:border-surface-800 space-y-0.5">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200',
            isActive('/profile')
              ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium'
              : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-200'
          )}
        >
          <User size={17} className={isActive('/profile') ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400'} />
          {t.nav.profile}
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-200 transition-all duration-200 w-full"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          {theme === 'dark' ? t.common.lightMode : t.common.darkMode}
        </button>
        {user && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-surface-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition-all duration-200 w-full"
          >
            <LogOut size={17} />
            {t.common.signOut}
          </button>
        )}
      </div>

      {/* Legal links */}
      <div className="px-6 py-2 border-t border-surface-100 dark:border-surface-800 flex gap-3 text-[11px] text-surface-300">
        <Link href="/privacy" target="_blank" className="hover:text-surface-500 transition-colors">Privacy</Link>
        <Link href="/terms" target="_blank" className="hover:text-surface-500 transition-colors">Terms</Link>
        <Link href="/support" target="_blank" className="hover:text-surface-500 transition-colors">Support</Link>
      </div>
    </aside>
  )
}
