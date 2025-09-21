'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Download, FileText, BarChart3, PieChart } from 'lucide-react';
import { mockTransactions, mockProduce } from '@/lib/mock-data';

export default function GovernmentReports() {
  const handleExportCSV = (reportType: string) => {
    console.log('Exporting CSV for:', reportType);
    // Mock CSV export
  };

  const handleExportPDF = (reportType: string) => {
    console.log('Exporting PDF for:', reportType);
    // Mock PDF export
  };

  const reportTypes = [
    {
      id: 'transactions',
      title: 'Transaction Report',
      description: 'Detailed transaction data with cooperative and buyer information',
      icon: FileText,
      records: mockTransactions.length
    },
    {
      id: 'inventory',
      title: 'Inventory Report',
      description: 'Current inventory levels across all cooperatives',
      icon: BarChart3,
      records: mockProduce.length
    },
    {
      id: 'cooperatives',
      title: 'Cooperative Performance',
      description: 'Performance metrics and analytics for registered cooperatives',
      icon: PieChart,
      records: new Set(mockProduce.map(p => p.cooperativeId)).size
    },
    {
      id: 'compliance',
      title: 'Compliance Report',
      description: 'Compliance violations and regulatory adherence data',
      icon: FileText,
      records: 15 // Mock number
    }
  ];

  const totalTransactionValue = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and export comprehensive market reports</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTransactions.length}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Transaction Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {(totalTransactionValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-gray-500">Total volume</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Active Cooperatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(mockProduce.map(p => p.cooperativeId)).size}</div>
              <p className="text-xs text-gray-500">Registered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Available Produce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProduce.filter(p => p.status === 'available').length}</div>
              <p className="text-xs text-gray-500">Items listed</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <p className="text-sm text-gray-600">
              Select report parameters and export in your preferred format
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 months</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="all-time">All time</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  <SelectItem value="kigali">Kigali</SelectItem>
                  <SelectItem value="northern">Northern Province</SelectItem>
                  <SelectItem value="southern">Southern Province</SelectItem>
                  <SelectItem value="eastern">Eastern Province</SelectItem>
                  <SelectItem value="western">Western Province</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All crops</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                  <SelectItem value="beans">Beans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Available Records</p>
                      <p className="text-2xl font-bold">{report.records}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleExportCSV(report.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleExportPDF(report.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <p className="text-sm text-gray-600">
              Build custom reports with specific data fields and filters
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Custom report builder coming soon</p>
              <Button variant="outline" disabled>
                Launch Report Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}