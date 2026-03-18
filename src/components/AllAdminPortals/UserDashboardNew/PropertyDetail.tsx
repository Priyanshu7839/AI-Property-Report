import React, { useState } from 'react';
import { Card, Button, Badge, StatCard } from '../../../components/ui/Components';
import { 
  ArrowLeft, Download, Share2, Printer, 
  TrendingUp, TrendingDown, Info, 
  DollarSign, PieChart, FileText, Settings, Sliders 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Property, scenarios } from './mockData';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'valuation', label: 'Valuation' },
  { id: 'equity', label: 'Equity Capacity' },
  { id: 'scenarios', label: 'Strategy Scenarios' },
  { id: 'tax', label: 'Tax Impact' },
  { id: 'docs', label: 'Documents' },
];

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [unlockAmount, setUnlockAmount] = useState(50); // percentage

  const safeLimit = property.valuation * 0.65 - property.mortgageBalance;
  const maxLimit = property.valuation * 0.80 - property.mortgageBalance;
  const currentUnlock = (maxLimit * unlockAmount) / 100;
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#E6E8EC] pb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#5B616E] hover:text-[#111111] w-fit"
        >
          <ArrowLeft size={16} /> Back to Properties
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <img 
              src={property.image} 
              alt={property.address} 
              className="w-16 h-16 rounded-lg object-cover border border-[#E6E8EC]"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#111111]">{property.address}</h1>
              <div className="flex items-center gap-2 text-[#5B616E] mt-1 text-sm">
                <span>{property.city}, {property.state}</span>
                <span className="w-1 h-1 bg-[#9CA3AF] rounded-full" />
                <span>ID: {property.id}</span>
                <span className="w-1 h-1 bg-[#9CA3AF] rounded-full" />
                <span className="text-emerald-600 font-medium">Active Asset</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={14} /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer size={14} /> Print
            </Button>
            <Button size="sm" className="gap-2">
              <Download size={14} /> Download Report
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mt-4 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-[#111111] text-[#111111]' 
                  : 'border-transparent text-[#5B616E] hover:text-[#111111] hover:border-gray-200'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard 
                  label="Current Valuation" 
                  value={`$${(property.valuation / 1000000).toFixed(2)}M`} 
                  trend="+2.4%" 
                  trendDirection="up"
                  subtext="AI Confidence: 94%"
                />
                <StatCard 
                  label="Net Equity" 
                  value={`$${(property.equity / 1000000).toFixed(2)}M`} 
                  trend="+5.1%" 
                  trendDirection="up"
                  subtext="LTV: 45%"
                />
                <StatCard 
                  label="Monthly Income" 
                  value={`$${(property.monthlyRent).toLocaleString()}`} 
                  trend="-1.2%" 
                  trendDirection="down"
                  subtext="Occupancy: 100%"
                />
              </div>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-[#111111]">Valuation History</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-[#5B616E]">Compared to:</span>
                     <Badge variant="neutral">Zip Code Avg</Badge>
                  </div>
                </div>
                <div className="h-64 w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={1}>
                    <AreaChart data={[
                      { name: '2021', value: property.valuation * 0.8 },
                      { name: '2022', value: property.valuation * 0.85 },
                      { name: '2023', value: property.valuation * 0.9 },
                      { name: '2024', value: property.valuation * 0.95 },
                      { name: '2025', value: property.valuation * 0.98 },
                      { name: '2026', value: property.valuation },
                    ]}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#111111" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EC" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#111111" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#111111]">Strategy Scenarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scenarios.slice(0, 2).map((scenario) => (
                    <Card key={scenario.id} className="p-5 hover:border-gray-400 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="neutral">{scenario.id}</Badge>
                        <span className="text-emerald-600 font-semibold">{scenario.return} Return</span>
                      </div>
                      <h4 className="font-medium text-[#111111] mb-1">{scenario.name}</h4>
                      <p className="text-xs text-[#5B616E] mb-4">{scenario.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs border-t border-[#E6E8EC] pt-3">
                        <div>
                          <p className="text-[#9CA3AF]">Volatility</p>
                          <p className="font-medium">{scenario.volatility}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF]">Liquidity</p>
                          <p className="font-medium">{scenario.liquidity}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF]">Tax Drag</p>
                          <p className="font-medium">{scenario.taxDrag}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'equity' && (
             <div className="space-y-6">
               <Card className="p-8">
                 <div className="mb-8">
                   <h3 className="text-lg font-semibold text-[#111111]">Equity Unlock Simulation</h3>
                   <p className="text-[#5B616E]">Adjust the slider to simulate equity release based on LTV constraints.</p>
                 </div>

                 <div className="mb-10">
                   <div className="flex justify-between text-sm font-medium mb-4">
                     <span className="text-[#5B616E]">Unlock Amount</span>
                     <span className="text-[#111111] text-lg">${(currentUnlock / 1000000).toFixed(2)}M</span>
                   </div>
                   <input 
                     type="range" 
                     min="0" 
                     max="100" 
                     value={unlockAmount} 
                     onChange={(e) => setUnlockAmount(parseInt(e.target.value))}
                     className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#111111]"
                   />
                   <div className="flex justify-between text-xs text-[#9CA3AF] mt-2">
                     <span>$0</span>
                     <span>Max Safe Limit ($1.8M)</span>
                     <span>Aggressive ($2.4M)</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E6E8EC]">
                   <div>
                     <p className="text-sm text-[#5B616E]">New Loan Balance</p>
                     <p className="text-xl font-semibold text-[#111111] mt-1">
                       ${((property.mortgageBalance + currentUnlock) / 1000000).toFixed(2)}M
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-[#5B616E]">Resulting LTV</p>
                     <p className="text-xl font-semibold text-[#111111] mt-1">
                       {(((property.mortgageBalance + currentUnlock) / property.valuation) * 100).toFixed(1)}%
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-[#5B616E]">Est. Monthly Payment</p>
                     <p className="text-xl font-semibold text-[#111111] mt-1">
                       ${((property.mortgageBalance + currentUnlock) * 0.0055).toFixed(0)}
                     </p>
                   </div>
                 </div>
               </Card>
             </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-[#111111] mb-4">Market Pulse</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-[#5B616E]">Momentum</span>
                 <Badge variant="positive">Strong Buy</Badge>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-[#5B616E]">Demand Score</span>
                 <span className="text-sm font-medium">8.4/10</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-[#5B616E]">Avg Days on Market</span>
                 <span className="text-sm font-medium">14 Days</span>
               </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E6E8EC]">
              <div className="text-xs text-[#9CA3AF] mb-2">Comparable Sales</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1200 Waverley</span>
                  <span className="font-medium">$4.1M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>1450 Cowper</span>
                  <span className="font-medium">$3.9M</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#111111] mb-4">Property Health</h3>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg flex gap-3">
                <div className="mt-0.5"><TrendingUp size={16} className="text-emerald-600" /></div>
                <div>
                  <div className="text-sm font-medium text-emerald-900">Appreciation</div>
                  <div className="text-xs text-emerald-700">Outperforming market by 1.2%</div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg flex gap-3">
                <div className="mt-0.5"><Info size={16} className="text-blue-600" /></div>
                <div>
                  <div className="text-sm font-medium text-blue-900">Tax Assessment</div>
                  <div className="text-xs text-blue-700">Review due in 14 days</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
