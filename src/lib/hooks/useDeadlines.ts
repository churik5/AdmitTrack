'use client'

import { Deadline } from '../types'
import { useCollection } from './useLocalStorage'

export function useDeadlines() {
  return useCollection<Deadline>('deadlines')
}
