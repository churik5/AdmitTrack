'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, Plus, Globe, MapPin, Calendar, StickyNote } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useDeadlines } from '@/lib/hooks/useDeadlines'
import {
  University,
  UniversityStatus,
  ApplicationType,
} from '@/lib/types'
import {
  cn,
  statusLabel,
  truncate,
  APPLICATION_TYPES,
  US_STATES,
} from '@/lib/utils'

const STATUS_OPTIONS: { value: UniversityStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'researching', label: 'Researching' },
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'waitlisted', label: 'Waitlisted' },
]

const APP_TYPE_OPTIONS: { value: ApplicationType; label: string }[] = Object.entries(APPLICATION_TYPES).map(
  ([value, label]) => ({ value: value as ApplicationType, label })
)

const STATUS_DROPDOWN: { value: UniversityStatus; label: string }[] = [
  { value: 'researching', label: 'Researching' },
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'waitlisted', label: 'Waitlisted' },
  { value: 'deferred', label: 'Deferred' },
  { value: 'withdrawn', label: 'Withdrawn' },
]

interface FormData {
  name: string
  state: string
  website: string
  applicationType: ApplicationType
  status: UniversityStatus
  notes: string
}

const emptyForm: FormData = {
  name: '',
  state: '',
  website: '',
  applicationType: 'RD',
  status: 'researching',
  notes: '',
}

export default function UniversitiesPage() {
  const router = useRouter()
  const { items: universities, loading, create, update } = useUniversities()
  const { items: deadlines } = useDeadlines()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<UniversityStatus | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.state.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [universities, search, statusFilter])

  const deadlineCountMap = useMemo(() => {
    const map: Record<string, number> = {}
    deadlines.forEach((d) => {
      if (d.universityId) {
        map[d.universityId] = (map[d.universityId] || 0) + 1
      }
    })
    return map
  }, [deadlines])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(uni: University) {
    setEditingId(uni.id)
    setForm({
      name: uni.name,
      state: uni.state,
      website: uni.website,
      applicationType: uni.applicationType,
      status: uni.status,
      notes: uni.notes,
    })
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.name.trim()) return
    if (editingId) {
      await update(editingId, { ...form })
    } else {
      await create({
        ...form,
        requirements: [],
        tags: [],
      } as Omit<University, 'id' | 'createdAt' | 'updatedAt'>)
    }
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
        title="Universities"
        description="Your college list — add schools, track status, and organize requirements"
        action={
          <Button onClick={openAdd} icon={<Plus size={18} />}>
            Add University
          </Button>
        }
      />

      {/* Disclaimer */}
      <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        You enter all deadlines and requirements yourself. This is your personal tracker, not an official source.
      </div>

      {/* Filters */}
      {universities.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search universities..."
            className="sm:w-72"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors',
                  statusFilter === opt.value
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {universities.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title="No universities yet"
          description="Start building your college list. Add the schools you're interested in and track your application progress."
          actionLabel="Add Your First University"
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {universities.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          No universities match your search or filter.
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((uni) => (
            <Card
              key={uni.id}
              onClick={() => router.push(`/universities/${uni.id}`)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 leading-tight">{uni.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openEdit(uni)
                  }}
                  className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
                  title="Edit"
                >
                  <StickyNote size={14} />
                </button>
              </div>

              {uni.state && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>{uni.state}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                <Badge variant={uni.status}>{statusLabel(uni.status)}</Badge>
                <Badge color="bg-indigo-100 text-indigo-700">
                  {APPLICATION_TYPES[uni.applicationType] || uni.applicationType}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                {deadlineCountMap[uni.id] ? (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {deadlineCountMap[uni.id]} deadline{deadlineCountMap[uni.id] > 1 ? 's' : ''}
                  </span>
                ) : null}
                {uni.website && (
                  <span className="flex items-center gap-1">
                    <Globe size={12} />
                    Website
                  </span>
                )}
              </div>

              {uni.notes && (
                <p className="text-xs text-gray-400 line-clamp-2">{truncate(uni.notes, 100)}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit University' : 'Add University'}
        size="lg"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. MIT, Stanford, UCLA"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              <option value="">Select state...</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          {/* Application Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
            <select
              value={form.applicationType}
              onChange={(e) => setForm({ ...form, applicationType: e.target.value as ApplicationType })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {APP_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as UniversityStatus })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {STATUS_DROPDOWN.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Any notes about this university..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>
              {editingId ? 'Save Changes' : 'Add University'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
