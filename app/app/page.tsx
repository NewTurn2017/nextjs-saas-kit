/**
 * This is the main app home page
 * The Header component is already included in the app/layout.tsx file
 */
export default function AppPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">환영합니다! 🎉</h1>
        <p className="text-xl text-gray-600 mb-2">로그인에 성공했습니다</p>
        <p className="text-lg text-gray-500">여기에 당신의 앱이 구축될 예정입니다</p>
      </div>
    </div>
  );
}

