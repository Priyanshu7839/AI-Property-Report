import { Lead } from '../Insurancedata/InsurancemockData';
import { InsuranceStatusChip } from './InsuranceStatusChip';
import { InsuranceSLAChip } from './InsuranceSLAChip';
import { ArrowUpRight } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  onLeadClick: (leadId: string) => void;
  showActionButton?: boolean;
}

export function InsuranceLeadsTable({ leads, onLeadClick, showActionButton = true }: LeadsTableProps) {
  const formatCurrency = (amount?: number) => {
    if (!amount) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Lead ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Received
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Location
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Home Value
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Current Premium
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Potential Savings
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                Stage
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                SLA
              </th>
              {showActionButton && (
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onLeadClick(lead.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-blue-600">{lead.id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(lead.receivedTime)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {lead.location.zip}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lead.location.county}, {lead.location.state}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm text-gray-900">
                  {formatCurrency(lead.homeValue)}
                </td>
                <td className="px-6 py-4 text-right text-sm text-gray-900">
                  {formatCurrency(lead.currentPremium)}
                </td>
                <td className="px-6 py-4">
                  {lead.potentialSavings ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      {formatCurrency(lead.potentialSavings)}/yr
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <InsuranceStatusChip status={lead.stage} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <InsuranceSLAChip deadline={lead.slaDeadline} size="sm" />
                </td>
                {showActionButton && (
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLeadClick(lead.id);
                      }}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Open
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
