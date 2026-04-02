'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  AlertCircle,
  Clock,
  Building2,
  Users,
  Calendar,
  Lightbulb,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useActivities } from '@/lib/hooks/useActivities'
import { useI18n } from '@/lib/i18n'
import { Activity, ActivityCategory } from '@/lib/types'
import { cn, formatDate, ACTIVITY_CATEGORIES } from '@/lib/utils'

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

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { t } = useI18n()

  const { getById, update, remove } = useActivities()

  const [activity, setActivity] = useState<Activity | undefined>(undefined)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)

  useEffect(() => {
    async function load() {
      const a = await getById(id)
      setActivity(a)
      if (a) {
        setForm({
          name: a.name,
          category: a.category,
          organization: a.organization,
          role: a.role,
          startDate: a.startDate,
          endDate: a.endDate,
          ongoing: a.ongoing,
          grades: a.grades,
          hoursPerWeek: a.hoursPerWeek,
          weeksPerYear: a.weeksPerYear,
          description: a.description,
          results: a.results,
          notes: a.notes,
        })
      }
    }
    load()
  }, [id, getById])

  function toggleGrade(grade: number) {
    setForm((prev) => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter((g) => g !== grade)
        : [...prev.grades, grade].sort(),
    }))
  }

  async function handleSave() {
    if (!form.name.trim() || !activity) return
    await update(id, { ...form })
    setActivity({ ...activity, ...form })
    setEditModalOpen(false)
  }

  async function handleDelete() {
    await remove(id)
    router.push('/activities')
  }

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>{t.activities.notFound}</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/activities')}>
          {t.activities.backToActivities}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={activity.name}
        backHref="/activities"
        description={ACTIVITY_CATEGORIES[activity.category] || activity.category}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Pencil size={14} />}
              onClick={() => setEditModalOpen(true)}
            >
              {t.common.edit}
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 size={14} />}
              onClick={() => setConfirmDelete(true)}
            >
              {t.common.delete}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <Card className="space-y-4">
            <h3 className="font-semibold text-gray-900">{t.activities.activityDetails}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t.common.category}</span>
                <div className="mt-1">
                  <Badge color="bg-indigo-100 text-indigo-700">
                    {ACTIVITY_CATEGORIES[activity.category] || activity.category}
                  </Badge>
                </div>
              </div>
              {activity.organization && (
                <div>
                  <span className="text-gray-500">{t.activities.organization}</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Building2 size={14} className="text-gray-400" />
                    {activity.organization}
                  </p>
                </div>
              )}
              {activity.role && (
                <div>
                  <span className="text-gray-500">{t.activities.role}</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Users size={14} className="text-gray-400" />
                    {activity.role}
                  </p>
                </div>
              )}
              <div>
                <span className="text-gray-500">{t.activities.duration}</span>
                <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                  <Calendar size={14} className="text-gray-400" />
                  {activity.startDate ? formatDate(activity.startDate) : t.activities.notSet}
                  {' — '}
                  {activity.ongoing ? t.activities.present : activity.endDate ? formatDate(activity.endDate) : t.activities.notSet}
                </p>
              </div>
              {activity.grades.length > 0 && (
                <div>
                  <span className="text-gray-500">{t.activities.grades}</span>
                  <div className="flex gap-1.5 mt-1">
                    {activity.grades.map((g) => (
                      <Badge key={g} color="bg-gray-100 text-gray-700">{g}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="text-gray-500">{t.activities.timeCommitment}</span>
                <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                  <Clock size={14} className="text-gray-400" />
                  {activity.hoursPerWeek} {t.activities.hrsPerWeek} &times; {activity.weeksPerYear} {t.activities.weeksPerYearLabel}
                </p>
              </div>
            </div>
          </Card>

          {/* Description Card */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900">{t.common.description}</h3>
            {activity.description ? (
              <div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{activity.description}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {activity.description.length} {t.activities.charCount}
                  {activity.description.length > 150 && (
                    <span className="text-amber-500 ml-1">
                      {t.activities.commonAppLimit}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">{t.activities.noDescription}</p>
            )}
          </Card>

          {/* Results Card */}
          {activity.results && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t.activities.results}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{activity.results}</p>
            </Card>
          )}

          {/* Notes Card */}
          {activity.notes && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t.common.notes}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{activity.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Description Template */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{t.activities.descriptionTemplate}</h3>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-xs text-gray-600 font-mono">
              {t.activities.templateFormat}
            </div>
            <p className="text-xs text-gray-500">
              Example: &ldquo;Led weekly meetings of 30+ members, organized 5 community service events, and raised $3,000 for local charities.&rdquo;
            </p>
          </Card>

          {/* Writing Tips */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">{t.activities.writingTipsTitle}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-green-700 mb-1">{t.activities.strongDescription}</p>
                <p className="text-xs text-gray-600 bg-green-50 rounded-lg px-3 py-2">
                  &ldquo;Founded coding club; taught 25 students Python weekly; 8 students placed in state hackathon&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-red-700 mb-1">{t.activities.weakDescription}</p>
                <p className="text-xs text-gray-600 bg-red-50 rounded-lg px-3 py-2">
                  &ldquo;Member of coding club at school. We meet every week and do coding stuff.&rdquo;
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-1.5 mt-2">
              {t.activities.writingTipsList.map((tip, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-brand-600 font-bold">&bull;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={t.activities.editActivity}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.activities.activityName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.category}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ActivityCategory })}
              className="select-base"
            >
              {Object.entries(ACTIVITY_CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.organization}</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.role}</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="input-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.startDate}</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.endDate}</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                disabled={form.ongoing}
                className="input-base disabled:opacity-50 disabled:bg-gray-50"
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

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.gradesParticipated}</label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.hoursPerWeek}</label>
              <input
                type="number"
                min={0}
                value={form.hoursPerWeek || ''}
                onChange={(e) => setForm({ ...form, hoursPerWeek: Number(e.target.value) || 0 })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.weeksPerYear}</label>
              <input
                type="number"
                min={0}
                max={52}
                value={form.weeksPerYear || ''}
                onChange={(e) => setForm({ ...form, weeksPerYear: Number(e.target.value) || 0 })}
                className="input-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.description}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="textarea-base"
            />
            <p className="mt-1 text-xs text-gray-400">
              {t.activities.commonAppAllows} {form.description.length} {t.activities.charCount}.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.activities.results}</label>
            <textarea
              value={form.results}
              onChange={(e) => setForm({ ...form, results: e.target.value })}
              rows={2}
              className="textarea-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.notes}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="textarea-base"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>
              {t.activities.saveChanges}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={t.activities.deleteActivity}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          {t.activities.confirmDeleteActivity} <strong>{activity.name}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            {t.common.cancel}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t.common.delete}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
