export interface Lead {
  id: string;
  receivedTime: string;
  email: string;
  location: string;
  propertyValue: string;
  equityUnlock?: string;
  primaryTaxTopic: string;
  status: 'new' | 'contacted' | 'intake_sent' | 'intake_completed' | 'consult_scheduled' | 'advice_delivered' | 'closed_won' | 'closed_lost';
  slaRemaining: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface Consultation {
  id: string;
  dateTime: string;
  leadId: string;
  type: 'Call' | 'Video';
  topic: string;
  status: 'Scheduled' | 'Completed' | 'No-show';
  notes?: string;
}

export interface Document {
  id: string;
  filename: string;
  uploadedDate: string;
  status: 'Pending' | 'Verified' | 'Needs Update';
  category: string;
}

export interface Payout {
  id: string;
  leadId: string;
  deliveryDate: string;
  amount: string;
  status: 'Pending' | 'Paid';
  payoutDate?: string;
}

export const mockLeads: Lead[] = [
  {
    id: 'LD-2401',
    receivedTime: '2 hours ago',
    email: 'j.martinez@email.com',
    location: 'Austin, TX',
    propertyValue: '$675,000',
    equityUnlock: '$285,000',
    primaryTaxTopic: 'Capital Gains',
    status: 'new',
    slaRemaining: '4h 30m',
    urgency: 'high',
  },
  {
    id: 'LD-2398',
    receivedTime: '5 hours ago',
    email: 'm.chen@email.com',
    location: 'San Jose, CA',
    propertyValue: '$1,250,000',
    equityUnlock: '$520,000',
    primaryTaxTopic: 'Rental Income',
    status: 'contacted',
    slaRemaining: '19h 15m',
    urgency: 'medium',
  },
  {
    id: 'LD-2395',
    receivedTime: '1 day ago',
    email: 's.patel@email.com',
    location: 'Seattle, WA',
    propertyValue: '$825,000',
    equityUnlock: '$340,000',
    primaryTaxTopic: 'HELOC Interest',
    status: 'intake_completed',
    slaRemaining: '6h 45m',
    urgency: 'high',
  },
  {
    id: 'LD-2390',
    receivedTime: '2 days ago',
    email: 'r.johnson@email.com',
    location: 'Denver, CO',
    propertyValue: '$550,000',
    equityUnlock: '$215,000',
    primaryTaxTopic: 'Refinance Implications',
    status: 'consult_scheduled',
    slaRemaining: '2 days',
    urgency: 'low',
  },
  {
    id: 'LD-2385',
    receivedTime: '3 days ago',
    email: 'a.williams@email.com',
    location: 'Portland, OR',
    propertyValue: '$720,000',
    primaryTaxTopic: 'Exclusion Eligibility',
    status: 'advice_delivered',
    slaRemaining: 'Complete',
    urgency: 'low',
  },
];

export const mockConsultations: Consultation[] = [
  {
    id: 'CS-101',
    dateTime: 'Today, 2:00 PM',
    leadId: 'LD-2390',
    type: 'Video',
    topic: 'Refinance tax implications',
    status: 'Scheduled',
    notes: 'Review mortgage interest deductibility',
  },
  {
    id: 'CS-102',
    dateTime: 'Tomorrow, 10:30 AM',
    leadId: 'LD-2395',
    type: 'Call',
    topic: 'HELOC interest discussion',
    status: 'Scheduled',
  },
  {
    id: 'CS-98',
    dateTime: 'Yesterday, 3:00 PM',
    leadId: 'LD-2385',
    type: 'Video',
    topic: 'Capital gains exclusion',
    status: 'Completed',
    notes: 'Client qualifies for full exclusion',
  },
];

export const mockDocuments: Document[] = [
  {
    id: 'DOC-501',
    filename: 'tax_return_2023.pdf',
    uploadedDate: '2024-01-20',
    status: 'Verified',
    category: 'Tax Return',
  },
  {
    id: 'DOC-502',
    filename: 'closing_statement.pdf',
    uploadedDate: '2024-01-21',
    status: 'Verified',
    category: 'Purchase Docs',
  },
  {
    id: 'DOC-503',
    filename: 'mortgage_statement.pdf',
    uploadedDate: 'Not uploaded',
    status: 'Pending',
    category: 'Mortgage Statement',
  },
  {
    id: 'DOC-504',
    filename: 'improvement_receipts.pdf',
    uploadedDate: '2024-01-19',
    status: 'Needs Update',
    category: 'Improvement Receipts',
  },
];

export const mockPayouts: Payout[] = [
  {
    id: 'PY-301',
    leadId: 'LD-2385',
    deliveryDate: '2024-01-22',
    amount: '$450',
    status: 'Pending',
  },
  {
    id: 'PY-298',
    leadId: 'LD-2375',
    deliveryDate: '2024-01-18',
    amount: '$450',
    status: 'Paid',
    payoutDate: '2024-01-20',
  },
  {
    id: 'PY-295',
    leadId: 'LD-2368',
    deliveryDate: '2024-01-15',
    amount: '$525',
    status: 'Paid',
    payoutDate: '2024-01-17',
  },
  {
    id: 'PY-292',
    leadId: 'LD-2360',
    deliveryDate: '2024-01-12',
    amount: '$450',
    status: 'Paid',
    payoutDate: '2024-01-14',
  },
];

export const mockPerformanceData = {
  leadsReceived: [
    { week: 'W1', count: 12 },
    { week: 'W2', count: 15 },
    { week: 'W3', count: 18 },
    { week: 'W4', count: 22 },
  ],
  closeRate: [
    { month: 'Oct', rate: 68 },
    { month: 'Nov', rate: 72 },
    { month: 'Dec', rate: 75 },
    { month: 'Jan', rate: 78 },
  ],
};
