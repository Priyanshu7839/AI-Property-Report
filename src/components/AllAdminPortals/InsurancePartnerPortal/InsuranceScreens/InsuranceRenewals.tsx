import { RefreshCw, Calendar, Phone, Send, Lightbulb } from 'lucide-react';
import { InsuranceStatusChip } from '../Insuranceportal/InsuranceStatusChip';
import { Button } from '../../../ui/button';

interface RenewalsProps {
  onNavigate: (screen: string) => void;
}

export function InsuranceRenewals({ onNavigate }: RenewalsProps) {
  const renewalLeads = [
    {
      id: 'LD-2397',
      homeowner: 'a.williams@example.com',
      policyStartDate: '2025-02-01',
      renewalDate: '2026-02-01',
      currentPremium: 1950,
      proposedPremium: 1890,
      status: 'Renewal Sent' as const
    },
    {
      id: 'LD-2362',
      homeowner: 'r.chen@example.com',
      policyStartDate: '2025-01-15',
      renewalDate: '2026-01-15',
      currentPremium: 2240,
      proposedPremium: 2180,
      status: 'Renewal Sent' as const
    },
    {
      id: 'LD-2301',
      homeowner: 't.miller@example.com',
      policyStartDate: '2024-12-20',
      renewalDate: '2025-12-20',
      currentPremium: 3150,
      proposedPremium: 3050,
      status: 'Accepted' as const
    }
  ];

  const retentionNotes = [
    { text: 'Homeowner is price-sensitive', color: 'amber' },
    { text: 'Homeowner requested faster turnaround', color: 'blue' },
    { text: 'Recommended follow-up within 48h', color: 'red' }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Renewals & Switching</h1>
        <p className="text-gray-600 mt-1">Manage policy renewals and retention opportunities.</p>
      </div>

      {/* AI Retention Notes */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Lightbulb className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Retention Insights</h2>
            <p className="text-sm text-gray-600 mt-0.5">Data-driven recommendations to improve retention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {retentionNotes.map((note, idx) => {
            const colorClasses = {
              amber: 'bg-amber-50 border-amber-200 text-amber-900',
              blue: 'bg-blue-50 border-blue-200 text-blue-900',
              red: 'bg-red-50 border-red-200 text-red-900'
            };
            
            return (
              <div
                key={idx}
                className={`p-3 border rounded-lg ${colorClasses[note.color as keyof typeof colorClasses]}`}
              >
                <p className="text-sm font-medium">{note.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Renewal Tracker Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Renewal Tracker</h2>
          <p className="text-sm text-gray-600 mt-0.5">Track policy renewals and retention status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Homeowner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renewal Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proposed Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renewalLeads.map((lead) => {
                const savings = lead.currentPremium - lead.proposedPremium;
                
                return (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('lead-details', lead.id)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {lead.id}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.homeowner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(lead.policyStartDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(lead.renewalDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${lead.currentPremium.toLocaleString()}/yr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-blue-700">
                          ${lead.proposedPremium.toLocaleString()}/yr
                        </span>
                        {savings > 0 && (
                          <span className="text-xs text-green-600">
                            Save ${savings}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InsuranceStatusChip 
                        status={lead.status === 'Renewal Sent' ? 'Pending' : lead.status === 'Accepted' ? 'Active' : 'Lost'} 
                        size="sm" 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renewal Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Send Renewal Offer</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Automatically send renewal offers to all upcoming renewals
          </p>
          <Button variant="outline" className="w-full" size="sm">
            Send All Offers
          </Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Schedule Calls</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Set up follow-up calls with homeowners
          </p>
          <Button variant="outline" className="w-full" size="sm">
            Schedule Calls
          </Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Update Status</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Bulk update renewal statuses
          </p>
          <Button variant="outline" className="w-full" size="sm">
            Update Statuses
          </Button>
        </div>
      </div>
    </div>
  );
}
