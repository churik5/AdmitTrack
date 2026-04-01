'use client'

import { FinancialAid } from '../types'
import { useCollection } from './useLocalStorage'

export function useFinancialAid() {
  return useCollection<FinancialAid>('financial_aid')
}
