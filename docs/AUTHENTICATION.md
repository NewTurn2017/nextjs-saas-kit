# Authentication Setup Guide

This project uses NextAuth v5 (beta) with Supabase for authentication.

## Features

- ✅ Google OAuth login
- ✅ Email/Password authentication (optional with Resend)
- ✅ Secure session management
- ✅ Row Level Security (RLS) policies
- ✅ TypeScript support

## Database Setup

1. Run the SQL script in Supabase SQL Editor:
   ```
   scripts/setup-database.sql
   ```

2. This creates all necessary tables in the `public` schema:
   - `users` - User profiles
   - `accounts` - OAuth account connections
   - `sessions` - Active user sessions
   - `verification_tokens` - Email verification tokens

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

5. Add to `.env.local`:
   ```
   AUTH_GOOGLE_ID=your_client_id
   AUTH_GOOGLE_SECRET=your_client_secret
   ```

## Email Authentication Setup (Optional)

If using email authentication with Resend:

1. Get API key from [Resend](https://resend.com)
2. Add to `.env.local`:
   ```
   AUTH_RESEND_KEY=your_resend_api_key
   EMAIL_FROM=noreply@yourdomain.com
   ```

## Custom Supabase Adapter

We use a custom Supabase adapter (`lib/auth/supabase-adapter.ts`) because:
- The official `@auth/supabase-adapter` hardcodes the schema to `next_auth`
- We need to use the `public` schema for compatibility
- It properly handles date conversions for NextAuth

## Protected Routes

Routes under `/app/*` are protected by middleware. Users must be authenticated to access these routes.

## Troubleshooting

### "AdapterError" when logging in
- Ensure all tables are created in the `public` schema
- Verify you're using the `service_role` key (not `anon` key)
- Check that the database URL is correct

### Session not persisting
- Clear browser cookies and try again
- Ensure `AUTH_SECRET` is set in environment variables
- Check that sessions table has proper permissions