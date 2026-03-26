'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChecklistItem } from '../types'
import { useAuth } from '../supabase/auth-context'
import * as db from '../supabase/database'

export function useChecklist() {
  const { user } = useAuth()
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)

  const userId = user?.id

  const refresh = useCallback(async () => {
    if (!userId) {
      setItems([])
      setLoading(false)
      return
    }
    const data = await db.getChecklist(userId)
    setItems(data)
    setLoading(false)
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const initChecklist = useCallback(
    async (defaultItems: ChecklistItem[]) => {
      if (!userId) return
      await db.initChecklist(defaultItems, userId)
      await refresh()
    },
    [userId, refresh]
  )

  const updateChecklistItem = useCallback(
    async (id: string, completed: boolean) => {
      if (!userId) return
      await db.updateChecklistItem(id, completed, userId)
      await refresh()
    },
    [userId, refresh]
  )

  return { items, loading, initChecklist, updateChecklistItem, refresh }
}
