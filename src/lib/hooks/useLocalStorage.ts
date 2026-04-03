'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { BaseEntity } from '../types'
import { useAuth } from '../supabase/auth-context'
import { createClient } from '../supabase/client'
import * as db from '../supabase/database'
import { mapFromDb } from '../supabase/database'

export function useCollection<T extends BaseEntity>(collectionName: string) {
  const { user } = useAuth()
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const initialLoadDone = useRef(false)

  const userId = user?.id

  const refresh = useCallback(async () => {
    if (!userId) {
      setItems([])
      setLoading(false)
      return
    }
    // Only show skeleton on initial load, not on subsequent refreshes
    if (!initialLoadDone.current) setLoading(true)
    const data = await db.getAll<T>(collectionName, userId)
    setItems(data)
    setLoading(false)
    initialLoadDone.current = true
  }, [collectionName, userId])

  useEffect(() => {
    initialLoadDone.current = false
    refresh()
  }, [refresh])

  // Supabase Realtime subscription for cross-device/tab sync
  useEffect(() => {
    if (!userId) return

    const supabase = createClient()
    const channel = supabase
      .channel(`${collectionName}_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: collectionName,
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          if (payload.eventType === 'INSERT') {
            const newItem = mapFromDb(payload.new) as T
            setItems((prev) => [newItem, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            const updated = mapFromDb(payload.new) as T
            setItems((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            )
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old?.id
            if (deletedId) {
              setItems((prev) => prev.filter((item) => item.id !== deletedId))
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [collectionName, userId])

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
