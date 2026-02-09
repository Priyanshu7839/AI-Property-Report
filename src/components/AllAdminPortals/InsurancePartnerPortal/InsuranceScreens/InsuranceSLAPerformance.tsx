import { Clock, Target, TrendingUp, Award } from 'lucide-react';
import { InsuranceMetricCard } from '../Insuranceportal/InsuranceMetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SLAPerformanceProps {
  onNavigate: (screen: string) => void;
}

export function InsuranceSLAPerformance({ onNavigate }: SLAPerformanceProps) {
  const responseTimeData = [
    { month: 'Jul', avgHours: 3.2 },
    { month: 'Aug', avgHours: 2.8 },
    { month: 'Sep', avgHours: 2.5 },
    { month: 'Oct', avgHours: 2.1 },
    { month: 'Nov', avgHours: 1.9 },
    { month: 'Dec', avgHours: 1.7 },
    { month: 'Jan', avgHours: 1.5 }
  ];

  const conversionData = [
    { stage: 'New', rate: 100 },
    { stage: 'Contacted', rate: 85 },
    { stage: 'Qualified', rate: 70 },
    { stage: 'Quote Sent', rate: 55 },
    { stage: 'Comparing', rate: 42 },
    { stage: 'Bound', rate: 35 }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">SLA Performance</h1>
        <p className="text-gray-600 mt-1">Track your service level metrics and partner scorecard.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InsuranceMetricCard
          title="Avg Response Time"
          value="1.5h"
          icon={Clock}
          trend={{ value: '12% faster', isPositive: true }}
        />
        <InsuranceMetricCard
          title="SLA Breach Count"
          value="1"
          icon={Target}
          trend={{ value: '3 fewer this month', isPositive: true }}
        />
        <InsuranceMetricCard
          title="Quote-to-Bind Rate"
          value="35%"
          icon={TrendingUp}
          trend={{ value: '+5% vs last month', isPositive: true }}
        />
        <InsuranceMetricCard
          title="Partner Grade"
          value="A+"
          icon={Award}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Response Time Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Average Response Time</h2>
          <p className="text-sm text-gray-600 mb-4">7-month trend in hours</p>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
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
                dataKey="avgHours" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote-to-Bind Conversion</h2>
          <p className="text-sm text-gray-600 mb-4">Conversion rate by stage</p>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="rate" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Partner Scorecard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Partner Scorecard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Speed Grade</span>
              <span className="text-2xl font-bold text-green-600">A+</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">95th percentile</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Close Rate</span>
              <span className="text-2xl font-bold text-blue-600">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Above average</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Quote Quality</span>
              <span className="text-2xl font-bold text-indigo-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Excellent</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
              <span className="text-2xl font-bold text-purple-600">4.8</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Award className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-900">Elite Partner Status</p>
              <p className="text-xs text-green-700 mt-0.5">
                You're in the top 10% of insurance partners. Keep up the excellent work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
