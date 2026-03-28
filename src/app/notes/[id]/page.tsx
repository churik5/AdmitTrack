'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  AlertCircle,
  Save,
  Clock,
  Check,
  Tag,
  Link2,
  X,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useNotes } from '@/lib/hooks/useNotes'
import { cn, formatDate } from '@/lib/utils'

type NoteCategory = 'general' | 'university' | 'essay' | 'strategy' | 'advice' | 'idea' | 'requirement' | 'plan'

const NOTE_CATEGORIES: Record<NoteCategory, string> = {
  general: 'General',
  university: 'University',
  essay: 'Essay',
  strategy: 'Strategy',
  advice: 'Advice',
  idea: 'Idea',
  requirement: 'Requirement',
  plan: 'Plan',
}

const CATEGORY_COLORS: Record<NoteCategory, string> = {
  general: 'bg-gray-100 text-gray-700',
  university: 'bg-blue-100 text-blue-700',
  essay: 'bg-green-100 text-green-700',
  strategy: 'bg-purple-100 text-purple-700',
  advice: 'bg-amber-100 text-amber-700',
  idea: 'bg-pink-100 text-pink-700',
  requirement: 'bg-red-100 text-red-700',
  plan: 'bg-teal-100 text-teal-700',
}

interface LinkedEntity {
  type: string
  id: string
  name: string
}

export default function NoteDetailPage() {
  const { t } = useI18n()
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { getById, update, remove } = useNotes()

  const [note, setNote] = useState<Awaited<ReturnType<typeof getById>>>(undefined)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<NoteCategory>('general')
  const [tagsInput, setTagsInput] = useState('')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    async function load() {
      const n = await getById(id)
      setNote(n)
      if (n) {
        setTitle(n.title)
        setContent(n.content)
        setCategory(n.category)
        setTagsInput(n.tags.join(', '))
      }
    }
    load()
  }, [id, getById])

  const autoSave = useCallback(
    (updates: Record<string, unknown>) => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
      setSaveStatus('unsaved')
      autoSaveTimer.current = setTimeout(async () => {
        setSaveStatus('saving')
        await update(id, updates)
        setSaveStatus('saved')
      }, 1500)
    },
    [id, update]
  )

  function handleContentChange(value: string) {
    setContent(value)
    autoSave({ content: value })
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    autoSave({ title: value })
  }

  async function handleCategoryChange(value: NoteCategory) {
    setCategory(value)
    await update(id, { category: value })
    setNote((prev) => (prev ? { ...prev, category: value } : prev))
    setSaveStatus('saved')
  }

  async function handleTagsSave() {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    await update(id, { tags })
    setNote((prev) => (prev ? { ...prev, tags } : prev))
    setSaveStatus('saved')
  }

  async function handleManualSave() {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    await update(id, { title, content, category, tags })
    setNote((prev) =>
      prev ? { ...prev, title, content, category, tags } : prev
    )
    setSaveStatus('saved')
  }

  async function handleDelete() {
    await remove(id)
    router.push('/notes')
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>Note not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/notes')}>
          {t.common.back}
        </Button>
      </div>
    )
  }

  const linkedEntities: LinkedEntity[] = note.linkedEntities || []

  return (
    <div>
      <PageHeader
        title={title || 'Untitled Note'}
        backHref="/notes"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {saveStatus === 'saved' && (
                <>
                  <Check size={12} className="text-green-500" />
                  <span>Saved</span>
                </>
              )}
              {saveStatus === 'saving' && (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400" />
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === 'unsaved' && (
                <>
                  <Clock size={12} />
                  <span>Unsaved</span>
                </>
              )}
            </div>
            <Button
              size="sm"
              icon={<Save size={14} />}
              onClick={handleManualSave}
            >
              {t.common.save}
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
        {/* Main editing area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.title}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Note title..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.notes.content}</label>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y leading-relaxed"
              placeholder="Write your note here..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Note details */}
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Note Details</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{t.common.category}</span>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as NoteCategory)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {Object.entries(NOTE_CATEGORIES).map(([val]) => (
                    <option key={val} value={val}>
                      {t.notes.categories[val as NoteCategory]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-700 text-xs">{formatDate(note.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Updated</span>
                <span className="text-gray-700 text-xs">{formatDate(note.updatedAt)}</span>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{t.common.tags}</h3>
            </div>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onBlur={handleTagsSave}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Comma-separated tags..."
            />
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-0.5 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Linked Entities */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Link2 size={14} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900 text-sm">Linked Items</h3>
            </div>
            {linkedEntities.length > 0 ? (
              <div className="space-y-1.5">
                {linkedEntities.map((entity) => (
                  <div
                    key={`${entity.type}-${entity.id}`}
                    className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        color="bg-indigo-100 text-indigo-700"
                        className="text-[10px]"
                      >
                        {entity.type}
                      </Badge>
                      <span className="text-xs">{entity.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No linked items yet. Links are created from other sections.
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={`${t.common.delete} ${t.notes.title}`}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          {t.common.confirmDelete} <strong>{note.title}</strong>
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
