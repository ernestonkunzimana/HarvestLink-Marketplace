'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Package,
  Gavel,
  Receipt,
  Store,
  FileText,
  Shield,
  Home,
  X,
  TrendingUp,
  CreditCard,
  Link as LinkIcon,
  Globe,
  Heart,
  Users,
  Brain,
  Database
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { UserRole } from '@/types';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = {
  cooperative: [
    { href: '/cooperative/dashboard', label: 'Dashboard', icon: Home },
    { href: '/cooperative/inventory', label: 'Inventory', icon: Package },
    { href: '/cooperative/bids', label: 'Bids', icon: Gavel },
    { href: '/cooperative/transactions', label: 'Transactions', icon: Receipt },
    { href: '/payments/escrow', label: 'Escrow', icon: CreditCard },
    { href: '/traceability', label: 'Traceability', icon: LinkIcon },
  ],
  buyer: [
    { href: '/buyer/marketplace', label: 'Marketplace', icon: Store },
    { href: '/buyer/bids', label: 'My Bids', icon: Gavel },
    { href: '/buyer/transactions', label: 'Transactions', icon: Receipt },
    { href: '/payments/escrow', label: 'Escrow', icon: CreditCard },
    { href: '/regional', label: 'Regional Trade', icon: Globe },
  ],
  government: [
    { href: '/gov/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/gov/reports', label: 'Reports', icon: FileText },
    { href: '/gov/compliance', label: 'Compliance', icon: Shield },
    { href: '/ai/price-prediction', label: 'Price Prediction', icon: TrendingUp },
    { href: '/analytics/farmer-income', label: 'Farmer Analytics', icon: BarChart3 },
    { href: '/regional', label: 'Regional Trade', icon: Globe },
  ],
  patient: [
    { href: '/health/dashboard', label: 'Health Dashboard', icon: Heart },
    { href: '/health/nida-integration', label: 'My Digital ID', icon: CreditCard },
    { href: '/health/claims', label: 'My Claims', icon: FileText },
  ],
  hospital: [
    { href: '/health/dashboard', label: 'Health Dashboard', icon: Heart },
    { href: '/health/nida-integration', label: 'Patient Lookup', icon: Users },
    { href: '/health/claims', label: 'Claims Processing', icon: Brain },
  ],
  insurer: [
    { href: '/health/dashboard', label: 'Insurance Dashboard', icon: Shield },
    { href: '/health/claims', label: 'Claims Review', icon: FileText },
    { href: '/health/nida-integration', label: 'Policy Verification', icon: Database },
  ],
  pharmacy: [
    { href: '/health/dashboard', label: 'Pharmacy Dashboard', icon: Heart },
    { href: '/health/nida-integration', label: 'Prescription Lookup', icon: Users },
    { href: '/health/claims', label: 'Medication Claims', icon: Package },
  ],
  regulator: [
    { href: '/health/dashboard', label: 'Regulatory Dashboard', icon: Shield },
    { href: '/health/claims', label: 'Claims Analytics', icon: BarChart3 },
    { href: '/health/nida-integration', label: 'System Compliance', icon: Database },
  ],
};

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const user = authService.getCurrentUser();
  
  if (!user) return null;

  const items = navigationItems[user.role as UserRole] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="font-semibold text-lg">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-green-600 hover:bg-green-700"
                  )}
                  onClick={onClose}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}