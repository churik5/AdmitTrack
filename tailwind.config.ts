import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Crimson — Harvard oxblood, the dominant accent
        brand: {
          50:  '#faf1f1',
          100: '#f2dcdc',
          200: '#e4b8b8',
          300: '#cd8686',
          400: '#b15858',
          500: '#8f2f2f',
          600: '#791f1f',
          700: '#631818',
          800: '#4e1313',
          900: '#3a0d0d',
          950: '#1f0606',
        },
        // Parchment / ivory paper
        surface: {
          0:   '#fdfaf1',   // pure paper
          50:  '#f8f1e0',   // warm ivory
          100: '#efe6d1',
          200: '#e0d4b8',
          300: '#c4b690',
          400: '#9e916a',
          500: '#6e634a',
          600: '#4a4232',
          700: '#332d22',
          800: '#211d16',
          900: '#14110c',
        },
        // Ink — near-black text
        ink: {
          900: '#14110c',
          800: '#1f1a12',
          700: '#2c2518',
        },
        // Supporting ivy colors (Yale / Dartmouth / parchment gold)
        accent: {
          navy:    '#0f2847',   // Yale blue
          forest:  '#1f3d2c',   // Dartmouth green
          gold:    '#a67c1f',   // parchment gold
          plum:    '#631818',   // alias → crimson
          crimson: '#8f2f2f',
          amber:   '#a67c1f',
          emerald: '#1f3d2c',
          coral:   '#b15858',
          ink:     '#14110c',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif:   ['"EB Garamond"', 'Georgia', 'serif'],
        sans:    ['"Work Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        'masthead': '0.32em',
        'smallcaps': '0.18em',
      },
      boxShadow: {
        'soft':     '0 1px 2px rgba(31, 23, 14, 0.06)',
        'card':     '0 1px 0 rgba(31, 23, 14, 0.04), inset 0 0 0 1px rgba(31, 23, 14, 0.04)',
        'elevated': '0 1px 0 rgba(31, 23, 14, 0.05), 0 8px 24px -12px rgba(31, 23, 14, 0.18)',
        'modal':    '0 12px 48px rgba(31, 23, 14, 0.22), 0 2px 8px rgba(31, 23, 14, 0.1)',
        'ring':     'inset 0 0 0 1px rgba(31, 23, 14, 0.1)',
        'press':    'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 0 rgba(31,23,14,0.15)',
      },
      borderRadius: {
        'xl':  '0.375rem',
        '2xl': '0.5rem',
        '3xl': '0.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 400ms ease-out',
        'slide-up': 'slideUp 400ms cubic-bezier(.2,.7,.2,1)',
        'scale-in': 'scaleIn 220ms ease-out',
        'page-enter': 'pageEnter 350ms cubic-bezier(.2,.7,.2,1)',
        'ornament-draw': 'ornamentDraw 700ms ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pageEnter: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ornamentDraw: {
          from: { transform: 'scaleX(0)', opacity: '0' },
          to: { transform: 'scaleX(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
