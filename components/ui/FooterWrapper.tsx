'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isAppPage = pathname?.startsWith('/app');
  
  if (isAppPage) {
    return null;
  }
  
  return <Footer />;
} 