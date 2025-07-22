'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Upload, X, Save, User } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

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
	const [isEditingName, setIsEditingName] = useState(false);
	const [name, setName] = useState('');
	const [isSavingName, setIsSavingName] = useState(false);
	const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { success, error: showError } = useToast();

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
				setName(data.profile?.name || data.userData?.name || '');
			} catch (err) {
				console.error('Error fetching profile data:', err);
				setError('프로필 데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		}

		fetchProfileData();
	}, []);

	const handleSaveName = async () => {
		if (!name.trim()) {
			showError('이름을 입력해주세요');
			return;
		}

		setIsSavingName(true);
		try {
			const response = await fetch('/api/profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: name.trim() }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update name');
			}

			const data = await response.json();
			setProfileData(prev => ({
				...prev,
				profile: data.profile,
				userData: {
					...prev.userData,
					name: data.profile.name
				}
			}));
			setIsEditingName(false);
			success('이름이 성공적으로 변경되었습니다');
			// Emit event to update UserMenu
			window.dispatchEvent(new Event('profileUpdated'));
		} catch (err) {
			console.error('Error updating name:', err);
			showError(err.message || '이름 업데이트에 실패했습니다');
		} finally {
			setIsSavingName(false);
		}
	};

	const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploadingAvatar(true);
		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/profile/avatar', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to upload avatar');
			}

			const data = await response.json();
			setProfileData(prev => ({
				...prev,
				profile: {
					...prev.profile,
					avatar_url: data.avatarUrl
				}
			}));
			success('프로필 사진이 업로드되었습니다');
			// Emit event to update UserMenu
			window.dispatchEvent(new Event('profileUpdated'));
		} catch (err) {
			console.error('Error uploading avatar:', err);
			showError(err.message || '프로필 사진 업로드에 실패했습니다');
		} finally {
			setIsUploadingAvatar(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleDeleteAvatar = async () => {
		if (!confirm('프로필 사진을 삭제하시겠습니까?')) return;

		setIsUploadingAvatar(true);
		try {
			const response = await fetch('/api/profile/avatar', {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete avatar');
			}

			setProfileData(prev => ({
				...prev,
				profile: {
					...prev.profile,
					avatar_url: null
				}
			}));
			success('프로필 사진이 삭제되었습니다');
			// Emit event to update UserMenu
			window.dispatchEvent(new Event('profileUpdated'));
		} catch (err) {
			console.error('Error deleting avatar:', err);
			showError('프로필 사진 삭제에 실패했습니다');
		} finally {
			setIsUploadingAvatar(false);
		}
	};

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
					<p className="font-medium text-red-800">오류</p>
				</div>
				<p className="mt-2 text-red-700">{error}</p>
			</motion.div>
		);
	}

	if (!profileData) {
		return <div>프로필 데이터가 없습니다</div>;
	}

	const { userData, profile } = profileData;
	const avatarUrl = profile?.avatar_url || userData?.image;

	return (
		<>
		<motion.div 
			className="space-y-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
		>
			{/* User Information */}
			<motion.div variants={fadeIn}>
				<Card className="hover:shadow-xl transition-shadow duration-300">
					<CardHeader>
						<div className="flex items-center">
							<div className="bg-gradient-to-r from-[#5059FE] to-[#7D65F6] p-2 rounded-lg mr-4">
								<User className="h-6 w-6 text-white" />
							</div>
							<CardTitle className="text-xl">사용자 정보</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
				
				<div className="space-y-6">
					{/* Profile Picture Section */}
					<div className="flex items-center space-x-6">
						<div className="relative group">
							<Avatar className="w-24 h-24 border-4 border-[#5059FE]/20 shadow-lg">
								<AvatarImage src={avatarUrl || ''} alt="Profile" />
								<AvatarFallback className="bg-gradient-to-br from-[#5059FE] to-[#7D65F6]">
									<User className="w-12 h-12 text-white" />
								</AvatarFallback>
							</Avatar>
							
							{/* Upload/Delete overlay */}
							<div className="absolute inset-0 w-24 h-24 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
								<Button
									onClick={() => fileInputRef.current?.click()}
									disabled={isUploadingAvatar}
									variant="ghost"
									size="icon"
									className="text-white hover:text-gray-200 hover:bg-transparent"
									title="프로필 사진 변경"
								>
									<Upload className="w-6 h-6" />
								</Button>
								{avatarUrl && (
									<Button
										onClick={handleDeleteAvatar}
										disabled={isUploadingAvatar}
										variant="ghost"
										size="icon"
										className="text-white hover:text-red-300 hover:bg-transparent ml-2"
										title="프로필 사진 삭제"
									>
										<X className="w-6 h-6" />
									</Button>
								)}
							</div>
						</div>
						
						<div>
							<h3 className="font-medium text-gray-900">프로필 사진</h3>
							<p className="text-sm text-gray-500 mt-1">
								JPG, PNG, WebP 또는 GIF (최대 5MB)
							</p>
							{isUploadingAvatar && (
								<p className="text-sm text-[#5059FE] mt-1">업로드 중...</p>
							)}
						</div>
						
						<input
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
							onChange={handleAvatarUpload}
							className="hidden"
						/>
					</div>
					
					{/* Name Section */}
					<div className="bg-[var(--background-subtle)] p-4 rounded-lg">
						<div className="flex items-center justify-between">
							<Label className="text-sm font-medium text-gray-500">이름</Label>
							{!isEditingName && (
								<Button
									onClick={() => setIsEditingName(true)}
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-[#5059FE] hover:text-[#7D65F6]"
									title="이름 수정"
								>
									<Pencil className="w-4 h-4" />
								</Button>
							)}
						</div>
						
						{isEditingName ? (
							<div className="flex items-center mt-1 space-x-2">
								<Input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="flex-1 focus:ring-[#5059FE]"
									placeholder="이름을 입력하세요"
									disabled={isSavingName}
								/>
								<Button
									onClick={handleSaveName}
									disabled={isSavingName}
									size="icon"
									className="h-10 w-10 bg-[#5059FE] hover:bg-[#7D65F6]"
									title="저장"
								>
									<Save className="w-4 h-4" />
								</Button>
								<Button
									onClick={() => {
										setIsEditingName(false);
										setName(profile?.name || userData?.name || '');
									}}
									disabled={isSavingName}
									variant="ghost"
									size="icon"
									className="h-10 w-10"
									title="취소"
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						) : (
							<p className="font-semibold text-lg mt-1">
								{profile?.name || userData?.name || '설정되지 않음'}
							</p>
						)}
					</div>

					{/* Email Section */}
					<div className="bg-[var(--background-subtle)] p-4 rounded-lg">
						<Label className="text-sm font-medium text-gray-500">이메일</Label>
						<p className="font-semibold text-lg mt-1 break-all">{userData.email}</p>
					</div>
				</div>
					</CardContent>
				</Card>
			</motion.div>

		</motion.div>
	</>
	);
}