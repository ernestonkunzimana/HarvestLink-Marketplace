'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'cooperative':
          router.push('/cooperative/dashboard');
          break;
        case 'buyer':
          router.push('/buyer/marketplace');
          break;
        case 'government':
          router.push('/gov/dashboard');
          break;
        default:
          router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">HL</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">HarvestLink</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}