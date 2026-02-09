// Mock data for the Lead Manager Portal

export interface Lead {
  id: string;
  createdAt: string;
  email: string;
  ipAddress: string;
  state: string;
  county: string;
  zip: string;
  propertyValue: number;
  unlockableEquity: number;
  interestArea: 'Mortgage' | 'Insurance' | 'Tax' | 'Agent';
  intentScore: number;
  slaMinutes: number;
  status: 'unassigned' | 'assigned' | 'contacted' | 'closed';
  assignedPartner?: string;
}

export interface Partner {
  id: string;
  name: string;
  role: string;
  coverageAreas: string[];
  activeLeads: number;
  monthlyCap: number;
  avgResponseTime: string;
  rating: number;
  revenueGenerated: number;
  status: 'active' | 'paused';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  leadId?: string;
  partnerId?: string;
  metadata?: string;
}

export const mockLeads: Lead[] = [
  {
    id: 'APR-10492',
    createdAt: '2026-01-24T09:15:00Z',
    email: 'john.smith@gmail.com',
    ipAddress: '192.168.1.42',
    state: 'CA',
    county: 'Santa Clara',
    zip: '95110',
    propertyValue: 850000,
    unlockableEquity: 240000,
    interestArea: 'Mortgage',
    intentScore: 87,
    slaMinutes: 12,
    status: 'unassigned',
  },
  {
    id: 'APR-10493',
    createdAt: '2026-01-24T09:22:00Z',
    email: 'sarah.jones@yahoo.com',
    ipAddress: '192.168.1.43',
    state: 'TX',
    county: 'Harris',
    zip: '77001',
    propertyValue: 425000,
    unlockableEquity: 85000,
    interestArea: 'Insurance',
    intentScore: 62,
    slaMinutes: 5,
    status: 'unassigned',
  },
  {
    id: 'APR-10494',
    createdAt: '2026-01-24T09:28:00Z',
    email: 'michael.chen@outlook.com',
    ipAddress: '192.168.1.44',
    state: 'NY',
    county: 'New York',
    zip: '10001',
    propertyValue: 1250000,
    unlockableEquity: 520000,
    interestArea: 'Agent',
    intentScore: 94,
    slaMinutes: 28,
    status: 'unassigned',
  },
  {
    id: 'APR-10495',
    createdAt: '2026-01-24T08:45:00Z',
    email: 'lisa.martinez@gmail.com',
    ipAddress: '192.168.1.45',
    state: 'FL',
    county: 'Miami-Dade',
    zip: '33101',
    propertyValue: 680000,
    unlockableEquity: 175000,
    interestArea: 'Tax',
    intentScore: 71,
    slaMinutes: 42,
    status: 'unassigned',
  },
  {
    id: 'APR-10496',
    createdAt: '2026-01-24T08:12:00Z',
    email: 'david.kim@icloud.com',
    ipAddress: '192.168.1.46',
    state: 'WA',
    county: 'King',
    zip: '98101',
    propertyValue: 975000,
    unlockableEquity: 310000,
    interestArea: 'Mortgage',
    intentScore: 89,
    slaMinutes: 75,
    status: 'assigned',
    assignedPartner: 'Cascade Mortgage Group',
  },
  {
    id: 'APR-10497',
    createdAt: '2026-01-24T07:30:00Z',
    email: 'robert.taylor@gmail.com',
    ipAddress: '192.168.1.47',
    state: 'CA',
    county: 'San Mateo',
    zip: '94002',
    propertyValue: 1450000,
    unlockableEquity: 620000,
    interestArea: 'Insurance',
    intentScore: 91,
    slaMinutes: 120,
    status: 'assigned',
    assignedPartner: 'Bay Area Insurance Pro',
  },
  {
    id: 'APR-10498',
    createdAt: '2026-01-24T07:15:00Z',
    email: 'amanda.wilson@outlook.com',
    ipAddress: '192.168.1.48',
    state: 'NY',
    county: 'Brooklyn',
    zip: '11201',
    propertyValue: 890000,
    unlockableEquity: 285000,
    interestArea: 'Agent',
    intentScore: 85,
    slaMinutes: 140,
    status: 'assigned',
    assignedPartner: 'Empire Realty Advisors',
  },
];

export const mockPartners: Partner[] = [
  {
    id: 'P-001',
    name: 'Cascade Mortgage Group',
    role: 'Mortgage Partner',
    coverageAreas: ['WA • King County', 'WA • Pierce County'],
    activeLeads: 13,
    monthlyCap: 30,
    avgResponseTime: '4.2 min',
    rating: 4.8,
    revenueGenerated: 42500,
    status: 'active',
  },
  {
    id: 'P-002',
    name: 'Bay Area Insurance Pro',
    role: 'Insurance Partner',
    coverageAreas: ['CA • Santa Clara', 'CA • San Mateo'],
    activeLeads: 8,
    monthlyCap: 25,
    avgResponseTime: '6.1 min',
    rating: 4.6,
    revenueGenerated: 18900,
    status: 'active',
  },
  {
    id: 'P-003',
    name: 'Empire Realty Advisors',
    role: 'Real Estate Partner',
    coverageAreas: ['NY • New York', 'NY • Brooklyn'],
    activeLeads: 21,
    monthlyCap: 40,
    avgResponseTime: '3.8 min',
    rating: 4.9,
    revenueGenerated: 67200,
    status: 'active',
  },
  {
    id: 'P-004',
    name: 'Lone Star Tax Solutions',
    role: 'Tax Partner',
    coverageAreas: ['TX • Harris', 'TX • Dallas'],
    activeLeads: 5,
    monthlyCap: 20,
    avgResponseTime: '8.3 min',
    rating: 4.4,
    revenueGenerated: 12400,
    status: 'active',
  },
  {
    id: 'P-005',
    name: 'Sunshine Mortgage Co',
    role: 'Mortgage Partner',
    coverageAreas: ['FL • Miami-Dade', 'FL • Broward'],
    activeLeads: 18,
    monthlyCap: 35,
    avgResponseTime: '5.6 min',
    rating: 4.7,
    revenueGenerated: 34800,
    status: 'active',
  },
];

export const mockAuditLog: AuditLogEntry[] = [
  {
    id: 'A-001',
    timestamp: '2026-01-24T09:30:15Z',
    actor: 'Sarah Chen',
    action: 'Lead assigned',
    leadId: 'APR-10496',
    partnerId: 'P-001',
    metadata: 'Manual assignment',
  },
  {
    id: 'A-002',
    timestamp: '2026-01-24T09:28:42Z',
    actor: 'System',
    action: 'Lead created',
    leadId: 'APR-10494',
    metadata: 'Auto-imported from web form',
  },
  {
    id: 'A-003',
    timestamp: '2026-01-24T09:25:18Z',
    actor: 'Sarah Chen',
    action: 'Partner status updated',
    partnerId: 'P-003',
    metadata: 'Increased monthly cap to 40',
  },
  {
    id: 'A-004',
    timestamp: '2026-01-24T09:22:33Z',
    actor: 'System',
    action: 'Lead created',
    leadId: 'APR-10493',
    metadata: 'Auto-imported from web form',
  },
  {
    id: 'A-005',
    timestamp: '2026-01-24T09:20:05Z',
    actor: 'Michael Torres',
    action: 'Lead reassigned',
    leadId: 'APR-10490',
    partnerId: 'P-002',
    metadata: 'Partner requested transfer',
  },
];

export const funnelData = [
  { stage: 'Report Generated', count: 1247, conversion: 100 },
  { stage: 'CTA Clicked', count: 892, conversion: 71.5 },
  { stage: 'Lead Created', count: 634, conversion: 71.1 },
  { stage: 'Assigned', count: 589, conversion: 92.9 },
  { stage: 'Partner Contacted', count: 512, conversion: 86.9 },
  { stage: 'Closed', count: 287, conversion: 56.1 },
];