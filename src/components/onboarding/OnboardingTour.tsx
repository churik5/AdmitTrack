'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { useProfile } from '@/lib/hooks/useProfile'

interface TourStep {
  titleKey: keyof import('@/lib/i18n/types').Translations['tour']
  descKey: keyof import('@/lib/i18n/types').Translations['tour']
  targetDesktop?: string
  targetMobile?: string
}

const TOUR_STEPS: TourStep[] = [
  { titleKey: 'welcomeTitle', descKey: 'welcomeDesc' },
  { titleKey: 'dashboardTitle', descKey: 'dashboardDesc', targetDesktop: '[data-tour="dashboard-stats"]', targetMobile: '[data-tour="dashboard-stats"]' },
  { titleKey: 'universitiesTitle', descKey: 'universitiesDesc', targetDesktop: '[data-tour="nav-universities"]', targetMobile: '[data-tour="nav-universities-mobile"]' },
  { titleKey: 'deadlinesTitle', descKey: 'deadlinesDesc', targetDesktop: '[data-tour="nav-deadlines"]', targetMobile: '[data-tour="nav-deadlines-mobile"]' },
  { titleKey: 'doneTitle', descKey: 'doneDesc' },
]

export default function OnboardingTour() {
  const pathname = usePathname()
  const { t } = useI18n()
  const { profile, updateProfile } = useProfile()
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Show tour only once — after registration, when onboardingComplete is false
  useEffect(() => {
    if (pathname !== '/dashboard') return
    if (!profile || profile.onboardingComplete) return
    const timer = setTimeout(() => setActive(true), 600)
    return () => clearTimeout(timer)
  }, [pathname, profile])

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Position spotlight on target element
  const positionSpotlight = useCallback(() => {
    const currentStep = TOUR_STEPS[step]
    const selector = isMobile ? currentStep.targetMobile : currentStep.targetDesktop
    if (!selector) {
      setTargetRect(null)
      return
    }
    const el = document.querySelector(selector)
    if (el) {
      setTargetRect(el.getBoundingClientRect())
    } else {
      setTargetRect(null)
    }
  }, [step, isMobile])

  useEffect(() => {
    if (!active) return
    positionSpotlight()

    const onResize = () => positionSpotlight()
    const onScroll = () => positionSpotlight()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [active, step, positionSpotlight])

  const completeTour = useCallback(() => {
    setActive(false)
    updateProfile({ onboardingComplete: true })
  }, [updateProfile])

  const handleNext = () => {
    if (step === TOUR_STEPS.length - 1) {
      completeTour()
    } else {
      setStep(s => s + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const handleSkip = () => {
    completeTour()
  }

  if (!active || pathname !== '/dashboard') return null

  const currentStep = TOUR_STEPS[step]
  const isFirstStep = step === 0
  const isLastStep = step === TOUR_STEPS.length - 1
  const hasTarget = targetRect !== null

  const pad = 8
  const spotlightStyle = hasTarget
    ? {
        position: 'fixed' as const,
        top: targetRect.top - pad,
        left: targetRect.left - pad,
        width: targetRect.width + pad * 2,
        height: targetRect.height + pad * 2,
        borderRadius: '16px',
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
        zIndex: 9998,
        pointerEvents: 'none' as const,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    : undefined

  // Calculate tooltip position for targeted steps
  const getTooltipStyle = (): React.CSSProperties => {
    if (!hasTarget || isMobile) {
      return {}
    }

    const tooltipWidth = 360
    const gap = 16
    const viewportW = window.innerWidth
    const viewportH = window.innerHeight

    // Try positioning below the target
    let top = targetRect.bottom + pad + gap
    let left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2

    // Clamp horizontally
    if (left < 16) left = 16
    if (left + tooltipWidth > viewportW - 16) left = viewportW - 16 - tooltipWidth

    // If tooltip goes below viewport, position above
    if (top + 200 > viewportH) {
      top = targetRect.top - pad - gap - 200
      if (top < 16) top = 16
    }

    return {
      position: 'fixed',
      top,
      left,
      width: tooltipWidth,
      zIndex: 9999,
    }
  }

  const title = t.tour[currentStep.titleKey] as string
  const desc = t.tour[currentStep.descKey] as string

  return (
    <div className="animate-fade-in">
      {/* Backdrop for non-targeted steps */}
      {!hasTarget && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998]"
          onClick={handleSkip}
        />
      )}

      {/* Spotlight overlay for targeted steps */}
      {hasTarget && spotlightStyle && (
        <div style={spotlightStyle} />
      )}

      {/* Tooltip / Card */}
      {isMobile && hasTarget ? (
        // Mobile: anchored to bottom
        <div
          ref={tooltipRef}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] animate-slide-up"
        >
          <TourCard
            title={title}
            desc={desc}
            step={step}
            total={TOUR_STEPS.length}
            isFirst={isFirstStep}
            isLast={isLastStep}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            t={t}
          />
        </div>
      ) : hasTarget ? (
        // Desktop: positioned near target
        <div
          ref={tooltipRef}
          style={getTooltipStyle()}
          className="animate-scale-in"
        >
          <TourCard
            title={title}
            desc={desc}
            step={step}
            total={TOUR_STEPS.length}
            isFirst={isFirstStep}
            isLast={isLastStep}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            t={t}
          />
        </div>
      ) : (
        // Centered modal card (welcome / done)
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-md animate-scale-in">
            <TourCard
              title={title}
              desc={desc}
              step={step}
              total={TOUR_STEPS.length}
              isFirst={isFirstStep}
              isLast={isLastStep}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
              t={t}
              centered
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface TourCardProps {
  title: string
  desc: string
  step: number
  total: number
  isFirst: boolean
  isLast: boolean
  onNext: () => void
  onBack: () => void
  onSkip: () => void
  t: ReturnType<typeof import('@/lib/i18n').useI18n>['t']
  centered?: boolean
}

function TourCard({ title, desc, step, total, isFirst, isLast, onNext, onBack, onSkip, t, centered }: TourCardProps) {
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl border border-surface-100 dark:border-surface-700 overflow-hidden">
      {/* Gradient accent bar */}
      <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-600" />

      <div className={centered ? 'px-6 py-8 text-center' : 'px-5 py-5'}>
        {/* Title */}
        <h3 className="text-lg font-display text-surface-900 dark:text-surface-100 tracking-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-6">
          {desc}
        </p>

        {/* Step dots */}
        <div className={`flex items-center gap-1.5 mb-5 ${centered ? 'justify-center' : ''}`}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-6 bg-brand-500'
                  : i < step
                  ? 'w-1.5 bg-brand-300 dark:bg-brand-700'
                  : 'w-1.5 bg-surface-200 dark:bg-surface-600'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-surface-400 dark:text-surface-500 tabular-nums">
            {step + 1} {t.tour.stepOf} {total}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {!isFirst && !isLast && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors rounded-xl"
            >
              {t.tour.back}
            </button>
          )}

          <div className="flex-1" />

          {!isLast && (
            <button
              onClick={onSkip}
              className="px-4 py-2 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors rounded-xl"
            >
              {t.tour.skip}
            </button>
          )}

          <button
            onClick={onNext}
            className="px-5 py-2.5 text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 rounded-xl transition-colors shadow-soft"
          >
            {isLast ? t.tour.start : isFirst ? t.tour.next : t.tour.next}
          </button>
        </div>
      </div>
    </div>
  )
}
