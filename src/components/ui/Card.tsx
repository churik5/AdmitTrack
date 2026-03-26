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
    default: 'bg-white/80 backdrop-blur-sm border border-surface-200/80 shadow-card',
    elevated: 'bg-white border border-surface-200/60 shadow-elevated',
    outlined: 'bg-transparent border border-surface-200 shadow-none',
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
