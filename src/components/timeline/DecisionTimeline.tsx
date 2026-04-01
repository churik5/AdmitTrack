'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { useUniversityEvents } from '@/lib/hooks/useUniversityEvents'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Plus, Pencil, Trash2, Circle } from 'lucide-react'
import { cn, formatDateShort } from '@/lib/utils'
import type { UniversityEventType } from '@/lib/types'

const EVENT_COLORS: Record<UniversityEventType, string> = {
  applied: 'bg-blue-500',
  interview: 'bg-purple-500',
  response_received: 'bg-yellow-500',
  accepted: 'bg-green-500',
  rejected: 'bg-red-500',
  waitlisted: 'bg-orange-500',
  deferred: 'bg-amber-500',
  enrolled: 'bg-emerald-600',
  withdrawn: 'bg-gray-500',
  other: 'bg-surface-400',
}

const EVENT_BADGE_COLORS: Record<UniversityEventType, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-purple-100 text-purple-700',
  response_received: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  waitlisted: 'bg-orange-100 text-orange-700',
  deferred: 'bg-amber-100 text-amber-700',
  enrolled: 'bg-emerald-100 text-emerald-700',
  withdrawn: 'bg-gray-100 text-gray-700',
  other: 'bg-surface-100 text-surface-600',
}

interface DecisionTimelineProps {
  universityId: string
}

export default function DecisionTimeline({ universityId }: DecisionTimelineProps) {
  const { t } = useI18n()
  const { items: allEvents, create, update, remove } = useUniversityEvents()
  const events = allEvents
    .filter(e => e.universityId === universityId)
    .sort((a, b) => new Date(a.eventDate || a.createdAt).getTime() - new Date(b.eventDate || b.createdAt).getTime())

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [eventType, setEventType] = useState<UniversityEventType>('applied')
  const [eventDate, setEventDate] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const eventTypes: UniversityEventType[] = ['applied', 'interview', 'response_received', 'accepted', 'rejected', 'waitlisted', 'deferred', 'enrolled', 'withdrawn', 'other']

  function resetForm() {
    setEventType('applied')
    setEventDate('')
    setNotes('')
    setEditingId(null)
  }

  function openAdd() {
    resetForm()
    setShowModal(true)
  }

  function openEdit(id: string) {
    const ev = events.find(e => e.id === id)
    if (!ev) return
    setEditingId(id)
    setEventType(ev.eventType)
    setEventDate(ev.eventDate)
    setNotes(ev.notes)
    setShowModal(true)
  }

  async function handleSave() {
    const data = { universityId, eventType, eventDate, notes }
    if (editingId) {
      await update(editingId, data)
    } else {
      await create(data as Parameters<typeof create>[0])
    }
    setShowModal(false)
    resetForm()
  }

  async function handleDelete(id: string) {
    await remove(id)
    setConfirmDelete(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display text-surface-900 dark:text-surface-100">{t.timeline.title}</h3>
        <Button size="sm" icon={<Plus size={14} />} onClick={openAdd}>{t.timeline.addEvent}</Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-10">
          <Circle size={32} className="text-surface-300 mx-auto mb-3" />
          <p className="text-sm text-surface-400 mb-1">{t.timeline.noEvents}</p>
          <p className="text-xs text-surface-400">{t.timeline.noEventsDesc}</p>
        </div>
      ) : (
        <div className="relative ml-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-surface-200 dark:bg-surface-700" />

          <div className="space-y-4">
            {events.map((ev) => (
              <div key={ev.id} className="relative pl-6 group">
                {/* Dot */}
                <div className={cn(
                  'absolute left-0 top-2 w-3 h-3 rounded-full -translate-x-[5px] border-2 border-white dark:border-surface-800 z-10',
                  EVENT_COLORS[ev.eventType]
                )} />

                <Card className="!p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge color={EVENT_BADGE_COLORS[ev.eventType]}>
                          {t.timeline.eventTypes[ev.eventType]}
                        </Badge>
                        {ev.eventDate && (
                          <span className="text-xs text-surface-500">{formatDateShort(ev.eventDate)}</span>
                        )}
                      </div>
                      {ev.notes && <p className="text-sm text-surface-600 dark:text-surface-400">{ev.notes}</p>}
                    </div>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Button variant="ghost" size="sm" icon={<Pencil size={12} />} onClick={() => openEdit(ev.id)} />
                      <Button variant="ghost" size="sm" icon={<Trash2 size={12} />} onClick={() => setConfirmDelete(ev.id)} />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingId ? t.timeline.editEvent : t.timeline.addEvent}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.timeline.eventType}</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value as UniversityEventType)} className="input-base">
              {eventTypes.map(et => (
                <option key={et} value={et}>{t.timeline.eventTypes[et]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.timeline.eventDate}</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.common.notes}</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input-base resize-none" rows={3} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>{t.common.cancel}</Button>
            <Button onClick={handleSave}>{t.common.save}</Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title={t.timeline.deleteEvent} size="sm">
        <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">{t.common.confirmDelete}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>{t.common.cancel}</Button>
          <Button variant="danger" onClick={() => confirmDelete && handleDelete(confirmDelete)}>{t.common.delete}</Button>
        </div>
      </Modal>
    </div>
  )
}
