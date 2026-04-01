'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useProfile } from '@/lib/hooks/useProfile'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useActivities } from '@/lib/hooks/useActivities'
import { useHonors } from '@/lib/hooks/useHonors'
import { useEssays } from '@/lib/hooks/useEssays'
import { useDocuments } from '@/lib/hooks/useDocuments'
import { useDeadlines } from '@/lib/hooks/useDeadlines'
import { useI18n } from '@/lib/i18n'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import {
  GraduationCap,
  Trophy,
  FileText,
  FolderOpen,
  CalendarClock,
  Plus,
  PenLine,
  Lightbulb,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Timer,
  CheckCircle2,
} from 'lucide-react'
import { daysUntil, getDeadlineColor, formatDateShort, cn } from '@/lib/utils'

export default function DashboardPage() {
  const { t } = useI18n()
  const { profile, loading: profileLoading } = useProfile()
  const { items: universities, loading: uniLoading } = useUniversities()
  const { items: activities } = useActivities()
  const { items: honors } = useHonors()
  const { items: essays } = useEssays()
  const { items: documents } = useDocuments()
  const { items: deadlines } = useDeadlines()

  const upcomingDeadlines = useMemo(() => {
    return deadlines
      .filter(d => d.status !== 'completed' && daysUntil(d.date) >= 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [deadlines])

  const suggestions = useMemo(() => {
    const tips: { label: string; href: string }[] = []
    if (universities.length === 0) tips.push({ label: t.dashboard.suggestAddUni, href: '/universities' })
    if (activities.length === 0) tips.push({ label: t.dashboard.suggestAddActivity, href: '/activities' })
    if (honors.length === 0) tips.push({ label: t.dashboard.suggestAddHonor, href: '/honors' })
    if (essays.length === 0) tips.push({ label: t.dashboard.suggestAddEssay, href: '/essays' })
    if (deadlines.length === 0) tips.push({ label: t.dashboard.suggestAddDeadline, href: '/deadlines' })
    return tips
  }, [universities, activities, honors, essays, deadlines, t])

  const recentItems = useMemo(() => {
    type RecentItem = { id: string; name: string; type: string; updatedAt: string; href: string }
    const all: RecentItem[] = [
      ...universities.map(u => ({ id: u.id, name: u.name, type: t.nav.universities, updatedAt: u.updatedAt, href: `/universities/${u.id}` })),
      ...activities.map(a => ({ id: a.id, name: a.name, type: t.nav.activities, updatedAt: a.updatedAt, href: `/activities/${a.id}` })),
      ...honors.map(h => ({ id: h.id, name: h.title, type: t.nav.honors, updatedAt: h.updatedAt, href: `/honors/${h.id}` })),
      ...essays.map(e => ({ id: e.id, name: e.title, type: t.nav.essays, updatedAt: e.updatedAt, href: `/essays/${e.id}` })),
    ]
    return all.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4)
  }, [universities, activities, honors, essays, t])

  if (profileLoading || uniLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-surface-400 text-sm">{t.common.loading}</div>
      </div>
    )
  }

  const greeting = profile?.name ? profile.name.split(' ')[0] : ''

  const stats = [
    { label: t.nav.universities, count: universities.length, icon: GraduationCap, href: '/universities', color: 'text-brand-600 bg-brand-50' },
    { label: t.nav.activities, count: activities.length, icon: Sparkles, href: '/activities', color: 'text-purple-600 bg-purple-50' },
    { label: t.nav.honors, count: honors.length, icon: Trophy, href: '/honors', color: 'text-amber-600 bg-amber-50' },
    { label: t.nav.essays, count: essays.length, icon: PenLine, href: '/essays', color: 'text-emerald-600 bg-emerald-50' },
    { label: t.nav.documents, count: documents.length, icon: FolderOpen, href: '/documents', color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-surface-900 tracking-tight">
          {t.dashboard.greeting}{greeting ? `, ${greeting}` : ''}
        </h1>
        <p className="text-sm text-surface-500 mt-2">
          {t.dashboard.overview}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {stats.map((stat, i) => (
          <Link key={stat.label} href={stat.href} style={{ animationDelay: `${i * 60}ms` }} className="animate-slide-up">
            <Card className="card-interactive !p-4">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
                  <stat.icon size={19} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-sans text-surface-900">{stat.count}</p>
                  <p className="text-xs text-surface-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Deadline Countdown Banner */}
      {upcomingDeadlines.length > 0 && (() => {
        const next = upcomingDeadlines[0]
        const days = daysUntil(next.date)
        return (
          <Card className="mb-6 !p-4 border-l-4 border-l-brand-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center shrink-0">
                <Timer size={22} className="text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-surface-500 font-medium">{t.dashboard.deadlineCountdown}</p>
                <p className="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate">{next.title}</p>
                <p className="text-xs text-surface-500">{next.universityName ? `${next.universityName} · ` : ''}{formatDateShort(next.date)}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-brand-600">{days}</p>
                <p className="text-xs text-surface-500">{t.dashboard.daysLeft}</p>
              </div>
            </div>
          </Card>
        )
      })()}

      {/* University Progress */}
      {universities.length > 0 && universities.some(u => u.requirements && u.requirements.length > 0) && (
        <Card className="mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle2 size={18} className="text-surface-400" />
            <h2 className="text-lg font-display text-surface-900 dark:text-surface-100">{t.dashboard.universityProgress}</h2>
          </div>
          <div className="space-y-3">
            {universities
              .filter(u => u.requirements && u.requirements.length > 0)
              .slice(0, 6)
              .map(u => {
                const total = u.requirements.length
                const done = u.requirements.filter(r => r.completed).length
                const pct = Math.round((done / total) * 100)
                return (
                  <Link key={u.id} href={`/universities/${u.id}`} className="block group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-surface-800 dark:text-surface-200 group-hover:text-brand-600 transition-colors truncate">{u.name}</span>
                      <span className="text-xs text-surface-500 shrink-0 ml-2">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          pct === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-brand-500 to-brand-600'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </Link>
                )
              })}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-display text-surface-900 flex items-center gap-2.5">
              <CalendarClock size={20} className="text-surface-400" />
              {t.dashboard.upcomingDeadlines}
            </h2>
            <Link href="/deadlines" className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-0.5">
              {t.dashboard.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          {upcomingDeadlines.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-surface-300" />
              </div>
              <p className="text-sm text-surface-400 mb-2">{t.dashboard.noDeadlines}</p>
              <Link href="/deadlines" className="text-xs text-brand-600 hover:underline">
                {t.dashboard.addDeadline}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingDeadlines.map(d => {
                const days = daysUntil(d.date)
                const colorClass = getDeadlineColor(days)
                return (
                  <div key={d.id} className="flex items-center justify-between gap-3 group">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-surface-900 truncate group-hover:text-brand-700 transition-colors">{d.title}</p>
                      <p className="text-xs text-surface-500">
                        {d.universityName ? `${d.universityName} · ` : ''}
                        {formatDateShort(d.date)}
                      </p>
                    </div>
                    <Badge color={colorClass} className="shrink-0">
                      {days === 0 ? t.dashboard.today : days === 1 ? t.dashboard.tomorrow : `${days}d`}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Suggestions / Get Started */}
        {suggestions.length > 0 && (
          <Card>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                <Lightbulb size={18} className="text-amber-500" />
              </div>
              <h2 className="text-lg font-display text-surface-900">{t.dashboard.getStarted}</h2>
            </div>
            <div className="space-y-2">
              {suggestions.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-surface-100 hover:bg-surface-50 hover:border-surface-200 transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                    <Plus size={14} className="text-brand-600" />
                  </div>
                  <span className="text-sm text-surface-600 group-hover:text-surface-900 transition-colors flex-1">{s.label}</span>
                  <ArrowRight size={14} className="text-surface-300 group-hover:text-surface-500 transition-colors" />
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Items */}
        {recentItems.length > 0 && (
          <Card className={suggestions.length === 0 ? 'lg:col-span-1' : ''}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-surface-100 flex items-center justify-center">
                <FileText size={18} className="text-surface-400" />
              </div>
              <h2 className="text-lg font-display text-surface-900">{t.dashboard.recentlyUpdated}</h2>
            </div>
            <div className="space-y-2">
              {recentItems.map(item => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-surface-50 transition-all duration-200 group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-surface-900 truncate group-hover:text-brand-700 transition-colors">{item.name}</p>
                    <p className="text-xs text-surface-400">{item.type}</p>
                  </div>
                  <span className="text-xs text-surface-400 shrink-0 font-mono">
                    {formatDateShort(item.updatedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-xs font-semibold text-surface-400 uppercase tracking-[0.1em] mb-3">{t.dashboard.quickActions}</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/universities">
            <Button variant="secondary" size="sm" icon={<GraduationCap size={15} />}>
              {t.dashboard.addUniversity}
            </Button>
          </Link>
          <Link href="/activities">
            <Button variant="secondary" size="sm" icon={<Sparkles size={15} />}>
              {t.dashboard.addActivity}
            </Button>
          </Link>
          <Link href="/essays">
            <Button variant="secondary" size="sm" icon={<PenLine size={15} />}>
              {t.dashboard.writeEssay}
            </Button>
          </Link>
          <Link href="/deadlines">
            <Button variant="secondary" size="sm" icon={<CalendarClock size={15} />}>
              {t.dashboard.addDeadline}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
