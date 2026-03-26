export function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function now(): string {
  return new Date().toISOString()
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateShort(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function isOverdue(dateStr: string): boolean {
  return daysUntil(dateStr) < 0
}

export function wordCount(text: string): number {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

export function truncate(text: string, maxLen: number): string {
  if (!text || text.length <= maxLen) return text || ''
  return text.slice(0, maxLen) + '...'
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getDeadlineColor(days: number): string {
  if (days < 0) return 'text-red-600 bg-red-50'
  if (days <= 3) return 'text-red-600 bg-red-50'
  if (days <= 7) return 'text-orange-600 bg-orange-50'
  if (days <= 14) return 'text-yellow-600 bg-yellow-50'
  if (days <= 30) return 'text-blue-600 bg-blue-50'
  return 'text-gray-600 bg-gray-50'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    researching: 'bg-gray-100 text-gray-700',
    planning: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    submitted: 'bg-purple-100 text-purple-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    waitlisted: 'bg-orange-100 text-orange-700',
    deferred: 'bg-amber-100 text-amber-700',
    withdrawn: 'bg-gray-100 text-gray-500',
    brainstorming: 'bg-purple-100 text-purple-700',
    outlining: 'bg-blue-100 text-blue-700',
    drafting: 'bg-yellow-100 text-yellow-700',
    revising: 'bg-orange-100 text-orange-700',
    polishing: 'bg-teal-100 text-teal-700',
    final: 'bg-green-100 text-green-700',
    idea: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    published: 'bg-emerald-100 text-emerald-700',
    upcoming: 'bg-blue-100 text-blue-700',
    overdue: 'bg-red-100 text-red-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export function statusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export const ACTIVITY_CATEGORIES: Record<string, string> = {
  academic: 'Academic',
  arts: 'Arts',
  athletics: 'Athletics',
  career: 'Career-Oriented',
  community_service: 'Community Service',
  computer_technology: 'Computer / Technology',
  cultural: 'Cultural',
  debate_speech: 'Debate / Speech',
  environmental: 'Environmental',
  family_responsibilities: 'Family Responsibilities',
  journalism_publication: 'Journalism / Publication',
  lgbtq: 'LGBTQ+',
  music: 'Music',
  religious: 'Religious',
  research: 'Research / Science',
  robotics: 'Robotics / Engineering',
  school_spirit: 'School Spirit',
  science_math: 'Science / Math',
  social_justice: 'Social Justice',
  student_govt: 'Student Government',
  volunteering: 'Volunteering',
  work: 'Work (Paid)',
  other: 'Other',
}

export const HONOR_LEVELS: Record<string, string> = {
  school: 'School',
  regional: 'Regional',
  state: 'State',
  national: 'National',
  international: 'International',
}

export const DOCUMENT_CATEGORIES: Record<string, string> = {
  transcript: 'Transcripts',
  certificate: 'Certificates',
  award: 'Awards',
  recommendation: 'Recommendations',
  essay: 'Essays',
  resume: 'Resume / CV',
  project: 'Projects',
  research: 'Research',
  test_score: 'Test Scores',
  financial: 'Financial',
  other: 'Other',
}

export const DEADLINE_TYPES: Record<string, string> = {
  application: 'Application',
  financial_aid: 'Financial Aid',
  scholarship: 'Scholarship',
  test_registration: 'Test Registration',
  document_submission: 'Document Submission',
  interview: 'Interview',
  portfolio: 'Portfolio',
  self_imposed: 'Self-Imposed',
}

export const ESSAY_TYPES: Record<string, string> = {
  personal_statement: 'Personal Statement',
  supplemental: 'Supplemental Essay',
  why_us: 'Why This School',
  community: 'Community',
  challenge: 'Challenge / Setback',
  intellectual_interest: 'Intellectual Interest',
  diversity: 'Diversity',
  activity: 'Activity / Experience',
  other: 'Other',
}

export const APPLICATION_TYPES: Record<string, string> = {
  EA: 'Early Action',
  ED: 'Early Decision',
  ED2: 'Early Decision II',
  REA: 'Restrictive Early Action',
  RD: 'Regular Decision',
  rolling: 'Rolling',
  other: 'Other',
}

export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
  'District of Columbia'
]
