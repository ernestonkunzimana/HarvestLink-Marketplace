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
import { Download } from 'lucide-react';
import { mockTransactions } from '@/lib/mock-data';

export default function CooperativeTransactions() {
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

  const totalRevenue = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">View your completed sales and payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Completed Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTransactions.filter(t => t.status === 'completed').length}
              </div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Average Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                RWF {Math.round(totalRevenue / mockTransactions.length).toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Per transaction</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      #{transaction.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.buyerName}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReceipt(transaction.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
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