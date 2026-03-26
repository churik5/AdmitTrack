'use client'

import { useState, useEffect, useCallback } from 'react'
import { Profile } from '../types'
import { useAuth } from '../supabase/auth-context'
import * as db from '../supabase/database'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const userId = user?.id

  useEffect(() => {
    if (!userId) {
      setProfile(null)
      setLoading(false)
      return
    }
    db.getProfile(userId).then((p) => {
      setProfile(p)
      setLoading(false)
    })
  }, [userId])

  const updateProfile = useCallback(
    async (data: Partial<Profile>) => {
      if (!userId) return null
      const updated = await db.updateProfile(data, userId)
      setProfile(updated)
      return updated
    },
    [userId]
  )

  return { profile, updateProfile, loading }
}
