# Next.js SaaS 스타터 킷

Next.js 15로 구축된 현대적이고 확장 가능한 SaaS 스타터 킷입니다. 개발자 경험(DX)을 최우선으로 설계되었으며, 프로덕션에 바로 사용할 수 있는 기능들을 포함하고 있습니다.

## ✨ 주요 기능

### 🚀 개발자 경험

- **환경 변수 검증**: Zod를 활용한 타입 안전 환경 변수
- **개발 환경 체크**: 자동 환경 검증 스크립트
- **재사용 가능한 훅**: 일반적인 패턴을 위한 커스텀 React 훅
- **유틸리티 함수**: 검증된 헬퍼 함수 모음
- **VS Code 통합**: 추천 설정 및 확장 프로그램
- **타입 안전성**: TypeScript strict 모드

### 🎨 UI/UX

- **로딩 상태**: 스켈레톤, 스피너 컴포넌트
- **에러 처리**: ErrorBoundary, 에러 메시지 컴포넌트
- **빈 상태**: 데이터가 없을 때를 위한 EmptyState 컴포넌트
- **반응형 디자인**: 모바일 우선 접근 방식
- **다크 모드 지원**: Tailwind CSS 기반

### 🔐 인증 & 보안

- **Google OAuth**: NextAuth v5 (beta) 통합
- **이메일 인증**: Nodemailer + React Email
- **Row Level Security**: Supabase RLS 정책
- **환경 변수 보호**: 런타임 검증

### 🗃️ 데이터베이스

- **Supabase**: PostgreSQL 기반
- **타입 생성**: 데이터베이스 스키마로부터 TypeScript 타입 자동 생성
- **마이그레이션**: SQL 스크립트 지원
- **프로필 관리**: 사용자 프로필 및 아바타 이미지 지원
- **Storage**: Supabase Storage 통합 (프로필 이미지)

## 🚀 빠른 시작 가이드

### 사전 요구사항
- Node.js 18+ 또는 Bun
- Supabase 계정
- Google Cloud 계정 (Google OAuth 사용 시)

### 1. 프로젝트 설정

```bash
# 저장소 클론
git clone https://github.com/NewTurn2017/nextjs-saas-kit.git
cd nextjs-saas-kit

# 의존성 설치 (Bun 권장)
bun install
# 또는 npm install

# 환경 변수 파일 생성
cp .env.example .env.local

# 개발 환경 체크
bun setup
```

### 2. 환경 변수 설정

`.env.local` 파일을 열고 필요한 값들을 설정합니다:

#### Supabase 설정
1. [Supabase Dashboard](https://app.supabase.com)에서 프로젝트 생성
2. Settings > API에서 다음 값들을 복사:

```env
# Supabase (Settings > API에서 복사)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key  # ⚠️ service_role 키 사용!
SUPABASE_JWT_SECRET=your_jwt_secret  # Settings > Database > JWT Secret

# Email
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=your_email@gmail.com

# Google OAuth (선택사항)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# NextAuth Secret (필수! 아래 명령어로 생성)
AUTH_SECRET=your_generated_auth_secret
```

#### NextAuth Secret 생성 (필수)

다음 중 하나의 방법을 사용하세요:

**방법 1: 온라인 생성기 사용 (추천)**
- https://generate-secret.vercel.app/32 접속
- 생성된 키를 복사하여 `AUTH_SECRET`에 설정

**방법 2: 터미널 명령어 사용**
```bash
# macOS/Linux/Git Bash
openssl rand -base64 32

# Node.js가 설치되어 있다면
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Google OAuth 설정 (선택사항)
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "APIs & Services" > "Credentials" > "Create Credentials" > "OAuth client ID"
4. Application type: Web application
5. Authorized redirect URIs 추가:
   - `http://localhost:3000/api/auth/callback/google` (개발용)
   - `https://your-domain.com/api/auth/callback/google` (프로덕션용)

#### Gmail 앱 비밀번호 설정 (이메일 매직 링크 사용 시)

1. Gmail 앱 비밀번호 생성

1. Google 계정 보안 설정으로 이동


    - https://myaccount.google.com/security 접속
    - 또는 Google 계정 → 보안 탭

2. 2단계 인증 활성화 (필수)


    - "2단계 인증" 클릭
    - 안내에 따라 활성화

3. 앱 비밀번호 생성


    - https://myaccount.google.com/apppasswords 접속
    - "앱 선택" → "메일" 선택
    - "기기 선택" → "기타(맞춤 이름)" 선택
    - 이름 입력 (예: "Next.js App")
    - "생성" 클릭

4. 16자리 비밀번호 복사


    - 생성된 16자리 비밀번호가 표시됨
    - 이 비밀번호를 복사 (공백 없이)
    - ⚠️ 이 비밀번호는 다시 볼 수 없으므로 안전하게 보관

### 3. 데이터베이스 설정

Supabase 대시보드의 SQL Editor에서 다음 중 하나를 실행:

- **옵션 1**: `scripts/setup-database.sql` 파일의 전체 내용을 복사하여 실행
- **옵션 2**: 아래 명령어로 설정 가이드 확인
  ```bash
  bun setup:db
  ```

**참고**: 이 스크립트는 다음을 자동으로 설정합니다:
- NextAuth 인증 테이블 (users, accounts, sessions, verification_tokens)
- 프로필 관리 테이블 (profiles)
- 프로필 이미지를 위한 Storage 버킷 (avatars)
- 필요한 RLS (Row Level Security) 정책

**중요**: SQL 스크립트가 Storage 버킷 생성에 실패하면 수동으로 생성해야 합니다:
1. Supabase 대시보드에서 Storage 섹션으로 이동
2. "New bucket" 클릭
3. 다음 설정으로 생성:
   - Name: `avatars`
   - Public bucket: ✅ 체크
   - File size limit: 5MB
   - Allowed MIME types: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

### 4. 개발 서버 실행

```bash
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## ✨ 주요 기능 상세

### 🖼️ 프로필 관리

사용자는 프로필 페이지에서 다음을 수행할 수 있습니다:

- **프로필 사진 업로드**: 
  - JPG, PNG, WebP, GIF 형식 지원
  - 최대 5MB 파일 크기 제한
  - 자동 이미지 최적화
  - 기존 이미지 자동 교체

- **이름 변경**:
  - 실시간 편집 기능
  - 자동 저장

**구현 세부사항**:
```typescript
// 프로필 이미지 업로드
const formData = new FormData()
formData.append('file', imageFile)
await fetch('/api/profile/avatar', { 
  method: 'POST', 
  body: formData 
})

// 이름 업데이트
await fetch('/api/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: newName })
})
```

## 📁 프로젝트 구조

```
nextjs-saas-kit/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── app/               # 보호된 앱 페이지
│   └── ...                # 공개 페이지
├── components/            # React 컴포넌트
│   ├── app/              # 앱 전용 컴포넌트
│   ├── email/            # 이메일 템플릿
│   └── ui/               # 재사용 가능한 UI 컴포넌트
├── hooks/                 # 커스텀 React 훅
├── lib/                   # 핵심 라이브러리 코드
│   ├── utils/            # 유틸리티 함수
│   └── env.ts            # 환경 변수 검증
├── scripts/              # 개발 도구 스크립트
├── types/                # TypeScript 타입 정의
└── config.ts            # 앱 설정
```

## 🪝 커스텀 훅

### useUser

현재 인증된 사용자 정보를 가져옵니다.

```typescript
import { useUser } from '@/hooks'

function Profile() {
  const { user, loading, error, refetch } = useUser()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />
  if (!user) return <div>Please log in</div>

  return <div>Welcome, {user.name}!</div>
}
```

### useSupabase

타입 안전한 Supabase 클라이언트를 제공합니다.

```typescript
import { useSupabase } from '@/hooks'

function TodoList() {
  const supabase = useSupabase()

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*')
  }
}
```

### useAsync

비동기 작업을 위한 상태 관리를 제공합니다.

```typescript
import { useAsync } from '@/hooks'

function DataFetcher() {
  const { data, loading, error, execute } = useAsync(
    async () => {
      const response = await fetch('/api/data')
      return response.json()
    },
    true // 즉시 실행
  )

  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} onRetry={execute} />}
      {data && <DataDisplay data={data} />}
    </div>
  )
}
```

### useDebounce

값의 디바운싱을 제공합니다.

```typescript
import { useDebounce } from '@/hooks'

function SearchInput() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch) {
      // API 호출
    }
  }, [debouncedSearch])
}
```

### useLocalStorage

로컬 스토리지와 동기화되는 상태를 제공합니다.

```typescript
import { useLocalStorage } from '@/hooks'

function Settings() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  )
}
```

## 🧩 UI 컴포넌트

### ErrorBoundary

React 에러를 우아하게 처리합니다.

```typescript
import { ErrorBoundary } from '@/components/ui'

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo)
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  )
}
```

### Skeleton

로딩 중 플레이스홀더를 표시합니다.

```typescript
import { Skeleton, CardSkeleton, TableSkeleton } from '@/components/ui'

// 기본 스켈레톤
<Skeleton className="h-4 w-[200px]" />

// 카드 스켈레톤
<CardSkeleton />

// 테이블 스켈레톤
<TableSkeleton rows={5} />
```

### EmptyState

데이터가 없을 때 표시합니다.

```typescript
import { EmptyState } from '@/components/ui'
import { FileX } from 'lucide-react'

<EmptyState
  icon={FileX}
  title="No files found"
  description="Upload your first file to get started"
  action={{
    label: "Upload File",
    onClick: () => handleUpload()
  }}
/>
```

### ErrorMessage

에러 메시지를 일관되게 표시합니다.

```typescript
import { ErrorMessage } from '@/components/ui'

<ErrorMessage
  title="Failed to load data"
  message="Please check your connection and try again"
  variant="error"
  onRetry={() => refetch()}
/>
```

## 🛠️ 유틸리티 함수

### 포맷팅

```typescript
import { formatDate, formatRelativeTime, formatCurrency, formatBytes } from '@/lib/utils'

formatDate(new Date()) // "January 21, 2025"
formatRelativeTime(new Date()) // "just now"
formatCurrency(1234.56) // "$1,234.56"
formatBytes(1024) // "1 KB"
```

### 검증

```typescript
import { isValidEmail, isValidUrl, validatePassword } from '@/lib/utils'

isValidEmail('user@example.com') // true
isValidUrl('https://example.com') // true

const passwordResult = validatePassword('MyP@ssw0rd')
// { isValid: true, score: 4, feedback: [] }
```

### 일반 유틸리티

```typescript
import { debounce, throttle, retry, sleep } from '@/lib/utils'

// 재시도 로직
const data = await retry(() => fetch('/api/data'), { retries: 3, delay: 1000 })

// 디바운싱
const debouncedSearch = debounce(searchFunction, 300)

// 쓰로틀링
const throttledScroll = throttle(handleScroll, 100)
```

## 📝 개발 스크립트

```bash
# 환경 변수 검증
bun check-env

# 개발 환경 체크
bun scripts/dev-check.ts

# TypeScript 타입 생성 가이드
bun generate:types

# 데이터베이스 설정 가이드
bun setup:db

# 전체 설정 (환경 체크 + 환경 변수 검증)
bun setup
```

## ⚙️ 설정

### VS Code 설정

프로젝트에는 추천 VS Code 설정이 포함되어 있습니다:

- 자동 포맷팅 (Prettier)
- ESLint 통합
- Tailwind CSS IntelliSense
- TypeScript 지원

### Prettier 설정

일관된 코드 스타일을 위한 설정:

- 세미콜론 없음
- 작은따옴표 사용
- 2칸 들여쓰기
- 100자 줄 길이

### 환경 변수 타입 안전성

모든 환경 변수는 Zod 스키마로 검증됩니다:

```typescript
import { env } from '@/lib/env'

// 타입 안전한 환경 변수 접근
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
```

## 🐛 문제 해결

### 환경 변수 오류

```bash
# 환경 변수 검증 실행
bun check-env

# 어떤 변수가 누락되었는지 확인
# 올바른 형식인지 검증
```

### TypeScript 오류

```bash
# 타입 체크 실행
bun lint:ts

# 데이터베이스 타입 재생성
bun generate:types
```

### 개발 환경 문제

```bash
# 전체 환경 체크
bun scripts/dev-check.ts
```

### NextAuth 관련 문제

Google OAuth 로그인이 작동하지 않는 경우:

1. **데이터베이스 테이블 확인**
   - Supabase Dashboard > Table Editor에서 `users`, `accounts`, `sessions`, `verification_tokens` 테이블 확인
   - 없다면 `scripts/setup-database.sql` 실행

2. **환경 변수 확인**
   - `SUPABASE_SECRET_KEY`가 service_role 키인지 확인 (anon 키 X)
   - `AUTH_SECRET`가 설정되어 있는지 확인

3. **브라우저 쿠키 삭제**
   - 개발자 도구 > Application > Storage > Clear site data

**참고**: 이 프로젝트는 `@auth/supabase-adapter`의 제한으로 인해 커스텀 어댑터를 사용합니다.

## 🚀 프로덕션 배포

### Vercel 배포 (추천)

1. [Vercel](https://vercel.com)에서 프로젝트 Import
2. 환경 변수 설정
3. 배포!

### 환경 변수 체크리스트

프로덕션에서 필요한 환경 변수:

**필수**:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase 프로젝트 URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon 키
- [ ] `SUPABASE_SECRET_KEY` - Supabase service_role 키
- [ ] `SUPABASE_JWT_SECRET` - Supabase JWT secret
- [ ] `AUTH_SECRET` - NextAuth 암호화 키

**선택사항 (기능별)**:
- [ ] `AUTH_GOOGLE_ID` - Google OAuth 클라이언트 ID
- [ ] `AUTH_GOOGLE_SECRET` - Google OAuth 클라이언트 시크릿
- [ ] `EMAIL_SERVER_USER` - SMTP 사용자 (이메일 인증 시)
- [ ] `EMAIL_SERVER_PASSWORD` - SMTP 비밀번호
- [ ] `EMAIL_SERVER_HOST` - SMTP 호스트
- [ ] `EMAIL_SERVER_PORT` - SMTP 포트
- [ ] `EMAIL_FROM` - 발신 이메일 주소

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

기여를 환영합니다! 이슈를 열거나 PR을 제출해주세요.

## 📞 지원

질문이나 문제가 있으면 [이슈](https://github.com/NewTurn2017/nextjs-saas-kit/issues)를 열어주세요.

---

Made with ❤️ by [Developer Genie](https://www.threads.com/@ai_developer_genie) for the community
