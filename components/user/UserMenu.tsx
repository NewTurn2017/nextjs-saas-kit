"use client";
import React, { useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function UserMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { data: session } = useSession();
	const user = session?.user;

	const handleSignOut = () => {
		signOut();
	};

	if (!user) return null;

	return (
		<div className="relative">
			<button
				className="flex items-center space-x-3 focus:outline-none"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<img
					src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
					alt={`${user.name || 'User'} avatar`}
					className="h-8 w-8 rounded-full object-cover"
				/>
				<span className="hidden md:flex items-center space-x-1">
					<span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
					<ChevronDown className="h-4 w-4 text-gray-500" />
				</span>
			</button>

			{/* Dropdown Menu */}
			{isMenuOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="user-menu"
					>
						<a
							href="/app/profile"
							className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							role="menuitem"
						>
							<User className="mr-3 h-4 w-4" />
							Profile & Billing
						</a>

						<button
							onClick={handleSignOut}
							className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							role="menuitem"
						>
							<LogOut className="mr-3 h-4 w-4" />
							Sign out
						</button>
					</div>
				</div>
			)}
		</div>
	);
}