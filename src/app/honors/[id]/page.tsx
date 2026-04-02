'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink,
  Info,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useHonors } from '@/lib/hooks/useHonors'
import { useI18n } from '@/lib/i18n'
import { Honor, HonorLevel } from '@/lib/types'
import { cn, formatDate, HONOR_LEVELS } from '@/lib/utils'

const GRADE_OPTIONS = [9, 10, 11, 12]

const LEVEL_COLORS: Record<string, string> = {
  school: 'bg-gray-100 text-gray-700',
  regional: 'bg-blue-100 text-blue-700',
  state: 'bg-purple-100 text-purple-700',
  national: 'bg-amber-100 text-amber-700',
  international: 'bg-emerald-100 text-emerald-700',
}

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

export default function HonorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const id = params.id as string

  const { getById, update, remove } = useHonors()

  const [honor, setHonor] = useState<Honor | undefined>(undefined)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)

  useEffect(() => {
    async function load() {
      const h = await getById(id)
      setHonor(h)
      if (h) {
        setForm({
          title: h.title,
          level: h.level,
          issuedBy: h.issuedBy,
          date: h.date,
          gradeReceived: h.gradeReceived,
          placement: h.placement,
          description: h.description,
          significance: h.significance,
          link: h.link,
          notes: h.notes,
        })
      }
    }
    load()
  }, [id, getById])

  function toggleGrade(grade: number) {
    setForm((prev) => ({
      ...prev,
      gradeReceived: prev.gradeReceived.includes(grade)
        ? prev.gradeReceived.filter((g) => g !== grade)
        : [...prev.gradeReceived, grade].sort(),
    }))
  }

  async function handleSave() {
    if (!form.title.trim() || !honor) return
    await update(id, { ...form })
    setHonor({ ...honor, ...form })
    setEditModalOpen(false)
  }

  async function handleDelete() {
    await remove(id)
    router.push('/honors')
  }

  if (!honor) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>{t.honors.honorNotFound}</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/honors')}>
          {t.honors.backToHonors}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={honor.title}
        backHref="/honors"
        action={
          <div className="flex items-center gap-2">
            <Badge
              color={LEVEL_COLORS[honor.level] || 'bg-gray-100 text-gray-700'}
              className="text-sm px-3 py-1"
            >
              {HONOR_LEVELS[honor.level] || honor.level}
            </Badge>
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
            <h3 className="font-semibold text-gray-900">{t.honors.honorDetails}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t.honors.level}</span>
                <div className="mt-1">
                  <Badge color={LEVEL_COLORS[honor.level] || 'bg-gray-100 text-gray-700'}>
                    {HONOR_LEVELS[honor.level] || honor.level}
                  </Badge>
                </div>
              </div>
              {honor.issuedBy && (
                <div>
                  <span className="text-gray-500">{t.honors.issuedBy}</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Building2 size={14} className="text-gray-400" />
                    {honor.issuedBy}
                  </p>
                </div>
              )}
              {honor.date && (
                <div>
                  <span className="text-gray-500">{t.honors.dateReceived}</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Calendar size={14} className="text-gray-400" />
                    {formatDate(honor.date)}
                  </p>
                </div>
              )}
              {honor.gradeReceived.length > 0 && (
                <div>
                  <span className="text-gray-500">{t.honors.gradeWhenReceived}</span>
                  <div className="flex gap-1.5 mt-1">
                    {honor.gradeReceived.map((g) => (
                      <Badge key={g} color="bg-gray-100 text-gray-700">{g}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {honor.placement && (
                <div>
                  <span className="text-gray-500">{t.honors.placement}</span>
                  <p className="font-medium text-gray-900 mt-1">{honor.placement}</p>
                </div>
              )}
              {honor.link && (
                <div>
                  <span className="text-gray-500">{t.common.link}</span>
                  <a
                    href={honor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    View <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Description Card */}
          {honor.description && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t.common.description}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{honor.description}</p>
            </Card>
          )}

          {/* Significance Card */}
          {honor.significance && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t.honors.significance}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{honor.significance}</p>
            </Card>
          )}

          {/* Notes Card */}
          {honor.notes && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t.common.notes}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{honor.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* How to assess honor level */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-blue-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{t.honors.howToAssessTitle}</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <Badge color={LEVEL_COLORS.school} className="shrink-0">{t.honors.levels.school}</Badge>
                <p className="text-gray-600">{t.honors.levelDescriptions.school}</p>
              </div>
              <div className="flex gap-2">
                <Badge color={LEVEL_COLORS.regional} className="shrink-0">{t.honors.levels.regional}</Badge>
                <p className="text-gray-600">{t.honors.levelDescriptions.regional}</p>
              </div>
              <div className="flex gap-2">
                <Badge color={LEVEL_COLORS.state} className="shrink-0">{t.honors.levels.state}</Badge>
                <p className="text-gray-600">{t.honors.levelDescriptions.state}</p>
              </div>
              <div className="flex gap-2">
                <Badge color={LEVEL_COLORS.national} className="shrink-0">{t.honors.levels.national}</Badge>
                <p className="text-gray-600">{t.honors.levelDescriptions.national}</p>
              </div>
              <div className="flex gap-2">
                <Badge color={LEVEL_COLORS.international} className="shrink-0">{t.honors.levels.international}</Badge>
                <p className="text-gray-600">{t.honors.levelDescriptions.international}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              {t.honors.levelNote}
            </p>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={t.honors.editHonor}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.honors.honorTitle} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.levelOfRecognition}</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as HonorLevel })}
              className="select-base"
            >
              {Object.entries(HONOR_LEVELS).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.issuedBy}</label>
              <input
                type="text"
                value={form.issuedBy}
                onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.dateReceived}</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.gradeWhenReceived}</label>
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

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.placement}</label>
            <input
              type="text"
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="input-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.description}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="textarea-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.honors.significance}</label>
            <textarea
              value={form.significance}
              onChange={(e) => setForm({ ...form, significance: e.target.value })}
              rows={2}
              className="textarea-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.link}</label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="input-base"
              placeholder="https://..."
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
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              {t.common.save}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={t.honors.deleteHonor}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          {t.common.confirmDelete} <strong>{honor.title}</strong>? {t.honors.deleteConfirm}
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
