export default function Loading() {
	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="bg-white shadow rounded-lg p-6 space-y-8 animate-pulse">
				{/* User Information */}
				<div>
					<h2 className="text-xl font-semibold mb-4">User Information</h2>
					<div className="grid grid-cols-2 gap-4">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i}>
								<div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
								<div className="h-6 bg-gray-200 rounded w-2/3"></div>
							</div>
						))}
					</div>
				</div>
				{/* Profile Image */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Profile Image</h2>
					<div className="w-20 h-20 bg-gray-200 rounded-full"></div>
				</div>
			</div>
		</div>
	);
} 