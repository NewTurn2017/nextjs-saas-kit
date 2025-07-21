# Google OAuth 테스트 가이드

## ✅ 현재 상태
- 데이터베이스 테이블이 올바르게 설정됨
- NextAuth 테이블이 public 스키마에 생성됨
- 모든 권한이 올바르게 설정됨

## 🧪 테스트 단계

### 1. 개발 서버 시작
```bash
bun dev
```

### 2. 브라우저 준비
1. 모든 쿠키 삭제:
   - Chrome: 개발자 도구 (F12) > Application > Storage > Clear site data
   - 또는 설정 > 개인정보 및 보안 > 쿠키 삭제

2. 시크릿/프라이빗 브라우징 모드 사용 (권장)

### 3. Google OAuth 테스트
1. http://localhost:3000 접속
2. "Sign in with Google" 버튼 클릭
3. Google 계정 선택 및 권한 승인
4. 성공적으로 리다이렉트되어야 함

## 🚨 문제 발생 시

### AdapterError가 여전히 발생하는 경우:
1. Supabase Dashboard에서 테이블 확인
2. Authentication > Providers > Google 설정 확인
3. 환경 변수 확인:
   ```bash
   bun check-env
   ```

### 콘솔 로그 확인:
- 브라우저 개발자 도구 콘솔
- 터미널의 Next.js 서버 로그 (debug: true 설정됨)

### 추가 디버깅:
```bash
# NextAuth 테이블 직접 확인
bun scripts/test-db-connection.ts

# 어댑터 직접 테스트
bun scripts/test-adapter-direct.ts
```

## ✅ 성공 지표
- Google 로그인 성공
- 사용자 정보가 /app 페이지에 표시됨
- Supabase Dashboard에서 users, accounts 테이블에 데이터 확인 가능

## 📝 노트
- NextAuth v5 (beta)는 아직 개발 중이므로 일부 기능이 불안정할 수 있음
- PKCE 관련 경고는 무시해도 됨 (cookie 설정으로 해결됨)