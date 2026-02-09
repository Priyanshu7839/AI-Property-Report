import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, TrendingDown, Eye } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { StatusChip } from '../StatusChip';
import { SLAChip } from '../SLAChip';
import { mockLeads } from '../RealEstatedata/RealEstatemockData';
import { Link } from 'react-router-dom';

export function RealEstateDashboard() {
  const priorityLeads = mockLeads.filter(lead => lead.slaUrgent || lead.urgency === '0-30d').slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Real Estate Agent Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Your homeowner opportunities from AIPropertyReport.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <MetricCard
          title="New Leads Today"
          value="8"
          icon={Users}
          trend={{ value: '+3 from yesterday', isPositive: true }}
        />
        <MetricCard
          title="Active Seller Leads"
          value="24"
          icon={TrendingDown}
        />
        <MetricCard
          title="Active Buyer Leads"
          value="18"
          icon={TrendingUp}
        />
        <MetricCard
          title="Appointments Scheduled"
          value="12"
          icon={Calendar}
        />
        <MetricCard
          title="Deals Closed (Won)"
          value="7"
          icon={DollarSign}
          trend={{ value: '+2 this week', isPositive: true }}
        />
        <MetricCard
          title="Earnings This Month"
          value="$18,500"
          icon={DollarSign}
        />
      </div>

      {/* Lead Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Intent Leads</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Leads</span>
              <span className="text-2xl font-semibold text-gray-900">32</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="text-lg font-semibold text-green-600">18.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Home Value</span>
              <span className="text-lg font-semibold text-gray-900">$875K</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buyer Intent Leads</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Leads</span>
              <span className="text-2xl font-semibold text-gray-900">26</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="text-lg font-semibold text-green-600">22.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Budget</span>
              <span className="text-lg font-semibold text-gray-900">$725K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Priority Leads</h3>
          <p className="text-sm text-gray-600 mt-1">Urgent leads requiring immediate attention</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Est. Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SLA Timer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {priorityLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/RealEstateAdmin/lead-details/${lead.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                      {lead.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.receivedTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.location.zip}, {lead.location.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${(lead.estimatedValue / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusChip status={lead.intent} variant={lead.intent === 'Both' ? 'info' : 'default'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusChip 
                      status={lead.urgency} 
                      variant={lead.urgency === '0-30d' ? 'danger' : lead.urgency === '30-90d' ? 'warning' : 'default'} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SLAChip timeRemaining={lead.slaTimeRemaining} isUrgent={lead.slaUrgent} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to="/RealEstateAdmin/lead-details"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}