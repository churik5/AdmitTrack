'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outlined'
}

// Paper-card with bookplate corners — hairline ornamental L-brackets at
// the top corners, warm parchment fill, gentle rounded edges (not rigid).
export default function Card({ children, className, onClick, variant = 'default' }: CardProps) {
  const variantStyles = {
    default:
      'bg-surface-0/95 backdrop-blur-[2px] border border-ink-900/15 ' +
      'shadow-[0_1px_0_rgba(31,23,14,0.04),0_8px_20px_-16px_rgba(31,23,14,0.2)] ' +
      'dark:bg-[#241e15] dark:border-[#3d3425] ' +
      'dark:shadow-[0_1px_0_rgba(0,0,0,0.35),inset_0_1px_0_rgba(237,227,204,0.04)]',
    elevated:
      'bg-surface-0 border border-ink-900/20 shadow-elevated ' +
      'dark:bg-[#2a2319] dark:border-[#48402e]',
    outlined:
      'bg-transparent border border-ink-900/25 shadow-none ' +
      'dark:border-surface-600',
  }

  return (
    <div
      className={cn(
        'relative rounded-md p-6 transition-all duration-300 above-paper group',
        variantStyles[variant],
        onClick && 'cursor-pointer card-interactive',
        className
      )}
      onClick={onClick}
    >
      {/* Bookplate corners — hairline L-brackets in crimson, top-left + top-right */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-l border-t border-brand-700/50 dark:border-brand-600/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-brand-700 dark:group-hover:border-brand-500"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-r border-t border-brand-700/50 dark:border-brand-600/60 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-brand-700 dark:group-hover:border-brand-500"
      />
      {/* Decorative inner frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[4px] rounded-[3px] border border-ink-900/[0.05] dark:border-surface-100/[0.045]"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
