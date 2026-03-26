'use client'

import { createClient } from './client'
import { generateId, now } from '../utils'
import { BaseEntity, Profile, EntityLink, ChecklistItem } from '../types'

function getSupabase() {
  return createClient()
}

// ── Generic CRUD ──────────────────────────────────────────────

export async function getAll<T extends BaseEntity>(
  collection: string,
  userId: string
): Promise<T[]> {
  const { data, error } = await getSupabase()
    .from(collection)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching ${collection}:`, error)
    return []
  }

  return (data || []).map(mapFromDb) as T[]
}

export async function getById<T extends BaseEntity>(
  collection: string,
  id: string,
  userId: string
): Promise<T | undefined> {
  const { data, error } = await getSupabase()
    .from(collection)
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error || !data) return undefined
  return mapFromDb(data) as T
}

export async function create<T extends BaseEntity>(
  collection: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  userId: string
): Promise<T> {
  const id = generateId()
  const timestamp = now()
  const row = mapToDb({
    ...data,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  }, userId)

  const { data: inserted, error } = await getSupabase()
    .from(collection)
    .insert(row)
    .select()
    .single()

  if (error) {
    console.error(`Error creating in ${collection}:`, error)
    // Return a local copy as fallback
    return { ...data, id, createdAt: timestamp, updatedAt: timestamp } as T
  }

  return mapFromDb(inserted) as T
}

export async function update<T extends BaseEntity>(
  collection: string,
  id: string,
  data: Partial<T>,
  userId: string
): Promise<T | undefined> {
  const updates = mapToDb({ ...data, updatedAt: now() }, userId)
  // Remove user_id from updates — it shouldn't change
  delete updates.user_id

  const { data: updated, error } = await getSupabase()
    .from(collection)
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error(`Error updating ${collection}:`, error)
    return undefined
  }

  return mapFromDb(updated) as T
}

export async function remove(
  collection: string,
  id: string,
  userId: string
): Promise<boolean> {
  const { error } = await getSupabase()
    .from(collection)
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error(`Error deleting from ${collection}:`, error)
    return false
  }

  // Clean up links
  await removeAllLinksFor(id, userId)
  return true
}

// ── Profile (singleton per user) ──────────────────────────────

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

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await getSupabase()
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) return { ...DEFAULT_PROFILE }

  return {
    name: data.name || '',
    email: data.email || '',
    highSchool: data.high_school || '',
    city: data.city || '',
    state: data.state || '',
    graduationYear: data.graduation_year || new Date().getFullYear() + 1,
    intendedMajors: data.intended_majors || [],
    gpa: data.gpa || '',
    weightedGpa: data.weighted_gpa || '',
    classRank: data.class_rank || '',
    testScores: data.test_scores || [],
    strengths: data.strengths || '',
    weaknesses: data.weaknesses || '',
    notes: data.notes || '',
    onboardingComplete: data.onboarding_complete || false,
  }
}

export async function updateProfile(
  data: Partial<Profile>,
  userId: string
): Promise<Profile> {
  const dbData: Record<string, unknown> = { user_id: userId }

  if (data.name !== undefined) dbData.name = data.name
  if (data.email !== undefined) dbData.email = data.email
  if (data.highSchool !== undefined) dbData.high_school = data.highSchool
  if (data.city !== undefined) dbData.city = data.city
  if (data.state !== undefined) dbData.state = data.state
  if (data.graduationYear !== undefined) dbData.graduation_year = data.graduationYear
  if (data.intendedMajors !== undefined) dbData.intended_majors = data.intendedMajors
  if (data.gpa !== undefined) dbData.gpa = data.gpa
  if (data.weightedGpa !== undefined) dbData.weighted_gpa = data.weightedGpa
  if (data.classRank !== undefined) dbData.class_rank = data.classRank
  if (data.testScores !== undefined) dbData.test_scores = data.testScores
  if (data.strengths !== undefined) dbData.strengths = data.strengths
  if (data.weaknesses !== undefined) dbData.weaknesses = data.weaknesses
  if (data.notes !== undefined) dbData.notes = data.notes
  if (data.onboardingComplete !== undefined) dbData.onboarding_complete = data.onboardingComplete

  await getSupabase()
    .from('profiles')
    .upsert(dbData, { onConflict: 'user_id' })

  return getProfile(userId)
}

// ── Entity Links ──────────────────────────────────────────────

export async function getLinks(userId: string): Promise<EntityLink[]> {
  const { data } = await getSupabase()
    .from('entity_links')
    .select('*')
    .eq('user_id', userId)

  return (data || []).map((l: Record<string, string>) => ({
    id: l.id,
    sourceType: l.source_type,
    sourceId: l.source_id,
    targetType: l.target_type,
    targetId: l.target_id,
  })) as EntityLink[]
}

export async function createLink(
  sourceType: string,
  sourceId: string,
  targetType: string,
  targetId: string,
  userId: string
): Promise<EntityLink> {
  const id = generateId()
  await getSupabase().from('entity_links').insert({
    id,
    user_id: userId,
    source_type: sourceType,
    source_id: sourceId,
    target_type: targetType,
    target_id: targetId,
  })

  return {
    id,
    sourceType: sourceType as EntityLink['sourceType'],
    sourceId,
    targetType: targetType as EntityLink['targetType'],
    targetId,
  }
}

export async function getLinksFor(entityId: string, userId: string): Promise<EntityLink[]> {
  const { data } = await getSupabase()
    .from('entity_links')
    .select('*')
    .eq('user_id', userId)
    .or(`source_id.eq.${entityId},target_id.eq.${entityId}`)

  return (data || []).map((l: Record<string, string>) => ({
    id: l.id,
    sourceType: l.source_type,
    sourceId: l.source_id,
    targetType: l.target_type,
    targetId: l.target_id,
  })) as EntityLink[]
}

export async function removeLink(linkId: string, userId: string): Promise<void> {
  await getSupabase().from('entity_links').delete().eq('id', linkId).eq('user_id', userId)
}

export async function removeAllLinksFor(entityId: string, userId: string): Promise<void> {
  await getSupabase()
    .from('entity_links')
    .delete()
    .eq('user_id', userId)
    .or(`source_id.eq.${entityId},target_id.eq.${entityId}`)
}

// ── Checklist ─────────────────────────────────────────────────

export async function getChecklist(userId: string): Promise<ChecklistItem[]> {
  const { data } = await getSupabase()
    .from('checklist_items')
    .select('*')
    .eq('user_id', userId)
    .order('category')

  return (data || []).map((item: Record<string, unknown>) => ({
    id: item.id as string,
    category: item.category as string,
    label: item.label as string,
    completed: item.completed as boolean,
    description: item.description as string,
  }))
}

export async function initChecklist(items: ChecklistItem[], userId: string): Promise<void> {
  const existing = await getChecklist(userId)
  if (existing.length > 0) return

  const rows = items.map((item) => ({
    id: item.id,
    user_id: userId,
    category: item.category,
    label: item.label,
    completed: item.completed,
    description: item.description,
  }))

  await getSupabase().from('checklist_items').insert(rows)
}

export async function updateChecklistItem(
  id: string,
  completed: boolean,
  userId: string
): Promise<void> {
  await getSupabase()
    .from('checklist_items')
    .update({ completed })
    .eq('id', id)
    .eq('user_id', userId)
}

// ── Helpers: camelCase ↔ snake_case mapping ───────────────────

function mapToDb(obj: Record<string, unknown>, userId: string): Record<string, unknown> {
  const result: Record<string, unknown> = { user_id: userId }

  for (const [key, value] of Object.entries(obj)) {
    if (key === 'id') {
      result.id = value
      continue
    }
    const snakeKey = camelToSnake(key)
    result[snakeKey] = value
  }

  return result
}

function mapFromDb(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(row)) {
    if (key === 'user_id') continue
    const camelKey = snakeToCamel(key)
    result[camelKey] = value
  }

  return result
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}
