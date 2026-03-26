export type EntityType = 'university' | 'activity' | 'honor' | 'document' | 'deadline' | 'essay' | 'research' | 'note'

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Profile {
  name: string
  email: string
  highSchool: string
  city: string
  state: string
  graduationYear: number
  intendedMajors: string[]
  gpa: string
  weightedGpa: string
  classRank: string
  testScores: TestScore[]
  strengths: string
  weaknesses: string
  notes: string
  onboardingComplete: boolean
}

export interface TestScore {
  id: string
  name: string
  score: string
  date: string
}

export type UniversityStatus = 'researching' | 'planning' | 'in_progress' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted' | 'deferred' | 'withdrawn'

export type ApplicationType = 'EA' | 'ED' | 'ED2' | 'REA' | 'RD' | 'rolling' | 'other'

export interface University extends BaseEntity {
  name: string
  state: string
  website: string
  applicationType: ApplicationType
  status: UniversityStatus
  notes: string
  requirements: Requirement[]
  tags: string[]
}

export interface Requirement {
  id: string
  label: string
  completed: boolean
  notes: string
}

export type ActivityCategory = 'academic' | 'arts' | 'athletics' | 'career' | 'community_service' | 'computer_technology' | 'cultural' | 'debate_speech' | 'environmental' | 'family_responsibilities' | 'journalism_publication' | 'lgbtq' | 'music' | 'religious' | 'research' | 'robotics' | 'school_spirit' | 'science_math' | 'social_justice' | 'student_govt' | 'volunteering' | 'work' | 'other'

export interface Activity extends BaseEntity {
  name: string
  category: ActivityCategory
  organization: string
  role: string
  startDate: string
  endDate: string
  ongoing: boolean
  grades: number[]
  hoursPerWeek: number
  weeksPerYear: number
  description: string
  results: string
  links: string[]
  notes: string
  tags: string[]
}

export type HonorLevel = 'school' | 'regional' | 'state' | 'national' | 'international'

export interface Honor extends BaseEntity {
  title: string
  level: HonorLevel
  issuedBy: string
  date: string
  gradeReceived: number[]
  placement: string
  description: string
  significance: string
  link: string
  notes: string
  tags: string[]
}

export type DocumentCategory = 'transcript' | 'certificate' | 'award' | 'recommendation' | 'essay' | 'resume' | 'project' | 'research' | 'test_score' | 'financial' | 'other'

export interface AppDocument extends BaseEntity {
  name: string
  category: DocumentCategory
  fileName: string
  fileSize: number
  mimeType: string
  dateUploaded: string
  tags: string[]
  relatedTo: string
  comment: string
  fileData?: string
}

export type DeadlineType = 'application' | 'financial_aid' | 'scholarship' | 'test_registration' | 'document_submission' | 'interview' | 'portfolio' | 'self_imposed'

export type DeadlinePriority = 'critical' | 'high' | 'medium' | 'low'

export interface Deadline extends BaseEntity {
  title: string
  date: string
  time: string
  universityId: string
  universityName: string
  type: DeadlineType
  priority: DeadlinePriority
  status: 'upcoming' | 'completed' | 'overdue'
  notes: string
}

export type EssayType = 'personal_statement' | 'supplemental' | 'why_us' | 'community' | 'challenge' | 'intellectual_interest' | 'diversity' | 'activity' | 'other'

export type EssayStatus = 'brainstorming' | 'outlining' | 'drafting' | 'revising' | 'polishing' | 'final'

export interface Essay extends BaseEntity {
  title: string
  type: EssayType
  prompt: string
  wordLimit: number
  status: EssayStatus
  currentContent: string
  versions: EssayVersion[]
  universityIds: string[]
  improvementNotes: string
  tags: string[]
}

export interface EssayVersion {
  id: string
  content: string
  wordCount: number
  savedAt: string
  label: string
}

export type ResearchType = 'research_paper' | 'article' | 'project' | 'independent_study' | 'competition_work' | 'idea'

export type ResearchStatus = 'idea' | 'planning' | 'in_progress' | 'completed' | 'published'

export interface Research extends BaseEntity {
  title: string
  type: ResearchType
  status: ResearchStatus
  description: string
  topic: string
  publishedAt: string
  link: string
  ownContribution: string
  skills: string[]
  findings: string
  notes: string
  tags: string[]
}

export interface Note extends BaseEntity {
  title: string
  content: string
  category: 'general' | 'university' | 'essay' | 'strategy' | 'advice' | 'idea' | 'requirement' | 'plan'
  tags: string[]
  linkedEntities: LinkedEntity[]
}

export interface LinkedEntity {
  type: EntityType
  id: string
  name: string
}

export interface EntityLink {
  id: string
  sourceType: EntityType
  sourceId: string
  targetType: EntityType
  targetId: string
}

export interface ChecklistItem {
  id: string
  category: string
  label: string
  completed: boolean
  description: string
}
