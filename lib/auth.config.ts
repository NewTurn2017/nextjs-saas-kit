import NextAuth, { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import Resend from "next-auth/providers/resend"
import { sendVerificationRequest } from "@/lib/authSendRequest"
import config from "@/config"
//read https://github.com/nextauthjs/next-auth/issues/8357O

const authConfig = {
	secret: process.env.AUTH_SECRET,
	providers: [
		GoogleProvider({
			allowDangerousEmailAccountLinking: true,
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		...(config.emailProvider === "resend" ? [
			Resend({
				apiKey: process.env.AUTH_RESEND_KEY,
				from: process.env.EMAIL_FROM,
				sendVerificationRequest: async function ({ identifier: email, url, provider, theme }) {
					//@ts-ignore - Ignoring type check here as sendVerificationRequest expects slightly different parameter structure than what Next-Auth provides
					sendVerificationRequest({ identifier: email, url, provider, theme })
				}
			})
		] : []),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SECRET_KEY!,
	}),
	callbacks: {
		async session({ session, user }) {
			const signingSecret = process.env.SUPABASE_JWT_SECRET

			if (signingSecret) {
				const payload = {
					aud: "authenticated",
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: user.id,
					email: user.email,
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

export const { auth } = NextAuth(authConfig)

export default authConfig