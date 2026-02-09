import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from '../../../ui/slider';
import { Input } from '../../../ui/input';
import { TrendingUp } from 'lucide-react';

interface Allocation {
  sp500: number;
  bonds: number;
  cash: number;
  crypto: number;
  gold: number;
}

export function PortfolioAllocation() {
  const navigate = useNavigate();
  const [allocation, setAllocation] = useState<Allocation>({
    sp500: 60,
    bonds: 25,
    cash: 10,
    crypto: 3,
    gold: 2,
  });

  const [showGold, setShowGold] = useState(true);

  const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);

  const updateAllocation = (key: keyof Allocation, value: number) => {
    setAllocation((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(100, value)),
    }));
  };

  const autoBalance = () => {
    const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const diff = 100 - total;
      setAllocation((prev) => ({
        ...prev,
        sp500: Math.max(0, prev.sp500 + diff),
      }));
    }
  };

  // Calculate results
  const borrowCost = 7.5;
  const expectedReturn = 
    (allocation.sp500 * 0.10 +
    allocation.bonds * 0.04 +
    allocation.cash * 0.02 +
    allocation.crypto * 0.15 +
    allocation.gold * 0.06) / 100;
  
  const netSpread = expectedReturn - borrowCost;
  const investAmount = 250000;
  const fiveYearGain = investAmount * Math.pow(1 + expectedReturn / 100, 5) - investAmount;
  const totalWealth = investAmount + fiveYearGain;

  const assets = [
    { key: 'sp500' as keyof Allocation, label: 'S&P 500 (Equities)', return: '10%', risk: 'Medium' },
    { key: 'bonds' as keyof Allocation, label: 'Bonds', return: '4%', risk: 'Low' },
    { key: 'cash' as keyof Allocation, label: 'Cash', return: '2%', risk: 'Very Low' },
    { key: 'crypto' as keyof Allocation, label: 'Crypto', return: '15%', risk: 'High' },
  ];

  if (showGold) {
    assets.push({ key: 'gold' as keyof Allocation, label: 'Gold/Alternatives', return: '6%', risk: 'Low' });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio Allocation</h1>
        <p className="text-gray-600 mt-1">Adjust allocation and see outcomes instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Builder */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            {assets.map((asset) => (
              <div key={asset.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{asset.label}</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Return: {asset.return} • Risk: {asset.risk}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={allocation[asset.key]}
                      onChange={(e) => updateAllocation(asset.key, parseInt(e.target.value) || 0)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <Slider
                  value={[allocation[asset.key]]}
                  onValueChange={(value) => updateAllocation(asset.key, value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}

            {!showGold && (
              <button
                onClick={() => setShowGold(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Gold/Alternatives
              </button>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900">Total Allocation</div>
            <div className={`text-lg font-semibold ${total === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {total}%
            </div>
          </div>

          {total !== 100 && (
            <button
                onClick={autoBalance}
              className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Auto-Balance to 100%
            </button>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-900 font-medium">Deployment Policy</div>
            <div className="text-xs text-blue-800 mt-1">
              Allocation ranges may change over time based on market conditions, AI deployment signals, and risk controls.
            </div>
          </div>
        </div>

        {/* Portfolio Results */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Portfolio Results</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Expected Return (Gross)</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">{expectedReturn.toFixed(2)}%</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Borrowing Cost (Estimated)</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">{borrowCost.toFixed(2)}%</div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">Net Spread (After Interest)</div>
              <div className={`text-2xl font-semibold mt-1 ${netSpread > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netSpread > 0 ? '+' : ''}{netSpread.toFixed(2)}%
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">5-Year Net Gain</div>
              <div className="text-2xl font-semibold text-gray-900 mt-1">
                ${fiveYearGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Total Year-5 Wealth Value</div>
              <div className="text-2xl font-semibold text-blue-600 mt-1">
                ${totalWealth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/FinanceAdmin/liam')}
            className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View LIAM Net Gain Proof →
          </button>
        </div>
      </div>
    </div>
  );
}