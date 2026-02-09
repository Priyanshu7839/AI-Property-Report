import { Check } from 'lucide-react';

interface QuoteOptionCardProps {
  title: string;
  subtitle?: string;
  monthlyPremium: number;
  annualPremium: number;
  deductible: number;
  coverageTier: string;
  estimatedSavings?: number;
  isRecommended?: boolean;
  features?: string[];
}

export function InsuranceQuoteOptionCard({
  title,
  subtitle,
  monthlyPremium,
  annualPremium,
  deductible,
  coverageTier,
  estimatedSavings,
  isRecommended = false,
  features = []
}: QuoteOptionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`relative bg-white border rounded-lg p-6 ${isRecommended ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
            Recommended
          </span>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-900">
            {formatCurrency(monthlyPremium)}
          </span>
          <span className="text-sm text-gray-600">/month</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formatCurrency(annualPremium)} annually
        </p>
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Deductible</span>
          <span className="font-medium text-gray-900">{formatCurrency(deductible)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Coverage Tier</span>
          <span className="font-medium text-gray-900">{coverageTier}</span>
        </div>
        {estimatedSavings && estimatedSavings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Est. Savings</span>
            <span className="font-medium text-green-600">
              {formatCurrency(estimatedSavings)}/yr
            </span>
          </div>
        )}
      </div>

      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
