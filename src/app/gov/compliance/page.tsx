'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
import { mockComplianceAlerts } from '@/lib/mock-data';
import { useState } from 'react';

export default function GovernmentCompliance() {
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  const filteredAlerts = mockComplianceAlerts.filter(alert => {
    const matchesStatus = !statusFilter || alert.status === statusFilter;
    const matchesSeverity = !severityFilter || alert.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'underpricing':
        return <AlertTriangle className="h-4 w-4" />;
      case 'quality_issue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'tax_compliance':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleViewDetails = (alertId: string) => {
    console.log('Viewing alert details:', alertId);
    // Mock action
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
    // Mock action
  };

  const complianceStats = {
    total: mockComplianceAlerts.length,
    open: mockComplianceAlerts.filter(a => a.status === 'open').length,
    resolved: mockComplianceAlerts.filter(a => a.status === 'resolved').length,
    high: mockComplianceAlerts.filter(a => a.severity === 'high').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Monitoring</h1>
          <p className="text-gray-600">Monitor and manage compliance violations and alerts</p>
        </div>

        {/* Compliance Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceStats.total}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Open Alerts</CardTitle>
              <Clock className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{complianceStats.open}</div>
              <p className="text-xs text-gray-500">Requiring attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{complianceStats.resolved}</div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{complianceStats.high}</div>
              <p className="text-xs text-gray-500">Urgent action needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setStatusFilter('');
                setSeverityFilter('');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Cooperative</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(alert.type)}
                        <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{alert.description}</p>
                    </TableCell>
                    <TableCell className="font-medium">
                      {alert.cooperativeName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {alert.buyerName}
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(alert.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {alert.status === 'open' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}