import { useState } from "react";
import {
  Home,
  Shield,
  Briefcase,
  Calculator,
  TrendingUp,
  Play,
  Pause,
  Edit,
  MapPin,
  Target,
  Clock,
  DollarSign,
  Award,
} from "lucide-react";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import { SideDrawer } from "../SideDrawer";

interface Partner {
  id: string;
  name: string;
  type: string;
  coverage: string;
  capacity: number;
  leadsReceived: number;
  closeRate: number;
  avgResponseTime: string;
  revenue: number;
  status: "Active" | "Paused";
}

const partnerTypes = [
  { id: "mortgage", label: "Mortgage Partners", icon: Home },
  { id: "insurance", label: "Insurance Partners", icon: Shield },
  { id: "realestate", label: "Real Estate Agents", icon: Briefcase },
  { id: "tax", label: "Tax Advisors", icon: Calculator },
  { id: "financial", label: "Financial Advisors", icon: TrendingUp },
];

const mockPartners: Partner[] = [
  {
    id: "P001",
    name: "Premier Mortgage Solutions",
    type: "Mortgage",
    coverage: "CA, NV, AZ (All Counties)",
    capacity: 50,
    leadsReceived: 127,
    closeRate: 34.5,
    avgResponseTime: "2.3 hrs",
    revenue: 127000,
    status: "Active",
  },
  {
    id: "P002",
    name: "HomeGuard Insurance Group",
    type: "Insurance",
    coverage: "TX, OK (Select ZIPs)",
    capacity: 30,
    leadsReceived: 89,
    closeRate: 41.2,
    avgResponseTime: "1.7 hrs",
    revenue: 89000,
    status: "Active",
  },
  {
    id: "P003",
    name: "Elite Realty Partners",
    type: "Real Estate",
    coverage: "FL (Miami-Dade, Broward)",
    capacity: 40,
    leadsReceived: 102,
    closeRate: 28.4,
    avgResponseTime: "3.1 hrs",
    revenue: 204000,
    status: "Active",
  },
  {
    id: "P004",
    name: "TaxWise Advisors LLC",
    type: "Tax",
    coverage: "NY, NJ, CT (Statewide)",
    capacity: 25,
    leadsReceived: 43,
    closeRate: 52.3,
    avgResponseTime: "4.2 hrs",
    revenue: 43000,
    status: "Paused",
  },
  {
    id: "P005",
    name: "Wealth Navigator Financial",
    type: "Financial",
    coverage: "WA, OR (Metro Areas)",
    capacity: 35,
    leadsReceived: 67,
    closeRate: 38.8,
    avgResponseTime: "2.8 hrs",
    revenue: 67000,
    status: "Active",
  },
];

export function PartnerNetwork() {
  const [activeTab, setActiveTab] = useState("mortgage");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const columns = [
    { key: "name", label: "Partner Name" },
    { key: "coverage", label: "Coverage" },
    { key: "capacity", label: "Lead Capacity" },
    { key: "leadsReceived", label: "Leads Received" },
    { key: "closeRate", label: "Close Rate" },
    { key: "avgResponseTime", label: "Avg Response" },
    { key: "revenue", label: "Revenue" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const renderCell = (partner: Partner, key: string) => {
    switch (key) {
      case "name":
        return (
          <div>
            <p className="font-medium text-gray-900">{partner.name}</p>
            <p className="text-xs text-gray-500">{partner.id}</p>
          </div>
        );
      case "closeRate":
        return <span className="font-semibold">{partner.closeRate}%</span>;
      case "revenue":
        return (
          <span className="font-semibold">
            ${(partner.revenue / 1000).toFixed(0)}K
          </span>
        );
      case "status":
        return (
          <StatusChip
            status={partner.status === "Active" ? "active" : "paused"}
            label={partner.status}
          />
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPartner(partner)}
              className="p-1.5 hover:bg-gray-100 rounded"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              {partner.status === "Active" ? (
                <Pause className="w-4 h-4 text-gray-600" />
              ) : (
                <Play className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        );
      default:
        return partner[key as keyof Partner];
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Partner Network
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage partner directory, territories, performance, and pricing
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          {partnerTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors ${
                  activeTab === type.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Partner Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <DataTable
          columns={columns}
          data={mockPartners}
          renderCell={renderCell}
        />
      </div>

      {/* Partner Detail Drawer */}
      <SideDrawer
        isOpen={selectedPartner !== null}
        onClose={() => setSelectedPartner(null)}
        title={selectedPartner?.name || "Partner Details"}
      >
        {selectedPartner && (
          <div className="space-y-6">
            {/* Partner Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Partner Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Partner ID:</span>
                  <span className="font-medium">{selectedPartner.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedPartner.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusChip
                    status={
                      selectedPartner.status === "Active" ? "active" : "paused"
                    }
                    label={selectedPartner.status}
                  />
                </div>
              </div>
            </div>

            {/* Territory */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Territory Coverage
              </h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                {selectedPartner.coverage}
              </p>
            </div>

            {/* Performance */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      Leads Received
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPartner.leadsReceived}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">Close Rate</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPartner.closeRate}%
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      Avg Response
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPartner.avgResponseTime}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">Revenue</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    ${(selectedPartner.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Pricing Per Lead
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-semibold">$250</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Premium ZIP Multiplier:</span>
                  <span className="font-semibold">1.5x</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">High-Value Multiplier:</span>
                  <span className="font-semibold">2.0x</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Edit Pricing
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                {selectedPartner.status === "Active"
                  ? "Pause Partner"
                  : "Activate Partner"}
              </button>
            </div>
          </div>
        )}
      </SideDrawer>
    </div>
  );
}
