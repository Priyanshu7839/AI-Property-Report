import React, { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, Eye, X } from 'lucide-react';

interface Report {
  id: string;
  address: string;
  zip: string;
  state: string;
  aiValue: number;
  equity: number;
  loanBalance: number;
  refiSavings: number;
  insuranceOverpay: number;
  marketTrend: 'Up' | 'Down' | 'Flat';
  intentScore: string;
  created: string;
  leadStatus: string;
  monetization: string;
  homeowner?: {
    name: string;
    email: string;
    phone: string;
    signupSource: string;
    device: string;
  };
  financial?: {
    mortgageRate: number;
    loanTerm: number;
    cashoutPotential: number;
    refiEligibility: string;
  };
  intent?: {
    openedRefi: boolean;
    clickedInsurance: boolean;
    clickedSell: boolean;
    repeatUser: boolean;
  };
}

export default function ReportsDatabase() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const reports: Report[] = [
    {
      id: 'RPT-2847',
      address: '1234 Oak Street, Beverly Hills',
      zip: '90210',
      state: 'CA',
      aiValue: 2450000,
      equity: 850000,
      loanBalance: 1600000,
      refiSavings: 450,
      insuranceOverpay: 125,
      marketTrend: 'Up',
      intentScore: 'Seller (High)',
      created: '2025-11-28 14:23',
      leadStatus: 'Attached',
      monetization: 'Real Estate Agent',
      homeowner: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '(310) 555-0123',
        signupSource: 'Google Ads',
        device: 'iPhone 15 Pro',
      },
      financial: {
        mortgageRate: 6.5,
        loanTerm: 30,
        cashoutPotential: 680000,
        refiEligibility: 'Excellent',
      },
      intent: {
        openedRefi: true,
        clickedInsurance: false,
        clickedSell: true,
        repeatUser: false,
      },
    },
    {
      id: 'RPT-2846',
      address: '567 Park Avenue, New York',
      zip: '10001',
      state: 'NY',
      aiValue: 1850000,
      equity: 450000,
      loanBalance: 1400000,
      refiSavings: 680,
      insuranceOverpay: 89,
      marketTrend: 'Up',
      intentScore: 'Refi (High)',
      created: '2025-11-28 14:15',
      leadStatus: 'Attached',
      monetization: 'RocketMortgage',
      homeowner: {
        name: 'Michael Chen',
        email: 'mchen@email.com',
        phone: '(212) 555-0187',
        signupSource: 'Facebook',
        device: 'Samsung Galaxy S24',
      },
      financial: {
        mortgageRate: 7.2,
        loanTerm: 30,
        cashoutPotential: 360000,
        refiEligibility: 'Good',
      },
      intent: {
        openedRefi: true,
        clickedInsurance: true,
        clickedSell: false,
        repeatUser: true,
      },
    },
    {
      id: 'RPT-2845',
      address: '890 Beach Drive, Miami Beach',
      zip: '33139',
      state: 'FL',
      aiValue: 1200000,
      equity: 280000,
      loanBalance: 920000,
      refiSavings: 290,
      insuranceOverpay: 245,
      marketTrend: 'Flat',
      intentScore: 'Insurance (High)',
      created: '2025-11-28 13:58',
      leadStatus: 'Attached',
      monetization: 'Hippo Insurance',
      homeowner: {
        name: 'Jennifer Martinez',
        email: 'jmartinez@email.com',
        phone: '(305) 555-0294',
        signupSource: 'Organic',
        device: 'iPhone 14',
      },
      financial: {
        mortgageRate: 5.8,
        loanTerm: 20,
        cashoutPotential: 224000,
        refiEligibility: 'Fair',
      },
      intent: {
        openedRefi: false,
        clickedInsurance: true,
        clickedSell: false,
        repeatUser: false,
      },
    },
    {
      id: 'RPT-2844',
      address: '432 Tech Boulevard, Seattle',
      zip: '98101',
      state: 'WA',
      aiValue: 980000,
      equity: 620000,
      loanBalance: 360000,
      refiSavings: 180,
      insuranceOverpay: 45,
      marketTrend: 'Up',
      intentScore: 'Seller (Medium)',
      created: '2025-11-28 13:42',
      leadStatus: 'Not Attached',
      monetization: '-',
      homeowner: {
        name: 'David Kim',
        email: 'dkim@email.com',
        phone: '(206) 555-0156',
        signupSource: 'LinkedIn',
        device: 'MacBook Pro',
      },
      financial: {
        mortgageRate: 4.5,
        loanTerm: 15,
        cashoutPotential: 496000,
        refiEligibility: 'Excellent',
      },
      intent: {
        openedRefi: false,
        clickedInsurance: false,
        clickedSell: true,
        repeatUser: false,
      },
    },
    {
      id: 'RPT-2843',
      address: '789 Downtown Street, Austin',
      zip: '78701',
      state: 'TX',
      aiValue: 750000,
      equity: 180000,
      loanBalance: 570000,
      refiSavings: 520,
      insuranceOverpay: 156,
      marketTrend: 'Up',
      intentScore: 'Refi (High)',
      created: '2025-11-28 13:28',
      leadStatus: 'Attached',
      monetization: 'Better.com',
      homeowner: {
        name: 'Emily Rodriguez',
        email: 'erodriguez@email.com',
        phone: '(512) 555-0298',
        signupSource: 'Google Ads',
        device: 'iPad Air',
      },
      financial: {
        mortgageRate: 6.8,
        loanTerm: 30,
        cashoutPotential: 144000,
        refiEligibility: 'Good',
      },
      intent: {
        openedRefi: true,
        clickedInsurance: true,
        clickedSell: false,
        repeatUser: false,
      },
    },
  ];

  const filteredReports = reports.filter(
    (report) =>
      report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.zip.includes(searchTerm) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Reports Database</h1>
        <p className="text-gray-600">Every AI home valuation report — your most valuable asset</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address, ZIP, or Report ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">Report ID</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">Address</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">ZIP</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">State</th>
                <th className="px-6 py-3 text-right text-gray-600 text-sm">AI Value</th>
                <th className="px-6 py-3 text-right text-gray-600 text-sm">Equity</th>
                <th className="px-6 py-3 text-right text-gray-600 text-sm">Refi Savings</th>
                <th className="px-6 py-3 text-center text-gray-600 text-sm">Trend</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">Intent Score</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">Lead Status</th>
                <th className="px-6 py-3 text-left text-gray-600 text-sm">Monetization</th>
                <th className="px-6 py-3 text-center text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{report.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.zip}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.state}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${report.aiValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${report.equity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${report.refiSavings}/mo
                  </td>
                  <td className="px-6 py-4 text-center">
                    {report.marketTrend === 'Up' ? (
                      <TrendingUp className="w-5 h-5 text-green-600 inline" />
                    ) : report.marketTrend === 'Down' ? (
                      <TrendingDown className="w-5 h-5 text-red-600 inline" />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        report.intentScore.includes('High')
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {report.intentScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        report.leadStatus === 'Attached'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {report.leadStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.monetization}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900">Report Details</h2>
                <p className="text-gray-600 mt-1">{selectedReport.id}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Property Section */}
              <div>
                <h3 className="text-gray-900 mb-4">Property Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="text-gray-900">{selectedReport.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">ZIP Code</p>
                    <p className="text-gray-900">{selectedReport.zip}, {selectedReport.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">AI Estimated Value</p>
                    <p className="text-gray-900">${selectedReport.aiValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Market Trend</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      {selectedReport.marketTrend}
                      {selectedReport.marketTrend === 'Up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    </p>
                  </div>
                </div>
              </div>

              {/* Homeowner Section */}
              {selectedReport.homeowner && (
                <div>
                  <h3 className="text-gray-900 mb-4">Homeowner Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Name</p>
                      <p className="text-gray-900">{selectedReport.homeowner.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Email</p>
                      <p className="text-gray-900">{selectedReport.homeowner.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Phone</p>
                      <p className="text-gray-900">{selectedReport.homeowner.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Signup Source</p>
                      <p className="text-gray-900">{selectedReport.homeowner.signupSource}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Device</p>
                      <p className="text-gray-900">{selectedReport.homeowner.device}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Section */}
              {selectedReport.financial && (
                <div>
                  <h3 className="text-gray-900 mb-4">Financial Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Equity</p>
                      <p className="text-gray-900">${selectedReport.equity.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Loan Balance</p>
                      <p className="text-gray-900">${selectedReport.loanBalance.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Mortgage Rate</p>
                      <p className="text-gray-900">{selectedReport.financial.mortgageRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Loan Term</p>
                      <p className="text-gray-900">{selectedReport.financial.loanTerm} years</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Cash-out Potential</p>
                      <p className="text-gray-900">${selectedReport.financial.cashoutPotential.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Refi Eligibility</p>
                      <p className="text-gray-900">{selectedReport.financial.refiEligibility}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Refi Savings</p>
                      <p className="text-gray-900">${selectedReport.refiSavings}/month</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Insurance Overpay</p>
                      <p className="text-gray-900">${selectedReport.insuranceOverpay}/month</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Intent Signals */}
              {selectedReport.intent && (
                <div>
                  <h3 className="text-gray-900 mb-4">Intent Signals</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.intent.openedRefi && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Opened Refi Tab
                        </span>
                      )}
                      {selectedReport.intent.clickedInsurance && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Clicked Insurance Link
                        </span>
                      )}
                      {selectedReport.intent.clickedSell && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Clicked "Thinking to Sell"
                        </span>
                      )}
                      {selectedReport.intent.repeatUser && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          Repeat User
                        </span>
                      )}
                      {selectedReport.equity > 500000 && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          High Equity - Seller Flag
                        </span>
                      )}
                      {selectedReport.insuranceOverpay > 100 && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          High Insurance Overpay
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div>
                <h3 className="text-gray-900 mb-4">Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Assign to Lender
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Assign to Insurance Buyer
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Assign to Real Estate Agent
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    Mark as Sold
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Export to CSV
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Add Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
