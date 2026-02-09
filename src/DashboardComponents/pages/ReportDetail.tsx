import { useParams, Link } from 'react-router';
import { ArrowLeft, Home, User, DollarSign, TrendingUp, Send, Download, FileText } from 'lucide-react';

export function ReportDetail() {
  const { id } = useParams();

  // Mock data - in real app would fetch based on ID
  const report = {
    id: id,
    address: '123 Beverly Hills Dr',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    aiValue: '$2,450,000',
    lowerBound: '$2,320,000',
    upperBound: '$2,580,000',
    equity: '$980,000',
    loanBalance: '$1,470,000',
    mortgageRate: '4.25%',
    loanTerm: '30 years',
    cashOutPotential: '$735,000',
    refiEligible: true,
    refiSavings: '$420/mo',
    insuranceOverpay: '$185/mo',
    marketTrend: 'Up 8.2% YoY',
    appreciationForecast: '+5.4% next year',
    homeowner: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(310) 555-0123',
      signupSource: 'Google Ads - Refi Campaign',
      device: 'iPhone 14 Pro',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'refi-california'
    },
    intentSignals: [
      { signal: 'Opened refi calculator tab', timestamp: '2024-11-28 09:34 AM', important: true },
      { signal: 'Clicked "thinking to sell" option', timestamp: '2024-11-28 09:35 AM', important: true },
      { signal: 'Viewed insurance savings section', timestamp: '2024-11-28 09:36 AM', important: false },
      { signal: 'High equity detected (40%)', timestamp: '2024-11-28 09:34 AM', important: true },
      { signal: 'Above-market insurance payment', timestamp: '2024-11-28 09:34 AM', important: true },
    ],
    recentSales: [
      { address: '125 Beverly Hills Dr', price: '$2,385,000', date: '2024-10-15' },
      { address: '119 Beverly Hills Dr', price: '$2,520,000', date: '2024-09-22' },
      { address: '130 Beverly Hills Dr', price: '$2,410,000', date: '2024-08-08' },
    ]
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <Link to="/reports" className="flex items-center gap-2 text-blue-600 hover:underline mb-4">
          <ArrowLeft size={20} />
          Back to Reports Database
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl">{report.address}</h1>
            <p className="text-gray-600 mt-1">{report.city}, {report.state} {report.zip}</p>
            <p className="text-sm text-gray-500 mt-2">Report ID: {report.id}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">AI Estimated Value</p>
            <p className="text-3xl text-blue-600">{report.aiValue}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Home className="text-blue-600" size={24} />
              <h2 className="text-xl">Property Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">AI Estimated Value</p>
                <p className="text-2xl mt-1">{report.aiValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Value Range</p>
                <p className="text-2xl mt-1">{report.lowerBound} - {report.upperBound}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Trend</p>
                <p className="mt-1 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={20} />
                  <span>{report.marketTrend}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Appreciation Forecast</p>
                <p className="mt-1">{report.appreciationForecast}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="mb-3">Recent Sales in Area</h3>
              <div className="space-y-3">
                {report.recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p>{sale.address}</p>
                      <p className="text-sm text-gray-600">{sale.date}</p>
                    </div>
                    <p className="text-green-600">{sale.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Homeowner Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-blue-600" size={24} />
              <h2 className="text-xl">Homeowner Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="mt-1">{report.homeowner.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="mt-1 text-blue-600">{report.homeowner.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="mt-1">{report.homeowner.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Signup Source</p>
                <p className="mt-1 text-sm">{report.homeowner.signupSource}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Device</p>
                <p className="mt-1">{report.homeowner.device}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">UTM Parameters</p>
                <div className="mt-1 text-sm space-y-1">
                  <p>Source: {report.homeowner.utmSource}</p>
                  <p>Medium: {report.homeowner.utmMedium}</p>
                  <p>Campaign: {report.homeowner.utmCampaign}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="text-blue-600" size={24} />
              <h2 className="text-xl">Financial Analysis</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Home Equity</p>
                <p className="text-2xl text-green-600 mt-1">{report.equity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mortgage Balance</p>
                <p className="text-2xl mt-1">{report.loanBalance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Rate</p>
                <p className="mt-1">{report.mortgageRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loan Term</p>
                <p className="mt-1">{report.loanTerm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cash-Out Potential</p>
                <p className="text-2xl text-blue-600 mt-1">{report.cashOutPotential}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Refi Eligible</p>
                <p className="mt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    Yes - Save {report.refiSavings}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Insurance Overpayment</p>
                <p className="mt-1">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                    Overpaying {report.insuranceOverpay}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Intent */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                <Send size={20} />
                Assign to Lender
              </button>
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700">
                <Send size={20} />
                Assign to Insurance Buyer
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700">
                <Send size={20} />
                Assign to Real Estate Agent
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <Download size={20} />
                Export to CSV
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <FileText size={20} />
                Add Notes
              </button>
            </div>
          </div>

          {/* Intent Signals */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl mb-4">Intent Signals</h2>
            <div className="space-y-3">
              {report.intentSignals.map((signal, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    signal.important 
                      ? 'border-orange-300 bg-orange-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {signal.important && <span className="text-orange-600">🔥</span>}
                    <div className="flex-1">
                      <p className="text-sm">{signal.signal}</p>
                      <p className="text-xs text-gray-500 mt-1">{signal.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <h3 className="mb-2">Lead Status</h3>
            <p className="text-2xl">Unassigned</p>
            <p className="text-sm text-gray-600 mt-2">High priority - Multiple intent signals detected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
