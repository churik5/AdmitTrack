'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outlined'
}

// Paper-card — double hairline frame (outer border + inset ring) evoking
// a matted print. Hover lifts a single press with a crimson inner-ring accent.
export default function Card({ children, className, onClick, variant = 'default' }: CardProps) {
  const variantStyles = {
    default:
      'bg-surface-0/90 backdrop-blur-[2px] border border-ink-900/15 shadow-card ' +
      'dark:bg-surface-800/80 dark:border-surface-700',
    elevated:
      'bg-surface-0 border border-ink-900/20 shadow-elevated ' +
      'dark:bg-surface-800 dark:border-surface-700',
    outlined:
      'bg-transparent border border-ink-900/25 shadow-none ' +
      'dark:border-surface-600',
  }

  return (
    <div
      className={cn(
        'relative rounded-sm p-6 transition-all duration-200 above-paper',
        variantStyles[variant],
        onClick && 'cursor-pointer card-interactive',
        className
      )}
      onClick={onClick}
    >
      {/* Decorative inner rule — hairline inset */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-[1px] border border-ink-900/[0.05] dark:border-surface-100/[0.04]"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
