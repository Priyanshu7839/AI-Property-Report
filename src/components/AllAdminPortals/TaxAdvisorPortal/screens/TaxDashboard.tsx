import React from 'react';
import { Link } from 'react-router-dom';
import { MetricCard } from '../MetricCard';
import { StatusChip } from '../StatusChip';
import { SLAChip } from '../SLAChip';
import { mockLeads } from '../data/TaxmockData';
import {
  Inbox,
  Users,
  Calendar,
  FileCheck,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export function TaxDashboard() {
  const priorityLeads = mockLeads.filter(lead => lead.urgency === 'high').slice(0, 3);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Tax Advisor Dashboard</h1>
        <p className="text-gray-600 mt-2">Tax optimization opportunities from AIPropertyReport.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <MetricCard title="New Leads Today" value="3" icon={Inbox} trend="+2 from yesterday" trendUp />
        <MetricCard title="Active Leads" value="12" icon={Users} />
        <MetricCard title="Consultations Scheduled" value="5" icon={Calendar} />
        <MetricCard title="Advice Delivered" value="8" icon={FileCheck} />
        <MetricCard title="Closed Won" value="18" icon={CheckCircle} trend="+3 this week" trendUp />
        <MetricCard title="Earnings This Month" value="$8,100" icon={DollarSign} trend="+12%" trendUp />
      </div>

      {/* Lead Pipeline Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Pipeline</h2>
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { label: 'New', count: 3, color: 'bg-blue-600' },
            { label: 'Contacted', count: 4, color: 'bg-purple-600' },
            { label: 'Intake Completed', count: 2, color: 'bg-indigo-600' },
            { label: 'Consult Scheduled', count: 5, color: 'bg-cyan-600' },
            { label: 'Advice Delivered', count: 8, color: 'bg-teal-600' },
            { label: 'Closed Won', count: 18, color: 'bg-green-600' },
          ].map((stage, index, arr) => (
            <div key={stage.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center min-w-[140px]">
                <div className={`w-12 h-12 ${stage.color} rounded-full flex items-center justify-center text-white font-semibold mb-2`}>
                  {stage.count}
                </div>
                <p className="text-sm font-medium text-gray-900 text-center">{stage.label}</p>
              </div>
              {index < arr.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Tax Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Priority Tax Leads</h2>
          <Link to="/TaxAdmin/leads" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all leads →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ZIP / State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Tax Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA Timer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {priorityLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.receivedTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {lead.propertyValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {lead.primaryTaxTopic}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.urgency === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                      lead.urgency === 'medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                      'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {lead.urgency.charAt(0).toUpperCase() + lead.urgency.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SLAChip timeRemaining={lead.slaRemaining} isUrgent={lead.urgency === 'high'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to="/TaxAdmin/lead-details"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
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