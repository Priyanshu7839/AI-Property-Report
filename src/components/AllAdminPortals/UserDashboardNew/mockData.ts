
export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  image: string;
  valuation: number;
  equity: number;
  confidence: number;
  lastUpdated: string;
  purchasePrice: number;
  mortgageBalance: number;
  monthlyRent: number;
  expenseRatio: number;
  riskScore: 'Low' | 'Medium' | 'High';
}

export const properties: Property[] = [
  {
    id: '1',
    address: '1240 Waverley St',
    city: 'Palo Alto',
    state: 'CA',
    image: 'https://images.unsplash.com/photo-1600596542815-e32870110029?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    valuation: 4250000,
    equity: 1850000,
    confidence: 94,
    lastUpdated: 'Feb 14, 2026',
    purchasePrice: 3100000,
    mortgageBalance: 2400000,
    monthlyRent: 14500,
    expenseRatio: 0.32,
    riskScore: 'Low'
  },
  {
    id: '2',
    address: '88 King St, Unit 402',
    city: 'San Francisco',
    state: 'CA',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    valuation: 1150000,
    equity: 420000,
    confidence: 89,
    lastUpdated: 'Feb 12, 2026',
    purchasePrice: 980000,
    mortgageBalance: 730000,
    monthlyRent: 4800,
    expenseRatio: 0.45,
    riskScore: 'Medium'
  },
  {
    id: '3',
    address: '2200 Westlake Ave',
    city: 'Seattle',
    state: 'WA',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    valuation: 2850000,
    equity: 950000,
    confidence: 91,
    lastUpdated: 'Feb 10, 2026',
    purchasePrice: 2100000,
    mortgageBalance: 1900000,
    monthlyRent: 8200,
    expenseRatio: 0.28,
    riskScore: 'Low'
  },
  {
    id: '4',
    address: '4505 Highland Dr',
    city: 'Austin',
    state: 'TX',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    valuation: 1650000,
    equity: 650000,
    confidence: 88,
    lastUpdated: 'Feb 08, 2026',
    purchasePrice: 1200000,
    mortgageBalance: 1000000,
    monthlyRent: 6500,
    expenseRatio: 0.35,
    riskScore: 'Medium'
  },
];

export const advisors = [
  {
    id: '1',
    name: 'Sarah Chen, CFA',
    role: 'Wealth Manager',
    company: 'Capital Private',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80',
    specialty: 'Real Estate Portfolio Strategy'
  },
  {
    id: '2',
    name: 'Michael Ross',
    role: 'Tax Specialist',
    company: 'Ross & Partners',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80',
    specialty: '1031 Exchange & Capital Gains'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Real Estate Agent',
    company: 'Luxury Living',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80',
    specialty: 'High-Value Property Acquisition'
  }
];

export const scenarios = [
  {
    id: 'A',
    name: 'Preserve Structure',
    return: '6.2%',
    volatility: 'Low',
    liquidity: 'Medium',
    taxDrag: '1.2%',
    description: 'Maintain current holdings with minimal leverage adjustment.'
  },
  {
    id: 'B',
    name: 'Structured Allocation',
    return: '8.5%',
    volatility: 'Medium',
    liquidity: 'High',
    taxDrag: '1.8%',
    description: 'Optimize debt structure to release equity for diversified assets.'
  },
  {
    id: 'C',
    name: 'Growth Tilt',
    return: '11.4%',
    volatility: 'High',
    liquidity: 'Low',
    taxDrag: '2.4%',
    description: 'Aggressive leverage to acquire high-growth multi-family units.'
  },
  {
    id: 'D',
    name: 'AI Optimized',
    return: '12.8%',
    volatility: 'Med-High',
    liquidity: 'Medium',
    taxDrag: '2.1%',
    description: 'Algorithmic balancing of rental yield and capital appreciation.'
  }
];

// export interface Report {
//   id: string;
//   title: string;
//   type: 'Valuation' | 'Tax' | 'Portfolio' | 'Strategy';
//   date: string;
//   generatedBy: string;
//   scope: string; // "All Properties" or specific address
//   status: 'Ready' | 'Processing' | 'Archived';
//   metrics: {
//     label: string;
//     value: string;
//     trend?: string;
//     trendDirection?: 'up' | 'down' | 'neutral';
//   }[];
//   summary: string;
// }

export const reports= [
  {
    id: 'REP-2026-001',
    title: 'Q1 2026 Portfolio Performance',
    type: 'Portfolio',
    date: 'Feb 15, 2026',
    generatedBy: 'AI System',
    scope: 'All Properties',
    status: 'Ready',
    summary: 'Portfolio valuation increased by 4.2% driven by strong appreciation in Palo Alto market. Cash flow remains positive despite rising maintenance costs.',
    metrics: [
      { label: 'Total Valuation', value: '$9.9M', trend: '+4.2%', trendDirection: 'up' },
      { label: 'Net Equity', value: '$3.87M', trend: '+5.1%', trendDirection: 'up' },
      // { label: 'Cash-on-Cash', value: '5.8%', trend: '-0.2%', trendDirection: 'down' },
      // { label: 'DSCR', value: '1.42x', trend: 'Stable', trendDirection: 'neutral' }
    ]
  },
  {
    id: 'REP-2026-002',
    title: '1240 Waverley St Valuation Analysis',
    type: 'Valuation',
    date: 'Feb 10, 2026',
    generatedBy: 'Sarah Chen, CFA',
    scope: '1240 Waverley St',
    status: 'Ready',
    summary: 'Detailed comparative market analysis (CMA) suggests current valuation is supported by recent sales on Cowper and Lincoln streets.',
    metrics: [
      { label: 'Est. Market Value', value: '$4.25M', trend: '+2.4%', trendDirection: 'up' },
      { label: 'Cap Rate', value: '3.8%', trend: 'Stable', trendDirection: 'neutral' },
      { label: 'Price / SqFt', value: '$1,850', trend: '+1.5%', trendDirection: 'up' }
    ]
  },
  {
    id: 'REP-2026-003',
    title: '2025 Tax Liability Projection',
    type: 'Tax',
    date: 'Jan 28, 2026',
    generatedBy: 'Michael Ross',
    scope: 'All Properties',
    status: 'Archived',
    summary: 'Projected tax liability for FY2025. Depreciation schedules have been optimized. Potential 1031 exchange opportunity identified for 4505 Highland Dr.',
    metrics: [
      { label: 'Est. Tax Liability', value: '$142k', trend: '-8%', trendDirection: 'up' }, // up is good here? context matters, let's assume green means good result
      { label: 'Depreciation Benefit', value: '$85k', trend: '+12%', trendDirection: 'up' }
    ]
  }
];
