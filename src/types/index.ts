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