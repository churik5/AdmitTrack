'use client'

import { ReactNode, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay — warm ink */}
      <div
        className="absolute inset-0 bg-[#1a1510]/45 backdrop-blur-[3px] animate-fade-in"
        onClick={onClose}
      />

      {/* Paper sheet */}
      <div
        className={cn(
          'relative w-full animate-slide-up sm:animate-scale-in',
          'bg-surface-0 dark:bg-[#241e15]',
          'border border-ink-900/25 dark:border-[#48402e]',
          'rounded-t-md sm:rounded-md shadow-modal',
          sizeStyles[size],
        )}
      >
        {/* Bookplate corners */}
        <span aria-hidden className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-l border-t border-brand-700/70" />
        <span aria-hidden className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-r border-t border-brand-700/70" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-l border-b border-brand-700/40" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-r border-b border-brand-700/40" />

        {/* Decorative inner frame */}
        <span aria-hidden className="pointer-events-none absolute inset-[6px] rounded-[2px] border border-ink-900/[0.06] dark:border-surface-100/[0.05]" />

        {/* Header — serif title with double hairline & crimson stub */}
        {title && (
          <div className="relative px-7 pt-6 pb-5">
            <p className="kicker text-[9px] mb-2">§ Dialog</p>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-[1.6rem] leading-tight text-ink-900 dark:text-surface-100 font-[500] tracking-tight">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="shrink-0 p-1.5 text-ink-900/45 hover:text-brand-700 transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            {/* Double rule */}
            <div className="absolute left-7 right-7 bottom-[3px] h-px bg-ink-900/25 dark:bg-surface-100/15" />
            <div className="absolute left-7 right-7 bottom-0 h-px bg-ink-900/15 dark:bg-surface-100/10" />
            <span className="absolute bottom-0 left-7 h-[3px] w-10 bg-brand-700" />
          </div>
        )}

        {/* Close button when no title */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-ink-900/45 hover:text-brand-700 transition-colors z-10"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        )}

        {/* Content */}
        <div className="relative px-7 py-5 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
