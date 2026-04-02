'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Plus, Info } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useEssays } from '@/lib/hooks/useEssays'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useI18n } from '@/lib/i18n'
import { EssayType, EssayStatus } from '@/lib/types'
import { cn, formatDate, wordCount, ESSAY_TYPES, statusLabel, getStatusColor } from '@/lib/utils'

interface FormData {
  title: string
  type: EssayType
  prompt: string
  wordLimit: number
  status: EssayStatus
}

const emptyForm: FormData = {
  title: '',
  type: 'personal_statement',
  prompt: '',
  wordLimit: 650,
  status: 'brainstorming',
}

const ESSAY_STATUSES: EssayStatus[] = [
  'brainstorming',
  'outlining',
  'drafting',
  'revising',
  'polishing',
  'final',
]

export default function EssaysPage() {
  const router = useRouter()
  const { t } = useI18n()
  const { items: essays, loading, create } = useEssays()
  const { items: universities } = useUniversities()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<EssayStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<EssayType | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return essays.filter((e) => {
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.prompt.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || e.status === statusFilter
      const matchesType = typeFilter === 'all' || e.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
  }, [essays, search, statusFilter, typeFilter])

  const usedStatuses = useMemo(() => {
    const set = new Set(essays.map((e) => e.status))
    return ESSAY_STATUSES.filter((s) => set.has(s))
  }, [essays])

  const usedTypes = useMemo(() => {
    const set = new Set(essays.map((e) => e.type))
    return Object.entries(ESSAY_TYPES).filter(([key]) => set.has(key as EssayType))
  }, [essays])

  function getUniversityNames(ids: string[]): string[] {
    return ids
      .map((uid) => universities.find((u) => u.id === uid)?.name)
      .filter(Boolean) as string[]
  }

  function openAdd() {
    setForm(emptyForm)
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.title.trim()) return
    await create({
      title: form.title,
      type: form.type,
      prompt: form.prompt,
      wordLimit: form.wordLimit,
      status: form.status,
      currentContent: '',
      versions: [],
      universityIds: [],
      improvementNotes: '',
      tags: [],
    })
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
        title={t.essays.title}
        description={t.essays.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.essays.newEssay}
          </Button>
        }
      />

      {/* Tips panel */}
      <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
        <div className="flex gap-2.5">
          <Info size={18} className="shrink-0 mt-0.5 text-blue-500" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-1.5">{t.essays.guidanceTitle}</h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              {t.essays.guidanceTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Filters */}
      {essays.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={`${t.common.search}...`}
              className="sm:w-72"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EssayType | 'all')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="all">{t.common.all} {t.common.type}</option>
              {Object.entries(ESSAY_TYPES).map(([val]) => (
                <option key={val} value={val}>
                  {t.essays.types[val as EssayType] || val}
                </option>
              ))}
            </select>
          </div>
          {usedStatuses.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setStatusFilter('all')}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  statusFilter === 'all'
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {t.common.all}
              </button>
              {usedStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                    statusFilter === s
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {t.essays.statuses[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {essays.length === 0 && (
        <EmptyState
          icon={FileText}
          title={t.essays.noEssays}
          description={t.essays.noEssaysDesc}
          actionLabel={t.essays.firstEssay}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {essays.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          {t.common.noResults}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((essay) => {
            const wc = wordCount(essay.currentContent)
            const uniNames = getUniversityNames(essay.universityIds)
            return (
              <Card
                key={essay.id}
                onClick={() => router.push(`/essays/${essay.id}`)}
                className="flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">
                    {essay.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge color="bg-indigo-100 text-indigo-700">
                    {t.essays.types[essay.type] || essay.type}
                  </Badge>
                  <Badge variant={essay.status}>{t.essays.statuses[essay.status]}</Badge>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FileText size={14} />
                  <span className={cn(essay.wordLimit > 0 && wc > essay.wordLimit && 'text-red-600 font-medium')}>
                    {wc} {essay.wordLimit > 0 ? `/ ${essay.wordLimit}` : ''} {t.essays.words}
                  </span>
                </div>

                {uniNames.length > 0 && (
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {uniNames.join(', ')}
                  </p>
                )}

                <p className="text-xs text-gray-400">
                  {t.essays.updatedAt} {formatDate(essay.updatedAt)}
                </p>
              </Card>
            )
          })}
        </div>
      )}

      {/* Add Essay Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t.essays.newEssay}
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
              placeholder='e.g. "Common App Personal Statement", "MIT Why Us"'
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.type}</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as EssayType })}
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
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as EssayStatus })}
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
              value={form.prompt}
              onChange={(e) => setForm({ ...form, prompt: e.target.value })}
              rows={3}
              className="textarea-base"
              placeholder="Paste the essay prompt here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.essays.wordLimit}</label>
            <input
              type="number"
              min={0}
              value={form.wordLimit || ''}
              onChange={(e) => setForm({ ...form, wordLimit: Number(e.target.value) || 0 })}
              className="input-base"
              placeholder="e.g. 650"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              {t.essays.newEssay}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
