'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  DollarSign,
  Package
} from 'lucide-react';
import { mockProduce, mockTransactions, mockComplianceAlerts } from '@/lib/mock-data';

export default function GovernmentDashboard() {
  const activeListings = mockProduce.filter(p => p.status === 'available').length;
  const totalTransactionVolume = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);
  const openAlerts = mockComplianceAlerts.filter(a => a.status === 'open').length;
  const activeCooperatives = new Set(mockProduce.map(p => p.cooperativeId)).size;

  const stats = [
    {
      title: 'Active Listings',
      value: activeListings.toString(),
      description: 'Available produce',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Transaction Volume',
      value: `RWF ${(totalTransactionVolume / 1000000).toFixed(1)}M`,
      description: 'This month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Cooperatives',
      value: activeCooperatives.toString(),
      description: 'Registered and trading',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Compliance Alerts',
      value: openAlerts.toString(),
      description: 'Requiring attention',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  const recentAlerts = mockComplianceAlerts.slice(0, 3);
  const topCrops = mockProduce.reduce((acc, item) => {
    acc[item.crop] = (acc[item.crop] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Government Dashboard</h1>
          <p className="text-gray-600">Monitor agricultural trade and compliance across Rwanda</p>
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

        {/* Analytics and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Recent Compliance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.description}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {alert.cooperativeName} → {alert.buyerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : 
                                alert.severity === 'medium' ? 'default' : 'secondary'}
                      >
                        {alert.severity}
                      </Badge>
                      <Badge 
                        variant={alert.status === 'open' ? 'destructive' : 'secondary'}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Top Crops by Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(topCrops)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([crop, quantity]) => (
                    <div key={crop} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{crop}</p>
                        <p className="text-sm text-gray-600">{quantity} kg available</p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(quantity / Math.max(...Object.values(topCrops))) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockTransactions.filter(t => t.status === 'completed').length}
                </div>
                <p className="text-sm text-gray-600">Completed Transactions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  RWF {Math.round(totalTransactionVolume / mockTransactions.length / 1000)}K
                </div>
                <p className="text-sm text-gray-600">Average Transaction Value</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((mockTransactions.filter(t => t.status === 'completed').length / mockTransactions.length) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}