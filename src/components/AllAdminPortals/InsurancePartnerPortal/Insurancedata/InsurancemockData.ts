export interface Lead {
  id: string;
  receivedTime: string;
  homeownerEmail: string;
  location: {
    zip: string;
    county: string;
    state: string;
  };
  homeValue: number;
  currentPremium?: number;
  potentialSavings?: number;
  stage: 'New' | 'Contacted' | 'Qualified' | 'Quote Sent' | 'Comparing' | 'Bound' | 'Lost';
  slaDeadline: string;
  propertyType?: 'Single-family' | 'Condo' | 'Townhome' | 'Multi-family';
  occupancyType?: 'Primary' | 'Secondary' | 'Investment';
  riskScore?: 'low' | 'medium' | 'high';
  timeline?: {
    action: string;
    timestamp: string;
  }[];
}

export interface Quote {
  id: string;
  leadId: string;
  homeValue: number;
  deductible: number;
  coverageTier: 'Basic' | 'Recommended' | 'Premium';
  monthlyPremium: number;
  annualPremium: number;
  estimatedSavings?: number;
}

export interface Payout {
  leadId: string;
  bindDate: string;
  premiumAmount: number;
  commissionAmount: number;
  status: 'Pending' | 'Paid';
  payoutDate?: string;
}

export const mockLeads: Lead[] = [
  {
    id: 'LD-2401',
    receivedTime: '2026-01-24T08:15:00',
    homeownerEmail: 'j.martinez@example.com',
    location: { zip: '77002', county: 'Harris County', state: 'TX' },
    homeValue: 485000,
    currentPremium: 2400,
    potentialSavings: 420,
    stage: 'New',
    slaDeadline: '2026-01-24T20:15:00',
    propertyType: 'Single-family',
    occupancyType: 'Primary',
    riskScore: 'low',
    timeline: [
      { action: 'Viewed insurance tab', timestamp: '2026-01-24T08:10:00' },
      { action: 'Entered premium amount', timestamp: '2026-01-24T08:12:00' },
      { action: 'Clicked "Compare policies"', timestamp: '2026-01-24T08:14:00' },
      { action: 'Clicked "Talk to agent"', timestamp: '2026-01-24T08:15:00' }
    ]
  },
  {
    id: 'LD-2400',
    receivedTime: '2026-01-24T07:45:00',
    homeownerEmail: 's.thompson@example.com',
    location: { zip: '77056', county: 'Harris County', state: 'TX' },
    homeValue: 625000,
    currentPremium: 3200,
    potentialSavings: 580,
    stage: 'Contacted',
    slaDeadline: '2026-01-24T19:45:00',
    propertyType: 'Single-family',
    occupancyType: 'Primary',
    riskScore: 'low'
  },
  {
    id: 'LD-2399',
    receivedTime: '2026-01-24T06:20:00',
    homeownerEmail: 'm.nguyen@example.com',
    location: { zip: '77019', county: 'Harris County', state: 'TX' },
    homeValue: 550000,
    currentPremium: 2850,
    potentialSavings: 390,
    stage: 'Quote Sent',
    slaDeadline: '2026-01-24T18:20:00',
    propertyType: 'Condo',
    occupancyType: 'Primary',
    riskScore: 'low'
  },
  {
    id: 'LD-2398',
    receivedTime: '2026-01-23T15:30:00',
    homeownerEmail: 'r.patel@example.com',
    location: { zip: '77005', county: 'Harris County', state: 'TX' },
    homeValue: 720000,
    currentPremium: 3800,
    potentialSavings: 650,
    stage: 'Comparing',
    slaDeadline: '2026-01-24T03:30:00',
    propertyType: 'Single-family',
    occupancyType: 'Primary',
    riskScore: 'medium'
  },
  {
    id: 'LD-2397',
    receivedTime: '2026-01-23T14:10:00',
    homeownerEmail: 'a.williams@example.com',
    location: { zip: '77098', county: 'Harris County', state: 'TX' },
    homeValue: 395000,
    currentPremium: 1950,
    potentialSavings: 280,
    stage: 'Bound',
    slaDeadline: '2026-01-24T02:10:00',
    propertyType: 'Townhome',
    occupancyType: 'Primary',
    riskScore: 'low'
  },
  {
    id: 'LD-2396',
    receivedTime: '2026-01-23T11:00:00',
    homeownerEmail: 'k.johnson@example.com',
    location: { zip: '77008', county: 'Harris County', state: 'TX' },
    homeValue: 510000,
    currentPremium: 2600,
    potentialSavings: 450,
    stage: 'Qualified',
    slaDeadline: '2026-01-23T23:00:00',
    propertyType: 'Single-family',
    occupancyType: 'Investment',
    riskScore: 'medium'
  },
  {
    id: 'LD-2395',
    receivedTime: '2026-01-23T09:45:00',
    homeownerEmail: 'l.davis@example.com',
    location: { zip: '77025', county: 'Harris County', state: 'TX' },
    homeValue: 440000,
    stage: 'Lost',
    slaDeadline: '2026-01-23T21:45:00',
    propertyType: 'Single-family',
    occupancyType: 'Primary',
    riskScore: 'low'
  }
];

export const mockPayouts: Payout[] = [
  {
    leadId: 'LD-2397',
    bindDate: '2026-01-23',
    premiumAmount: 1670,
    commissionAmount: 167,
    status: 'Pending',
  },
  {
    leadId: 'LD-2385',
    bindDate: '2026-01-20',
    premiumAmount: 2240,
    commissionAmount: 224,
    status: 'Paid',
    payoutDate: '2026-01-22'
  },
  {
    leadId: 'LD-2371',
    bindDate: '2026-01-18',
    premiumAmount: 3150,
    commissionAmount: 315,
    status: 'Paid',
    payoutDate: '2026-01-20'
  },
  {
    leadId: 'LD-2362',
    bindDate: '2026-01-15',
    premiumAmount: 1890,
    commissionAmount: 189,
    status: 'Paid',
    payoutDate: '2026-01-17'
  }
];

export const dashboardMetrics = {
  newLeadsToday: 3,
  activeLeads: 18,
  quotesSent: 12,
  policiesBound: 8,
  slaBreaches: 1,
  earningsThisMonth: 4250
};

export const pipelineStages = [
  { name: 'New', count: 3, conversion: 100 },
  { name: 'Contacted', count: 5, conversion: 85 },
  { name: 'Qualified', count: 4, conversion: 70 },
  { name: 'Quote Sent', count: 3, conversion: 55 },
  { name: 'Comparing', count: 3, conversion: 42 },
  { name: 'Bound', count: 8, conversion: 35 }
];
