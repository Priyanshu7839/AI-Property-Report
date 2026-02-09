import React from 'react';
import { mockPerformanceData } from '../data/TaxmockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

export function TaxPerformance() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Performance</h1>
        <p className="text-gray-600 mt-2">Track your advisory performance metrics.</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads Received Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Leads Received Weekly</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockPerformanceData.leadsReceived}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Close Rate Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Close Rate Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockPerformanceData.closeRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} unit="%" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Consultations Completed</p>
          <p className="text-3xl font-semibold text-gray-900">24</p>
          <p className="text-sm text-green-600 mt-2">+6 this month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
          <p className="text-3xl font-semibold text-gray-900">2.3h</p>
          <p className="text-sm text-green-600 mt-2">-0.5h improvement</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Avg Lead Lifecycle</p>
          <p className="text-3xl font-semibold text-gray-900">4.2d</p>
          <p className="text-sm text-gray-500 mt-2">Industry avg: 6.5d</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Close Rate</p>
          <p className="text-3xl font-semibold text-gray-900">78%</p>
          <p className="text-sm text-green-600 mt-2">+6% vs last month</p>
        </div>
      </div>

      {/* Partner Scorecard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Partner Scorecard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Speed Grade</span>
              <span className="text-2xl font-semibold text-green-600">A+</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '95%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Top 5% of advisors</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Homeowner Satisfaction</span>
              <span className="text-2xl font-semibold text-green-600">4.9</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '98%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 18 reviews</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Clarity Score</span>
              <span className="text-2xl font-semibold text-blue-600">92</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Advice clarity rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
