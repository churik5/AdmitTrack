'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

// Hairline skeleton — thin ruled dashes instead of grey blocks.
// Evokes a blank column waiting for typesetting.
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative rounded-sm overflow-hidden',
        'bg-gradient-to-r from-transparent via-ink-900/[0.07] to-transparent',
        'dark:from-transparent dark:via-surface-100/[0.06] dark:to-transparent',
        'animate-pulse',
        className,
      )}
    >
      {/* Top + bottom hairline rules to read as typographic blocks */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink-900/10 dark:bg-surface-100/10" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink-900/10 dark:bg-surface-100/10" />
    </div>
  )
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-3 w-3/4', className)} />
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative rounded-md border border-ink-900/15 dark:border-[#3d3425]',
        'bg-surface-0/60 dark:bg-[#241e15]/60 p-6 space-y-3',
        className,
      )}
    >
      {/* Bookplate corners */}
      <span aria-hidden className="absolute top-2 left-2 w-3 h-3 border-l border-t border-brand-700/30" />
      <span aria-hidden className="absolute top-2 right-2 w-3 h-3 border-r border-t border-brand-700/30" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
