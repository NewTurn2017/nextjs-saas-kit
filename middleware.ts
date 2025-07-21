import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"

export const config = {
	matcher: ["/app"],
};

const { auth } = NextAuth(authConfig)

export default auth((req) => {
	if (!req.auth) {
		return NextResponse.redirect(new URL("/api/auth/signin", req.url));
	}
});