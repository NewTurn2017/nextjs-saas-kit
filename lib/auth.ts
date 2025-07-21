import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"
import Nodemailer from "next-auth/providers/nodemailer"
import { createTransport } from "nodemailer"
import { text } from "@/lib/authSendRequest"
import { VerificationEmail } from "@/components/email/VerificationEmail"
import { render } from '@react-email/render';


// Extend the Session type to include supabaseAccessToken
declare module 'next-auth' {
	interface Session {
		supabaseAccessToken?: string
	}
}

const handler = NextAuth({
	...authConfig,
	providers: [
		...authConfig.providers,
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
			sendVerificationRequest: async function ({ identifier: email, url, provider, theme }) {
				const { host } = new URL(url)
				const transport = createTransport(provider.server)

				const result = await transport.sendMail({
					to: email,
					from: provider.from,
					subject: `Login Link - ${host}`,
					text: text({ url, host }),
					html: await render(VerificationEmail({ url, host })),
				})

				const failed = result.rejected.concat(result.pending).filter(Boolean)
				if (failed.length) {
					throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
				}
			}
		}),
	],
})

export const { auth, signIn, signOut } = handler
export const { GET, POST } = handler.handlers