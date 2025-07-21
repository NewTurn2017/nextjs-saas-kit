import { createBrowserClient } from '@supabase/ssr'
import { useMemo } from 'react'
import { type Database } from '@/types/database.types'
import { env } from '@/lib/env'

export function useSupabase() {
  const supabase = useMemo(
    () =>
      createBrowserClient<Database>(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
    []
  )

  return supabase
}