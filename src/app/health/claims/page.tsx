'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  FileText, 
  Brain, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Zap,
  Shield,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function ClaimsProcessingPage() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  const mockClaims = [
    {
      id: 'CLS-2024-0156',
      patientName: 'UWIMANA Jean Baptiste',
      hospitalName: 'Kigali University Hospital',
      insurerName: 'Mutuelle de Santé',
      amount: 45000,
      serviceType: 'consultation',
      status: 'approved',
      submittedAt: '2024-01-25T10:30:00',
      processedAt: '2024-01-25T10:33:15',
      aiScore: 98.5,
      fraudFlags: [],
      processingTime: '3m 15s'
    },
    {
      id: 'CLS-2024-0157',
      patientName: 'MUKAMANA Alice',
      hospitalName: 'Butaro District Hospital',
      insurerName: 'SONARWA Insurance',
      amount: 125000,
      serviceType: 'treatment',
      status: 'processing',
      submittedAt: '2024-01-25T11:15:00',
      aiScore: 95.2,
      fraudFlags: [],
      processingTime: null
    },
    {
      id: 'CLS-2024-0158',
      patientName: 'NIYONZIMA Paul',
      hospitalName: 'Pharmacy Plus',
      insurerName: 'Mutuelle de Santé',
      amount: 8500,
      serviceType: 'medication',
      status: 'under_review',
      submittedAt: '2024-01-25T09:45:00',
      aiScore: 72.3,
      fraudFlags: ['duplicate_prescription', 'high_frequency'],
      processingTime: null
    },
    {
      id: 'CLS-2024-0159',
      patientName: 'UWINEZA Grace',
      hospitalName: 'King Faisal Hospital',
      insurerName: 'Britam Insurance',
      amount: 350000,
      serviceType: 'surgery',
      status: 'approved',
      submittedAt: '2024-01-25T08:20:00',
      processedAt: '2024-01-25T08:25:30',
      aiScore: 99.1,
      fraudFlags: [],
      processingTime: '5m 30s'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 mr-3 text-purple-600" />
            ClaimSense Processing Center
          </h1>
          <p className="text-gray-600">
            AI-powered real-time claims verification with blockchain audit trail
          </p>
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Claims Today
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-gray-500">↑ 12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 min</div>
              <p className="text-xs text-gray-500">↓ 70% reduction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                AI Accuracy
              </CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-gray-500">Fraud detection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Auto Approvals
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-gray-500">No human intervention</p>
            </CardContent>
          </Card>
        </div>

        {/* Claims Processing Workflow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-600" />
              ClaimSense Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Claim Submitted</p>
                <p className="text-xs text-gray-500">Hospital/Pharmacy</p>
              </div>
              
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">AI Verification</p>
                <p className="text-xs text-gray-500">&lt; 30 seconds</p>
              </div>
              
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-sm font-medium">Insurance Review</p>
                <p className="text-xs text-gray-500">Real-time API</p>
              </div>
              
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">Blockchain Record</p>
                <p className="text-xs text-gray-500">Immutable audit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Claims Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processing Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>{claim.patientName}</TableCell>
                    <TableCell>{claim.hospitalName}</TableCell>
                    <TableCell>RWF {claim.amount.toLocaleString()}</TableCell>
                    <TableCell className="capitalize">{claim.serviceType}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getAIScoreColor(claim.aiScore)}`}>
                        {claim.aiScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status.replace('_', ' ')}
                      </Badge>
                      {claim.fraudFlags.length > 0 && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-2 inline" />
                      )}
                    </TableCell>
                    <TableCell>
                      {claim.processingTime ? (
                        <span className="text-green-600 font-medium">
                          {claim.processingTime}
                        </span>
                      ) : (
                        <span className="text-gray-500">Processing...</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedClaim(claim)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Claim Details Modal */}
        {selectedClaim && (
          <Card>
            <CardHeader>
              <CardTitle>Claim Details: {selectedClaim.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Patient Information</h3>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedClaim.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    <p className="font-medium">{selectedClaim.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Insurance</p>
                    <p className="font-medium">{selectedClaim.insurerName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">AI Analysis</h3>
                  <div>
                    <p className="text-sm text-gray-600">Verification Score</p>
                    <p className={`font-medium text-lg ${getAIScoreColor(selectedClaim.aiScore)}`}>
                      {selectedClaim.aiScore}%
                    </p>
                  </div>
                  {selectedClaim.fraudFlags.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600">Fraud Flags</p>
                      <div className="space-y-1">
                        {selectedClaim.fraudFlags.map((flag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-red-600">
                            {flag.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={() => setSelectedClaim(null)}>
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Intelligence Features */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Brain className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fraud Detection</h3>
                <p className="text-sm text-gray-600">
                  ML models identify patterns, duplicate claims, and suspicious activities in real-time
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-sm text-gray-600">
                  Forecast claim volumes, optimize resource allocation, and predict patient needs
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Smart Contracts</h3>
                <p className="text-sm text-gray-600">
                  Automated claim processing with predefined rules and instant payments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}