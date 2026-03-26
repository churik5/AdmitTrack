'use client'

import { LucideIcon } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200/60 flex items-center justify-center mb-5">
        <Icon size={28} className="text-surface-400" />
      </div>
      <h3 className="text-xl font-display text-surface-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-surface-500 max-w-sm mb-8 leading-relaxed">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
