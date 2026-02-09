import { useState } from 'react';
import { Send, FileDown, Info } from 'lucide-react';
import { Button } from '../../../ui/button';
import { mockLeads } from '../Insurancedata/InsurancemockData';

interface QuoteWorkspaceProps {
  leadId?: string;
  onNavigate: (screen: string, leadId?: string) => void;
}

export function InsuranceQuoteWorkspace({ leadId = 'LD-2401', onNavigate }: QuoteWorkspaceProps) {
  const lead = mockLeads.find(l => l.id === leadId) || mockLeads[0];
  
  const [quoteInputs, setQuoteInputs] = useState({
    homeValue: lead.homeValue,
    deductible: 2500,
    coverageTier: 'Recommended',
    priorClaims: 'No',
    currentInsurer: '',
    currentPremium: lead.currentPremium || 0,
    propertyCondition: 'Good'
  });

  // Calculate quote options
  const calculateQuote = (tier: string, deductible: number) => {
    const baseRate = quoteInputs.homeValue * 0.004;
    const tierMultiplier = tier === 'Basic' ? 0.8 : tier === 'Premium' ? 1.2 : 1.0;
    const deductibleDiscount = deductible === 5000 ? 0.9 : deductible === 2500 ? 0.95 : 1.0;
    
    const annualPremium = Math.round(baseRate * tierMultiplier * deductibleDiscount);
    const monthlyPremium = Math.round(annualPremium / 12);
    const savings = quoteInputs.currentPremium ? Math.max(0, quoteInputs.currentPremium - annualPremium) : 0;
    
    return { monthlyPremium, annualPremium, savings };
  };

  const quoteOptions = [
    {
      name: 'Best Price',
      tier: 'Basic',
      ...calculateQuote('Basic', 5000),
      deductible: 5000,
      description: 'Essential coverage at the lowest cost'
    },
    {
      name: 'Recommended',
      tier: 'Recommended',
      ...calculateQuote('Recommended', 2500),
      deductible: 2500,
      description: 'Balanced coverage and value',
      recommended: true
    },
    {
      name: 'Best Coverage',
      tier: 'Premium',
      ...calculateQuote('Premium', 1000),
      deductible: 1000,
      description: 'Maximum protection and peace of mind'
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Quote Workspace</h1>
        <p className="text-gray-600 mt-1">Generate homeowner quotes quickly and clearly.</p>
        <p className="text-sm text-gray-500 mt-1">Lead ID: {lead.id} • {lead.location.zip}, {lead.location.state}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Quote Inputs */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Value
                </label>
                <input
                  type="number"
                  value={quoteInputs.homeValue}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, homeValue: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deductible
                </label>
                <select
                  value={quoteInputs.deductible}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, deductible: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1000}>$1,000</option>
                  <option value={2500}>$2,500</option>
                  <option value={5000}>$5,000</option>
                  <option value={10000}>$10,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Tier
                </label>
                <select
                  value={quoteInputs.coverageTier}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, coverageTier: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prior Claims?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priorClaims"
                      value="No"
                      checked={quoteInputs.priorClaims === 'No'}
                      onChange={(e) => setQuoteInputs({ ...quoteInputs, priorClaims: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priorClaims"
                      value="Yes"
                      checked={quoteInputs.priorClaims === 'Yes'}
                      onChange={(e) => setQuoteInputs({ ...quoteInputs, priorClaims: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Insurer (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., State Farm, Allstate"
                  value={quoteInputs.currentInsurer}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, currentInsurer: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Premium (Optional)
                </label>
                <input
                  type="number"
                  placeholder="Annual premium"
                  value={quoteInputs.currentPremium || ''}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, currentPremium: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Condition
                </label>
                <select
                  value={quoteInputs.propertyCondition}
                  onChange={(e) => setQuoteInputs({ ...quoteInputs, propertyCondition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Needs Work">Needs Work</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quote Options */}
        <div className="space-y-4">
          {quoteOptions.map((option) => (
            <div
              key={option.name}
              className={`bg-white border rounded-lg p-6 relative ${
                option.recommended ? 'border-blue-500 shadow-md' : 'border-gray-200'
              }`}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{option.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Monthly Premium</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${option.monthlyPremium}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Annual Premium</span>
                  <span className="font-semibold text-gray-900">${option.annualPremium.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deductible</span>
                  <span className="font-semibold text-gray-900">${option.deductible.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage Tier</span>
                  <span className="font-semibold text-gray-900">{option.tier}</span>
                </div>

                {option.savings > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated Savings</span>
                      <span className="text-lg font-bold text-green-600">
                        ${option.savings.toLocaleString()}/yr
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Send Quote to Homeowner
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <FileDown className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" className="w-full">
                  Attach to Lead
                </Button>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-900">
                  Savings estimates are based on homeowner-entered premium and market benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
