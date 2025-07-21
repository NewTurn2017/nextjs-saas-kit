'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

export function useAuth() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadSession() {
			try {
				const response = await fetch('/api/auth/session');
				const sessionData = await response.json();
				setSession(sessionData);
			} catch (error) {
				console.error('Error loading session:', error);
			} finally {
				setLoading(false);
			}
		}

		loadSession();
	}, []);

	return {
		session,
		user: session?.user,
		loading,
	};
} 