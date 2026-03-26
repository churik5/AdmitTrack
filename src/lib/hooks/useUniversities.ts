'use client'

import { University } from '../types'
import { useCollection } from './useLocalStorage'

export function useUniversities() {
  return useCollection<University>('universities')
}
