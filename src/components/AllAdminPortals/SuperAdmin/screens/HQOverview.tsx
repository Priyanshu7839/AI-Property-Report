import { MetricCard } from "../MetricCard";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import { SLAChip } from "../SLAChip";
import {
  Users,
  FileText,
  Target,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Wallet,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export function HQOverview() {
  const kpis = [
    {
      label: "Active Users (30D)",
      value: "12,847",
      delta: { value: 18.2, isPositive: true },
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Reports Generated",
      value: "8,432",
      delta: { value: 24.5, isPositive: true },
      icon: <FileText className="w-6 h-6" />,
    },
    {
      label: "Leads Created",
      value: "3,215",
      delta: { value: 12.8, isPositive: true },
      icon: <Target className="w-6 h-6" />,
    },
    {
      label: "Leads Assigned",
      value: "3,104",
      delta: { value: 15.3, isPositive: true },
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      label: "Conversion Rate",
      value: "38.1%",
      delta: { value: 3.2, isPositive: true },
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      label: "Revenue (This Month)",
      value: "$847K",
      delta: { value: 21.7, isPositive: true },
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      label: "Pending Payouts",
      value: "$124K",
      delta: { value: -5.2, isPositive: false },
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      label: "SLA Breaches (30D)",
      value: "23",
      delta: { value: -42.1, isPositive: true },
      icon: <AlertTriangle className="w-6 h-6" />,
    },
  ];

  const funnelSteps = [
    { label: "Visit", value: "45.2K" },
    { label: "Property Search", value: "18.7K" },
    { label: "Report Viewed", value: "8.4K" },
    { label: "CTA Click", value: "4.2K" },
    { label: "Lead Created", value: "3.2K" },
    { label: "Partner Assigned", value: "3.1K" },
    { label: "Closed Won", value: "1.2K" },
  ];

  const revenueCategories = [
    { label: "Mortgage Leads", value: "$487K", color: "bg-blue-500" },
    { label: "Insurance Leads", value: "$189K", color: "bg-green-500" },
    { label: "Real Estate Leads", value: "$124K", color: "bg-purple-500" },
    { label: "Tax + Financial", value: "$47K", color: "bg-orange-500" },
  ];

  const todaysOperations = [
    {
      leadId: "LD-87432",
      type: "Mortgage",
      location: "CA 94102",
      value: "$1.2M",
      equity: "$340K",
      partner: "Wells Fargo",
      status: "Assigned",
      sla: "on-track",
    },
    {
      leadId: "LD-87431",
      type: "Insurance",
      location: "TX 78701",
      value: "$850K",
      equity: "$210K",
      partner: "State Farm",
      status: "Contacted",
      sla: "on-track",
    },
    {
      leadId: "LD-87430",
      type: "Real Estate",
      location: "NY 10001",
      value: "$2.4M",
      equity: "$780K",
      partner: "Compass RE",
      status: "Qualified",
      sla: "near-breach",
    },
    {
      leadId: "LD-87429",
      type: "Mortgage",
      location: "FL 33139",
      value: "$975K",
      equity: "$425K",
      partner: "Chase",
      status: "New",
      sla: "on-track",
    },
    {
      leadId: "LD-87428",
      type: "Tax Advisory",
      location: "WA 98101",
      value: "$1.8M",
      equity: "$520K",
      partner: "Deloitte",
      status: "Closed Won",
      sla: "on-track",
    },
  ];

  const tableColumns = [
    { key: "leadId", label: "Lead ID" },
    { key: "type", label: "Type" },
    { key: "location", label: "State/ZIP" },
    { key: "value", label: "Value" },
    { key: "equity", label: "Equity" },
    { key: "partner", label: "Assigned Partner" },
    { key: "status", label: "Status" },
    { key: "sla", label: "SLA" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          HQ Control Center
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Real-time operations and revenue performance for AIPropertyReport
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Funnel */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">
          Conversion Funnel
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto">
          {funnelSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-shrink-0 text-center">
                <p className="text-sm font-medium text-gray-900">
                  {step.label}
                </p>
                <p className="text-2xl font-semibold text-blue-600 mt-1">
                  {step.value}
                </p>
              </div>
              {index < funnelSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className={`w-10 h-10 ${category.color} rounded-lg mb-3`}></div>
            <p className="text-sm text-gray-600 mb-1">{category.label}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {category.value}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Operations */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">
          Today's Operations
        </h2>
        <DataTable
          columns={tableColumns}
          data={todaysOperations}
          renderCell={(key, value, row) => {
            if (key === "type") {
              return <StatusChip status={value} variant="info" />;
            }
            if (key === "status") {
              const variant =
                value === "Closed Won"
                  ? "success"
                  : value === "Qualified"
                  ? "info"
                  : "default";
              return <StatusChip status={value} variant={variant} />;
            }
            if (key === "sla") {
              return <SLAChip status={value} />;
            }
            return value;
          }}
        />
      </div>
    </div>
  );
}
