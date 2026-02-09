import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, MapPin, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const kpis = [
    { label: 'Reports Generated Today', value: '847', change: '+12%', trend: 'up', icon: FileText },
    { label: 'Total Leads Captured Today', value: '312', change: '+8%', trend: 'up', icon: Users },
    { label: 'High-Intent Leads Today', value: '89', change: '+24%', trend: 'up', icon: TrendingUp },
    { label: 'Revenue Today', value: '$12,450', change: '+15%', trend: 'up', icon: DollarSign },
    { label: 'Zipcodes Sold', value: '43', change: '+3', trend: 'up', icon: MapPin },
    { label: 'Active Lead Buyers', value: '28', change: '0', trend: 'neutral', icon: Users },
  ];

  const leadsPerHour = [
    { hour: '12am', leads: 12 },
    { hour: '3am', leads: 8 },
    { hour: '6am', leads: 15 },
    { hour: '9am', leads: 45 },
    { hour: '12pm', leads: 78 },
    { hour: '3pm', leads: 92 },
    { hour: '6pm', leads: 65 },
    { hour: '9pm', leads: 38 },
  ];

  const reportsByState = [
    { state: 'CA', reports: 156 },
    { state: 'TX', reports: 134 },
    { state: 'FL', reports: 98 },
    { state: 'NY', reports: 87 },
    { state: 'AZ', reports: 72 },
    { state: 'WA', reports: 65 },
  ];

  const revenueByVertical = [
    { name: 'Refinance', value: 45, revenue: 5600 },
    { name: 'Insurance', value: 30, revenue: 3750 },
    { name: 'Seller Leads', value: 25, revenue: 3100 },
  ];

  const topZips = [
    { zip: '90210', city: 'Beverly Hills, CA', leads: 45, value: '$8,950' },
    { zip: '10001', city: 'New York, NY', leads: 38, value: '$7,600' },
    { zip: '33139', city: 'Miami Beach, FL', leads: 32, value: '$6,400' },
    { zip: '98101', city: 'Seattle, WA', leads: 28, value: '$5,600' },
    { zip: '78701', city: 'Austin, TX', leads: 24, value: '$4,800' },
  ];

  const alerts = [
    { type: 'success', message: 'You generated 241 high-equity leads this week — SELL ZIP 43204!' },
    { type: 'warning', message: 'ZIP 90210 has 4 potential sellers — assign an agent.' },
    { type: 'info', message: 'Refi partner available: $78 CPL in CA.' },
    { type: 'success', message: 'Insurance leads in FL up 34% — increase pricing!' },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Command & Control Center</h1>
        <p className="text-gray-600">Real-time overview of your lead generation platform</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    kpi.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
              <p className="text-gray-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">Smart Alerts</h2>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                alert.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p
                className={`text-sm ${
                  alert.type === 'success'
                    ? 'text-green-800'
                    : alert.type === 'warning'
                    ? 'text-yellow-800'
                    : 'text-blue-800'
                }`}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads per Hour */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Leads Per Hour</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leadsPerHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Reports by State */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Reports Per State</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reportsByState}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="state" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="reports" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Vertical */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Revenue By Vertical</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueByVertical}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByVertical.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {revenueByVertical.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-900">${item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top ZIPs */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Top Performing ZIPs</h2>
          <div className="space-y-3">
            {topZips.map((zip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900">{zip.zip}</p>
                  <p className="text-sm text-gray-600">{zip.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{zip.value}</p>
                  <p className="text-sm text-gray-600">{zip.leads} leads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heat Map Placeholder */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-gray-900 mb-4">USA Heat Map</h2>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive USA map with ZIP code data</p>
            <p className="text-sm text-gray-500 mt-1">Darker shades = more homeowners generating reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}
