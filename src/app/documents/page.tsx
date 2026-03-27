'use client'

import { useState, useMemo } from 'react'
import { FolderOpen, Plus, Info, Pencil, Trash2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useDocuments } from '@/lib/hooks/useDocuments'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { DocumentCategory } from '@/lib/types'
import { cn, formatDate, DOCUMENT_CATEGORIES } from '@/lib/utils'

interface FormData {
  name: string
  category: DocumentCategory
  comment: string
  tags: string
  relatedTo: string
}

const emptyForm: FormData = {
  name: '',
  category: 'other',
  comment: '',
  tags: '',
  relatedTo: '',
}

const ALL_CATEGORIES: DocumentCategory[] = [
  'transcript',
  'certificate',
  'award',
  'recommendation',
  'essay',
  'resume',
  'project',
  'research',
  'test_score',
  'financial',
  'other',
]

const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  transcript: 'bg-blue-100 text-blue-700',
  certificate: 'bg-emerald-100 text-emerald-700',
  award: 'bg-amber-100 text-amber-700',
  recommendation: 'bg-purple-100 text-purple-700',
  essay: 'bg-indigo-100 text-indigo-700',
  resume: 'bg-cyan-100 text-cyan-700',
  project: 'bg-rose-100 text-rose-700',
  research: 'bg-teal-100 text-teal-700',
  test_score: 'bg-orange-100 text-orange-700',
  financial: 'bg-lime-100 text-lime-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function DocumentsPage() {
  const { t } = useI18n()
  const { items: documents, loading, create, update, remove } = useDocuments()
  const { items: universities } = useUniversities()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchesSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.comment.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [documents, search, categoryFilter])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    documents.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1
    })
    return counts
  }, [documents])

  const usedCategories = useMemo(() => {
    return ALL_CATEGORIES.filter((c) => categoryCounts[c])
  }, [categoryCounts])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(id: string) {
    const doc = documents.find((d) => d.id === id)
    if (!doc) return
    setEditingId(id)
    setForm({
      name: doc.name,
      category: doc.category,
      comment: doc.comment,
      tags: doc.tags.join(', '),
      relatedTo: doc.relatedTo,
    })
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.name.trim()) return
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingId) {
      await update(editingId, {
        name: form.name,
        category: form.category,
        comment: form.comment,
        tags,
        relatedTo: form.relatedTo,
      })
    } else {
      await create({
        name: form.name,
        category: form.category,
        fileName: '',
        fileSize: 0,
        mimeType: '',
        dateUploaded: new Date().toISOString(),
        tags,
        relatedTo: form.relatedTo,
        comment: form.comment,
      })
    }
    setModalOpen(false)
    setEditingId(null)
  }

  async function handleDelete(id: string) {
    await remove(id)
    setDeleteConfirmId(null)
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
        title={t.documents.title}
        description={t.documents.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.documents.addDocument}
          </Button>
        }
      />

      {/* Tips panel */}
      <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
        <div className="flex gap-2.5">
          <Info size={18} className="shrink-0 mt-0.5 text-amber-500" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800 mb-1.5">Document Tracking</h4>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
              <li>File references are stored as metadata. Keep your actual files organized in a folder on your computer.</li>
              <li>Use categories and tags to keep documents easy to find when filling out applications</li>
              <li>Link documents to specific universities using the &ldquo;Related To&rdquo; field</li>
              <li>Keep track of transcripts, recommendation letters, test scores, and other key documents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filters */}
      {documents.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={`${t.common.search}...`}
              className="sm:w-72"
            />
          </div>
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
                All ({documents.length})
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
                  {t.documents.categories[c]} ({categoryCounts[c]})
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {documents.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title={t.documents.noDocuments}
          description={t.documents.noDocumentsDesc}
          actionLabel={t.documents.firstDocument}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {documents.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          No documents match your search or filters.
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => {
            const uniName = doc.relatedTo
              ? universities.find((u) => u.id === doc.relatedTo)?.name
              : null
            return (
              <Card key={doc.id} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(doc.id)}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit document"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(doc.id)}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge color={CATEGORY_COLORS[doc.category]}>
                    {t.documents.categories[doc.category] || doc.category}
                  </Badge>
                  {doc.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} color="bg-gray-100 text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                  {doc.tags.length > 2 && (
                    <Badge color="bg-gray-100 text-gray-500">
                      +{doc.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {doc.comment && (
                  <p className="text-sm text-gray-600 line-clamp-2">{doc.comment}</p>
                )}

                {uniName && (
                  <p className="text-xs text-gray-400 line-clamp-1">
                    Linked to {uniName}
                  </p>
                )}

                <p className="text-xs text-gray-400">
                  Added {formatDate(doc.dateUploaded || doc.createdAt)}
                </p>
              </Card>
            )
          })}
        </div>
      )}

      {/* Add / Edit Document Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingId(null)
        }}
        title={editingId ? `${t.common.edit} ${t.documents.title}` : t.documents.addDocument}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.documents.fileName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder='e.g. "Official Transcript", "SAT Score Report"'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.category}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as DocumentCategory })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {t.documents.categories[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.documents.relatedTo}
            </label>
            <select
              value={form.relatedTo}
              onChange={(e) => setForm({ ...form, relatedTo: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              <option value="">None</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.documents.comment}</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Any notes about this document..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.tags}</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Comma-separated, e.g. official, sent, pending"
            />
            <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false)
                setEditingId(null)
              }}
            >
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>
              {editingId ? t.common.save : t.documents.addDocument}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title={`${t.common.delete} ${t.documents.title}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {t.common.confirmDelete}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
              {t.common.cancel}
            </Button>
            <Button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {t.common.delete}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
