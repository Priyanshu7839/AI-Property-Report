import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { SLAChip } from '../SLAChip';
import { mockLeads } from '../Mortagedata/MortgagemockData';

export function MortgageMyLeads() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: 'all',
    sla: 'all',
    state: 'all',
    zip: '',
  });

  const clearFilters = () => {
    setFilters({
      status: 'all',
      sla: 'all',
      state: 'all',
      zip: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all' && v !== '');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">My Leads</h1>
        <p className="text-gray-600 mt-1">
          All mortgage opportunities assigned to your partner account.
        </p>
      </div>

      {/* Filters Row */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">Status</label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="quote-sent">Quote Sent</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">SLA Status</label>
            <div className="relative">
              <select
                value={filters.sla}
                onChange={(e) => setFilters({ ...filters, sla: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All SLA</option>
                <option value="safe">Safe</option>
                <option value="warning">Warning</option>
                <option value="breach">Breach</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">State</label>
            <div className="relative">
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All States</option>
                <option value="CA">California</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">ZIP Search</label>
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={filters.zip}
              onChange={(e) => setFilters({ ...filters, zip: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {hasActiveFilters && (
            <div className="flex items-end pb-0.5">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium inline-flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Homeowner Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Property Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Est. Home Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Unlockable Equity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Recommended Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Intent Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  SLA Countdown
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Current Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLeads.map((lead) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {lead.email}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.recommendedProduct}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        lead.intentScore === 'High'
                          ? 'bg-green-50 text-green-700'
                          : lead.intentScore === 'Medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {lead.intentScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SLAChip minutesRemaining={lead.slaMinutesRemaining} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusChip status={lead.currentStage} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/MortgageAdmin/lead-details')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {lead.currentStage === 'New' ? 'Contact' : lead.currentStage === 'Contacted' ? 'Build Quote' : 'Update Status'}
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
