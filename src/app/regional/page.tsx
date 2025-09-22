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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Globe, Search, MapPin, Calendar, ShoppingCart } from 'lucide-react';
import { mockRegionalOffers } from '@/lib/mock-data';

export default function RegionalTradePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [tradeAgreementFilter, setTradeAgreementFilter] = useState('');

  const filteredOffers = mockRegionalOffers.filter(offer => {
    const matchesSearch = offer.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.exporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !countryFilter || offer.country === countryFilter;
    const matchesCrop = !cropFilter || offer.crop === cropFilter;
    const matchesAgreement = !tradeAgreementFilter || offer.tradeAgreement === tradeAgreementFilter;
    
    return matchesSearch && matchesCountry && matchesCrop && matchesAgreement;
  });

  const uniqueCountries = [...new Set(mockRegionalOffers.map(offer => offer.country))];
  const uniqueCrops = [...new Set(mockRegionalOffers.map(offer => offer.crop))];
  const uniqueAgreements = [...new Set(mockRegionalOffers.map(offer => offer.tradeAgreement))];

  const getAgreementColor = (agreement: string) => {
    switch (agreement) {
      case 'AfCFTA':
        return 'bg-blue-100 text-blue-800';
      case 'COMESA':
        return 'bg-green-100 text-green-800';
      case 'EAC':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePlaceOrder = (offerId: string) => {
    console.log('Placing order for offer:', offerId);
  };

  const handleContactExporter = (offerId: string) => {
    console.log('Contacting exporter for offer:', offerId);
  };

  const totalValue = filteredOffers.reduce((sum, offer) => sum + (offer.quantity * offer.pricePerUnit), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Globe className="h-8 w-8 mr-3 text-blue-600" />
            Regional Trade Marketplace
          </h1>
          <p className="text-gray-600">Cross-border agricultural trade opportunities across Africa</p>
        </div>

        {/* Trade Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available Offers</CardTitle>
              <Globe className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredOffers.length}</div>
              <p className="text-xs text-gray-500">Cross-border opportunities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Countries</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCountries.length}</div>
              <p className="text-xs text-gray-500">Trading partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">USD {(totalValue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-gray-500">Available inventory</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Trade Agreements</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueAgreements.length}</div>
              <p className="text-xs text-gray-500">Active frameworks</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search crops or exporters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {uniqueCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select value={tradeAgreementFilter} onValueChange={setTradeAgreementFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trade agreement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Agreements</SelectItem>
                  {uniqueAgreements.map(agreement => (
                    <SelectItem key={agreement} value={agreement}>{agreement}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setCountryFilter('');
                setCropFilter('');
                setTradeAgreementFilter('');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Regional Offers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Regional Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Exporter</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Trade Agreement</TableHead>
                  <TableHead>Available Until</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{offer.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{offer.exporter}</TableCell>
                    <TableCell>{offer.crop}</TableCell>
                    <TableCell>{offer.quantity} kg</TableCell>
                    <TableCell className="font-medium">
                      USD {offer.pricePerUnit}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{offer.quality}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAgreementColor(offer.tradeAgreement)}>
                        {offer.tradeAgreement}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(offer.availableUntil).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactExporter(offer.id)}
                        >
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handlePlaceOrder(offer.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Trade Agreements Info */}
        <Card>
          <CardHeader>
            <CardTitle>Trade Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-blue-100 text-blue-800 mb-3">AfCFTA</Badge>
                <h3 className="font-semibold mb-2">African Continental Free Trade Area</h3>
                <p className="text-sm text-gray-600">
                  Largest free trade area in the world by participating countries since the WTO
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-green-100 text-green-800 mb-3">COMESA</Badge>
                <h3 className="font-semibold mb-2">Common Market for Eastern and Southern Africa</h3>
                <p className="text-sm text-gray-600">
                  Regional economic community with 21 member states
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-100 text-purple-800 mb-3">EAC</Badge>
                <h3 className="font-semibold mb-2">East African Community</h3>
                <p className="text-sm text-gray-600">
                  Intergovernmental organization of 7 countries in the Great Lakes region
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}