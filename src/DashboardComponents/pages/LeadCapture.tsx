import { useState } from 'react';
import { Search, Send, Download, Settings, CheckCircle, XCircle } from 'lucide-react';

const mockLeads = [
  {
    id: 'LEAD-001247',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(310) 555-0123',
    address: '123 Beverly Hills Dr',
    zip: '90210',
    leadType: 'Seller Lead',
    intentScore: 95,
    buyer: 'Unassigned',
    status: 'New',
    value: '$2,850',
    notes: 'High equity, clicked sell option'
  },
  {
    id: 'LEAD-001246',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(212) 555-0456',
    address: '456 Park Avenue',
    zip: '10001',
    leadType: 'Refinance Lead',
    intentScore: 88,
    buyer: 'Rocket Mortgage',
    status: 'Sent',
    value: '$78',
    notes: 'Can save $315/mo'
  },
  {
    id: 'LEAD-001245',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '(305) 555-0789',
    address: '789 Ocean Drive',
    zip: '33139',
    leadType: 'Insurance Savings Lead',
    intentScore: 82,
    buyer: 'Hippo Insurance',
    status: 'Accepted',
    value: '$45',
    notes: 'Overpaying $295/mo'
  },
  {
    id: 'LEAD-001244',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(312) 555-0234',
    address: '234 Michigan Ave',
    zip: '60611',
    leadType: 'High Equity Lead',
    intentScore: 91,
    buyer: 'Unassigned',
    status: 'New',
    value: '$2,200',
    notes: '$245K equity, refi interest'
  },
  {
    id: 'LEAD-001243',
    name: 'David Wilson',
    email: 'dwilson@email.com',
    phone: '(415) 555-0567',
    address: '567 Main Street',
    zip: '94102',
    leadType: 'Seller Lead',
    intentScore: 78,
    buyer: 'Local Agent - Bay Area',
    status: 'Sent',
    value: '$3,100',
    notes: 'Market trending down, wants to sell'
  },
];

const leadTypes = ['All Types', 'Refinance Lead', 'Seller Lead', 'Insurance Savings Lead', 'High Equity Lead', 'Investment Lead'];

export function LeadCapture() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showRoutingModal, setShowRoutingModal] = useState(false);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.zip.includes(searchTerm) ||
                         lead.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All Types' || lead.leadType === filterType;
    return matchesSearch && matchesType;
  });

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Sent': return 'bg-yellow-100 text-yellow-700';
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLeadTypeColor = (type: string) => {
    switch(type) {
      case 'Refinance Lead': return 'bg-blue-100 text-blue-700';
      case 'Seller Lead': return 'bg-purple-100 text-purple-700';
      case 'Insurance Savings Lead': return 'bg-green-100 text-green-700';
      case 'High Equity Lead': return 'bg-orange-100 text-orange-700';
      case 'Investment Lead': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Lead Capture & Routing System</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">The heart of your business - manage and monetize every lead</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Total Leads Today</p>
          <p className="text-2xl md:text-3xl mt-2">892</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">+18% vs yesterday</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">High-Intent Leads</p>
          <p className="text-2xl md:text-3xl mt-2">234</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">+31% vs yesterday</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Leads Monetized</p>
          <p className="text-2xl md:text-3xl mt-2">178</p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">20% conversion</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Lead Value Today</p>
          <p className="text-2xl md:text-3xl mt-2">$14,526</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">Average: $81.64</p>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, phone, ZIP..."
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <select
              className="flex-1 sm:flex-initial px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg appearance-none bg-white text-sm md:text-base"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {leadTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <button 
              className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 text-sm md:text-base"
              disabled={selectedLeads.length === 0}
              onClick={() => setShowRoutingModal(true)}
            >
              <Send size={20} />
              Route Selected ({selectedLeads.length})
            </button>
            
            <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Download size={20} />
              Export
            </button>
            
            <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Settings size={20} />
              Auto-Route Rules
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 md:py-4 px-2 md:px-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads(filteredLeads.map(l => l.id));
                      } else {
                        setSelectedLeads([]);
                      }
                    }}
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  />
                </th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">ID</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Name</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Email</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Phone</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Address</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">ZIP</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Type</th>
                <th className="text-center py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Intent</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Buyer</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Status</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Value</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                    />
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-blue-600">{lead.id}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{lead.name}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{lead.email}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm whitespace-nowrap">{lead.phone}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{lead.address}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{lead.zip}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${getLeadTypeColor(lead.leadType)}`}>
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        lead.intentScore >= 90 ? 'bg-green-100 text-green-700' :
                        lead.intentScore >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {lead.intentScore}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">{lead.buyer}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-green-600">{lead.value}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{lead.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Routing Modal */}
      {showRoutingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl mb-6">Route {selectedLeads.length} Lead(s)</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Select Buyer</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Rocket Mortgage - Refi ($78 CPL)</option>
                  <option>Better.com - Refi ($72 CPL)</option>
                  <option>Hippo Insurance ($45 CPL)</option>
                  <option>Local Agent Network ($2,500 per sale)</option>
                  <option>Redfin Agent ($2,850 per sale)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Delivery Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" defaultChecked />
                    <span>API Webhook (Instant)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" />
                    <span>Email Notification</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" />
                    <span>CSV Export</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Add Notes (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                  rows={3}
                  placeholder="Add any additional notes for the buyer..."
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                onClick={() => {
                  setShowRoutingModal(false);
                  setSelectedLeads([]);
                }}
              >
                <Send size={20} />
                Send Leads
              </button>
              <button 
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowRoutingModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Routing Rules Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl">Active Auto-Routing Rules</h2>
            <p className="text-sm text-gray-600 mt-1">Automatically route leads based on criteria</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add Rule
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p>CA Refi Leads → Rocket Mortgage</p>
                <p className="text-sm text-gray-600">Leads from California with refi intent</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">127 leads routed</span>
              <button className="text-blue-600 hover:underline text-sm">Edit</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p>Insurance Overpay &gt; $100 → Hippo Insurance</p>
                <p className="text-sm text-gray-600">High insurance savings opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">68 leads routed</span>
              <button className="text-blue-600 hover:underline text-sm">Edit</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p>Equity &gt; $200K → Real Estate Agents</p>
                <p className="text-sm text-gray-600">High equity seller leads to agent network</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">43 leads routed</span>
              <button className="text-blue-600 hover:underline text-sm">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
