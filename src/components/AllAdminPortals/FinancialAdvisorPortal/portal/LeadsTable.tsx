import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusChip } from './StatusChip';
import { SLAChip } from './SLAChip';
import type { Lead } from '../data/advisorMockData';

interface LeadsTableProps {
  leads: Lead[];
  showAction?: boolean;
}

export function LeadsTable({ leads, showAction = true }: LeadsTableProps) {
  const navigate = useNavigate();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Lead ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Received
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Home Value
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Equity Unlock
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Borrowing Cost
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Intent
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Stage
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              SLA
            </th>
            {showAction && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/FinanceAdmin/lead-details?id=${lead.id}`)}
            >
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {lead.id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {lead.received}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {lead.location}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {formatCurrency(lead.homeValue)}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {formatCurrency(lead.unlockableEquity)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {lead.borrowingCostMin}% - {lead.borrowingCostMax}%
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.intentScore}
                  </div>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${lead.intentScore}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <StatusChip status={lead.stage} />
              </td>
              <td className="px-4 py-3">
                <SLAChip hours={lead.slaHours} />
              </td>
              {showAction && (
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (lead.stage === 'New') {
                        navigate('/FinanceAdmin/strategy-builder');
                      } else {
                        navigate(`/FinanceAdmin/lead-details?id=${lead.id}`);
                      }
                    }}
                    className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    {lead.stage === 'New' ? 'Build Strategy' : 'Open'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}