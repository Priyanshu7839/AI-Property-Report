import { DollarSign, TrendingUp, CreditCard, Receipt, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyRevenue = [
  { month: 'Jun', affiliateLinks: 12450, cplLeads: 34200, zipSubscriptions: 4500, total: 51150 },
  { month: 'Jul', affiliateLinks: 15230, cplLeads: 38900, zipSubscriptions: 5200, total: 59330 },
  { month: 'Aug', affiliateLinks: 18650, cplLeads: 45670, zipSubscriptions: 6800, total: 71120 },
  { month: 'Sep', affiliateLinks: 22340, cplLeads: 52100, zipSubscriptions: 8100, total: 82540 },
  { month: 'Oct', affiliateLinks: 26780, cplLeads: 61230, zipSubscriptions: 9900, total: 97910 },
  { month: 'Nov', affiliateLinks: 31200, cplLeads: 72450, zipSubscriptions: 11600, total: 115250 },
];

const recentTransactions = [
  { id: 'TXN-2024-1247', date: '2024-11-28', type: 'CPL Lead Sale', buyer: 'Rocket Mortgage', amount: '$1,872', status: 'Completed' },
  { id: 'TXN-2024-1246', date: '2024-11-28', type: 'ZIP Subscription', buyer: 'Bay Area Realty', amount: '$2,800', status: 'Completed' },
  { id: 'TXN-2024-1245', date: '2024-11-27', type: 'Affiliate Commission', buyer: 'Impact.com', amount: '$4,520', status: 'Pending' },
  { id: 'TXN-2024-1244', date: '2024-11-27', type: 'CPL Lead Sale', buyer: 'Hippo Insurance', amount: '$675', status: 'Completed' },
  { id: 'TXN-2024-1243', date: '2024-11-27', type: 'ZIP Subscription', buyer: 'Manhattan Realty', amount: '$2,200', status: 'Completed' },
  { id: 'TXN-2024-1242', date: '2024-11-26', type: 'Affiliate Commission', buyer: 'CJ Affiliate', amount: '$3,890', status: 'Completed' },
  { id: 'TXN-2024-1241', date: '2024-11-26', type: 'CPL Lead Sale', buyer: 'Better.com', amount: '$2,160', status: 'Completed' },
  { id: 'TXN-2024-1240', date: '2024-11-25', type: 'Seller Lead', buyer: 'Redfin Agent', amount: '$5,700', status: 'Completed' },
];

const payoutSchedule = [
  { partner: 'Rocket Mortgage', amount: '$72,450', frequency: 'Monthly', nextPayout: '2024-12-05', status: 'Scheduled' },
  { partner: 'Better.com', amount: '$64,224', frequency: 'Monthly', nextPayout: '2024-12-05', status: 'Scheduled' },
  { partner: 'Impact.com (Affiliates)', amount: '$31,200', frequency: 'Bi-weekly', nextPayout: '2024-12-01', status: 'Scheduled' },
  { partner: 'Hippo Insurance', amount: '$34,020', frequency: 'Monthly', nextPayout: '2024-12-10', status: 'Scheduled' },
  { partner: 'CJ Affiliate', amount: '$18,650', frequency: 'Monthly', nextPayout: '2024-12-15', status: 'Scheduled' },
];

export function Finance() {
  const totalRevenue = monthlyRevenue[monthlyRevenue.length - 1].total;
  const monthGrowth = ((monthlyRevenue[monthlyRevenue.length - 1].total - monthlyRevenue[monthlyRevenue.length - 2].total) / monthlyRevenue[monthlyRevenue.length - 2].total * 100).toFixed(1);
  
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Finance Module</h1>
        <p className="text-gray-600 mt-1">Revenue tracking, payouts, and financial analytics</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-600" size={24} />
            <p className="text-gray-600 text-sm">Total Revenue (Nov)</p>
          </div>
          <p className="text-3xl mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">+{monthGrowth}% vs October</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={24} />
            <p className="text-gray-600 text-sm">Affiliate Revenue</p>
          </div>
          <p className="text-3xl mt-2">$31,200</p>
          <p className="text-sm text-gray-600 mt-2">27.1% of total</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="text-purple-600" size={24} />
            <p className="text-gray-600 text-sm">CPL Lead Sales</p>
          </div>
          <p className="text-3xl mt-2">$72,450</p>
          <p className="text-sm text-gray-600 mt-2">62.9% of total</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="text-orange-600" size={24} />
            <p className="text-gray-600 text-sm">ZIP Subscriptions</p>
          </div>
          <p className="text-3xl mt-2">$11,600</p>
          <p className="text-sm text-green-600 mt-2">+17% MoM</p>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg mb-4">Revenue Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Total Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg mb-4">Revenue by Stream</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="affiliateLinks" fill="#f59e0b" name="Affiliate Links" />
              <Bar dataKey="cplLeads" fill="#3b82f6" name="CPL Leads" />
              <Bar dataKey="zipSubscriptions" fill="#8b5cf6" name="ZIP Subscriptions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Streams Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg">Revenue Streams Breakdown</h3>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <h4 className="mb-4">Affiliate Links</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Impact.com</span>
                <span>$18,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">CJ Affiliate</span>
                <span>$8,420</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">FlexOffers</span>
                <span>$4,030</span>
              </div>
              <div className="pt-3 border-t border-orange-300">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-xl text-orange-700">$31,200</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <h4 className="mb-4">Direct CPL Leads</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Lenders</span>
                <span>$58,230</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Insurance</span>
                <span>$10,120</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Other</span>
                <span>$4,100</span>
              </div>
              <div className="pt-3 border-t border-blue-300">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-xl text-blue-700">$72,450</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <h4 className="mb-4">ZIP Subscriptions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Active Subs</span>
                <span>67 ZIPs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Avg Price</span>
                <span>$173/ZIP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">MRR Growth</span>
                <span className="text-green-600">+17%</span>
              </div>
              <div className="pt-3 border-t border-purple-300">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-xl text-purple-700">$11,600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg">Recent Transactions</h3>
          <button className="text-blue-600 hover:underline text-sm">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Buyer/Partner</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-blue-600">{txn.id}</td>
                  <td className="py-3 px-4 text-sm">{txn.date}</td>
                  <td className="py-3 px-4 text-sm">{txn.type}</td>
                  <td className="py-3 px-4">{txn.buyer}</td>
                  <td className="py-3 px-4 text-right text-green-600">{txn.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Schedule */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg">Upcoming Payouts</h3>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Configure Payouts
          </button>
        </div>
        
        <div className="space-y-4">
          {payoutSchedule.map((payout, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <p className="mb-1">{payout.partner}</p>
                <p className="text-sm text-gray-600">{payout.frequency} • Next: {payout.nextPayout}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xl text-green-600">{payout.amount}</p>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {payout.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <span className="text-lg">Total Upcoming Payouts</span>
            <span className="text-2xl text-green-600">$220,544</span>
          </div>
        </div>
      </div>
    </div>
  );
}
