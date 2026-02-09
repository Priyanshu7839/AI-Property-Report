import { useState } from 'react';
import { StatusChip } from '../components/StatusChip';
import { IntentChip } from '../components/IntentChip';
import { mockLeads, type Lead } from '../data/mockData';
import { Filter, X, Clock } from 'lucide-react';
import { AssignDrawer } from '../components/AssignDrawer';

export function AssignmentQueueScreen() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [assignDrawerLead, setAssignDrawerLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState({
    leadType: 'all',
    state: 'all',
    intentMin: 0,
    slaRisk: 'all',
  });

  const unassignedLeads = mockLeads.filter(l => l.status === 'unassigned');

  const toggleLead = (id: string) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedLeads(selectedLeads.length === unassignedLeads.length ? [] : unassignedLeads.map(l => l.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Assignment Queue</h1>
        <p className="text-sm text-gray-600 mt-1">Real-time inbound leads awaiting assignment</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          
          <select 
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.leadType}
            onChange={(e) => setFilters(prev => ({ ...prev, leadType: e.target.value }))}
          >
            <option value="all">All Lead Types</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Insurance">Insurance</option>
            <option value="Tax">Tax</option>
            <option value="Agent">Real Estate</option>
          </select>

          <select 
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.state}
            onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
          >
            <option value="all">All States</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="NY">New York</option>
            <option value="FL">Florida</option>
            <option value="WA">Washington</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Intent Score:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.intentMin}
              onChange={(e) => setFilters(prev => ({ ...prev, intentMin: Number(e.target.value) }))}
              className="w-32"
            />
            <span className="text-sm font-medium text-gray-900 w-8">{filters.intentMin}</span>
          </div>

          <select 
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.slaRisk}
            onChange={(e) => setFilters(prev => ({ ...prev, slaRisk: e.target.value }))}
          >
            <option value="all">All SLA Status</option>
            <option value="safe">Safe</option>
            <option value="warning">Warning</option>
            <option value="breach">Breach</option>
          </select>

          <button 
            onClick={() => setFilters({ leadType: 'all', state: 'all', intentMin: 0, slaRisk: 'all' })}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedLeads.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">
            {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Assign to Partner
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Mark Invalid
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Export CSV
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Add Note
            </button>
          </div>
        </div>
      )}

      {/* Lead Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === unassignedLeads.length && unassignedLeads.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Property Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Equity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SLA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unassignedLeads.map((lead) => {
                const slaStatus = lead.slaMinutes > 60 ? 'red' : lead.slaMinutes > 30 ? 'amber' : 'green';
                
                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLead(lead.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {lead.id}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{lead.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.zip}</div>
                      <div className="text-xs text-gray-500">{lead.county}, {lead.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${lead.propertyValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      ${lead.unlockableEquity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip status="blue" label={lead.interestArea} small />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <IntentChip score={lead.intentScore} small />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-4 h-4 ${slaStatus === 'red' ? 'text-red-600' : slaStatus === 'amber' ? 'text-amber-600' : 'text-green-600'}`} />
                        <span className={`text-sm font-medium ${slaStatus === 'red' ? 'text-red-600' : slaStatus === 'amber' ? 'text-amber-600' : 'text-green-600'}`}>
                          {lead.slaMinutes}m
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => setAssignDrawerLead(lead)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Drawer */}
      <AssignDrawer
        lead={assignDrawerLead}
        isOpen={assignDrawerLead !== null}
        onClose={() => setAssignDrawerLead(null)}
      />
    </div>
  );
}
