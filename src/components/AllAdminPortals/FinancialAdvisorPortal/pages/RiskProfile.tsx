import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export function RiskProfile() {
  const navigate = useNavigate();
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [investmentHorizon, setInvestmentHorizon] = useState('5Y');
  const [paymentComfort, setPaymentComfort] = useState<string[]>([]);
  const [cashReserve, setCashReserve] = useState('10');
  const [volatilityComfort, setVolatilityComfort] = useState('medium');
  const [cryptoExposure, setCryptoExposure] = useState('low');

  const getRiskLabel = () => {
    if (riskTolerance < 33) return 'Conservative';
    if (riskTolerance < 66) return 'Balanced';
    return 'Growth';
  };

  const getRecommendedStrategy = () => {
    if (riskTolerance < 33) return 'Basic (Stable)';
    if (riskTolerance < 66) return 'Popular (Balanced)';
    return 'High Growth';
  };

  const handleSave = () => {
    alert('Risk Profile Saved!');
    navigate('/FinanceAdmin//strategy-builder');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Risk Profile</h1>
        <p className="text-gray-600 mt-1">Quickly classify homeowner risk tolerance and constraints</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Risk Tolerance Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Tolerance: <span className="text-blue-600 font-semibold">{getRiskLabel()}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Growth</span>
          </div>
        </div>

        {/* Investment Horizon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Investment Horizon</label>
          <div className="flex gap-3">
            {['1Y', '3Y', '5Y', '10Y'].map((horizon) => (
              <button
                key={horizon}
                onClick={() => setInvestmentHorizon(horizon)}
                className={`flex-1 px-4 py-2 border rounded-lg font-medium transition-colors ${
                  investmentHorizon === horizon
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {horizon}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Cashflow Comfort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Cashflow Comfort</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paymentComfort.includes('interest-only')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPaymentComfort([...paymentComfort, 'interest-only']);
                  } else {
                    setPaymentComfort(paymentComfort.filter(p => p !== 'interest-only'));
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Interest-only payments are okay</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paymentComfort.includes('fixed-monthly')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPaymentComfort([...paymentComfort, 'fixed-monthly']);
                  } else {
                    setPaymentComfort(paymentComfort.filter(p => p !== 'fixed-monthly'));
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Prefer fixed monthly payment</span>
            </label>
          </div>
        </div>

        {/* Liquidity Needs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Liquidity Needs (Cash Reserve)</label>
          <div className="flex gap-3">
            {['5', '10', '20'].map((percent) => (
              <button
                key={percent}
                onClick={() => setCashReserve(percent)}
                className={`flex-1 px-4 py-2 border rounded-lg font-medium transition-colors ${
                  cashReserve === percent
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Volatility Comfort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Volatility Comfort</label>
          <div className="flex gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setVolatilityComfort(level)}
                className={`flex-1 px-4 py-2 border rounded-lg font-medium capitalize transition-colors ${
                  volatilityComfort === level
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Crypto Exposure Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Crypto Exposure Preference</label>
          <div className="flex gap-3">
            {['none', 'low', 'moderate'].map((level) => (
              <button
                key={level}
                onClick={() => setCryptoExposure(level)}
                className={`flex-1 px-4 py-2 border rounded-lg font-medium capitalize transition-colors ${
                  cryptoExposure === level
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            ✓ Save Risk Profile
          </button>
        </div>
      </div>

      {/* Recommended Strategy Type */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Recommended Strategy Type</h3>
            <div className="text-blue-800">
              Based on this risk profile: <span className="font-semibold">{getRecommendedStrategy()}</span>
            </div>
            <p className="text-sm text-blue-700 mt-2">
              This recommendation balances the homeowner's risk tolerance with their investment horizon and liquidity needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}