import React, { useState } from 'react';
import { Search, Download, TrendingUp } from 'lucide-react';
import { mockComps } from '../RealEstatedata/RealEstatemockData';

export function RealEstateCompsAndPricing() {
  const [searchParams, setSearchParams] = useState({
    zip: '33131',
    beds: '3',
    baths: '2',
    sqft: '1800',
    radius: '1',
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Comps & Pricing</h1>
        <p className="text-sm text-gray-600 mt-1">Generate accurate market comparisons and pricing recommendations</p>
      </div>

      {/* Comps Search Panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Comparable Properties</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property ZIP</label>
            <input
              type="text"
              value={searchParams.zip}
              onChange={(e) => setSearchParams({ ...searchParams, zip: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
            <input
              type="number"
              value={searchParams.beds}
              onChange={(e) => setSearchParams({ ...searchParams, beds: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baths</label>
            <input
              type="number"
              value={searchParams.baths}
              onChange={(e) => setSearchParams({ ...searchParams, baths: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sq Ft</label>
            <input
              type="number"
              value={searchParams.sqft}
              onChange={(e) => setSearchParams({ ...searchParams, sqft: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Radius (mi)</label>
            <select
              value={searchParams.radius}
              onChange={(e) => setSearchParams({ ...searchParams, radius: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0.5">0.5 miles</option>
              <option value="1">1 mile</option>
              <option value="2">2 miles</option>
              <option value="5">5 miles</option>
            </select>
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Search className="w-5 h-5" />
          Search Comps
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comps Results Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Comparable Sales</h3>
              <p className="text-sm text-gray-600 mt-1">Recent sales in 33131 area</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sold Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sold Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sq Ft</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">$/Sq Ft</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Distance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockComps.map((comp) => (
                    <tr key={comp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comp.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${(comp.soldPrice / 1000).toFixed(0)}K
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{comp.soldDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comp.sqft.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${comp.pricePerSqft}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{comp.distance} mi</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500"
                              style={{ width: `${comp.similarityScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900">{comp.similarityScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Suggested Pricing Card */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Suggested Pricing</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Recommended List Price Range</p>
                <p className="text-3xl font-semibold text-gray-900">$835K – $895K</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Confidence Level</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '92%' }} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">92%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Expected Days on Market</span>
                  <span className="text-sm font-medium text-gray-900">15–25 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Market Temperature</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                    Warm
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Generate Pricing PDF
            </button>
          </div>

          {/* Market Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Market Insights</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Median sold price in area: $862K</li>
              <li>• Inventory levels: Low (2.1 months)</li>
              <li>• Avg time to close: 32 days</li>
              <li>• Price trend: +3.2% YoY</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
