import { useState } from 'react';
import { MapPin, Search, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';

const mockZipCodes = [
  {
    zip: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    pricePerMonth: '$2,500',
    leadVolume: '45-60/month',
    avgSellerLeads: 12,
    highEquity: 'Very High',
    stateTrend: 'Up 8.2%',
    assignedAgent: null,
    status: 'Available',
    estimatedValue: '$28,500'
  },
  {
    zip: '10001',
    city: 'New York',
    state: 'NY',
    pricePerMonth: '$2,200',
    leadVolume: '38-52/month',
    avgSellerLeads: 10,
    highEquity: 'High',
    stateTrend: 'Up 5.4%',
    assignedAgent: 'Manhattan Realty Group',
    status: 'Sold',
    estimatedValue: '$24,200'
  },
  {
    zip: '33139',
    city: 'Miami Beach',
    state: 'FL',
    pricePerMonth: '$1,950',
    leadVolume: '42-58/month',
    avgSellerLeads: 14,
    highEquity: 'Very High',
    stateTrend: 'Up 12.1%',
    assignedAgent: null,
    status: 'Available',
    estimatedValue: '$26,350'
  },
  {
    zip: '60611',
    city: 'Chicago',
    state: 'IL',
    pricePerMonth: '$1,650',
    leadVolume: '28-40/month',
    avgSellerLeads: 8,
    highEquity: 'Medium',
    stateTrend: 'Up 3.2%',
    assignedAgent: 'Chicago Premier Homes',
    status: 'Sold',
    estimatedValue: '$19,200'
  },
  {
    zip: '94102',
    city: 'San Francisco',
    state: 'CA',
    pricePerMonth: '$2,800',
    leadVolume: '35-48/month',
    avgSellerLeads: 11,
    highEquity: 'Very High',
    stateTrend: 'Up 6.8%',
    assignedAgent: null,
    status: 'Available',
    estimatedValue: '$30,800'
  },
  {
    zip: '02108',
    city: 'Boston',
    state: 'MA',
    pricePerMonth: '$1,850',
    leadVolume: '30-42/month',
    avgSellerLeads: 9,
    highEquity: 'High',
    stateTrend: 'Up 4.5%',
    assignedAgent: 'Boston Elite Realty',
    status: 'Sold',
    estimatedValue: '$21,450'
  },
  {
    zip: '98101',
    city: 'Seattle',
    state: 'WA',
    pricePerMonth: '$2,100',
    leadVolume: '38-50/month',
    avgSellerLeads: 10,
    highEquity: 'Very High',
    stateTrend: 'Up 7.2%',
    assignedAgent: null,
    status: 'Available',
    estimatedValue: '$25,200'
  },
  {
    zip: '78701',
    city: 'Austin',
    state: 'TX',
    pricePerMonth: '$1,750',
    leadVolume: '45-62/month',
    avgSellerLeads: 15,
    highEquity: 'High',
    stateTrend: 'Up 9.5%',
    assignedAgent: null,
    status: 'Available',
    estimatedValue: '$27,300'
  },
];

export function ZipMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedZip, setSelectedZip] = useState<typeof mockZipCodes[0] | null>(null);

  const filteredZips = mockZipCodes.filter(zip => {
    const matchesSearch = zip.zip.includes(searchTerm) ||
                         zip.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zip.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'available' && zip.status === 'Available') ||
                         (filterStatus === 'sold' && zip.status === 'Sold');
    return matchesSearch && matchesStatus;
  });

  const availableCount = mockZipCodes.filter(z => z.status === 'Available').length;
  const soldCount = mockZipCodes.filter(z => z.status === 'Sold').length;
  const totalMonthlyRevenue = mockZipCodes
    .filter(z => z.status === 'Sold')
    .reduce((sum, z) => sum + parseInt(z.pricePerMonth.replace(/[$,]/g, '')), 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">ZIP Code Marketplace</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Sell exclusive territories to agents - your recurring revenue engine</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Available ZIPs</p>
          <p className="text-2xl md:text-3xl mt-2">{availableCount}</p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">Ready to sell</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Sold ZIPs</p>
          <p className="text-2xl md:text-3xl mt-2">{soldCount}</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">Active subscriptions</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Monthly Recurring Revenue</p>
          <p className="text-2xl md:text-3xl mt-2">${totalMonthlyRevenue.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-green-600 mt-2">From ZIP subscriptions</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <p className="text-gray-600 text-xs md:text-sm">Potential MRR (All ZIPs)</p>
          <p className="text-2xl md:text-3xl mt-2">$16,800</p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">If all sold</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by ZIP code, city, or state..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available Only</option>
              <option value="sold">Sold Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ZIP Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredZips.map((zip) => (
          <div key={zip.zip} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-blue-600" size={20} />
                    <h3 className="text-xl">{zip.zip}</h3>
                  </div>
                  <p className="text-gray-600">{zip.city}, {zip.state}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  zip.status === 'Available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {zip.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Price/Month</span>
                  <span className="text-blue-600">{zip.pricePerMonth}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Lead Volume</span>
                  <span>{zip.leadVolume}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Avg Seller Leads</span>
                  <span>{zip.avgSellerLeads}/month</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">High Equity</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    zip.highEquity === 'Very High' ? 'bg-green-100 text-green-700' :
                    zip.highEquity === 'High' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {zip.highEquity}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Market Trend</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingUp size={16} />
                    {zip.stateTrend}
                  </span>
                </div>
              </div>

              {zip.status === 'Sold' && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Assigned to:</p>
                  <p className="text-sm">{zip.assignedAgent}</p>
                </div>
              )}

              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Annual Value</p>
                <p className="text-xl text-green-700">{zip.estimatedValue}</p>
              </div>

              {zip.status === 'Available' ? (
                <button 
                  onClick={() => setSelectedZip(zip)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  View Details
                </button>
              ) : (
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Subscription
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ZIP Detail Modal */}
      {selectedZip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-blue-600" size={32} />
                    <h2 className="text-3xl">{selectedZip.zip}</h2>
                  </div>
                  <p className="text-xl text-gray-600">{selectedZip.city}, {selectedZip.state}</p>
                </div>
                <button
                  onClick={() => setSelectedZip(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">Subscription Price</p>
                    <p className="text-4xl text-blue-600">{selectedZip.pricePerMonth}</p>
                    <p className="text-sm text-gray-600 mt-1">per month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 mb-2">Annual Value</p>
                    <p className="text-2xl text-green-600">{selectedZip.estimatedValue}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg">ZIP Code Analytics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Monthly Lead Volume</p>
                    <p className="text-xl">{selectedZip.leadVolume}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Avg Seller Leads</p>
                    <p className="text-xl">{selectedZip.avgSellerLeads}/month</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">High Equity Presence</p>
                    <p className="text-xl">{selectedZip.highEquity}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Market Trend</p>
                    <p className="text-xl flex items-center gap-1">
                      <TrendingUp className="text-green-600" size={20} />
                      {selectedZip.stateTrend}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="mb-2">What's Included:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Exclusive access to all leads in ZIP {selectedZip.zip}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Real-time lead notifications via email & SMS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Detailed homeowner reports with equity & intent data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Priority routing - you get leads first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Monthly performance reports & analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Cancel anytime - no long-term commitment</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="mb-2">Why This ZIP is Valuable:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Average {selectedZip.avgSellerLeads} high-intent seller leads per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{selectedZip.highEquity} concentration of homeowners with substantial equity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Market trending {selectedZip.stateTrend} - strong appreciation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Exclusive territory - only one agent per ZIP code</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Purchase Subscription
                </button>
                <button 
                  className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setSelectedZip(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
