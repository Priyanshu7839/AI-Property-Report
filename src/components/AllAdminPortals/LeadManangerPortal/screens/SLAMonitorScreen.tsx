import { MetricCard } from '../components/MetricCard';
import { StatusChip } from '../components/StatusChip';
import { mockLeads } from '../data/mockData';
import { Clock, AlertTriangle, CheckCircle2, Settings } from 'lucide-react';

export function SLAMonitorScreen() {
  const unassignedLeads = mockLeads.filter(l => l.status === 'unassigned');
  const atRisk = unassignedLeads.filter(l => l.slaMinutes > 30 && l.slaMinutes <= 60).length;
  const breached = unassignedLeads.filter(l => l.slaMinutes > 60).length;
  const avgQueueTime = Math.round(unassignedLeads.reduce((sum, l) => sum + l.slaMinutes, 0) / unassignedLeads.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">SLA Monitor</h1>
        <p className="text-sm text-gray-600 mt-1">Track SLA breaches and response times</p>
      </div>

      {/* SLA KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          label="Leads in Queue"
          value={unassignedLeads.length}
          subtext="awaiting assignment"
        />
        <MetricCard
          label="At Risk in 15 min"
          value={atRisk}
          trend={{ value: '-12%', direction: 'down' }}
          subtext="warning threshold"
        />
        <MetricCard
          label="Breached SLA"
          value={breached}
          trend={{ value: '-25%', direction: 'down' }}
          subtext="over 60 minutes"
        />
        <MetricCard
          label="Avg Queue Time"
          value={`${avgQueueTime} min`}
          trend={{ value: '-8%', direction: 'down' }}
          subtext="today's average"
        />
        <MetricCard
          label="Fastest Partner"
          value="3.8 min"
          subtext="Empire Realty Advisors"
        />
        <MetricCard
          label="Slowest Partner"
          value="8.3 min"
          subtext="Lone Star Tax Solutions"
        />
      </div>

      {/* Auto-escalation Rules */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Auto-escalation Rules</h2>
          </div>
          <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Edit Rules
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Escalate after 30 minutes</p>
                <p className="text-xs text-gray-600">Send alert to ops manager</p>
              </div>
            </div>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Re-route if partner capacity exceeded</p>
                <p className="text-xs text-gray-600">Auto-assign to next available partner</p>
              </div>
            </div>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Assign fallback partner after 60 minutes</p>
                <p className="text-xs text-gray-600">Auto-assign to general pool if no match</p>
              </div>
            </div>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
          </div>
        </div>
      </div>

      {/* SLA Timeline Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SLA Timeline</h2>
          <p className="text-sm text-gray-600 mt-0.5">Real-time queue monitoring</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Time in Queue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SLA Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Territory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Suggested Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unassignedLeads.sort((a, b) => b.slaMinutes - a.slaMinutes).map((lead) => {
                const getSLAStatus = (minutes: number) => {
                  if (minutes > 60) return { status: 'red' as const, label: 'Breached', icon: AlertTriangle };
                  if (minutes > 30) return { status: 'amber' as const, label: 'At Risk', icon: Clock };
                  return { status: 'green' as const, label: 'Safe', icon: CheckCircle2 };
                };
                
                const sla = getSLAStatus(lead.slaMinutes);
                const Icon = sla.icon;
                
                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lead.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${sla.status === 'red' ? 'text-red-600' : sla.status === 'amber' ? 'text-amber-600' : 'text-green-600'}`}>
                        {lead.slaMinutes} minutes
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${sla.status === 'red' ? 'text-red-600' : sla.status === 'amber' ? 'text-amber-600' : 'text-green-600'}`} />
                        <StatusChip status={sla.status} label={sla.label} small />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip status="blue" label={lead.interestArea} small />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {lead.county}, {lead.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.interestArea === 'Mortgage' ? 'Cascade Mortgage Group' : 
                       lead.interestArea === 'Insurance' ? 'Bay Area Insurance Pro' :
                       lead.interestArea === 'Agent' ? 'Empire Realty Advisors' :
                       'Lone Star Tax Solutions'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Assign Now
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
