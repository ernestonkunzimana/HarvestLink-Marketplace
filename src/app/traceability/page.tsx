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
import { BlockchainModal } from '@/components/modals/blockchain-modal';
import { Link, Shield, Award, Eye, ExternalLink } from 'lucide-react';
import { mockTraceabilityRecords } from '@/lib/mock-data';

export default function TraceabilityPage() {
  const handleViewBlockchain = (recordId: string) => {
    console.log('Viewing blockchain record:', recordId);
  };

  const handleExportCertificate = (recordId: string) => {
    console.log('Exporting certificate:', recordId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Link className="h-8 w-8 mr-3 text-purple-600" />
            Blockchain Traceability
          </h1>
          <p className="text-gray-600">Track produce from farm to export with immutable blockchain records</p>
        </div>

        {/* Traceability Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tracked Batches</CardTitle>
              <Link className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTraceabilityRecords.length}</div>
              <p className="text-xs text-gray-500">Active records</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Certified Organic</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockTraceabilityRecords.filter(r => r.certifications.includes('Organic')).length}
              </div>
              <p className="text-xs text-gray-500">Organic certified</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Export Ready</CardTitle>
              <ExternalLink className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockTraceabilityRecords.filter(r => r.exportDate).length}
              </div>
              <p className="text-xs text-gray-500">Exported batches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Blockchain Verified</CardTitle>
              <Shield className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <p className="text-xs text-gray-500">Verification rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Traceability Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Traceability Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Supply Chain</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Certifications</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTraceabilityRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">
                      {record.batchId}
                    </TableCell>
                    <TableCell className="font-medium">{record.crop}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>{record.farmer}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>{record.cooperative}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>{record.buyer}</span>
                        </div>
                        {record.exporter && (
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            <span>{record.exporter}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(record.harvestDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.exportDate ? 'default' : 'secondary'}>
                        {record.exportDate ? 'Exported' : 'In Transit'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {record.certifications.slice(0, 2).map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {record.certifications.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{record.certifications.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <BlockchainModal record={record}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </BlockchainModal>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportCertificate(record.id)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Blockchain Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Traceability Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Immutable Records</h3>
                <p className="text-sm text-gray-600">
                  All transactions and quality checks are permanently recorded on the blockchain
                </p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quality Assurance</h3>
                <p className="text-sm text-gray-600">
                  Verify certifications and quality standards throughout the supply chain
                </p>
              </div>
              <div className="text-center">
                <ExternalLink className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Export Compliance</h3>
                <p className="text-sm text-gray-600">
                  Meet international traceability requirements for global markets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}