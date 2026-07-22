import React,{useState,useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


export const AppreciationChart: React.FC = ({HousePrices,growthRate}) => {
  console.log(growthRate)
  console.log(HousePrices)

  


  const [data, setData] = useState([]);

useEffect(() => {
  if (!HousePrices?.length) return;

  const now = new Date();

  // Build lookup map
  const priceMap = new Map();

  HousePrices.forEach((item) => {
    const d = new Date(item?.x);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    priceMap.set(key, Number(item?.y));
  });

  // fallback finder (search previous months if exact month missing)
  const getClosePrice = (yearOffset) => {
    let year = now.getFullYear() - yearOffset;
    let month = now.getMonth() + 1;

    while (year >= 1900) {
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (priceMap.has(key)) {
        return priceMap.get(key);
      }

      month--;

      if (month === 0) {
        month = 12;
        year--;
      }
    }

    return null;
  };

  // limit growth rate
  let houseGrowthModified = growthRate;
  if (growthRate > 5) houseGrowthModified = 5;
  if (growthRate < -2) houseGrowthModified = -2;

  const basePrice = getClosePrice(0);

  if (!basePrice) return;

  const result = [];

  // past 5 years
  for (let i = 5; i > 0; i--) {
    result.push({
      year: now.getFullYear() - i,
      value: getClosePrice(i),
    });
  }

  // current year
  result.push({
    year: now.getFullYear(),
    value: basePrice,
    projected: true,
  });

  // future projections
  for (let i = 1; i <= 5; i++) {
    result.push({
      year: now.getFullYear() + i,
      value: basePrice * (1 + houseGrowthModified / 100) ** i,
      projected: true,
    });
  }

  setData(result);
  

}, [HousePrices, growthRate]);



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
          <ReferenceLine x={new Date().getFullYear()} stroke="#000" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#9CA3AF', fontSize: 12 }} />
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
