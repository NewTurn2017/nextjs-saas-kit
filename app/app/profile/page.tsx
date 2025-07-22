import { Suspense } from 'react';
import Loading from '@/components/app/profile/loading';
import ProfileAndBillingContent from '@/components/app/profile/ProfileAndBillingContent';

export default function ProfilePage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-2xl font-bold mb-6">프로필</h1>
			<Suspense fallback={<Loading />}>
				<ProfileAndBillingContent />
			</Suspense>
		</div>
	);
}
