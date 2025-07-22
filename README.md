# Next.js SaaS Starter Kit

Next.js 15 + NextAuth v5 + Supabase로 만든 프로덕션 레디 SaaS 스타터 킷

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18+ 또는 [Bun](https://bun.sh)
- [Supabase](https://supabase.com) 계정
- Gmail 계정
- Google Cloud Console 계정

### 1. 설치

```bash
# 클론
git clone https://github.com/NewTurn2017/nextjs-saas-kit.git
cd nextjs-saas-kit

# 패키지 설치 (bun 권장)
bun install

# 환경변수 파일 생성
cp .env.example .env.local
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 대시보드에서 다음 정보 복사:
   - Settings > API > Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Settings > API > Anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Settings > API > Service role key → `SUPABASE_SECRET_KEY`
   - Settings > Database > Connection string > URI (비밀번호 부분) → `SUPABASE_JWT_SECRET`

   **⚠️ 중요**: 환경변수 값에 따옴표를 넣지 마세요!

   ```
   ✅ 올바른 예: NEXT_PUBLIC_SUPABASE_URL=https://abc.supabase.co
   ❌ 잘못된 예: NEXT_PUBLIC_SUPABASE_URL="https://abc.supabase.co"
   ```

3. SQL Editor에서 `scripts/setup-database.sql` 전체 내용 실행
   - 또는 `bun setup:db` 명령으로 가이드 확인

### 3. 이메일 설정 (Gmail)

1. Gmail 계정에서 2단계 인증 활성화
2. [Google 계정 설정](https://myaccount.google.com/apppasswords)에서 앱 비밀번호 생성
3. `.env.local`에 추가:
   ```
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=생성한_16자리_앱_비밀번호
   EMAIL_FROM=your-email@gmail.com
   ```

### 4. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **OAuth 동의 화면 설정** (처음 한 번만):
   - "APIs & Services" > "OAuth consent screen"
   - User Type: "External" 선택
   - 앱 정보 입력 (앱 이름, 이메일 등)
   - 테스트 사용자 추가 (개발 중일 때)
   - **"앱 게시" 버튼 클릭** (프로덕션 사용 시)
4. "APIs & Services" > "Credentials" > "Create Credentials" > "OAuth client ID"
5. Application type: "Web application" 선택
6. Authorized redirect URIs 추가:
   - 개발: `http://localhost:3000/api/auth/callback/google`
   - 프로덕션: `https://your-domain.com/api/auth/callback/google`
7. `.env.local`에 추가:
   ```
   AUTH_GOOGLE_ID=생성된_클라이언트_ID
   AUTH_GOOGLE_SECRET=생성된_클라이언트_시크릿
   ```

### 5. NextAuth Secret 생성

https://generate-secret.vercel.app/ 에서 생성

```bash
# 터미널에서 실행
openssl rand -base64 32
```

생성된 값을 `.env.local`에 추가:

```
AUTH_SECRET=생성된_랜덤_문자열
```

### 6. 개발 서버 실행

```bash
# 환경변수 검증
bun check-env

# 개발 서버 시작
bun dev
```

http://localhost:3000 에서 확인

## 📝 환경변수 체크리스트

```env
# 1. Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL=✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=✅
SUPABASE_SECRET_KEY=✅
SUPABASE_JWT_SECRET=✅

# 2. Email (필수)
EMAIL_SERVER_USER=✅
EMAIL_SERVER_PASSWORD=✅
EMAIL_FROM=✅

# 3. Google OAuth (필수)
AUTH_GOOGLE_ID=✅
AUTH_GOOGLE_SECRET=✅

# 4. NextAuth (필수)
AUTH_SECRET=✅

# 5. App URL (프로덕션 배포 시)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🚨 문제 해결

### Storage 버킷 수동 생성

SQL 스크립트가 Storage 버킷 생성에 실패하면:

1. Supabase 대시보드 > Storage
2. "New bucket" 클릭
3. 설정:
   - Name: `avatars`
   - Public: ✅
   - File size limit: 5MB
   - Allowed MIME types: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

### 일반적인 문제

- **"Missing environment variables"**: `bun check-env` 실행하여 누락된 변수 확인
- **Google OAuth 에러**: Authorized redirect URIs 확인
- **이메일 전송 실패**: Gmail 앱 비밀번호 재생성

## 📚 주요 스크립트

```bash
bun dev          # 개발 서버
bun build        # 프로덕션 빌드
bun check-env    # 환경변수 검증
bun setup:db     # DB 설정 가이드
bun dev:check    # 개발 환경 체크
```

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Auth**: NextAuth v5 (beta)
- **Database**: Supabase (PostgreSQL)
- **Email**: React Email, Nodemailer
- **Runtime**: Bun (Node.js 호환)

## 📄 라이센스

MIT License
