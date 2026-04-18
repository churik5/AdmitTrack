'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

interface CrestProps {
  size?: number
  className?: string
}

// Academic medallion — crimson double ring with inscribed text,
// hairline inner circle, centered mortarboard + laurel sprays.
export default function Crest({ size = 96, className }: CrestProps) {
  const reactId = useId()
  const id = ('crest-' + reactId).replace(/[:]/g, '')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn('drop-shadow-[0_4px_10px_rgba(99,24,24,0.25)]', className)}
      aria-hidden
    >
      <defs>
        <path id={id + '-top'} d="M 7,60 A 53,53 0 0 1 113,60" fill="none" />
      </defs>

      {/* Outer crimson ring */}
      <circle cx="60" cy="60" r="58" fill="#8f2f2f" />
      <circle cx="60" cy="60" r="55" fill="#631818" />

      {/* Inner parchment disc */}
      <circle cx="60" cy="60" r="50" fill="#f8f1e0" />

      {/* Hairline inner circles */}
      <circle cx="60" cy="60" r="44" fill="none" stroke="#631818" strokeWidth="0.5" opacity="0.35" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#631818" strokeWidth="0.3" opacity="0.25" />

      {/* Inscribed text — top arc in the crimson band */}
      <text fill="#f8f1e0" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="5.5" fontWeight="600" letterSpacing="2.2">
        <textPath href={'#' + id + '-top'} startOffset="50%" textAnchor="middle">
          · ADMITTRACK · A CHRONICLE OF APPLICATIONS ·
        </textPath>
      </text>

      {/* Bottom inscription inside parchment */}
      <text x="60" y="94" fill="#631818" fontFamily="'Cormorant Garamond', serif" fontSize="5.5" fontWeight="600" letterSpacing="1.5" textAnchor="middle">
        ❦ &nbsp; VERITAS · MMXXVI &nbsp; ❦
      </text>

      {/* Laurel sprigs flanking the cap */}
      <g fill="#1f3d2c" opacity="0.75">
        {/* Left laurel */}
        <path d="M 36,72 Q 32,66 34,58" stroke="#1f3d2c" strokeWidth="0.8" fill="none" />
        <ellipse cx="33" cy="68" rx="2" ry="0.9" transform="rotate(-40 33 68)" />
        <ellipse cx="32" cy="63" rx="2" ry="0.9" transform="rotate(-55 32 63)" />
        <ellipse cx="33" cy="58" rx="2" ry="0.9" transform="rotate(-70 33 58)" />
        {/* Right laurel */}
        <path d="M 84,72 Q 88,66 86,58" stroke="#1f3d2c" strokeWidth="0.8" fill="none" />
        <ellipse cx="87" cy="68" rx="2" ry="0.9" transform="rotate(40 87 68)" />
        <ellipse cx="88" cy="63" rx="2" ry="0.9" transform="rotate(55 88 63)" />
        <ellipse cx="87" cy="58" rx="2" ry="0.9" transform="rotate(70 87 58)" />
      </g>

      {/* Mortarboard — ink */}
      <g transform="translate(60 60)">
        {/* Cap top — diamond */}
        <polygon points="-18,-2 0,-12 18,-2 0,8" fill="#1f1a12" />
        {/* Inner highlight line */}
        <polygon points="-14,-2 0,-9 14,-2 0,5" fill="none" stroke="#631818" strokeWidth="0.4" opacity="0.5" />
        {/* Headband */}
        <path d="M -11,-1 Q -11,4 -10,7 L 10,7 Q 11,4 11,-1 Z" fill="#14110c" />
        {/* Button */}
        <circle cx="0" cy="-4.5" r="1.3" fill="#a67c1f" />
        {/* Tassel cord */}
        <path d="M 0,-4.5 Q 10,-2 14,4 L 14,11" stroke="#8f2f2f" strokeWidth="0.8" fill="none" />
        {/* Tassel bulb */}
        <circle cx="14" cy="11.5" r="1.6" fill="#8f2f2f" />
        <line x1="13.2" y1="12.5" x2="13" y2="14" stroke="#8f2f2f" strokeWidth="0.5" />
        <line x1="14" y1="13" x2="14" y2="14.5" stroke="#8f2f2f" strokeWidth="0.5" />
        <line x1="14.8" y1="12.5" x2="15" y2="14" stroke="#8f2f2f" strokeWidth="0.5" />
      </g>
    </svg>
  )
}
