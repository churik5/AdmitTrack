'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, Plus, Globe, MapPin, Calendar, StickyNote, ArrowUpDown } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import SortableList from '@/components/ui/SortableList'
import { useUniversities } from '@/lib/hooks/useUniversities'
import { useDeadlines } from '@/lib/hooks/useDeadlines'
import { useI18n } from '@/lib/i18n'
import {
  University,
  UniversityStatus,
  ApplicationType,
} from '@/lib/types'
import {
  cn,
  truncate,
} from '@/lib/utils'

const STATUS_FILTER_KEYS: (UniversityStatus | 'all')[] = [
  'all', 'researching', 'planning', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted',
]

const STATUS_DROPDOWN_KEYS: UniversityStatus[] = [
  'researching', 'planning', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted', 'deferred', 'withdrawn',
]

const APP_TYPE_KEYS: ApplicationType[] = ['EA', 'ED', 'ED2', 'REA', 'RD', 'rolling', 'other']

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
  const { t } = useI18n()
  const { items: universities, loading, create, update } = useUniversities()
  const { items: deadlines } = useDeadlines()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<UniversityStatus | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [reorderMode, setReorderMode] = useState(false)
  const [localOrder, setLocalOrder] = useState<University[]>([])
  const [savedOrder, setSavedOrder] = useState<string[]>([])

  // Load saved order from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('admittrack_uni_order')
      if (stored) setSavedOrder(JSON.parse(stored))
    } catch {}
  }, [])

  // Apply saved order to universities
  const orderedUniversities = useMemo(() => {
    if (savedOrder.length === 0) return universities
    const orderMap = new Map(savedOrder.map((id, idx) => [id, idx]))
    return [...universities].sort((a, b) => {
      const aIdx = orderMap.get(a.id) ?? 999
      const bIdx = orderMap.get(b.id) ?? 999
      return aIdx - bIdx
    })
  }, [universities, savedOrder])

  function enterReorder() {
    setLocalOrder([...orderedUniversities])
    setReorderMode(true)
  }

  function saveReorder() {
    const newOrder = localOrder.map(u => u.id)
    localStorage.setItem('admittrack_uni_order', JSON.stringify(newOrder))
    setSavedOrder(newOrder)
    setReorderMode(false)
  }

  const filtered = useMemo(() => {
    return orderedUniversities.filter((u) => {
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.state.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orderedUniversities, search, statusFilter])

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
        title={t.universities.title}
        description={t.universities.subtitle}
        action={
          <div className="flex gap-2">
            {universities.length > 1 && !reorderMode && (
              <Button variant="secondary" onClick={enterReorder} icon={<ArrowUpDown size={16} />}>
                {t.common.reorder}
              </Button>
            )}
            {reorderMode && (
              <Button onClick={saveReorder}>
                {t.common.reorderDone}
              </Button>
            )}
            {!reorderMode && (
              <Button onClick={openAdd} icon={<Plus size={18} />}>
                {t.universities.addUniversity}
              </Button>
            )}
          </div>
        }
      />

      {/* Disclaimer */}
      <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        {t.universities.disclaimer}
      </div>

      {/* Filters */}
      {universities.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={`${t.common.search}...`}
            className="sm:w-72"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {STATUS_FILTER_KEYS.map((val) => (
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
                {val === 'all' ? t.common.all : t.universities.statuses[val]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {universities.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title={t.universities.noUniversities}
          description={t.universities.noUniversitiesDesc}
          actionLabel={t.universities.firstUniversity}
          onAction={openAdd}
        />
      )}

      {/* Filtered empty */}
      {universities.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500">
          {t.common.noResults}
        </div>
      )}

      {/* Reorder Mode */}
      {reorderMode && localOrder.length > 0 && (
        <div className="mb-6">
          <SortableList
            items={localOrder}
            onReorder={setLocalOrder}
            renderItem={(uni) => (
              <Card className="!p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-surface-100 text-sm truncate">{uni.name}</h3>
                  <div className="flex gap-1.5 mt-1">
                    <Badge variant={uni.status}>{t.universities.statuses[uni.status]}</Badge>
                  </div>
                </div>
              </Card>
            )}
          />
        </div>
      )}

      {/* Grid */}
      {!reorderMode && filtered.length > 0 && (
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
                  title={t.common.edit}
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
                <Badge variant={uni.status}>{t.universities.statuses[uni.status]}</Badge>
                <Badge color="bg-indigo-100 text-indigo-700">
                  {t.universities.appTypes[uni.applicationType] || uni.applicationType}
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
                    {t.universities.website}
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
        title={editingId ? t.universities.editUniversity : t.universities.addUniversity}
        size="lg"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.universities.universityName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="e.g. MIT, Stanford, UCLA"
            />
          </div>

          {/* Location / Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.universities.state}</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.universities.website}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.universities.applicationType}</label>
            <select
              value={form.applicationType}
              onChange={(e) => setForm({ ...form, applicationType: e.target.value as ApplicationType })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {APP_TYPE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.universities.appTypes[key]}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.status}</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as UniversityStatus })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              {STATUS_DROPDOWN_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.universities.statuses[key]}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.notes}</label>
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
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>
              {editingId ? t.common.save : t.universities.addUniversity}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
