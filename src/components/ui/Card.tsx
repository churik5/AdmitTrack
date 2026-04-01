'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outlined'
}

export default function Card({ children, className, onClick, variant = 'default' }: CardProps) {
  const variantStyles = {
    default: 'bg-white/80 backdrop-blur-sm border border-surface-200/80 shadow-card dark:bg-surface-800/80 dark:border-surface-700/80',
    elevated: 'bg-white border border-surface-200/60 shadow-elevated dark:bg-surface-800 dark:border-surface-700/60',
    outlined: 'bg-transparent border border-surface-200 shadow-none dark:border-surface-700',
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-5 transition-all duration-200',
        variantStyles[variant],
        onClick && 'cursor-pointer card-interactive',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
