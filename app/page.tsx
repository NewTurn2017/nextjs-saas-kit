import Link from "next/link";
import SignIn from "@/components/sign-in";
import UserMenu from "@/components/user/UserMenu";

import config from "@/config";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex flex-col">
      {/* Navigation Menu */}
      <nav className="bg-[var(--background)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Logo and navigation links */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                {config.metadata.title}
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="text-lg text-gray-600 hover:text-gray-900 link-hover">
                  Home
                </Link>
                {user && (
                  <Link href="/app/" className="text-lg text-gray-600 hover:text-gray-900 link-hover">
                    App
                  </Link>
                )}
              </div>
            </div>

            {/* Right side - Auth buttons */}
            <div className="flex items-center gap-2">
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center">
                  <SignIn />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">{config.metadata.title}</h1>
            <p className="text-gray-600 mb-8">{config.metadata.description}</p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            {!user ? (
              <>
              </>
            ) : (
              <Link
                href="/app/"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-800 hover:bg-[var(--background)] hover:border-gray-400 font-semibold py-2.5 px-6 rounded-full "
              >
                Go to App
              </Link>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
