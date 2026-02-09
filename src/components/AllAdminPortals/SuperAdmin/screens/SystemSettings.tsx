import { useState } from "react";
import {
  Key,
  Webhook,
  BarChart3,
  Database,
  Shield,
  Download,
  AlertCircle,
  Network,
} from "lucide-react";

export function SystemSettings() {
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [slaEscalation, setSlaEscalation] = useState(true);
  const [duplicateDetection, setDuplicateDetection] = useState(true);
  const [fraudFiltering, setFraudFiltering] = useState(false);

  const apiKeys = [
    {
      name: "Valuation API",
      key: "pk_live_*********************abc123",
      status: "Active",
    },
    {
      name: "Geolocation API",
      key: "pk_live_*********************xyz789",
      status: "Active",
    },
    {
      name: "Analytics API",
      key: "pk_test_*********************dev456",
      status: "Test Mode",
    },
  ];

  const webhooks = [
    {
      name: "Lead Created",
      url: "https://api.aipropertyreport.com/webhooks/lead-created",
      status: "Active",
    },
    {
      name: "Partner Assigned",
      url: "https://api.aipropertyreport.com/webhooks/partner-assigned",
      status: "Active",
    },
    {
      name: "Revenue Event",
      url: "https://api.aipropertyreport.com/webhooks/revenue",
      status: "Paused",
    },
  ];

  const utmParams = [
    { name: "utm_source", example: "google, facebook, email" },
    { name: "utm_medium", example: "cpc, organic, newsletter" },
    { name: "utm_campaign", example: "spring_promo, q4_launch" },
    { name: "utm_term", example: "property valuation" },
    { name: "utm_content", example: "ad_variant_a" },
  ];

  const eventTracking = [
    "page_view",
    "property_search",
    "report_viewed",
    "equity_calculator_used",
    "cta_clicked",
    "lead_created",
    "partner_assigned",
  ];

  const exportFormats = ["CSV", "Excel (XLSX)", "JSON", "PDF"];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          System Settings
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Platform configuration and advanced controls
        </p>
      </div>

      {/* API Keys */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Key className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">API Keys</h2>
        </div>
        <div className="space-y-3">
          {apiKeys.map((api, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{api.name}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  {api.key}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    api.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {api.status}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Rotate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Webhook className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">Webhooks</h2>
        </div>
        <div className="space-y-3">
          {webhooks.map((webhook, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {webhook.name}
                </p>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  {webhook.url}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    webhook.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {webhook.status}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* UTM Tracking */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900">UTM Tracking</h2>
          </div>
          <div className="space-y-2">
            {utmParams.map((param, index) => (
              <div key={index} className="py-2 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900 font-mono">
                  {param.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{param.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Tracking */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Event Tracking</h2>
          </div>
          <div className="space-y-2">
            {eventTracking.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm text-gray-700 font-mono">{event}</span>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                  Enabled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Model Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">Data Model Overview</h2>
        </div>
        <div className="flex items-center justify-center gap-3 p-8 bg-gray-50 rounded-lg">
          {[
            "User",
            "Sessions",
            "Events",
            "Reports",
            "Leads",
            "Partners",
            "Payouts",
          ].map((entity, index, arr) => (
            <div key={index} className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-900">
                  {entity}
                </span>
              </div>
              {index < arr.length - 1 && (
                <Network className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* System Toggles */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">System Controls</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Auto Lead Assignment
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Automatically assign leads to partners based on routing rules
              </p>
            </div>
            <button
              onClick={() => setAutoAssignment(!autoAssignment)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoAssignment ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoAssignment ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                SLA Escalation
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Automatically escalate leads approaching SLA breach
              </p>
            </div>
            <button
              onClick={() => setSlaEscalation(!slaEscalation)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                slaEscalation ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  slaEscalation ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Duplicate Lead Detection
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Prevent duplicate leads from the same user/property
              </p>
            </div>
            <button
              onClick={() => setDuplicateDetection(!duplicateDetection)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                duplicateDetection ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  duplicateDetection ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Fraud / Bot Filtering
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Advanced filtering to detect and block suspicious activity
              </p>
            </div>
            <button
              onClick={() => setFraudFiltering(!fraudFiltering)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                fraudFiltering ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  fraudFiltering ? "translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Formats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Download className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900">Export Formats</h2>
        </div>
        <div className="flex items-center gap-3">
          {exportFormats.map((format, index) => (
            <div
              key={index}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">
                {format}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
