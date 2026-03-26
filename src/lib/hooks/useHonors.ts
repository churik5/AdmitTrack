'use client'

import { Honor } from '../types'
import { useCollection } from './useLocalStorage'

export function useHonors() {
  return useCollection<Honor>('honors')
}
