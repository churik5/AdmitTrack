'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { getStatusColor } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: string
  color?: string
  className?: string
  size?: 'sm' | 'md'
}

// Editorial tag — small-caps, thin ruled border, no rounded corners.
// Evokes a bookplate or library catalog label.
export default function Badge({ children, variant, color, className, size = 'sm' }: BadgeProps) {
  const colorClasses =
    color ||
    (variant
      ? getStatusColor(variant)
      : 'bg-surface-100 text-ink-800 dark:bg-surface-800 dark:text-surface-200')

  const sizeClasses =
    size === 'sm' ? 'px-2 py-[2px] text-[10px]' : 'px-2.5 py-1 text-[11px]'

  return (
    <span
      className={cn(
        'inline-flex items-center font-sans font-semibold uppercase',
        'tracking-[0.16em] rounded-[1px] border border-current/25',
        sizeClasses,
        colorClasses,
        className
      )}
    >
      {children}
    </span>
  )
}
