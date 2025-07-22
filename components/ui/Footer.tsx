const Footer = () => {
	return (
		<footer className="w-full bg-gradient-to-br from-blue-50 to-purple-50 py-6">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-gray-600">
						© {new Date().getFullYear()} 스타터킷. 모든 권리 보유.
					</p>
					<div className="mt-4 md:mt-0">
						<p className="text-sm text-gray-600">
							커뮤니티를 위해 ❤️로{' '}
							<a 
								href="https://www.threads.com/@ai_developer_genie" 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
							>
								Developer Genie
							</a>
							{' '}가 제작했습니다
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer; 