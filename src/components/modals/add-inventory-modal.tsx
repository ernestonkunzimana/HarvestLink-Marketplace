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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

export function AddInventoryModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    unit: 'kg',
    quality: '',
    pricePerUnit: '',
    location: '',
    harvestDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log('Adding inventory:', formData);
    setOpen(false);
    setFormData({
      crop: '',
      quantity: '',
      unit: 'kg',
      quality: '',
      pricePerUnit: '',
      location: '',
      harvestDate: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="crop">Crop</Label>
              <Input
                id="crop"
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
                placeholder="e.g., Maize"
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                placeholder="500"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quality">Quality</Label>
              <Select value={formData.quality} onValueChange={(value) => setFormData({...formData, quality: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade A">Grade A</SelectItem>
                  <SelectItem value="Grade B">Grade B</SelectItem>
                  <SelectItem value="Grade C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="pricePerUnit">Price per Unit (RWF)</Label>
            <Input
              id="pricePerUnit"
              type="number"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
              placeholder="450"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Kigali, Gasabo"
              required
            />
          </div>

          <div>
            <Label htmlFor="harvestDate">Harvest Date</Label>
            <Input
              id="harvestDate"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Inventory</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}