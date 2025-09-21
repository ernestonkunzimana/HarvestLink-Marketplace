'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell, Globe, LogOut, Menu, User } from 'lucide-react';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'cooperative':
        return 'bg-green-100 text-green-800';
      case 'buyer':
        return 'bg-blue-100 text-blue-800';
      case 'government':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HL</span>
            </div>
            <span className="font-bold text-xl text-gray-900">HarvestLink</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {languages.find(l => l.code === language)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}