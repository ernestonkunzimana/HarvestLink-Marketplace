export type UserRole = 'cooperative' | 'buyer' | 'government';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  organization?: string;
}

export interface Produce {
  id: string;
  cooperativeId: string;
  cooperativeName: string;
  crop: string;
  quantity: number;
  unit: string;
  quality: 'Grade A' | 'Grade B' | 'Grade C';
  pricePerUnit: number;
  location: string;
  harvestDate: string;
  status: 'available' | 'sold' | 'reserved';
}

export interface Bid {
  id: string;
  produceId: string;
  buyerId: string;
  buyerName: string;
  cooperativeId: string;
  cooperativeName: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  submittedAt: string;
  message?: string;
}

export interface Transaction {
  id: string;
  produceId: string;
  cooperativeId: string;
  cooperativeName: string;
  buyerId: string;
  buyerName: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  status: 'completed' | 'pending' | 'cancelled';
  completedAt: string;
  paymentMethod: string;
}

export interface ComplianceAlert {
  id: string;
  type: 'underpricing' | 'quality_issue' | 'tax_compliance';
  transactionId: string;
  cooperativeName: string;
  buyerName: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  status: 'open' | 'resolved';
}

export interface PricePrediction {
  id: string;
  crop: string;
  currentPrice: number;
  predictedPrice: number;
  month: string;
  confidence: number;
  factors: string[];
}

export interface EscrowTransaction {
  id: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'released' | 'disputed';
  buyerName: string;
  cooperativeName: string;
  crop: string;
  createdAt: string;
  releaseDate?: string;
  disputeReason?: string;
}

export interface TraceabilityRecord {
  id: string;
  batchId: string;
  crop: string;
  farmer: string;
  cooperative: string;
  buyer: string;
  exporter?: string;
  harvestDate: string;
  processingDate: string;
  exportDate?: string;
  blockchainHash: string;
  certifications: string[];
}

export interface RegionalOffer {
  id: string;
  country: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  quality: string;
  exporter: string;
  tradeAgreement: 'AfCFTA' | 'COMESA' | 'EAC';
  availableUntil: string;
}

export interface FarmerIncomeData {
  cooperativeId: string;
  cooperativeName: string;
  averageIncome: number;
  totalFarmers: number;
  month: string;
  growthRate: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
}