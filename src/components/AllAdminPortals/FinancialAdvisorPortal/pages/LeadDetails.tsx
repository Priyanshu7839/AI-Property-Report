import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, DollarSign, TrendingUp, Phone, Mail, Calendar } from 'lucide-react';

export function LeadDetails() {
  const navigate = useNavigate();
  
  const lead = {
    id: 'LD-2024-0847',
    received: '2024-01-24 08:15 AM',
    email: 'j.martinez@email.com',
    location: 'Austin, TX 78701',
    homeValue: 425000,
    unlockableEquity: 180000,
    borrowingCostMin: 6.5,
    borrowingCostMax: 7.2,
    intentScore: 92,
    stage: 'New',
    preferredContact: 'Email',
    homeAppreciation: '2.0% annually (intact)',
    monthlyInterestEstimate: '$975-$1,080'
  };

  const timeline = [
    { time: '2024-01-24 08:15 AM', event: 'Used precision calculator', details: 'Explored $180K unlock scenarios' },
    { time: '2024-01-24 08:22 AM', event: 'Changed allocations (custom)', details: '60% stocks, 30% bonds, 10% crypto' },
    { time: '2024-01-24 08:28 AM', event: 'Opened LIAM breakdown', details: 'Viewed 5-year projection' },
    { time: '2024-01-24 08:35 AM', event: 'Clicked "Connect to Advisor"', details: 'Submitted contact form' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/leads')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Leads
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Lead Details</h1>
        <p className="text-gray-600 mt-1">Investment deal room</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Homeowner Profile */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Homeowner Profile</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                {lead.stage}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 font-medium w-32">Lead ID:</span>
                <span className="text-gray-900">{lead.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 font-medium w-32">Email:</span>
                <span className="text-gray-900">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 font-medium w-32">Location:</span>
                <span className="text-gray-900">{lead.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 font-medium w-32">Contact Method:</span>
                <span className="text-gray-900">{lead.preferredContact}</span>
              </div>
            </div>
          </div>

          {/* Property Snapshot */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Snapshot</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Home Value</div>
                <div className="text-2xl font-semibold text-gray-900">${lead.homeValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Unlockable Equity</div>
                <div className="text-2xl font-semibold text-green-600">${lead.unlockableEquity.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Home Appreciation</span>
                </div>
                <div className="text-sm text-blue-700 mt-1">{lead.homeAppreciation}</div>
              </div>
            </div>
          </div>

          {/* Borrowing Snapshot */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Borrowing Snapshot</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">HELOC Rate Range</div>
                <div className="text-xl font-semibold text-gray-900">{lead.borrowingCostMin}% - {lead.borrowingCostMax}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Monthly Interest Estimate</div>
                <div className="text-xl font-semibold text-gray-900">{lead.monthlyInterestEstimate}</div>
              </div>
            </div>
          </div>

          {/* Homeowner Journey Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Homeowner Journey Timeline</h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.event}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.time}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Advisor Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Advisor Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/FinanceAdmin/risk-profile')}
                className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Run Risk Profile
              </button>
              <button
                onClick={() => navigate('/FinanceAdmin/strategy-builder')}
                className="w-full px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Build Strategy
              </button>
              <button
                onClick={() => navigate('/FinanceAdmin/action-plans')}
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Generate Action Plan PDF
              </button>
              <button
                onClick={() => navigate('/FinanceAdmin/consultations')}
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Update Status
              </button>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes & Follow-up</h2>
            <textarea
              placeholder="Add notes about this lead..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}