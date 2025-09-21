'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { BidModal } from '@/components/modals/bid-modal';
import { Search, MapPin, Calendar, ShoppingCart } from 'lucide-react';
import { mockProduce } from '@/lib/mock-data';

export default function BuyerMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredProduce = mockProduce.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.cooperativeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !cropFilter || item.crop === cropFilter;
    const matchesLocation = !locationFilter || item.location.includes(locationFilter);
    const isAvailable = item.status === 'available';
    
    return matchesSearch && matchesCrop && matchesLocation && isAvailable;
  });

  const uniqueCrops = [...new Set(mockProduce.map(item => item.crop))];
  const uniqueLocations = [...new Set(mockProduce.map(item => item.location.split(',')[0]))];

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

  const handleInstantBuy = (produceId: string) => {
    console.log('Instant buy for produce:', produceId);
    // Mock instant purchase
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Discover and purchase quality produce from cooperatives</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search crops or cooperatives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={cropFilter} onValueChange={setCropFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Crops</SelectItem>
                  {uniqueCrops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setCropFilter('');
                setLocationFilter('');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Produce Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.crop}</CardTitle>
                  <Badge className={getQualityColor(item.quality)}>
                    {item.quality}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{item.cooperativeName}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Harvested: {new Date(item.harvestDate).toLocaleDateString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="font-semibold">{item.quantity} {item.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-semibold text-lg">RWF {item.pricePerUnit}</p>
                      <p className="text-xs text-gray-500">per {item.unit}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <BidModal produce={item}>
                      <Button variant="outline" className="flex-1">
                        Submit Bid
                      </Button>
                    </BidModal>
                    <Button 
                      className="flex-1"
                      onClick={() => handleInstantBuy(item.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProduce.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No produce found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setCropFilter('');
                  setLocationFilter('');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}