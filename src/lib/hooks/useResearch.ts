'use client'

import { Research } from '../types'
import { useCollection } from './useLocalStorage'

export function useResearch() {
  return useCollection<Research>('research')
}
