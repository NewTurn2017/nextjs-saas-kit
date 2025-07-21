import Link from "next/link"
import { Home, Users, Settings, UserCircle, CreditCard, LayoutDashboard } from "lucide-react"

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2" size={20} />
          Home
        </Link>
        <Link
          href="/app"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <LayoutDashboard className="inline-block mr-2" size={20} />
          App
        </Link>
        <Link
          href="/app/notes"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2" size={20} />
          Notes
        </Link>
        <Link
          href="/app/profile"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <UserCircle className="inline-block mr-2" size={20} />
          Profile
        </Link>
        <Link
          href="/app/billing"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <CreditCard className="inline-block mr-2" size={20} />
          Billing
        </Link>
      </nav>
    </div>
  )
}
