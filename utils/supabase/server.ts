import { createClient } from '@supabase/supabase-js'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database.types'

// For server components that need user-specific access
const getSupabaseClient = async () => {
	const session = await auth()

	if (!session?.supabaseAccessToken) {
		// Only use redirect in server components, not API routes
		redirect('/')
	}
	
	// Use session.supabaseAccessToken to create supabase client
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

// For API routes - returns null if no session
const getSupabaseClientForApi = async () => {
	const session = await auth()

	if (!session?.supabaseAccessToken) {
		return null
	}
	
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
export { getSupabaseClient, getSupabaseClientForApi, createSupabaseAdminClient }