import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from '../../../ui/input';
import { Download } from 'lucide-react';

const projectionData = [
  { year: 0, homeOnly: 250000, optimized: 250000 },
  { year: 1, homeOnly: 255000, optimized: 262500 },
  { year: 2, homeOnly: 260100, optimized: 276563 },
  { year: 3, homeOnly: 265302, optimized: 291643 },
  { year: 4, homeOnly: 270608, optimized: 307803 },
  { year: 5, homeOnly: 276020, optimized: 325115 },
];

export function LIAMModel() {
  const [inputs, setInputs] = useState({
    homeValue: 850000,
    unlockAmount: 250000,
    borrowRate: 7.5,
    taxes: 22,
    homeAppreciation: 2.0,
  });

  const updateInput = (key: string, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const portfolioGrowth = inputs.unlockAmount * 0.10;
  const borrowCost = inputs.unlockAmount * (inputs.borrowRate / 100);
  const taxDrag = portfolioGrowth * (inputs.taxes / 100);
  const homeGrowth = inputs.homeValue * (inputs.homeAppreciation / 100);
  const netGain = portfolioGrowth - borrowCost - taxDrag;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">LIAM Net Gain Model</h1>
        <p className="text-gray-600 mt-1">Transparent math: returns − interest − taxes + home appreciation</p>
      </div>

      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Value ($)</label>
            <Input
              type="number"
              value={inputs.homeValue}
              onChange={(e) => updateInput('homeValue', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Amount ($)</label>
            <Input
              type="number"
              value={inputs.unlockAmount}
              onChange={(e) => updateInput('unlockAmount', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Borrowing Rate (%)</label>
            <Input
              type="number"
              step="0.1"
              value={inputs.borrowRate}
              onChange={(e) => updateInput('borrowRate', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Est. Taxes (%)</label>
            <Input
              type="number"
              value={inputs.taxes}
              onChange={(e) => updateInput('taxes', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Appreciation (%)</label>
            <Input
              type="number"
              step="0.1"
              value={inputs.homeAppreciation}
              onChange={(e) => updateInput('homeAppreciation', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Breakdown Table (Year 1)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Component</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Amount</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">% of Unlock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Portfolio Growth (Gross)</td>
                <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">
                  +${portfolioGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-600">
                  {((portfolioGrowth / inputs.unlockAmount) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Borrowing Interest Cost</td>
                <td className="px-6 py-4 text-sm text-right text-red-600 font-medium">
                  -${borrowCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-600">
                  {((borrowCost / inputs.unlockAmount) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Tax Drag Estimate</td>
                <td className="px-6 py-4 text-sm text-right text-red-600 font-medium">
                  -${taxDrag.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-600">
                  {((taxDrag / inputs.unlockAmount) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Home Appreciation Retained</td>
                <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">
                  +${homeGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-600">
                  {((homeGrowth / inputs.homeValue) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">Net Gain from Optimization</td>
                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">
                  ${netGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                  {((netGain / inputs.unlockAmount) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">5-Year Projection</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="year"
                label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                stroke="#6b7280"
              />
              <YAxis
                label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                stroke="#6b7280"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="homeOnly"
                name="Home-Only Growth"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={{ fill: '#9ca3af', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="optimized"
                name="Optimized Strategy Total"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-xs text-gray-600 italic">
            Outputs are directional estimates. Final terms depend on lender underwriting and market conditions.
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export LIAM Breakdown PDF
        </button>
      </div>
    </div>
  );
}
