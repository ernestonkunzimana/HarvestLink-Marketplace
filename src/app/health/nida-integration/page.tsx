'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Phone,
  MapPin,
  Calendar,
  Search,
  RefreshCw
} from 'lucide-react';

export default function NidaIntegrationPage() {
  const [nidaId, setNidaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);

  const handleNidaLookup = async () => {
    setLoading(true);
    // Simulate NIDA API call
    setTimeout(() => {
      setPatientData({
        nidaId: nidaId,
        nationalId: '1234567890123456',
        name: 'UWIMANA Jean Baptiste',
        dateOfBirth: '1985-03-15',
        gender: 'Male',
        phone: '+250788123456',
        address: 'Gasabo District, Kigali',
        emergencyContact: {
          name: 'UWIMANA Marie Claire',
          phone: '+250788654321',
          relationship: 'Spouse'
        },
        insuranceCards: [
          {
            id: '1',
            insurerId: 'mituelle-001',
            policyNumber: 'MIT-2024-001234',
            cardType: 'mituelle',
            isActive: true,
            expiryDate: '2024-12-31',
            coverage: {
              inpatient: true,
              outpatient: true,
              pharmacy: true,
              dental: false,
              optical: false,
              maternity: false
            }
          },
          {
            id: '2',
            insurerId: 'sonarwa-001',
            policyNumber: 'SON-2024-567890',
            cardType: 'private',
            isActive: true,
            expiryDate: '2025-06-30',
            coverage: {
              inpatient: true,
              outpatient: true,
              pharmacy: true,
              dental: true,
              optical: true,
              maternity: true
            }
          }
        ],
        digitalHealthCardId: 'DHC-2024-001234',
        verificationStatus: 'verified'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CreditCard className="h-8 w-8 mr-3 text-blue-600" />
            NIDA Digital Identity Integration
          </h1>
          <p className="text-gray-600">
            Unified patient identity verification with Rwanda National ID (NIDA) and insurance cards
          </p>
        </div>

        {/* NIDA Lookup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Patient Identity Lookup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nida-id">NIDA ID / National ID / Insurance Number</Label>
                  <Input
                    id="nida-id"
                    placeholder="Enter any patient identifier..."
                    value={nidaId}
                    onChange={(e) => setNidaId(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleNidaLookup} 
                    disabled={!nidaId || loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Lookup Patient
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {patientData && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Patient verified successfully through NIDA integration
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        {patientData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600">Full Name</Label>
                    <p className="font-medium text-lg">{patientData.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">NIDA ID</Label>
                      <p className="font-medium">{patientData.nidaId}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">National ID</Label>
                      <p className="font-medium">{patientData.nationalId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Date of Birth</Label>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {patientData.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Gender</Label>
                      <p className="font-medium">{patientData.gender}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Phone Number</Label>
                    <p className="font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {patientData.phone}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Address</Label>
                    <p className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {patientData.address}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Label className="text-sm text-gray-600">Emergency Contact</Label>
                    <p className="font-medium">{patientData.emergencyContact.name}</p>
                    <p className="text-sm text-gray-600">
                      {patientData.emergencyContact.relationship} - {patientData.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Insurance Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.insuranceCards.map((card: any) => (
                    <div key={card.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">
                            {card.cardType === 'mituelle' ? 'Mutuelle de Santé' : 
                             card.cardType === 'private' ? 'Private Insurance' : 
                             'Government Insurance'}
                          </h3>
                          <p className="text-sm text-gray-600">{card.policyNumber}</p>
                        </div>
                        <Badge variant={card.isActive ? "default" : "secondary"}>
                          {card.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.inpatient ? 'text-green-500' : 'text-gray-300'}`} />
                          Inpatient
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.outpatient ? 'text-green-500' : 'text-gray-300'}`} />
                          Outpatient
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.pharmacy ? 'text-green-500' : 'text-gray-300'}`} />
                          Pharmacy
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.dental ? 'text-green-500' : 'text-gray-300'}`} />
                          Dental
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.optical ? 'text-green-500' : 'text-gray-300'}`} />
                          Optical
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className={`h-3 w-3 mr-1 ${card.coverage.maternity ? 'text-green-500' : 'text-gray-300'}`} />
                          Maternity
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Expires: {card.expiryDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Integration Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>NIDA Integration Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Unified Identity</h3>
                <p className="text-sm text-gray-600">
                  Single digital identity links all health records, insurance cards, and patient data
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Sync</h3>
                <p className="text-sm text-gray-600">
                  Instant verification and updates across hospitals, insurers, and pharmacies
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fraud Prevention</h3>
                <p className="text-sm text-gray-600">
                  AI-powered verification prevents identity fraud and duplicate claims
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}