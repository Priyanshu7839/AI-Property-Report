import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Calendar, Maximize, ArrowRight } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { SLAChip } from '../SLAChip';
import { mockLeads } from '../Mortagedata/MortgagemockData';

export function MortgageLeadDetails() {
  const navigate = useNavigate();
  const lead = mockLeads[0]; // Using first lead as example

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Lead Details</h1>
          <p className="text-gray-600 mt-1">High-trust financial deal room</p>
        </div>
        <button
          onClick={() => navigate('/MortgageAdmin/quote-builder')}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          Build Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Lead Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Header Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{lead.id}</h2>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {lead.location.city}, {lead.location.state} {lead.location.zip}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusChip status={lead.currentStage} />
                <SLAChip minutesRemaining={lead.slaMinutesRemaining} />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900">Recommended Product</p>
              <p className="text-blue-700 mt-1">{lead.recommendedProduct} (preferred) + Cash-out refinance alternative</p>
            </div>
          </div>

          {/* Key Lead Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-1">Estimated Home Value</p>
              <p className="text-3xl font-semibold text-gray-900">
                ${(lead.estimatedHomeValue / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-1">Estimated Mortgage Balance</p>
              <p className="text-3xl font-semibold text-gray-900">
                ${lead.mortgageBalance ? (lead.mortgageBalance / 1000).toFixed(0) : '—'}k
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-1">Unlockable Equity Range</p>
              <p className="text-3xl font-semibold text-green-600">
                ${(lead.unlockableEquity / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-1">AI Opportunity Score</p>
              <p className="text-3xl font-semibold text-blue-600">{lead.intentScore}</p>
            </div>
          </div>

          {/* Homeowner Activity Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Homeowner Activity Timeline</h3>
            <div className="space-y-4">
              {lead.activityTimeline?.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(activity.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Snapshot */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Snapshot</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Year Built</p>
                  <p className="font-medium text-gray-900">{lead.yearBuilt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Maximize className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Square Feet</p>
                  <p className="font-medium text-gray-900">{lead.sqft?.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Home className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Property Type</p>
                  <p className="font-medium text-gray-900">Single Family</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              *Estimate based on comps + AI valuation model. Confidence range: ±5%
            </p>
          </div>
        </div>

        {/* Right Column - Actions & Quick Info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Contact Homeowner
              </button>
              <button
                onClick={() => navigate('/MortgageAdmin/quote-builder')}
                className="w-full px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Build Quote
              </button>
              <button
                onClick={() => navigate('/MortgageAdmin/status-updates')}
                className="w-full px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Email (Masked)</p>
                <p className="text-sm font-mono text-gray-900">{lead.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Location</p>
                <p className="text-sm text-gray-900">
                  {lead.location.city}, {lead.location.state}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">
                  Full contact details unlocked upon first contact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
