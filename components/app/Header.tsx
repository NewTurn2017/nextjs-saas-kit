"use client";

import { Menu, X } from "lucide-react"
import UserMenu from "@/components/user/UserMenu"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/app/">
            <h1 className="text-xl font-semibold">App</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu />
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md" 
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-2 border-t border-gray-200">
          <nav className="flex flex-col space-y-2">
            {/* No navigation items needed since Notes is the home page */}
            <div className="px-4 py-2 text-gray-500">
              <UserMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

