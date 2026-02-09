import { DollarSign, TrendingUp, Clock, CheckCircle2, Download, FileText } from 'lucide-react';
import { InsuranceMetricCard } from '../Insuranceportal/InsuranceMetricCard';
import { InsuranceStatusChip } from '../Insuranceportal/InsuranceStatusChip';
import { Button } from '../../../ui/button';
import { mockPayouts } from '../Insurancedata/InsurancemockData';

interface PayoutsProps {
  onNavigate: (screen: string) => void;
}

export function InsurancePayouts({ onNavigate }: PayoutsProps) {
  const earningsThisMonth = mockPayouts
    .filter(p => new Date(p.bindDate).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + p.commissionAmount, 0);
  
  const pendingPayouts = mockPayouts.filter(p => p.status === 'Pending').length;
  const paidInvoices = mockPayouts.filter(p => p.status === 'Paid').length;
  const avgPayout = Math.round(mockPayouts.reduce((sum, p) => sum + p.commissionAmount, 0) / mockPayouts.length);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Payouts & Invoices</h1>
        <p className="text-gray-600 mt-1">Track your earnings and commission payments.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InsuranceMetricCard
          title="Earnings This Month"
          value={`$${earningsThisMonth.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: '+18% from last month', isPositive: true }}
        />
        <InsuranceMetricCard
          title="Pending Payouts"
          value={pendingPayouts}
          icon={Clock}
        />
        <InsuranceMetricCard
          title="Paid Invoices"
          value={paidInvoices}
          icon={CheckCircle2}
        />
        <InsuranceMetricCard
          title="Avg Payout per Policy"
          value={`$${avgPayout}`}
          icon={TrendingUp}
        />
      </div>

      {/* Payout Table */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Commission Payouts</h2>
              <p className="text-sm text-gray-600 mt-0.5">Your commission history for bound policies</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bind Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payout Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayouts.map((payout) => (
                <tr key={payout.leadId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onNavigate('lead-details', payout.leadId)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {payout.leadId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payout.bindDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payout.premiumAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    10%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                    ${payout.commissionAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <InsuranceStatusChip status={payout.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payout.payoutDate
                      ? new Date(payout.payoutDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Payment Schedule</p>
            <p className="font-medium text-gray-900">Monthly on the 15th</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Next Payout Date</p>
            <p className="font-medium text-gray-900">January 31, 2026</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Commission Rate</p>
            <p className="font-medium text-gray-900">10% of annual premium</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Payment Method</p>
            <p className="font-medium text-gray-900">ACH Transfer (••••4892)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
