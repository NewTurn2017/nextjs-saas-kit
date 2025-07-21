import { createClient } from "@supabase/supabase-js";
import { Database } from '@/types/database.types'

export function createSupabaseClient(supabaseAccessToken: string) {


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