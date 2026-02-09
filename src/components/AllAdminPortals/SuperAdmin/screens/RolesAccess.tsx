import { useState } from "react";
import { DataTable } from "../DataTable";
import { StatusChip } from "../StatusChip";
import {
  Shield,
  Users,
  Plus,
  Key,
  CheckCircle2,
  XCircle,
  Mail,
  RotateCcw,
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    viewDashboard: boolean;
    viewLeads: boolean;
    editLeads: boolean;
    viewPartners: boolean;
    editPartners: boolean;
    viewRevenue: boolean;
    editPricing: boolean;
    viewPayouts: boolean;
    processPayout: boolean;
    viewPII: boolean;
    exportData: boolean;
    manageUsers: boolean;
    viewAuditLog: boolean;
    systemSettings: boolean;
  };
}

export function RolesAccess() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roles: Role[] = [
    {
      id: "super-admin",
      name: "Super Admin",
      description: "Full platform access and control",
      permissions: {
        viewDashboard: true,
        viewLeads: true,
        editLeads: true,
        viewPartners: true,
        editPartners: true,
        viewRevenue: true,
        editPricing: true,
        viewPayouts: true,
        processPayout: true,
        viewPII: true,
        exportData: true,
        manageUsers: true,
        viewAuditLog: true,
        systemSettings: true,
      },
    },
    {
      id: "lead-manager",
      name: "Lead Manager",
      description: "Manage leads and partner assignments",
      permissions: {
        viewDashboard: true,
        viewLeads: true,
        editLeads: true,
        viewPartners: true,
        editPartners: false,
        viewRevenue: true,
        editPricing: false,
        viewPayouts: false,
        processPayout: false,
        viewPII: true,
        exportData: true,
        manageUsers: false,
        viewAuditLog: true,
        systemSettings: false,
      },
    },
    {
      id: "mortgage-partner",
      name: "Mortgage Partner",
      description: "View and manage mortgage leads",
      permissions: {
        viewDashboard: false,
        viewLeads: true,
        editLeads: false,
        viewPartners: false,
        editPartners: false,
        viewRevenue: false,
        editPricing: false,
        viewPayouts: true,
        processPayout: false,
        viewPII: true,
        exportData: false,
        manageUsers: false,
        viewAuditLog: false,
        systemSettings: false,
      },
    },
    {
      id: "insurance-partner",
      name: "Insurance Partner",
      description: "View and manage insurance leads",
      permissions: {
        viewDashboard: false,
        viewLeads: true,
        editLeads: false,
        viewPartners: false,
        editPartners: false,
        viewRevenue: false,
        editPricing: false,
        viewPayouts: true,
        processPayout: false,
        viewPII: true,
        exportData: false,
        manageUsers: false,
        viewAuditLog: false,
        systemSettings: false,
      },
    },
    {
      id: "real-estate-partner",
      name: "Real Estate Partner",
      description: "View and manage real estate leads",
      permissions: {
        viewDashboard: false,
        viewLeads: true,
        editLeads: false,
        viewPartners: false,
        editPartners: false,
        viewRevenue: false,
        editPricing: false,
        viewPayouts: true,
        processPayout: false,
        viewPII: true,
        exportData: false,
        manageUsers: false,
        viewAuditLog: false,
        systemSettings: false,
      },
    },
    {
      id: "tax-advisor",
      name: "Tax Advisor",
      description: "View and manage tax advisory leads",
      permissions: {
        viewDashboard: false,
        viewLeads: true,
        editLeads: false,
        viewPartners: false,
        editPartners: false,
        viewRevenue: false,
        editPricing: false,
        viewPayouts: true,
        processPayout: false,
        viewPII: true,
        exportData: false,
        manageUsers: false,
        viewAuditLog: false,
        systemSettings: false,
      },
    },
    {
      id: "financial-advisor",
      name: "Financial Advisor",
      description: "View and manage financial advisory leads",
      permissions: {
        viewDashboard: false,
        viewLeads: true,
        editLeads: false,
        viewPartners: false,
        editPartners: false,
        viewRevenue: false,
        editPricing: false,
        viewPayouts: true,
        processPayout: false,
        viewPII: true,
        exportData: false,
        manageUsers: false,
        viewAuditLog: false,
        systemSettings: false,
      },
    },
  ];

  const users = [
    {
      name: "John Smith",
      email: "john@aipropertyreport.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2026-01-24 14:32",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@aipropertyreport.com",
      role: "Lead Manager",
      status: "Active",
      lastLogin: "2026-01-24 13:15",
    },
    {
      name: "Michael Chen",
      email: "michael@wellsfargo.com",
      role: "Mortgage Partner",
      status: "Active",
      lastLogin: "2026-01-24 12:45",
    },
    {
      name: "Emily Davis",
      email: "emily@statefarm.com",
      role: "Insurance Partner",
      status: "Active",
      lastLogin: "2026-01-24 11:22",
    },
    {
      name: "Robert Wilson",
      email: "robert@compass.com",
      role: "Real Estate Partner",
      status: "Active",
      lastLogin: "2026-01-23 16:30",
    },
    {
      name: "Jennifer Brown",
      email: "jennifer@deloitte.com",
      role: "Tax Advisor",
      status: "Inactive",
      lastLogin: "2026-01-20 09:15",
    },
  ];

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "lastLogin", label: "Last Login" },
    { key: "actions", label: "Actions" },
  ];

  const permissionLabels = [
    { key: "viewDashboard", label: "View Dashboard" },
    { key: "viewLeads", label: "View Leads" },
    { key: "editLeads", label: "Edit Leads" },
    { key: "viewPartners", label: "View Partners" },
    { key: "editPartners", label: "Edit Partners" },
    { key: "viewRevenue", label: "View Revenue" },
    { key: "editPricing", label: "Edit Pricing" },
    { key: "viewPayouts", label: "View Payouts" },
    { key: "processPayout", label: "Process Payouts" },
    { key: "viewPII", label: "View PII Data" },
    { key: "exportData", label: "Export Data" },
    { key: "manageUsers", label: "Manage Users" },
    { key: "viewAuditLog", label: "View Audit Log" },
    { key: "systemSettings", label: "System Settings" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Roles & Access
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Role-based access control and user management
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Roles Overview */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Roles & Permissions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-gray-500">
                  {
                    Object.values(role.permissions).filter((p) => p === true)
                      .length
                  }{" "}
                  permissions
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{role.name}</h3>
              <p className="text-sm text-gray-600">{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Role Details */}
      {selectedRole && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedRole.name} - Permissions
              </h2>
              <p className="text-sm text-gray-600">
                {selectedRole.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {permissionLabels.map((perm) => {
              const hasPermission =
                selectedRole.permissions[
                  perm.key as keyof typeof selectedRole.permissions
                ];
              return (
                <div
                  key={perm.key}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
                >
                  {hasPermission ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      hasPermission ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {perm.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* User Management */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">User Management</h2>
        </div>
        <DataTable
          columns={userColumns}
          data={users}
          renderCell={(key, value, row) => {
            if (key === "status") {
              return (
                <StatusChip
                  status={value}
                  variant={value === "Active" ? "success" : "default"}
                />
              );
            }
            if (key === "role") {
              return <StatusChip status={value} variant="info" />;
            }
            if (key === "lastLogin") {
              return <span className="text-xs font-mono text-gray-600">{value}</span>;
            }
            if (key === "actions") {
              return (
                <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                  <RotateCcw className="w-3 h-3" />
                  Reset Password
                </button>
              );
            }
            return value;
          }}
        />
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Invite New User</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Territory (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., CA, NY, TX"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
