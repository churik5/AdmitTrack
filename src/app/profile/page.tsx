'use client'

import { useState, useEffect, useMemo } from 'react'
import { useProfile } from '@/lib/hooks/useProfile'
import { TestScore } from '@/lib/types'
import { generateId, US_STATES } from '@/lib/utils'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { Save, Plus, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  const { profile, updateProfile, loading } = useProfile()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [highSchool, setHighSchool] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [gpa, setGpa] = useState('')
  const [weightedGpa, setWeightedGpa] = useState('')
  const [classRank, setClassRank] = useState('')
  const [intendedMajors, setIntendedMajors] = useState('')
  const [testScores, setTestScores] = useState<TestScore[]>([])
  const [strengths, setStrengths] = useState('')
  const [weaknesses, setWeaknesses] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!profile) return
    setName(profile.name)
    setEmail(profile.email)
    setHighSchool(profile.highSchool)
    setCity(profile.city)
    setState(profile.state)
    setGraduationYear(profile.graduationYear ? String(profile.graduationYear) : '')
    setGpa(profile.gpa)
    setWeightedGpa(profile.weightedGpa)
    setClassRank(profile.classRank)
    setIntendedMajors(profile.intendedMajors.join(', '))
    setTestScores(profile.testScores || [])
    setStrengths(profile.strengths)
    setWeaknesses(profile.weaknesses)
    setNotes(profile.notes)
  }, [profile])

  const completeness = useMemo(() => {
    if (!profile) return 0
    const fields = [
      name, email, highSchool, city, state,
      graduationYear, gpa, intendedMajors, strengths,
    ]
    const filled = fields.filter(f => f.trim() !== '').length
    const scoreBonus = testScores.length > 0 ? 1 : 0
    return Math.round(((filled + scoreBonus) / (fields.length + 1)) * 100)
  }, [name, email, highSchool, city, state, graduationYear, gpa, intendedMajors, strengths, testScores, profile])

  function addTestScore() {
    setTestScores(prev => [...prev, { id: generateId(), name: '', score: '', date: '' }])
  }

  function removeTestScore(id: string) {
    setTestScores(prev => prev.filter(t => t.id !== id))
  }

  function updateTestScore(id: string, field: keyof TestScore, value: string) {
    setTestScores(prev =>
      prev.map(t => (t.id === id ? { ...t, [field]: value } : t))
    )
  }

  async function handleSave() {
    await updateProfile({
      name: name.trim(),
      email: email.trim(),
      highSchool: highSchool.trim(),
      city: city.trim(),
      state,
      graduationYear: graduationYear ? parseInt(graduationYear) : new Date().getFullYear() + 1,
      gpa: gpa.trim(),
      weightedGpa: weightedGpa.trim(),
      classRank: classRank.trim(),
      intendedMajors: intendedMajors
        .split(',')
        .map(m => m.trim())
        .filter(Boolean),
      testScores,
      strengths: strengths.trim(),
      weaknesses: weaknesses.trim(),
      notes: notes.trim(),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

  return (
    <div>
      <PageHeader title="Applicant Profile" description="Manage your personal information and academic details." />

      {/* Profile Completeness */}
      <Card className="mb-6">
        <ProgressBar value={completeness} label="Profile Completeness" />
      </Card>

      {/* Personal Information */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">High School</label>
            <input type="text" value={highSchool} onChange={e => setHighSchool(e.target.value)} className={inputClass} placeholder="School name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} className={inputClass} placeholder="City" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)} className={`${inputClass} bg-white`}>
              <option value="">Select state</option>
              {US_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
            <select value={graduationYear} onChange={e => setGraduationYear(e.target.value)} className={`${inputClass} bg-white`}>
              <option value="">Select year</option>
              {[2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Unweighted)</label>
            <input type="text" value={gpa} onChange={e => setGpa(e.target.value)} className={inputClass} placeholder="e.g. 3.85" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Weighted)</label>
            <input type="text" value={weightedGpa} onChange={e => setWeightedGpa(e.target.value)} className={inputClass} placeholder="e.g. 4.25" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Rank</label>
            <input type="text" value={classRank} onChange={e => setClassRank(e.target.value)} className={inputClass} placeholder="e.g. 5/450" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Intended Majors</label>
          <input
            type="text"
            value={intendedMajors}
            onChange={e => setIntendedMajors(e.target.value)}
            className={inputClass}
            placeholder="Comma-separated, e.g. Computer Science, Mathematics"
          />
          <p className="text-xs text-gray-400 mt-1">Separate multiple majors with commas</p>
        </div>
      </Card>

      {/* Test Scores */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Test Scores</h2>
          <Button variant="secondary" size="sm" icon={<Plus size={14} />} onClick={addTestScore}>
            Add Score
          </Button>
        </div>
        {testScores.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No test scores added yet.</p>
        ) : (
          <div className="space-y-3">
            {testScores.map(ts => (
              <div key={ts.id} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Test Name</label>
                  <input
                    type="text"
                    value={ts.name}
                    onChange={e => updateTestScore(ts.id, 'name', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. SAT, ACT, AP Biology"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Score</label>
                  <input
                    type="text"
                    value={ts.score}
                    onChange={e => updateTestScore(ts.id, 'score', e.target.value)}
                    className={inputClass}
                    placeholder="1520"
                  />
                </div>
                <div className="w-36">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={ts.date}
                    onChange={e => updateTestScore(ts.id, 'date', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button
                  onClick={() => removeTestScore(ts.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Personal Reflections */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Reflections</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Strengths</label>
            <textarea
              value={strengths}
              onChange={e => setStrengths(e.target.value)}
              className={`${inputClass} h-24 resize-y`}
              placeholder="What are your greatest strengths as a student and person?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weaknesses / Areas for Growth</label>
            <textarea
              value={weaknesses}
              onChange={e => setWeaknesses(e.target.value)}
              className={`${inputClass} h-24 resize-y`}
              placeholder="What areas would you like to improve?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className={`${inputClass} h-24 resize-y`}
              placeholder="Any other information you want to remember..."
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3 justify-end">
        {saved && (
          <span className="text-sm text-green-600 font-medium">Profile saved!</span>
        )}
        <Button onClick={handleSave} icon={<Save size={16} />}>
          Save Profile
        </Button>
      </div>
    </div>
  )
}
