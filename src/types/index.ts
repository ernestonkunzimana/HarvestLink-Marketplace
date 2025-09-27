export type UserRole = 'cooperative' | 'buyer' | 'government' | 'patient' | 'hospital' | 'insurer' | 'pharmacy' | 'regulator';

// Health System Types
export interface Patient {
  id: string;
  nidaId: string;
  nationalId: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceCards: InsuranceCard[];
  medicalHistory: MedicalRecord[];
  digitalHealthCardId: string;
}

export interface InsuranceCard {
  id: string;
  patientId: string;
  insurerId: string;
  policyNumber: string;
  cardType: 'mituelle' | 'private' | 'government';
  isActive: boolean;
  expiryDate: string;
  coverage: {
    inpatient: boolean;
    outpatient: boolean;
    pharmacy: boolean;
    dental: boolean;
    optical: boolean;
    maternity: boolean;
  };
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  hospitalId: string;
  hospitalName: string;
  doctorId: string;
  doctorName: string;
  visitDate: string;
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  testResults: TestResult[];
  blockchainHash: string;
  isEmergency: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
}

export interface TestResult {
  id: string;
  testName: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  performedDate: string;
}

export interface ClaimSenseTransaction {
  id: string;
  patientId: string;
  hospitalId: string;
  insurerId: string;
  pharmacyId?: string;
  amount: number;
  serviceType: 'consultation' | 'treatment' | 'medication' | 'surgery' | 'emergency';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  processedAt?: string;
  aiVerificationScore: number;
  fraudFlags: string[];
  blockchainHash: string;
  documents: ClaimDocument[];
}

export interface ClaimDocument {
  id: string;
  type: 'prescription' | 'invoice' | 'test_result' | 'medical_report';
  url: string;
  uploadedAt: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  type: 'public' | 'private' | 'district';
  level: 'health_center' | 'district_hospital' | 'referral_hospital';
  services: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  isActive: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  licenseNumber: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  inventory: PharmacyInventory[];
  isActive: boolean;
}

export interface PharmacyInventory {
  medicationId: string;
  medicationName: string;
  quantity: number;
  expiryDate: string;
  batchNumber: string;
  price: number;
}

export interface HealthInsurer {
  id: string;
  name: string;
  type: 'mituelle' | 'private' | 'government';
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  coverageTypes: string[];
  isActive: boolean;
}

export interface HealthDashboardMetrics {
  totalPatients: number;
  activeClaims: number;
  processedClaimsToday: number;
  averageClaimProcessingTime: number;
  fraudDetectionRate: number;
  systemUptime: number;
  insuranceVerificationAccuracy: number;
}

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