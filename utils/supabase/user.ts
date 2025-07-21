// 从Clerk用户数据提取Supabase用户数据的函数
export function extractUserDataForSupabase(clerkUser: any) {
	if (!clerkUser || typeof clerkUser !== 'object') {
		throw new Error('Invalid clerk user data');
	}

	const now = new Date().toISOString();

	return {
		id: clerkUser.id || '',
		email: clerkUser.email_addresses?.[0]?.email_address || null,
		user_name: clerkUser.username || '',
		first_name: clerkUser.first_name || '',
		last_name: clerkUser.last_name || '',
		metadata: {
			image_url: clerkUser.image_url || '',
			external_accounts: clerkUser.external_accounts?.map((account: any) => ({
				provider: account.provider,
				provider_user_id: account.provider_user_id,
				username: account.username
			})) || []
		},
		created_at: clerkUser.created_at ? new Date(clerkUser.created_at).toISOString() : now,
		updated_at: clerkUser.updated_at ? new Date(clerkUser.updated_at).toISOString() : now
	};
}
