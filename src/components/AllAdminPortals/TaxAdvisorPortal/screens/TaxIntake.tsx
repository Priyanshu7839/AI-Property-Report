import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export function TaxIntake() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Tax Intake Questionnaire</h1>
        <p className="text-gray-600 mt-2">Collect the minimum required tax context before giving advice.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-8">
            {/* Section A: Filing Basics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Section A: Filing Basics</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filing Status
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Single</option>
                    <option>Married Filing Jointly</option>
                    <option>Married Filing Separately</option>
                    <option>Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State of Residence
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>California</option>
                    <option>Texas</option>
                    <option>New York</option>
                    <option>Florida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approximate Income Range
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Under $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000 - $200,000</option>
                    <option>$200,000 - $500,000</option>
                    <option>Over $500,000</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="own-property"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="own-property" className="text-sm text-gray-700">
                    Own vs invest property
                  </label>
                </div>
              </div>
            </div>

            {/* Section B: Property Context */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Section B: Property Context</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Primary Residence</option>
                    <option>Rental Property</option>
                    <option>Second Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years Owned
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Cost Basis (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="$350,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Improvements Spent (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="$75,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Income Per Year (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="$36,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Intent & Timing */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Section C: Intent & Timing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Within
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>0-30 days</option>
                    <option>30-90 days</option>
                    <option>90+ days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refinance Interest
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="refinance" value="yes" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="refinance" value="no" className="text-blue-600" />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equity Unlock Intent
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="equity" value="yes" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="equity" value="no" className="text-blue-600" />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section D: Tax Topics */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Section D: Tax Topics</h2>
              <div className="space-y-3">
                {[
                  'Capital gains planning',
                  'Exclusion eligibility guidance',
                  'Depreciation recapture (if rental)',
                  'Interest deductibility (mortgage/HELOC)',
                  'Investment tax impact',
                ].map((topic) => (
                  <label key={topic} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{topic}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                ✓ Send Intake to Homeowner
              </button>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Completion Status</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Intake Completion</span>
                <span className="text-sm font-semibold text-blue-600">60%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-900">Section A completed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-900">Section B completed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Circle className="w-5 h-5 text-gray-300" />
                <span className="text-gray-500">Section C pending</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Circle className="w-5 h-5 text-gray-300" />
                <span className="text-gray-500">Section D pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
