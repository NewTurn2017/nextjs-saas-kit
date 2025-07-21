'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

export default function ProfileAndBillingContent() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<any>(null);

	useEffect(() => {
		async function fetchProfileData() {
			try {
				const response = await fetch('/api/profile');
				
				// Handle 401 Unauthorized (user not logged in)
				if (response.status === 401) {
					// Redirect to home page
					window.location.href = '/';
					return;
				}
				
				if (!response.ok) {
					throw new Error('Failed to fetch profile data');
				}
				
				const data = await response.json();
				setProfileData(data);
			} catch (err) {
				console.error('Error fetching profile data:', err);
				setError('Failed to load profile data. Please try again later.');
			} finally {
				setLoading(false);
			}
		}

		fetchProfileData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-24">
				<div className="relative">
					<div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[#5059FE] animate-spin"></div>
					<div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-[#5059FE]/30 animate-spin absolute top-0 left-0 animate-[spin_1.5s_linear_infinite]"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<motion.div 
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg shadow-md"
				role="alert"
			>
				<div className="flex items-center">
					<svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p className="font-medium text-red-800">Error</p>
				</div>
				<p className="mt-2 text-red-700">{error}</p>
			</motion.div>
		);
	}

	if (!profileData) {
		return <div>No profile data available</div>;
	}

	const { userData } = profileData;

	return (
		<motion.div 
			className="space-y-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
		>
			{/* User Information */}
			<motion.div 
				className="bg-[var(--background)] shadow-lg rounded-xl p-8 border border-[var(--border)] hover:shadow-xl transition-shadow duration-300"
				variants={fadeIn}
			>
				<div className="flex items-center mb-6">
					<div className="bg-gradient-to-r from-[#5059FE] to-[#7D65F6] p-2 rounded-lg mr-4">
						<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</div>
					<h2 className="text-xl font-bold">User Information</h2>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-[var(--background-subtle)] p-4 rounded-lg">
						<label className="text-sm font-medium text-gray-500">Name</label>
						<p className="font-semibold text-lg mt-1">{userData.name || 'Not set'}</p>
					</div>

					<div className="bg-[var(--background-subtle)] p-4 rounded-lg">
						<label className="text-sm font-medium text-gray-500">Email</label>
						<p className="font-semibold text-lg mt-1 break-all">{userData.email}</p>
					</div>

					{userData.image && (
						<div className="col-span-1 md:col-span-2 flex items-center">
							<div className="mr-4">
								<img
									src={userData.image}
									alt="User avatar"
									className="w-20 h-20 rounded-full border-4 border-[#5059FE]/20 shadow-md"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">Profile Image</label>
								<p className="text-sm text-gray-600 mt-1">Your profile picture is visible to other users</p>
							</div>
						</div>
					)}
				</div>
			</motion.div>

		</motion.div>
	);
} 