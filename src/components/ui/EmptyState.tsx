'use client'

import { LucideIcon } from 'lucide-react'
import Button from './Button'
import EngravedIcon, { EngravedIconName } from './EngravedIcon'

interface EmptyStateProps {
  icon?: LucideIcon
  engraved?: EngravedIconName
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

// Editorial empty state — centered fleuron ornament, serif title,
// italic lede. No boxed icon cell.
export default function EmptyState({
  icon: Icon,
  engraved,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      {/* Fleuron divider */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-[14rem]">
        <span className="flex-1 h-px bg-ink-900/20 dark:bg-surface-100/15" />
        <span className="text-brand-700 dark:text-brand-600 text-xl font-italic-display">❦</span>
        <span className="flex-1 h-px bg-ink-900/20 dark:bg-surface-100/15" />
      </div>

      {engraved ? (
        <div className="mb-5">
          <EngravedIcon name={engraved} size={44} withFrame />
        </div>
      ) : Icon ? (
        <Icon
          size={32}
          strokeWidth={1}
          className="text-ink-900/40 dark:text-surface-500 mb-5"
        />
      ) : null}

      <h3 className="font-display text-[1.75rem] leading-tight text-ink-900 dark:text-surface-100 mb-2 font-[500]">
        {title}
      </h3>

      {description && (
        <p className="font-serif italic text-[15px] text-ink-700/70 dark:text-surface-400 max-w-sm mb-8 leading-relaxed">
          — {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}

      {/* Lower fleuron */}
      <div className="flex items-center gap-4 mt-8 w-full max-w-[10rem] opacity-60">
        <span className="flex-1 h-px bg-ink-900/15 dark:bg-surface-100/10" />
        <span className="text-brand-700/60 dark:text-brand-600/60 text-xs">⁂</span>
        <span className="flex-1 h-px bg-ink-900/15 dark:bg-surface-100/10" />
      </div>
    </div>
  )
}
