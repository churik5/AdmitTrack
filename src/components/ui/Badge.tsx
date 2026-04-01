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

export default function Badge({ children, variant, color, className, size = 'sm' }: BadgeProps) {
  const colorClasses = color || (variant ? getStatusColor(variant) : 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300')

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-2xs'
    : 'px-2.5 py-0.5 text-xs'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium tracking-wide uppercase',
        sizeClasses,
        colorClasses,
        className
      )}
    >
      {children}
    </span>
  )
}
