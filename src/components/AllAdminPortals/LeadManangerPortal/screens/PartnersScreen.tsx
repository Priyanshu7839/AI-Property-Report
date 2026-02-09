import { useState } from 'react';
import { SideDrawer } from '../components/SideDrawer';
import { StatusChip } from '../components/StatusChip';
import { mockPartners, type Partner } from '../data/mockData';
import { MapPin, Star, Clock, DollarSign, Pause, Edit } from 'lucide-react';

export function PartnersScreen() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Partners Directory</h1>
          <p className="text-sm text-gray-600 mt-1">Manage partner vendors and performance</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Add Partner
        </button>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Partner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Coverage Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Active Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Monthly Cap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Avg Response</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPartners.map((partner) => {
                const capacityPercent = (partner.activeLeads / partner.monthlyCap) * 100;
                
                return (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedPartner(partner)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {partner.name}
                      </button>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600">{partner.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip status="blue" label={partner.role} small />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-0.5">
                          {partner.coverageAreas.map((area, i) => (
                            <div key={i} className="text-sm text-gray-600">{area}</div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{partner.activeLeads}</div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${capacityPercent > 80 ? 'bg-red-500' : capacityPercent > 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {partner.monthlyCap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">{partner.avgResponseTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          ${partner.revenueGenerated.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip
                        status={partner.status === 'active' ? 'green' : 'gray'}
                        label={partner.status === 'active' ? 'Active' : 'Paused'}
                        small
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedPartner(partner)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Detail Drawer */}
      <SideDrawer
        isOpen={selectedPartner !== null}
        onClose={() => setSelectedPartner(null)}
        title={selectedPartner?.name || ''}
        width="lg"
      >
        {selectedPartner && (
          <div className="p-6 space-y-6">
            {/* Performance Metrics */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Active Leads</p>
                  <p className="text-2xl font-semibold text-gray-900">{selectedPartner.activeLeads}</p>
                  <p className="text-xs text-gray-500 mt-1">of {selectedPartner.monthlyCap} monthly cap</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                  <p className="text-2xl font-semibold text-gray-900">{selectedPartner.avgResponseTime}</p>
                  <p className="text-xs text-gray-500 mt-1">faster than average</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold text-gray-900">{selectedPartner.rating}</p>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">based on 127 reviews</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Revenue Generated</p>
                  <p className="text-2xl font-semibold text-gray-900">${selectedPartner.revenueGenerated.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">this month</p>
                </div>
              </div>
            </div>

            {/* Coverage Areas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Coverage Areas</h3>
              <div className="space-y-2">
                {selectedPartner.coverageAreas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-900">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout Terms */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Payout Terms</h3>
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lead Price</span>
                  <span className="font-medium text-gray-900">$250 per lead</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commission Type</span>
                  <span className="font-medium text-gray-900">Fixed Fee</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Terms</span>
                  <span className="font-medium text-gray-900">Net 30</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <Pause className="w-4 h-4" />
                Pause Partner
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Change Territory
              </button>
            </div>
          </div>
        )}
      </SideDrawer>
    </div>
  );
}
