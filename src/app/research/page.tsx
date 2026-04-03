'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FlaskConical, Plus, Info } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useResearch } from '@/lib/hooks/useResearch'
import { Research, ResearchType, ResearchStatus } from '@/lib/types'
import { cn, truncate, getStatusColor, statusLabel } from '@/lib/utils'
import { ListPageSkeleton } from '@/components/ui/PageSkeletons'

const STATUS_KEYS: (ResearchStatus | 'all')[] = ['all', 'idea', 'planning', 'in_progress', 'completed', 'published']

const RESEARCH_TYPE_KEYS: ResearchType[] = ['research_paper', 'article', 'project', 'independent_study', 'competition_work', 'idea']

const TYPE_COLORS: Record<ResearchType, string> = {
  research_paper: 'bg-purple-100 text-purple-700',
  article: 'bg-blue-100 text-blue-700',
  project: 'bg-emerald-100 text-emerald-700',
  independent_study: 'bg-amber-100 text-amber-700',
  competition_work: 'bg-rose-100 text-rose-700',
  idea: 'bg-gray-100 text-gray-700',
}

interface FormData {
  title: string
  type: ResearchType
  status: ResearchStatus
  description: string
  topic: string
  publishedAt: string
  link: string
  ownContribution: string
  skills: string[]
  findings: string
  notes: string
  tags: string[]
}

const emptyForm: FormData = {
  title: '',
  type: 'research_paper',
  status: 'idea',
  description: '',
  topic: '',
  publishedAt: '',
  link: '',
  ownContribution: '',
  skills: [],
  findings: '',
  notes: '',
  tags: [],
}

export default function ResearchPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { items: researchItems, loading, create, update } = useResearch()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ResearchStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ResearchType | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [skillsInput, setSkillsInput] = useState('')

  const filtered = useMemo(() => {
    return researchItems.filter((r) => {
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.topic.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter
      const matchesType = typeFilter === 'all' || r.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
  }, [researchItems, search, statusFilter, typeFilter])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setSkillsInput('')
    setModalOpen(true)
  }

  function openEdit(research: Research) {
    setEditingId(research.id)
    setForm({
      title: research.title,
      type: research.type,
      status: research.status,
      description: research.description,
      topic: research.topic,
      publishedAt: research.publishedAt,
      link: research.link,
      ownContribution: research.ownContribution,
      skills: research.skills,
      findings: research.findings,
      notes: research.notes,
      tags: research.tags,
    })
    setSkillsInput(research.skills.join(', '))
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.title.trim()) return
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (editingId) {
      await update(editingId, { ...form, skills })
    } else {
      await create({
        ...form,
        skills,
      } as Omit<Research, 'id' | 'createdAt' | 'updatedAt'>)
    }
    setModalOpen(false)
  }

  if (loading) {
    return <ListPageSkeleton />
  }

  return (
    <div>
      <PageHeader
        title={t.research.title}
        description={t.research.subtitle}
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            {t.research.addResearch}
          </Button>
        }
      />

      {/* Info box */}
      <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 flex gap-2.5">
        <Info size={18} className="shrink-0 mt-0.5 text-amber-500" />
        <div>
          <p className="font-medium mb-1">{t.research.infoTitle}</p>
          <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
            {t.research.infoTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filters */}
      {researchItems.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={`${t.common.search}...`}
            className="sm:w-72"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {STATUS_KEYS.map((val) => (
              <button
                key={val}
                onClick={() => setStatusFilter(val)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  statusFilter === val
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {val === 'all' ? t.common.all : t.research.statuses[val]}
              </button>
            ))}
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ResearchType | 'all')}
            className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          >
            <option value="all">{t.common.all} {t.common.type}</option>
            {RESEARCH_TYPE_KEYS.map((val) => (
              <option key={val} value={val}>
                {t.research.types[val]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Empty state */}
      {researchItems.length === 0 && (
        <EmptyState
          icon={FlaskConical}
          title={t.research.noResearch}
          description={t.research.noResearchDesc}
          actionLabel={t.research.firstResearch}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {researchItems.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          {t.research.noMatchFilter}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((research) => (
            <Card
              key={research.id}
              onClick={() => router.push(`/research/${research.id}`)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight">{research.title}</h3>
                <Badge color={TYPE_COLORS[research.type] || 'bg-gray-100 text-gray-700'}>
                  {t.research.types[research.type] || research.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Badge color={getStatusColor(research.status)}>
                  {statusLabel(research.status)}
                </Badge>
              </div>

              {research.topic && (
                <p className="text-sm text-gray-500">{research.topic}</p>
              )}

              {research.description && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {truncate(research.description, 120)}
                </p>
              )}

              {research.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {research.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} color="bg-gray-100 text-gray-600">
                      {skill}
                    </Badge>
                  ))}
                  {research.skills.length > 3 && (
                    <Badge color="bg-gray-100 text-gray-600">
                      +{research.skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? `${t.common.edit} ${t.research.title}` : t.research.addResearch}
        size="lg"
      >
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              {t.common.title} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-base"
              placeholder="e.g. Machine Learning in Climate Prediction"
            />
          </div>

          {/* Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.type}</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ResearchType })}
                className="select-base"
              >
                {RESEARCH_TYPE_KEYS.map((val) => (
                  <option key={val} value={val}>
                    {t.research.types[val]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.status}</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ResearchStatus })}
                className="select-base"
              >
                {STATUS_KEYS.filter((v) => v !== 'all').map((val) => (
                  <option key={val} value={val}>
                    {t.research.statuses[val as ResearchStatus]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.research.topic}</label>
            <input
              type="text"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="input-base"
              placeholder="e.g. Computer Science, Environmental Biology, Economics"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.description}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="textarea-base"
              placeholder="Describe your research project, its goals, and methodology..."
            />
          </div>

          {/* Own Contribution */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.research.ownContribution}</label>
            <textarea
              value={form.ownContribution}
              onChange={(e) => setForm({ ...form, ownContribution: e.target.value })}
              rows={2}
              className="textarea-base"
              placeholder="What was your specific role and contribution?"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.research.skills}</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="input-base"
              placeholder="e.g. Python, Data Analysis, Lab Techniques (comma-separated)"
            />
            <p className="mt-1 text-xs text-gray-400">{t.research.separateSkills}</p>
          </div>

          {/* Findings */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.research.findings}</label>
            <textarea
              value={form.findings}
              onChange={(e) => setForm({ ...form, findings: e.target.value })}
              rows={2}
              className="textarea-base"
              placeholder="Key findings, outcomes, or results of your research..."
            />
          </div>

          {/* Published At & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.research.publishedAt}</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.link}</label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="input-base"
                placeholder="https://... (link to paper, project, etc.)"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">{t.common.notes}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="textarea-base"
              placeholder="Any personal notes or reminders..."
            />
          </div>

          {/* Tips */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">
              {t.research.modalTipsTitle}
            </h4>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
              {t.research.modalTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              {editingId ? t.common.save : t.research.addResearch}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
