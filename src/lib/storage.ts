import { BaseEntity, Profile, EntityLink, ChecklistItem } from './types'
import { generateId, now } from './utils'

const PREFIX = 'admittrack_'

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage write failed:', e)
  }
}

// Generic CRUD for any entity collection
export function getAll<T extends BaseEntity>(collection: string): T[] {
  return safeGet<T[]>(collection, [])
}

export function getById<T extends BaseEntity>(collection: string, id: string): T | undefined {
  return getAll<T>(collection).find(item => item.id === id)
}

export function create<T extends BaseEntity>(collection: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
  const items = getAll<T>(collection)
  const newItem = {
    ...data,
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
  } as T
  items.push(newItem)
  safeSet(collection, items)
  return newItem
}

export function update<T extends BaseEntity>(collection: string, id: string, data: Partial<T>): T | undefined {
  const items = getAll<T>(collection)
  const idx = items.findIndex(item => item.id === id)
  if (idx === -1) return undefined
  items[idx] = { ...items[idx], ...data, updatedAt: now() }
  safeSet(collection, items)
  return items[idx]
}

export function remove<T extends BaseEntity>(collection: string, id: string): boolean {
  const items = getAll<T>(collection)
  const filtered = items.filter(item => item.id !== id)
  if (filtered.length === items.length) return false
  safeSet(collection, filtered)
  // Clean up links
  removeAllLinksFor(id)
  return true
}

// Profile (singleton)
const DEFAULT_PROFILE: Profile = {
  name: '',
  email: '',
  highSchool: '',
  city: '',
  state: '',
  graduationYear: new Date().getFullYear() + 1,
  intendedMajors: [],
  gpa: '',
  weightedGpa: '',
  classRank: '',
  testScores: [],
  strengths: '',
  weaknesses: '',
  notes: '',
  onboardingComplete: false,
}

export function getProfile(): Profile {
  return safeGet<Profile>('profile', DEFAULT_PROFILE)
}

export function updateProfile(data: Partial<Profile>): Profile {
  const current = getProfile()
  const updated = { ...current, ...data }
  safeSet('profile', updated)
  return updated
}

// Entity Links
export function getLinks(): EntityLink[] {
  return safeGet<EntityLink[]>('links', [])
}

export function createLink(sourceType: string, sourceId: string, targetType: string, targetId: string): EntityLink {
  const links = getLinks()
  const existing = links.find(
    l => (l.sourceType === sourceType && l.sourceId === sourceId && l.targetType === targetType && l.targetId === targetId) ||
         (l.sourceType === targetType && l.sourceId === targetId && l.targetType === sourceType && l.targetId === sourceId)
  )
  if (existing) return existing
  const link: EntityLink = {
    id: generateId(),
    sourceType: sourceType as EntityLink['sourceType'],
    sourceId,
    targetType: targetType as EntityLink['targetType'],
    targetId,
  }
  links.push(link)
  safeSet('links', links)
  return link
}

export function getLinksFor(entityId: string): EntityLink[] {
  return getLinks().filter(l => l.sourceId === entityId || l.targetId === entityId)
}

export function removeLink(linkId: string): void {
  const links = getLinks().filter(l => l.id !== linkId)
  safeSet('links', links)
}

export function removeAllLinksFor(entityId: string): void {
  const links = getLinks().filter(l => l.sourceId !== entityId && l.targetId !== entityId)
  safeSet('links', links)
}

// Checklist
export function getChecklist(): ChecklistItem[] {
  return safeGet<ChecklistItem[]>('checklist', [])
}

export function initChecklist(items: ChecklistItem[]): void {
  const existing = getChecklist()
  if (existing.length === 0) {
    safeSet('checklist', items)
  }
}

export function updateChecklistItem(id: string, completed: boolean): void {
  const items = getChecklist()
  const idx = items.findIndex(i => i.id === id)
  if (idx !== -1) {
    items[idx].completed = completed
    safeSet('checklist', items)
  }
}
