'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  children?: ReactNode
}

// Academic press aesthetic: crimson ink, parchment secondary, sharp corners,
// small-caps typography, subtle press animation.
const variantStyles: Record<string, string> = {
  primary:
    'bg-brand-700 text-surface-0 border border-brand-900 shadow-press ' +
    'hover:bg-brand-800 active:bg-brand-900 focus:ring-brand-500/30',
  secondary:
    'bg-transparent text-ink-900 border border-ink-900/40 ' +
    'hover:bg-ink-900 hover:text-surface-0 hover:border-ink-900 ' +
    'focus:ring-ink-900/20 ' +
    'dark:text-surface-100 dark:border-surface-400 dark:hover:bg-surface-100 dark:hover:text-ink-900',
  ghost:
    'bg-transparent text-ink-700 border border-transparent ' +
    'hover:text-brand-700 hover:border-brand-700/30 ' +
    'focus:ring-brand-500/20 ' +
    'dark:text-surface-300 dark:hover:text-brand-600',
  danger:
    'bg-[#3a0d0d] text-surface-0 border border-[#1f0606] ' +
    'hover:bg-[#4e1313] active:bg-[#631818] focus:ring-brand-500/30',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-[11px] gap-1.5',
  md: 'px-5 py-2 text-xs gap-2',
  lg: 'px-7 py-3 text-xs gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn-press inline-flex items-center justify-center font-sans font-semibold',
        'uppercase tracking-[0.18em] rounded-sm',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-50',
        'dark:focus:ring-offset-surface-900 disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
