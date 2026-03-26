import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#dfe8ff',
          200: '#b9cdff',
          300: '#8aabff',
          400: '#5580f0',
          500: '#3b5ccc',
          600: '#2d47a6',
          700: '#233a8a',
          800: '#1c2f6e',
          900: '#162350',
          950: '#0e1630',
        },
        surface: {
          0: '#ffffff',
          50: '#fafaf8',
          100: '#f5f4f0',
          200: '#eceae4',
          300: '#dedad2',
          400: '#c4bfb3',
          500: '#a09889',
          600: '#7c7466',
          700: '#5a5348',
          800: '#3d3832',
          900: '#252220',
        },
        accent: {
          amber: '#d4a039',
          emerald: '#2e9e6e',
          coral: '#d45a3b',
          plum: '#8b5fbf',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card': '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)',
        'elevated': '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'modal': '0 8px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
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
      },
    },
  },
  plugins: [],
}
export default config
