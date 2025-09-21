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
import { Produce } from '@/types';

interface BidModalProps {
  produce: Produce;
  children: React.ReactNode;
}

export function BidModal({ produce, children }: BidModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: produce.quantity.toString(),
    pricePerUnit: produce.pricePerUnit.toString(),
    message: ''
  });

  const totalAmount = parseInt(formData.quantity) * parseFloat(formData.pricePerUnit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock bid submission
    console.log('Submitting bid:', {
      produceId: produce.id,
      ...formData,
      totalAmount
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Bid for {produce.crop}</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Cooperative:</strong> {produce.cooperativeName}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Available:</strong> {produce.quantity} {produce.unit}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Listed Price:</strong> RWF {produce.pricePerUnit}/{produce.unit}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="quantity">Quantity ({produce.unit})</Label>
            <Input
              id="quantity"
              type="number"
              max={produce.quantity}
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="pricePerUnit">Your Bid Price (RWF per {produce.unit})</Label>
            <Input
              id="pricePerUnit"
              type="number"
              step="0.01"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
              required
            />
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-800">
              Total Amount: RWF {totalAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Add any additional information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Bid</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}