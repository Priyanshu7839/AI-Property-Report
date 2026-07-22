import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Download, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export const TaxPanel = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-red-800 mb-2">Estimated Tax Impact</p>
            <h3 className="text-2xl font-bold text-red-900">$42,500</h3>
            <p className="text-xs text-red-700 mt-1">Based on current capital gains rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
           <CardContent className="p-6">
             <p className="text-sm font-medium text-gray-500 mb-2">Net Projected Gain</p>
             <h3 className="text-2xl font-bold text-gray-900">$185,200</h3>
             <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
               <TrendingUp className="w-3 h-3" />
               +12% vs holding
             </div>
           </CardContent>
        </Card>
        <Card className="bg-white">
           <CardContent className="p-6">
             <p className="text-sm font-medium text-gray-500 mb-2">Capital Cost Range</p>
             <h3 className="text-2xl font-bold text-gray-900">3.5% - 4.2%</h3>
             <p className="text-xs text-gray-500 mt-1">Weighted average cost</p>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <CardTitle>Holding Period Sensitivity</CardTitle>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
               <Download className="w-4 h-4" />
               Download Report
             </button>
          </div>
        </CardHeader>
        <CardContent>
           <div className="h-64 flex items-end justify-between gap-2">
              {[
                { year: '1Y', val: 30, tax: 40 },
                { year: '3Y', val: 45, tax: 35 },
                { year: '5Y', val: 60, tax: 25 },
                { year: '7Y', val: 75, tax: 20 },
                { year: '10Y', val: 90, tax: 15 },
              ].map((item) => (
                <div key={item.year} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full bg-gray-100 rounded-t-lg relative h-full flex items-end overflow-hidden">
                    <div style={{ height: `${item.val}%` }} className="w-full bg-black group-hover:bg-gray-800 transition-colors relative z-10"></div>
                    <div style={{ height: `${item.tax}%` }} className="w-full bg-red-200 absolute bottom-0 left-0 opacity-50"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.year}</span>
                </div>
              ))}
           </div>
           <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
                <span>Net Gain</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-red-200 rounded-sm"></div>
                <span>Tax Drag</span>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};
