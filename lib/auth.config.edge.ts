import { NextAuthConfig } from "next-auth"

// Edge-compatible auth config (no Node.js modules)
export const authConfigEdge = {
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
	providers: [], // Providers will be added in the main auth config
	callbacks: {},
} satisfies NextAuthConfig

export default authConfigEdge