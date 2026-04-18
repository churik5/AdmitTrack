'use client'

import { cn } from '@/lib/utils'

export type EngravedIconName =
  | 'cap'       // mortarboard — universities
  | 'trophy'    // laurel + cup — honors
  | 'quill'     // quill + inkwell — essays
  | 'scroll'    // bound scroll — documents
  | 'sparks'    // asterism / stars — activities
  | 'book'      // bound codex — guides
  | 'microscope'
  | 'calendar'  // almanac page
  | 'ribbon'    // award ribbon

interface EngravedIconProps {
  name: EngravedIconName
  size?: number
  className?: string
  withFrame?: boolean
}

// Editorial engraving — fine ink lines with crimson accent, drawn to read
// like a steel-engraved dictionary illustration rather than a UI glyph.
export default function EngravedIcon({
  name,
  size = 32,
  className,
  withFrame = false,
}: EngravedIconProps) {
  const INK = 'currentColor'
  const CRIMSON = '#8f2f2f'

  const content = (() => {
    switch (name) {
      case 'cap':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M2 10 L12 5 L22 10 L12 15 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M2 10 L12 5 L22 10 L12 15 Z" />
            {/* Headband */}
            <path d="M6 11.5 L6 16 Q6 18.5 12 18.5 Q18 18.5 18 16 L18 11.5" />
            {/* Tassel cord */}
            <path d="M12 6.5 Q18 7 19.5 10 L19.5 17" stroke={CRIMSON} />
            <circle cx="19.5" cy="18" r="1" fill={CRIMSON} stroke="none" />
            <line x1="19" y1="18.7" x2="18.7" y2="19.8" stroke={CRIMSON} />
            <line x1="19.5" y1="19" x2="19.5" y2="20.2" stroke={CRIMSON} />
            <line x1="20" y1="18.7" x2="20.3" y2="19.8" stroke={CRIMSON} />
            {/* Button */}
            <circle cx="12" cy="6.4" r="0.7" fill={CRIMSON} stroke="none" />
          </g>
        )

      case 'trophy':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Cup */}
            <path d="M8 4 L16 4 L15.5 11 Q15 14 12 14 Q9 14 8.5 11 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M8 4 L16 4 L15.5 11 Q15 14 12 14 Q9 14 8.5 11 Z" />
            {/* Handles */}
            <path d="M8 6 Q5 6.5 5 8 Q5 9.5 7.5 10" />
            <path d="M16 6 Q19 6.5 19 8 Q19 9.5 16.5 10" />
            {/* Laurel crown on cup */}
            <path d="M10 6 Q10.5 7 10.8 6.4" stroke={CRIMSON} />
            <path d="M12 6 Q12.5 7 12.8 6.4" stroke={CRIMSON} />
            <path d="M14 6 Q14.5 7 14.8 6.4" stroke={CRIMSON} />
            {/* Stem + base */}
            <line x1="12" y1="14" x2="12" y2="17" />
            <path d="M8.5 20 L15.5 20" strokeWidth="1.4" />
            <path d="M9 17 L15 17" />
            <line x1="12" y1="17" x2="12" y2="20" />
            {/* Roman numeral I */}
            <text x="12" y="11" fill={CRIMSON} stroke="none" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="5" fontWeight="600">I</text>
          </g>
        )

      case 'quill':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Inkwell */}
            <path d="M4 20 L4 15 L10 15 L10 20 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M4 20 L4 15 L10 15 L10 20 Z" />
            <ellipse cx="7" cy="15" rx="3" ry="0.7" fill={CRIMSON} stroke={CRIMSON} />
            {/* Quill shaft */}
            <path d="M7.5 15 L18 4" />
            {/* Feather barbs */}
            <path d="M8.5 14 Q13 10 12 8" />
            <path d="M10.5 12 Q15 8 14 6" />
            <path d="M12.5 10 Q17 6 16 4.5" />
            {/* Nib */}
            <path d="M7.5 15 L8.5 16 L9 15.5" fill={CRIMSON} stroke="none" />
            {/* Drop */}
            <path d="M8.3 17 Q7.8 17.8 8.3 18.5 Q8.8 17.8 8.3 17 Z" fill={CRIMSON} stroke="none" />
          </g>
        )

      case 'scroll':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Outer scroll shape */}
            <path d="M6 3 L17 3 Q19 3 19 5 L19 19 Q19 21 17 21 L6 21 Q4 21 4 19 L4 5 Q4 3 6 3 Z" fill="currentColor" fillOpacity="0.06" />
            <path d="M6 3 L17 3 Q19 3 19 5 L19 19 Q19 21 17 21 L6 21 Q4 21 4 19 L4 5 Q4 3 6 3 Z" />
            {/* Ruled lines */}
            <line x1="7" y1="8" x2="16" y2="8" />
            <line x1="7" y1="11" x2="16" y2="11" />
            <line x1="7" y1="14" x2="13" y2="14" />
            {/* Wax seal */}
            <circle cx="15" cy="17" r="2" fill={CRIMSON} stroke={CRIMSON} />
            <path d="M14 16.5 L16 17.5 M14 17.5 L16 16.5" stroke="#f8f1e0" />
          </g>
        )

      case 'sparks':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Central 4-point star */}
            <path d="M12 3 L13 10 L20 11 L13 12 L12 19 L11 12 L4 11 L11 10 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M12 3 L13 10 L20 11 L13 12 L12 19 L11 12 L4 11 L11 10 Z" />
            {/* Smaller sparks */}
            <path d="M5 5 L5.5 6.5 L7 7 L5.5 7.5 L5 9 L4.5 7.5 L3 7 L4.5 6.5 Z" fill={CRIMSON} stroke={CRIMSON} />
            <path d="M19 16 L19.5 17.5 L21 18 L19.5 18.5 L19 20 L18.5 18.5 L17 18 L18.5 17.5 Z" fill={CRIMSON} stroke={CRIMSON} />
          </g>
        )

      case 'book':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Bound codex */}
            <path d="M4 5 Q4 4 5 4 L11 4 Q12 4 12 5 L12 20 Q12 19 11 19 L5 19 Q4 19 4 20 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M4 5 Q4 4 5 4 L11 4 Q12 4 12 5 L12 20 Q12 19 11 19 L5 19 Q4 19 4 20 Z" />
            <path d="M20 5 Q20 4 19 4 L13 4 Q12 4 12 5 L12 20 Q12 19 13 19 L19 19 Q20 19 20 20 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M20 5 Q20 4 19 4 L13 4 Q12 4 12 5 L12 20 Q12 19 13 19 L19 19 Q20 19 20 20 Z" />
            {/* Spine crimson band */}
            <line x1="12" y1="4.2" x2="12" y2="19.2" stroke={CRIMSON} strokeWidth="1.2" />
            {/* Text lines */}
            <line x1="6" y1="8" x2="10" y2="8" />
            <line x1="6" y1="10" x2="10" y2="10" />
            <line x1="14" y1="8" x2="18" y2="8" />
            <line x1="14" y1="10" x2="18" y2="10" />
            {/* Bookmark ribbon */}
            <path d="M15.5 4 L15.5 7 L16.5 6 L17.5 7 L17.5 4" fill={CRIMSON} stroke={CRIMSON} />
          </g>
        )

      case 'microscope':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M10 3 L14 3 L14 6 L12 7 L10 6 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M10 3 L14 3 L14 6 L12 7 L10 6 Z" />
            <line x1="12" y1="7" x2="12" y2="12" />
            <circle cx="12" cy="13.5" r="1.5" fill={CRIMSON} stroke={CRIMSON} />
            <path d="M9 12 L15 12" />
            <path d="M9 18 L15 18 L16 20 L8 20 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M9 18 L15 18 L16 20 L8 20 Z" />
            <path d="M10 15 Q7 16 7 18" />
          </g>
        )

      case 'calendar':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M4 6 L20 6 L20 20 L4 20 Z" fill="currentColor" fillOpacity="0.06" />
            <path d="M4 6 L20 6 L20 20 L4 20 Z" />
            <line x1="4" y1="9.5" x2="20" y2="9.5" stroke={CRIMSON} strokeWidth="1.5" />
            <line x1="8" y1="3.5" x2="8" y2="7" />
            <line x1="16" y1="3.5" x2="16" y2="7" />
            <line x1="8" y1="13" x2="10" y2="13" />
            <line x1="12" y1="13" x2="14" y2="13" />
            <line x1="16" y1="13" x2="18" y2="13" />
            <line x1="8" y1="16" x2="10" y2="16" />
            <circle cx="13" cy="16" r="1" fill={CRIMSON} stroke={CRIMSON} />
            <line x1="16" y1="16" x2="18" y2="16" />
          </g>
        )

      case 'ribbon':
        return (
          <g stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <circle cx="12" cy="9" r="5" fill="currentColor" fillOpacity="0.08" />
            <circle cx="12" cy="9" r="5" />
            <circle cx="12" cy="9" r="3" stroke={CRIMSON} />
            <path d="M9 13 L7 21 L10 19 L12 21 L14 19 L17 21 L15 13" fill="currentColor" fillOpacity="0.08" />
            <path d="M9 13 L7 21 L10 19 L12 21 L14 19 L17 21 L15 13" />
            <text x="12" y="10.5" fill={CRIMSON} stroke="none" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="4.5" fontWeight="600">✦</text>
          </g>
        )

      default:
        return null
    }
  })()

  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn('text-ink-900 dark:text-surface-200', className)}
      aria-hidden
    >
      {content}
    </svg>
  )

  if (!withFrame) return svg

  // Framed variant — parchment roundel with crimson hairline ring
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full',
        'bg-surface-0/80 dark:bg-[#241e15]/80',
        'border border-brand-700/40',
        'shadow-[0_1px_0_rgba(31,23,14,0.06)]',
        className,
      )}
      style={{ width: size + 16, height: size + 16 }}
    >
      <span
        aria-hidden
        className="absolute inset-[3px] rounded-full border border-brand-700/15"
      />
      {svg}
    </div>
  )
}
