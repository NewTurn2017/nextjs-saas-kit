# NextAuth AdapterError 해결 가이드

## 문제 진단
- **오류**: AdapterError - SupabaseAdapter가 테이블을 찾을 수 없음
- **원인**: `@auth/supabase-adapter`는 `public` 스키마만 지원하는데, 기존 설정이 `next_auth` 스키마를 사용하려 함

## 해결 방법

### 1. Supabase Dashboard 열기
1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. 왼쪽 메뉴에서 "SQL Editor" 클릭

### 2. 다음 SQL 실행
아래 전체 내용을 복사하여 SQL Editor에 붙여넣고 "Run" 클릭:

```sql
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
```

### 3. 테이블 생성 확인
SQL 실행 후 결과에 다음 4개 테이블이 표시되어야 합니다:
- accounts
- sessions
- users
- verification_tokens

### 4. 로컬에서 연결 테스트

터미널에서 실행:
```bash
bun scripts/test-db-connection.ts
```

성공적인 출력:
```
🔍 Testing Supabase connection...

1️⃣ Testing connection...
✅ Connection successful!

2️⃣ Checking NextAuth tables in public schema...
✅ Table public.users exists
✅ Table public.sessions exists
✅ Table public.accounts exists
✅ Table public.verification_tokens exists

3️⃣ Checking public.users table...
✅ Table public.users exists

✨ Database setup looks good!
```

### 5. Google OAuth 테스트

1. 브라우저에서 모든 쿠키 삭제:
   - Chrome: 설정 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터 > 모든 쿠키 및 사이트 데이터 보기 > 모두 삭제
   - 또는 개발자 도구 > Application > Storage > Clear site data

2. 앱 재시작:
   ```bash
   bun dev
   ```

3. http://localhost:3000 접속 후 "Sign in with Google" 클릭

### 6. 문제가 지속될 경우

1. Supabase Dashboard에서 Authentication > Providers > Google 설정 확인
2. Google Cloud Console에서 OAuth 2.0 클라이언트 ID 설정 확인:
   - 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google`
3. `.env.local` 파일의 환경 변수 확인

## 주요 변경사항

1. **스키마 변경**: `next_auth` → `public`
2. **테이블 구조**: NextAuth v5 표준 스키마 사용
3. **권한 설정**: `service_role`에 모든 권한 부여
4. **RLS 정책**: 사용자가 자신의 데이터만 보고 수정할 수 있도록 설정

## 추가 정보

- [NextAuth.js Supabase Adapter 문서](https://authjs.dev/reference/adapter/supabase)
- [Supabase Row Level Security 문서](https://supabase.com/docs/guides/auth/row-level-security)