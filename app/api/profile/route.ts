import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/utils/supabase/server';
import { auth } from "@/lib/auth";

export async function GET() {
	try {
		const session = await auth();
		
		// Check if user is authenticated
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		// Use admin client for API routes
		const supabase = createSupabaseAdminClient();

		// Get user data
		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.single();

		if (userError) {
			console.error('Error fetching user data:', userError);
			return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
		}

		// Get profile data
		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.single();

		if (profileError && profileError.code !== 'PGRST116') {
			// PGRST116 is "no rows returned" which is fine for new users
			console.error('Error fetching profile data:', profileError);
			return NextResponse.json({ error: 'Error fetching profile data' }, { status: 500 });
		}

		return NextResponse.json({
			userData,
			profile: profile || null
		});
	} catch (error) {
		console.error('Error in profile API route:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const session = await auth();
		
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		const body = await request.json();
		const { name } = body;

		if (!name || typeof name !== 'string') {
			return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
		}

		const supabase = createSupabaseAdminClient();

		// First, ensure the user exists in public.users table
		const { data: userExists } = await supabase
			.from('users')
			.select('id')
			.eq('id', userId)
			.single();

		if (!userExists) {
			console.error('User not found in public.users table:', userId);
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Check if profile exists
		const { data: existingProfile } = await supabase
			.from('profiles')
			.select('id')
			.eq('id', userId)
			.single();

		let result;

		if (existingProfile) {
			// Update existing profile
			result = await supabase
				.from('profiles')
				.update({ name, updated_at: new Date().toISOString() })
				.eq('id', userId)
				.select()
				.single();
		} else {
			// Create new profile
			result = await supabase
				.from('profiles')
				.insert({ id: userId, name })
				.select()
				.single();
		}

		if (result.error) {
			console.error('Error updating profile:', result.error);
			return NextResponse.json({ error: result.error.message }, { status: 500 });
		}

		return NextResponse.json({ profile: result.data });
	} catch (error) {
		console.error('Error in profile POST:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
} 