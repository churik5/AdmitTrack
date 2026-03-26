'use client'

import { Essay } from '../types'
import { useCollection } from './useLocalStorage'

export function useEssays() {
  return useCollection<Essay>('essays')
}
