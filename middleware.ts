import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth-edge"

export const config = {
	matcher: ["/app/:path*"],
};

export async function middleware(request: NextRequest) {
	const session = await auth()

	if (!session) {
		const signInUrl = new URL("/auth/signin", request.url)
		signInUrl.searchParams.set("callbackUrl", request.url)
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
}