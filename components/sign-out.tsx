import { handleSignOut } from "@/app/actions/auth"
import config from "@/config";

export default function SignOutButton() {
	return (
		<form action={handleSignOut}>
			<button
				type="submit"
				className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
			>
				Sign Out
			</button>
		</form>
	)
} 