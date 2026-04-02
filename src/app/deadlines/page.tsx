'use client'

import { useState, useMemo } from 'react'
import {
  Calendar,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  List,
  CalendarDays,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import Tabs from '@/components/ui/Tabs'
import { useDeadlines } from '@/lib/hooks/useDeadlines'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useI18n } from '@/lib/i18n'
import { Deadline, DeadlineType, DeadlinePriority } from '@/lib/types'
import {
  cn,
  formatDate,
  daysUntil,
  getDeadlineColor,
  statusLabel,
  DEADLINE_TYPES,
} from '@/lib/utils'

const DEADLINE_PRIORITIES: DeadlinePriority[] = ['critical', 'high', 'medium', 'low']

const PRIORITY_COLORS: Record<DeadlinePriority, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-600',
}

const PRIORITY_DOTS: Record<DeadlinePriority, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-gray-400',
}

interface FormData {
  title: string
  date: string
  time: string
  universityId: string
  universityName: string
  type: DeadlineType
  priority: DeadlinePriority
  notes: string
}

const emptyForm: FormData = {
  title: '',
  date: '',
  time: '',
  universityId: '',
  universityName: '',
  type: 'application',
  priority: 'high',
  notes: '',
}

export default function DeadlinesPage() {
  const { items: deadlines, loading, create, update, remove } = useDeadlines()
  const { items: universities } = useUniversities()
  const { t } = useI18n()

  const VIEW_TABS = [
    { id: 'list', label: t.deadlines.listView },
    { id: 'calendar', label: t.deadlines.calendarView },
  ]

  const FILTER_TABS = [
    { id: 'all', label: t.common.all },
    { id: 'upcoming', label: t.deadlines.upcoming },
    { id: 'completed', label: t.deadlines.completed },
    { id: 'overdue', label: t.deadlines.overdue },
  ]

  const [view, setView] = useState('list')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState<DeadlineType | 'all'>('all')
  const [uniFilter, setUniFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // Compute actual status for each deadline
  const deadlinesWithStatus = useMemo(() => {
    return deadlines.map((d) => {
      const days = daysUntil(d.date)
      let computedStatus = d.status
      if (d.status !== 'completed') {
        computedStatus = days < 0 ? 'overdue' : 'upcoming'
      }
      return { ...d, computedStatus, daysLeft: days }
    })
  }, [deadlines])

  const filtered = useMemo(() => {
    return deadlinesWithStatus.filter((d) => {
      const matchesStatus = statusFilter === 'all' || d.computedStatus === statusFilter
      const matchesType = typeFilter === 'all' || d.type === typeFilter
      const matchesUni = uniFilter === 'all' || d.universityId === uniFilter
      return matchesStatus && matchesType && matchesUni
    })
  }, [deadlinesWithStatus, statusFilter, typeFilter, uniFilter])

  const overdueDeadlines = useMemo(
    () => deadlinesWithStatus.filter((d) => d.computedStatus === 'overdue'),
    [deadlinesWithStatus]
  )

  // Group by month for list view
  const groupedByMonth = useMemo(() => {
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const groups: Record<string, typeof sorted> = {}
    sorted.forEach((d) => {
      const date = new Date(d.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!groups[key]) groups[key] = []
      groups[key].push(d)
    })
    return groups
  }, [filtered])

  function formatMonthKey(key: string): string {
    const [y, m] = key.split('-')
    const date = new Date(Number(y), Number(m) - 1, 1)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(deadline: Deadline) {
    setEditingId(deadline.id)
    setForm({
      title: deadline.title,
      date: deadline.date,
      time: deadline.time,
      universityId: deadline.universityId,
      universityName: deadline.universityName,
      type: deadline.type,
      priority: deadline.priority,
      notes: deadline.notes,
    })
    setModalOpen(true)
  }

  function handleUniChange(uid: string) {
    const uni = universities.find((u) => u.id === uid)
    setForm({
      ...form,
      universityId: uid,
      universityName: uni?.name || '',
    })
  }

  async function handleSave() {
    if (!form.title.trim() || !form.date) return
    if (editingId) {
      await update(editingId, {
        ...form,
        status: daysUntil(form.date) < 0 ? 'overdue' : 'upcoming',
      })
    } else {
      await create({
        ...form,
        status: daysUntil(form.date) < 0 ? 'overdue' : 'upcoming',
      } as Omit<Deadline, 'id' | 'createdAt' | 'updatedAt'>)
    }
    setModalOpen(false)
  }

  async function toggleComplete(d: Deadline & { computedStatus: string }) {
    const newStatus = d.status === 'completed' ? (daysUntil(d.date) < 0 ? 'overdue' : 'upcoming') : 'completed'
    await update(d.id, { status: newStatus as Deadline['status'] })
  }

  function daysLabel(days: number): string {
    if (days < 0) return `${Math.abs(days)}d overdue`
    if (days === 0) return 'Today'
    if (days === 1) return 'Tomorrow'
    return `${days}d left`
  }

  // Calendar helpers
  const calYear = calendarDate.getFullYear()
  const calMonth = calendarDate.getMonth()
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const monthLabel = calendarDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const deadlinesByDay = useMemo(() => {
    const map: Record<string, typeof filtered> = {}
    filtered.forEach((d) => {
      const date = new Date(d.date)
      if (date.getFullYear() === calYear && date.getMonth() === calMonth) {
        const dayKey = String(date.getDate())
        if (!map[dayKey]) map[dayKey] = []
        map[dayKey].push(d)
      }
    })
    return map
  }, [filtered, calYear, calMonth])

  const selectedDayDeadlines = useMemo(() => {
    if (!selectedDay) return []
    return deadlinesByDay[selectedDay] || []
  }, [selectedDay, deadlinesByDay])

  function prevMonth() {
    setCalendarDate(new Date(calYear, calMonth - 1, 1))
    setSelectedDay(null)
  }
  function nextMonth() {
    setCalendarDate(new Date(calYear, calMonth + 1, 1))
    setSelectedDay(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t.deadlines.title}
        description={t.deadlines.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.deadlines.addDeadline}
          </Button>
        }
      />

      {/* Overdue warning */}
      {overdueDeadlines.length > 0 && statusFilter !== 'completed' && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <div className="flex gap-2.5">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-500" />
            <div>
              <h4 className="text-sm font-semibold text-red-800">
                {overdueDeadlines.length} {t.deadlines.overdue} {overdueDeadlines.length !== 1 ? 'Deadlines' : 'Deadline'}
              </h4>
              <div className="mt-1.5 space-y-1">
                {overdueDeadlines.slice(0, 3).map((d) => (
                  <p key={d.id} className="text-xs text-red-700">
                    {d.title}
                    {d.universityName ? ` — ${d.universityName}` : ''} ({Math.abs(d.daysLeft)}d
                    overdue)
                  </p>
                ))}
                {overdueDeadlines.length > 3 && (
                  <p className="text-xs text-red-600">
                    and {overdueDeadlines.length - 3} more...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {deadlines.length > 0 && (
        <>
          {/* View toggle */}
          <div className="mb-4">
            <Tabs tabs={VIEW_TABS} activeTab={view} onTabChange={setView} />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                    statusFilter === tab.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as DeadlineType | 'all')}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="all">{t.deadlines.allTypes}</option>
                {Object.entries(DEADLINE_TYPES).map(([val, label]) => (
                  <option key={val} value={val}>
                    {t.deadlines.types[val as DeadlineType] || label}
                  </option>
                ))}
              </select>
              {universities.length > 0 && (
                <select
                  value={uniFilter}
                  onChange={(e) => setUniFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="all">{t.deadlines.allUniversities}</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </>
      )}

      {/* Empty state */}
      {deadlines.length === 0 && (
        <EmptyState
          icon={Calendar}
          title={t.deadlines.noDeadlines}
          description={t.deadlines.noDeadlinesDesc}
          actionLabel={t.deadlines.firstDeadline}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {deadlines.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          No deadlines match your current filters.
        </div>
      )}

      {/* List View */}
      {view === 'list' && filtered.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedByMonth).map(([monthKey, items]) => (
            <div key={monthKey}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {formatMonthKey(monthKey)}
              </h3>
              <div className="space-y-2">
                {items.map((d) => (
                  <div
                    key={d.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl border bg-white hover:shadow-sm transition-shadow',
                      d.computedStatus === 'overdue' && d.status !== 'completed'
                        ? 'border-red-200'
                        : 'border-gray-200'
                    )}
                  >
                    {/* Complete toggle */}
                    <button
                      onClick={() => toggleComplete(d)}
                      className={cn(
                        'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        d.status === 'completed'
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-brand-400'
                      )}
                    >
                      {d.status === 'completed' && <CheckCircle2 size={14} />}
                    </button>

                    {/* Priority dot */}
                    <span
                      className={cn('shrink-0 w-2 h-2 rounded-full', PRIORITY_DOTS[d.priority])}
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            d.status === 'completed'
                              ? 'text-gray-400 line-through'
                              : 'text-gray-900'
                          )}
                        >
                          {d.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{formatDate(d.date)}</span>
                        {d.time && (
                          <span className="text-xs text-gray-400">at {d.time}</span>
                        )}
                        {d.universityName && (
                          <>
                            <span className="text-xs text-gray-300">&middot;</span>
                            <span className="text-xs text-gray-500">{d.universityName}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge color="bg-gray-100 text-gray-600">
                        {t.deadlines.types[d.type] || DEADLINE_TYPES[d.type] || d.type}
                      </Badge>
                      {d.status !== 'completed' && (
                        <span
                          className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full',
                            getDeadlineColor(d.daysLeft)
                          )}
                        >
                          {daysLabel(d.daysLeft)}
                        </span>
                      )}
                      {d.status === 'completed' && (
                        <Badge color="bg-green-100 text-green-700">{t.common.done}</Badge>
                      )}
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={() => openEdit(d)}
                      className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && deadlines.length > 0 && (
        <div className="space-y-4">
          <Card>
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-sm font-semibold text-gray-900">{monthLabel}</h3>
              <button
                onClick={nextMonth}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before the 1st */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1 min-h-[3rem]" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayKey = String(day)
                const dayDeadlines = deadlinesByDay[dayKey] || []
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === calMonth &&
                  new Date().getFullYear() === calYear
                const isSelected = selectedDay === dayKey

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(dayKey === selectedDay ? null : dayKey)}
                    className={cn(
                      'p-1 min-h-[3rem] rounded-lg text-left transition-colors relative',
                      isSelected
                        ? 'bg-brand-50 ring-1 ring-brand-300'
                        : 'hover:bg-gray-50',
                      isToday && !isSelected && 'bg-blue-50'
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-medium',
                        isToday ? 'text-brand-600' : 'text-gray-700'
                      )}
                    >
                      {day}
                    </span>
                    {dayDeadlines.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap">
                        {dayDeadlines.slice(0, 3).map((d) => (
                          <span
                            key={d.id}
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              d.status === 'completed'
                                ? 'bg-green-400'
                                : PRIORITY_DOTS[d.priority]
                            )}
                          />
                        ))}
                        {dayDeadlines.length > 3 && (
                          <span className="text-[8px] text-gray-400">
                            +{dayDeadlines.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Selected day deadlines */}
          {selectedDay && (
            <Card className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                {new Date(calYear, calMonth, Number(selectedDay)).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {selectedDayDeadlines.length > 0 ? (
                <div className="space-y-2">
                  {selectedDayDeadlines.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full shrink-0',
                            d.status === 'completed' ? 'bg-green-400' : PRIORITY_DOTS[d.priority]
                          )}
                        />
                        <div>
                          <span
                            className={cn(
                              'text-sm font-medium',
                              d.status === 'completed'
                                ? 'text-gray-400 line-through'
                                : 'text-gray-900'
                            )}
                          >
                            {d.title}
                          </span>
                          {d.universityName && (
                            <p className="text-xs text-gray-500">{d.universityName}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge color={PRIORITY_COLORS[d.priority]}>
                          {t.deadlines.priorities[d.priority]}
                        </Badge>
                        <button
                          onClick={() => toggleComplete(d)}
                          className={cn(
                            'p-1 rounded transition-colors',
                            d.status === 'completed'
                              ? 'text-green-500 hover:text-green-600'
                              : 'text-gray-400 hover:text-green-500'
                          )}
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No deadlines on this day.</p>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Add / Edit Deadline Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? t.deadlines.editDeadline : t.deadlines.addDeadline}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.common.title} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-base"
              placeholder="e.g. MIT Early Action Deadline"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                {t.common.date} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.deadlines.time}</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="input-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.deadlines.university}</label>
            <select
              value={form.universityId}
              onChange={(e) => handleUniChange(e.target.value)}
              className="select-base"
            >
              <option value="">{t.deadlines.noUniversity}</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.type}</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as DeadlineType })}
                className="select-base"
              >
                {Object.entries(DEADLINE_TYPES).map(([val, label]) => (
                  <option key={val} value={val}>
                    {t.deadlines.types[val as DeadlineType] || label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.deadlines.priority}</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as DeadlinePriority })
                }
                className="select-base"
              >
                {DEADLINE_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {t.deadlines.priorities[p]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.notes}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="textarea-base"
              placeholder="Any additional notes or reminders..."
            />
          </div>

          {editingId && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await remove(editingId)
                  setModalOpen(false)
                }}
              >
                {t.deadlines.deleteDeadline}
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  {t.common.cancel}
                </Button>
                <Button onClick={handleSave} disabled={!form.title.trim() || !form.date}>
                  {t.common.save}
                </Button>
              </div>
            </div>
          )}

          {!editingId && (
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button onClick={handleSave} disabled={!form.title.trim() || !form.date}>
                {t.deadlines.addDeadline}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
