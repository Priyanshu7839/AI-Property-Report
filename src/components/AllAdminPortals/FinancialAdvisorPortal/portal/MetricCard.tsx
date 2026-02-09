import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export function MetricCard({ label, value, trend, trendUp }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
        {trend && (
          <div className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
