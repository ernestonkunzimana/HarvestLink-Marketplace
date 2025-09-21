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
import { Download, Eye } from 'lucide-react';
import { mockTransactions } from '@/lib/mock-data';

export default function BuyerTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadReceipt = (transactionId: string) => {
    console.log('Downloading receipt for transaction:', transactionId);
    // Mock PDF download
  };

  const handleViewContract = (transactionId: string) => {
    console.log('Viewing contract for transaction:', transactionId);
    // Mock contract view
  };

  const totalSpent = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalPurchases = mockTransactions.filter(t => t.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
          <p className="text-gray-600">View your purchase contracts and receipts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {totalSpent.toLocaleString()}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPurchases}</div>
              <p className="text-xs text-gray-500">Completed orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Average Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                RWF {totalPurchases > 0 ? Math.round(totalSpent / totalPurchases).toLocaleString() : '0'}
              </div>
              <p className="text-xs text-gray-500">Per transaction</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Cooperative</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      #{transaction.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.cooperativeName}
                    </TableCell>
                    <TableCell>{transaction.crop}</TableCell>
                    <TableCell>{transaction.quantity} units</TableCell>
                    <TableCell className="font-medium">
                      RWF {transaction.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.completedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewContract(transaction.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(transaction.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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