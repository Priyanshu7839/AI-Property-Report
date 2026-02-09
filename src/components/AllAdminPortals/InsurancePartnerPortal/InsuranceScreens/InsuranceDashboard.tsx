import { Users, FileCheck, Send, CheckCircle2, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { InsuranceMetricCard } from '../Insuranceportal/InsuranceMetricCard';
import { InsuranceStatusChip } from '../Insuranceportal/InsuranceStatusChip';
import { InsuranceSLAChip } from '../Insuranceportal/InsuranceSLAChip';
import { Button } from '../../../ui/button';
import { dashboardMetrics, pipelineStages, mockLeads } from '../Insurancedata/InsurancemockData';

interface DashboardProps {
  onNavigate: (screen: string, leadId?: string) => void;
}

export function InsuranceDashboard({ onNavigate }: DashboardProps) {
  const priorityLeads = mockLeads.filter(l => l.stage === 'New' || l.stage === 'Contacted').slice(0, 5);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Insurance Partner Dashboard</h1>
        <p className="text-gray-600 mt-1">Your incoming homeowner opportunities from AIPropertyReport.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <InsuranceMetricCard
          title="New Leads Today"
          value={dashboardMetrics.newLeadsToday}
          icon={Users}
          trend={{ value: '+2 from yesterday', isPositive: true }}
        />
        <InsuranceMetricCard
          title="Active Leads"
          value={dashboardMetrics.activeLeads}
          icon={FileCheck}
        />
        <InsuranceMetricCard
          title="Quotes Sent"
          value={dashboardMetrics.quotesSent}
          icon={Send}
        />
        <InsuranceMetricCard
          title="Policies Bound"
          value={dashboardMetrics.policiesBound}
          icon={CheckCircle2}
          trend={{ value: '+3 this week', isPositive: true }}
        />
        <InsuranceMetricCard
          title="SLA Breaches"
          value={dashboardMetrics.slaBreaches}
          icon={AlertTriangle}
        />
        <InsuranceMetricCard
          title="Earnings This Month"
          value={`$${dashboardMetrics.earningsThisMonth.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: '+12% vs last month', isPositive: true }}
        />
      </div>

      {/* Insurance Lead Pipeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Insurance Lead Pipeline</h2>
            <p className="text-sm text-gray-600 mt-0.5">Track your leads through the conversion funnel</p>
          </div>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage, idx) => (
            <div key={stage.name} className="relative">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="text-xs text-gray-500 mb-1">{stage.name}</div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">{stage.count}</div>
                <div className="flex items-center gap-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${stage.conversion}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{stage.conversion}%</span>
                </div>
              </div>
              {idx < pipelineStages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Priority Leads</h2>
              <p className="text-sm text-gray-600 mt-0.5">Leads requiring immediate attention</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('leads')}
            >
              View All Leads
            </Button>
          </div>
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
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Home Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Potential Savings
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
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onNavigate('lead-details', lead.id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {lead.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(lead.receivedTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.location.zip}, {lead.location.county}, {lead.location.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${lead.homeValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.currentPremium ? `$${lead.currentPremium.toLocaleString()}/yr` : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.potentialSavings && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        ${lead.potentialSavings}/yr
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <InsuranceSLAChip deadline={lead.slaDeadline} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      size="sm"
                      onClick={() => onNavigate('lead-details', lead.id)}
                    >
                      Open
                    </Button>
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
