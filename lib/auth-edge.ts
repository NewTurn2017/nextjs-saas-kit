import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"

// Edge-compatible auth instance without Node.js modules
export const { auth } = NextAuth(authConfig)