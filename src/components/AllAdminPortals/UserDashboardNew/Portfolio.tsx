import React from 'react';
import { Card, Button, Badge } from '../../../components/ui/Components';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { scenarios } from './mockData';
import { Check, Shield, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

const allocationData = [
  { name: 'Real Estate', value: 65, color: '#111111' },
  { name: 'S&P 500', value: 15, color: '#5B616E' },
  { name: 'Bonds', value: 10, color: '#9CA3AF' },
  { name: 'Cash', value: 5, color: '#E6E8EC' },
  { name: 'Crypto', value: 5, color: '#F87171' },
];

export function Portfolio() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Portfolio Builder</h1>
        <p className="text-[#5B616E] mt-1">Model different allocation strategies and assess risk impact.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Allocation Section */}
          <Card className="p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-semibold text-[#111111]">Current Allocation</h3>
               <Button variant="outline" size="sm">Rebalance</Button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
               <div className="h-64 w-full relative min-w-0">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={1}>
                   <PieChart>
                     <Pie
                       data={allocationData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {allocationData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-3xl font-bold text-[#111111]">8.4%</span>
                   <span className="text-xs text-[#5B616E] font-medium">Proj. Yield</span>
                 </div>
               </div>

               <div className="space-y-4">
                 {allocationData.map((item) => (
                   <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-sm font-medium text-[#111111]">{item.name}</span>
                     </div>
                     <div className="flex items-center gap-4">
                       <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full rounded-full" 
                           style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                         />
                       </div>
                       <span className="text-sm text-[#5B616E] w-8 text-right">{item.value}%</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </Card>

          {/* Scenarios Comparison */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#111111]">Strategy Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="p-5 hover:border-[#111111] transition-colors group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-transparent -mr-8 -mt-8 rounded-full" />
                  
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <Badge variant={scenario.id === 'D' ? 'positive' : 'neutral'} className="font-bold">
                      Scenario {scenario.id}
                    </Badge>
                    {scenario.id === 'D' && <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><Zap size={12} fill="currentColor" /> AI Recommended</span>}
                  </div>
                  
                  <h4 className="font-bold text-[#111111] text-lg mb-1">{scenario.name}</h4>
                  <p className="text-sm text-[#5B616E] mb-4 h-10">{scenario.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#E6E8EC]">
                    <div>
                      <div className="text-xs text-[#9CA3AF]">Proj. Return</div>
                      <div className="text-xl font-bold text-[#111111]">{scenario.return}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#9CA3AF]">Tax Drag</div>
                      <div className="text-xl font-medium text-[#5B616E]">{scenario.taxDrag}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={scenario.volatility === 'High' ? 'risk' : 'neutral'} className="text-[10px] px-1.5">
                      {scenario.volatility} Volatility
                    </Badge>
                    <Badge variant="neutral" className="text-[10px] px-1.5">
                      {scenario.liquidity} Liquidity
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-[#111111] text-white border-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Risk Meter</h3>
              <Shield size={20} className="text-emerald-400" />
            </div>
            
            <div className="relative w-full h-32 flex items-end justify-center mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Simple Gauge Visual */}
                 <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                   <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#333" strokeWidth="8" strokeLinecap="round" />
                   <path d="M 10 50 A 40 40 0 0 1 46 10" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
                 </svg>
              </div>
              <div className="text-center z-10 mb-2">
                <div className="text-2xl font-bold">Low-Med</div>
                <div className="text-xs text-gray-400">Score: 35/100</div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Your portfolio is currently conservative with a strong bias towards secured real assets.
            </p>
            
            <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white">
              Optimize Risk
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#111111] mb-4">Tax Sensitivity</h3>
            <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <div className="p-2 bg-rose-50 rounded-lg text-rose-600 mt-1">
                   <AlertTriangle size={16} />
                 </div>
                 <div>
                   <h4 className="text-sm font-medium text-[#111111]">High Impact Event</h4>
                   <p className="text-xs text-[#5B616E] mt-1">Selling 1240 Waverley now triggers approx $420k in capital gains.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mt-1">
                   <Check size={16} />
                 </div>
                 <div>
                   <h4 className="text-sm font-medium text-[#111111]">Opportunity</h4>
                   <p className="text-xs text-[#5B616E] mt-1">1031 Exchange window available until Q3 2026.</p>
                 </div>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
