'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { FolderOpen, Plus, Info, Pencil, Trash2, Upload, Download, File, X, Paperclip } from 'lucide-react'
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

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`
}

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
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number; mimeType: string; data: string } | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const processFile = useCallback((file: globalThis.File) => {
    setFileError(null)
    if (file.size > MAX_FILE_SIZE) {
      setFileError(t.documents.fileTooLarge)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      setSelectedFile({
        name: file.name,
        size: file.size,
        mimeType: file.type || 'application/octet-stream',
        data: base64,
      })
      // Auto-fill document name if empty
      if (!form.name.trim()) {
        setForm(prev => ({ ...prev, name: file.name.replace(/\.[^/.]+$/, '') }))
      }
    }
    reader.readAsDataURL(file)
  }, [form.name, t.documents.fileTooLarge])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  function downloadFile(doc: typeof documents[0]) {
    if (!doc.fileData) return
    const link = document.createElement('a')
    link.href = `data:${doc.mimeType};base64,${doc.fileData}`
    link.download = doc.fileName || doc.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setSelectedFile(null)
    setFileError(null)
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
    setSelectedFile(doc.fileData ? { name: doc.fileName, size: doc.fileSize, mimeType: doc.mimeType, data: doc.fileData } : null)
    setFileError(null)
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.name.trim()) return
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const fileFields = selectedFile
      ? {
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          mimeType: selectedFile.mimeType,
          fileData: selectedFile.data,
        }
      : {
          fileName: '',
          fileSize: 0,
          mimeType: '',
          fileData: undefined,
        }

    if (editingId) {
      await update(editingId, {
        name: form.name,
        category: form.category,
        comment: form.comment,
        tags,
        relatedTo: form.relatedTo,
        ...fileFields,
      })
    } else {
      await create({
        name: form.name,
        category: form.category,
        dateUploaded: new Date().toISOString(),
        tags,
        relatedTo: form.relatedTo,
        comment: form.comment,
        ...fileFields,
      })
    }
    setModalOpen(false)
    setEditingId(null)
    setSelectedFile(null)
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
            <h4 className="text-sm font-semibold text-amber-800 mb-1.5">{t.documents.tipsTitle}</h4>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
              {t.documents.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
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
                {t.common.all} ({documents.length})
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
          {t.documents.noMatchFilter}
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

                {/* File indicator */}
                {doc.fileName && doc.fileData && (
                  <div className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 min-w-0">
                      <Paperclip size={14} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{doc.fileName}</span>
                      {doc.fileSize > 0 && (
                        <span className="text-xs text-gray-400 shrink-0">({formatFileSize(doc.fileSize)})</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); downloadFile(doc) }}
                      className="p-1 text-brand-600 hover:text-brand-700 transition-colors shrink-0"
                      title={t.documents.download}
                    >
                      <Download size={14} />
                    </button>
                  </div>
                )}

                {doc.comment && (
                  <p className="text-sm text-gray-600 line-clamp-2">{doc.comment}</p>
                )}

                {uniName && (
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {t.documents.linkedTo} {uniName}
                  </p>
                )}

                <p className="text-xs text-gray-400">
                  {t.documents.added} {formatDate(doc.dateUploaded || doc.createdAt)}
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
          {/* File Upload Zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.documents.uploadFile}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <File size={18} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title={t.documents.removeFile}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                  isDragging
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
                )}
              >
                <Upload size={24} className={isDragging ? 'text-brand-500' : 'text-gray-400'} />
                <p className="text-sm text-gray-500">{t.documents.dragOrClick}</p>
                <p className="text-xs text-gray-400">{t.documents.maxFileSize}</p>
              </div>
            )}
            {fileError && (
              <p className="text-xs text-red-500 mt-1">{fileError}</p>
            )}
          </div>

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
              <option value="">{t.documents.none}</option>
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
