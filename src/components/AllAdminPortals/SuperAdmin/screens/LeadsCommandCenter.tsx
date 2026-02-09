import { useState } from "react";
import { MetricCard } from "../MetricCard";
import { KanbanBoard } from "../KanbanBoard";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import { SLAChip } from "../SLAChip";
import { SideDrawer } from "../SideDrawer";
import {
  Target,
  UserPlus,
  CheckCircle2,
  XCircle,
  DollarSign,
  Layers,
} from "lucide-react";

export function LeadsCommandCenter() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const kpis = [
    {
      label: "Total Leads",
      value: "3,215",
      delta: { value: 12.8, isPositive: true },
      icon: <Target className="w-6 h-6" />,
    },
    {
      label: "Unassigned",
      value: "111",
      delta: { value: -8.3, isPositive: true },
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      label: "Assigned",
      value: "3,104",
      delta: { value: 15.3, isPositive: true },
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      label: "Closed Won",
      value: "1,247",
      delta: { value: 18.5, isPositive: true },
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      label: "Closed Lost",
      value: "342",
      delta: { value: -12.1, isPositive: true },
      icon: <XCircle className="w-6 h-6" />,
    },
    {
      label: "Revenue Total",
      value: "$847K",
      delta: { value: 21.7, isPositive: true },
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  const kanbanColumns = [
    { id: "new", title: "New", color: "bg-gray-100" },
    { id: "assigned", title: "Assigned", color: "bg-blue-100" },
    { id: "contacted", title: "Contacted", color: "bg-yellow-100" },
    { id: "qualified", title: "Qualified", color: "bg-purple-100" },
    { id: "closed", title: "Closed Won / Lost", color: "bg-green-100" },
  ];

  const leads = [
    {
      id: "LD-87432",
      type: "Mortgage",
      location: "CA 94102",
      value: "$1.2M",
      equity: "$340K",
      partner: "Wells Fargo",
      status: "Assigned",
      stage: "assigned",
      sla: "on-track",
      email: "sarah.j***@gmail.com",
      date: "2026-01-24",
    },
    {
      id: "LD-87431",
      type: "Insurance",
      location: "TX 78701",
      value: "$850K",
      equity: "$210K",
      partner: "State Farm",
      status: "Contacted",
      stage: "contacted",
      sla: "on-track",
      email: "michael.c***@yahoo.com",
      date: "2026-01-24",
    },
    {
      id: "LD-87430",
      type: "Real Estate",
      location: "NY 10001",
      value: "$2.4M",
      equity: "$780K",
      partner: "Compass RE",
      status: "Qualified",
      stage: "qualified",
      sla: "near-breach",
      email: "jennifer.w***@outlook.com",
      date: "2026-01-24",
    },
    {
      id: "LD-87429",
      type: "Mortgage",
      location: "FL 33139",
      value: "$975K",
      equity: "$425K",
      partner: "Chase",
      status: "New",
      stage: "new",
      sla: "on-track",
      email: "david.m***@gmail.com",
      date: "2026-01-24",
    },
    {
      id: "LD-87428",
      type: "Tax Advisory",
      location: "WA 98101",
      value: "$1.8M",
      equity: "$520K",
      partner: "Deloitte",
      status: "Closed Won",
      stage: "closed",
      sla: "on-track",
      email: "lisa.r***@gmail.com",
      date: "2026-01-23",
    },
  ];

  const tableColumns = [
    { key: "id", label: "Lead ID" },
    { key: "date", label: "Date" },
    { key: "email", label: "Email" },
    { key: "type", label: "Type" },
    { key: "location", label: "Location" },
    { key: "value", label: "Value" },
    { key: "partner", label: "Partner" },
    { key: "status", label: "Status" },
    { key: "sla", label: "SLA" },
  ];

  // Organize leads by stage for Kanban view
  const getKanbanColumns = () => {
    return kanbanColumns.map((col) => ({
      ...col,
      count: leads.filter((lead) => lead.stage === col.id).length,
      items: leads.filter((lead) => lead.stage === col.id),
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Leads Command Center
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Global pipeline management and operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "kanban"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Kanban
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "table"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Pipeline View */}
      {viewMode === "kanban" ? (
        <KanbanBoard
          columns={getKanbanColumns()}
          onItemClick={(lead) => setSelectedLead(lead)}
        />
      ) : (
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">All Leads</h2>
          <DataTable
            columns={tableColumns}
            data={leads}
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
              if (key === "id") {
                return (
                  <button
                    onClick={() => setSelectedLead(row)}
                    className="text-blue-600 hover:underline"
                  >
                    {value}
                  </button>
                );
              }
              return value;
            }}
          />
        </div>
      )}

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <SideDrawer
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={`Lead Details: ${selectedLead.id}`}
        >
          <div className="space-y-6">
            {/* Lead Overview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedLead.type} Lead
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedLead.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Lead Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lead ID</span>
                  <span className="font-semibold text-gray-900">
                    {selectedLead.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Type</span>
                  <StatusChip status={selectedLead.type} variant="info" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Property Value</span>
                  <span className="font-semibold text-gray-900">
                    {selectedLead.value}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Equity</span>
                  <span className="font-semibold text-green-600">
                    {selectedLead.equity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <StatusChip
                    status={selectedLead.status}
                    variant={
                      selectedLead.status === "Closed Won"
                        ? "success"
                        : "default"
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SLA</span>
                  <SLAChip status={selectedLead.sla} />
                </div>
              </div>
            </div>

            {/* Partner Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Partner Assignment
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Assigned To</span>
                  <span className="font-medium text-gray-900">
                    {selectedLead.partner}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Assignment Date</span>
                  <span className="text-gray-900">{selectedLead.date}</span>
                </div>
              </div>
            </div>

            {/* User Journey Summary */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                User Journey Summary
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">User Email</span>
                  <span className="text-gray-900">{selectedLead.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sessions</span>
                  <span className="text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Intent Score</span>
                  <span className="text-blue-600 font-semibold">87/100</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Add notes about this lead..."
              />
            </div>

            {/* Audit Events */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Audit Events
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">10:36 AM</span>
                  <span className="text-gray-900">Lead created</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">10:38 AM</span>
                  <span className="text-gray-900">
                    Assigned to {selectedLead.partner}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">11:15 AM</span>
                  <span className="text-gray-900">Status updated</span>
                </div>
              </div>
            </div>
          </div>
        </SideDrawer>
      )}
    </div>
  );
}