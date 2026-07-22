import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

const INCOME_DATA = [
  { month: 'Jan', income: 4200, expense: 1200 },
  { month: 'Feb', income: 4200, expense: 1350 },
  { month: 'Mar', income: 4200, expense: 1100 },
  { month: 'Apr', income: 4350, expense: 1400 },
  { month: 'May', income: 4350, expense: 1250 },
  { month: 'Jun', income: 4350, expense: 1150 },
];

export const IncomePanel = () => {
  const [view, setView] = useState<'chart' | 'table'>('chart');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <IncomeCard
          title="Monthly Rent"
          value="$4,350"
          trend="+3.5% vs last lease"
          positive
          icon={<DollarSign className="w-4 h-4 text-green-600" />}
        />
        <IncomeCard
          title="Net Yield"
          value="4.8%"
          trend="-0.2% due to repairs"
          neutral
          icon={<TrendingUp className="w-4 h-4 text-gray-500" />}
        />
        <IncomeCard
          title="Expense Ratio"
          value="28%"
          trend="Target: <25%"
          neutral
          icon={<TrendingDown className="w-4 h-4 text-amber-500" />}
        />
        <IncomeCard
          title="Cash Flow (YTD)"
          value="$18,450"
          trend="On track"
          positive
          icon={<RefreshCcw className="w-4 h-4 text-blue-500" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Income vs Expenses</CardTitle>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setView('chart')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'chart' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Chart
            </button>
            <button 
              onClick={() => setView('table')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'table' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Table
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <BarChart data={INCOME_DATA}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Rental Income" fill="#111111" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="expense" name="Expenses" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function IncomeCard({ title, value, trend, positive, neutral, icon }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-black mb-1">{value}</h3>
          <p className={`text-xs font-medium ${positive ? 'text-green-600' : neutral ? 'text-gray-600' : 'text-red-600'}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
