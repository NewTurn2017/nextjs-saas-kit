import { createClient } from '@supabase/supabase-js'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database.types'
const getSupabaseClient = async () => {
	const session = await auth()

	if (!session?.supabaseAccessToken) {
		redirect('/')
	}
	// 如何 使用 session.supabaseAccessToken 来创建 supabase client
	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			global: {
				headers: {
					Authorization: `Bearer ${session.supabaseAccessToken}`,
				},
			},
		}
	)
}

function createSupabaseAdminClient() {
	// server  api
	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SECRET_KEY!,

	)
}
export { getSupabaseClient, createSupabaseAdminClient }