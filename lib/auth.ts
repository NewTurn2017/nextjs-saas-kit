import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"
import Nodemailer from "next-auth/providers/nodemailer"
import Resend from "next-auth/providers/resend"
import { createTransport } from "nodemailer"
import { sendVerificationRequest, html, text } from "@/lib/authSendRequest"
import config from "@/config"


// Extend the Session type to include supabaseAccessToken
declare module 'next-auth' {
	interface Session {
		supabaseAccessToken?: string
		user: {
			id: string
			email?: string | null
			name?: string | null
			image?: string | null
		}
	}
}

// Add email providers based on configuration
const emailProviders = config.emailProvider === "resend" ? [
	Resend({
		apiKey: process.env.AUTH_RESEND_KEY,
		from: process.env.EMAIL_FROM,
		sendVerificationRequest: async function ({ identifier: email, url, provider, theme }) {
			//@ts-ignore - Ignoring type check here as sendVerificationRequest expects slightly different parameter structure than what Next-Auth provides
			sendVerificationRequest({ identifier: email, url, provider, theme })
		}
	})
] : config.emailProvider === "nodemailer" ? [
	Nodemailer({
		server: {
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT),
			auth: {
				user: process.env.EMAIL_SERVER_USER,
				pass: process.env.EMAIL_SERVER_PASSWORD
			}
		},
		from: process.env.EMAIL_FROM,
		sendVerificationRequest: async function ({ identifier: email, url, provider }) {
			const { host } = new URL(url)
			const transport = createTransport(provider.server)
			await transport.sendMail({
				to: email,
				from: provider.from,
				subject: `Sign in to ${config.metadata.title}`,
				text: text({ url, host }),
				html: html({ url, host, theme: { brandColor: config.theme.colors.primary } }),
			})
		}
	})
] : [];

const handler = NextAuth({
	...authConfig,
	providers: [
		...authConfig.providers,
		...emailProviders,
	],
})

export const { auth, signIn, signOut } = handler
export const { GET, POST } = handler.handlers