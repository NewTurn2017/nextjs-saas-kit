# Next.js SaaS 스타터 킷

Next.js로 구축된 현대적인 SaaS 스타터 킷으로, 인증 및 이메일 기능을 포함하고 있습니다.

## 주요 기능

- 🔐 Google OAuth 인증
- 📧 이메일 지원
- 🗃️ Supabase 데이터베이스
- 📊 Google Analytics 통합

## 빠른 시작 가이드

### 1. 프로젝트 설정

```bash
# 저장소 클론
git clone <repository-url>
cd next-saas-starter-main

# 의존성 설치
bun install

# 환경 변수 파일 생성
cp .env.example .env.local
```

### 2. Supabase 설정

#### 2.1 Supabase 계정 생성
1. [Supabase](https://supabase.com)로 이동하여 계정을 생성합니다.
2. Supabase 계정에 로그인합니다.

#### 2.2 새 프로젝트 생성
1. "New Project" 버튼을 클릭합니다.
2. 프로젝트 세부 정보를 입력합니다:
   - 프로젝트 이름
   - 데이터베이스 비밀번호
   - 지역 선택
3. 프로젝트가 생성될 때까지 기다립니다 (몇 분 소요).

#### 2.3 API 키 가져오기
1. 프로젝트가 생성되면 프로젝트 대시보드로 이동합니다.
2. 왼쪽 사이드바에서 **Settings** > **API** 클릭합니다.
3. 다음 값들을 복사합니다:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: `SUPABASE_SECRET_KEY`
4. JWT Secret을 얻으려면:
   - **Settings** > **API** > **JWT Settings**로 이동
   - JWT Secret 값을 복사합니다: `SUPABASE_JWT_SECRET`

#### 2.4 데이터베이스 테이블 생성
1. Supabase 대시보드에서 **SQL Editor**로 이동합니다.
2. 새 쿼리를 생성하고 `prompt/supabase_setup.md` 파일의 SQL 스크립트를 복사하여 붙여넣습니다.
3. "Run" 버튼을 클릭하여 필요한 테이블을 생성합니다.

### 3. Google OAuth 설정

#### 3.1 Google Cloud 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com)에 접속합니다.
2. 페이지 상단의 프로젝트 드롭다운을 클릭하고 "새 프로젝트"를 선택합니다.
3. 프로젝트 이름을 입력하고 "만들기"를 클릭합니다.
4. 프로젝트가 생성될 때까지 기다린 후 선택합니다.

#### 3.2 OAuth API 활성화
1. 새 프로젝트에서 **APIs & Services** > **Library**로 이동합니다.
2. "Google Identity"를 검색하고 "Google Identity Services"를 선택합니다.
3. "사용" 버튼을 클릭하여 프로젝트에 API를 활성화합니다.

#### 3.3 OAuth 동의 화면 구성
1. **APIs & Services** > **OAuth consent screen**으로 이동합니다.
2. 적절한 사용자 유형을 선택합니다 (External 또는 Internal).
3. 필수 정보를 입력합니다:
   - 앱 이름: 애플리케이션 이름
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
4. "저장 후 계속"을 클릭합니다.
5. 다음 범위를 추가합니다:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`
   - `openid`
6. 각 섹션에서 "저장 후 계속"을 클릭합니다.

#### 3.4 OAuth 클라이언트 ID 생성
1. **APIs & Services** > **Credentials**로 이동합니다.
2. "사용자 인증 정보 만들기"를 클릭하고 "OAuth 클라이언트 ID"를 선택합니다.
3. 애플리케이션 유형으로 "웹 애플리케이션"을 선택합니다.
4. OAuth 클라이언트 이름을 입력합니다.
5. 승인된 JavaScript 원본 추가:
   - 개발: `http://localhost:3000`
   - 프로덕션: `https://your-domain.com`
6. 승인된 리디렉션 URI 추가:
   - 개발: `http://localhost:3000/api/auth/callback/google`
   - 프로덕션: `https://your-domain.com/api/auth/callback/google`
7. "만들기"를 클릭합니다.
8. 생성된 클라이언트 ID와 클라이언트 시크릿을 복사합니다:
   - 클라이언트 ID: `AUTH_GOOGLE_ID`
   - 클라이언트 시크릿: `AUTH_GOOGLE_SECRET`

### 4. Gmail 앱 비밀번호 설정

#### 4.1 2단계 인증 활성화
1. [Google 계정 보안 설정](https://myaccount.google.com/security)으로 이동합니다.
2. "2단계 인증"을 클릭하고 단계를 따라 활성화합니다.
3. 앱 비밀번호를 만들려면 2단계 인증이 필수입니다.

#### 4.2 앱 비밀번호 생성
1. [앱 비밀번호](https://myaccount.google.com/apppasswords)로 이동합니다.
2. 앱으로 "메일"을 선택합니다.
3. 기기로 "기타(맞춤 이름)"를 선택합니다.
4. 앱 이름을 입력합니다 (예: "Next.js Auth").
5. "생성"을 클릭합니다.
6. Google이 16자리 비밀번호를 생성합니다.
7. 이 비밀번호를 복사합니다 - 다시 볼 수 없습니다!

### 5. NextAuth Secret 생성

터미널에서 다음 명령어를 실행하여 안전한 시크릿을 생성합니다:

```bash
openssl rand -base64 32
```

생성된 값을 `AUTH_SECRET`으로 사용합니다.

### 6. 환경 변수 설정

`.env.local` 파일을 열고 다음 환경 변수들을 설정합니다:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_secret_key
SUPABASE_JWT_SECRET=your_jwt_secret

# 이메일 서버 설정
EMAIL_SERVER_USER=your_gmail_address@gmail.com
EMAIL_SERVER_PASSWORD=your_16_char_app_password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=your_gmail_address@gmail.com

# Google OAuth 설정
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_generated_auth_secret
```

### 7. 개발 서버 실행

```bash
# 개발 서버 시작
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 프로젝트 구조

```
next-saas-starter-main/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── app/               # 보호된 앱 페이지
│   └── ...                # 공개 페이지
├── components/            # React 컴포넌트
│   ├── app/              # 앱 전용 컴포넌트
│   ├── email/            # 이메일 템플릿
│   └── ui/               # UI 컴포넌트
├── lib/                   # 라이브러리 코드
├── utils/                 # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
└── config.ts             # 앱 설정

```

## 설정 파일 (config.ts)

프로젝트 설정은 `config.ts` 파일에서 관리됩니다:

### 메타데이터 설정
```typescript
metadata: {
    title: String          // SEO 및 브라우저 탭용 웹사이트 제목
    description: String    // SEO 및 소셜 공유용 사이트 설명
    keywords: String[]     // SEO 최적화용 키워드
}
```

### 테마 설정
```typescript
theme: {
    colors: {
        primary: String        // 기본 색상
        primaryHover: String   // 호버 시 색상
        border: String         // 테두리 색상
        borderHover: String    // 테두리 호버 색상
    }
}
```

## 주요 명령어

```bash
# 의존성 설치
bun install

# 개발 서버 실행
bun dev

# 프로덕션 빌드
bun run build

# 프로덕션 서버 실행
bun start

# 린트 실행
bun lint

# TypeScript 타입 체크
bun lint:ts

# 이메일 개발 서버
bun email
```

## 문제 해결

### 일반적인 문제들

1. **Supabase 연결 오류**
   - 모든 Supabase 환경 변수가 올바르게 설정되었는지 확인
   - Supabase 프로젝트가 활성 상태인지 확인

2. **Google OAuth 오류**
   - 리디렉션 URI가 Google Cloud Console에 정확히 등록되었는지 확인
   - 클라이언트 ID와 시크릿이 올바른지 확인

3. **이메일 전송 오류**
   - Gmail 2단계 인증이 활성화되었는지 확인
   - 앱 비밀번호가 올바르게 생성되고 설정되었는지 확인
   - Gmail 보안 설정에서 "보안 수준이 낮은 앱 액세스"가 차단되지 않았는지 확인

## 지원

질문이나 문제가 있으면 저장소에 이슈를 열어주세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.