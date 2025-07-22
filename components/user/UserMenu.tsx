'use client'
import React, { useState, useEffect } from 'react'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const { data: session } = useSession()
  const user = session?.user

  useEffect(() => {
    // Fetch profile data to get the latest avatar_url and name
    if (user) {
      fetchProfileData()
    }

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchProfileData()
    }

    window.addEventListener('profileUpdated', handleProfileUpdate)

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [user])

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  const handleSignOut = () => {
    signOut()
  }

  if (!user) return null

  // Use profile data if available, fallback to session data
  const displayName = profileData?.profile?.name || profileData?.userData?.name || user.name || user.email?.split('@')[0] || 'User'
  const avatarUrl = profileData?.profile?.avatar_url || user.image || 'https://www.gravatar.com/avatar/?d=mp'

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-3 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={avatarUrl}
          alt={`${displayName} avatar`}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="hidden md:flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-700">{displayName}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <a
              href="/app/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <User className="mr-3 h-4 w-4" />
              프로필
            </a>

            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="mr-3 h-4 w-4" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
