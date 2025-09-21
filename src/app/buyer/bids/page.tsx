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
import { MessageSquare, Edit } from 'lucide-react';
import { mockBids } from '@/lib/mock-data';

export default function BuyerBids() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'countered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditBid = (bidId: string) => {
    console.log('Editing bid:', bidId);
    // Mock action
  };

  const handleWithdrawBid = (bidId: string) => {
    console.log('Withdrawing bid:', bidId);
    // Mock action
  };

  const bidStats = {
    total: mockBids.length,
    pending: mockBids.filter(b => b.status === 'pending').length,
    accepted: mockBids.filter(b => b.status === 'accepted').length,
    rejected: mockBids.filter(b => b.status === 'rejected').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
          <p className="text-gray-600">Track the status of your submitted bids</p>
        </div>

        {/* Bid Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bidStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{bidStats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{bidStats.accepted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{bidStats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bid History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cooperative</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Bid Price</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{bid.cooperativeName}</p>
                        {bid.message && (
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {bid.message}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{bid.crop}</TableCell>
                    <TableCell>{bid.quantity} units</TableCell>
                    <TableCell>RWF {bid.pricePerUnit}</TableCell>
                    <TableCell className="font-medium">
                      RWF {bid.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bid.status)}>
                        {bid.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(bid.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {bid.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBid(bid.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWithdrawBid(bid.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Withdraw
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
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