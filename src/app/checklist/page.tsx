'use client'

import { useEffect, useMemo } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import { useChecklist } from '@/lib/hooks/useChecklist'
import { useI18n } from '@/lib/i18n'
import { CHECKLIST_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CheckSquare, Square, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const CATEGORY_ORDER = [
  'Universities',
  'Testing',
  'Activities & Honors',
  'Documents',
  'Essays',
  'Research & Projects',
  'Financial',
  'Final Steps',
] as const

const CATEGORY_COLORS: Record<string, { bar: string; bg: string; text: string }> = {
  Universities:          { bar: 'bg-blue-500',    bg: 'bg-blue-50',    text: 'text-blue-700' },
  Testing:               { bar: 'bg-purple-500',  bg: 'bg-purple-50',  text: 'text-purple-700' },
  'Activities & Honors': { bar: 'bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700' },
  Documents:             { bar: 'bg-green-500',    bg: 'bg-green-50',   text: 'text-green-700' },
  Essays:                { bar: 'bg-pink-500',     bg: 'bg-pink-50',    text: 'text-pink-700' },
  'Research & Projects': { bar: 'bg-cyan-500',     bg: 'bg-cyan-50',    text: 'text-cyan-700' },
  Financial:             { bar: 'bg-orange-500',   bg: 'bg-orange-50',  text: 'text-orange-700' },
  'Final Steps':         { bar: 'bg-emerald-500',  bg: 'bg-emerald-50', text: 'text-emerald-700' },
}

export default function ChecklistPage() {
  const { t } = useI18n()
  const { items, loading, initChecklist, updateChecklistItem } = useChecklist()
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())

  useEffect(() => {
    const init = async () => {
      await initChecklist(CHECKLIST_ITEMS)
    }
    init()
  }, [initChecklist])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>()
    for (const cat of CATEGORY_ORDER) {
      map.set(cat, [])
    }
    for (const item of items) {
      const list = map.get(item.category)
      if (list) {
        list.push(item)
      }
    }
    return map
  }, [items])

  const totalCompleted = items.filter((i) => i.completed).length
  const totalItems = items.length
  const overallPercent = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-brand-600 rounded-full" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t.checklist.title}
        description={t.checklist.subtitle}
      />

      {/* Overall Progress */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
          <span className="text-sm font-medium text-gray-600">
            {totalCompleted} of {totalItems} tasks completed
          </span>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-medium text-gray-500">
          {Math.round(overallPercent)}%
        </p>
      </Card>

      {/* Category Sections */}
      <div className="space-y-4">
        {CATEGORY_ORDER.map((category) => {
          const categoryItems = grouped.get(category) || []
          if (categoryItems.length === 0) return null

          const completedCount = categoryItems.filter((i) => i.completed).length
          const catPercent = (completedCount / categoryItems.length) * 100
          const isCollapsed = collapsedCategories.has(category)
          const colors = CATEGORY_COLORS[category]

          return (
            <Card key={category} className="overflow-hidden !p-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', colors.bg)}>
                    {isCollapsed ? (
                      <ChevronRight size={18} className={colors.text} />
                    ) : (
                      <ChevronDown size={18} className={colors.text} />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-900">
                      {category}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {completedCount} of {categoryItems.length} completed
                    </p>
                  </div>
                </div>
                <span className={cn('text-sm font-semibold', colors.text)}>
                  {Math.round(catPercent)}%
                </span>
              </button>

              {/* Category Progress Bar */}
              <div className="px-5 pb-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500 ease-out', colors.bar)}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
                )}
              >
                <ul className="divide-y divide-gray-100 mx-5 mb-4 mt-3 border border-gray-100 rounded-lg overflow-hidden">
                  {categoryItems.map((item) => {
                    const isDescExpanded = expandedDescriptions.has(item.id)

                    return (
                      <li key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start gap-3 px-4 py-3">
                          {/* Checkbox */}
                          <button
                            onClick={async () => await updateChecklistItem(item.id, !item.completed)}
                            className="mt-0.5 shrink-0 transition-transform duration-150 active:scale-90"
                            aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {item.completed ? (
                              <CheckSquare
                                size={20}
                                className="text-green-500 fill-green-500/10 transition-colors duration-200"
                              />
                            ) : (
                              <Square
                                size={20}
                                className="text-gray-300 hover:text-gray-400 transition-colors duration-200"
                              />
                            )}
                          </button>

                          {/* Label & Description */}
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => toggleDescription(item.id)}
                              className="w-full text-left flex items-center gap-1.5"
                            >
                              <span
                                className={cn(
                                  'text-sm transition-all duration-200',
                                  item.completed
                                    ? 'line-through text-gray-400'
                                    : 'text-gray-800 font-medium'
                                )}
                              >
                                {item.label}
                              </span>
                              {item.description && (
                                <ChevronDown
                                  size={14}
                                  className={cn(
                                    'shrink-0 text-gray-400 transition-transform duration-200',
                                    isDescExpanded && 'rotate-180'
                                  )}
                                />
                              )}
                            </button>

                            {item.description && (
                              <div
                                className={cn(
                                  'overflow-hidden transition-all duration-200 ease-in-out',
                                  isDescExpanded
                                    ? 'max-h-40 opacity-100 mt-1.5'
                                    : 'max-h-0 opacity-0'
                                )}
                              >
                                <p className="text-xs text-gray-500 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
