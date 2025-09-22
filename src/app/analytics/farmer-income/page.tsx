'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Users, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { mockFarmerIncomeData } from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function FarmerIncomeAnalytics() {
  const totalFarmers = mockFarmerIncomeData.reduce((sum, coop) => sum + coop.totalFarmers, 0);
  const averageIncome = mockFarmerIncomeData.reduce((sum, coop) => sum + coop.averageIncome, 0) / mockFarmerIncomeData.length;
  const averageGrowth = mockFarmerIncomeData.reduce((sum, coop) => sum + coop.growthRate, 0) / mockFarmerIncomeData.length;

  const pieData = mockFarmerIncomeData.map(coop => ({
    name: coop.cooperativeName.split(' ')[0],
    value: coop.totalFarmers,
    income: coop.averageIncome
  }));

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const incomeDistribution = [
    { range: '< 200K', farmers: 45, percentage: 15 },
    { range: '200K-400K', farmers: 120, percentage: 40 },
    { range: '400K-600K', farmers: 90, percentage: 30 },
    { range: '600K-800K', farmers: 35, percentage: 12 },
    { range: '> 800K', farmers: 10, percentage: 3 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-green-600" />
            Farmer Income Analytics
          </h1>
          <p className="text-gray-600">Comprehensive analysis of farmer earnings and cooperative performance</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Farmers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFarmers.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Across all cooperatives</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {Math.round(averageIncome).toLocaleString()}</div>
              <p className="text-xs text-gray-500">Per farmer per month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{averageGrowth.toFixed(1)}%</div>
              <p className="text-xs text-gray-500">Month over month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Top Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Musanze Coffee</div>
              <p className="text-xs text-gray-500">Highest average income</p>
            </CardContent>
          </Card>
        </div>

        {/* Income by Cooperative */}
        <Card>
          <CardHeader>
            <CardTitle>Average Income by Cooperative</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockFarmerIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="cooperativeName" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis formatter={(value) => `RWF ${value/1000}K`} />
                <Tooltip formatter={(value) => [`RWF ${value.toLocaleString()}`, 'Average Income']} />
                <Bar dataKey="averageIncome" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Farmer Distribution and Income Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Farmer Distribution by Cooperative</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Income Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeDistribution.map((range, index) => (
                  <div key={range.range} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium">{range.range}</p>
                        <p className="text-sm text-gray-600">{range.farmers} farmers</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {range.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cooperative Performance Details */}
        <Card>
          <CardHeader>
            <CardTitle>Cooperative Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Cooperative</th>
                    <th className="text-left p-3">Total Farmers</th>
                    <th className="text-left p-3">Average Income</th>
                    <th className="text-left p-3">Growth Rate</th>
                    <th className="text-left p-3">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFarmerIncomeData.map((coop) => (
                    <tr key={coop.cooperativeId} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{coop.cooperativeName}</td>
                      <td className="p-3">{coop.totalFarmers}</td>
                      <td className="p-3">RWF {coop.averageIncome.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`font-semibold ${coop.growthRate > 15 ? 'text-green-600' : coop.growthRate > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                          +{coop.growthRate}%
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge 
                          className={
                            coop.growthRate > 20 ? 'bg-green-100 text-green-800' :
                            coop.growthRate > 15 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {coop.growthRate > 20 ? 'Excellent' : coop.growthRate > 15 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}