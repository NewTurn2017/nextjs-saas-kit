# NextAuth AdapterError 수정 내역

## 🐛 문제
- Google OAuth 로그인 시 AdapterError 발생
- 원인: `@auth/supabase-adapter`는 `public` 스키마만 지원하는데, 기존 설정이 `next_auth` 스키마 사용

## 🔧 해결 방법
1. 모든 NextAuth 테이블을 `public` 스키마에 생성
2. 적절한 권한 및 RLS 정책 설정
3. 문서 및 스크립트 업데이트

## 📝 변경된 파일

### 새로 추가된 파일:
- `NEXTAUTH_FIX_GUIDE.md` - 상세한 수정 가이드
- `TEST_GOOGLE_OAUTH.md` - OAuth 테스트 가이드
- `scripts/fix-auth-final.sql` - 최종 수정 SQL 스크립트
- `scripts/test-db-connection.ts` - 데이터베이스 연결 테스트
- `scripts/test-adapter-direct.ts` - SupabaseAdapter 직접 테스트
- `supabase/migrations/20241221000000_nextauth_public_schema.sql` - 마이그레이션 파일

### 수정된 파일:
- `README.md` - NextAuth 트러블슈팅 섹션 추가
- `prompt/supabase_setup.md` - public 스키마 사용하도록 업데이트
- `lib/auth.config.ts` - 디버그 모드 및 PKCE 쿠키 설정 추가

## 🚀 다음 단계

1. **테스트**:
   ```bash
   bun dev
   # http://localhost:3000에서 Google OAuth 테스트
   ```

2. **확인**:
   - Google 로그인 성공 확인
   - Supabase Dashboard에서 데이터 확인

3. **GitHub 푸시**:
   ```bash
   git add .
   git commit -m "fix: NextAuth AdapterError - migrate tables to public schema"
   git push
   ```

## 📚 참고 자료
- [NextAuth.js Supabase Adapter](https://authjs.dev/reference/adapter/supabase)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ⚠️ 중요 사항
- `@auth/supabase-adapter`는 public 스키마만 지원
- NextAuth v5는 아직 베타 버전
- 프로덕션 배포 전 충분한 테스트 필요