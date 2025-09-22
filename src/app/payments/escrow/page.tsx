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
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { EscrowModal } from '@/components/modals/escrow-modal';
import { Shield, Clock, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { mockEscrowTransactions } from '@/lib/mock-data';

export default function EscrowPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'released':
        return 'bg-green-100 text-green-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'released':
        return <CheckCircle className="h-4 w-4" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const handleViewDetails = (escrowId: string) => {
    console.log('Viewing escrow details:', escrowId);
  };

  const handleReleasePayment = (escrowId: string) => {
    console.log('Releasing payment:', escrowId);
  };

  const handleDispute = (escrowId: string) => {
    console.log('Filing dispute:', escrowId);
  };

  const escrowStats = {
    total: mockEscrowTransactions.reduce((sum, t) => sum + t.amount, 0),
    pending: mockEscrowTransactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
    released: mockEscrowTransactions.filter(t => t.status === 'released').reduce((sum, t) => sum + t.amount, 0),
    disputed: mockEscrowTransactions.filter(t => t.status === 'disputed').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="h-8 w-8 mr-3 text-blue-600" />
              Payment Escrow
            </h1>
            <p className="text-gray-600">Secure payment management with escrow protection</p>
          </div>
          <EscrowModal>
            <Button>Create Escrow</Button>
          </EscrowModal>
        </div>

        {/* Escrow Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Escrow</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {escrowStats.total.toLocaleString()}</div>
              <p className="text-xs text-gray-500">All transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">RWF {escrowStats.pending.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Awaiting release</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Released</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">RWF {escrowStats.released.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Successfully completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{escrowStats.disputed}</div>
              <p className="text-xs text-gray-500">Active disputes</p>
            </CardContent>
          </Card>
        </div>

        {/* Escrow Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Escrow Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Cooperative</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEscrowTransactions.map((escrow) => (
                  <TableRow key={escrow.id}>
                    <TableCell className="font-mono text-sm">
                      #{escrow.transactionId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {escrow.buyerName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {escrow.cooperativeName}
                    </TableCell>
                    <TableCell>{escrow.crop}</TableCell>
                    <TableCell className="font-medium">
                      RWF {escrow.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(escrow.status)}
                        <Badge className={getStatusColor(escrow.status)}>
                          {escrow.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(escrow.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(escrow.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {escrow.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReleasePayment(escrow.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Release
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDispute(escrow.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Dispute
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* How Escrow Works */}
        <Card>
          <CardHeader>
            <CardTitle>How Payment Escrow Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Payment Secured</h3>
                <p className="text-sm text-gray-600">Buyer deposits payment into secure escrow account</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Goods Delivered</h3>
                <p className="text-sm text-gray-600">Cooperative delivers produce as per agreement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Quality Verified</h3>
                <p className="text-sm text-gray-600">Buyer confirms receipt and quality of goods</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Payment Released</h3>
                <p className="text-sm text-gray-600">Funds automatically released to cooperative</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}