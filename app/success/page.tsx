import Link from 'next/link';

export default function Success() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
			<Link
				href="/app/profile"
				className="text-blue-600 hover:text-blue-800 underline"
			>
				Return to App
			</Link>
		</div>
	);
}

