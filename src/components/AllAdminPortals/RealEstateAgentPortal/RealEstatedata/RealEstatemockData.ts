export interface Lead {
  id: string;
  receivedTime: string;
  email: string;
  location: {
    zip: string;
    county: string;
    state: string;
  };
  estimatedValue: number;
  equityUnlock?: number;
  intent: 'Sell' | 'Buy' | 'Both';
  urgency: '0-30d' | '30-90d' | '90d+';
  stage: string;
  slaTimeRemaining: string;
  slaUrgent: boolean;
  address?: string;
  sellProbability?: 'High' | 'Medium' | 'Low';
  buyProbability?: 'High' | 'Medium' | 'Low';
  timeline?: string;
  preferredContact?: 'Call' | 'Text' | 'Email';
}

export interface Comp {
  id: string;
  address: string;
  soldPrice: number;
  soldDate: string;
  sqft: number;
  pricePerSqft: number;
  distance: number;
  similarityScore: number;
}

export interface Appointment {
  id: string;
  leadId: string;
  date: string;
  time: string;
  type: 'Call' | 'In-person' | 'Virtual';
  location?: string;
  status: 'Scheduled' | 'Completed' | 'No-show';
  notes?: string;
}

export interface Document {
  id: string;
  leadId: string;
  filename: string;
  category: string;
  uploadDate: string;
  status: 'Pending' | 'Signed' | 'Completed';
}

export interface Payout {
  id: string;
  leadId: string;
  closeDate: string;
  transactionType: 'Buy' | 'Sell';
  homeValueBracket: string;
  payoutAmount: number;
  status: 'Paid' | 'Pending';
}

export const mockLeads: Lead[] = [
  {
    id: 'L-10234',
    receivedTime: '2 hours ago',
    email: 'john.d***@gmail.com',
    location: { zip: '33131', county: 'Miami-Dade', state: 'FL' },
    estimatedValue: 850000,
    equityUnlock: 320000,
    intent: 'Sell',
    urgency: '0-30d',
    stage: 'New',
    slaTimeRemaining: '4h 20m',
    slaUrgent: true,
    sellProbability: 'High',
    timeline: '30–90 days',
    preferredContact: 'Call',
  },
  {
    id: 'L-10233',
    receivedTime: '5 hours ago',
    email: 'sarah.m***@yahoo.com',
    location: { zip: '33139', county: 'Miami-Dade', state: 'FL' },
    estimatedValue: 1250000,
    intent: 'Both',
    urgency: '30-90d',
    stage: 'Contacted',
    slaTimeRemaining: '19h 15m',
    slaUrgent: false,
    sellProbability: 'High',
    buyProbability: 'Medium',
    timeline: '30–90 days',
  },
  {
    id: 'L-10232',
    receivedTime: '1 day ago',
    email: 'mike.t***@gmail.com',
    location: { zip: '33130', county: 'Miami-Dade', state: 'FL' },
    estimatedValue: 620000,
    intent: 'Buy',
    urgency: '90d+',
    stage: 'Qualified',
    slaTimeRemaining: 'N/A',
    slaUrgent: false,
    buyProbability: 'High',
  },
  {
    id: 'L-10231',
    receivedTime: '2 days ago',
    email: 'anna.l***@hotmail.com',
    location: { zip: '33134', county: 'Miami-Dade', state: 'FL' },
    estimatedValue: 950000,
    equityUnlock: 280000,
    intent: 'Sell',
    urgency: '0-30d',
    stage: 'Listing Consultation Scheduled',
    slaTimeRemaining: 'N/A',
    slaUrgent: false,
    sellProbability: 'High',
  },
  {
    id: 'L-10230',
    receivedTime: '3 days ago',
    email: 'robert.k***@gmail.com',
    location: { zip: '33137', county: 'Miami-Dade', state: 'FL' },
    estimatedValue: 720000,
    intent: 'Both',
    urgency: '30-90d',
    stage: 'Property Tours',
    slaTimeRemaining: 'N/A',
    slaUrgent: false,
    sellProbability: 'Medium',
    buyProbability: 'High',
  },
];

export const mockComps: Comp[] = [
  {
    id: 'C-001',
    address: '*** Brickell Ave',
    soldPrice: 875000,
    soldDate: '2024-01-10',
    sqft: 1850,
    pricePerSqft: 473,
    distance: 0.3,
    similarityScore: 94,
  },
  {
    id: 'C-002',
    address: '*** SE 5th St',
    soldPrice: 820000,
    soldDate: '2024-01-05',
    sqft: 1750,
    pricePerSqft: 469,
    distance: 0.5,
    similarityScore: 91,
  },
  {
    id: 'C-003',
    address: '*** Miami Ave',
    soldPrice: 910000,
    soldDate: '2023-12-28',
    sqft: 1920,
    pricePerSqft: 474,
    distance: 0.7,
    similarityScore: 88,
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'A-001',
    leadId: 'L-10234',
    date: '2026-01-26',
    time: '14:00',
    type: 'In-person',
    location: '33131, Miami, FL',
    status: 'Scheduled',
  },
  {
    id: 'A-002',
    leadId: 'L-10233',
    date: '2026-01-27',
    time: '10:30',
    type: 'Virtual',
    status: 'Scheduled',
  },
];

export const mockDocuments: Document[] = [
  {
    id: 'D-001',
    leadId: 'L-10231',
    filename: 'listing-agreement-L10231.pdf',
    category: 'Listing agreement',
    uploadDate: '2026-01-22',
    status: 'Pending',
  },
  {
    id: 'D-002',
    leadId: 'L-10230',
    filename: 'buyer-preapproval-L10230.pdf',
    category: 'Buyer pre-approval',
    uploadDate: '2026-01-20',
    status: 'Completed',
  },
];

export const mockPayouts: Payout[] = [
  {
    id: 'P-001',
    leadId: 'L-10201',
    closeDate: '2026-01-15',
    transactionType: 'Sell',
    homeValueBracket: '$800K-$1M',
    payoutAmount: 2500,
    status: 'Paid',
  },
  {
    id: 'P-002',
    leadId: 'L-10198',
    closeDate: '2026-01-10',
    transactionType: 'Buy',
    homeValueBracket: '$600K-$800K',
    payoutAmount: 1800,
    status: 'Pending',
  },
];
