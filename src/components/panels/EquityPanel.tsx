import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import * as Slider from '@radix-ui/react-slider';
import { Lock, Unlock, DollarSign, Info, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const EquityPanel = () => {
  const [unlockAmount, setUnlockAmount] = useState(200000);
  const totalValue = 3500000;
  const mortgage = 2100000;
  const equity = totalValue - mortgage;
  const maxSafeUnlock = equity * 0.8;

  const data = [
    { name: 'Mortgage', value: mortgage, color: '#E5E7EB' },
    { name: 'Locked Equity', value: equity - unlockAmount, color: '#9CA3AF' },
    { name: 'Unlocked', value: unlockAmount, color: '#10B981' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Equity Capacity Simulator</CardTitle>
          <CardDescription>Adjust the slider to simulate equity unlock scenarios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* Visual Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Debt: ${(mortgage/1000000).toFixed(1)}M</span>
              <span>Total Value: ${(totalValue/1000000).toFixed(1)}M</span>
            </div>
            <div className="h-12 w-full bg-gray-100 rounded-lg flex overflow-hidden border border-gray-200 relative">
              <div style={{ width: `${(mortgage / totalValue) * 100}%` }} className="bg-gray-300 h-full border-r border-white flex items-center justify-center text-xs text-gray-600 font-medium">
                Mortgage
              </div>
              <div style={{ width: `${((equity - unlockAmount) / totalValue) * 100}%` }} className="bg-gray-400 h-full border-r border-white flex items-center justify-center text-xs text-white font-medium">
                Retained
              </div>
              <div style={{ width: `${(unlockAmount / totalValue) * 100}%` }} className="bg-green-500 h-full transition-all duration-300 flex items-center justify-center text-xs text-white font-bold">
                Unlock
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Unlock className="w-4 h-4 text-green-600" />
                Unlock Amount
              </label>
              <span className="text-2xl font-bold text-gray-900">${unlockAmount.toLocaleString()}</span>
            </div>
            
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[unlockAmount]}
              max={maxSafeUnlock}
              step={10000}
              onValueChange={(val) => setUnlockAmount(val[0])}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-6 h-6 bg-white border-[3px] border-green-500 shadow-md rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-transform"
                aria-label="Volume"
              />
            </Slider.Root>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>Safe Max: ${maxSafeUnlock.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm text-center">
               <p className="text-xs text-gray-500 mb-1">New LTV</p>
               <p className="text-xl font-bold text-gray-900">{(((mortgage + unlockAmount) / totalValue) * 100).toFixed(1)}%</p>
             </div>
             <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm text-center">
               <p className="text-xs text-gray-500 mb-1">Cash Out</p>
               <p className="text-xl font-bold text-green-600">${(unlockAmount / 1000).toFixed(0)}k</p>
             </div>
             <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm text-center">
               <p className="text-xs text-gray-500 mb-1">Monthly Cost</p>
               <p className="text-xl font-bold text-gray-900">~${(unlockAmount * 0.006).toFixed(0)}</p>
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
             <CardTitle>Equity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2 w-full">
               {data.map((item) => (
                 <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-gray-600">{item.name}</span>
                   </div>
                   <span className="font-semibold text-gray-900">{((item.value/totalValue)*100).toFixed(0)}%</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100">
           <CardContent className="p-5">
             <div className="flex gap-3">
               <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
               <div>
                 <h4 className="font-semibold text-amber-900 text-sm">Risk Assessment</h4>
                 <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                   Increasing LTV above 75% may impact your interest rate tier. Current unlock maintains a "Safe" risk profile.
                 </p>
               </div>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};
