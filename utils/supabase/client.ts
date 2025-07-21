import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth"
import { Database } from '@/types/database.types'
export async function createSupabaseClient() {

  const session = await auth()
  // @ts-ignore
  const { supabaseAccessToken } = session
  console.log(supabaseAccessToken)

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      }
    },

  )
}
