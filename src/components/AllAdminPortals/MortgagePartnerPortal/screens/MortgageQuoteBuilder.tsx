import React, { useState } from 'react';
import { Info, Send, ChevronDown } from 'lucide-react';

export function MortgageQuoteBuilder() {
  const [quoteType, setQuoteType] = useState<'cash-out' | 'heloc' | 'hybrid'>('cash-out');
  const [inputs, setInputs] = useState({
    homeValue: 1250000,
    mortgageBalance: 625000,
    creditBand: '740+',
    occupancy: 'primary',
    loanTerm: '30Y',
    rateType: 'fixed',
    cashOut: 100000,
    originationFees: 1.5,
    closingCosts: 5000,
  });

  const calculateOffers = () => {
    const ltv = ((inputs.mortgageBalance + inputs.cashOut) / inputs.homeValue) * 100;
    
    return [
      {
        title: 'Best Monthly Payment',
        rate: 6.75,
        apr: 6.85,
        monthlyPayment: 4250,
        cashOut: 80000,
        totalCost: 255000,
      },
      {
        title: 'Maximum Cash-Out',
        rate: 7.125,
        apr: 7.25,
        monthlyPayment: 4890,
        cashOut: 150000,
        totalCost: 293400,
      },
      {
        title: 'Balanced',
        rate: 6.875,
        apr: 6.975,
        monthlyPayment: 4520,
        cashOut: inputs.cashOut,
        totalCost: 271200,
      },
    ];
  };

  const offers = calculateOffers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Quote Builder</h1>
        <p className="text-gray-600 mt-1">Generate an offer in under 2 minutes</p>
      </div>

      {/* Quote Type Toggle */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg w-fit">
        <button
          onClick={() => setQuoteType('cash-out')}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
            quoteType === 'cash-out'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Cash-Out Refinance
        </button>
        <button
          onClick={() => setQuoteType('heloc')}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
            quoteType === 'heloc'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          HELOC
        </button>
        <button
          onClick={() => setQuoteType('hybrid')}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
            quoteType === 'hybrid'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Hybrid Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Loan Parameters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Estimated Home Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.homeValue}
                    onChange={(e) => setInputs({ ...inputs, homeValue: Number(e.target.value) })}
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Mortgage Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.mortgageBalance}
                    onChange={(e) => setInputs({ ...inputs, mortgageBalance: Number(e.target.value) })}
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Borrower Credit Band
                </label>
                <div className="relative">
                  <select
                    value={inputs.creditBand}
                    onChange={(e) => setInputs({ ...inputs, creditBand: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="740+">Excellent (740+)</option>
                    <option value="700-739">Very Good (700-739)</option>
                    <option value="660-699">Good (660-699)</option>
                    <option value="620-659">Fair (620-659)</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Occupancy Type
                </label>
                <div className="relative">
                  <select
                    value={inputs.occupancy}
                    onChange={(e) => setInputs({ ...inputs, occupancy: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="primary">Primary Residence</option>
                    <option value="secondary">Second Home</option>
                    <option value="investment">Investment Property</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Loan Term
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInputs({ ...inputs, loanTerm: '30Y' })}
                    className={`flex-1 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                      inputs.loanTerm === '30Y'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    30 Year
                  </button>
                  <button
                    onClick={() => setInputs({ ...inputs, loanTerm: '15Y' })}
                    className={`flex-1 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                      inputs.loanTerm === '15Y'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    15 Year
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Rate Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInputs({ ...inputs, rateType: 'fixed' })}
                    className={`flex-1 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                      inputs.rateType === 'fixed'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Fixed
                  </button>
                  <button
                    onClick={() => setInputs({ ...inputs, rateType: 'adjustable' })}
                    className={`flex-1 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                      inputs.rateType === 'adjustable'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Adjustable
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Target Cash Out Amount: ${inputs.cashOut.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="5000"
                  value={inputs.cashOut}
                  onChange={(e) => setInputs({ ...inputs, cashOut: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$300k</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Offer Output */}
        <div className="space-y-4">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{offer.title}</h4>
                {index === 2 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    Recommended
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Rate</span>
                  <span className="text-lg font-semibold text-gray-900">{offer.rate}%</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">APR</span>
                  <span className="text-sm font-medium text-gray-700">{offer.apr}%</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Monthly Payment</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${offer.monthlyPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Cash-Out Amount</span>
                  <span className="text-sm font-semibold text-green-600">
                    ${(offer.cashOut / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-500">Total Cost (5 years)</span>
                    <span className="text-sm text-gray-700">
                      ${(offer.totalCost / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send This Offer
              </button>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-900">
                <p className="font-medium mb-1">How is this calculated?</p>
                <p className="text-blue-700 text-xs">
                  Rates based on current market conditions, borrower credit profile, LTV ratio, and property type.
                  Monthly payment includes principal + interest only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
