import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { year: '2019', value: 850000 },
  { year: '2020', value: 890000 },
  { year: '2021', value: 980000 },
  { year: '2022', value: 1100000 },
  { year: '2023', value: 1150000 },
  { year: '2024', value: 1250000, projected: true }, // Current year roughly
  { year: '2025', value: 1320000, projected: true },
  { year: '2026', value: 1400000, projected: true },
  { year: '2027', value: 1480000, projected: true },
  { year: '2028', value: 1580000, projected: true },
  { year: '2029', value: 1690000, projected: true },
];

export const AppreciationChart: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(8px)',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#111111'
            }}
            itemStyle={{ color: '#005BFF' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
          />
          <ReferenceLine x="2024" stroke="#000" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#9CA3AF', fontSize: 12 }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#000" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
