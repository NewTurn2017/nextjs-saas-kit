export default function Loading() {
	return (
		<div className="max-w-3xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-4">Notes</h1>
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="bg-white rounded-lg p-4 shadow-lg animate-pulse">
						<div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
						<div className="h-4 bg-gray-200 rounded w-3/4"></div>
					</div>
				))}
			</div>
		</div>
	);
} 