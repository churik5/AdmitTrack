'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

// Editorial search — ink underline, italic placeholder, no boxy fill.
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative group', className)}>
      <Search
        size={15}
        strokeWidth={1.5}
        className="absolute left-0.5 top-1/2 -translate-y-1/2 text-ink-900/50 dark:text-surface-400 pointer-events-none transition-colors group-focus-within:text-brand-700"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-7 pr-8 py-2 font-serif italic text-[15px]',
          'bg-transparent border-0 border-b border-ink-900/30 dark:border-surface-600',
          'placeholder:text-ink-900/40 dark:placeholder:text-surface-500 text-ink-900 dark:text-surface-100',
          'focus:outline-none focus:border-brand-700 dark:focus:border-brand-600',
          'transition-colors duration-200',
        )}
        style={{ fontStyle: value ? 'normal' : 'italic' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-ink-900/40 hover:text-brand-700 transition-colors"
          aria-label="Clear"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
