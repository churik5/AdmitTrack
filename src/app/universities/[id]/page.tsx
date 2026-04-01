'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Globe,
  MapPin,
  Calendar,
  CheckSquare,
  FileText,
  FolderOpen,
  StickyNote,
  Plus,
  Trash2,
  ExternalLink,
  Link2,
  Pencil,
  Clock,
  AlertCircle,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Tabs from '@/components/ui/Tabs'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import DecisionTimeline from '@/components/timeline/DecisionTimeline'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useDeadlines } from '@/lib/hooks/useDeadlines'
import { useEssays } from '@/lib/hooks/useEssays'
import { useDocuments } from '@/lib/hooks/useDocuments'
import {
  University,
  UniversityStatus,
  ApplicationType,
  Requirement,
  Deadline,
  DeadlineType,
  DeadlinePriority,
} from '@/lib/types'
import {
  generateId,
  cn,
  statusLabel,
  formatDate,
  daysUntil,
  getDeadlineColor,
  getStatusColor,
  APPLICATION_TYPES,
  DEADLINE_TYPES,
  ESSAY_TYPES,
} from '@/lib/utils'
import { getLinksFor, createLink, removeLink } from '@/lib/storage'
import { useI18n } from '@/lib/i18n'

const DETAIL_TAB_KEYS = ['overview', 'deadlines', 'requirements', 'essays', 'documents', 'notes', 'timeline'] as const

const STATUS_OPTION_KEYS: UniversityStatus[] = [
  'researching', 'planning', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted', 'deferred', 'withdrawn',
]

const PRIORITY_OPTION_KEYS: DeadlinePriority[] = ['critical', 'high', 'medium', 'low']

interface DeadlineForm {
  title: string
  date: string
  time: string
  type: DeadlineType
  priority: DeadlinePriority
  notes: string
}

const emptyDeadlineForm: DeadlineForm = {
  title: '',
  date: '',
  time: '',
  type: 'application',
  priority: 'medium',
  notes: '',
}

export default function UniversityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const id = params.id as string

  const { getById, update: updateUniversity, remove: removeUniversity } = useUniversities()
  const { items: allDeadlines, create: createDeadline, update: updateDeadline, remove: removeDeadline } = useDeadlines()
  const { items: allEssays } = useEssays()
  const { items: allDocuments } = useDocuments()

  const [university, setUniversity] = useState<University | undefined>(undefined)
  const [activeTab, setActiveTab] = useState('overview')
  const [deadlineModalOpen, setDeadlineModalOpen] = useState(false)
  const [deadlineForm, setDeadlineForm] = useState<DeadlineForm>(emptyDeadlineForm)
  const [editingDeadlineId, setEditingDeadlineId] = useState<string | null>(null)
  const [newRequirement, setNewRequirement] = useState('')
  const [addingRequirement, setAddingRequirement] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    state: '',
    website: '',
    applicationType: 'RD' as ApplicationType,
    status: 'researching' as UniversityStatus,
    notes: '',
  })
  const [linkEssayModalOpen, setLinkEssayModalOpen] = useState(false)
  const [linkDocModalOpen, setLinkDocModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [localNotes, setLocalNotes] = useState('')
  const notesTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load university
  useEffect(() => {
    async function load() {
      const uni = await getById(id)
      setUniversity(uni)
      if (uni) {
        setLocalNotes(uni.notes)
        setEditForm({
          name: uni.name,
          state: uni.state,
          website: uni.website,
          applicationType: uni.applicationType,
          status: uni.status,
          notes: uni.notes,
        })
      }
    }
    load()
  }, [id, getById])

  // Deadlines for this university
  const uniDeadlines = useMemo(
    () => allDeadlines.filter((d) => d.universityId === id),
    [allDeadlines, id]
  )

  // Essays linked to this university
  const linkedEssays = useMemo(
    () => allEssays.filter((e) => e.universityIds.includes(id)),
    [allEssays, id]
  )

  // Documents linked via entity links
  const entityLinks = useMemo(() => getLinksFor(id), [id])
  const linkedDocuments = useMemo(() => {
    const docIds = entityLinks
      .filter(
        (l) =>
          (l.sourceType === 'document' && l.targetId === id) ||
          (l.targetType === 'document' && l.sourceId === id)
      )
      .map((l) => (l.sourceType === 'document' ? l.sourceId : l.targetId))
    return allDocuments.filter((d) => docIds.includes(d.id))
  }, [entityLinks, allDocuments, id])

  // Unlinked essays for linking
  const unlinkableEssays = useMemo(
    () => allEssays.filter((e) => !e.universityIds.includes(id)),
    [allEssays, id]
  )

  // Unlinked documents
  const unlinkableDocuments = useMemo(() => {
    const linkedDocIds = linkedDocuments.map((d) => d.id)
    return allDocuments.filter((d) => !linkedDocIds.includes(d.id))
  }, [allDocuments, linkedDocuments])

  // Quick stats
  const reqTotal = university?.requirements.length || 0
  const reqCompleted = university?.requirements.filter((r) => r.completed).length || 0

  // Handlers
  async function handleStatusChange(status: UniversityStatus) {
    if (!university) return
    await updateUniversity(id, { status })
    setUniversity({ ...university, status })
  }

  async function handleSaveEdit() {
    if (!university || !editForm.name.trim()) return
    await updateUniversity(id, editForm)
    setUniversity({ ...university, ...editForm })
    setEditModalOpen(false)
  }

  async function handleDelete() {
    await removeUniversity(id)
    router.push('/universities')
  }

  // Deadline handlers
  function openAddDeadline() {
    setEditingDeadlineId(null)
    setDeadlineForm(emptyDeadlineForm)
    setDeadlineModalOpen(true)
  }

  function openEditDeadline(d: Deadline) {
    setEditingDeadlineId(d.id)
    setDeadlineForm({
      title: d.title,
      date: d.date,
      time: d.time,
      type: d.type,
      priority: d.priority,
      notes: d.notes,
    })
    setDeadlineModalOpen(true)
  }

  function handleSaveDeadline() {
    if (!deadlineForm.title.trim() || !deadlineForm.date || !university) return
    const days = daysUntil(deadlineForm.date)
    const deadlineStatus = days < 0 ? 'overdue' : 'upcoming'
    if (editingDeadlineId) {
      updateDeadline(editingDeadlineId, {
        ...deadlineForm,
        status: deadlineStatus,
      })
    } else {
      createDeadline({
        ...deadlineForm,
        universityId: id,
        universityName: university.name,
        status: deadlineStatus,
      } as Omit<Deadline, 'id' | 'createdAt' | 'updatedAt'>)
    }
    setDeadlineModalOpen(false)
  }

  // Requirement handlers
  async function addRequirement() {
    if (!newRequirement.trim() || !university) return
    const req: Requirement = {
      id: generateId(),
      label: newRequirement.trim(),
      completed: false,
      notes: '',
    }
    const updated = [...university.requirements, req]
    await updateUniversity(id, { requirements: updated })
    setUniversity({ ...university, requirements: updated })
    setNewRequirement('')
    setAddingRequirement(false)
  }

  async function toggleRequirement(reqId: string) {
    if (!university) return
    const updated = university.requirements.map((r) =>
      r.id === reqId ? { ...r, completed: !r.completed } : r
    )
    await updateUniversity(id, { requirements: updated })
    setUniversity({ ...university, requirements: updated })
  }

  async function deleteRequirement(reqId: string) {
    if (!university) return
    const updated = university.requirements.filter((r) => r.id !== reqId)
    await updateUniversity(id, { requirements: updated })
    setUniversity({ ...university, requirements: updated })
  }

  async function updateRequirementNotes(reqId: string, notes: string) {
    if (!university) return
    const updated = university.requirements.map((r) =>
      r.id === reqId ? { ...r, notes } : r
    )
    await updateUniversity(id, { requirements: updated })
    setUniversity({ ...university, requirements: updated })
  }

  // Notes handler with debounce
  function handleNotesChange(notes: string) {
    if (!university) return
    setLocalNotes(notes)
    if (notesTimerRef.current) clearTimeout(notesTimerRef.current)
    notesTimerRef.current = setTimeout(async () => {
      await updateUniversity(id, { notes })
      setUniversity((prev) => prev ? { ...prev, notes } : prev)
    }, 500)
  }

  // Essay linking (update essay's universityIds array)
  const { update: updateEssay } = useEssays()

  function linkEssay(essayId: string) {
    const essay = allEssays.find((e) => e.id === essayId)
    if (!essay) return
    updateEssay(essayId, { universityIds: [...essay.universityIds, id] })
    setLinkEssayModalOpen(false)
  }

  function unlinkEssay(essayId: string) {
    const essay = allEssays.find((e) => e.id === essayId)
    if (!essay) return
    updateEssay(essayId, { universityIds: essay.universityIds.filter((uid) => uid !== id) })
  }

  // Document linking
  function linkDocument(docId: string) {
    createLink('university', id, 'document', docId)
    setLinkDocModalOpen(false)
    // Force re-render
    setUniversity({ ...university! })
  }

  function unlinkDocument(docId: string) {
    const link = entityLinks.find(
      (l) =>
        (l.sourceType === 'document' && l.sourceId === docId && l.targetId === id) ||
        (l.targetType === 'document' && l.targetId === docId && l.sourceId === id)
    )
    if (link) {
      removeLink(link.id)
      setUniversity({ ...university! })
    }
  }

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p>{t.common.noResults}</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/universities')}>
          {t.common.back}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={university.name}
        backHref="/universities"
        description={university.state || undefined}
        action={
          <div className="flex items-center gap-2">
            <Badge variant={university.status} className="text-sm px-3 py-1">
              {t.universities.statuses[university.status]}
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

      <Tabs tabs={DETAIL_TAB_KEYS.map((key) => ({ id: key, label: t.universities.tabs[key] }))} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info Card */}
            <Card className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-gray-900">{t.universities.tabs.overview}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">{t.common.name}</span>
                  <p className="font-medium text-gray-900">{university.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.universities.state}</span>
                  <p className="font-medium text-gray-900">{university.state || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500">{t.universities.applicationType}</span>
                  <p className="font-medium text-gray-900">
                    {t.universities.appTypes[university.applicationType] || university.applicationType}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">{t.universities.website}</span>
                  {university.website ? (
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-600 hover:underline flex items-center gap-1"
                    >
                      {t.universities.website} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <p className="text-gray-400">-</p>
                  )}
                </div>
              </div>

              {/* Status update */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.common.status}
                </label>
                <select
                  value={university.status}
                  onChange={(e) => handleStatusChange(e.target.value as UniversityStatus)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
                >
                  {STATUS_OPTION_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t.universities.statuses[key]}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <div className="flex items-center gap-3 mb-1">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{t.universities.tabs.deadlines}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{uniDeadlines.length}</p>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-1">
                  <CheckSquare size={18} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">{t.universities.tabs.requirements}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {reqCompleted}/{reqTotal}
                </p>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-1">
                  <FileText size={18} className="text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">{t.universities.tabs.essays}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{linkedEssays.length}</p>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-1">
                  <FolderOpen size={18} className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{t.universities.tabs.documents}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{linkedDocuments.length}</p>
              </Card>
            </div>
          </div>
        )}

        {/* ==================== DEADLINES TAB ==================== */}
        {activeTab === 'deadlines' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{t.universities.tabs.deadlines}</h3>
              <Button size="sm" icon={<Plus size={16} />} onClick={openAddDeadline}>
                {t.deadlines.addDeadline}
              </Button>
            </div>

            {uniDeadlines.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No deadlines"
                description="Add deadlines to stay on track with your application."
                actionLabel="Add Deadline"
                onAction={openAddDeadline}
              />
            ) : (
              <div className="space-y-3">
                {uniDeadlines
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((d) => {
                    const days = daysUntil(d.date)
                    const color = getDeadlineColor(days)
                    return (
                      <Card key={d.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={cn(
                              'shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold',
                              color
                            )}
                          >
                            {days < 0 ? `${Math.abs(days)}d` : days === 0 ? 'Today' : `${days}d`}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{d.title}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span>{formatDate(d.date)}</span>
                              {d.time && <span>at {d.time}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={d.status}>
                            {d.status === 'completed' ? 'Done' : days < 0 ? 'Overdue' : 'Upcoming'}
                          </Badge>
                          <Badge color="bg-gray-100 text-gray-600">
                            {DEADLINE_TYPES[d.type] || d.type}
                          </Badge>
                          <div className="flex gap-1">
                            <button
                              onClick={() => openEditDeadline(d)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (d.status === 'completed') {
                                  updateDeadline(d.id, { status: 'upcoming' })
                                } else {
                                  updateDeadline(d.id, { status: 'completed' })
                                }
                              }}
                              className="p-1 text-gray-400 hover:text-green-600 rounded hover:bg-gray-100"
                              title="Toggle complete"
                            >
                              <CheckSquare size={14} />
                            </button>
                            <button
                              onClick={() => removeDeadline(d.id)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
              </div>
            )}
          </div>
        )}

        {/* ==================== REQUIREMENTS TAB ==================== */}
        {activeTab === 'requirements' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Requirements ({reqCompleted}/{reqTotal})
              </h3>
              <Button
                size="sm"
                icon={<Plus size={16} />}
                onClick={() => setAddingRequirement(true)}
              >
                Add Requirement
              </Button>
            </div>

            {addingRequirement && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addRequirement()
                    if (e.key === 'Escape') {
                      setAddingRequirement(false)
                      setNewRequirement('')
                    }
                  }}
                  placeholder="e.g. Submit transcript, Write supplemental essay..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  autoFocus
                />
                <Button size="sm" onClick={addRequirement} disabled={!newRequirement.trim()}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setAddingRequirement(false)
                    setNewRequirement('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}

            {university.requirements.length === 0 && !addingRequirement ? (
              <EmptyState
                icon={CheckSquare}
                title="No requirements"
                description="Add application requirements to track what you need to complete."
                actionLabel="Add Requirement"
                onAction={() => setAddingRequirement(true)}
              />
            ) : (
              <div className="space-y-2">
                {university.requirements.map((req) => (
                  <Card key={req.id} className="py-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleRequirement(req.id)}
                        className={cn(
                          'shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                          req.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-brand-500'
                        )}
                      >
                        {req.completed && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            req.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                          )}
                        >
                          {req.label}
                        </p>
                        <textarea
                          value={req.notes}
                          onChange={(e) => updateRequirementNotes(req.id, e.target.value)}
                          placeholder="Add notes..."
                          rows={1}
                          className="mt-1 w-full text-xs text-gray-500 bg-transparent border-0 p-0 resize-none focus:outline-none focus:ring-0 placeholder:text-gray-300"
                        />
                      </div>
                      <button
                        onClick={() => deleteRequirement(req.id)}
                        className="shrink-0 p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== ESSAYS TAB ==================== */}
        {activeTab === 'essays' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Linked Essays</h3>
              <Button
                size="sm"
                icon={<Link2 size={16} />}
                onClick={() => setLinkEssayModalOpen(true)}
              >
                Link Essay
              </Button>
            </div>

            {linkedEssays.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No linked essays"
                description="Link essays you're writing for this university."
                actionLabel="Link Essay"
                onAction={() => setLinkEssayModalOpen(true)}
              />
            ) : (
              <div className="space-y-3">
                {linkedEssays.map((essay) => (
                  <Card key={essay.id} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{essay.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={essay.status}>{statusLabel(essay.status)}</Badge>
                        <span className="text-xs text-gray-500">
                          {ESSAY_TYPES[essay.type] || essay.type}
                        </span>
                        {essay.wordLimit > 0 && (
                          <span className="text-xs text-gray-400">{essay.wordLimit} word limit</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => unlinkEssay(essay.id)}
                      className="shrink-0 p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition-colors"
                      title="Unlink essay"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== DOCUMENTS TAB ==================== */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Linked Documents</h3>
              <Button
                size="sm"
                icon={<Link2 size={16} />}
                onClick={() => setLinkDocModalOpen(true)}
              >
                Link Document
              </Button>
            </div>

            {linkedDocuments.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No linked documents"
                description="Link documents relevant to this university's application."
                actionLabel="Link Document"
                onAction={() => setLinkDocModalOpen(true)}
              />
            ) : (
              <div className="space-y-3">
                {linkedDocuments.map((doc) => (
                  <Card key={doc.id} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{doc.category}</Badge>
                        <span className="text-xs text-gray-400">{doc.fileName}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => unlinkDocument(doc.id)}
                      className="shrink-0 p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition-colors"
                      title="Unlink document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== NOTES TAB ==================== */}
        {activeTab === 'timeline' && university && (
          <DecisionTimeline universityId={university.id} />
        )}

        {activeTab === 'notes' && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
            <Card>
              <textarea
                value={localNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                rows={12}
                className="w-full text-sm text-gray-700 bg-transparent border-0 p-0 resize-none focus:outline-none focus:ring-0 placeholder:text-gray-400"
                placeholder="Add notes about this university, your impressions, campus visit details, financial aid info..."
              />
            </Card>
          </div>
        )}
      </div>

      {/* ==================== MODALS ==================== */}

      {/* Edit University Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit University"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.universities.state}</label>
            <input
              type="text"
              value={editForm.state}
              onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={editForm.website}
              onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
            <select
              value={editForm.applicationType}
              onChange={(e) =>
                setEditForm({ ...editForm, applicationType: e.target.value as ApplicationType })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {Object.entries(APPLICATION_TYPES).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value as UniversityStatus })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {STATUS_OPTION_KEYS.map((val) => (
                <option key={val} value={val}>
                  {t.universities.statuses[val]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editForm.name.trim()}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Deadline Modal */}
      <Modal
        isOpen={deadlineModalOpen}
        onClose={() => setDeadlineModalOpen(false)}
        title={editingDeadlineId ? 'Edit Deadline' : 'Add Deadline'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={deadlineForm.title}
              onChange={(e) => setDeadlineForm({ ...deadlineForm, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. Application deadline, Financial aid form..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={deadlineForm.date}
                onChange={(e) => setDeadlineForm({ ...deadlineForm, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={deadlineForm.time}
                onChange={(e) => setDeadlineForm({ ...deadlineForm, time: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={deadlineForm.type}
                onChange={(e) =>
                  setDeadlineForm({ ...deadlineForm, type: e.target.value as DeadlineType })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
              >
                {Object.entries(DEADLINE_TYPES).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={deadlineForm.priority}
                onChange={(e) =>
                  setDeadlineForm({ ...deadlineForm, priority: e.target.value as DeadlinePriority })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
              >
                {PRIORITY_OPTION_KEYS.map((val) => (
                  <option key={val} value={val}>
                    {t.deadlines.priorities[val]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={deadlineForm.notes}
              onChange={(e) => setDeadlineForm({ ...deadlineForm, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Any additional details..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setDeadlineModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveDeadline}
              disabled={!deadlineForm.title.trim() || !deadlineForm.date}
            >
              {editingDeadlineId ? 'Save Changes' : 'Add Deadline'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Link Essay Modal */}
      <Modal
        isOpen={linkEssayModalOpen}
        onClose={() => setLinkEssayModalOpen(false)}
        title="Link Essay"
      >
        {unlinkableEssays.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            <p>No essays available to link.</p>
            <p className="mt-1 text-xs text-gray-400">Create essays in the Essays section first.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {unlinkableEssays.map((essay) => (
              <button
                key={essay.id}
                onClick={() => linkEssay(essay.id)}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <p className="font-medium text-sm text-gray-900">{essay.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={essay.status} className="text-[10px]">
                    {statusLabel(essay.status)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {ESSAY_TYPES[essay.type] || essay.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* Link Document Modal */}
      <Modal
        isOpen={linkDocModalOpen}
        onClose={() => setLinkDocModalOpen(false)}
        title="Link Document"
      >
        {unlinkableDocuments.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            <p>No documents available to link.</p>
            <p className="mt-1 text-xs text-gray-400">Upload documents in the Documents section first.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {unlinkableDocuments.map((doc) => (
              <button
                key={doc.id}
                onClick={() => linkDocument(doc.id)}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <p className="font-medium text-sm text-gray-900">{doc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="text-[10px]">{doc.category}</Badge>
                  <span className="text-xs text-gray-400">{doc.fileName}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={t.common.delete}
        size="sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          {t.common.confirmDelete} <strong>{university.name}</strong>
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
