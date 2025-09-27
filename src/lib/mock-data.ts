import { Produce, Bid, Transaction, ComplianceAlert, User } from '@/types';
import { PricePrediction, EscrowTransaction, TraceabilityRecord, RegionalOffer, FarmerIncomeData, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Kigali Farmers Cooperative',
    email: 'info@kigalifarmer.coop',
    phone: '+250788123456',
    role: 'cooperative',
    organization: 'Kigali Farmers Cooperative'
  },
  {
    id: '2',
    name: 'AgriTrade Rwanda Ltd',
    email: 'buyer@agritrade.rw',
    phone: '+250788654321',
    role: 'buyer',
    organization: 'AgriTrade Rwanda Ltd'
  },
  {
    id: '3',
    name: 'MINAGRI Officer',
    email: 'officer@minagri.gov.rw',
    phone: '+250788999888',
    role: 'government',
    organization: 'Ministry of Agriculture'
  },
  // Health System Users
  {
    id: '4',
    name: 'UWIMANA Jean Baptiste',
    email: 'uwimana.jean@gmail.com',
    phone: '+250788111222',
    role: 'patient',
    organization: 'Patient'
  },
  {
    id: '5',
    name: 'Dr. MUKAMANA Alice',
    email: 'mukamana@kuh.rw',
    phone: '+250788333444',
    role: 'hospital',
    organization: 'Kigali University Hospital'
  },
  {
    id: '6',
    name: 'NIYONZIMA Paul',
    email: 'niyonzima@mutuelle.rw',
    phone: '+250788555666',
    role: 'insurer',
    organization: 'Mutuelle de Santé'
  },
  {
    id: '7',
    name: 'UWINEZA Grace',
    email: 'grace@pharmacyplus.rw',
    phone: '+250788777888',
    role: 'pharmacy',
    organization: 'Pharmacy Plus'
  },
  {
    id: '8',
    name: 'MOH Regulator',
    email: 'regulator@moh.gov.rw',
    phone: '+250788999000',
    role: 'regulator',
    organization: 'Ministry of Health'
  }
];

export const mockProduce: Produce[] = [
  {
    id: '1',
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    crop: 'Maize',
    quantity: 500,
    unit: 'kg',
    quality: 'Grade A',
    pricePerUnit: 450,
    location: 'Kigali, Gasabo',
    harvestDate: '2024-01-15',
    status: 'available'
  },
  {
    id: '2',
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    crop: 'Rice',
    quantity: 300,
    unit: 'kg',
    quality: 'Grade B',
    pricePerUnit: 800,
    location: 'Kigali, Nyarugenge',
    harvestDate: '2024-01-10',
    status: 'available'
  },
  {
    id: '3',
    cooperativeId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    crop: 'Coffee',
    quantity: 200,
    unit: 'kg',
    quality: 'Grade A',
    pricePerUnit: 2500,
    location: 'Musanze',
    harvestDate: '2024-01-20',
    status: 'available'
  },
  {
    id: '4',
    cooperativeId: '3',
    cooperativeName: 'Southern Beans Collective',
    crop: 'Beans',
    quantity: 400,
    unit: 'kg',
    quality: 'Grade B',
    pricePerUnit: 350,
    location: 'Huye',
    harvestDate: '2024-01-12',
    status: 'available'
  }
];

export const mockBids: Bid[] = [
  {
    id: '1',
    produceId: '1',
    buyerId: '2',
    buyerName: 'AgriTrade Rwanda Ltd',
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    crop: 'Maize',
    quantity: 500,
    pricePerUnit: 420,
    totalAmount: 210000,
    status: 'pending',
    submittedAt: '2024-01-25T10:30:00Z',
    message: 'Interested in bulk purchase for export'
  },
  {
    id: '2',
    produceId: '2',
    buyerId: '2',
    buyerName: 'AgriTrade Rwanda Ltd',
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    crop: 'Rice',
    quantity: 300,
    pricePerUnit: 750,
    totalAmount: 225000,
    status: 'accepted',
    submittedAt: '2024-01-24T14:15:00Z'
  },
  {
    id: '3',
    produceId: '3',
    buyerId: '2',
    buyerName: 'AgriTrade Rwanda Ltd',
    cooperativeId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    crop: 'Coffee',
    quantity: 150,
    pricePerUnit: 2400,
    totalAmount: 360000,
    status: 'rejected',
    submittedAt: '2024-01-23T09:20:00Z'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    produceId: '2',
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    buyerId: '2',
    buyerName: 'AgriTrade Rwanda Ltd',
    crop: 'Rice',
    quantity: 300,
    pricePerUnit: 750,
    totalAmount: 225000,
    status: 'completed',
    completedAt: '2024-01-24T16:00:00Z',
    paymentMethod: 'MTN Mobile Money'
  },
  {
    id: '2',
    produceId: '4',
    cooperativeId: '3',
    cooperativeName: 'Southern Beans Collective',
    buyerId: '2',
    buyerName: 'AgriTrade Rwanda Ltd',
    crop: 'Beans',
    quantity: 200,
    pricePerUnit: 350,
    totalAmount: 70000,
    status: 'completed',
    completedAt: '2024-01-23T11:30:00Z',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '3',
    produceId: '3',
    cooperativeId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    buyerId: '3',
    buyerName: 'Export Partners Ltd',
    crop: 'Coffee',
    quantity: 150,
    pricePerUnit: 2400,
    totalAmount: 360000,
    status: 'pending',
    completedAt: '2024-01-25T09:00:00Z',
    paymentMethod: 'Escrow'
  }
];

export const mockComplianceAlerts: ComplianceAlert[] = [
  {
    id: '1',
    type: 'underpricing',
    transactionId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    buyerName: 'AgriTrade Rwanda Ltd',
    description: 'Rice sold below minimum price floor of RWF 800/kg',
    severity: 'medium',
    createdAt: '2024-01-24T16:05:00Z',
    status: 'open'
  },
  {
    id: '2',
    type: 'tax_compliance',
    transactionId: '3',
    cooperativeName: 'Musanze Coffee Growers',
    buyerName: 'Export Partners Ltd',
    description: 'Export tax documentation pending verification',
    severity: 'high',
    createdAt: '2024-01-25T09:30:00Z',
    status: 'open'
  },
  {
    id: '3',
    type: 'quality_issue',
    transactionId: '2',
    cooperativeName: 'Southern Beans Collective',
    buyerName: 'AgriTrade Rwanda Ltd',
    description: 'Quality inspection report missing for beans shipment',
    severity: 'low',
    createdAt: '2024-01-23T12:00:00Z',
    status: 'resolved'
  }
];

export const mockPricePredictions: PricePrediction[] = [
  {
    id: '1',
    crop: 'Maize',
    currentPrice: 450,
    predictedPrice: 520,
    month: '2024-03',
    confidence: 85,
    factors: ['Seasonal demand increase', 'Weather patterns', 'Export opportunities']
  },
  {
    id: '2',
    crop: 'Rice',
    currentPrice: 800,
    predictedPrice: 750,
    month: '2024-03',
    confidence: 78,
    factors: ['Increased local production', 'Import competition']
  },
  {
    id: '3',
    crop: 'Coffee',
    currentPrice: 2500,
    predictedPrice: 2800,
    month: '2024-03',
    confidence: 92,
    factors: ['Global coffee shortage', 'Premium quality demand', 'Export contracts']
  },
  {
    id: '4',
    crop: 'Beans',
    currentPrice: 350,
    predictedPrice: 380,
    month: '2024-03',
    confidence: 73,
    factors: ['Regional demand', 'Protein market growth']
  }
];

export const mockEscrowTransactions: EscrowTransaction[] = [
  {
    id: '1',
    transactionId: '1',
    amount: 225000,
    status: 'released',
    buyerName: 'AgriTrade Rwanda Ltd',
    cooperativeName: 'Kigali Farmers Cooperative',
    crop: 'Rice',
    createdAt: '2024-01-24T14:00:00Z',
    releaseDate: '2024-01-24T16:00:00Z'
  },
  {
    id: '2',
    transactionId: '3',
    amount: 360000,
    status: 'pending',
    buyerName: 'Export Partners Ltd',
    cooperativeName: 'Musanze Coffee Growers',
    crop: 'Coffee',
    createdAt: '2024-01-25T09:00:00Z'
  },
  {
    id: '3',
    transactionId: '4',
    amount: 95000,
    status: 'disputed',
    buyerName: 'Local Traders Co',
    cooperativeName: 'Southern Beans Collective',
    crop: 'Beans',
    createdAt: '2024-01-23T11:00:00Z',
    disputeReason: 'Quality concerns raised by buyer'
  }
];

export const mockTraceabilityRecords: TraceabilityRecord[] = [
  {
    id: '1',
    batchId: 'KFC-MZ-2024-001',
    crop: 'Maize',
    farmer: 'Jean Baptiste Uwimana',
    cooperative: 'Kigali Farmers Cooperative',
    buyer: 'AgriTrade Rwanda Ltd',
    exporter: 'East Africa Exports',
    harvestDate: '2024-01-15',
    processingDate: '2024-01-18',
    exportDate: '2024-01-25',
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
    certifications: ['Organic', 'Fair Trade', 'Quality Grade A']
  },
  {
    id: '2',
    batchId: 'MCG-CF-2024-002',
    crop: 'Coffee',
    farmer: 'Marie Claire Mukamana',
    cooperative: 'Musanze Coffee Growers',
    buyer: 'Premium Coffee Buyers',
    harvestDate: '2024-01-20',
    processingDate: '2024-01-22',
    blockchainHash: '0x9876543210fedcba0987654321abcdef',
    certifications: ['Specialty Grade', 'Rainforest Alliance', 'Direct Trade']
  },
  {
    id: '3',
    batchId: 'SBC-BN-2024-003',
    crop: 'Beans',
    farmer: 'Emmanuel Nkurunziza',
    cooperative: 'Southern Beans Collective',
    buyer: 'AgriTrade Rwanda Ltd',
    harvestDate: '2024-01-12',
    processingDate: '2024-01-15',
    blockchainHash: '0xabcdef1234567890fedcba0987654321',
    certifications: ['Grade B', 'Local Sourced']
  }
];

export const mockRegionalOffers: RegionalOffer[] = [
  {
    id: '1',
    country: 'Kenya',
    crop: 'Tea',
    quantity: 1000,
    pricePerUnit: 1200,
    quality: 'Premium',
    exporter: 'Kenya Tea Exporters Ltd',
    tradeAgreement: 'EAC',
    availableUntil: '2024-02-15'
  },
  {
    id: '2',
    country: 'Uganda',
    crop: 'Coffee',
    quantity: 500,
    pricePerUnit: 2200,
    quality: 'Grade A',
    exporter: 'Uganda Coffee Alliance',
    tradeAgreement: 'EAC',
    availableUntil: '2024-02-20'
  },
  {
    id: '3',
    country: 'Tanzania',
    crop: 'Cashew Nuts',
    quantity: 300,
    pricePerUnit: 3500,
    quality: 'Premium',
    exporter: 'Tanzanian Nut Processors',
    tradeAgreement: 'AfCFTA',
    availableUntil: '2024-02-10'
  },
  {
    id: '4',
    country: 'Ethiopia',
    crop: 'Coffee',
    quantity: 800,
    pricePerUnit: 2800,
    quality: 'Specialty',
    exporter: 'Ethiopian Coffee Union',
    tradeAgreement: 'COMESA',
    availableUntil: '2024-02-25'
  }
];

export const mockFarmerIncomeData: FarmerIncomeData[] = [
  {
    cooperativeId: '1',
    cooperativeName: 'Kigali Farmers Cooperative',
    averageIncome: 450000,
    totalFarmers: 120,
    month: '2024-01',
    growthRate: 15.2
  },
  {
    cooperativeId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    averageIncome: 680000,
    totalFarmers: 85,
    month: '2024-01',
    growthRate: 22.8
  },
  {
    cooperativeId: '3',
    cooperativeName: 'Southern Beans Collective',
    averageIncome: 320000,
    totalFarmers: 95,
    month: '2024-01',
    growthRate: 8.5
  },
  {
    cooperativeId: '4',
    cooperativeName: 'Northern Potato Farmers',
    averageIncome: 520000,
    totalFarmers: 65,
    month: '2024-01',
    growthRate: 18.3
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Bid Received',
    message: 'AgriTrade Rwanda Ltd submitted a bid for your Maize listing',
    type: 'info',
    read: false,
    createdAt: '2024-01-25T10:30:00Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'Payment Released',
    message: 'Escrow payment of RWF 225,000 has been released',
    type: 'success',
    read: false,
    createdAt: '2024-01-24T16:00:00Z',
    userId: '1'
  },
  {
    id: '3',
    title: 'Price Alert',
    message: 'Coffee prices predicted to increase by 12% next month',
    type: 'warning',
    read: true,
    createdAt: '2024-01-23T09:00:00Z',
    userId: '2'
  },
  {
    id: '4',
    title: 'Compliance Alert',
    message: 'Transaction flagged for underpricing - requires review',
    type: 'error',
    read: false,
    createdAt: '2024-01-24T16:05:00Z',
    userId: '3'
  },
  {
    id: '5',
    title: 'Bid Accepted',
    message: 'Your bid for Rice has been accepted by Kigali Farmers Cooperative',
    type: 'success',
    read: true,
    createdAt: '2024-01-24T14:15:00Z',
    userId: '2'
  }
];