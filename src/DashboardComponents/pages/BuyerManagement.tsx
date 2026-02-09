import { useState } from 'react';
import { Plus, Search, TrendingUp, CheckCircle, XCircle, Pause } from 'lucide-react';

const mockBuyers = [
  {
    id: 'BUY-001',
    name: 'Rocket Mortgage',
    category: 'Lender',
    cplRate: '$78',
    statesAccepted: ['CA', 'TX', 'FL', 'NY', 'OH'],
    zipsAssigned: 0,
    apiWebhook: 'Active',
    balance: '$12,450',
    rating: 4.8,
    leadsSent: 1247,
    leadsAccepted: 1184,
    leadsRejected: 63,
    acceptanceRate: 95,
    revenueGenerated: '$97,266'
  },
  {
    id: 'BUY-002',
    name: 'Better.com',
    category: 'Lender',
    cplRate: '$72',
    statesAccepted: ['CA', 'NY', 'FL'],
    zipsAssigned: 0,
    apiWebhook: 'Active',
    balance: '$8,640',
    rating: 4.6,
    leadsSent: 892,
    leadsAccepted: 801,
    leadsRejected: 91,
    acceptanceRate: 90,
    revenueGenerated: '$64,224'
  },
  {
    id: 'BUY-003',
    name: 'Hippo Insurance',
    category: 'Insurance',
    cplRate: '$45',
    statesAccepted: ['All'],
    zipsAssigned: 0,
    apiWebhook: 'Active',
    balance: '$5,850',
    rating: 4.9,
    leadsSent: 756,
    leadsAccepted: 741,
    leadsRejected: 15,
    acceptanceRate: 98,
    revenueGenerated: '$34,020'
  },
  {
    id: 'BUY-004',
    name: 'Redfin Agent Network',
    category: 'Real Estate',
    cplRate: '$2,850/sale',
    statesAccepted: ['CA', 'WA', 'TX', 'FL'],
    zipsAssigned: 23,
    apiWebhook: 'Email',
    balance: '$45,600',
    rating: 4.7,
    leadsSent: 234,
    leadsAccepted: 198,
    leadsRejected: 36,
    acceptanceRate: 85,
    revenueGenerated: '$45,600'
  },
  {
    id: 'BUY-005',
    name: 'Local Agent - Bay Area',
    category: 'Real Estate',
    cplRate: '$3,100/sale',
    statesAccepted: ['CA'],
    zipsAssigned: 12,
    apiWebhook: 'Email',
    balance: '$18,600',
    rating: 5.0,
    leadsSent: 67,
    leadsAccepted: 67,
    leadsRejected: 0,
    acceptanceRate: 100,
    revenueGenerated: '$18,600'
  },
];

export function BuyerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState<typeof mockBuyers[0] | null>(null);

  const filteredBuyers = mockBuyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Lender': return 'bg-blue-100 text-blue-700';
      case 'Insurance': return 'bg-green-100 text-green-700';
      case 'Real Estate': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Buyer Management System</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Manage banks, insurers, agents, and marketplaces</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Active Buyers</p>
          <p className="text-2xl md:text-3xl mt-2">34</p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">3 pending approval</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Total Revenue (Month)</p>
          <p className="text-2xl md:text-3xl mt-2">$259,710</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">+24% vs last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Avg Acceptance Rate</p>
          <p className="text-2xl md:text-3xl mt-2">93.6%</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">Excellent quality</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Leads Delivered (Month)</p>
          <p className="text-2xl md:text-3xl mt-2">3,196</p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">2,991 accepted</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search buyers..."
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 text-sm md:text-base">
            <Plus size={18} />
            <span>Add New Buyer</span>
          </button>
        </div>
      </div>

      {/* Buyers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-4 md:mb-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Buyer Name</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Category</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">CPL Rate</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">States</th>
                <th className="text-center py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">ZIPs</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">API</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Balance</th>
                <th className="text-center py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Rating</th>
                <th className="text-center py-4 px-4 text-sm text-gray-600">Acceptance</th>
                <th className="text-left py-4 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuyers.map((buyer) => (
                <tr key={buyer.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedBuyer(buyer)}
                      className="text-blue-600 hover:underline text-left"
                    >
                      {buyer.name}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getCategoryColor(buyer.category)}`}>
                      {buyer.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">{buyer.cplRate}</td>
                  <td className="py-4 px-4 text-sm">
                    {buyer.statesAccepted.length > 3 
                      ? buyer.statesAccepted.slice(0, 3).join(', ') + `... +${buyer.statesAccepted.length - 3}`
                      : buyer.statesAccepted.join(', ')
                    }
                  </td>
                  <td className="py-4 px-4 text-center">{buyer.zipsAssigned}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      buyer.apiWebhook === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {buyer.apiWebhook}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-green-600">{buyer.balance}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{buyer.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      buyer.acceptanceRate >= 95 ? 'bg-green-100 text-green-700' :
                      buyer.acceptanceRate >= 85 ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {buyer.acceptanceRate}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-sm text-blue-600 hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buyer Detail Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedBuyer.name}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getCategoryColor(selectedBuyer.category)}`}>
                    {selectedBuyer.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedBuyer(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">CPL Rate</p>
                  <p className="text-2xl mt-1">{selectedBuyer.cplRate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl text-green-600 mt-1">{selectedBuyer.revenueGenerated}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-2xl mt-1">{selectedBuyer.balance}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Leads Sent</span>
                      <span>{selectedBuyer.leadsSent}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm">Leads Accepted</span>
                      <span className="text-green-700">{selectedBuyer.leadsAccepted}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <span className="text-sm">Leads Rejected</span>
                      <span className="text-red-700">{selectedBuyer.leadsRejected}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="text-sm">Acceptance Rate</span>
                      <span className="text-blue-700">{selectedBuyer.acceptanceRate}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Rating</span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {selectedBuyer.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">States Accepted</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedBuyer.statesAccepted.map(state => (
                          <span key={state} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">API/Webhook Status</label>
                      <span className={`inline-block px-4 py-2 rounded-lg ${
                        selectedBuyer.apiWebhook === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedBuyer.apiWebhook}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">ZIP Codes Assigned</label>
                      <p>{selectedBuyer.zipsAssigned} ZIP codes</p>
                    </div>
                    {selectedBuyer.apiWebhook === 'Active' && (
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Webhook URL</label>
                        <input
                          type="text"
                          value="https://api.example.com/webhook/leads"
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Change CPL Pricing
                </button>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Assign ZIPs
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Set Lead Cap
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Webhook
                </button>
                <button className="px-6 py-3 border border-orange-300 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">
                  <Pause size={20} className="inline mr-2" />
                  Pause Buyer
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View API Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
