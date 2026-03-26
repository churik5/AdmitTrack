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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/supabase/auth-context'
import { useI18n } from '@/lib/i18n'

interface NavItem {
  labelKey: keyof import('@/lib/i18n/types').Translations['nav']
  href: string
  icon: React.ElementType
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
  const { locale, setLocale, availableLocales, t } = useI18n()

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/')

  return (
    <aside className="hidden md:flex flex-col w-[15rem] h-screen bg-white/70 backdrop-blur-md border-r border-surface-200/60 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-soft">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <span className="text-base font-display text-surface-900 tracking-tight">AdmitTrack</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.titleKey}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold text-surface-400 uppercase tracking-[0.12em]">
              {t.nav[group.titleKey]}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                        active
                          ? 'bg-brand-50 text-brand-700 font-medium shadow-soft'
                          : 'text-surface-500 hover:bg-surface-100 hover:text-surface-800'
                      )}
                    >
                      <item.icon size={17} className={active ? 'text-brand-600' : 'text-surface-400'} />
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
      <div className="px-3 py-3 border-t border-surface-100 space-y-0.5">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200',
            isActive('/profile')
              ? 'bg-brand-50 text-brand-700 font-medium'
              : 'text-surface-500 hover:bg-surface-100 hover:text-surface-800'
          )}
        >
          <User size={17} className={isActive('/profile') ? 'text-brand-600' : 'text-surface-400'} />
          {t.nav.profile}
        </Link>
        {user && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-surface-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
          >
            <LogOut size={17} />
            {t.common.signOut}
          </button>
        )}
        {/* Language switcher */}
        <div className="flex items-center gap-1 px-3 py-2">
          {availableLocales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => setLocale(loc.code)}
              className={cn(
                'px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200',
                locale === loc.code
                  ? 'bg-brand-100 text-brand-700'
                  : 'text-surface-400 hover:bg-surface-100 hover:text-surface-600'
              )}
            >
              {loc.flag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
