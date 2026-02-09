import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function DashboardCard({ title, value, change, icon, trend }: DashboardCardProps) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${trendColor}`}>{change}</p>
          )}
        </div>
        {icon && (
          <div className="text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
