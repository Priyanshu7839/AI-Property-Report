import { useState } from "react";
import { DollarSign, TrendingUp, Edit2, Save, X } from "lucide-react";
import { MetricCard } from "../MetricCard";
import { DataTable } from "../DataTable";

export function RevenuePricing() {
  const [isEditingPricing, setIsEditingPricing] = useState(false);
  const [pricingData, setPricingData] = useState([
    {
      leadType: "Mortgage Lead",
      basePrice: 85,
      premiumZipMultiplier: 1.5,
      highValueMultiplier: 1.3,
      urgencyMultiplier: 1.2,
      tierAPricing: 85,
      tierBPricing: 65,
      tierCPricing: 45,
    },
    {
      leadType: "Insurance Lead",
      basePrice: 45,
      premiumZipMultiplier: 1.3,
      highValueMultiplier: 1.2,
      urgencyMultiplier: 1.15,
      tierAPricing: 45,
      tierBPricing: 35,
      tierCPricing: 25,
    },
    {
      leadType: "Real Estate Lead",
      basePrice: 125,
      premiumZipMultiplier: 1.8,
      highValueMultiplier: 1.5,
      urgencyMultiplier: 1.25,
      tierAPricing: 125,
      tierBPricing: 95,
      tierCPricing: 65,
    },
    {
      leadType: "Tax Advisor Lead",
      basePrice: 55,
      premiumZipMultiplier: 1.4,
      highValueMultiplier: 1.25,
      urgencyMultiplier: 1.1,
      tierAPricing: 55,
      tierBPricing: 40,
      tierCPricing: 30,
    },
    {
      leadType: "Financial Advisor Lead",
      basePrice: 95,
      premiumZipMultiplier: 1.6,
      highValueMultiplier: 1.4,
      urgencyMultiplier: 1.2,
      tierAPricing: 95,
      tierBPricing: 75,
      tierCPricing: 55,
    },
  ]);

  const changeLog = [
    {
      timestamp: "2026-01-24 14:32",
      user: "Super Admin",
      leadType: "Mortgage Lead",
      field: "Base Price",
      oldValue: "$80",
      newValue: "$85",
    },
    {
      timestamp: "2026-01-23 09:15",
      user: "Finance Director",
      leadType: "Real Estate Lead",
      field: "Tier A Pricing",
      oldValue: "$120",
      newValue: "$125",
    },
    {
      timestamp: "2026-01-22 16:48",
      user: "Super Admin",
      leadType: "Insurance Lead",
      field: "Premium ZIP Multiplier",
      oldValue: "1.25x",
      newValue: "1.3x",
    },
  ];

  const pricingTableColumns = [
    { key: "leadType", label: "Lead Type" },
    { key: "basePrice", label: "Base Price ($)" },
    { key: "premiumZipMultiplier", label: "Premium ZIP" },
    { key: "highValueMultiplier", label: "High Value" },
    { key: "urgencyMultiplier", label: "Urgency" },
    { key: "tierAPricing", label: "Tier A ($)" },
    { key: "tierBPricing", label: "Tier B ($)" },
    { key: "tierCPricing", label: "Tier C ($)" },
  ];

  const changeLogColumns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "user", label: "User" },
    { key: "leadType", label: "Lead Type" },
    { key: "field", label: "Field" },
    { key: "oldValue", label: "Old Value" },
    { key: "newValue", label: "New Value" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Revenue & Pricing
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Monetization controls and pricing configuration
          </p>
        </div>
        <button
          onClick={() => setIsEditingPricing(!isEditingPricing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            isEditingPricing
              ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isEditingPricing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Pricing
            </>
          )}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Avg Revenue Per Lead"
          value="$78"
          delta={{ value: 8.4, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Total Revenue (30D)"
          value="$847K"
          delta={{ value: 21.7, isPositive: true }}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Gross Margin"
          value="68.2%"
          delta={{ value: 2.1, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Price Changes (7D)"
          value="12"
          delta={{ value: -15.3, isPositive: false }}
          icon={<Edit2 className="w-6 h-6" />}
        />
      </div>

      {/* Revenue Forecast */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">Revenue Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Expected per 100 Leads</p>
            <p className="text-3xl font-semibold text-gray-900">$7,800</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Category Mix</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">57%</span> Mortgage
              </p>
              <p className="text-gray-700">
                <span className="font-medium">23%</span> Insurance
              </p>
              <p className="text-gray-700">
                <span className="font-medium">20%</span> Other
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Projected This Month</p>
            <p className="text-3xl font-semibold text-blue-600">$952K</p>
            <p className="text-sm text-green-600 mt-1">+12.4% vs forecast</p>
          </div>
        </div>
      </div>

      {/* Pricing Controls */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Pricing Controls</h2>
          {isEditingPricing && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
        <DataTable
          columns={pricingTableColumns}
          data={pricingData}
          renderCell={(key, value) => {
            if (key === "leadType") {
              return (
                <span className="font-medium text-gray-900">{value}</span>
              );
            }
            if (
              key === "premiumZipMultiplier" ||
              key === "highValueMultiplier" ||
              key === "urgencyMultiplier"
            ) {
              return <span className="text-gray-700">{value}x</span>;
            }
            if (isEditingPricing && key !== "leadType") {
              return (
                <input
                  type="number"
                  value={value}
                  step="0.01"
                  className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    // Handle pricing change
                  }}
                />
              );
            }
            return value;
          }}
        />
      </div>

      {/* Pricing Change Log */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">
          Pricing Change Log
        </h2>
        <DataTable columns={changeLogColumns} data={changeLog} />
      </div>
    </div>
  );
}
