import { MetricCard } from '../components/MetricCard';
import { StatusChip } from '../components/StatusChip';
import { IntentChip } from '../components/IntentChip';
import { mockLeads, funnelData } from '../data/mockData';
import { ArrowRight, Clock } from 'lucide-react';

interface OverviewScreenProps {
  onNavigate: (screen: string) => void;
}

export function OverviewScreen({ onNavigate }: OverviewScreenProps) {
  const unassignedLeads = mockLeads.filter(l => l.status === 'unassigned');
  const assignedLeads = mockLeads.filter(l => l.status === 'assigned');
  const breaches = mockLeads.filter(l => l.slaMinutes > 60).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Overview Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Executive summary of today's performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          label="Total Leads Today"
          value="47"
          trend={{ value: '+12%', direction: 'up' }}
          subtext="vs yesterday"
        />
        <MetricCard
          label="Unassigned Leads"
          value={unassignedLeads.length}
          trend={{ value: '-8%', direction: 'down' }}
          subtext="in queue now"
        />
        <MetricCard
          label="Assigned Leads"
          value={assignedLeads.length}
          trend={{ value: '+5%', direction: 'up' }}
          subtext="active"
        />
        <MetricCard
          label="SLA Breaches"
          value={breaches}
          trend={{ value: '-15%', direction: 'down' }}
          subtext="improved"
        />
        <MetricCard
          label="Avg Assignment Time"
          value="18.4 min"
          trend={{ value: '-22%', direction: 'down' }}
          subtext="faster today"
        />
        <MetricCard
          label="Revenue Today"
          value="$12,450"
          trend={{ value: '+18%', direction: 'up' }}
          subtext="vs avg"
        />
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ops Funnel Visualization</h2>
        <div className="space-y-3">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-40 text-sm font-medium text-gray-700">{stage.stage}</div>
              <div className="flex-1">
                <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-between px-4"
                    style={{ width: `${stage.conversion}%` }}
                  >
                    <span className="text-white font-semibold">{stage.count}</span>
                    <span className="text-white text-sm">{stage.conversion}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unassigned Leads Preview */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Unassigned Leads (Live)</h2>
            <p className="text-sm text-gray-600 mt-0.5">Leads awaiting assignment</p>
          </div>
          <button
            onClick={() => onNavigate('queue')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Full Queue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Property Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Interest Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SLA Timer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unassignedLeads.map((lead) => {
                const slaStatus = lead.slaMinutes > 60 ? 'red' : lead.slaMinutes > 30 ? 'amber' : 'green';
                
                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lead.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.zip} • {lead.county}, {lead.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lead.propertyValue.toLocaleString()}</td>
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
                          {lead.slaMinutes} min
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
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
    </div>
  );
}
