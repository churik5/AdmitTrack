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

// Ivy palette — crimson / navy / forest / gold / ink tones.
// Every status maps into the Ivy gamut to avoid off-theme blues/greens.
const IVY_PARCHMENT = 'bg-surface-100/90 text-ink-700 dark:bg-[#2a2319] dark:text-surface-200'
const IVY_CRIMSON   = 'bg-[#f3d9d9]/80 text-[#631818] dark:bg-[#4e1313]/70 dark:text-[#e4b8b8]'
const IVY_NAVY      = 'bg-[#d9e1ed]/80 text-[#0f2847] dark:bg-[#1a2d4a]/70 dark:text-[#b8c9e0]'
const IVY_FOREST    = 'bg-[#d9e4dc]/80 text-[#1f3d2c] dark:bg-[#1d3328]/80 dark:text-[#b8d4c3]'
const IVY_GOLD      = 'bg-[#ecdcae]/80 text-[#6b4d12] dark:bg-[#3d2d10]/80 dark:text-[#d9b872]'
const IVY_INK_MUTED = 'bg-surface-200/70 text-ink-700/60 dark:bg-[#2a2319] dark:text-surface-500'

export function getDeadlineColor(days: number): string {
  if (days < 0) return IVY_CRIMSON
  if (days <= 3) return IVY_CRIMSON
  if (days <= 7) return IVY_GOLD
  if (days <= 14) return IVY_GOLD
  if (days <= 30) return IVY_NAVY
  return IVY_PARCHMENT
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // University pipeline
    researching: IVY_PARCHMENT,
    planning: IVY_NAVY,
    in_progress: IVY_GOLD,
    submitted: IVY_NAVY,
    accepted: IVY_FOREST,
    rejected: IVY_CRIMSON,
    waitlisted: IVY_GOLD,
    deferred: IVY_GOLD,
    withdrawn: IVY_INK_MUTED,
    // Essay pipeline
    brainstorming: IVY_PARCHMENT,
    outlining: IVY_NAVY,
    drafting: IVY_GOLD,
    revising: IVY_GOLD,
    polishing: IVY_NAVY,
    final: IVY_FOREST,
    // Honor / research
    idea: IVY_PARCHMENT,
    completed: IVY_FOREST,
    published: IVY_FOREST,
    // Deadline
    upcoming: IVY_NAVY,
    overdue: IVY_CRIMSON,
  }
  return colors[status] || IVY_PARCHMENT
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
