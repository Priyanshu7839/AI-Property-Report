import { StatusChip } from '../components/StatusChip';
import { IntentChip } from '../components/IntentChip';
import { mockLeads } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export function AssignedLeadsScreen() {
  const assignedLeads = mockLeads.filter(l => l.status === 'assigned');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Assigned Leads</h1>
        <p className="text-sm text-gray-600 mt-1">Leads currently assigned to partners</p>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Property Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Assigned Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lead.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.zip} • {lead.county}, {lead.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${lead.propertyValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusChip status="blue" label={lead.interestArea} small />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <IntentChip score={lead.intentScore} small />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.assignedPartner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <StatusChip status="green" label="Assigned" small />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {assignedLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assigned leads found</p>
          </div>
        )}
      </div>
    </div>
  );
}
