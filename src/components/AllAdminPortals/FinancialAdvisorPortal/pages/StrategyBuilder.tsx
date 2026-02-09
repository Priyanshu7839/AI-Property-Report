import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

export function StrategyBuilder() {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');

  const strategies = [
    {
      id: 'basic',
      name: 'Basic Strategy',
      subtitle: 'Safe',
      returnRange: '4-6% annually',
      volatilityRisk: 'Low',
      netSpread: '1.5-3.5%',
      color: 'green'
    },
    {
      id: 'balanced',
      name: 'Balanced Strategy',
      subtitle: 'Default',
      returnRange: '6-9% annually',
      volatilityRisk: 'Medium',
      netSpread: '3-5%',
      color: 'blue'
    },
    {
      id: 'high-growth',
      name: 'High Growth Strategy',
      subtitle: '',
      returnRange: '9-12% annually',
      volatilityRisk: 'High',
      netSpread: '5-8%',
      color: 'purple'
    },
    {
      id: 'custom',
      name: 'Custom Strategy',
      subtitle: 'Manual',
      returnRange: 'Variable',
      volatilityRisk: 'Custom',
      netSpread: 'Custom',
      color: 'gray'
    }
  ];

  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Strategy Builder</h1>
        <p className="text-gray-600 mt-1">Create a homeowner-ready plan with transparent assumptions</p>
      </div>

      {/* Strategy Template Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy) => (
          <button
            key={strategy.id}
            onClick={() => setSelectedStrategy(strategy.id)}
            className={`p-5 border-2 rounded-lg text-left transition-all ${
              selectedStrategy === strategy.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                strategy.color === 'green' ? 'bg-green-100' :
                strategy.color === 'blue' ? 'bg-blue-100' :
                strategy.color === 'purple' ? 'bg-purple-100' :
                'bg-gray-100'
              }`}>
                <TrendingUp className={`w-5 h-5 ${
                  strategy.color === 'green' ? 'text-green-600' :
                  strategy.color === 'blue' ? 'text-blue-600' :
                  strategy.color === 'purple' ? 'text-purple-600' :
                  'text-gray-600'
                }`} />
              </div>
              {selectedStrategy === strategy.id && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-900 mb-1">{strategy.name}</div>
            {strategy.subtitle && (
              <div className="text-xs text-gray-600 mb-3">({strategy.subtitle})</div>
            )}
            <div className="space-y-1 text-sm">
              <div className="text-gray-600">Return: <span className="font-medium text-gray-900">{strategy.returnRange}</span></div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Strategy Details */}
      {selectedStrategyData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Strategy Overview: {selectedStrategyData.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Expected Annual Return</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{selectedStrategyData.returnRange}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-medium">Volatility Risk Band</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{selectedStrategyData.volatilityRisk}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Net Spread Estimate</span>
              </div>
              <div className="text-2xl font-semibold text-green-600">{selectedStrategyData.netSpread}</div>
            </div>
          </div>

          {/* Deployment Policy Note */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 mb-1">Deployment Policy</h3>
                <p className="text-sm text-amber-800">
                  Allocation ranges may change over time based on market conditions, AI deployment signals, and risk controls.
                  This strategy is a starting framework that will adapt to maximize net outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate('/FinanceAdmin/portfolio')}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              ✓ Proceed to Allocation
            </button>
            <button
              onClick={() => navigate('/FinanceAdmin/risk-profile')}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Risk Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}