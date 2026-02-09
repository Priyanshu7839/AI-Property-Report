import React from 'react';

interface PortfolioResultPanelProps {
  expectedReturn: number;
  borrowingCost: number;
  netSpread: number;
  fiveYearGain: number;
  totalWealth: number;
}

export function PortfolioResultPanel({
  expectedReturn,
  borrowingCost,
  netSpread,
  fiveYearGain,
  totalWealth,
}: PortfolioResultPanelProps) {
  const formatPercent = (value: number) => `${value.toFixed(2)}%`;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <h3 className="font-semibold text-gray-900">Portfolio Results</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Expected Return (Gross)</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatPercent(expectedReturn)}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Borrowing Cost (Est.)</span>
          <span className="text-lg font-semibold text-red-600">
            -{formatPercent(borrowingCost)}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-300">
          <span className="text-sm font-medium text-gray-900">
            Net Spread (After Interest)
          </span>
          <span className={`text-lg font-semibold ${netSpread > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercent(netSpread)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-600">5-Year Net Gain</span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(fiveYearGain)}
          </span>
        </div>

        <div className="flex justify-between items-center bg-blue-50 -mx-6 px-6 py-4 rounded-b-lg">
          <span className="text-sm font-medium text-gray-900">
            Total Year-5 Wealth Value
          </span>
          <span className="text-xl font-bold text-blue-700">
            {formatCurrency(totalWealth)}
          </span>
        </div>
      </div>
    </div>
  );
}
