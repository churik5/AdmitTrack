'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NoticeProps {
  children: ReactNode
  kicker?: string
  tone?: 'info' | 'warn' | 'danger'
  className?: string
}

// Editorial sidebar note — italic serif body, small-caps kicker, double
// hairline border. Replaces glowy colored alert banners.
export default function Notice({
  children,
  kicker = 'N.B.',
  tone = 'info',
  className,
}: NoticeProps) {
  const toneBar: Record<string, string> = {
    info: 'bg-accent-gold',
    warn: 'bg-accent-gold',
    danger: 'bg-brand-700',
  }
  const toneKicker: Record<string, string> = {
    info: 'text-ink-700 dark:text-surface-300',
    warn: 'text-[#6b4d12] dark:text-[#d9b872]',
    danger: 'text-brand-700 dark:text-brand-600',
  }

  return (
    <aside
      className={cn(
        'relative flex gap-4 pl-5 pr-5 py-4 above-paper',
        'border-y border-ink-900/20 dark:border-surface-100/12',
        className,
      )}
    >
      {/* Left ruled stub */}
      <span aria-hidden className={cn('absolute left-0 top-0 bottom-0 w-[3px]', toneBar[tone])} />

      <div className="flex-1">
        <span
          className={cn(
            'font-sans font-semibold uppercase text-[10px] tracking-[0.24em] mr-3 align-middle',
            toneKicker[tone],
          )}
        >
          {kicker}
        </span>
        <span className="font-serif italic text-[14px] leading-relaxed text-ink-900 dark:text-surface-200 align-middle">
          {children}
        </span>
      </div>
    </aside>
  )
}
