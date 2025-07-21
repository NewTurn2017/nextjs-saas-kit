import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import config from '@/config';

const Footer = () => {
	return (
		<footer className="w-full border-t border-gray-200 bg-[var(--background)] py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Company</h3>
						<div className="flex flex-col space-y-2">
							<Link
								href="/about"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								About Us
							</Link>
							<Link
								href="/careers"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Careers
							</Link>
							<Link
								href="/blog"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Blog
							</Link>
						</div>
					</div>

					{/* Resources */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Resources</h3>
						<div className="flex flex-col space-y-2">
							<Link
								href="/docs"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Documentation
							</Link>
							<Link
								href="/help"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Help Center
							</Link>
							<Link
								href="/pricing"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Pricing
							</Link>
						</div>
					</div>

					{/* Legal */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Legal</h3>
						<div className="flex flex-col space-y-2">
							<Link
								href="/privacy"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Terms of Service
							</Link>
							<Link
								href="/cookies"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								Cookie Policy
							</Link>
						</div>
					</div>

					{/* Social */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Connect</h3>
						<div className="flex space-x-4">
							<a
								href={config.socialLinks?.github || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								<Github className="w-6 h-6" />
							</a>
							<a
								href={config.socialLinks?.twitter || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								<Twitter className="w-6 h-6" />
							</a>
							<a
								href={config.socialLinks?.linkedin || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
							>
								<Linkedin className="w-6 h-6" />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-12 pt-8 border-t border-gray-200">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-gray-600">
							© {new Date().getFullYear()} {config.appName}. All rights reserved.
						</p>
						<div className="mt-4 md:mt-0">
							<p className="text-sm text-gray-600">
								Made with ❤️ for the community
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer; 