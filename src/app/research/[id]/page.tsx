'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Info,
  Tag,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useResearch } from '@/lib/hooks/useResearch'
import { Research, ResearchType, ResearchStatus } from '@/lib/types'
import { cn, formatDate, getStatusColor, statusLabel } from '@/lib/utils'

const RESEARCH_TYPES: Record<ResearchType, string> = {
  research_paper: 'Research Paper',
  article: 'Article',
  project: 'Project',
  independent_study: 'Independent Study',
  competition_work: 'Competition Work',
  idea: 'Idea / Concept',
}

const TYPE_COLORS: Record<ResearchType, string> = {
  research_paper: 'bg-purple-100 text-purple-700',
  article: 'bg-blue-100 text-blue-700',
  project: 'bg-emerald-100 text-emerald-700',
  independent_study: 'bg-amber-100 text-amber-700',
  competition_work: 'bg-rose-100 text-rose-700',
  idea: 'bg-gray-100 text-gray-700',
}

const STATUS_OPTIONS: { value: ResearchStatus; label: string }[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'published', label: 'Published' },
]

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

export default function ResearchDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { getById, update, remove } = useResearch()

  const [research, setResearch] = useState<Research | undefined>(undefined)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [skillsInput, setSkillsInput] = useState('')

  useEffect(() => {
    async function load() {
      const r = await getById(id)
      setResearch(r)
      if (r) {
        setForm({
          title: r.title,
          type: r.type,
          status: r.status,
          description: r.description,
          topic: r.topic,
          publishedAt: r.publishedAt,
          link: r.link,
          ownContribution: r.ownContribution,
          skills: r.skills,
          findings: r.findings,
          notes: r.notes,
          tags: r.tags,
        })
        setSkillsInput(r.skills.join(', '))
      }
    }
    load()
  }, [id, getById])

  async function handleSave() {
    if (!form.title.trim() || !research) return
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    await update(id, { ...form, skills })
    setResearch({ ...research, ...form, skills })
    setEditModalOpen(false)
  }

  async function handleDelete() {
    await remove(id)
    router.push('/research')
  }

  if (!research) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>Research not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/research')}>
          Back to Research
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={research.title}
        backHref="/research"
        action={
          <div className="flex items-center gap-2">
            <Badge
              color={TYPE_COLORS[research.type] || 'bg-gray-100 text-gray-700'}
              className="text-sm px-3 py-1"
            >
              {RESEARCH_TYPES[research.type] || research.type}
            </Badge>
            <Badge
              color={getStatusColor(research.status)}
              className="text-sm px-3 py-1"
            >
              {statusLabel(research.status)}
            </Badge>
            <Button
              variant="secondary"
              size="sm"
              icon={<Pencil size={14} />}
              onClick={() => setEditModalOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 size={14} />}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card className="space-y-4">
            <h3 className="font-semibold text-gray-900">Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Type</span>
                <div className="mt-1">
                  <Badge color={TYPE_COLORS[research.type] || 'bg-gray-100 text-gray-700'}>
                    {RESEARCH_TYPES[research.type] || research.type}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
                <div className="mt-1">
                  <Badge color={getStatusColor(research.status)}>
                    {statusLabel(research.status)}
                  </Badge>
                </div>
              </div>
              {research.topic && (
                <div>
                  <span className="text-gray-500">Topic / Field</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Tag size={14} className="text-gray-400" />
                    {research.topic}
                  </p>
                </div>
              )}
              {research.publishedAt && (
                <div>
                  <span className="text-gray-500">Published Date</span>
                  <p className="font-medium text-gray-900 flex items-center gap-1.5 mt-1">
                    <Calendar size={14} className="text-gray-400" />
                    {formatDate(research.publishedAt)}
                  </p>
                </div>
              )}
              {research.link && (
                <div>
                  <span className="text-gray-500">Link</span>
                  <a
                    href={research.link}
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
          {research.description && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{research.description}</p>
            </Card>
          )}

          {/* Own Contribution Card */}
          {research.ownContribution && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">Your Contribution</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{research.ownContribution}</p>
            </Card>
          )}

          {/* Skills Card */}
          {research.skills.length > 0 && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">Skills Used</h3>
              <div className="flex flex-wrap gap-2">
                {research.skills.map((skill) => (
                  <Badge key={skill} color="bg-indigo-100 text-indigo-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Findings Card */}
          {research.findings && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">Findings / Results</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{research.findings}</p>
            </Card>
          )}

          {/* Notes Card */}
          {research.notes && (
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900">Notes</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{research.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Research Guidance */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-blue-500" />
              <h3 className="font-semibold text-gray-900 text-sm">Research Tips</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-medium text-gray-700 mb-1">Describe Your Role Clearly</p>
                <p className="text-gray-600">
                  Admissions officers want to know what you specifically did, not just what the project was about. Be explicit about your individual contributions.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Highlight Methodology</p>
                <p className="text-gray-600">
                  Mention specific tools, techniques, and frameworks you used. This shows depth of understanding and technical competence.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Quantify When Possible</p>
                <p className="text-gray-600">
                  Numbers make your work tangible: sample sizes, accuracy rates, hours invested, pages written, or presentations given.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Connect to Your Goals</p>
                <p className="text-gray-600">
                  Show how this research connects to your intended major or career aspirations. This demonstrates purposeful engagement.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              Research experience is highly valued by selective colleges, especially when it shows genuine intellectual curiosity and persistence.
            </p>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Research"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ResearchType })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
              >
                {Object.entries(RESEARCH_TYPES).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ResearchStatus })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Field</label>
            <input
              type="text"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Contribution</label>
            <textarea
              value={form.ownContribution}
              onChange={(e) => setForm({ ...form, ownContribution: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills Used</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Comma-separated skills"
            />
            <p className="mt-1 text-xs text-gray-400">Separate skills with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Findings / Results</label>
            <textarea
              value={form.findings}
              onChange={(e) => setForm({ ...form, findings: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!form.title.trim()}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete Research"
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>{research.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
