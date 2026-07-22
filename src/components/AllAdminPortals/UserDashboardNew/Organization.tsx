import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Search,
  Bell,
  Sparkles,
  Users,
  Mail,
  Building2,
  ShieldAlert,
  UserPlus,
  ChevronRight,
  Check,
  X,
  Upload,
  Filter,
  MoreVertical,
  HelpCircle,
  LockKeyhole,
  Download,
  Activity,
  ShieldCheck,
  CreditCard,
  FileText,
  Send,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  UserCog,
  ReceiptText,
  BriefcaseBusiness,
  KeyRound,
  Settings,
  Clock3,
} from "lucide-react";

const cn = (...c) => c.filter(Boolean).join(" ");
const screens = [
  ["org-create", "Create Organization"],
  ["org-details", "Organization Details"],
  ["org-branding", "Logo & Branding"],
  ["org-business", "Business Info"],
  ["org-success", "Organization Created"],
  ["users-dashboard", "Users Dashboard"],
  ["invite-user", "Invite New User"],
  ["select-role", "Select Role"],
  ["assign-properties", "Assign Properties"],
  ["review-invite", "Review & Send"],
  ["invitation-sent", "Invitation Sent"],
  ["user-profile", "User Profile"],
  ["edit-user", "Edit User"],
  ["roles-dashboard", "Roles Dashboard"],
  ["admin-permissions", "Main Admin"],
  ["manager-permissions", "Property Manager"],
  ["finance-permissions", "Finance Manager"],
  ["custom-role", "Custom Role Builder"],
  ["permission-matrix", "Permission Matrix"],
  ["assignment-dashboard", "Assignment Dashboard"],
  ["bulk-assignment", "Bulk Assignment"],
  ["assignment-success", "Assignment Success"],
  ["email-invite", "Email Invitation"],
  ["accept-invite", "Accept Invitation"],
  ["create-password", "Create Password"],
  ["mfa-setup", "MFA Setup"],
  ["login-success", "Login Success"],
  ["activity-dashboard", "Activity Dashboard"],
  ["user-timeline", "User Timeline"],
  ["security-logs", "Security Logs"],
  ["export-logs", "Export Logs"],
  ["subscription-overview", "Subscription Overview"],
  ["team-seats", "Team Seats"],
  ["billing-history", "Billing History"],
  ["upgrade-plan", "Upgrade Plan"],
  ["payment-success", "Payment Success"],
  ["liam-org", "LIAM Org Intelligence"],
];
const label = Object.fromEntries(screens);
const sections = [
  [
    "Organization Setup",
    [
      "org-create",
      "org-details",
      "org-branding",
      "org-business",
      "org-success",
    ],
  ],
  [
    "User Management",
    [
      "users-dashboard",
      "invite-user",
      "select-role",
      "assign-properties",
      "review-invite",
      "invitation-sent",
      "user-profile",
      "edit-user",
    ],
  ],
  [
    "Roles & Permissions",
    [
      "roles-dashboard",
      "admin-permissions",
      "manager-permissions",
      "finance-permissions",
      "custom-role",
      "permission-matrix",
    ],
  ],
  [
    "Property Assignment",
    [
      "assignment-dashboard",
      "assign-properties",
      "bulk-assignment",
      "assignment-success",
    ],
  ],
  [
    "Authentication",
    [
      "email-invite",
      "accept-invite",
      "create-password",
      "mfa-setup",
      "login-success",
    ],
  ],
  [
    "Activity & Logs",
    ["activity-dashboard", "user-timeline", "security-logs", "export-logs"],
  ],
  [
    "Billing",
    [
      "subscription-overview",
      "team-seats",
      "billing-history",
      "upgrade-plan",
      "payment-success",
    ],
  ],
  ["LIAM", ["liam-org"]],
];
const users = [
  [
    "Ava Mitchell",
    "Main Admin",
    "All Properties",
    "Active",
    "Last seen 12m ago",
    "ava@evergreen.com",
  ],
  [
    "Daniel Ross",
    "Property Manager",
    "8 Properties",
    "Active",
    "Last seen 1h ago",
    "daniel@evergreen.com",
  ],
  [
    "Nina Patel",
    "Finance Manager",
    "Financials + Reports",
    "Active",
    "Last seen 2h ago",
    "nina@evergreen.com",
  ],
  [
    "Marcus Lee",
    "Maintenance Manager",
    "12 Properties",
    "Pending",
    "Invite sent yesterday",
    "marcus@evergreen.com",
  ],
  [
    "Olivia Chen",
    "Investor Read Only",
    "Portfolio Reports",
    "Active",
    "Last seen 1d ago",
    "olivia@lp.com",
  ],
];
const properties = [
  ["Miami Duplex", "Residential", "Miami, FL", "Daniel Ross", "Active"],
  ["Dallas 8-Unit", "Multifamily", "Dallas, TX", "Daniel Ross", "Active"],
  ["Austin Warehouse", "Industrial", "Austin, TX", "Unassigned", "Review"],
  ["Phoenix 16-Unit", "Multifamily", "Phoenix, AZ", "Daniel Ross", "Active"],
  ["Orlando Retail Center", "Retail", "Orlando, FL", "Unassigned", "Review"],
  [
    "San Jose Townhomes",
    "Residential",
    "San Jose, CA",
    "Daniel Ross",
    "Active",
  ],
];
const audit = [
  [
    "Today 10:42 AM",
    "Ava Mitchell",
    "Invited Marcus Lee as Maintenance Manager",
    "Users",
    "Success",
  ],
  [
    "Today 09:17 AM",
    "Nina Patel",
    "Exported Q2 tax package",
    "Reports",
    "Success",
  ],
  [
    "Yesterday 05:21 PM",
    "Daniel Ross",
    "Assigned Miami Duplex to maintenance vendor",
    "Properties",
    "Success",
  ],
  [
    "Yesterday 11:02 AM",
    "System",
    "Blocked login from unknown location",
    "Security",
    "Warning",
  ],
  [
    "Jun 14 02:18 PM",
    "Ava Mitchell",
    "Changed Finance Manager permissions",
    "Roles",
    "Success",
  ],
];
const roles = [
  [
    "Main Admin",
    "Full Access",
    "Owns organization, billing, users and all properties.",
  ],
  [
    "Property Manager",
    "Assigned Properties",
    "Manages assigned properties, tenants, leases and maintenance.",
  ],
  [
    "Finance Manager",
    "Financial Modules",
    "Views rent, banking, invoices, reports and financing.",
  ],
  [
    "Leasing Manager",
    "Leasing Only",
    "Applications, vacancies, leases and renewals.",
  ],
  [
    "Maintenance Manager",
    "Operations Only",
    "Tickets, vendors, work orders and invoices.",
  ],
  [
    "Investor Read Only",
    "Read Only",
    "Read-only reports, KPIs and portfolio performance.",
  ],
];
function Organization() {
  const [screen, setScreen] = useState("users-dashboard");
  const Comp = map[screen] || UsersDashboard;
  return (
    <div className="min-h-screen bg-[#F6F7F8] text-slate-950">
      {/* <Sidebar screen={screen} setScreen={setScreen} /> */}
      <main className="min-h-screen">
        {/* <Topbar /> */}
        <div className="px-7 py-6">
          <Switcher screen={screen} setScreen={setScreen} />
          <Comp setScreen={setScreen} />
        </div>
      </main>
    </div>
  );
}
function Sidebar({ screen, setScreen }) {
  return (
    <aside className="fixed inset-y-0 left-0 w-[300px] overflow-y-auto bg-gradient-to-b from-[#071018] to-[#0D1820] px-4 py-5 text-white">
      <div className="mb-7 flex items-center gap-3 px-2">
        <Home className="text-emerald-500" size={30} />
        <div>
          <div className="text-lg font-semibold tracking-tight">
            AIPropertyReport
          </div>
          <div className="text-xs text-slate-300">Organization Console</div>
        </div>
      </div>
      <nav className="space-y-3">
        {sections.map(([s, ids]) => (
          <div key={s} className="rounded-2xl bg-white/[.04] p-2">
            <div className="mb-1 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {s}
            </div>
            {ids.map((id) => (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs",
                  screen === id
                    ? "bg-emerald-700 text-white"
                    : "text-slate-300 hover:bg-white/10",
                )}
              >
                <span>{label[id]}</span>
                {screen === id && <ChevronRight size={14} />}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-7 backdrop-blur">
      <div className="flex h-12 w-[620px] items-center gap-3 rounded-2xl bg-slate-100 px-4">
        <Search size={20} className="text-slate-500" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder="Search users, managers, properties, roles, logs..."
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">
          <Sparkles size={16} className="mr-2 inline text-emerald-700" />
          Ask LIAM
        </button>
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={21} />
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-red-600" />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 font-semibold">
          AD
        </div>
      </div>
    </header>
  );
}
function Switcher({ screen, setScreen }) {
  return (
    <div className="mb-5 flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-2xl bg-white p-2 shadow-card">
      {screens.map(([id, l]) => (
        <button
          key={id}
          onClick={() => setScreen(id)}
          className={cn(
            "rounded-xl px-3 py-2 text-xs font-semibold",
            screen === id
              ? "bg-slate-950 text-white"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
function Hero({ title, subtitle, children, cta }) {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[#071018] p-8 text-white shadow-soft">
      <div className="absolute inset-0 opacity-30">
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,220 C150,130 240,170 360,210 C520,290 620,40 780,120 C950,210 1030,105 1200,70"
            fill="none"
            stroke="#0B7A3B"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="relative grid grid-cols-[1fr_410px] gap-8">
        <div>
          <h1 className="text-[36px] font-semibold tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-200">
            {subtitle}
          </p>
          {cta && (
            <button className="mt-7 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold shadow-lg shadow-emerald-950/20">
              {cta}
            </button>
          )}
        </div>
        <div className="rounded-2xl bg-white/95 p-5 text-slate-950 shadow-soft">
          {children || <LiamCard />}
        </div>
      </div>
    </section>
  );
}
function LiamCard({
  items = [
    ["12", "Users"],
    ["3", "Pending Invites"],
    ["8", "Assigned Properties"],
    ["2", "Permission Risks"],
  ],
  note = "LIAM: 2 users have broad access and should be reviewed.",
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-semibold">
        <Sparkles className="text-emerald-700" size={18} />
        LIAM Organization Intelligence
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {items.map(([v, l]) => (
          <div key={l} className="border-b border-slate-200 pb-3">
            <div className="text-2xl font-semibold">{v}</div>
            <div className="text-xs text-slate-600">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900">
        {note}
      </div>
    </div>
  );
}
function Kpi({ label, value, Icon = Users, tone = "green" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full",
          tone === "red"
            ? "bg-red-50 text-red-700"
            : tone === "amber"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700",
        )}
      >
        <Icon size={20} />
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-slate-600">{label}</div>
    </div>
  );
}
function Status({ s }) {
  return (
    <span
      className={cn(
        "rounded-lg px-2 py-1 text-xs font-semibold",
        s === "Active" || s === "Success" || s === "Paid"
          ? "bg-emerald-50 text-emerald-800"
          : s === "Pending" || s === "Review" || s === "Warning"
            ? "bg-amber-50 text-amber-800"
            : "bg-slate-100 text-slate-700",
      )}
    >
      {s}
    </span>
  );
}
function Badge({ children }) {
  return (
    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
      {children}
    </span>
  );
}
function UsersDashboard({ setScreen }) {
  return (
    <>
      <Hero
        title="Organization & User Control Center"
        subtitle="Create organizations, invite managers, assign properties, control role access, email credentials, and let LIAM monitor permissions."
        cta="+ Invite User"
      />
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Kpi label="Active Users" value="12" />
        <Kpi label="Pending Invites" value="3" Icon={Mail} tone="amber" />
        <Kpi label="Properties Assigned" value="26" Icon={Building2} />
        <Kpi label="Role Issues" value="2" Icon={ShieldAlert} tone="red" />
      </div>
      <div className="mt-5 grid grid-cols-[1fr_340px] gap-5">
        <UsersTable />
        <RightPanel setScreen={setScreen} />
      </div>
    </>
  );
}
function UsersTable() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Users & Managers</h3>
        <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
          <UserPlus size={15} className="mr-2 inline" />
          Invite
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            {[
              "Name",
              "Role",
              "Access Scope",
              "Status",
              "Activity",
              "Email",
              "",
            ].map((h) => (
              <th className="py-3 font-medium" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((r) => (
            <tr key={r[0]} className="border-t border-slate-100">
              {r.map((c, i) => (
                <td className="py-4" key={i}>
                  {i === 0 ? (
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 font-semibold">
                        {c
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </span>
                      {c}
                    </span>
                  ) : i === 1 ? (
                    <Badge>{c}</Badge>
                  ) : i === 3 ? (
                    <Status s={c} />
                  ) : (
                    c
                  )}
                </td>
              ))}
              <td>
                <MoreVertical size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
function RightPanel({ setScreen }) {
  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="flex items-center gap-2 font-semibold">
          <Sparkles className="text-emerald-700" size={18} />
          LIAM Actions
        </h3>
        {[
          "Which manager has unresolved tickets?",
          "Which users have broad permissions?",
          "Which property is unassigned?",
          "Who has not logged in recently?",
        ].map((q) => (
          <button
            key={q}
            className="mt-3 flex w-full items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-900"
          >
            {q}
            <ArrowRight size={15} />
          </button>
        ))}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="font-semibold">Quick Workflows</h3>
        {[
          ["Invite Manager", "invite-user"],
          ["Assign Properties", "assign-properties"],
          ["Review Permissions", "permission-matrix"],
          ["View Activity Logs", "activity-dashboard"],
        ].map(([l, id]) => (
          <button
            key={l}
            onClick={() => setScreen(id)}
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"
          >
            {l}
            <ChevronRight size={15} />
          </button>
        ))}
      </section>
    </aside>
  );
}
function Setup({ step, title, subtitle, children }) {
  return (
    <>
      <Hero title={title} subtitle={subtitle} />
      <div className="mt-5 grid grid-cols-[1fr_330px] gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <StepBar
            active={step - 1}
            labels={["Create", "Details", "Branding", "Business", "Done"]}
          />
          <div className="mt-8">{children}</div>
          <Actions />
        </section>
        <Help />
      </div>
    </>
  );
}
function StepBar({ active, labels }) {
  return (
    <div className="flex items-center">
      {labels.map((l, i) => (
        <React.Fragment key={l}>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full text-sm font-bold",
                i <= active
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "text-sm font-semibold",
                i === active ? "text-slate-950" : "text-slate-500",
              )}
            >
              {l}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div className="mx-4 h-px flex-1 bg-slate-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
function FormGrid({ fields }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((f) => (
        <label key={f} className="block">
          <span className="text-sm font-semibold text-slate-700">{f}</span>
          <input
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-700"
            placeholder={`Enter ${f.toLowerCase()}`}
          />
        </label>
      ))}
    </div>
  );
}
function Actions() {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">
        Back
      </button>
      <button className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
        Continue
      </button>
    </div>
  );
}
function Help() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="flex items-center gap-2 font-semibold">
        <HelpCircle size={18} />
        Setup Help
      </h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Organization setup creates the workspace. Main admins can invite
        managers, assign properties and control permissions.
      </p>
      <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
        LIAM uses this structure to answer operational questions.
      </div>
    </section>
  );
}
function OrgCreate() {
  return (
    <Setup
      step={1}
      title="Create Organization"
      subtitle="Create the company, fund, family office, or ownership entity."
    >
      <FormGrid
        fields={[
          "Organization Name",
          "Organization Type",
          "Primary Market",
          "Number of Properties",
          "Contact Email",
          "Phone Number",
        ]}
      />
    </Setup>
  );
}
function OrgDetails() {
  return (
    <Setup
      step={2}
      title="Organization Details"
      subtitle="Add legal and operating details."
    >
      <FormGrid
        fields={[
          "Legal Name",
          "Doing Business As",
          "Website",
          "Support Email",
          "Business Address",
          "Default Timezone",
        ]}
      />
    </Setup>
  );
}
function OrgBranding() {
  return (
    <Setup
      step={3}
      title="Upload Logo & Branding"
      subtitle="Set identity shown to users and managers."
    >
      <div className="grid grid-cols-2 gap-5">
        <UploadBox />
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="font-semibold">Brand Preview</h3>
          <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
            <div className="text-lg font-semibold">
              Evergreen Property Group
            </div>
            <div className="mt-2 text-sm text-slate-300">
              Powered by AIPropertyReport
            </div>
          </div>
        </div>
      </div>
    </Setup>
  );
}
function UploadBox() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center shadow-card">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <Upload size={28} />
      </div>
      <h3 className="mt-5 font-semibold">Upload Logo</h3>
      <p className="mt-2 text-sm text-slate-500">PNG, JPG, SVG up to 5MB</p>
      <button className="mt-5 rounded-xl border border-emerald-700 px-5 py-3 text-sm font-semibold text-emerald-800">
        Choose File
      </button>
    </div>
  );
}
function OrgBusiness() {
  return (
    <Setup
      step={4}
      title="Business Information"
      subtitle="Add billing, compliance and tax details."
    >
      <FormGrid
        fields={[
          "Tax ID / EIN",
          "Business Type",
          "Billing Contact",
          "Finance Contact",
          "Default Currency",
          "Country",
        ]}
      />
    </Setup>
  );
}
function Success({ title, subtitle, actions, setScreen }) {
  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-700 text-white">
        <Check size={40} />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        {subtitle}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        {actions?.map(([l, id], i) => (
          <button
            key={l}
            onClick={() => setScreen(id)}
            className={cn(
              "rounded-xl px-5 py-3 text-sm font-semibold",
              i === 0
                ? "bg-emerald-700 text-white"
                : "border border-slate-200 bg-white",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
function OrgSuccess(p) {
  return (
    <Success
      {...p}
      title="Organization Created"
      subtitle="Your organization is ready. Invite managers, assign properties, and activate LIAM."
      actions={[
        ["Invite Manager", "invite-user"],
        ["Open Users", "users-dashboard"],
        ["Assign Properties", "assign-properties"],
      ]}
    />
  );
}
function Flow({ title, subtitle, children }) {
  return (
    <>
      <Hero title={title} subtitle={subtitle} />
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        {children}
        <Actions />
      </section>
    </>
  );
}
function InviteUser() {
  return (
    <Flow
      title="Invite New User"
      subtitle="Create a user invitation, select their role, assign properties, and email credentials."
    >
      <FormGrid
        fields={[
          "Full Name",
          "Email Address",
          "Phone Number",
          "Job Title",
          "Department",
          "Manager Notes",
        ]}
      />
    </Flow>
  );
}
function SelectRole() {
  return (
    <Flow title="Select Role" subtitle="Choose what this user can access.">
      <div className="grid grid-cols-3 gap-4">
        {roles.map(([t, a, d]) => (
          <div
            key={t}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
          >
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              {a}
            </span>
            <h3 className="mt-5 font-semibold">{t}</h3>
            <p className="mt-2 min-h-[60px] text-sm leading-6 text-slate-600">
              {d}
            </p>
            <button className="mt-5 w-full rounded-xl border py-3 text-sm font-semibold">
              Select Role
            </button>
          </div>
        ))}
      </div>
    </Flow>
  );
}
function PropertyTable() {
  return (
    <table className="w-full text-left text-sm">
      <thead className="text-xs text-slate-500">
        <tr>
          {["Select", "Property", "Type", "Market", "Manager", "Status"].map(
            (h) => (
              <th className="py-3 font-medium" key={h}>
                {h}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {properties.map((r, i) => (
          <tr key={r[0]} className="border-t border-slate-100">
            <td className="py-4">
              <input type="checkbox" defaultChecked={i < 3} />
            </td>
            {r.map((c, j) => (
              <td className="py-4" key={j}>
                {j === 4 && c === "Unassigned" ? (
                  <span className="text-amber-700">{c}</span>
                ) : j === 5 ? (
                  <Status s={c} />
                ) : (
                  c
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function AssignProperties() {
  return (
    <Flow
      title="Assign Properties"
      subtitle="Managers only see assigned properties. Main Admins can see everything."
    >
      <PropertyTable />
    </Flow>
  );
}
function ReviewInvite() {
  return (
    <Flow
      title="Review & Send Invitation"
      subtitle="Review details, role, permissions and access before sending credentials."
    >
      <div className="grid grid-cols-2 gap-5">
        <section className="rounded-2xl bg-slate-50 p-5">
          <h3 className="font-semibold">User Details</h3>
          {[
            ["Name", "Marcus Lee"],
            ["Email", "marcus@evergreen.com"],
            ["Role", "Maintenance Manager"],
            ["Properties", "12 assigned"],
          ].map(([k, v]) => (
            <div key={k} className="mt-4 flex justify-between text-sm">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </section>
        <section className="rounded-2xl bg-emerald-50 p-5">
          <h3 className="font-semibold">Credentials Email</h3>
          <p className="mt-4 text-sm leading-6">
            System will email an activation link. User sets password after
            accepting invite.
          </p>
          <button className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
            <Send size={15} className="mr-2 inline" />
            Send Invitation
          </button>
        </section>
      </div>
    </Flow>
  );
}
function InvitationSent(p) {
  return (
    <Success
      {...p}
      title="Invitation Sent"
      subtitle="Credentials were emailed. The manager can now activate the account and set a password."
      actions={[
        ["View Email Invite", "email-invite"],
        ["Invite Another", "invite-user"],
        ["Open Users", "users-dashboard"],
      ]}
    />
  );
}
function UserProfile() {
  return (
    <>
      <Hero
        title="User Profile"
        subtitle="Review user access, assigned properties, activity, role permissions and LIAM recommendations."
      />
      <div className="mt-5 grid grid-cols-[330px_1fr] gap-5">
        <section className="rounded-2xl border bg-white p-6 text-center shadow-card">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-xl font-bold">
            DR
          </div>
          <h3 className="mt-4 text-lg font-semibold">Daniel Ross</h3>
          <p className="text-sm text-slate-500">Property Manager</p>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            Active · Last seen 1 hour ago
          </div>
        </section>
        <section className="space-y-5">
          <div className="rounded-2xl border bg-white p-5 shadow-card">
            <PropertyTable />
          </div>
          <ActivityTable />
        </section>
      </div>
    </>
  );
}
function EditUser() {
  return (
    <Flow
      title="Edit User"
      subtitle="Update profile, role, permissions, assigned properties and settings."
    >
      <FormGrid
        fields={[
          "Full Name",
          "Email Address",
          "Phone Number",
          "Role",
          "Status",
          "Access Notes",
        ]}
      />
    </Flow>
  );
}
function RolesDashboard() {
  return (
    <>
      <Hero
        title="Roles & Permissions"
        subtitle="Define what each team member can see, edit, approve, export, and ask LIAM."
      />
      <div className="mt-5 grid grid-cols-3 gap-4">
        {roles.map(([t, a, d]) => (
          <div key={t} className="rounded-2xl border bg-white p-5 shadow-card">
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              {a}
            </span>
            <h3 className="mt-5 font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{d}</p>
            <button className="mt-5 w-full rounded-xl border py-3 text-sm font-semibold">
              Manage Permissions
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
function PermissionPage({ role }) {
  const mods = [
    "Dashboard",
    "Properties",
    "Tenants",
    "Leases",
    "Rent",
    "Expenses",
    "Maintenance",
    "Insurance",
    "Financing",
    "Documents",
    "Reports",
    "Banking",
    "Advisors",
    "LIAM",
  ];
  return (
    <Flow
      title={`${role} Permissions`}
      subtitle={`Control what ${role} can view, edit, approve and export.`}
    >
      <div className="grid grid-cols-2 gap-4">
        {mods.map((m, i) => (
          <div className="rounded-xl border p-4" key={m}>
            <div className="flex justify-between">
              <b>{m}</b>
              <input
                type="checkbox"
                defaultChecked={role === "Main Admin" || i < 8}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-slate-600">
              {["View", "Edit", "Approve", "Export"].map((x) => (
                <label key={x} className="flex gap-1">
                  <input
                    type="checkbox"
                    defaultChecked={role === "Main Admin" || x === "View"}
                  />
                  {x}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Flow>
  );
}
function CustomRole() {
  return (
    <Flow
      title="Custom Role Builder"
      subtitle="Create a custom role with precise access."
    >
      <FormGrid
        fields={[
          "Role Name",
          "Role Description",
          "Default Property Scope",
          "Reporting Access",
          "Document Access",
          "LIAM Access Level",
        ]}
      />
    </Flow>
  );
}
function PermissionMatrix() {
  const cols = [
    "Main Admin",
    "Property Manager",
    "Finance",
    "Leasing",
    "Maintenance",
    "Investor",
  ];
  const rows = [
    "Dashboard",
    "Properties",
    "Tenants",
    "Leases",
    "Rent",
    "Expenses",
    "Maintenance",
    "Insurance",
    "Financing",
    "Reports",
    "Documents",
    "Banking",
    "Advisors",
    "LIAM",
  ];
  return (
    <>
      <Hero
        title="Permission Matrix"
        subtitle="Compare role access across every product module."
      />
      <section className="mt-5 rounded-2xl border bg-white p-5 shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-slate-500">
            <tr>
              <th>Module</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r} className="border-t">
                <td className="py-3 font-semibold">{r}</td>
                {cols.map((c, j) => (
                  <td key={c}>
                    {j === 0 ||
                    (j === 1 && i < 8) ||
                    (j === 2 &&
                      [
                        "Rent",
                        "Expenses",
                        "Insurance",
                        "Financing",
                        "Reports",
                        "Banking",
                        "Documents",
                      ].includes(r)) ? (
                      <Check className="text-emerald-700" size={18} />
                    ) : (
                      <X className="text-slate-300" size={18} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
function AssignmentDashboard() {
  return (
    <>
      <Hero
        title="Property Assignment Dashboard"
        subtitle="Assign properties to managers and monitor unassigned assets."
      />
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Kpi label="Total Properties" value="26" Icon={Building2} />
        <Kpi label="Assigned" value="21" Icon={CheckCircle2} />
        <Kpi label="Unassigned" value="5" Icon={AlertTriangle} tone="amber" />
        <Kpi label="Managers" value="4" Icon={Users} />
      </div>
      <section className="mt-5 rounded-2xl border bg-white p-5 shadow-card">
        <PropertyTable />
      </section>
    </>
  );
}
function BulkAssignment() {
  return (
    <Flow
      title="Bulk Assignment"
      subtitle="Assign multiple properties to a manager."
    >
      <div className="grid grid-cols-[1fr_330px] gap-5">
        <div>
          <PropertyTable />
        </div>
        <section className="rounded-2xl bg-slate-50 p-5">
          <h3 className="font-semibold">Bulk Assign To</h3>
          <select className="mt-4 h-12 w-full rounded-xl border px-4">
            <option>Daniel Ross</option>
            <option>Marcus Lee</option>
          </select>
          <button className="mt-5 w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white">
            Assign Selected
          </button>
        </section>
      </div>
    </Flow>
  );
}
function AssignmentSuccess(p) {
  return (
    <Success
      {...p}
      title="Properties Assigned"
      subtitle="Selected properties were assigned and dashboards were updated."
      actions={[
        ["View Assignments", "assignment-dashboard"],
        ["Invite Manager", "invite-user"],
        ["Open Users", "users-dashboard"],
      ]}
    />
  );
}
function EmailInvite() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 shadow-card">
      <div className="border-b pb-5">
        <div className="text-sm text-slate-500">Subject</div>
        <h1 className="mt-1 text-2xl font-semibold">
          You’ve been invited to AIPropertyReport
        </h1>
      </div>
      <p className="mt-6 text-sm leading-7 text-slate-700">
        Hi Marcus, Evergreen Property Group invited you to manage assigned
        properties on AIPropertyReport.
      </p>
      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm">
        <b>Assigned Properties</b>
        <ul className="mt-3 list-disc pl-5 text-slate-600">
          <li>Miami Duplex</li>
          <li>Dallas 8-Unit</li>
          <li>Phoenix 16-Unit</li>
        </ul>
      </div>
      <button className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white">
        Activate Account
      </button>
    </div>
  );
}
function Auth({ title, subtitle, button, fields = ["Email Address"] }) {
  return (
    <div className="grid min-h-[650px] place-items-center">
      <section className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <LockKeyhole size={25} />
        </div>
        <h1 className="mt-6 text-center text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-center text-sm leading-6 text-slate-600">
          {subtitle}
        </p>
        <div className="mt-6 space-y-4">
          {fields.map((f) => (
            <label key={f} className="block">
              <span className="text-sm font-semibold">{f}</span>
              <input className="mt-2 h-12 w-full rounded-xl border px-4" />
            </label>
          ))}
        </div>
        <button className="mt-6 w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white">
          {button}
        </button>
      </section>
    </div>
  );
}
function ActivityDashboard() {
  return (
    <>
      <Hero
        title="Activity & Audit Logs"
        subtitle="Track important actions across users, properties, permissions and security."
      />
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Kpi label="Events Today" value="148" Icon={Activity} />
        <Kpi label="Security Alerts" value="4" Icon={ShieldAlert} tone="red" />
        <Kpi label="Exports" value="7" Icon={Download} />
        <Kpi label="Permission Edits" value="12" Icon={UserCog} tone="amber" />
      </div>
      <div className="mt-5">
        <ActivityTable />
      </div>
    </>
  );
}
function ActivityTable() {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-card">
      <h3 className="mb-4 font-semibold">Recent Activity</h3>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            {["Time", "User/System", "Action", "Module", "Status"].map((h) => (
              <th className="py-3" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {audit.map((r) => (
            <tr className="border-t" key={r[2]}>
              {r.map((c, i) => (
                <td className="py-4" key={i}>
                  {i === 4 ? <Status s={c} /> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
function Timeline({ title, subtitle }) {
  return (
    <>
      <Hero title={title} subtitle={subtitle} />
      <section className="mt-5 rounded-2xl border bg-white p-6 shadow-card">
        {audit.map((r, i) => (
          <div
            key={r[2]}
            className="relative border-l border-slate-200 pb-6 pl-6 last:pb-0"
          >
            <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-emerald-700" />
            <div className="text-xs text-slate-500">{r[0]}</div>
            <div className="mt-1 font-semibold">{r[2]}</div>
            <div className="mt-1 text-sm text-slate-600">
              {r[1]} · {r[3]}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
function SubscriptionOverview() {
  return (
    <>
      <Hero
        title="Organization Subscription"
        subtitle="Manage plan, billing cycle, team seats, usage limits and invoices."
      />
      <div className="mt-5 grid grid-cols-3 gap-5">
        <Plan title="Investor" price="$99" />
        <Plan title="Professional" price="$299" active />
        <Plan title="Enterprise" price="$999+" />
      </div>
    </>
  );
}
function Plan({ title, price, active }) {
  return (
    <section
      className={cn(
        "rounded-2xl border p-6 shadow-card",
        active
          ? "border-emerald-700 bg-emerald-50"
          : "border-slate-200 bg-white",
      )}
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        {active && (
          <span className="rounded-lg bg-emerald-700 px-2 py-1 text-xs font-semibold text-white">
            Current
          </span>
        )}
      </div>
      <div className="mt-5 text-3xl font-semibold">
        {price}
        <span className="text-sm text-slate-500">/mo</span>
      </div>
      <ul className="mt-5 space-y-3 text-sm">
        {["Team roles", "Property access", "LIAM insights", "Reports"].map(
          (f) => (
            <li key={f} className="flex gap-2">
              <Check size={16} className="text-emerald-700" />
              {f}
            </li>
          ),
        )}
      </ul>
      <button
        className={cn(
          "mt-6 w-full rounded-xl py-3 text-sm font-semibold",
          active ? "bg-emerald-700 text-white" : "border bg-white",
        )}
      >
        {active ? "Manage Plan" : "Upgrade"}
      </button>
    </section>
  );
}
function LiamOrg() {
  return (
    <>
      <Hero
        title="LIAM Organization Intelligence"
        subtitle="Ask LIAM questions across users, managers, assigned properties, permissions, activity logs, billing and security."
      />
      <div className="mt-5 grid grid-cols-[330px_1fr_330px] gap-5">
        <section className="rounded-2xl border bg-white p-5 shadow-card">
          <h3 className="font-semibold">Suggested Questions</h3>
          {[
            "Which manager has most overdue tasks?",
            "Which properties are unassigned?",
            "Which users have broad permissions?",
            "Show me security issues.",
          ].map((q) => (
            <button
              key={q}
              className="mt-3 w-full rounded-xl bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-900"
            >
              {q}
            </button>
          ))}
        </section>
        <section className="rounded-2xl border bg-white p-5 shadow-card">
          <div className="mb-4 text-sm text-slate-500">You</div>
          <div className="rounded-2xl bg-slate-100 p-4 text-sm">
            Which properties are unassigned?
          </div>
          <div className="mt-6 flex gap-3">
            <Sparkles className="text-emerald-700" />
            <div>
              <b>LIAM</b>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                5 properties are currently unassigned. Austin Warehouse and
                Orlando Retail Center are the highest priority.
              </p>
              <button className="mt-4 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                Open Assignment Workflow
              </button>
            </div>
          </div>
        </section>
        <section className="rounded-2xl border bg-white p-5 shadow-card">
          <h3 className="font-semibold">Recommended Actions</h3>
          {[
            "Assign Austin Warehouse",
            "Review Marcus Lee invite",
            "Restrict document export",
            "Export security log",
          ].map((x) => (
            <div
              key={x}
              className="mt-3 rounded-xl bg-slate-50 p-4 text-sm font-medium"
            >
              {x}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
const map = {
  "org-create": OrgCreate,
  "org-details": OrgDetails,
  "org-branding": OrgBranding,
  "org-business": OrgBusiness,
  "org-success": OrgSuccess,
  "users-dashboard": UsersDashboard,
  "invite-user": InviteUser,
  "select-role": SelectRole,
  "assign-properties": AssignProperties,
  "review-invite": ReviewInvite,
  "invitation-sent": InvitationSent,
  "user-profile": UserProfile,
  "edit-user": EditUser,
  "roles-dashboard": RolesDashboard,
  "admin-permissions": () => <PermissionPage role="Main Admin" />,
  "manager-permissions": () => <PermissionPage role="Property Manager" />,
  "finance-permissions": () => <PermissionPage role="Finance Manager" />,
  "custom-role": CustomRole,
  "permission-matrix": PermissionMatrix,
  "assignment-dashboard": AssignmentDashboard,
  "bulk-assignment": BulkAssignment,
  "assignment-success": AssignmentSuccess,
  "email-invite": EmailInvite,
  "accept-invite": () => (
    <Auth
      title="Accept Invitation"
      subtitle="Join Evergreen Property Group as Maintenance Manager."
      button="Accept Invitation"
    />
  ),
  "create-password": () => (
    <Auth
      title="Create Password"
      subtitle="Set your login credentials."
      button="Create Account"
      fields={["Password", "Confirm Password"]}
    />
  ),
  "mfa-setup": () => (
    <Auth
      title="Set Up MFA"
      subtitle="Protect your account with second-factor authentication."
      button="Enable MFA"
      fields={["Phone Number", "Verification Code"]}
    />
  ),
  "login-success": (p) => (
    <Success
      {...p}
      title="Login Successful"
      subtitle="Welcome to your assigned-property dashboard."
      actions={[
        ["Open Dashboard", "users-dashboard"],
        ["View Assigned Properties", "assignment-dashboard"],
      ]}
    />
  ),
  "activity-dashboard": ActivityDashboard,
  "user-timeline": () => (
    <Timeline
      title="User Activity Timeline"
      subtitle="Track actions for a single user over time."
    />
  ),
  "security-logs": () => (
    <Timeline
      title="Security Logs"
      subtitle="Monitor logins, blocked attempts, password resets and MFA events."
    />
  ),
  "export-logs": (p) => (
    <Success
      {...p}
      title="Export Logs"
      subtitle="Audit logs are ready to download."
      actions={[
        ["Download CSV", "activity-dashboard"],
        ["Return to Logs", "activity-dashboard"],
      ]}
    />
  ),
  "subscription-overview": SubscriptionOverview,
  "team-seats": () => (
    <Flow
      title="Team Seats Management"
      subtitle="Add, remove, or reassign seats."
    >
      <UsersTable />
    </Flow>
  ),
  "billing-history": () => (
    <Flow title="Billing History" subtitle="View invoices and receipts.">
      <ActivityTable />
    </Flow>
  ),
  "upgrade-plan": () => (
    <Flow
      title="Upgrade Plan"
      subtitle="Unlock more seats, properties and LIAM intelligence."
    >
      <div className="grid grid-cols-3 gap-5">
        <Plan title="Investor" price="$99" />
        <Plan title="Professional" price="$299" active />
        <Plan title="Enterprise" price="$999+" />
      </div>
    </Flow>
  ),
  "payment-success": (p) => (
    <Success
      {...p}
      title="Payment Successful"
      subtitle="Your subscription has been updated."
      actions={[
        ["Open Billing", "subscription-overview"],
        ["Manage Seats", "team-seats"],
      ]}
    />
  ),
  "liam-org": LiamOrg,
};
export default Organization;
