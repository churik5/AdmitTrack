'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  backHref?: string
}

// Masthead — small-caps kicker, oversized Cormorant display title,
// italic lede, double hairline rule terminating in a crimson stub.
export default function PageHeader({
  title,
  description,
  action,
  backHref,
}: PageHeaderProps) {
  return (
    <header className="relative mb-10 pb-6 above-paper">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-3 min-w-0">
          {backHref && (
            <Link
              href={backHref}
              aria-label="Back"
              className="mt-3 p-1.5 text-ink-900/50 hover:text-brand-700 rounded-sm transition-colors duration-200"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </Link>
          )}
          <div className="min-w-0">
            <p className="kicker mb-2">§ &nbsp; AdmitTrack Gazette</p>
            <h1 className="font-display text-[2.75rem] md:text-[3.25rem] leading-[0.95] tracking-tight text-ink-900 dark:text-surface-100 [font-weight:500]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 font-serif text-[15px] italic text-ink-700/80 dark:text-surface-300/90 leading-relaxed max-w-2xl">
                — {description}
              </p>
            )}
          </div>
        </div>
        {action && <div className="shrink-0 mt-1">{action}</div>}
      </div>

      {/* Double-rule with crimson stub */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-ink-900/25 dark:bg-surface-100/15" />
      <div className="absolute -bottom-[5px] left-0 right-0 h-px bg-ink-900/15 dark:bg-surface-100/10" />
      <span className="absolute -bottom-[5px] left-0 h-[5px] w-14 bg-brand-700" />
    </header>
  )
}
