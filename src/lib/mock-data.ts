import { Produce, Bid, Transaction, ComplianceAlert, User } from '@/types';

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
    cooperativeId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    buyerId: '3',
    buyerName: 'Export Partners Ltd',
    crop: 'Coffee',
    quantity: 150,
    pricePerUnit: 2400,
    totalAmount: 360000,
    status: 'completed',
    completedAt: '2024-01-23T11:30:00Z',
    paymentMethod: 'Bank Transfer'
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
    transactionId: '2',
    cooperativeName: 'Musanze Coffee Growers',
    buyerName: 'Export Partners Ltd',
    description: 'Export tax documentation pending verification',
    severity: 'high',
    createdAt: '2024-01-23T12:00:00Z',
    status: 'resolved'
  }
];