import { DollarSign, Wallet, TrendingUp, Download, Eye } from "lucide-react";
import { MetricCard } from "../MetricCard";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";

export function PayoutsInvoices() {
  const invoices = [
    {
      invoiceId: "INV-2024-8432",
      partner: "Wells Fargo",
      amount: "$12,450",
      status: "Paid",
      date: "2026-01-20",
    },
    {
      invoiceId: "INV-2024-8431",
      partner: "State Farm",
      amount: "$8,750",
      status: "Paid",
      date: "2026-01-20",
    },
    {
      invoiceId: "INV-2024-8430",
      partner: "Compass RE",
      amount: "$18,900",
      status: "Pending",
      date: "2026-01-22",
    },
    {
      invoiceId: "INV-2024-8429",
      partner: "Chase",
      amount: "$14,200",
      status: "Pending",
      date: "2026-01-23",
    },
    {
      invoiceId: "INV-2024-8428",
      partner: "Deloitte",
      amount: "$6,450",
      status: "Processing",
      date: "2026-01-24",
    },
  ];

  const payouts = [
    {
      partner: "Wells Fargo",
      amountDue: "$12,450",
      amountPaid: "$12,450",
      nextPayoutDate: "2026-02-01",
      status: "Current",
    },
    {
      partner: "State Farm",
      amountDue: "$8,750",
      amountPaid: "$8,750",
      nextPayoutDate: "2026-02-01",
      status: "Current",
    },
    {
      partner: "Compass RE",
      amountDue: "$24,500",
      amountPaid: "$18,900",
      nextPayoutDate: "2026-02-05",
      status: "Pending",
    },
    {
      partner: "Chase",
      amountDue: "$19,800",
      amountPaid: "$14,200",
      nextPayoutDate: "2026-02-08",
      status: "Pending",
    },
    {
      partner: "Deloitte",
      amountDue: "$11,200",
      amountPaid: "$6,450",
      nextPayoutDate: "2026-02-10",
      status: "Processing",
    },
  ];

  const invoiceColumns = [
    { key: "invoiceId", label: "Invoice ID" },
    { key: "partner", label: "Partner" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "actions", label: "Actions" },
  ];

  const payoutColumns = [
    { key: "partner", label: "Partner" },
    { key: "amountDue", label: "Amount Due" },
    { key: "amountPaid", label: "Amount Paid" },
    { key: "nextPayoutDate", label: "Next Payout Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Payouts & Invoices
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Financial transactions and partner payment management
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Finance Pack
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue Collected"
          value="$847K"
          delta={{ value: 21.7, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          label="Pending Payouts"
          value="$124K"
          delta={{ value: -5.2, isPositive: false }}
          icon={<Wallet className="w-6 h-6" />}
        />
        <MetricCard
          label="Paid Payouts"
          value="$547K"
          delta={{ value: 18.3, isPositive: true }}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Margin (Revenue - Payouts)"
          value="$300K"
          delta={{ value: 12.5, isPositive: true }}
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>

      {/* Financial Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">
          Financial Overview (This Month)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Gross Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">$847,200</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Partner Payouts</p>
            <p className="text-2xl font-semibold text-orange-600">-$547,300</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Net Margin</p>
            <p className="text-2xl font-semibold text-green-600">$299,900</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Margin %</p>
            <p className="text-2xl font-semibold text-blue-600">35.4%</p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Invoices</h2>
        <DataTable
          columns={invoiceColumns}
          data={invoices}
          renderCell={(key, value, row) => {
            if (key === "status") {
              const variant =
                value === "Paid"
                  ? "success"
                  : value === "Processing"
                  ? "warning"
                  : "default";
              return <StatusChip status={value} variant={variant} />;
            }
            if (key === "actions") {
              return (
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              );
            }
            return value;
          }}
        />
      </div>

      {/* Payouts Table */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Payout Schedule</h2>
        <DataTable
          columns={payoutColumns}
          data={payouts}
          renderCell={(key, value) => {
            if (key === "status") {
              const variant =
                value === "Current"
                  ? "success"
                  : value === "Processing"
                  ? "warning"
                  : "default";
              return <StatusChip status={value} variant={variant} />;
            }
            if (key === "amountDue" || key === "amountPaid") {
              return <span className="font-medium text-gray-900">{value}</span>;
            }
            return value;
          }}
        />
      </div>
    </div>
  );
}
