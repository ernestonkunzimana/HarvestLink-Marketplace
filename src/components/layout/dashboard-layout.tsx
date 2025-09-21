'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Sidebar } from '@/components/ui/sidebar';
import { authService } from '@/lib/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!authService.isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <main className="flex-1 p-6 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}