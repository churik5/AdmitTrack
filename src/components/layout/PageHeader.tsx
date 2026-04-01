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

export default function PageHeader({
  title,
  description,
  action,
  backHref,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-start gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="mt-1.5 p-1.5 text-surface-400 hover:text-surface-600 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
          >
            <ArrowLeft size={18} />
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-display text-surface-900 tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-surface-500 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
