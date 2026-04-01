'use client'

import { useState, useMemo } from 'react'
import { useI18n } from '@/lib/i18n'
import { useFinancialAid } from '@/lib/hooks/useFinancialAid'
import { useUniversities } from '@/lib/hooks/useUniversities'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import ProgressBar from '@/components/ui/ProgressBar'
import { DollarSign, Plus, Pencil, Trash2, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { AidFormStatus, Scholarship } from '@/lib/types'

const STATUS_COLORS: Record<AidFormStatus, string> = {
  not_started: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  received: 'bg-green-100 text-green-700',
}

export default function FinancialAidPage() {
  const { t } = useI18n()
  const { items, loading, create, update, remove } = useFinancialAid()
  const { items: universities } = useUniversities()

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Form state
  const [universityName, setUniversityName] = useState('')
  const [universityId, setUniversityId] = useState('')
  const [fafsaStatus, setFafsaStatus] = useState<AidFormStatus>('not_started')
  const [cssProfileStatus, setCssProfileStatus] = useState<AidFormStatus>('not_started')
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [financialAidAmount, setFinancialAidAmount] = useState(0)
  const [budgetNotes, setBudgetNotes] = useState('')
  const [scholarships, setScholarships] = useState<Scholarship[]>([])

  const totals = useMemo(() => {
    const totalCost = items.reduce((sum, i) => sum + (i.estimatedCost || 0), 0)
    const totalAid = items.reduce((sum, i) => sum + (i.financialAidAmount || 0) + (i.scholarships || []).reduce((s, sc) => s + (sc.amount || 0), 0), 0)
    return { totalCost, totalAid, netCost: totalCost - totalAid }
  }, [items])

  function resetForm() {
    setUniversityName('')
    setUniversityId('')
    setFafsaStatus('not_started')
    setCssProfileStatus('not_started')
    setEstimatedCost(0)
    setFinancialAidAmount(0)
    setBudgetNotes('')
    setScholarships([])
    setEditingId(null)
  }

  function openAdd() {
    resetForm()
    setShowModal(true)
  }

  async function openEdit(id: string) {
    const item = items.find(i => i.id === id)
    if (!item) return
    setEditingId(id)
    setUniversityName(item.universityName)
    setUniversityId(item.universityId)
    setFafsaStatus(item.fafsaStatus)
    setCssProfileStatus(item.cssProfileStatus)
    setEstimatedCost(item.estimatedCost)
    setFinancialAidAmount(item.financialAidAmount)
    setBudgetNotes(item.budgetNotes)
    setScholarships(item.scholarships || [])
    setShowModal(true)
  }

  async function handleSave() {
    const data = {
      universityId,
      universityName,
      fafsaStatus,
      cssProfileStatus,
      estimatedCost,
      financialAidAmount,
      budgetNotes,
      scholarships,
    }
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

  function addScholarship() {
    setScholarships([...scholarships, { id: Date.now().toString(), name: '', amount: 0, status: '', deadline: '' }])
  }

  function updateScholarship(idx: number, field: keyof Scholarship, value: string | number) {
    const updated = [...scholarships]
    updated[idx] = { ...updated[idx], [field]: value }
    setScholarships(updated)
  }

  function removeScholarship(idx: number) {
    setScholarships(scholarships.filter((_, i) => i !== idx))
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-surface-400 text-sm">{t.common.loading}</div></div>
  }

  const formatCurrency = (n: number) => `$${n.toLocaleString()}`

  return (
    <div>
      <PageHeader
        title={t.financialAid.title}
        description={t.financialAid.subtitle}
        action={<Button icon={<Plus size={16} />} onClick={openAdd}>{t.financialAid.addEntry}</Button>}
      />

      {/* Summary Cards */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                <TrendingUp size={19} className="text-red-500" />
              </div>
              <div>
                <p className="text-xs text-surface-500">{t.financialAid.totalEstimated}</p>
                <p className="text-xl font-bold text-surface-900 dark:text-surface-100">{formatCurrency(totals.totalCost)}</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <PiggyBank size={19} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-surface-500">{t.financialAid.totalAid}</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totals.totalAid)}</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <TrendingDown size={19} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-surface-500">{t.financialAid.totalNet}</p>
                <p className="text-xl font-bold text-surface-900 dark:text-surface-100">{formatCurrency(totals.netCost)}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={DollarSign}
          title={t.financialAid.noEntries}
          description={t.financialAid.noEntriesDesc}
          actionLabel={t.financialAid.firstEntry}
          onAction={openAdd}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const scholarshipTotal = (item.scholarships || []).reduce((s, sc) => s + (sc.amount || 0), 0)
            const totalAid = (item.financialAidAmount || 0) + scholarshipTotal
            const net = (item.estimatedCost || 0) - totalAid
            return (
              <Card key={item.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">{item.universityName || 'Unnamed'}</h3>
                    <div className="flex gap-2 mt-1.5">
                      <Badge color={STATUS_COLORS[item.fafsaStatus]}>FAFSA: {t.financialAid.statuses[item.fafsaStatus]}</Badge>
                      <Badge color={STATUS_COLORS[item.cssProfileStatus]}>CSS: {t.financialAid.statuses[item.cssProfileStatus]}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" icon={<Pencil size={14} />} onClick={() => openEdit(item.id)} />
                    <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} onClick={() => setConfirmDelete(item.id)} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-surface-500">{t.financialAid.estimatedCost}</p>
                    <p className="font-medium text-surface-900 dark:text-surface-100">{formatCurrency(item.estimatedCost || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">{t.financialAid.financialAidAmount}</p>
                    <p className="font-medium text-green-600">{formatCurrency(totalAid)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">{t.financialAid.netCost}</p>
                    <p className="font-medium text-surface-900 dark:text-surface-100">{formatCurrency(net)}</p>
                  </div>
                </div>

                {item.scholarships && item.scholarships.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-surface-100 dark:border-surface-700">
                    <p className="text-xs font-semibold text-surface-500 mb-1.5">{t.financialAid.scholarships}</p>
                    <div className="space-y-1">
                      {item.scholarships.map((s) => (
                        <div key={s.id} className="flex justify-between text-xs">
                          <span className="text-surface-700 dark:text-surface-300">{s.name}</span>
                          <span className="font-medium text-green-600">{formatCurrency(s.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingId ? t.financialAid.editEntry : t.financialAid.addEntry} size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.universityName}</label>
            <select
              value={universityId}
              onChange={(e) => {
                setUniversityId(e.target.value)
                const uni = universities.find(u => u.id === e.target.value)
                if (uni) setUniversityName(uni.name)
              }}
              className="input-base"
            >
              <option value="">— Select —</option>
              {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.fafsaStatus}</label>
              <select value={fafsaStatus} onChange={(e) => setFafsaStatus(e.target.value as AidFormStatus)} className="input-base">
                {(['not_started', 'in_progress', 'submitted', 'received'] as AidFormStatus[]).map(s => (
                  <option key={s} value={s}>{t.financialAid.statuses[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.cssProfileStatus}</label>
              <select value={cssProfileStatus} onChange={(e) => setCssProfileStatus(e.target.value as AidFormStatus)} className="input-base">
                {(['not_started', 'in_progress', 'submitted', 'received'] as AidFormStatus[]).map(s => (
                  <option key={s} value={s}>{t.financialAid.statuses[s]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.estimatedCost} ($)</label>
              <input type="number" value={estimatedCost || ''} onChange={(e) => setEstimatedCost(Number(e.target.value))} className="input-base" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.financialAidAmount} ($)</label>
              <input type="number" value={financialAidAmount || ''} onChange={(e) => setFinancialAidAmount(Number(e.target.value))} className="input-base" placeholder="0" />
            </div>
          </div>

          {/* Scholarships */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">{t.financialAid.scholarships}</label>
              <Button variant="ghost" size="sm" icon={<Plus size={14} />} onClick={addScholarship}>{t.financialAid.addScholarship}</Button>
            </div>
            {scholarships.map((s, idx) => (
              <div key={s.id} className="flex gap-2 mb-2">
                <input type="text" value={s.name} onChange={(e) => updateScholarship(idx, 'name', e.target.value)} className="input-base flex-1" placeholder={t.financialAid.scholarshipName} />
                <input type="number" value={s.amount || ''} onChange={(e) => updateScholarship(idx, 'amount', Number(e.target.value))} className="input-base w-28" placeholder="$" />
                <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} onClick={() => removeScholarship(idx)} />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{t.financialAid.budgetNotes}</label>
            <textarea value={budgetNotes} onChange={(e) => setBudgetNotes(e.target.value)} className="input-base resize-none" rows={3} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>{t.common.cancel}</Button>
            <Button onClick={handleSave}>{t.common.save}</Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title={t.common.delete} size="sm">
        <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">{t.common.confirmDelete}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>{t.common.cancel}</Button>
          <Button variant="danger" onClick={() => confirmDelete && handleDelete(confirmDelete)}>{t.common.delete}</Button>
        </div>
      </Modal>
    </div>
  )
}
