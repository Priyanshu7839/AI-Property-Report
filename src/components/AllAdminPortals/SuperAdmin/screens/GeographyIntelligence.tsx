import { useState } from "react";
import { MapPin, TrendingUp, DollarSign, Target } from "lucide-react";
import { DataTable } from "../DataTable";
import { SideDrawer } from "../SideDrawer";

export function GeographyIntelligence() {
  const [selectedZip, setSelectedZip] = useState<any>(null);

  const geographyData = [
    {
      state: "CA",
      county: "San Francisco",
      zip: "94102",
      leads: 487,
      conversion: "42.3%",
      avgValue: "$1.4M",
      avgEquity: "$425K",
      revenue: "$124K",
      dominantIntent: "Mortgage",
    },
    {
      state: "TX",
      county: "Travis",
      zip: "78701",
      leads: 342,
      conversion: "38.7%",
      avgValue: "$875K",
      avgEquity: "$210K",
      revenue: "$89K",
      dominantIntent: "Insurance",
    },
    {
      state: "NY",
      county: "New York",
      zip: "10001",
      leads: 523,
      conversion: "45.2%",
      avgValue: "$2.1M",
      avgEquity: "$680K",
      revenue: "$187K",
      dominantIntent: "Real Estate",
    },
    {
      state: "FL",
      county: "Miami-Dade",
      zip: "33139",
      leads: 298,
      conversion: "35.1%",
      avgValue: "$1.2M",
      avgEquity: "$380K",
      revenue: "$76K",
      dominantIntent: "Mortgage",
    },
    {
      state: "WA",
      county: "King",
      zip: "98101",
      leads: 412,
      conversion: "41.8%",
      avgValue: "$1.6M",
      avgEquity: "$520K",
      revenue: "$142K",
      dominantIntent: "Tax Advisory",
    },
    {
      state: "IL",
      county: "Cook",
      zip: "60601",
      leads: 367,
      conversion: "37.4%",
      avgValue: "$950K",
      avgEquity: "$275K",
      revenue: "$98K",
      dominantIntent: "Mortgage",
    },
    {
      state: "MA",
      county: "Suffolk",
      zip: "02108",
      leads: 445,
      conversion: "43.6%",
      avgValue: "$1.8M",
      avgEquity: "$610K",
      revenue: "$156K",
      dominantIntent: "Financial Advisory",
    },
  ];

  const tableColumns = [
    { key: "state", label: "State" },
    { key: "county", label: "County" },
    { key: "zip", label: "ZIP" },
    { key: "leads", label: "Leads" },
    { key: "conversion", label: "Conversion" },
    { key: "avgValue", label: "Avg Value" },
    { key: "avgEquity", label: "Avg Equity" },
    { key: "revenue", label: "Revenue" },
    { key: "dominantIntent", label: "Dominant Intent" },
  ];

  const statesSummary = [
    { state: "CA", leads: 1247, revenue: "$342K", avgConversion: "41.2%" },
    { state: "NY", leads: 1098, revenue: "$298K", avgConversion: "43.8%" },
    { state: "TX", leads: 876, revenue: "$234K", avgConversion: "37.5%" },
    { state: "FL", leads: 743, revenue: "$198K", avgConversion: "36.2%" },
    { state: "WA", leads: 687, revenue: "$221K", avgConversion: "40.7%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Geography Intelligence
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          State, county, and ZIP-level analytics and performance insights
        </p>
      </div>

      {/* Top States Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">
          Top Performing States
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statesSummary.map((state) => (
            <div
              key={state.state}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-blue-600">
                  {state.state}
                </span>
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {state.leads}
                  </span>{" "}
                  leads
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {state.revenue}
                  </span>{" "}
                  revenue
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {state.avgConversion}
                  </span>{" "}
                  conversion
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">
          Geographic Heatmap
        </h2>
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-700">
              Interactive Heatmap
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Visual representation of lead density and revenue by region
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Geography Table */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">
          Detailed Geography Breakdown
        </h2>
        <DataTable
          columns={tableColumns}
          data={geographyData}
          renderCell={(key, value, row) => {
            if (key === "zip") {
              return (
                <button
                  onClick={() => setSelectedZip(row)}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  {value}
                </button>
              );
            }
            if (key === "dominantIntent") {
              return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {value}
                </span>
              );
            }
            if (key === "revenue") {
              return <span className="font-semibold text-gray-900">{value}</span>;
            }
            return value;
          }}
        />
      </div>

      {/* ZIP Profile Drawer */}
      {selectedZip && (
        <SideDrawer
          isOpen={!!selectedZip}
          onClose={() => setSelectedZip(null)}
          title={`ZIP ${selectedZip.zip} Profile`}
        >
          <div className="space-y-6">
            {/* Location Header */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedZip.county} County, {selectedZip.state}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                ZIP {selectedZip.zip}
              </h3>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Target className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {selectedZip.leads}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {selectedZip.conversion}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-sm text-gray-600">Avg Property Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {selectedZip.avgValue}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-orange-600 mb-2" />
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {selectedZip.revenue}
                </p>
              </div>
            </div>

            {/* Top Lead Types */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Top Lead Types
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {selectedZip.dominantIntent}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[65%]"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      65%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Insurance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 w-[20%]"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      20%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Real Estate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 w-[15%]"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      15%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Partners */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Top Partners</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-900">Wells Fargo</p>
                  <p className="text-sm text-gray-600">142 leads • $38K revenue</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-900">Chase</p>
                  <p className="text-sm text-gray-600">98 leads • $27K revenue</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-900">State Farm</p>
                  <p className="text-sm text-gray-600">76 leads • $21K revenue</p>
                </div>
              </div>
            </div>

            {/* Pricing Multipliers */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Pricing Multipliers
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium ZIP Status</span>
                  <span className="font-medium text-green-600">Active (1.5x)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Value Properties</span>
                  <span className="font-medium text-gray-900">1.3x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgency Factor</span>
                  <span className="font-medium text-gray-900">1.2x</span>
                </div>
              </div>
            </div>
          </div>
        </SideDrawer>
      )}
    </div>
  );
}
