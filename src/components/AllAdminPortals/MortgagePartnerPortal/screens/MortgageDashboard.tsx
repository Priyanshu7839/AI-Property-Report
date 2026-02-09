import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  AlertTriangle,
  FileText,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { StatusChip } from '../StatusChip';
import { SLAChip } from '../SLAChip';
import { dashboardKPIs, pipelineData, mockLeads } from '../Mortagedata/MortgagemockData';

export function MortgageDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Mortgage Partner Dashboard</h1>
        <p className="text-gray-600 mt-1">Your incoming opportunities from AIPropertyReport.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="New Leads Today"
          value={dashboardKPIs.newLeadsToday}
          icon={TrendingUp}
          colorScheme="blue"
          trend={{ value: '+12%', positive: true }}
        />
        <MetricCard
          title="Active Leads"
          value={dashboardKPIs.activeLeads}
          icon={Users}
          colorScheme="gray"
        />
        <MetricCard
          title="Leads Near SLA Breach"
          value={dashboardKPIs.leadsNearSLA}
          icon={AlertTriangle}
          colorScheme="amber"
        />
        <MetricCard
          title="Quotes Sent"
          value={dashboardKPIs.quotesSent}
          icon={FileText}
          colorScheme="blue"
        />
        <MetricCard
          title="Conversions Closed"
          value={dashboardKPIs.conversionsClosed}
          icon={CheckCircle}
          colorScheme="green"
        />
        <MetricCard
          title="Earnings This Month"
          value={`$${dashboardKPIs.earningsThisMonth.toLocaleString()}`}
          icon={DollarSign}
          colorScheme="green"
          trend={{ value: '+8%', positive: true }}
        />
      </div>

      {/* Lead Pipeline Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <p className="text-xs text-gray-600 mb-1">{stage.stage}</p>
                <p className="text-2xl font-semibold text-gray-900">{stage.count}</p>
                <p className="text-xs text-green-600 mt-1">{stage.conversionRate}% conversion</p>
              </div>
              {index < pipelineData.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-4 h-4 text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Leads Priority Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New Leads (Priority)</h2>
            <p className="text-sm text-gray-600 mt-0.5">Requires immediate attention</p>
          </div>
          <button
            onClick={() => navigate('/MortgageAdmin/leads')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            View All My Leads
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Received Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Est. Home Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Unlockable Equity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Intent Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  SLA Timer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLeads.slice(0, 3).map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/MortgageAdmin/lead-details')}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      {lead.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(lead.receivedTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.location.city}, {lead.location.state} {lead.location.zip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${(lead.estimatedHomeValue / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ${(lead.unlockableEquity / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        lead.intentScore === 'High'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : lead.intentScore === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {lead.intentScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SLAChip minutesRemaining={lead.slaMinutesRemaining} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/MortgageAdmin/lead-details')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Open
                    </button>
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