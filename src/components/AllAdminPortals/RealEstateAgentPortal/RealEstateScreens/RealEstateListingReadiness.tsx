import React from 'react';
import { CheckCircle2, Circle, Send } from 'lucide-react';

const checklistItems = [
  { id: 1, title: 'Photography & Staging', status: 'Done', description: 'Professional photos scheduled for Jan 28' },
  { id: 2, title: 'Minor Repairs', status: 'In progress', description: 'HVAC servicing pending' },
  { id: 3, title: 'Pricing Strategy', status: 'Done', description: 'Listed at $850K' },
  { id: 4, title: 'Listing Copy', status: 'Not started', description: 'Draft marketing materials' },
  { id: 5, title: 'Timeline Plan', status: 'Done', description: 'Target list date: Feb 1' },
  { id: 6, title: 'Showing Schedule', status: 'Not started', description: 'Set up showing times' },
];

export function RealEstateListingReadiness() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Listing Readiness Plan</h1>
        <p className="text-sm text-gray-600 mt-1">Prepare properties for successful market entry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {checklistItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {item.status === 'Done' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Done' ? 'bg-green-100 text-green-700' :
                      item.status === 'In progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <textarea 
                    placeholder="Add notes..."
                    className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-medium text-gray-900">{checklistItems.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">{checklistItems.filter(i => i.status === 'Done').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-blue-600">{checklistItems.filter(i => i.status === 'In progress').length}</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="w-5 h-5" />
              Share with Homeowner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
