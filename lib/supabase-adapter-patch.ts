/**
 * Custom Supabase Adapter for NextAuth that uses public schema
 * Based on @auth/supabase-adapter but with public schema support
 */

import { createClient } from "@supabase/supabase-js"
import type { Adapter } from "next-auth/adapters"

function format<T extends Record<string, any>>(obj: T): T {
  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      delete (obj as any)[key]
    }
    // Convert ISO string dates back to Date objects for NextAuth
    if (typeof value === 'string' && key === 'expires') {
      (obj as any)[key] = new Date(value)
    } else if (typeof value === 'string' && (key === 'emailVerified' || key === 'created_at' || key === 'updated_at')) {
      (obj as any)[key] = new Date(value)
    }
  }
  return obj
}

export function SupabaseAdapter(options: {
  url: string
  secret: string
}): Adapter {
  const { url, secret } = options
  const supabase = createClient(url, secret, {
    // Use public schema instead of next_auth
    db: { schema: "public" },
    global: { headers: { "X-Client-Info": "@auth/supabase-adapter-patched" } },
    auth: { persistSession: false },
  })

  return {
    async createUser(user) {
      const { data, error } = await supabase
        .from("users")
        .insert({
          ...user,
          emailVerified: user.emailVerified?.toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return format(data)
    },
    async getUser(id) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      return format(data)
    },
    async getUserByEmail(email) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      return format(data)
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { data, error } = await supabase
        .from("accounts")
        .select("*, users!inner(*)")
        .match({ provider, providerAccountId })
        .maybeSingle()

      if (error) throw error
      if (!data || !data.users) return null

      return format(data.users)
    },
    async updateUser(user) {
      const { data, error } = await supabase
        .from("users")
        .update({
          ...user,
          emailVerified: user.emailVerified?.toISOString(),
        })
        .eq("id", user.id!)
        .select()
        .single()

      if (error) throw error
      return format(data)
    },
    async deleteUser(userId) {
      const { error } = await supabase.from("users").delete().eq("id", userId)

      if (error) throw error
    },
    async linkAccount(account) {
      const { data, error } = await supabase
        .from("accounts")
        .insert(format(account))
        .select()
        .single()

      if (error) throw error
      return data
    },
    async unlinkAccount({ providerAccountId, provider }) {
      const { error } = await supabase
        .from("accounts")
        .delete()
        .match({ provider, providerAccountId })

      if (error) throw error
    },
    async createSession({ sessionToken, userId, expires }) {
      const { data, error } = await supabase
        .from("sessions")
        .insert({ 
          sessionToken, 
          userId, 
          expires: expires.toISOString() 
        })
        .select()
        .single()

      if (error) throw error
      // Make sure expires is returned as a Date object
      return {
        ...data,
        expires: new Date(data.expires)
      }
    },
    async getSessionAndUser(sessionToken) {
      const { data, error } = await supabase
        .from("sessions")
        .select("*, users!inner(*)")
        .eq("sessionToken", sessionToken)
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      const { users: user, ...session } = data
      return {
        user: format(user),
        session: format(session),
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const { data, error } = await supabase
        .from("sessions")
        .update({ expires: expires?.toISOString(), userId })
        .eq("sessionToken", sessionToken)
        .select()
        .single()

      if (error) throw error
      return format(data)
    },
    async deleteSession(sessionToken) {
      const { error } = await supabase
        .from("sessions")
        .delete()
        .eq("sessionToken", sessionToken)

      if (error) throw error
    },
    async createVerificationToken({ identifier, expires, token }) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .insert({ identifier, expires: expires.toISOString(), token })
        .select()
        .single()

      if (error) throw error
      return format(data)
    },
    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabase
        .from("verification_tokens")
        .delete()
        .match({ identifier, token })
        .select()
        .maybeSingle()

      if (error) throw error
      if (!data) return null

      return format(data)
    },
  }
}