// Mock data for Financial Advisor Portal

export interface Lead {
  id: string;
  received: string;
  email: string;
  location: string;
  state: string;
  zip: string;
  homeValue: number;
  unlockableEquity: number;
  borrowingCostMin: number;
  borrowingCostMax: number;
  intentScore: number;
  stage: string;
  slaHours: number;
  riskTolerance?: string;
  investmentHorizon?: string;
  strategyType?: string;
  allocation?: {
    sp500: number;
    bonds: number;
    crypto: number;
    cash: number;
    gold: number;
  };
}

export const mockLeads: Lead[] = [
  {
    id: 'LD-2024-0847',
    received: '2024-01-24 08:15 AM',
    email: 'j.martinez@email.com',
    location: 'Austin, TX',
    state: 'TX',
    zip: '78701',
    homeValue: 425000,
    unlockableEquity: 180000,
    borrowingCostMin: 6.5,
    borrowingCostMax: 7.2,
    intentScore: 92,
    stage: 'New',
    slaHours: 2,
  },
  {
    id: 'LD-2024-0846',
    received: '2024-01-24 06:30 AM',
    email: 's.chen@email.com',
    location: 'San Francisco, CA',
    state: 'CA',
    zip: '94102',
    homeValue: 1200000,
    unlockableEquity: 520000,
    borrowingCostMin: 6.8,
    borrowingCostMax: 7.5,
    intentScore: 87,
    stage: 'Contacted',
    slaHours: 5,
    riskTolerance: 'Growth',
  },
  {
    id: 'LD-2024-0845',
    received: '2024-01-23 04:45 PM',
    email: 'robert.kim@email.com',
    location: 'Seattle, WA',
    state: 'WA',
    zip: '98101',
    homeValue: 675000,
    unlockableEquity: 290000,
    borrowingCostMin: 6.3,
    borrowingCostMax: 7.0,
    intentScore: 78,
    stage: 'Risk Profile Completed',
    slaHours: 12,
    riskTolerance: 'Balanced',
    investmentHorizon: '5Y',
  },
  {
    id: 'LD-2024-0844',
    received: '2024-01-23 02:20 PM',
    email: 'l.patel@email.com',
    location: 'Denver, CO',
    state: 'CO',
    zip: '80202',
    homeValue: 550000,
    unlockableEquity: 235000,
    borrowingCostMin: 6.4,
    borrowingCostMax: 7.1,
    intentScore: 85,
    stage: 'Strategy Built',
    slaHours: 18,
    riskTolerance: 'Growth',
    investmentHorizon: '10Y',
    strategyType: 'High Growth',
  },
  {
    id: 'LD-2024-0843',
    received: '2024-01-23 11:10 AM',
    email: 'amy.torres@email.com',
    location: 'Miami, FL',
    state: 'FL',
    zip: '33101',
    homeValue: 380000,
    unlockableEquity: 160000,
    borrowingCostMin: 6.6,
    borrowingCostMax: 7.3,
    intentScore: 74,
    stage: 'Consult Scheduled',
    slaHours: 24,
    riskTolerance: 'Conservative',
    investmentHorizon: '3Y',
    strategyType: 'Basic',
  },
];

export const mockConsultations = [
  {
    id: 'CS-001',
    leadId: 'LD-2024-0845',
    date: '2024-01-25',
    time: '10:00 AM',
    type: 'Video',
    status: 'Scheduled',
    notes: 'Initial strategy discussion',
  },
  {
    id: 'CS-002',
    leadId: 'LD-2024-0843',
    date: '2024-01-26',
    time: '2:00 PM',
    type: 'Call',
    status: 'Scheduled',
    notes: 'Review action plan',
  },
  {
    id: 'CS-003',
    leadId: 'LD-2024-0842',
    date: '2024-01-23',
    time: '11:00 AM',
    type: 'Video',
    status: 'Completed',
    notes: 'Discussed portfolio allocation',
  },
];

export const mockPayouts = [
  {
    id: 'INV-2024-012',
    leadId: 'LD-2024-0789',
    deliveredDate: '2024-01-15',
    closedDate: '2024-01-20',
    amount: 2500,
    status: 'Paid',
  },
  {
    id: 'INV-2024-011',
    leadId: 'LD-2024-0776',
    deliveredDate: '2024-01-10',
    closedDate: '2024-01-18',
    amount: 3000,
    status: 'Paid',
  },
  {
    id: 'INV-2024-010',
    leadId: 'LD-2024-0762',
    deliveredDate: '2024-01-08',
    closedDate: null,
    amount: 2800,
    status: 'Pending',
  },
];

export const allocationPresets = {
  basic: {
    sp500: 50,
    bonds: 40,
    crypto: 0,
    cash: 10,
    gold: 0,
  },
  balanced: {
    sp500: 60,
    bonds: 25,
    crypto: 5,
    cash: 5,
    gold: 5,
  },
  highGrowth: {
    sp500: 70,
    bonds: 10,
    crypto: 10,
    cash: 5,
    gold: 5,
  },
};

export const performanceMetrics = {
  leadsReceived: [
    { month: 'Jul', count: 24 },
    { month: 'Aug', count: 31 },
    { month: 'Sep', count: 28 },
    { month: 'Oct', count: 35 },
    { month: 'Nov', count: 42 },
    { month: 'Dec', count: 38 },
    { month: 'Jan', count: 45 },
  ],
  conversionRates: {
    strategyBuilt: 72,
    consultBooked: 58,
    closeRate: 34,
  },
};
