'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: '서버 구성에 문제가 있습니다.',
    AccessDenied: '로그인 권한이 없습니다.',
    Verification: '인증 토큰이 만료되었거나 이미 사용되었습니다.',
    Default: '인증 중 오류가 발생했습니다.',
  }

  const message = errorMessages[error || 'Default'] || errorMessages.Default

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Error Icon */}
        <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          인증 오류
        </h1>
        <p className="text-gray-600 mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            다시 시도
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200"
          >
            홈으로
          </Link>
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-8 p-4 bg-gray-200/50 rounded-lg text-left">
            <p className="text-xs text-gray-600 font-mono">
              오류 코드: {error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}