import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../../ui/button';

interface PolicyComparisonProps {
  onNavigate: (screen: string) => void;
}

export function InsurancePolicyComparison({ onNavigate }: PolicyComparisonProps) {
  const comparisonData = [
    { component: 'Dwelling Coverage', current: '$450,000', yourQuote: '$485,000', highlight: true },
    { component: 'Other Structures', current: '$45,000', yourQuote: '$48,500', highlight: false },
    { component: 'Personal Property', current: '$225,000', yourQuote: '$242,500', highlight: true },
    { component: 'Loss of Use', current: '$90,000', yourQuote: '$97,000', highlight: true },
    { component: 'Personal Liability', current: '$100,000', yourQuote: '$300,000', highlight: true },
    { component: 'Medical Payments', current: '$1,000', yourQuote: '$5,000', highlight: true },
    { component: 'Deductible', current: '$2,500', yourQuote: '$2,500', highlight: false },
    { component: 'Annual Premium', current: '$2,400', yourQuote: '$1,980', highlight: true }
  ];

  const keyDifferences = [
    { text: 'Lower premium by $420/year', icon: CheckCircle, color: 'green' },
    { text: 'Better liability coverage (+$200k)', icon: CheckCircle, color: 'green' },
    { text: 'Higher medical payments coverage', icon: CheckCircle, color: 'green' },
    { text: 'Bundling available with auto insurance', icon: CheckCircle, color: 'green' }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Policy Comparison</h1>
        <p className="text-gray-600 mt-1">Show homeowners why they should switch to your coverage.</p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Coverage Component
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Current Policy
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 bg-blue-50">
                  Your Quote (Recommended)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={row.highlight ? 'bg-blue-50/30' : ''}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.component}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.current}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-700">
                    {row.yourQuote}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {row.highlight && (
                      <span className="inline-flex items-center gap-1 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Improved</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Differences */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Differences</h2>
          
          <div className="space-y-3">
            {keyDifferences.map((diff, idx) => {
              const Icon = diff.icon;
              const colorClasses = {
                green: 'bg-green-50 border-green-200 text-green-700',
                blue: 'bg-blue-50 border-blue-200 text-blue-700'
              };
              
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 border rounded-lg ${colorClasses[diff.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{diff.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Annual Savings Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Annual Premium:</span>
                <span className="font-semibold text-gray-900">$2,400</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Your Quoted Premium:</span>
                <span className="font-semibold text-blue-700">$1,980</span>
              </div>
              <div className="pt-3 mt-3 border-t border-green-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total Savings:</span>
                  <span className="text-2xl font-bold text-green-700">$420/yr</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  That's $35/month in savings while getting better coverage
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Send to Homeowner</h3>
            
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Send Comparison to Homeowner
              </Button>
              
              <Button variant="outline" className="w-full">
                Export as PDF
              </Button>

              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-900">
                  This comparison will be sent as a professional PDF with your branding and contact information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
