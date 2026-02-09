import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../MetricCard';
import { TrendingUp, Award } from 'lucide-react';

const weeklyLeadsData = [
  { week: 'Week 1', leads: 12 },
  { week: 'Week 2', leads: 15 },
  { week: 'Week 3', leads: 18 },
  { week: 'Week 4', leads: 14 },
];

const conversionData = [
  { month: 'Oct', seller: 16, buyer: 20 },
  { month: 'Nov', seller: 18, buyer: 22 },
  { month: 'Dec', seller: 17, buyer: 21 },
  { month: 'Jan', seller: 19, buyer: 23 },
];

export function RealEstatePerformance() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Performance</h1>
        <p className="text-sm text-gray-600 mt-1">Track your metrics and partner scorecard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Response Time Avg" value="2.4h" icon={TrendingUp} />
        <MetricCard title="Seller Close Rate" value="19%" icon={Award} trend={{ value: '+2% vs avg', isPositive: true }} />
        <MetricCard title="Buyer Close Rate" value="23%" icon={Award} trend={{ value: '+4% vs avg', isPositive: true }} />
        <MetricCard title="Homeowner Satisfaction" value="4.8/5" icon={Award} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Received by Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyLeadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="seller" stroke="#ef4444" name="Seller %" />
              <Line type="monotone" dataKey="buyer" stroke="#3b82f6" name="Buyer %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Scorecard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Speed Grade</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '92%' }} />
              </div>
              <span className="text-lg font-semibold text-green-600">A</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Close Rate Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '85%' }} />
              </div>
              <span className="text-lg font-semibold text-blue-600">B+</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Overall Rating</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '90%' }} />
              </div>
              <span className="text-lg font-semibold text-green-600">A-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
