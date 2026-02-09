import React from 'react';
import { MetricCard } from '../portal/MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { performanceMetrics } from '../data/advisorMockData';

export function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Performance</h1>
        <p className="text-gray-600 mt-1">Track your advisor metrics and performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Strategy Built Rate" value="72%" trend="+5%" trendUp />
        <MetricCard label="Consult Conversion" value="58%" trend="+3%" trendUp />
        <MetricCard label="Close Rate" value="34%" trend="+2%" trendUp />
        <MetricCard label="Avg Response Time" value="2.3h" trend="-0.5h" trendUp />
      </div>

      {/* Leads Received Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads Received (Last 7 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceMetrics.leadsReceived}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            />
            <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Strategy Built</span>
              <span className="text-sm font-medium text-gray-900">{performanceMetrics.conversionRates.strategyBuilt}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${performanceMetrics.conversionRates.strategyBuilt}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Consult Booked</span>
              <span className="text-sm font-medium text-gray-900">{performanceMetrics.conversionRates.consultBooked}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${performanceMetrics.conversionRates.consultBooked}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Close Rate</span>
              <span className="text-sm font-medium text-gray-900">{performanceMetrics.conversionRates.closeRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${performanceMetrics.conversionRates.closeRate}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Partner Scorecard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Partner Scorecard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">Speed Grade</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">A</span>
              <span className="text-sm text-green-600">Excellent</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Homeowner Satisfaction</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">4.8</span>
              <span className="text-sm text-gray-600">/ 5.0</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Clarity Score</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold text-gray-900">96%</span>
              <span className="text-sm text-green-600">Outstanding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
