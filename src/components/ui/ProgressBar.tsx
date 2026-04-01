'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  label?: string
  className?: string
}

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-surface-600">{label}</span>
          <span className="text-xs font-mono font-medium text-surface-500">{Math.round(clamped)}%</span>
        </div>
      )}
      {!label && (
        <div className="flex justify-end mb-1.5">
          <span className="text-xs font-mono font-medium text-surface-500">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
