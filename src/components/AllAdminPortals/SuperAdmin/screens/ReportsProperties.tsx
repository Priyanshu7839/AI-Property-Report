import { useState } from "react";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import { SideDrawer } from "../SideDrawer";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Eye,
  Home,
  DollarSign,
} from "lucide-react";

export function ReportsProperties() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const properties = [
    {
      date: "2026-01-24",
      address: "123 Market St, San Francisco",
      zip: "94102",
      county: "San Francisco",
      state: "CA",
      estValue: "$1,245,000",
      equity: "$340,000",
      opportunityScore: 87,
      confidence: 94,
      userEmail: "sarah.j***@gmail.com",
      leadCreated: "Yes",
    },
    {
      date: "2026-01-24",
      address: "456 Congress Ave, Austin",
      zip: "78701",
      county: "Travis",
      state: "TX",
      estValue: "$875,000",
      equity: "$210,000",
      opportunityScore: 72,
      confidence: 89,
      userEmail: "michael.c***@yahoo.com",
      leadCreated: "Yes",
    },
    {
      date: "2026-01-24",
      address: "789 Broadway, New York",
      zip: "10001",
      county: "New York",
      state: "NY",
      estValue: "$2,450,000",
      equity: "$780,000",
      opportunityScore: 95,
      confidence: 92,
      userEmail: "jennifer.w***@outlook.com",
      leadCreated: "No",
    },
    {
      date: "2026-01-23",
      address: "321 Ocean Dr, Miami Beach",
      zip: "33139",
      county: "Miami-Dade",
      state: "FL",
      estValue: "$1,120,000",
      equity: "$425,000",
      opportunityScore: 81,
      confidence: 90,
      userEmail: "david.m***@gmail.com",
      leadCreated: "Yes",
    },
    {
      date: "2026-01-23",
      address: "555 Pike St, Seattle",
      zip: "98101",
      county: "King",
      state: "WA",
      estValue: "$1,850,000",
      equity: "$520,000",
      opportunityScore: 88,
      confidence: 96,
      userEmail: "lisa.r***@gmail.com",
      leadCreated: "Yes",
    },
  ];

  const columns = [
    { key: "date", label: "Date" },
    { key: "address", label: "Property Address" },
    { key: "zip", label: "ZIP" },
    { key: "state", label: "State" },
    { key: "estValue", label: "Est Value" },
    { key: "equity", label: "Unlockable Equity" },
    { key: "opportunityScore", label: "Opportunity Score" },
    { key: "confidence", label: "Confidence" },
    { key: "userEmail", label: "User Email" },
    { key: "leadCreated", label: "Lead Created" },
  ];

  const modelHealth = [
    { label: "Avg Confidence Score", value: "92.4%", trend: "up" },
    { label: "Accuracy Metric", value: "94.1%", trend: "up" },
    { label: "Anomalies Flagged", value: "3", trend: "down" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Reports & Properties
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Performance intelligence and valuation quality metrics
        </p>
      </div>

      {/* Model Health Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modelHealth.map((metric, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  metric.trend === "up"
                    ? "bg-green-50"
                    : metric.trend === "down"
                    ? "bg-red-50"
                    : "bg-gray-50"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Properties Table */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">
          Properties Viewed
        </h2>
        <DataTable
          columns={columns}
          data={properties}
          renderCell={(key, value, row) => {
            if (key === "opportunityScore") {
              const score = parseInt(value);
              const color =
                score >= 85
                  ? "text-green-600"
                  : score >= 70
                  ? "text-blue-600"
                  : "text-gray-600";
              return <span className={`font-semibold ${color}`}>{value}</span>;
            }
            if (key === "confidence") {
              return <span className="font-semibold text-gray-900">{value}%</span>;
            }
            if (key === "leadCreated") {
              return (
                <StatusChip
                  status={value}
                  variant={value === "Yes" ? "success" : "default"}
                />
              );
            }
            if (key === "address") {
              return (
                <button
                  onClick={() => setSelectedProperty(row)}
                  className="text-blue-600 hover:underline text-left"
                >
                  {value}
                </button>
              );
            }
            return value;
          }}
        />
      </div>

      {/* Property Drilldown Drawer */}
      {selectedProperty && (
        <SideDrawer
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          title="Property Details"
        >
          <div className="space-y-6">
            {/* Property Overview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedProperty.address}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedProperty.zip}, {selectedProperty.county} County,{" "}
                    {selectedProperty.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Valuation Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Valuation Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Estimated Value
                  </span>
                  <span className="font-semibold text-gray-900">
                    {selectedProperty.estValue}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Unlockable Equity
                  </span>
                  <span className="font-semibold text-green-600">
                    {selectedProperty.equity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Opportunity Score
                  </span>
                  <span className="font-semibold text-blue-600">
                    {selectedProperty.opportunityScore}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Report Confidence
                  </span>
                  <span className="font-semibold text-gray-900">
                    {selectedProperty.confidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* Report Metrics */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Report Metrics
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Modules Used</span>
                  <span className="text-gray-900">
                    Valuation, Equity, LIAM, Tax
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time on Report</span>
                  <span className="text-gray-900">8 min 34 sec</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">CTAs Clicked</span>
                  <span className="text-gray-900">3</span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">User Info</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900">
                    {selectedProperty.userEmail}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lead Created</span>
                  <StatusChip
                    status={selectedProperty.leadCreated}
                    variant={
                      selectedProperty.leadCreated === "Yes"
                        ? "success"
                        : "default"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </SideDrawer>
      )}
    </div>
  );
}
