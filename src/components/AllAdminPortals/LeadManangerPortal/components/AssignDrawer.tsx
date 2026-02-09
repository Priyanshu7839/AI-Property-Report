import { SideDrawer } from './SideDrawer';
import { StatusChip } from './StatusChip';
import { IntentChip } from './IntentChip';
import { mockPartners, type Lead } from '../data/mockData';
import { MapPin, DollarSign, TrendingUp, Star, Clock, Users } from 'lucide-react';
import { useState } from 'react';

interface AssignDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignDrawer({ lead, isOpen, onClose }: AssignDrawerProps) {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [leadPrice, setLeadPrice] = useState('250');
  const [commissionType, setCommissionType] = useState('fixed');
  const [notes, setNotes] = useState('');

  if (!lead) return null;

  // Filter partners by coverage area and type
  const matchingPartners = mockPartners.filter(p => {
    const coversArea = p.coverageAreas.some(area => area.includes(lead.state));
    
    // Match partner role to lead interest area
    const roleMatch = 
      (lead.interestArea === 'Agent' && p.role.toLowerCase().includes('real estate')) ||
      p.role.toLowerCase().includes(lead.interestArea.toLowerCase());
    
    return coversArea && roleMatch;
  });

  const handleAssign = () => {
    // Handle assignment logic
    console.log('Assigning lead', lead.id, 'to partner', selectedPartner);
    onClose();
  };

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Lead ${lead.id}`}
      width="xl"
    >
      <div className="p-6 space-y-6">
        {/* Section A: Lead Snapshot */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Lead Snapshot</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-gray-900">{lead.email}</p>
              </div>
              <IntentChip score={lead.intentScore} />
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-600 mb-1">Property Address</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-base font-medium text-gray-900">ZIP {lead.zip}</p>
                  <p className="text-sm text-gray-600">{lead.county} County, {lead.state}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Property Valuation</p>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-lg font-semibold text-gray-900">
                    ${lead.propertyValue.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">95% confidence</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Unlockable Equity</p>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">
                    ${lead.unlockableEquity.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Estimated</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Interest Type</p>
              <StatusChip status="blue" label={lead.interestArea} />
            </div>

            <div className="pt-3 border-t border-gray-200 bg-blue-50 -m-4 p-4 rounded-b-lg">
              <p className="text-xs font-medium text-blue-900 mb-1">Intent Score Breakdown</p>
              <p className="text-xs text-blue-700">
                Based on multiple CTA clicks, 4+ min time on page, and viewed equity details
              </p>
            </div>
          </div>
        </div>

        {/* Section B: Partner Matching */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            Partner Matching ({matchingPartners.length} available)
          </h3>
          <div className="space-y-3">
            {matchingPartners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => setSelectedPartner(partner.id)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${selectedPartner === partner.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{partner.coverageAreas[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{partner.activeLeads}/{partner.monthlyCap} capacity</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span>{partner.avgResponseTime} avg</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-medium text-gray-900">
                      ${partner.revenueGenerated.toLocaleString()} revenue
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {matchingPartners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No matching partners found for this lead</p>
                <p className="text-xs mt-1">Try expanding coverage areas or partner types</p>
              </div>
            )}
          </div>
        </div>

        {/* Section C: Commercial Terms */}
        {selectedPartner && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Commercial Terms</h3>
            <div className="space-y-4 bg-gray-50 rounded-lg p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lead Price ($)
                </label>
                <input
                  type="number"
                  value={leadPrice}
                  onChange={(e) => setLeadPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Type
                </label>
                <select
                  value={commissionType}
                  onChange={(e) => setCommissionType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fixed">Fixed Fee</option>
                  <option value="percentage">Percentage</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internal Notes (Ops Only)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add internal notes about this assignment..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleAssign}
            disabled={!selectedPartner}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Lead
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Save Draft
          </button>
        </div>
      </div>
    </SideDrawer>
  );
}