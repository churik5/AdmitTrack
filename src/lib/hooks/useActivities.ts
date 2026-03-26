'use client'

import { Activity } from '../types'
import { useCollection } from './useLocalStorage'

export function useActivities() {
  return useCollection<Activity>('activities')
}
