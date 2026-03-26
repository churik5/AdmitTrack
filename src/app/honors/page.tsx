'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Award, Plus, Building2, Calendar, Info } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useHonors } from '@/lib/hooks/useHonors'
import { Honor, HonorLevel } from '@/lib/types'
import { cn, truncate, formatDate, HONOR_LEVELS } from '@/lib/utils'

const GRADE_OPTIONS = [9, 10, 11, 12]

const LEVEL_COLORS: Record<string, string> = {
  school: 'bg-gray-100 text-gray-700',
  regional: 'bg-blue-100 text-blue-700',
  state: 'bg-purple-100 text-purple-700',
  national: 'bg-amber-100 text-amber-700',
  international: 'bg-emerald-100 text-emerald-700',
}

const LEVEL_FILTER_OPTIONS: { value: HonorLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'school', label: 'School' },
  { value: 'regional', label: 'Regional' },
  { value: 'state', label: 'State' },
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
]

interface FormData {
  title: string
  level: HonorLevel
  issuedBy: string
  date: string
  gradeReceived: number[]
  placement: string
  description: string
  significance: string
  link: string
  notes: string
}

const emptyForm: FormData = {
  title: '',
  level: 'school',
  issuedBy: '',
  date: '',
  gradeReceived: [],
  placement: '',
  description: '',
  significance: '',
  link: '',
  notes: '',
}

export default function HonorsPage() {
  const router = useRouter()
  const { items: honors, loading, create, update } = useHonors()

  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<HonorLevel | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return honors.filter((h) => {
      const matchesSearch =
        !search ||
        h.title.toLowerCase().includes(search.toLowerCase()) ||
        h.issuedBy.toLowerCase().includes(search.toLowerCase())
      const matchesLevel = levelFilter === 'all' || h.level === levelFilter
      return matchesSearch && matchesLevel
    })
  }, [honors, search, levelFilter])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(honor: Honor) {
    setEditingId(honor.id)
    setForm({
      title: honor.title,
      level: honor.level,
      issuedBy: honor.issuedBy,
      date: honor.date,
      gradeReceived: honor.gradeReceived,
      placement: honor.placement,
      description: honor.description,
      significance: honor.significance,
      link: honor.link,
      notes: honor.notes,
    })
    setModalOpen(true)
  }

  function toggleGrade(grade: number) {
    setForm((prev) => ({
      ...prev,
      gradeReceived: prev.gradeReceived.includes(grade)
        ? prev.gradeReceived.filter((g) => g !== grade)
        : [...prev.gradeReceived, grade].sort(),
    }))
  }

  async function handleSave() {
    if (!form.title.trim()) return
    if (editingId) {
      await update(editingId, { ...form })
    } else {
      await create({
        ...form,
        tags: [],
      } as Omit<Honor, 'id' | 'createdAt' | 'updatedAt'>)
    }
    setModalOpen(false)
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
        title="Honors & Awards"
        description="Recognition, awards, and achievements"
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            Add Honor
          </Button>
        }
      />

      {/* Info box */}
      <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800 flex gap-2.5">
        <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
        <p>
          An honor is a result, recognition, or award &mdash; something you received, won, or were selected for.
          It&rsquo;s different from an activity, which is something you did.
        </p>
      </div>

      {/* Filters */}
      {honors.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search honors..."
            className="sm:w-72"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {LEVEL_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLevelFilter(opt.value)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  levelFilter === opt.value
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {honors.length === 0 && (
        <EmptyState
          icon={Award}
          title="No honors yet"
          description="Start tracking your honors, awards, and achievements. Add anything you've been recognized for."
          actionLabel="Add Your First Honor"
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {honors.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          No honors match your search or filter.
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((honor) => (
            <Card
              key={honor.id}
              onClick={() => router.push(`/honors/${honor.id}`)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight">{honor.title}</h3>
                <Badge color={LEVEL_COLORS[honor.level] || 'bg-gray-100 text-gray-700'}>
                  {HONOR_LEVELS[honor.level] || honor.level}
                </Badge>
              </div>

              {honor.issuedBy && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Building2 size={14} />
                  <span>{honor.issuedBy}</span>
                </div>
              )}

              {honor.date && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{formatDate(honor.date)}</span>
                </div>
              )}

              {honor.gradeReceived.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  <Badge color="bg-gray-100 text-gray-600">
                    Grade{honor.gradeReceived.length > 1 ? 's' : ''} {honor.gradeReceived.join(', ')}
                  </Badge>
                </div>
              )}

              {honor.description && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {truncate(honor.description, 120)}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Honor' : 'Add Honor'}
        size="lg"
      >
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Honor / Award Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. National Merit Semifinalist, Science Fair 1st Place"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level of Recognition</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as HonorLevel })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {Object.entries(HONOR_LEVELS).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Issued By & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
              <input
                type="text"
                value={form.issuedBy}
                onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="e.g. College Board, Science Olympiad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Grade Received */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade(s) When Received
            </label>
            <div className="flex gap-2">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => toggleGrade(grade)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    form.gradeReceived.includes(grade)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Placement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placement / Rank</label>
            <input
              type="text"
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. 1st Place, Top 5%, Semifinalist"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Brief description of the honor or award..."
            />
          </div>

          {/* Significance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Significance</label>
            <textarea
              value={form.significance}
              onChange={(e) => setForm({ ...form, significance: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Why is this honor important? How selective is it?"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://... (link to award page, certificate, etc.)"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Any personal notes or reminders..."
            />
          </div>

          {/* Tips */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">
              What counts as an honor?
            </h4>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
              <li>Academic awards (Honor Roll, AP Scholar, National Merit)</li>
              <li>Competition placements (Science Olympiad, Math League, Debate)</li>
              <li>Scholarships and fellowships</li>
              <li>Selection to special programs (Governor&apos;s School, summer programs)</li>
              <li>Published work or recognized research</li>
              <li>Athletic recognitions (All-State, MVP, team captain awards)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              {editingId ? 'Save Changes' : 'Add Honor'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
