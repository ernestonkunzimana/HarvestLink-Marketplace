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
import { Check, X, MessageSquare } from 'lucide-react';
import { mockBids } from '@/lib/mock-data';

export default function CooperativeBids() {
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

  const handleAcceptBid = (bidId: string) => {
    console.log('Accepting bid:', bidId);
    // Mock action
  };

  const handleRejectBid = (bidId: string) => {
    console.log('Rejecting bid:', bidId);
    // Mock action
  };

  const handleCounterBid = (bidId: string) => {
    console.log('Countering bid:', bidId);
    // Mock action
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bid Management</h1>
          <p className="text-gray-600">Review and respond to buyer bids</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Incoming Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
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
                        <p className="font-medium">{bid.buyerName}</p>
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
                            onClick={() => handleAcceptBid(bid.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectBid(bid.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCounterBid(bid.id)}
                          >
                            Counter
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