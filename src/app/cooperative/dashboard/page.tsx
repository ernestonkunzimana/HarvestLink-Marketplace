'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Package, Gavel, DollarSign, TrendingUp } from 'lucide-react';
import { mockProduce, mockBids, mockTransactions } from '@/lib/mock-data';

export default function CooperativeDashboard() {
  const totalInventory = mockProduce.filter(p => p.status === 'available').length;
  const activeBids = mockBids.filter(b => b.status === 'pending').length;
  const totalPayouts = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);
  const monthlyGrowth = 12.5; // Mock percentage

  const stats = [
    {
      title: 'Active Inventory',
      value: totalInventory.toString(),
      description: 'Items available for sale',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Bids',
      value: activeBids.toString(),
      description: 'Awaiting your response',
      icon: Gavel,
      color: 'text-orange-600'
    },
    {
      title: 'Total Payouts',
      value: `RWF ${totalPayouts.toLocaleString()}`,
      description: 'This month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Growth',
      value: `+${monthlyGrowth}%`,
      description: 'vs last month',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const recentBids = mockBids.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cooperative Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your cooperative.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{bid.crop}</p>
                      <p className="text-sm text-gray-600">{bid.buyerName}</p>
                      <p className="text-sm text-gray-500">
                        {bid.quantity} units @ RWF {bid.pricePerUnit}
                      </p>
                    </div>
                    <Badge 
                      variant={bid.status === 'pending' ? 'default' : 
                               bid.status === 'accepted' ? 'secondary' : 'destructive'}
                    >
                      {bid.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProduce.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.crop}</p>
                      <p className="text-sm text-gray-600">{item.location}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} - {item.quality}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">RWF {item.pricePerUnit}</p>
                      <Badge variant={item.status === 'available' ? 'secondary' : 'outline'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}