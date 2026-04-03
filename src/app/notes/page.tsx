'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { StickyNote, Plus, Tag } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useNotes } from '@/lib/hooks/useNotes'
import { cn, formatDate, truncate } from '@/lib/utils'
import { ListPageSkeleton } from '@/components/ui/PageSkeletons'

type NoteCategory = 'general' | 'university' | 'essay' | 'strategy' | 'advice' | 'idea' | 'requirement' | 'plan'

const NOTE_CATEGORY_KEYS: NoteCategory[] = ['general', 'university', 'essay', 'strategy', 'advice', 'idea', 'requirement', 'plan']

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

interface FormData {
  title: string
  category: NoteCategory
  tags: string
  content: string
}

const emptyForm: FormData = {
  title: '',
  category: 'general',
  tags: '',
  content: '',
}

export default function NotesPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { items: notes, loading, create } = useNotes()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<NoteCategory | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        !search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [notes, search, categoryFilter])

  const usedCategories = useMemo(() => {
    const set = new Set(notes.map((n) => n.category))
    return NOTE_CATEGORY_KEYS.filter((c) => set.has(c))
  }, [notes])

  function openAdd() {
    setForm(emptyForm)
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.title.trim()) return
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    await create({
      title: form.title,
      content: form.content,
      category: form.category,
      tags,
      linkedEntities: [],
    })
    setModalOpen(false)
  }

  if (loading) {
    return <ListPageSkeleton />
  }

  return (
    <div>
      <PageHeader
        title={t.notes.title}
        description={t.notes.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.notes.addNote}
          </Button>
        }
      />

      {/* Filters */}
      {notes.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={`${t.common.search}...`}
            className="sm:w-72"
          />
          {usedCategories.length > 0 && (
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
              {usedCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                    categoryFilter === c
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {t.notes.categories[c]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {notes.length === 0 && (
        <EmptyState
          icon={StickyNote}
          title={t.notes.noNotes}
          description={t.notes.noNotesDesc}
          actionLabel={t.notes.firstNote}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {notes.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          No notes match your search or filters.
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <Card
              key={note.id}
              onClick={() => router.push(`/notes/${note.id}`)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">
                  {note.title}
                </h3>
              </div>

              <Badge color={CATEGORY_COLORS[note.category]}>
                {t.notes.categories[note.category]}
              </Badge>

              {note.content && (
                <p className="text-sm text-gray-500 line-clamp-3">
                  {truncate(note.content, 120)}
                </p>
              )}

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

              <p className="text-xs text-gray-400">
                Updated {formatDate(note.updatedAt)}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t.notes.addNote}
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
              placeholder="e.g. Research on MIT admissions process"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.category}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as NoteCategory })}
              className="select-base"
            >
              {NOTE_CATEGORY_KEYS.map((val) => (
                <option key={val} value={val}>
                  {t.notes.categories[val]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.common.tags}
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="input-base"
              placeholder="e.g. admissions, research, tips"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.notes.content}</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={5}
              className="textarea-base"
              placeholder="Write your note here..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              {t.notes.addNote}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
