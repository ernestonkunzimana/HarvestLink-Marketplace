'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { TraceabilityRecord } from '@/types';
import { Link, Shield, Award, Calendar, User, Building, Truck, ExternalLink } from 'lucide-react';

interface BlockchainModalProps {
  record: TraceabilityRecord;
  children: React.ReactNode;
}

export function BlockchainModal({ record, children }: BlockchainModalProps) {
  const [open, setOpen] = useState(false);

  const handleViewOnBlockchain = () => {
    console.log('Opening blockchain explorer for hash:', record.blockchainHash);
    // Mock blockchain explorer link
  };

  const handleDownloadCertificate = () => {
    console.log('Downloading certificate for batch:', record.batchId);
    // Mock certificate download
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Link className="h-5 w-5 mr-2 text-purple-600" />
            Blockchain Record: {record.batchId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Blockchain Hash */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-600" />
                Blockchain Verification
              </h3>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">Transaction Hash:</p>
            <p className="font-mono text-xs bg-white p-2 rounded border break-all">
              {record.blockchainHash}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={handleViewOnBlockchain}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Blockchain Explorer
            </Button>
          </div>

          {/* Supply Chain Journey */}
          <div>
            <h3 className="font-semibold mb-4">Supply Chain Journey</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <User className="h-5 w-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Farmer</p>
                  <p className="text-sm text-gray-600">{record.farmer}</p>
                  <p className="text-xs text-gray-500">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Harvested: {new Date(record.harvestDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Building className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Cooperative</p>
                  <p className="text-sm text-gray-600">{record.cooperative}</p>
                  <p className="text-xs text-gray-500">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Processed: {new Date(record.processingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Truck className="h-5 w-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Buyer</p>
                  <p className="text-sm text-gray-600">{record.buyer}</p>
                  <p className="text-xs text-gray-500">Purchase confirmed</p>
                </div>
              </div>

              {record.exporter && (
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-orange-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">Exporter</p>
                    <p className="text-sm text-gray-600">{record.exporter}</p>
                    {record.exportDate && (
                      <p className="text-xs text-gray-500">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Exported: {new Date(record.exportDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Award className="h-4 w-4 mr-2 text-yellow-600" />
              Certifications & Quality Standards
            </h3>
            <div className="flex flex-wrap gap-2">
              {record.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                  <Award className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Crop Type</p>
                <p className="font-medium">{record.crop}</p>
              </div>
              <div>
                <p className="text-gray-600">Batch ID</p>
                <p className="font-mono">{record.batchId}</p>
              </div>
              <div>
                <p className="text-gray-600">Harvest Date</p>
                <p className="font-medium">{new Date(record.harvestDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Processing Date</p>
                <p className="font-medium">{new Date(record.processingDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleDownloadCertificate}>
              Download Certificate
            </Button>
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}