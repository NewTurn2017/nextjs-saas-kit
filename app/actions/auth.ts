'use server'

import { signIn, signOut } from "@/lib/auth"

export async function handleSignIn() {
	// magic link and google both 
	await signIn("credentials", { redirectTo: "/app" })
	//redirect to app
	// redirect("/app")
	// await signIn("nodemailer", { redirectTo: "/app" })
}

export async function handleSignOut() {
	await signOut({ redirectTo: "/" })
} 