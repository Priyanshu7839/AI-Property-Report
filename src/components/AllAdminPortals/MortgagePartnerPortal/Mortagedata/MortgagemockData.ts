// Mock data for Mortgage Partner Portal

export interface Lead {
  id: string;
  receivedTime: string;
  email: string;
  location: {
    zip: string;
    city: string;
    state: string;
    county: string;
  };
  estimatedHomeValue: number;
  unlockableEquity: number;
  recommendedProduct: 'Cash-Out Refinance' | 'HELOC' | 'Hybrid';
  intentScore: 'High' | 'Medium' | 'Low';
  slaMinutesRemaining: number;
  currentStage: 'New' | 'Contacted' | 'Qualified' | 'Quote Sent' | 'Negotiating' | 'Closed Won' | 'Closed Lost';
  mortgageBalance?: number;
  yearBuilt?: number;
  sqft?: number;
  activityTimeline?: Array<{
    event: string;
    timestamp: string;
  }>;
}

export interface Payout {
  leadId: string;
  closeDate: string;
  product: string;
  leadPrice: number;
  commissionAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Processing';
  payoutDate?: string;
}

export const mockLeads: Lead[] = [
  {
    id: 'APR-MTG-10942',
    receivedTime: '2026-01-24T08:15:00',
    email: 'j***@email.com',
    location: {
      zip: '94085',
      city: 'Milpitas',
      state: 'CA',
      county: 'Santa Clara',
    },
    estimatedHomeValue: 1250000,
    unlockableEquity: 375000,
    recommendedProduct: 'HELOC',
    intentScore: 'High',
    slaMinutesRemaining: 23,
    currentStage: 'New',
    mortgageBalance: 625000,
    yearBuilt: 2018,
    sqft: 2450,
    activityTimeline: [
      { event: 'Report viewed', timestamp: '2026-01-24T08:10:00' },
      { event: 'Equity tab opened', timestamp: '2026-01-24T08:11:30' },
      { event: 'Precision calculator used', timestamp: '2026-01-24T08:12:45' },
      { event: 'Clicked "Talk to Advisor"', timestamp: '2026-01-24T08:14:00' },
      { event: 'Clicked "Mortgage Options"', timestamp: '2026-01-24T08:15:00' },
    ],
  },
  {
    id: 'APR-MTG-10941',
    receivedTime: '2026-01-24T07:45:00',
    email: 'm***@gmail.com',
    location: {
      zip: '94087',
      city: 'Sunnyvale',
      state: 'CA',
      county: 'Santa Clara',
    },
    estimatedHomeValue: 985000,
    unlockableEquity: 295000,
    recommendedProduct: 'Cash-Out Refinance',
    intentScore: 'Medium',
    slaMinutesRemaining: 105,
    currentStage: 'Contacted',
    mortgageBalance: 490000,
    yearBuilt: 2015,
    sqft: 1850,
  },
  {
    id: 'APR-MTG-10940',
    receivedTime: '2026-01-24T06:30:00',
    email: 's***@yahoo.com',
    location: {
      zip: '94085',
      city: 'Sunnyvale',
      state: 'CA',
      county: 'Santa Clara',
    },
    estimatedHomeValue: 1450000,
    unlockableEquity: 580000,
    recommendedProduct: 'HELOC',
    intentScore: 'High',
    slaMinutesRemaining: -15,
    currentStage: 'Qualified',
    mortgageBalance: 580000,
    yearBuilt: 2020,
    sqft: 2850,
  },
  {
    id: 'APR-MTG-10939',
    receivedTime: '2026-01-23T16:20:00',
    email: 'a***@outlook.com',
    location: {
      zip: '95014',
      city: 'Cupertino',
      state: 'CA',
      county: 'Santa Clara',
    },
    estimatedHomeValue: 2100000,
    unlockableEquity: 840000,
    recommendedProduct: 'Cash-Out Refinance',
    intentScore: 'High',
    slaMinutesRemaining: -480,
    currentStage: 'Quote Sent',
    mortgageBalance: 840000,
    yearBuilt: 2019,
    sqft: 3200,
  },
  {
    id: 'APR-MTG-10938',
    receivedTime: '2026-01-23T14:10:00',
    email: 'k***@email.com',
    location: {
      zip: '94086',
      city: 'Sunnyvale',
      state: 'CA',
      county: 'Santa Clara',
    },
    estimatedHomeValue: 875000,
    unlockableEquity: 175000,
    recommendedProduct: 'HELOC',
    intentScore: 'Low',
    slaMinutesRemaining: -680,
    currentStage: 'Negotiating',
    mortgageBalance: 525000,
    yearBuilt: 2012,
    sqft: 1650,
  },
];

export const mockPayouts: Payout[] = [
  {
    leadId: 'APR-MTG-10920',
    closeDate: '2026-01-20',
    product: 'HELOC',
    leadPrice: 850,
    commissionAmount: 4250,
    paymentStatus: 'Paid',
    payoutDate: '2026-01-22',
  },
  {
    leadId: 'APR-MTG-10915',
    closeDate: '2026-01-18',
    product: 'Cash-Out Refinance',
    leadPrice: 950,
    commissionAmount: 5700,
    paymentStatus: 'Paid',
    payoutDate: '2026-01-20',
  },
  {
    leadId: 'APR-MTG-10910',
    closeDate: '2026-01-15',
    product: 'HELOC',
    leadPrice: 850,
    commissionAmount: 4250,
    paymentStatus: 'Processing',
  },
  {
    leadId: 'APR-MTG-10905',
    closeDate: '2026-01-12',
    product: 'Cash-Out Refinance',
    leadPrice: 950,
    commissionAmount: 5700,
    paymentStatus: 'Pending',
  },
];

export const partnerInfo = {
  name: 'Clark',
  role: 'Mortgage Partner',
  coverage: 'CA • Santa Clara • 94085',
  status: 'Active' as const,
};

export const dashboardKPIs = {
  newLeadsToday: 8,
  activeLeads: 23,
  leadsNearSLA: 3,
  quotesSent: 12,
  conversionsClosed: 5,
  earningsThisMonth: 32450,
};

export const pipelineData = [
  { stage: 'New', count: 8, conversionRate: 85 },
  { stage: 'Contacted', count: 12, conversionRate: 75 },
  { stage: 'Qualified', count: 9, conversionRate: 82 },
  { stage: 'Quote Sent', count: 7, conversionRate: 68 },
  { stage: 'Negotiating', count: 5, conversionRate: 80 },
  { stage: 'Closed Won', count: 4, conversionRate: 100 },
];
