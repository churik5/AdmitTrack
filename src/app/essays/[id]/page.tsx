'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  AlertCircle,
  Save,
  Clock,
  History,
  Lightbulb,
  Link2,
  X,
  Check,
  FileText,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useEssays } from '@/lib/hooks/useEssays'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useI18n } from '@/lib/i18n'
import { Essay, EssayType, EssayStatus, EssayVersion } from '@/lib/types'
import {
  cn,
  formatDate,
  wordCount,
  generateId,
  now,
  ESSAY_TYPES,
  statusLabel,
  getStatusColor,
} from '@/lib/utils'

const ESSAY_STATUSES: EssayStatus[] = [
  'brainstorming',
  'outlining',
  'drafting',
  'revising',
  'polishing',
  'final',
]

const ESSAY_TIPS: Record<string, string[]> = {
  personal_statement: [
    'Focus on a specific moment or experience, not your whole life story',
    'Show vulnerability and reflection — what did you learn?',
    'Avoid cliches like "sports taught me teamwork"',
    'Your conclusion should show growth, not just recap events',
  ],
  why_us: [
    'Reference specific programs, professors, or opportunities',
    'Explain why this school is uniquely suited to your goals',
    'Show you have done real research beyond the brochure',
    'Connect your interests to what the school offers',
  ],
  community: [
    'Define your community clearly — it can be anything meaningful to you',
    'Show your active role, not just membership',
    'Explain what you contribute, not just what you get',
  ],
  challenge: [
    'Be honest about the challenge without being dramatic',
    'Focus more on how you responded than the challenge itself',
    'Show concrete growth and what you learned',
  ],
  supplemental: [
    'Answer the question directly — do not repurpose another essay',
    'Be specific to this school or program',
    'Keep it concise and focused',
  ],
  intellectual_interest: [
    'Show genuine passion and curiosity',
    'Go beyond classroom learning — what have you explored on your own?',
    'Connect your interest to your future goals',
  ],
  diversity: [
    'Share your unique perspective authentically',
    'Focus on how your background shapes your worldview',
    'Explain what you would bring to the campus community',
  ],
  activity: [
    'Go deeper than what your activity list already says',
    'Show personal meaning and growth',
    'Explain why this activity matters to you specifically',
  ],
  other: [
    'Answer the prompt directly and specifically',
    'Show your personality and authentic voice',
    'Proofread carefully for grammar and clarity',
  ],
}

interface EditFormData {
  title: string
  type: EssayType
  prompt: string
  wordLimit: number
  status: EssayStatus
}

export default function EssayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const id = params.id as string

  const { getById, update, remove } = useEssays()
  const { items: universities } = useUniversities()

  const [essay, setEssay] = useState<Essay | undefined>(undefined)
  const [content, setContent] = useState('')
  const [improvementNotes, setImprovementNotes] = useState('')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [versionLabel, setVersionLabel] = useState('')
  const [viewingVersion, setViewingVersion] = useState<EssayVersion | null>(null)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<EditFormData>({
    title: '',
    type: 'personal_statement',
    prompt: '',
    wordLimit: 650,
    status: 'brainstorming',
  })

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    async function load() {
      const e = await getById(id)
      setEssay(e)
      if (e) {
        setContent(e.currentContent)
        setImprovementNotes(e.improvementNotes)
        setEditForm({
          title: e.title,
          type: e.type,
          prompt: e.prompt,
          wordLimit: e.wordLimit,
          status: e.status,
        })
      }
    }
    load()
  }, [id, getById])

  const autoSave = useCallback(
    (newContent: string) => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
      setSaveStatus('unsaved')
      autoSaveTimer.current = setTimeout(async () => {
        setSaveStatus('saving')
        await update(id, { currentContent: newContent })
        setSaveStatus('saved')
      }, 1500)
    },
    [id, update]
  )

  function handleContentChange(value: string) {
    setContent(value)
    autoSave(value)
  }

  async function handleSaveVersion() {
    if (!essay) return
    const version: EssayVersion = {
      id: generateId(),
      content,
      wordCount: wordCount(content),
      savedAt: now(),
      label: versionLabel || `Version ${essay.versions.length + 1}`,
    }
    const updatedVersions = [version, ...essay.versions]
    await update(id, { currentContent: content, versions: updatedVersions })
    setEssay({ ...essay, currentContent: content, versions: updatedVersions })
    setVersionLabel('')
  }

  async function handleSaveNotes() {
    if (!essay) return
    await update(id, { improvementNotes })
    setEssay({ ...essay, improvementNotes })
  }

  async function handleStatusChange(status: EssayStatus) {
    if (!essay) return
    await update(id, { status })
    setEssay({ ...essay, status })
  }

  async function handleEditSave() {
    if (!essay || !editForm.title.trim()) return
    await update(id, { ...editForm })
    setEssay({ ...essay, ...editForm })
    setEditModalOpen(false)
  }

  async function handleDelete() {
    await remove(id)
    router.push('/essays')
  }

  async function toggleUniversity(uid: string) {
    if (!essay) return
    const ids = essay.universityIds.includes(uid)
      ? essay.universityIds.filter((u) => u !== uid)
      : [...essay.universityIds, uid]
    await update(id, { universityIds: ids })
    setEssay({ ...essay, universityIds: ids })
  }

  if (!essay) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>{t.essays.essayNotFound}</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/essays')}>
          {t.common.back}
        </Button>
      </div>
    )
  }

  const wc = wordCount(content)
  const overLimit = essay.wordLimit > 0 && wc > essay.wordLimit
  const tips = t.essays.tips[essay.type] || t.essays.tips.other
  const linkedUnis = universities.filter((u) => essay.universityIds.includes(u.id))

  return (
    <div>
      <PageHeader
        title={essay.title}
        backHref="/essays"
        action={
          <div className="flex items-center gap-2">
            <Badge variant={essay.status}>{t.essays.statuses[essay.status]}</Badge>
            <Button
              variant="secondary"
              size="sm"
              icon={<Pencil size={14} />}
              onClick={() => setEditModalOpen(true)}
            >
              {t.essays.editDetails}
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
        {/* Main writing area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Prompt */}
          {essay.prompt && (
            <Card className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">{t.essays.prompt}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{essay.prompt}</p>
            </Card>
          )}

          {/* Writing textarea */}
          <div>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y leading-relaxed"
              placeholder="Start writing your essay here..."
            />

            {/* Word count and save status */}
            <div className="flex items-center justify-between mt-2 px-1">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'text-sm font-medium',
                    overLimit ? 'text-red-600' : 'text-gray-500'
                  )}
                >
                  {wc} {essay.wordLimit > 0 ? `/ ${essay.wordLimit}` : ''} {t.essays.words}
                </span>
                {overLimit && (
                  <span className="text-xs text-red-500">
                    ({wc - essay.wordLimit} {t.essays.overLimit})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {saveStatus === 'saved' && (
                  <>
                    <Check size={12} className="text-green-500" />
                    <span>{t.essays.saved}</span>
                  </>
                )}
                {saveStatus === 'saving' && (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400" />
                    <span>{t.essays.saving}</span>
                  </>
                )}
                {saveStatus === 'unsaved' && (
                  <>
                    <Clock size={12} />
                    <span>{t.essays.unsavedChanges}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Save version */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={versionLabel}
              onChange={(e) => setVersionLabel(e.target.value)}
              className="flex-1 input-base"
              placeholder="Version label (optional)..."
            />
            <Button
              size="sm"
              icon={<Save size={14} />}
              onClick={handleSaveVersion}
              disabled={!content.trim()}
            >
              {t.essays.saveVersion}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Essay details */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">{t.essays.editDetails}</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t.common.type}</span>
                <Badge color="bg-indigo-100 text-indigo-700">
                  {t.essays.types[essay.type] || essay.type}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{t.common.status}</span>
                <select
                  value={essay.status}
                  onChange={(e) => handleStatusChange(e.target.value as EssayStatus)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {ESSAY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t.essays.statuses[s]}
                    </option>
                  ))}
                </select>
              </div>
              {essay.wordLimit > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t.essays.wordLimit}</span>
                  <span className="font-medium text-gray-700">{essay.wordLimit}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Linked Universities */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">{t.essays.linkedUniversities}</h3>
              <button
                onClick={() => setLinkModalOpen(true)}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium"
              >
                + {t.common.link}
              </button>
            </div>
            {linkedUnis.length > 0 ? (
              <div className="space-y-1.5">
                {linkedUnis.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5"
                  >
                    <span>{u.name}</span>
                    <button
                      onClick={() => toggleUniversity(u.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                {t.essays.noLinkedUnis}
              </p>
            )}
          </Card>

          {/* Version history */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <History size={14} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{t.essays.versionHistory}</h3>
            </div>
            {essay.versions.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {essay.versions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setViewingVersion(v)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{v.label}</span>
                      <span className="text-xs text-gray-400">{v.wordCount} {t.essays.words}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(v.savedAt)}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                {t.essays.noVersions}
              </p>
            )}
          </Card>

          {/* Improvement notes */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">{t.essays.improvementNotes}</h3>
            <textarea
              value={improvementNotes}
              onChange={(e) => setImprovementNotes(e.target.value)}
              rows={4}
              className="textarea-base"
              placeholder="Notes for revisions, feedback, things to improve..."
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveNotes}
              className="w-full"
            >
              {t.essays.saveNotes}
            </Button>
          </Card>

          {/* Tips */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-amber-500" />
              <h3 className="font-semibold text-gray-900 text-sm">
                {t.essays.tipsLabel} {t.essays.types[essay.type] || essay.type}
              </h3>
            </div>
            <ul className="text-xs text-gray-600 space-y-1.5">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-brand-600 font-bold shrink-0">&bull;</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* View Version Modal */}
      <Modal
        isOpen={!!viewingVersion}
        onClose={() => setViewingVersion(null)}
        title={viewingVersion?.label || 'Version'}
        size="lg"
      >
        {viewingVersion && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{viewingVersion.wordCount} {t.essays.words}</span>
              <span>&middot;</span>
              <span>{formatDate(viewingVersion.savedAt)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {viewingVersion.content}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setViewingVersion(null)}>
                {t.common.close}
              </Button>
              <Button
                onClick={() => {
                  setContent(viewingVersion.content)
                  autoSave(viewingVersion.content)
                  setViewingVersion(null)
                }}
              >
                {t.essays.restoreVersion}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Link University Modal */}
      <Modal
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        title={t.essays.linkedUniversities}
        size="md"
      >
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {universities.length > 0 ? (
            universities.map((u) => {
              const linked = essay.universityIds.includes(u.id)
              return (
                <button
                  key={u.id}
                  onClick={() => toggleUniversity(u.id)}
                  className={cn(
                    'w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors',
                    linked
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <span className="text-sm text-gray-700">{u.name}</span>
                  {linked && <Check size={16} className="text-brand-600" />}
                </button>
              )
            })
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              {t.essays.noLinkedUnis}
            </p>
          )}
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => setLinkModalOpen(false)}>
            {t.common.done}
          </Button>
        </div>
      </Modal>

      {/* Edit Details Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={t.essays.editEssayDetails}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.common.title} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="input-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.type}</label>
              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value as EssayType })}
                className="select-base"
              >
                {Object.entries(ESSAY_TYPES).map(([val]) => (
                  <option key={val} value={val}>
                    {t.essays.types[val as EssayType] || val}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.status}</label>
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value as EssayStatus })
                }
                className="select-base"
              >
                {ESSAY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {t.essays.statuses[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.essays.prompt}</label>
            <textarea
              value={editForm.prompt}
              onChange={(e) => setEditForm({ ...editForm, prompt: e.target.value })}
              rows={3}
              className="textarea-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.essays.wordLimit}</label>
            <input
              type="number"
              min={0}
              value={editForm.wordLimit || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, wordLimit: Number(e.target.value) || 0 })
              }
              className="input-base"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleEditSave} disabled={!editForm.title.trim()}>
              {t.common.save}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={t.essays.deleteEssay}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          {t.essays.deleteEssayConfirm}
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
