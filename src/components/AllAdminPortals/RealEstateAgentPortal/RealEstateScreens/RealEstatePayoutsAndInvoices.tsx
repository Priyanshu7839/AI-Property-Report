import React from 'react';
import { DollarSign, Download } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { StatusChip } from '../StatusChip';
import { mockPayouts } from '../RealEstatedata/RealEstatemockData';

export function RealEstatePayoutsAndInvoices() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Payouts & Invoices</h1>
        <p className="text-sm text-gray-600 mt-1">Track your earnings and payment history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Earnings This Month" value="$18,500" icon={DollarSign} />
        <MetricCard title="Pending Payouts" value="$5,300" icon={DollarSign} />
        <MetricCard title="Paid Invoices (YTD)" value="$124,200" icon={DollarSign} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Lead ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Close Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Home Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Payout</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockPayouts.map((payout) => (
              <tr key={payout.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{payout.leadId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payout.closeDate}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={payout.transactionType} variant="info" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.homeValueBracket}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${payout.payoutAmount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusChip 
                    status={payout.status} 
                    variant={payout.status === 'Paid' ? 'success' : 'warning'} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
