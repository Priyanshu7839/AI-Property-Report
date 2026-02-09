import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const leadsByCategoryData = [
  { name: 'Mortgage', value: 287, color: '#3b82f6' },
  { name: 'Insurance', value: 156, color: '#10b981' },
  { name: 'Tax', value: 98, color: '#f59e0b' },
  { name: 'Agent', value: 213, color: '#8b5cf6' },
];

const leadsByStateData = [
  { state: 'CA', leads: 189 },
  { state: 'TX', leads: 142 },
  { state: 'NY', leads: 167 },
  { state: 'FL', leads: 134 },
  { state: 'WA', leads: 122 },
];

const conversionByPartnerData = [
  { partner: 'Empire Realty', conversion: 78 },
  { partner: 'Cascade Mortgage', conversion: 72 },
  { partner: 'Bay Area Insurance', conversion: 65 },
  { partner: 'Sunshine Mortgage', conversion: 58 },
  { partner: 'Lone Star Tax', conversion: 52 },
];

const topPartnersData = [
  { name: 'Empire Realty Advisors', revenue: 67200, leads: 156, conversion: 78 },
  { name: 'Cascade Mortgage Group', revenue: 42500, leads: 124, conversion: 72 },
  { name: 'Sunshine Mortgage Co', revenue: 34800, leads: 98, conversion: 58 },
  { name: 'Bay Area Insurance Pro', revenue: 18900, leads: 67, conversion: 65 },
  { name: 'Lone Star Tax Solutions', revenue: 12400, leads: 45, conversion: 52 },
];

export function ReportingScreen() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reporting</h1>
        <p className="text-sm text-gray-600 mt-1">Analytics and performance insights</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads by Category */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadsByCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadsByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by State */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads by State</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsByStateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="state" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="leads" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion by Partner */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion by Partner</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionByPartnerData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="partner" type="category" stroke="#6b7280" width={150} />
              <Tooltip />
              <Bar dataKey="conversion" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Partners Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Partners by Revenue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Partner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPartnersData.map((partner, index) => (
                <tr key={partner.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                      <span className="text-sm font-medium text-gray-900">{partner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${partner.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.leads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {partner.conversion}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${partner.conversion}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
