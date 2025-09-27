'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Heart, 
  Users, 
  FileText, 
  Shield, 
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle 
} from 'lucide-react';

export default function HealthDashboard() {
  const stats = [
    {
      title: 'Active Patients',
      value: '24,847',
      description: 'Registered in NIDA system',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Claims Processing',
      value: '156',
      description: 'Pending AI verification',
      icon: FileText,
      color: 'text-yellow-600'
    },
    {
      title: 'Insurance Coverage',
      value: '98.2%',
      description: 'Population covered',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      description: 'Last 30 days',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Processing Time',
      value: '2.3 min',
      description: '↓ 70% from baseline',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Fraud Detection',
      value: '0.02%',
      description: 'AI accuracy 98.5%',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-600" />
            Rwanda National Health API Gateway
          </h1>
          <p className="text-gray-600">ClaimSense-powered intelligent health infrastructure</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Real-time Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Real-time Claims Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Claim #CLS-2024-0156</p>
                      <p className="text-sm text-gray-600">Kigali Hospital → Mutuelle</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Approved</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Claim #CLS-2024-0157</p>
                      <p className="text-sm text-gray-600">Butaro Hospital → Private Insurance</p>
                    </div>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Processing</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Claim #CLS-2024-0158</p>
                      <p className="text-sm text-gray-600">Pharmacy Plus → Mituelle</p>
                    </div>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">Under Review</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                NIDA Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Digital ID Verifications</span>
                  <span className="text-sm font-medium">1,247 today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Insurance Card Links</span>
                  <span className="text-sm font-medium">98.2% success</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Real-time Sync</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Sovereignty</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-600">Compliant</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Architecture Overview */}
        <Card>
          <CardHeader>
            <CardTitle>ClaimSense Intelligence Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Layer 1</div>
                <p className="text-sm text-gray-600">API Gateway</p>
                <p className="text-xs text-gray-500 mt-1">Routes all health system requests</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Layer 2-4</div>
                <p className="text-sm text-gray-600">Integration & Claims</p>
                <p className="text-xs text-gray-500 mt-1">Hospital, Insurance, Pharmacy connectors</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">Layer 5-6</div>
                <p className="text-sm text-gray-600">IoT & AI</p>
                <p className="text-xs text-gray-500 mt-1">Monitoring, fraud detection, predictions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Layer 7-8</div>
                <p className="text-sm text-gray-600">Blockchain & UI</p>
                <p className="text-xs text-gray-500 mt-1">Immutable records, stakeholder dashboards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}