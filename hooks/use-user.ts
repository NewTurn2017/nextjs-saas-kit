import { useEffect, useState } from 'react'
import { type User } from '@/types/database.types'

interface UserData {
  user: User | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useUser(): UserData {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/profile')
      
      if (!response.ok) {
        if (response.status === 401) {
          // User is not authenticated
          setUser(null)
          return
        }
        throw new Error('Failed to fetch user')
      }
      
      const data = await response.json()
      setUser(data.userData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return { user, loading, error, refetch: fetchUser }
}