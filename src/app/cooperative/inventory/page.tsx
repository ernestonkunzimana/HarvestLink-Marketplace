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
import { AddInventoryModal } from '@/components/modals/add-inventory-modal';
import { Edit, Trash2 } from 'lucide-react';
import { mockProduce } from '@/lib/mock-data';

export default function CooperativeInventory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Grade A':
        return 'bg-green-100 text-green-800';
      case 'Grade B':
        return 'bg-yellow-100 text-yellow-800';
      case 'Grade C':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Manage your cooperative's produce inventory</p>
          </div>
          <AddInventoryModal />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProduce.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.crop}</TableCell>
                    <TableCell>{item.quantity} {item.unit}</TableCell>
                    <TableCell>
                      <Badge className={getQualityColor(item.quality)}>
                        {item.quality}
                      </Badge>
                    </TableCell>
                    <TableCell>RWF {item.pricePerUnit}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{new Date(item.harvestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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