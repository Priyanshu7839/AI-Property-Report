export const mockLeads = [
  {
    id: 'L-2401',
    received: '2h ago',
    email: 'j***@email.com',
    location: 'Austin, TX 78701',
    homeValue: '$850,000',
    equity: '$240,000-$280,000',
    borrowCost: '7.2%-8.1%',
    intentScore: 92,
    stage: 'New',
    sla: 2,
  },
  {
    id: 'L-2398',
    received: '5h ago',
    email: 's***@email.com',
    location: 'Denver, CO 80202',
    homeValue: '$620,000',
    equity: '$180,000-$210,000',
    borrowCost: '7.5%-8.4%',
    intentScore: 87,
    stage: 'Contacted',
    sla: 5,
  },
  {
    id: 'L-2394',
    received: '1d ago',
    email: 'm***@email.com',
    location: 'Seattle, WA 98101',
    homeValue: '$1,200,000',
    equity: '$380,000-$420,000',
    borrowCost: '6.9%-7.8%',
    intentScore: 94,
    stage: 'Strategy Built',
    sla: 18,
  },
];

export const strategyTemplates = [
  {
    name: 'Basic Strategy',
    type: 'safe',
    returnRange: '4-6%',
    volatility: 'Low',
    spread: '+1.8%',
  },
  {
    name: 'Balanced Strategy',
    type: 'default',
    returnRange: '7-9%',
    volatility: 'Medium',
    spread: '+3.2%',
  },
  {
    name: 'High Growth Strategy',
    type: 'growth',
    returnRange: '10-14%',
    volatility: 'High',
    spread: '+5.4%',
  },
];

export const allocationPresets = {
  basic: { sp500: 40, bonds: 50, cash: 10, crypto: 0, gold: 0 },
  balanced: { sp500: 60, bonds: 25, cash: 10, crypto: 3, gold: 2 },
  growth: { sp500: 70, bonds: 15, cash: 5, crypto: 7, gold: 3 },
};

export const mockConsultations = [
  {
    id: 'C-101',
    leadId: 'L-2394',
    date: 'Jan 26, 2026',
    time: '2:00 PM',
    type: 'Video',
    status: 'Scheduled',
    notes: 'Initial strategy review',
  },
  {
    id: 'C-098',
    leadId: 'L-2380',
    date: 'Jan 25, 2026',
    time: '10:00 AM',
    type: 'Call',
    status: 'Completed',
    notes: 'Follow-up on allocation adjustments',
  },
];

export const mockDocuments = [
  {
    id: 'D-301',
    leadId: 'L-2394',
    type: 'Risk Profile Summary',
    uploaded: 'Jan 24, 2026',
    size: '156 KB',
  },
  {
    id: 'D-298',
    leadId: 'L-2394',
    type: 'Action Plan',
    uploaded: 'Jan 23, 2026',
    size: '243 KB',
  },
];
