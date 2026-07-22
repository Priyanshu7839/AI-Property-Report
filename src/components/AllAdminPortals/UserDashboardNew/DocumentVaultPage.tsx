import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Building2,
  FileBarChart,
  Bookmark,
  TrendingUp,
  GitBranch,
  PieChart,
  ReceiptText,
  Users,
  Settings,
  ChevronRight,
  Search,
  Bell,
  UserRound,
  Upload,
  Sparkles,
  File,
  ShieldCheck,
  Landmark,
  BadgeDollarSign,
  Gavel,
  ClipboardCheck,
  Filter,
  MoreVertical,
  ArrowRight,
  Download,
  Share2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Plus,
  FolderOpen,
  Send,
  ArrowLeft,
  Check,
  Loader2,
  RefreshCcw,
} from "lucide-react";
const cn = (...c) => c.filter(Boolean).join(" ");
const modules = [
  ["Dashboard", LayoutDashboard],
  ["My Properties", Building2],
  ["Reports & Analysis", FileBarChart],
  ["Saved Reports", Bookmark],
  ["Equity & Valuation", TrendingUp],
  ["Strategy Scenarios", GitBranch],
  ["Portfolio Builder", PieChart],
  ["Taxes & Documents", ReceiptText],
  ["Rentals & Income", BadgeDollarSign],
  ["Advisors & Agents", Users],
  ["Invoices & Billing", ReceiptText],
];
const pages = [
  ["vault", "Document Vault"],
  ["leases", "Lease Agreements"],
  ["detail", "Document Detail"],
  ["upload", "Upload Flow"],
  ["extraction", "AI Extraction"],
  ["success", "Upload Success"],
  ["liam", "LIAM Panel"],
  ["empty", "Empty States"],
];
const docCategories = [
  {
    id: "leases",
    title: "Lease Agreements",
    count: 64,
    icon: File,
    desc: "Tenant lease contracts, renewal agreements, addendums, and related documents.",
    bullets: ["Mutual lease dates", "Renewal clause", "Rent escalation clause"],
    recent: "2 uploaded",
  },
  {
    id: "rent",
    title: "Rent Invoices & Receipts",
    count: 98,
    icon: ReceiptText,
    desc: "Monthly rent invoices, receipts, payment records, and overdue notices.",
    bullets: ["Rent invoice", "Rent receipt", "Outstanding statements"],
    recent: "5 uploaded",
  },
  {
    id: "insurance",
    title: "Insurance Policies",
    count: 42,
    icon: ShieldCheck,
    desc: "Property, liability, flood, windstorm, umbrella, and other policies.",
    bullets: ["Policy renewal date", "Premium amount", "Deductible"],
    recent: "1 renewed",
  },
  {
    id: "mortgage",
    title: "Mortgage & Financing",
    count: 36,
    icon: Landmark,
    desc: "Mortgage statements, HELOC, refinance proposals, loan docs, and financing records.",
    bullets: ["Loan balance", "Interest rate", "Maturity date"],
    recent: "1 updated",
  },
  {
    id: "tax",
    title: "Tax Documents",
    count: 31,
    icon: FileBarChart,
    desc: "Property tax bills, tax summaries, deductible expenses, and CPA exports.",
    bullets: ["Tax bill", "Assessment notice", "CPA package"],
    recent: "2 uploaded",
  },
  {
    id: "vendor",
    title: "Invoices & Vendor Bills",
    count: 56,
    icon: BadgeDollarSign,
    desc: "Maintenance bills, contractor invoices, utility bills, HOA, and CAM invoices.",
    bullets: ["Contractor invoice", "Utility bill", "CAM invoice"],
    recent: "4 uploaded",
  },
  {
    id: "permits",
    title: "Permits & Compliance",
    count: 27,
    icon: ClipboardCheck,
    desc: "Building permits, inspections, occupancy and safety certificates.",
    bullets: ["Permit expiry date", "Compliance status", "Inspection required"],
    recent: "1 expiring",
  },
  {
    id: "reports",
    title: "Reports",
    count: 45,
    icon: FileBarChart,
    desc: "AI-generated property, portfolio, insurance and refinance reports.",
    bullets: ["AI Property Report", "Equity Report", "Refinance Scenario"],
    recent: "3 generated",
  },
  {
    id: "tenant",
    title: "Tenant Documents",
    count: 38,
    icon: UserRound,
    desc: "Tenant IDs, renter insurance, income verification, pet docs and more.",
    bullets: ["Tenant ID", "Renter insurance", "Income verification"],
    recent: "2 uploaded",
  },
  {
    id: "legal",
    title: "Legal & Notices",
    count: 18,
    icon: Gavel,
    desc: "Legal notices, eviction notices, attorney letters, and HOA notices.",
    bullets: ["Notice to vacate", "Eviction notice", "Attorney correspondence"],
    recent: "1 uploaded",
  },
];
const leaseDocs = [
  [
    "Miami Duplex Lease.pdf",
    "Miami Duplex - Unit 1",
    "John Smith",
    "Jun 1, 2024 - May 31, 2025",
    "$2,450/mo",
    "Active",
    "May 31, 2025",
    "Mutual lease dates verified.",
  ],
  [
    "Dallas 8-Unit Lease.pdf",
    "Dallas 8-Unit - Unit 3",
    "Sarah Johnson",
    "Mar 15, 2024 - Mar 14, 2025",
    "$1,950/mo",
    "Expiring Soon",
    "Mar 14, 2025",
    "Renews in 26 days.",
  ],
  [
    "Austin Warehouse Lease.pdf",
    "Austin Warehouse",
    "LogiCore LLC",
    "Jan 1, 2024 - Dec 31, 2025",
    "$8,500/mo",
    "Active",
    "Dec 31, 2025",
    "Rent escalation 3% annually.",
  ],
  [
    "Phoenix 16-Unit Lease.pdf",
    "Phoenix 16-Unit - Unit 7",
    "Michael Brown",
    "Apr 1, 2024 - Mar 31, 2025",
    "$1,675/mo",
    "Active",
    "Mar 31, 2025",
    "Standard lease agreement.",
  ],
  [
    "Orlando Retail Lease.pdf",
    "Orlando Retail Center - Unit 2",
    "Retail Kings Inc.",
    "Feb 1, 2024 - Jan 31, 2026",
    "$3,200/mo",
    "Active",
    "Jan 31, 2026",
    "NNN lease. CAM included.",
  ],
  [
    "Addendum - Pet Policy.pdf",
    "Miami Duplex - Unit 1",
    "John Smith",
    "May 10, 2024 - May 31, 2025",
    "—",
    "Active",
    "May 31, 2025",
    "Pet addendum attached.",
  ],
  [
    "Renewal Agreement.pdf",
    "Dallas 8-Unit - Unit 5",
    "James Wilson",
    "Apr 1, 2025 - Mar 31, 2026",
    "$2,100/mo",
    "Draft",
    "Mar 31, 2026",
    "Tenant has option to renew.",
  ],
  [
    "Lease - Storage Unit.pdf",
    "Austin Storage Facility",
    "StoragePros LLC",
    "Sep 1, 2024 - Aug 31, 2025",
    "$950/mo",
    "Active",
    "Aug 31, 2025",
    "Month-to-month after term.",
  ],
];
const recentDocs = [
  [
    "Miami Duplex Lease.pdf",
    "Lease Agreement",
    "Miami Duplex - Unit 1",
    "Abhyuday Dixit",
    "May 14, 2024",
    "May 31, 2025",
    "Active",
    "Yes",
  ],
  [
    "State Farm Insurance Policy.pdf",
    "Insurance Policy",
    "Dallas 8-Unit",
    "Abhyuday Dixit",
    "May 13, 2024",
    "May 20, 2025",
    "Expiring Soon",
    "Yes",
  ],
  [
    "April Rent Invoice.xlsx",
    "Rent Invoice",
    "Austin Warehouse",
    "Abhyuday Dixit",
    "May 12, 2024",
    "—",
    "Paid",
    "Yes",
  ],
  [
    "HVAC Contractor Bill.pdf",
    "Vendor Bill",
    "Phoenix 16-Unit",
    "Property Manager",
    "May 11, 2024",
    "—",
    "Review",
    "No",
  ],
];
function DocumentVaultPage() {
  const [page, setPage] = useState("vault");
  return (
    <div className="min-h-screen bg-[#F6F7F8] text-slate-950">
      <div className="flex">
        {/* <Sidebar page={page} setPage={setPage} /> */}
        <main className=" min-h-screen flex-1">
          {/* <Topbar /> */}
          <div className="px-7 py-6">
            <PageSwitcher page={page} setPage={setPage} />
            {page === "vault" && <DocumentVault />}
            {page === "leases" && <LeaseAgreements />}
            {page === "detail" && <DocumentDetail />}
            {page === "upload" && <UploadDocument />}
            {page === "extraction" && <AIExtraction />}
            {page === "success" && <UploadSuccess />}
            {page === "liam" && <LiamPage />}
            {page === "empty" && <EmptyStates />}
          </div>
        </main>
      </div>
    </div>
  );
}
function Sidebar({ page, setPage }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-[#071018] to-[#0D1820] px-4 py-5 text-white">
      <div className="flex items-center gap-3 px-2 pb-7">
        <Home className="text-emerald-500" size={29} />
        <div className="text-xl font-semibold tracking-tight">
          AIPropertyReport
        </div>
      </div>
      <nav className="space-y-1">
        {modules.map(([m, Icon]) => (
          <button
            key={m}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-white/10"
          >
            <Icon size={18} />
            <span>{m}</span>
          </button>
        ))}
        <div className="rounded-xl bg-white/10">
          <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-3 text-sm font-semibold">
            <span className="flex items-center gap-3">
              <FolderOpen size={18} />
              Documents
            </span>
            <ChevronRight size={16} className="rotate-90" />
          </button>
          <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3 pb-2">
            {pages.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={cn(
                  "block w-full rounded-lg px-3 py-2 text-left text-xs",
                  page === id
                    ? "bg-emerald-700 text-white"
                    : "text-slate-300 hover:bg-white/10",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="absolute bottom-5 left-4 right-4 space-y-4">
        <div className="flex items-center gap-3 border-t border-white/10 pt-5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-700 font-bold">
            AD
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Abhyuday Dixit</div>
            <div className="truncate text-xs text-slate-300">
              abhyuday@investor.com
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Users size={17} />
            Advisor Connect
          </div>
          <p className="mt-2 text-xs text-slate-300">
            Book a call with a specialist to review documents.
          </p>
          <button className="mt-4 w-full rounded-xl bg-emerald-700 py-2 text-sm font-semibold">
            Connect Now
          </button>
        </div>
      </div>
    </aside>
  );
}
function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-7 backdrop-blur">
      <div className="flex h-12 w-[650px] items-center gap-3 rounded-2xl bg-slate-100 px-4">
        <Search size={20} className="text-slate-500" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder="Search documents, leases, invoices, policies, permits..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={21} />
          <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-red-600 text-[10px] text-white">
            3
          </span>
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
          <Users size={17} />
          Advisor Connect
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 font-semibold">
          P
        </div>
      </div>
    </header>
  );
}
function PageSwitcher({ page, setPage }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-card">
      {pages.map(([id, label]) => (
        <button
          onClick={() => setPage(id)}
          key={id}
          className={cn(
            "rounded-xl px-3 py-2 text-xs font-semibold",
            page === id
              ? "bg-slate-950 text-white"
              : "text-slate-600 hover:bg-slate-100",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
function DarkHero({ title, subtext, children, button = true }) {
  return (
    <section className="relative overflow-hidden rounded-[22px] bg-[#071018] p-8 text-white shadow-soft">
      <div className="absolute inset-0 opacity-40">
        <svg
          viewBox="0 0 1200 300"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,210 C160,130 240,150 360,210 C520,300 610,20 780,120 C930,210 960,140 1200,60"
            fill="none"
            stroke="#0B7A3B"
            strokeWidth="2"
          />
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d={`M0,${220 + i * 4} C160,${140 + i * 4} 240,${160 + i * 2} 360,${220 - i * 2} C520,${310 - i * 3} 610,${30 + i * 4} 780,${130 + i * 3} C930,${220 - i * 3} 960,${150 + i * 3} 1200,${70 + i * 2}`}
              fill="none"
              stroke="#0B7A3B"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>
      <div className="relative grid grid-cols-[1fr_420px] gap-8">
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-200">
            {subtext}
          </p>
          {button && (
            <button className="mt-7 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold shadow-lg shadow-emerald-900/20">
              <Upload size={17} className="mr-2 inline" />
              Upload Document
            </button>
          )}
        </div>
        <div className="rounded-2xl bg-white/95 p-5 text-slate-950 shadow-soft">
          {children}
        </div>
      </div>
    </section>
  );
}
function Metric({ value, label }) {
  return (
    <div className="border-b border-slate-200 pb-3">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-slate-600">{label}</div>
    </div>
  );
}
function VaultCard() {
  return (
    <div>
      <div className="font-semibold">Vault Intelligence</div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Metric value="428" label="Documents Stored" />
        <Metric value="37" label="AI Summaries Generated" />
        <Metric value="12" label="Expiring Soon" />
        <Metric value="6" label="Missing Documents" />
      </div>
      <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900">
        <Sparkles size={18} className="mr-2 inline" />
        LIAM: 3 lease agreements require review this week.
      </div>
    </div>
  );
}
function FilterRow({ lease = false }) {
  const filters = lease
    ? [
        "Property",
        "Tenant",
        "Status",
        "Lease Term",
        "Expiry Date",
        "More Filters",
      ]
    : [
        "Property",
        "Tenant",
        "Document Type",
        "Expiry Date",
        "Risk Flag",
        "AI Reviewed",
        "Filters",
      ];
  return (
    <div className="my-5 flex flex-wrap gap-3">
      <div className="flex h-11 min-w-[360px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
        <Search size={16} className="text-slate-500" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder={
            lease
              ? "Search lease agreements..."
              : "Search documents, leases, invoices, policies, permits..."
          }
        />
      </div>
      {filters.map((f) => (
        <button
          key={f}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
        >
          {f === "More Filters" || f === "Filters" ? (
            <Filter size={15} className="mr-2 inline" />
          ) : null}
          {f}
        </button>
      ))}
      <button className="ml-auto h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold">
        Sort: Newest
      </button>
    </div>
  );
}
function DocumentVault() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        Document Vault
      </h2>
      <DarkHero
        title="Your Property Document Vault"
        subtext="All leases, rent invoices, insurance policies, mortgage records, permits, tax files, tenant documents, legal notices, and AI-generated reports organized by LIAM."
      >
        <VaultCard />
      </DarkHero>
      <div className="mt-5 grid  gap-5">
        <div>
          <FilterRow />
          <div className="grid grid-cols-5 gap-3">
            {docCategories.map((c) => (
              <CategoryCard key={c.title} c={c} />
            ))}
          </div>
          <SmartCollections />
          <RecentDocuments />
        </div>
        {/* <RightRail /> */}
      </div>
    </div>
  );
}
function CategoryCard({ c }) {
  const Icon = c.icon;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon size={20} />
        </div>
        <span className="text-sm font-semibold">{c.count}</span>
      </div>
      <h3 className="mt-4 text-sm font-semibold">{c.title}</h3>
      <p className="mt-2 min-h-[50px] text-xs leading-5 text-slate-600">
        {c.desc}
      </p>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
        {c.bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <button className="mt-4 text-xs font-semibold text-emerald-800">
        View Documents <ArrowRight size={13} className="inline" />
      </button>
      <div className="mt-4 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
        Recent: {c.recent}
      </div>
    </div>
  );
}
function SmartCollections() {
  const items = [
    ["Highest Risk Documents", "18", AlertTriangle, "text-red-700 bg-red-50"],
    ["Expiring Soon Documents", "12", Clock3, "text-emerald-700 bg-emerald-50"],
    ["Missing Documents", "6", AlertTriangle, "text-amber-700 bg-amber-50"],
    ["Recently Uploaded", "23", Upload, "text-emerald-700 bg-emerald-50"],
    ["Most Viewed", "31", Eye, "text-emerald-700 bg-emerald-50"],
    ["AI Flagged", "14", Sparkles, "text-emerald-700 bg-emerald-50"],
  ];
  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <h3 className="font-semibold">Smart Collections</h3>
      <div className="mt-3 grid grid-cols-6 gap-3">
        {items.map(([t, n, Icon, cls]) => (
          <div key={t} className="rounded-xl bg-slate-50 p-4">
            <div
              className={cn(
                "mb-2 grid h-9 w-9 place-items-center rounded-full",
                cls,
              )}
            >
              <Icon size={18} />
            </div>
            <div className="text-xs font-semibold">{t}</div>
            <div className="mt-1 text-xs text-slate-500">{n} documents</div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Badge({ children }) {
  return (
    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
      {children}
    </span>
  );
}
function StatusBadge({ status }) {
  const cls =
    status === "Active" || status === "Processed" || status === "Paid"
      ? "bg-emerald-50 text-emerald-800"
      : status === "Expiring Soon" || status === "Review"
        ? "bg-orange-50 text-orange-700"
        : status === "Draft"
          ? "bg-blue-50 text-blue-700"
          : "bg-slate-100 text-slate-600";
  return (
    <span className={cn("rounded-lg px-2 py-1 text-xs font-semibold", cls)}>
      {status}
    </span>
  );
}
function RecentDocuments() {
  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Recent Documents</h3>
        <button className="text-sm font-semibold text-emerald-800">
          View All Documents
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            {[
              "Document Name",
              "Category",
              "Property / Record",
              "Uploaded By",
              "Date",
              "Expiry Date",
              "Status",
              "AI Reviewed",
              "",
            ].map((h) => (
              <th className="py-3 font-medium" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentDocs.map((r) => (
            <tr key={r[0]} className="border-t border-slate-100">
              {r.map((c, i) => (
                <td className="py-3" key={i}>
                  {i === 0 ? (
                    <span className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded bg-red-50 text-red-700">
                        <File size={14} />
                      </span>
                      {c}
                    </span>
                  ) : i === 1 ? (
                    <Badge>{c}</Badge>
                  ) : i === 6 ? (
                    <StatusBadge status={c} />
                  ) : i === 7 ? (
                    <span className="text-emerald-700">✓ {c}</span>
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
function RightRail() {
  return (
    <aside className="space-y-4">
      <LiamMini
        title="LIAM Assistant"
        questions={[
          "Which leases expire in 60 days?",
          "Which policies renew this month?",
          "Which documents are missing?",
          "Summarize recent uploads.",
        ]}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Recent Activity</h3>
          <button className="text-sm font-semibold text-emerald-800">
            View All
          </button>
        </div>
        {[
          "Lease Agreement uploaded",
          "Insurance policy renewed",
          "Invoice linked",
          "Permit expiring in 30 days",
          "Mortgage document updated",
        ].map((x, i) => (
          <div
            key={x}
            className="flex gap-3 border-b border-slate-100 py-3 last:border-0"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <File size={16} />
            </div>
            <div>
              <div className="text-sm font-semibold">{x}</div>
              <div className="text-xs text-slate-500">
                {
                  [
                    "Miami Duplex - Unit 1",
                    "Dallas 8-Unit",
                    "Austin Warehouse",
                    "Phoenix 16-Unit",
                    "Miami Duplex",
                  ][i]
                }
              </div>
            </div>
            <span className="ml-auto text-xs text-slate-400">{i + 1}h ago</span>
          </div>
        ))}
      </section>
    </aside>
  );
}
function LiamMini({ title, questions }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <Sparkles className="text-emerald-700" size={18} />
          {title}
        </h3>
        <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold">
          New Chat
        </button>
      </div>
      <p className="mt-5 text-sm text-slate-600">
        Ask LIAM anything about your documents.
      </p>
      <div className="mt-4 space-y-3">
        {questions.map((q) => (
          <button
            key={q}
            className="flex w-full items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-900"
          >
            {q}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <button className="mt-4 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
        <Sparkles size={16} className="mr-2 inline" />
        Ask LIAM
      </button>
    </section>
  );
}
function LeaseAgreements() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            Document Vault <ChevronRight size={14} />{" "}
            <span className="font-semibold text-slate-900">
              Lease Agreements
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Lease Agreements
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            All lease contracts, renewal agreements, addendums, and related
            lease documents.
          </p>
        </div>
        <button className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
          <Upload size={16} className="mr-2 inline" />
          Upload Document
        </button>
      </div>
      <div className="grid grid-cols-[1fr_340px] gap-5">
        <div>
          <div className="grid grid-cols-5 gap-4">
            {[
              ["64", "Total Documents", File],
              ["3", "Expiring Soon", Clock3],
              ["2", "Require Review", ShieldCheck],
              ["1", "Missing Documents", AlertTriangle],
              ["$2,450/mo", "Total Rent (Active Leases)", BadgeDollarSign],
            ].map(([v, l, Icon]) => (
              <Kpi key={l} v={v} l={l} Icon={Icon} />
            ))}
          </div>
          <FilterRow lease />
          <LeaseTable />
        </div>
        <aside className="space-y-4">
          <LiamMini
            title="LIAM Assistant"
            questions={[
              "Which leases expire in 60 days?",
              "Which leases have renewal options?",
              "Show month-to-month leases.",
              "Which leases have rent escalation clauses?",
              "Which leases are missing addendums?",
            ]}
          />
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <h3 className="font-semibold">Lease Insights</h3>
            {[
              [
                "3",
                "Leases expiring in next 60 days",
                Clock3,
                "text-red-700 bg-red-50",
              ],
              [
                "2",
                "Leases require review",
                ShieldCheck,
                "text-amber-700 bg-amber-50",
              ],
              [
                "$20,875/mo",
                "Total active rent",
                BadgeDollarSign,
                "text-emerald-700 bg-emerald-50",
              ],
            ].map(([v, l, Icon, cls]) => (
              <div
                key={l}
                className="mt-4 rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full",
                      cls,
                    )}
                  >
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{v}</div>
                    <div className="text-xs text-slate-500">{l}</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-emerald-800">
              View Lease Dashboard <ArrowRight size={15} className="inline" />
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
function Kpi({ v, l, Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon size={20} />
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{v}</div>
      <div className="mt-1 text-xs text-slate-600">{l}</div>
    </div>
  );
}
function LeaseTable() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            {[
              "Document Name",
              "Property",
              "Tenant",
              "Lease Term",
              "Rent",
              "Status",
              "Expiry Date",
              "AI Summary",
              "Actions",
            ].map((h) => (
              <th className="px-5 py-4 font-medium" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaseDocs.map((r) => (
            <tr key={r[0]} className="border-t border-slate-100">
              {r.map((c, i) => (
                <td className="px-5 py-4 align-top" key={i}>
                  {i === 0 ? (
                    <span className="flex items-center gap-2">
                      <File size={15} />
                      {c}
                    </span>
                  ) : i === 5 ? (
                    <StatusBadge status={c} />
                  ) : i === 6 ? (
                    <span
                      className={
                        c.includes("2025") &&
                        !c.includes("Dec") &&
                        !c.includes("Jan")
                          ? "text-red-600"
                          : "text-emerald-700"
                      }
                    >
                      {c}
                    </span>
                  ) : (
                    c
                  )}
                </td>
              ))}
              <td className="px-5 py-4">
                <MoreVertical size={17} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
        <span>Showing 1 to 8 of 64 results</span>
        <div className="flex gap-2">
          <button className="rounded-lg border px-3 py-1">1</button>
          <button className="rounded-lg px-3 py-1">2</button>
          <button className="rounded-lg px-3 py-1">3</button>
        </div>
      </div>
    </div>
  );
}
function DocumentDetail() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft size={18} /> Lease Agreements <ChevronRight size={14} />{" "}
          <span className="font-semibold text-slate-900">
            Miami Duplex Lease.pdf
          </span>
        </div>
        <div className="flex gap-2">
          {["Download", "Share", "Replace"].map((x, i) => (
            <button
              key={x}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"
            >
              {i === 0 ? (
                <Download size={15} className="mr-2 inline" />
              ) : i === 1 ? (
                <Share2 size={15} className="mr-2 inline" />
              ) : (
                <RefreshCcw size={15} className="mr-2 inline" />
              )}
              {x}
            </button>
          ))}
          <button className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
            <Sparkles size={15} className="mr-2 inline" />
            Ask LIAM
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[300px_1fr_360px] gap-5">
        <aside className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
            <span>Preview</span>
            <span>3 pages</span>
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="mb-4 rounded-xl bg-white p-3 text-slate-950"
            >
              <div className="h-56 rounded-lg border border-slate-200 bg-slate-50 p-4 text-[8px] leading-4">
                <strong>RESIDENTIAL LEASE AGREEMENT</strong>
                <p className="mt-2">
                  1. PARTIES. This lease agreement is made by and between
                  Landlord and Tenant...
                </p>
                <p className="mt-2">
                  2. PROPERTY. Landlord leases to Tenant the property located at
                  123 Ocean Dr...
                </p>
                <p className="mt-2">
                  3. TERM. The lease term shall commence on June 1, 2024 and
                  terminate May 31, 2025...
                </p>
              </div>
              <div className="mt-2 text-center text-xs text-slate-500">
                Page {i}
              </div>
            </div>
          ))}
        </aside>
        <main className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <h1 className="text-center text-lg font-semibold">
            RESIDENTIAL LEASE AGREEMENT
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-sm leading-7 text-slate-800">
            {[
              "PARTIES. This Lease Agreement is made on May 30, 2024, between John Smith, Tenant, and Abhyuday Dixit, Landlord.",
              "PROPERTY. Landlord hereby leases to Tenant the property located at 123 Ocean Drive, Miami, FL 33139.",
              "TERM. The lease term shall commence on June 1, 2024 and shall terminate on May 31, 2025.",
              "RENT. Tenant shall pay landlord rent of Two Thousand Four Hundred Fifty Dollars per month, due on the 1st day of each month.",
              "SECURITY DEPOSIT. Tenant shall pay a security deposit of Two Thousand Four Hundred Fifty Dollars.",
            ].map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </main>
        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">AI Extracted Summary</h3>
              <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">
                92%
              </span>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Document Type", "Lease Agreement"],
                ["Property", "Miami Duplex, 123 Ocean Dr"],
                ["Tenant", "John Smith"],
                ["Lease Term", "Jun 1, 2024 - May 31, 2025"],
                ["Monthly Rent", "$2,450"],
                ["Rent Escalation", "3% annual"],
                ["Renewal Option", "Yes, offer 75 days before expiry"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                >
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <h3 className="flex items-center gap-2 font-semibold">
              <Sparkles size={17} className="text-emerald-700" />
              LIAM Insights
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This is a standard 12-month lease with a 3% annual rent escalation
              clause.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Rent and due date",
                "Security deposit",
                "Late fee",
                "Maintenance",
                "Pets allowed",
                "Subletting not allowed",
                "Renewal option",
              ].map((x) => (
                <li className="flex gap-2" key={x}>
                  <Check size={15} className="text-emerald-700" />
                  {x}
                </li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-emerald-800">
              Create Reminder
            </button>
          </section>
          <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <h3 className="text-sm font-semibold text-red-800">Risk Flags</h3>
            <p className="mt-2 text-sm text-red-700">
              No major risks detected.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
function StepBar({ active = 0 }) {
  const steps = ["Upload", "Document Type", "Link Record", "Review", "Confirm"];
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full text-sm font-bold",
                i <= active
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "text-sm font-semibold",
                i === active ? "text-slate-950" : "text-slate-600",
              )}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="mx-4 h-px flex-1 bg-slate-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
function UploadDocument() {
  return (
    <div>
      <div className="mb-7">
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          Documents <ChevronRight size={14} />{" "}
          <span className="font-semibold text-slate-900">Upload Document</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Upload Document
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload and classify your document. LIAM will extract key details and
          organize it for you.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_340px] gap-6">
        <main>
          <StepBar active={0} />
          <section className="mt-8 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-16 text-center shadow-card">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <Upload size={38} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">
              Drag & drop your document here
            </h2>
            <p className="mt-3 text-sm text-slate-500">or</p>
            <button className="mt-6 rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-emerald-800">
              <Upload size={17} className="mr-2 inline" />
              Choose File
            </button>
            <p className="mt-5 text-sm text-slate-500">
              PDF, JPG, PNG, DOCX up to 25MB
            </p>
          </section>
          <RecentUploadTable />
        </main>
        <aside className="space-y-4">
          <InfoPanel />
          <SupportedTypes />
        </aside>
      </div>
    </div>
  );
}
function RecentUploadTable() {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
        Recently Uploaded
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            {[
              "Document Name",
              "Type",
              "Property / Record",
              "Uploaded By",
              "Date",
              "Status",
              "",
            ].map((h) => (
              <th key={h} className="py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            [
              "Insurance Policy 2024.pdf",
              "Insurance",
              "Miami Duplex",
              "Abhyuday Dixit",
              "Jun 14, 2024",
              "Processed",
            ],
            [
              "Lease Agreement.pdf",
              "Lease",
              "Dallas 8-Unit",
              "Abhyuday Dixit",
              "Jun 12, 2024",
              "Processed",
            ],
            [
              "Tax Bill 2024.jpg",
              "Tax Document",
              "Austin Warehouse",
              "Abhyuday Dixit",
              "Jun 10, 2024",
              "Processed",
            ],
            [
              "Inspection Report.docx",
              "Inspection",
              "Phoenix 16-Unit",
              "Abhyuday Dixit",
              "Jun 9, 2024",
              "Processing",
            ],
          ].map((r) => (
            <tr className="border-t border-slate-100" key={r[0]}>
              {r.map((c, i) => (
                <td className="py-4" key={i}>
                  {i === 0 ? (
                    <span className="flex items-center gap-2">
                      <File size={17} />
                      {c}
                    </span>
                  ) : i === 1 ? (
                    <Badge>{c}</Badge>
                  ) : i === 5 ? (
                    <StatusBadge status={c} />
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
function InfoPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="flex items-center gap-2 font-semibold">
        <Sparkles className="text-emerald-700" size={19} />
        LIAM Document Assistant
      </h3>
      <p className="mt-5 text-sm leading-6 text-slate-600">
        LIAM automatically reads your document and extracts important
        information.
      </p>
      <div className="mt-6 border-t border-slate-100 pt-5">
        <h4 className="font-semibold">What LIAM Extracts</h4>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            "Key dates & terms",
            "Financial amounts",
            "Property details",
            "Parties involved",
            "Important clauses",
            "Renewal & expiration",
            "And more...",
          ].map((x) => (
            <li className="flex gap-2" key={x}>
              <Check size={16} className="text-emerald-700" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
        <Sparkles size={16} className="mr-2 inline" />
        Save time, reduce errors, and keep everything organized.
      </div>
    </section>
  );
}
function SupportedTypes() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="font-semibold">Supported Document Types</h3>
      <div className="mt-4 space-y-3 text-sm">
        {[
          "Lease Agreements",
          "Insurance Policies",
          "Mortgage Documents",
          "Tax Documents",
          "Invoices & Receipts",
          "Permits & Licenses",
          "Inspection Reports",
          "Other Documents",
        ].map((x) => (
          <div className="flex gap-2" key={x}>
            <File size={16} />
            {x}
          </div>
        ))}
      </div>
    </section>
  );
}
function AIExtraction() {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <h1 className="text-3xl font-semibold tracking-tight">
          LIAM is reading your document...
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Extracting key information and organizing it for you.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6">
          {[
            "Detecting Document Type",
            "Extracting Key Fields",
            "Linking Records",
            "Generating AI Summary",
            "Creating Reminders",
          ].map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full",
                  i < 2
                    ? "bg-emerald-700 text-white"
                    : i === 2
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500",
                )}
              >
                {i === 1 ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : i < 1 ? (
                  <Check size={20} />
                ) : (
                  <File size={18} />
                )}
              </div>
              <div className="max-w-[120px] text-xs font-medium">
                {i + 1}. {s}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 text-left">
          <section className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold">Extracted So Far</h3>
            {[
              ["Document Type", "Lease Agreement"],
              ["Property", "Miami Duplex"],
              ["Tenant", "John Smith"],
              ["Lease Term", "Jun 1, 2024 - May 31, 2025"],
              ["Monthly Rent", "$2,450.00"],
            ].map(([k, v]) => (
              <div
                className="mt-4 flex items-center justify-between border-b border-slate-100 pb-2 text-sm"
                key={k}
              >
                <span className="text-slate-500">{k}</span>
                <span className="font-medium">
                  {v}{" "}
                  <Check size={14} className="ml-2 inline text-emerald-700" />
                </span>
              </div>
            ))}
          </section>
          <section className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold">Document Preview</h3>
            <div className="mt-4 h-80 rounded-xl bg-slate-50 p-8 text-xs leading-5 text-slate-600">
              <strong>RESIDENTIAL LEASE AGREEMENT</strong>
              <p className="mt-3">
                This lease agreement is being parsed by LIAM. Key parties, rent
                terms, renewal clauses, and expiry dates are being extracted...
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
function UploadSuccess() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-700 text-white">
          <Check size={34} />
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          Document Uploaded & Organized!
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          LIAM has analyzed your document and added it to the vault.
        </p>
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 text-left">
          {[
            ["Category Assigned", "Lease Agreements"],
            ["Linked Property", "Miami Duplex | 123 Ocean Drive, Miami, FL"],
            ["Linked Tenant", "John Smith"],
            ["Key Fields Extracted", "12 fields extracted"],
            ["Reminder Created", "Lease expires on May 31, 2025"],
            ["AI Summary Generated", "Yes"],
          ].map(([k, v]) => (
            <div
              className="flex justify-between border-b border-slate-100 px-5 py-4 last:border-0"
              key={k}
            >
              <span className="text-sm text-slate-500">{k}</span>
              <span className="text-sm font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {["Open Document", "View Category", "Upload Another", "Ask LIAM"].map(
            (b, i) => (
              <button
                key={b}
                className={cn(
                  "rounded-xl px-5 py-3 text-sm font-semibold",
                  i === 0
                    ? "bg-emerald-700 text-white"
                    : "border border-slate-200 bg-white",
                )}
              >
                {b}
              </button>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
function LiamPage() {
  return (
    <div className="grid grid-cols-[320px_1fr_330px] gap-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="font-semibold">Ask LIAM About Documents</h3>
        <div className="mt-4 space-y-2">
          {[
            "Show me all lease agreements expiring in 60 days.",
            "Which rent invoices are unpaid?",
            "Which insurance policies renew soon?",
            "Which mortgage documents are missing?",
            "Which tax files are ready for CPA?",
          ].map((q) => (
            <button
              key={q}
              className="w-full rounded-xl bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-900"
            >
              {q}
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="mb-4 text-sm text-slate-500">You</div>
        <div className="rounded-2xl bg-slate-100 p-4 text-sm">
          Show me all lease agreements expiring in 60 days.
        </div>
        <div className="mt-6 flex gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <Sparkles size={17} />
          </div>
          <div className="flex-1">
            <div className="font-semibold">LIAM</div>
            <p className="mt-2 text-sm text-slate-600">
              Here are 3 lease agreements expiring in the next 60 days.
            </p>
            <table className="mt-4 w-full text-left text-sm">
              <tbody>
                {leaseDocs.slice(0, 3).map((r) => (
                  <tr key={r[0]} className="border-t">
                    <td className="py-3">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[6]}</td>
                    <td className="text-emerald-700">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex gap-2">
              <button className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                Create Renewal Tasks
              </button>
              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
                Export List
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex rounded-xl border border-slate-200 p-2">
          <input
            className="flex-1 px-3 text-sm outline-none"
            placeholder="Ask LIAM anything about your documents..."
          />
          <button className="rounded-lg bg-emerald-700 p-2 text-white">
            <Send size={17} />
          </button>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="flex items-center gap-2 font-semibold">
          <Sparkles size={17} className="text-emerald-700" />
          LIAM Insights
        </h3>
        <p className="mt-4 text-sm text-slate-600">
          3 lease agreements need review this week.
        </p>
        <div className="mt-5 space-y-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3">
            Review Dallas 8-Unit lease renewal terms.
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            Consider rent adjustment for Phoenix 16-Unit.
          </div>
        </div>
        <button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-emerald-800">
          View All Insights
        </button>
      </section>
    </div>
  );
}
function EmptyStates() {
  const states = [
    [
      "No Documents Yet",
      "Upload your first document to start building your vault.",
      "Upload Document",
      File,
    ],
    [
      "No Documents in This Category",
      "There are no documents in this category yet.",
      "Upload Document",
      FolderOpen,
    ],
    [
      "No Search Results",
      "We couldn’t find any documents matching your search.",
      "Clear Filters",
      Search,
    ],
    [
      "No Expiring Documents",
      "Great! No documents are expiring soon.",
      "View Vault",
      CheckCircle2,
    ],
  ];
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Empty States
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {states.map(([t, d, b, Icon]) => (
          <section
            key={t}
            className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <Icon size={28} />
            </div>
            <h3 className="mt-5 font-semibold">{t}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{d}</p>
            <button className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">
              {b}
            </button>
          </section>
        ))}
      </div>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="font-semibold">Additional Functional States</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-50 p-5">
            <Sparkles className="text-emerald-700" />
            <h4 className="mt-3 font-semibold">LIAM Insights Panel</h4>
            <p className="mt-2 text-sm text-slate-600">
              Shows document risks, reminders, missing files, and recommended
              actions.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <Upload className="text-emerald-700" />
            <h4 className="mt-3 font-semibold">Document Upload Flow State</h4>
            <p className="mt-2 text-sm text-slate-600">
              Shows upload, scan, extract, review, confirm, and success states.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default DocumentVaultPage;
