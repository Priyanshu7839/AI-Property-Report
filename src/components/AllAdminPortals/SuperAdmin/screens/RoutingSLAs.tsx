import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  Trophy,
} from "lucide-react";
import { StatusChip } from "../StatusChip";
import { SLAChip } from "../SLAChip";

interface RoutingRule {
  id: string;
  priority: number;
  name: string;
  conditions: string;
  action: string;
  active: boolean;
}

const mockRules: RoutingRule[] = [
  {
    id: "R001",
    priority: 1,
    name: "Premium Mortgage - High Value CA",
    conditions: "Type: Mortgage, State: CA, Value > $1M",
    action: "Assign to Premier Mortgage Solutions",
    active: true,
  },
  {
    id: "R002",
    priority: 2,
    name: "Insurance - TX ZIP Codes",
    conditions: "Type: Insurance, State: TX, ZIP in premium list",
    action: "Assign to HomeGuard Insurance Group",
    active: true,
  },
  {
    id: "R003",
    priority: 3,
    name: "Real Estate - Florida Metro",
    conditions: "Type: Real Estate, County: Miami-Dade OR Broward",
    action: "Assign to Elite Realty Partners",
    active: true,
  },
  {
    id: "R004",
    priority: 4,
    name: "Tax Advisory - High Equity Northeast",
    conditions: "Type: Tax, State: NY/NJ/CT, Equity > $500K",
    action: "Assign to TaxWise Advisors LLC",
    active: false,
  },
];

const slaTargets = [
  { type: "Mortgage Lead", target: "4 hours", current: "2.3 hours", status: "good" },
  { type: "Insurance Lead", target: "3 hours", current: "1.7 hours", status: "good" },
  { type: "Real Estate Lead", target: "6 hours", current: "3.1 hours", status: "good" },
  { type: "Tax Advisory Lead", target: "8 hours", current: "4.2 hours", status: "good" },
  { type: "Financial Advisory", target: "5 hours", current: "5.8 hours", status: "warning" },
];

const leadsNearBreach = [
  {
    id: "L5623",
    type: "Financial Advisory",
    zip: "98101",
    timeLeft: "22 min",
    status: "warning",
  },
  {
    id: "L5619",
    type: "Mortgage",
    zip: "90210",
    timeLeft: "1.2 hrs",
    status: "warning",
  },
  {
    id: "L5601",
    type: "Insurance",
    zip: "75001",
    timeLeft: "45 min",
    status: "warning",
  },
];

const partnerLeaderboard = [
  { partner: "HomeGuard Insurance Group", avgTime: "1.7 hrs", leads: 89 },
  { partner: "Premier Mortgage Solutions", avgTime: "2.3 hrs", leads: 127 },
  { partner: "Wealth Navigator Financial", avgTime: "2.8 hrs", leads: 67 },
  { partner: "Elite Realty Partners", avgTime: "3.1 hrs", leads: 102 },
  { partner: "TaxWise Advisors LLC", avgTime: "4.2 hrs", leads: 43 },
];

export function RoutingSLAs() {
  const [testLead, setTestLead] = useState({
    type: "Mortgage",
    zip: "90210",
    equity: "750000",
  });
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestRouting = () => {
    setTestResult("Premier Mortgage Solutions (Rule #1: Premium Mortgage - High Value CA)");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Routing & SLAs
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure routing rules, SLA targets, and monitor response times
        </p>
      </div>

      {/* Routing Rules Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Routing Rules</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Rule
          </button>
        </div>

        <div className="space-y-3">
          {mockRules.map((rule) => (
            <div
              key={rule.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center font-semibold text-sm">
                      {rule.priority}
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {rule.name}
                    </h3>
                    <StatusChip
                      status={rule.active ? "active" : "paused"}
                      label={rule.active ? "Active" : "Inactive"}
                    />
                  </div>
                  <div className="ml-11 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">IF:</span> {rule.conditions}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">THEN:</span> {rule.action}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Test Routing Tool */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Test Routing</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead Type
              </label>
              <select
                value={testLead.type}
                onChange={(e) =>
                  setTestLead({ ...testLead, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Mortgage</option>
                <option>Insurance</option>
                <option>Real Estate</option>
                <option>Tax Advisory</option>
                <option>Financial Advisory</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={testLead.zip}
                onChange={(e) =>
                  setTestLead({ ...testLead, zip: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="90210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equity Amount ($)
              </label>
              <input
                type="text"
                value={testLead.equity}
                onChange={(e) =>
                  setTestLead({ ...testLead, equity: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="750000"
              />
            </div>
            <button
              onClick={handleTestRouting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              Run Test
            </button>
            {testResult && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-1">
                      Routing Result
                    </p>
                    <p className="text-sm text-green-800">{testResult}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SLA Targets */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">SLA Targets</h2>
          <div className="space-y-3">
            {slaTargets.map((sla, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {sla.type}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Target: {sla.target}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {sla.current}
                  </p>
                  <SLAChip status={sla.status as "good" | "warning" | "breach"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads Near Breach */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold text-gray-900">Leads Near Breach</h2>
          </div>
          <div className="space-y-2">
            {leadsNearBreach.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {lead.id}
                  </p>
                  <p className="text-xs text-gray-600">
                    {lead.type} • ZIP {lead.zip}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-700">
                    {lead.timeLeft}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Response Leaderboard */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">
              Partner Response Leaderboard
            </h2>
          </div>
          <div className="space-y-2">
            {partnerLeaderboard.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {partner.partner}
                    </p>
                    <p className="text-xs text-gray-600">{partner.leads} leads</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {partner.avgTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
