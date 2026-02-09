import React, { useState } from 'react';
import { ChevronDown, Save, AlertCircle } from 'lucide-react';

export function MortgageStatusUpdates() {
  const [status, setStatus] = useState({
    stage: 'contacted',
    nextAction: 'email',
    notes: '',
    followUpDate: '',
    outcome: '',
    lostReason: '',
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Status Updates</h1>
        <p className="text-gray-600 mt-1">Update lead progress and manage follow-ups</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Status Update Panel</h2>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Lead Stage
            </label>
            <div className="relative">
              <select
                value={status.stage}
                onChange={(e) => setStatus({ ...status, stage: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="quote-sent">Quote Sent</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Next Action
            </label>
            <div className="relative">
              <select
                value={status.nextAction}
                onChange={(e) => setStatus({ ...status, nextAction: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="meeting">Schedule Meeting</option>
                <option value="waiting-docs">Waiting for Documents</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Notes
            </label>
            <textarea
              value={status.notes}
              onChange={(e) => setStatus({ ...status, notes: e.target.value })}
              rows={4}
              placeholder="Add notes about this interaction..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Next Follow-Up Date
            </label>
            <input
              type="datetime-local"
              value={status.followUpDate}
              onChange={(e) => setStatus({ ...status, followUpDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {(status.stage === 'closed-won' || status.stage === 'closed-lost') && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Outcome Tracking</h2>

          {status.stage === 'closed-lost' && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Loss Reason
              </label>
              <div className="relative">
                <select
                  value={status.lostReason}
                  onChange={(e) => setStatus({ ...status, lostReason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select reason...</option>
                  <option value="rate-too-high">Rate Too High</option>
                  <option value="competitor">Went with Competitor</option>
                  <option value="not-qualified">Not Qualified</option>
                  <option value="no-response">No Response</option>
                  <option value="changed-mind">Changed Mind</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {status.stage === 'closed-won' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900">
                Great job! This lead will be added to your payouts automatically.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Update
        </button>
        <button className="px-6 py-3 border border-amber-300 bg-amber-50 text-amber-700 font-medium rounded-lg hover:bg-amber-100 transition-colors inline-flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Mark as Urgent
        </button>
        <button className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Escalate to Ops
        </button>
      </div>
    </div>
  );
}
