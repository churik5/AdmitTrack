'use client'

import { Note } from '../types'
import { useCollection } from './useLocalStorage'

export function useNotes() {
  return useCollection<Note>('notes')
}
