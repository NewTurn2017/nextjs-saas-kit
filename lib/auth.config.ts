import { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// Use our custom adapter that supports public schema
import { SupabaseAdapter } from "./auth/supabase-adapter"
import config from "@/config"
//read https://github.com/nextauthjs/next-auth/issues/8357O

const authConfig = {
	secret: process.env.AUTH_SECRET,
	// Debug mode disabled for production
	debug: process.env.NODE_ENV === 'development',
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
	providers: [
		GoogleProvider({
			allowDangerousEmailAccountLinking: true,
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		// Email providers are added in auth.ts to avoid Edge runtime issues
	],
	// Use our custom adapter that supports public schema
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SECRET_KEY!,
	}),
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	jwt: {
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					userId: user.id,
				}
			}

			return token
		},
		async session({ session, token }) {
			// Send properties to the client
			session.user = {
				...session.user,
				id: token.userId as string,
			}

			// Create Supabase JWT if secret is available
			const signingSecret = process.env.SUPABASE_JWT_SECRET
			if (signingSecret) {
				const payload = {
					aud: "authenticated",
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: token.userId as string,
					email: token.email,
					role: "authenticated",
				}

				const secretKey = new TextEncoder().encode(signingSecret)
				const jose = await import('jose')
				session.supabaseAccessToken = await new jose.SignJWT(payload)
					.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
					.sign(secretKey)
			}

			return session
		},
	},
} satisfies NextAuthConfig

export default authConfig