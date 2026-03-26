'use client'

import { useState, useEffect, useCallback } from 'react'
import { BaseEntity } from '../types'
import { useAuth } from '../supabase/auth-context'
import * as db from '../supabase/database'

export function useCollection<T extends BaseEntity>(collectionName: string) {
  const { user } = useAuth()
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  const userId = user?.id

  const refresh = useCallback(async () => {
    if (!userId) {
      setItems([])
      setLoading(false)
      return
    }
    setLoading(true)
    const data = await db.getAll<T>(collectionName, userId)
    setItems(data)
    setLoading(false)
  }, [collectionName, userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const getById = useCallback(
    async (id: string) => {
      if (!userId) return undefined
      return db.getById<T>(collectionName, id, userId)
    },
    [collectionName, userId]
  )

  const create = useCallback(
    async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!userId) throw new Error('Not authenticated')
      const item = await db.create<T>(collectionName, data, userId)
      await refresh()
      return item
    },
    [collectionName, userId, refresh]
  )

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      if (!userId) return undefined
      const item = await db.update<T>(collectionName, id, data, userId)
      await refresh()
      return item
    },
    [collectionName, userId, refresh]
  )

  const remove = useCallback(
    async (id: string) => {
      if (!userId) return false
      const result = await db.remove(collectionName, id, userId)
      await refresh()
      return result
    },
    [collectionName, userId, refresh]
  )

  return { items, loading, getById, create, update, remove, refresh }
}
