'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/lib/hooks/useProfile'
import { useI18n } from '@/lib/i18n'
import Button from '@/components/ui/Button'
import { GraduationCap, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const GRADUATION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]

export default function OnboardingPage() {
  const router = useRouter()
  const { updateProfile } = useProfile()
  const { t } = useI18n()

  const FOCUS_OPTIONS = [
    { id: 'universities', label: t.onboarding.focusOptions.universities, emoji: '🏛' },
    { id: 'activities', label: t.onboarding.focusOptions.activities, emoji: '⚡' },
    { id: 'essays', label: t.onboarding.focusOptions.essays, emoji: '✍️' },
    { id: 'deadlines', label: t.onboarding.focusOptions.deadlines, emoji: '📅' },
    { id: 'documents', label: t.onboarding.focusOptions.documents, emoji: '📁' },
    { id: 'honors', label: t.onboarding.focusOptions.honors, emoji: '🏆' },
  ]
  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [intendedMajor, setIntendedMajor] = useState('')
  const [highSchool, setHighSchool] = useState('')
  const [focusAreas, setFocusAreas] = useState<string[]>([])

  function toggleFocus(id: string) {
    setFocusAreas(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  async function handleFinish() {
    await updateProfile({
      name: name.trim(),
      graduationYear: graduationYear ? parseInt(graduationYear) : new Date().getFullYear() + 1,
      intendedMajors: intendedMajor.trim() ? [intendedMajor.trim()] : [],
      highSchool: highSchool.trim(),
      onboardingComplete: true,
    })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-8 shadow-elevated">
              <GraduationCap size={36} className="text-white" />
            </div>
            <h1 className="text-4xl font-display text-surface-900 mb-3 tracking-tight">AdmitTrack</h1>
            <p className="text-lg text-brand-600 font-medium mb-5">
              Your personal workspace for US college admissions
            </p>
            <p className="text-surface-500 mb-10 max-w-md mx-auto leading-relaxed text-sm">
              Organize your extracurricular activities, track application deadlines,
              draft and refine essays, and store important documents — all in one place.
            </p>
            <Button size="lg" onClick={() => setStep(1)} className="px-8">
              Get Started <ArrowRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 1: Basic Profile */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-display text-surface-900 mb-1.5">Tell us about yourself</h2>
            <p className="text-sm text-surface-500 mb-7">
              All fields are optional. You can always update these later in your profile.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Graduation Year</label>
                <select
                  value={graduationYear}
                  onChange={e => setGraduationYear(e.target.value)}
                  className="select-base"
                >
                  <option value="">Select year</option>
                  {GRADUATION_YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Intended Major</label>
                <input
                  type="text"
                  value={intendedMajor}
                  onChange={e => setIntendedMajor(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">High School</label>
                <input
                  type="text"
                  value={highSchool}
                  onChange={e => setHighSchool(e.target.value)}
                  placeholder="e.g. Lincoln High School"
                  className="input-base"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft size={16} /> Back
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  Skip
                </Button>
                <Button onClick={() => setStep(2)}>
                  Next <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Quick Setup */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-display text-surface-900 mb-1.5">What would you like to focus on?</h2>
            <p className="text-sm text-surface-500 mb-7">
              Select the areas most important to you right now. You can explore everything later.
            </p>
            <div className="space-y-2.5">
              {FOCUS_OPTIONS.map(opt => (
                <label
                  key={opt.id}
                  className={cn(
                    'flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200',
                    focusAreas.includes(opt.id)
                      ? 'border-brand-400 bg-brand-50/60 shadow-soft'
                      : 'border-surface-200 hover:bg-surface-50 hover:border-surface-300'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-all duration-200',
                      focusAreas.includes(opt.id)
                        ? 'bg-brand-600 border-brand-600'
                        : 'border-surface-300'
                    )}
                  >
                    {focusAreas.includes(opt.id) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={focusAreas.includes(opt.id)}
                    onChange={() => toggleFocus(opt.id)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-surface-700">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Back
              </Button>
              <Button onClick={handleFinish}>
                Finish Setup <Check size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-12">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                i === step
                  ? 'w-6 h-2 bg-brand-600'
                  : 'w-2 h-2 bg-surface-300'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
