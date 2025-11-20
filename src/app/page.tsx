'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RootPage() {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      if (isAuthenticated) {
        // User is logged in, redirect to the main protected area
        router.replace('/dashboard');
      } else {
        // User is not logged in, redirect to the login page
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isReady, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}