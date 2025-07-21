-- Fix NextAuth tables - Create in public schema
-- SupabaseAdapter only works with public schema

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.sessions CASCADE;
DROP TABLE IF EXISTS public.verification_tokens CASCADE;

-- Drop next_auth schema tables if they exist
DROP SCHEMA IF EXISTS next_auth CASCADE;

-- Create users table
CREATE TABLE public.users (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

-- Create accounts table
CREATE TABLE public.accounts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Create sessions table
CREATE TABLE public.sessions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Create verification_tokens table
CREATE TABLE public.verification_tokens (
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);

-- Grant permissions
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.accounts TO service_role;
GRANT ALL ON public.sessions TO service_role;
GRANT ALL ON public.verification_tokens TO service_role;

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create uid function for RLS policies
CREATE OR REPLACE FUNCTION public.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;

-- Create policies for users table
CREATE POLICY "Can view own user data." ON public.users 
    FOR SELECT USING (public.uid() = id);
    
CREATE POLICY "Can update own user data." ON public.users 
    FOR UPDATE USING (public.uid() = id);

-- Verify tables were created
SELECT 
    tablename 
FROM 
    pg_tables 
WHERE 
    schemaname = 'public'
    AND tablename IN ('users', 'accounts', 'sessions', 'verification_tokens')
ORDER BY 
    tablename;