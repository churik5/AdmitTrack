'use client'

import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-surface-200">
      <nav className="flex gap-0 -mb-px overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200',
              activeTab === tab.id
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-surface-400 hover:text-surface-600 hover:border-surface-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
