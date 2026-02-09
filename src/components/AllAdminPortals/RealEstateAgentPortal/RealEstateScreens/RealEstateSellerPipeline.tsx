import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { KanbanBoard } from '../KanbanBoard';

const stages = [
  'New',
  'Contacted',
  'Listing Consultation Scheduled',
  'Pricing & Comps Shared',
  'Listing Agreement Signed',
  'Active Listing',
  'Under Contract',
  'Closed Won',
  'Closed Lost',
];

const pipelineLeads = [
  { id: 'L-10234', email: 'john.d***@gmail.com', location: '33131', value: '$850K', urgency: '0-30d', stage: 'New', lastContact: '2h ago' },
  { id: 'L-10231', email: 'anna.l***@hotmail.com', location: '33134', value: '$950K', urgency: '0-30d', stage: 'Listing Consultation Scheduled', lastContact: '1d ago' },
  { id: 'L-10228', email: 'chris.w***@gmail.com', location: '33139', value: '$1.2M', urgency: '30-90d', stage: 'Contacted', lastContact: '3h ago' },
  { id: 'L-10225', email: 'emily.r***@yahoo.com', location: '33130', value: '$780K', urgency: '30-90d', stage: 'Pricing & Comps Shared', lastContact: '2d ago' },
  { id: 'L-10220', email: 'david.m***@gmail.com', location: '33137', value: '$920K', urgency: '0-30d', stage: 'Active Listing', lastContact: '5h ago' },
  { id: 'L-10215', email: 'lisa.p***@hotmail.com', location: '33131', value: '$1.1M', urgency: '0-30d', stage: 'Under Contract', lastContact: '1d ago' },
];

export function RealEstateSellerPipeline() {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const navigate = useNavigate();

  const getLeadsByStage = (stage: string) => {
    return pipelineLeads.filter(lead => lead.stage === stage);
  };

  const kanbanColumns = stages.map(stage => ({
    stage,
    cards: getLeadsByStage(stage),
  }));

  const handleCardClick = (card: any) => {
    navigate(`/lead-details/${card.id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Seller Pipeline</h1>
          <p className="text-sm text-gray-600 mt-1">Track your seller leads through the sales funnel</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              viewMode === 'kanban' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-medium">Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              viewMode === 'table' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">Table</span>
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <KanbanBoard columns={kanbanColumns} onCardClick={handleCardClick} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Home Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pipelineLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{lead.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip 
                        status={lead.urgency} 
                        variant={lead.urgency === '0-30d' ? 'danger' : 'warning'} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip status={lead.stage} variant="info" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}