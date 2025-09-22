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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EscrowModalProps {
  children: React.ReactNode;
}

export function EscrowModal({ children }: EscrowModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    transactionId: '',
    amount: '',
    buyerName: '',
    cooperativeName: '',
    crop: '',
    releaseConditions: '',
    escrowDuration: '7'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating escrow:', formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Payment Escrow</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                value={formData.transactionId}
                onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                placeholder="TXN-001"
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (RWF)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="225000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buyerName">Buyer Name</Label>
              <Input
                id="buyerName"
                value={formData.buyerName}
                onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                placeholder="AgriTrade Rwanda Ltd"
                required
              />
            </div>
            <div>
              <Label htmlFor="cooperativeName">Cooperative Name</Label>
              <Input
                id="cooperativeName"
                value={formData.cooperativeName}
                onChange={(e) => setFormData({...formData, cooperativeName: e.target.value})}
                placeholder="Kigali Farmers Cooperative"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="crop">Crop</Label>
              <Input
                id="crop"
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
                placeholder="Rice"
                required
              />
            </div>
            <div>
              <Label htmlFor="escrowDuration">Escrow Duration (days)</Label>
              <Select value={formData.escrowDuration} onValueChange={(value) => setFormData({...formData, escrowDuration: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="releaseConditions">Release Conditions</Label>
            <Textarea
              id="releaseConditions"
              value={formData.releaseConditions}
              onChange={(e) => setFormData({...formData, releaseConditions: e.target.value})}
              placeholder="Payment will be released upon successful delivery and quality verification..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Escrow Protection</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Payment is held securely until conditions are met</li>
              <li>• Automatic release after verification</li>
              <li>• Dispute resolution available if needed</li>
              <li>• Full refund if delivery fails</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Escrow</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}