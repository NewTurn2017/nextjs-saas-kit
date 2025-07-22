import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/utils/supabase/server';
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		const session = await auth();
		
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Validate file type
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP and GIF images are allowed.' }, { status: 400 });
		}

		// Validate file size (5MB max)
		if (file.size > 5 * 1024 * 1024) {
			return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
		}

		const supabase = createSupabaseAdminClient();

		// Generate unique file name
		const fileExt = file.name.split('.').pop();
		const fileName = `${userId}/${Date.now()}.${fileExt}`;

		// Upload to Supabase Storage
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(fileName, file, {
				upsert: false,
				contentType: file.type
			});

		if (uploadError) {
			console.error('Error uploading file:', uploadError);
			return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
		}

		// Get public URL
		const { data: { publicUrl } } = supabase.storage
			.from('avatars')
			.getPublicUrl(fileName);

		// Update profile with new avatar URL
		const { error: updateError } = await supabase
			.from('profiles')
			.update({ 
				avatar_url: publicUrl,
				updated_at: new Date().toISOString()
			})
			.eq('id', userId);

		if (updateError) {
			// If update fails, try to insert
			const { error: insertError } = await supabase
				.from('profiles')
				.insert({ 
					id: userId,
					avatar_url: publicUrl
				});

			if (insertError) {
				console.error('Error updating profile:', insertError);
				// Delete uploaded file if profile update fails
				await supabase.storage.from('avatars').remove([fileName]);
				return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
			}
		}

		// Delete old avatar if exists
		const { data: profile } = await supabase
			.from('profiles')
			.select('avatar_url')
			.eq('id', userId)
			.single();

		if (profile?.avatar_url && profile.avatar_url !== publicUrl) {
			const oldFileName = profile.avatar_url.split('/').slice(-2).join('/');
			if (oldFileName.startsWith(userId + '/')) {
				await supabase.storage.from('avatars').remove([oldFileName]);
			}
		}

		return NextResponse.json({ 
			success: true,
			avatarUrl: publicUrl 
		});
	} catch (error) {
		console.error('Error in avatar upload:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		const session = await auth();
		
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
		}

		const supabase = createSupabaseAdminClient();

		// Get current avatar URL
		const { data: profile } = await supabase
			.from('profiles')
			.select('avatar_url')
			.eq('id', userId)
			.single();

		if (profile?.avatar_url) {
			// Extract file path from URL
			const fileName = profile.avatar_url.split('/').slice(-2).join('/');
			
			// Only delete if it's in the user's folder
			if (fileName.startsWith(userId + '/')) {
				const { error: deleteError } = await supabase.storage
					.from('avatars')
					.remove([fileName]);

				if (deleteError) {
					console.error('Error deleting file:', deleteError);
				}
			}
		}

		// Clear avatar URL in profile
		const { error: updateError } = await supabase
			.from('profiles')
			.update({ 
				avatar_url: null,
				updated_at: new Date().toISOString()
			})
			.eq('id', userId);

		if (updateError) {
			console.error('Error updating profile:', updateError);
			return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error in avatar delete:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}