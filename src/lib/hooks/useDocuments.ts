'use client'

import { AppDocument } from '../types'
import { useCollection } from './useLocalStorage'

export function useDocuments() {
  return useCollection<AppDocument>('documents')
}
