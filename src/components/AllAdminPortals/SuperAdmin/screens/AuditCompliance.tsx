import { useState } from "react";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import { Shield, Download, Settings, Eye } from "lucide-react";

export function AuditCompliance() {
  const [complianceSettings, setComplianceSettings] = useState({
    dataRetention: 90,
    maskPII: true,
    ipLogging: true,
  });

  const auditEvents = [
    {
      timestamp: "2026-01-24 14:32:15",
      actor: "admin@aipropertyreport.com",
      eventType: "Lead Created",
      entity: "LD-87432",
      metadata: "Mortgage lead, CA 94102, $1.2M",
    },
    {
      timestamp: "2026-01-24 14:28:42",
      actor: "system@aipropertyreport.com",
      eventType: "Lead Assigned",
      entity: "LD-87432",
      metadata: "Auto-assigned to Wells Fargo via routing rule #3",
    },
    {
      timestamp: "2026-01-24 14:15:23",
      actor: "manager@aipropertyreport.com",
      eventType: "Partner Paused",
      entity: "PT-4521",
      metadata: "State Farm paused - capacity reached",
    },
    {
      timestamp: "2026-01-24 13:47:08",
      actor: "admin@aipropertyreport.com",
      eventType: "Price Changed",
      entity: "Mortgage Lead",
      metadata: "Base price: $450 → $475",
    },
    {
      timestamp: "2026-01-24 13:22:55",
      actor: "finance@aipropertyreport.com",
      eventType: "Payout Updated",
      entity: "PY-8821",
      metadata: "Chase payout: $12,450 marked as paid",
    },
    {
      timestamp: "2026-01-24 12:58:31",
      actor: "system@aipropertyreport.com",
      eventType: "Lead Reassigned",
      entity: "LD-87401",
      metadata: "Partner failed SLA, reassigned to backup",
    },
    {
      timestamp: "2026-01-24 12:15:19",
      actor: "admin@aipropertyreport.com",
      eventType: "Routing Rule Updated",
      entity: "RR-003",
      metadata: "Updated priority: 5 → 3",
    },
    {
      timestamp: "2026-01-24 11:42:07",
      actor: "user@example.com",
      eventType: "User Deletion Request",
      entity: "USR-7832",
      metadata: "GDPR deletion request received",
    },
  ];

  const activityTimeline = [
    {
      time: "14:32",
      event: "Lead LD-87432 created",
      type: "Lead Created",
      user: "admin@aipropertyreport.com",
    },
    {
      time: "14:28",
      event: "Lead LD-87432 assigned to Wells Fargo",
      type: "Lead Assigned",
      user: "System",
    },
    {
      time: "14:15",
      event: "Partner State Farm paused",
      type: "Partner Paused",
      user: "manager@aipropertyreport.com",
    },
    {
      time: "13:47",
      event: "Mortgage lead pricing updated",
      type: "Price Changed",
      user: "admin@aipropertyreport.com",
    },
    {
      time: "13:22",
      event: "Payout PY-8821 marked as paid",
      type: "Payout Updated",
      user: "finance@aipropertyreport.com",
    },
    {
      time: "12:58",
      event: "Lead LD-87401 reassigned due to SLA breach",
      type: "Lead Reassigned",
      user: "System",
    },
    {
      time: "12:15",
      event: "Routing rule RR-003 priority updated",
      type: "Routing Rule Updated",
      user: "admin@aipropertyreport.com",
    },
    {
      time: "11:42",
      event: "User deletion request received",
      type: "User Deletion Request",
      user: "user@example.com",
    },
  ];

  const tableColumns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "actor", label: "Actor" },
    { key: "eventType", label: "Event Type" },
    { key: "entity", label: "Entity" },
    { key: "metadata", label: "Metadata" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Audit & Compliance
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Enterprise-grade logging and compliance controls
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Audit Log
        </button>
      </div>

      {/* Compliance Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Compliance Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention (days)
            </label>
            <input
              type="number"
              value={complianceSettings.dataRetention}
              onChange={(e) =>
                setComplianceSettings({
                  ...complianceSettings,
                  dataRetention: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Automatically delete audit logs older than this period
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mask PII in Logs
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setComplianceSettings({
                    ...complianceSettings,
                    maskPII: !complianceSettings.maskPII,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  complianceSettings.maskPII ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    complianceSettings.maskPII
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
              <span className="text-sm text-gray-700">
                {complianceSettings.maskPII ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mask email addresses and personal data in audit logs
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Address Logging
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setComplianceSettings({
                    ...complianceSettings,
                    ipLogging: !complianceSettings.ipLogging,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  complianceSettings.ipLogging ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    complianceSettings.ipLogging
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
              <span className="text-sm text-gray-700">
                {complianceSettings.ipLogging ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Log IP addresses for user sessions and events
            </p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Today's Activity</h2>
          </div>
          <div className="space-y-3">
            {activityTimeline.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 text-xs text-gray-500 font-mono w-12">
                  {item.time}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Events Table */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">
            Raw Events Log (Last 24h)
          </h2>
          <DataTable
            columns={tableColumns}
            data={auditEvents}
            renderCell={(key, value) => {
              if (key === "eventType") {
                const variant =
                  value.includes("Created") || value.includes("Updated")
                    ? "info"
                    : value.includes("Paused") || value.includes("Deletion")
                    ? "warning"
                    : "default";
                return <StatusChip status={value} variant={variant} />;
              }
              if (key === "timestamp") {
                return <span className="font-mono text-xs">{value}</span>;
              }
              return value;
            }}
          />
        </div>
      </div>

      {/* Consent & Privacy Placeholders */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">
            Privacy & Consent Management
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">GDPR Compliance</h3>
            <p className="text-sm text-gray-600 mb-3">
              Manage data subject requests and consent tracking
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View GDPR Dashboard →
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">CCPA Compliance</h3>
            <p className="text-sm text-gray-600 mb-3">
              California Consumer Privacy Act compliance tools
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View CCPA Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
