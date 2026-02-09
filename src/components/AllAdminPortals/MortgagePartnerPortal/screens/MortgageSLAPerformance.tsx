import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, TrendingDown, Clock } from 'lucide-react';

const responseTimeData = [
  { range: '0-15m', count: 45 },
  { range: '15-30m', count: 32 },
  { range: '30-60m', count: 18 },
  { range: '60-120m', count: 8 },
  { range: '120m+', count: 3 },
];

const slaBreachData = [
  { week: 'Week 1', breaches: 2 },
  { week: 'Week 2', breaches: 1 },
  { week: 'Week 3', breaches: 3 },
  { week: 'Week 4', breaches: 0 },
];

const conversionData = [
  { timeToContact: '<15m', conversion: 85 },
  { timeToContact: '15-30m', conversion: 72 },
  { timeToContact: '30-60m', conversion: 58 },
  { timeToContact: '60m+', conversion: 35 },
];

export function MortgageSLAPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">SLA Performance</h1>
        <p className="text-gray-600 mt-1">Monitor your response times and service quality</p>
      </div>

      {/* Partner Scorecard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Partner Scorecard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Speed Rating</p>
            <p className="text-3xl font-bold text-green-600">A</p>
            <p className="text-xs text-gray-500 mt-1">Excellent</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <TrendingDown className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Close Rate</p>
            <p className="text-3xl font-bold text-blue-600">78%</p>
            <p className="text-xs text-gray-500 mt-1">Above Average</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Doc Completion</p>
            <p className="text-3xl font-bold text-purple-600">A</p>
            <p className="text-xs text-gray-500 mt-1">Fast</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-3">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">User Satisfaction</p>
            <p className="text-3xl font-bold text-amber-600">4.8</p>
            <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
          </div>
        </div>
      </div>

      {/* Response Time Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Time Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="range" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SLA Breaches Over Time */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">SLA Breaches Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={slaBreachData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="breaches" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Rate by Speed to Contact */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Conversion Rate by Speed-to-Contact</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="timeToContact" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="%" />
            <Tooltip />
            <Bar dataKey="conversion" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average First Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">18 minutes</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Close Time</p>
              <p className="text-2xl font-semibold text-gray-900">4.2 days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">SLA Compliance Rate</p>
              <p className="text-2xl font-semibold text-green-600">96%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
