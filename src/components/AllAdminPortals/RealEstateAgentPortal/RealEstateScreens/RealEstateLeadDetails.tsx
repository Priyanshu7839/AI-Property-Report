import React from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MessageSquare, Calendar, FileText, TrendingUp } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { mockLeads } from '../RealEstatedata/RealEstatemockData';

export function RealEstateLeadDetails() {
  const { leadId } = useParams<{ leadId?: string }>();
  
  // Find the lead by ID if provided, otherwise use the first lead
  const lead = leadId 
    ? mockLeads.find(l => l.id === leadId) || mockLeads[0]
    : mockLeads[0];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Lead Details</h1>
        <p className="text-sm text-gray-600 mt-1">Deal room view for {lead.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Lead Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Homeowner & Property Snapshot */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Lead Information</h3>
              <StatusChip status={lead.stage} variant="info" />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Homeowner Profile</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.location.zip}, {lead.location.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Preferred Contact</p>
                    <p className="text-sm font-medium text-gray-900">{lead.preferredContact || 'Call'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Intent Type</p>
                    <p className="text-sm font-medium text-gray-900">{lead.intent}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Property Snapshot</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Estimated Value</p>
                    <p className="text-lg font-semibold text-gray-900">${(lead.estimatedValue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">Confidence: High (92%)</p>
                  </div>
                  {lead.equityUnlock && (
                    <div>
                      <p className="text-xs text-gray-600">Equity Unlock Estimate</p>
                      <p className="text-lg font-semibold text-green-600">${(lead.equityUnlock / 1000).toFixed(0)}K</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">AI Intent Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sell Probability</span>
                    <span className="text-sm font-semibold text-green-600">{lead.sellProbability || 'N/A'}</span>
                  </div>
                  {lead.buyProbability && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Buy Probability</span>
                      <span className="text-sm font-semibold text-blue-600">{lead.buyProbability}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Timeline</span>
                    <span className="text-sm font-medium text-gray-900">{lead.timeline || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Homeowner Journey Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Homeowner Journey Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Checked valuation</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Opened comps tab</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Clicked "Sell my house"</p>
                  <p className="text-xs text-gray-500">45 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Clicked "Talk to an agent"</p>
                  <p className="text-xs text-gray-500">30 minutes ago • Trigger for lead assignment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions Panel */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <Phone className="w-5 h-5" />
                Contact Homeowner
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-5 h-5" />
                Schedule Appointment
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5" />
                Generate Comps
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-5 h-5" />
                Prepare Listing Plan
              </button>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes & Follow-up</h3>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Add notes, tags, next follow-up date..."
            />
            <button className="w-full mt-3 px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Save Notes
            </button>
          </div>

          {/* Stage Update */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Stage</h3>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
            </select>
            <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Update Stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}