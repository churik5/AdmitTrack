'use client'

import { UniversityEvent } from '../types'
import { useCollection } from './useLocalStorage'

export function useUniversityEvents() {
  return useCollection<UniversityEvent>('university_events')
}
