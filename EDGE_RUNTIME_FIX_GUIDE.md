# Edge Runtime Fix Guide

## Summary

Fixed the Edge runtime error that occurred when clicking magic links from emails. The issue was caused by importing Node.js modules (like `nodemailer`) in contexts where Edge runtime is used.

## Changes Made

### 1. Restructured Auth Configuration

**Before**: All auth configuration was in one file that imported Node.js modules.

**After**: Separated auth configuration into:
- `/lib/auth.config.ts` - Base configuration without Node.js modules (Edge-compatible)
- `/lib/auth.ts` - Full auth setup with email providers (Node.js runtime)
- `/lib/auth-edge.ts` - Edge-compatible auth instance for middleware

### 2. Updated Middleware

Changed from using `getToken` to using the Edge-compatible auth instance:

```typescript
// Before
import { getToken } from "next-auth/jwt"
const token = await getToken({ req: request })

// After
import { auth } from "@/lib/auth-edge"
const session = await auth()
```

### 3. Added JWT Session Strategy

Configured NextAuth to use JWT sessions instead of database sessions for better Edge runtime compatibility:

```typescript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
},
jwt: {
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### 4. Enhanced Session Callbacks

Added proper JWT and session callbacks to handle user data:

```typescript
callbacks: {
  async jwt({ token, user, account }) {
    // Store user data in JWT token
  },
  async session({ session, token }) {
    // Pass user data to session
  }
}
```

## How Magic Link Authentication Works Now

1. **User requests magic link**: Email is sent using Nodemailer (Node.js runtime)
2. **User clicks link in email**: Request hits middleware (Edge runtime)
3. **Middleware validates session**: Uses Edge-compatible auth without Node.js modules
4. **Authentication completes**: User is redirected to the app

## Environment Variables Required

```env
# NextAuth
AUTH_SECRET="your-secret-here"

# Email Configuration (for Gmail SMTP)
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=your-email@gmail.com
```

## Testing

1. Go to `/auth/signin`
2. Enter your email and click "Send magic link"
3. Check your email for the magic link
4. Click the link in the email
5. You should be authenticated and redirected to the app

## Troubleshooting

If you still see token verification errors:
1. Clear your browser cookies
2. Make sure your `AUTH_SECRET` is properly set
3. Check that the magic link hasn't expired (24 hours validity)