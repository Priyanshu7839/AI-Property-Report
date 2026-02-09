import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../portal/MetricCard';
import { StatusChip } from '../portal/StatusChip';
import { SLAChip } from '../portal/SLAChip';
import { mockLeads } from '../data/advisorMockData';
import { ArrowRight } from 'lucide-react';

export function FinanceDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Financial Advisor Dashboard</h1>
        <p className="text-gray-600 mt-1">Equity deployment opportunities from AIPropertyReport</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="New Leads Today" value="3" trend="+2" trendUp />
        <MetricCard label="Active Leads" value="28" />
        <MetricCard label="Strategies Built" value="15" />
        <MetricCard label="Consultations Scheduled" value="7" />
        <MetricCard label="Closed Won" value="42" trend="+5" trendUp />
        <MetricCard label="Earnings This Month" value="$18,500" trend="+12%" trendUp />
      </div>

      {/* Pipeline Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Advisor Pipeline</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { label: 'New', count: 5 },
            { label: 'Contacted', count: 8 },
            { label: 'Risk Profile Completed', count: 6 },
            { label: 'Strategy Built', count: 4 },
            { label: 'Consult Scheduled', count: 3 },
            { label: 'Action Plan Delivered', count: 2 },
            { label: 'Closed Won', count: 42 },
          ].map((stage, index) => (
            <div key={stage.label} className="flex items-center gap-2">
              <div className="flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <div className="text-xs text-gray-600">{stage.label}</div>
                <div className="text-xl font-semibold text-gray-900 mt-1">{stage.count}</div>
              </div>
              {index < 6 && <ArrowRight className="flex-shrink-0 w-5 h-5 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Priority Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  State / ZIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Est Home Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Equity Unlock Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Borrowing Cost Range
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
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/MortgageAdmin/lead-details')}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {lead.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.received}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.state} {lead.zip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lead.homeValue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lead.unlockableEquity.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.borrowingCostMin}% - {lead.borrowingCostMax}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">{lead.intentScore}</div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{ width: `${lead.intentScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SLAChip hours={lead.slaHours} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/FinanceAdmin/strategy-builder')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Build Strategy
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