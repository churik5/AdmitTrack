'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Activity as ActivityIcon, Plus, Clock, Building2, Users, Info } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useActivities } from '@/lib/hooks/useActivities'
import { useI18n } from '@/lib/i18n'
import { Activity, ActivityCategory } from '@/lib/types'
import { cn, truncate, ACTIVITY_CATEGORIES } from '@/lib/utils'

const GRADE_OPTIONS = [9, 10, 11, 12]

interface FormData {
  name: string
  category: ActivityCategory
  organization: string
  role: string
  startDate: string
  endDate: string
  ongoing: boolean
  grades: number[]
  hoursPerWeek: number
  weeksPerYear: number
  description: string
  results: string
  notes: string
}

const emptyForm: FormData = {
  name: '',
  category: 'other',
  organization: '',
  role: '',
  startDate: '',
  endDate: '',
  ongoing: false,
  grades: [],
  hoursPerWeek: 0,
  weeksPerYear: 0,
  description: '',
  results: '',
  notes: '',
}

export default function ActivitiesPage() {
  const router = useRouter()
  const { items: activities, loading, create, update } = useActivities()
  const { t } = useI18n()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ActivityCategory | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const matchesSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.organization.toLowerCase().includes(search.toLowerCase()) ||
        a.role.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [activities, search, categoryFilter])

  const usedCategories = useMemo(() => {
    const cats = new Set(activities.map((a) => a.category))
    return Object.entries(ACTIVITY_CATEGORIES).filter(([key]) => cats.has(key as ActivityCategory))
  }, [activities])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(activity: Activity) {
    setEditingId(activity.id)
    setForm({
      name: activity.name,
      category: activity.category,
      organization: activity.organization,
      role: activity.role,
      startDate: activity.startDate,
      endDate: activity.endDate,
      ongoing: activity.ongoing,
      grades: activity.grades,
      hoursPerWeek: activity.hoursPerWeek,
      weeksPerYear: activity.weeksPerYear,
      description: activity.description,
      results: activity.results,
      notes: activity.notes,
    })
    setModalOpen(true)
  }

  function toggleGrade(grade: number) {
    setForm((prev) => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter((g) => g !== grade)
        : [...prev.grades, grade].sort(),
    }))
  }

  async function handleSave() {
    if (!form.name.trim()) return
    if (editingId) {
      await update(editingId, { ...form })
    } else {
      await create({
        ...form,
        links: [],
        tags: [],
      } as Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>)
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
        title={t.activities.title}
        description={t.activities.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.activities.addActivity}
          </Button>
        }
      />

      {/* Info box */}
      <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800 flex gap-2.5">
        <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
        <p>
          {t.activities.infoBoxDetail}
        </p>
      </div>

      {/* Filters */}
      {activities.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t.activities.searchPlaceholder}
            className="sm:w-72"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setCategoryFilter('all')}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                categoryFilter === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {t.common.all}
            </button>
            {usedCategories.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategoryFilter(key as ActivityCategory)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  categoryFilter === key
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {activities.length === 0 && (
        <EmptyState
          icon={ActivityIcon}
          title={t.activities.noActivities}
          description={t.activities.noActivitiesDesc}
          actionLabel={t.activities.firstActivity}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {activities.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          {t.activities.noMatchFilter}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((activity) => (
            <Card
              key={activity.id}
              onClick={() => router.push(`/activities/${activity.id}`)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight">{activity.name}</h3>
                <Badge color="bg-indigo-100 text-indigo-700">
                  {ACTIVITY_CATEGORIES[activity.category] || activity.category}
                </Badge>
              </div>

              {activity.organization && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Building2 size={14} />
                  <span>{activity.organization}</span>
                </div>
              )}

              {activity.role && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Users size={14} />
                  <span>{activity.role}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {activity.grades.length > 0 && (
                  <Badge color="bg-gray-100 text-gray-600">
                    {t.activities.grades} {activity.grades.join(', ')}
                  </Badge>
                )}
              </div>

              {(activity.hoursPerWeek > 0 || activity.weeksPerYear > 0) && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>
                    {activity.hoursPerWeek} {t.activities.hrsPerWeek} &times; {activity.weeksPerYear} {t.activities.weeksPerYearLabel}
                  </span>
                </div>
              )}

              {activity.description && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {truncate(activity.description, 120)}
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
        title={editingId ? t.activities.editActivity : t.activities.addActivity}
        size="lg"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.activities.activityName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. Debate Team, Soccer, Part-time Job"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.category}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ActivityCategory })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {Object.entries(ACTIVITY_CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Organization & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.organization}</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="e.g. School, Company, Organization"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.role}</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="e.g. Captain, President, Volunteer"
              />
            </div>
          </div>

          {/* Dates & Ongoing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.startDate}</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.endDate}</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                disabled={form.ongoing}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.ongoing}
                  onChange={(e) => setForm({ ...form, ongoing: e.target.checked, endDate: e.target.checked ? '' : form.endDate })}
                  className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700">{t.activities.ongoing}</span>
              </label>
            </div>
          </div>

          {/* Grades */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.activities.gradesParticipated}
            </label>
            <div className="flex gap-2">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => toggleGrade(grade)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    form.grades.includes(grade)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.hoursPerWeek}</label>
              <input
                type="number"
                min={0}
                value={form.hoursPerWeek || ''}
                onChange={(e) => setForm({ ...form, hoursPerWeek: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="e.g. 10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.weeksPerYear}</label>
              <input
                type="number"
                min={0}
                max={52}
                value={form.weeksPerYear || ''}
                onChange={(e) => setForm({ ...form, weeksPerYear: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="e.g. 40"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.description}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Describe your involvement and contributions..."
            />
            <p className="mt-1 text-xs text-gray-400">
              {t.activities.commonAppAllows} {form.description.length} {t.activities.charCount}.
            </p>
          </div>

          {/* Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.activities.results}</label>
            <textarea
              value={form.results}
              onChange={(e) => setForm({ ...form, results: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Quantifiable outcomes, achievements, or impact..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.notes}</label>
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
              {t.activities.howToWrite}
            </h4>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
              <li>{t.activities.tipActionVerbs}</li>
              <li>{t.activities.tipBeSpecific}</li>
              <li>{t.activities.tipIncludeNumbers}</li>
              <li>{t.activities.tipFocusContribution}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>
              {editingId ? t.activities.saveChanges : t.activities.addActivity}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
