import React from 'react';
import { StatusChip } from '../StatusChip';

const buyerLeads = [
  { id: 'L-10232', email: 'mike.t***@gmail.com', location: '33130', budget: '$600K-$700K', stage: 'Property Tours', urgency: '90d+' },
  { id: 'L-10230', email: 'robert.k***@gmail.com', location: '33137', budget: '$650K-$800K', stage: 'Property Tours', urgency: '30-90d' },
];

export function RealEstateBuyerPipeline() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Buyer Pipeline</h1>
        <p className="text-sm text-gray-600 mt-1">Track your buyer leads through the search and purchase process</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Lead ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Preferred Area</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Budget Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Urgency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buyerLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lead.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={lead.stage} variant="info" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={lead.urgency} variant="warning" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
