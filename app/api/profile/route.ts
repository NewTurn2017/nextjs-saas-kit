import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/utils/supabase/server';
import { auth } from "@/lib/auth";

export async function GET() {
	try {
		const supabase = await getSupabaseClient();
		const session = await auth();

		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

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

		return NextResponse.json({
			userData
		});
	} catch (error) {
		console.error('Error in profile API route:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
} 