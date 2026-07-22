import React from "react";
import {
  Home, LayoutDashboard, Building2, FileText, TrendingUp, GitBranch, PieChart,
  ClipboardList, CircleDollarSign, Users, ReceiptText, Settings, HelpCircle,
  Search, Bell, ChevronRight, ChevronDown, Plus, ShieldCheck, DollarSign,
  ArrowUpRight, SlidersHorizontal, Grid3X3, Download, Share2, Star,
  MoreVertical, Eye, AlertTriangle, Sparkles
} from "lucide-react";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard },
  { label: "My Properties", icon: Building2 },
  { label: "Saved Reports", icon: FileText, active: true },
  { label: "Equity & Valuation", icon: TrendingUp },
  { label: "Strategy Scenarios", icon: GitBranch },
  { label: "Portfolio Builder", icon: PieChart },
  { label: "Taxes & Documents", icon: ClipboardList },
  { label: "Rental & Income", icon: CircleDollarSign },
  { label: "Advisors & Agents", icon: Users },
  { label: "Invoices & Billing", icon: ReceiptText },
  { label: "Settings", icon: Settings },
];

const kpis = [
  { label: "Total Reports", value: "42", icon: FileText },
  { label: "Property Reports", value: "18", icon: Home },
  { label: "Portfolio Reports", value: "6", icon: PieChart },
  { label: "Insurance Reports", value: "5", icon: ShieldCheck },
  { label: "Refinancing Reports", value: "8", icon: DollarSign },
  { label: "Strategy Reports", value: "5", icon: ArrowUpRight },
];

const reports = [
  {
    title: "Miami Duplex",
    address: "123 Ocean Dr, Miami, FL 33139",
    type: "Property Report",
    date: "Jun 14, 2024",
    score: "92/100",
    upside: "$38,000",
    status: "New",
    statusTone: "bg-emerald-600",
    summary: "Insurance and refinance opportunities detected.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Dallas 8-Unit",
    address: "2211 Maple Ave, Dallas, TX 75201",
    type: "Refinancing Report",
    date: "Jun 12, 2024",
    score: "88/100",
    upside: "$24,500",
    status: "Review",
    statusTone: "bg-amber-500",
    summary: "Strong cash-out refinance potential identified.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Austin Warehouse",
    address: "8901 Industrial Blvd, Austin, TX 78724",
    type: "Insurance Report",
    date: "Jun 10, 2024",
    score: "76/100",
    upside: "$12,300",
    status: "New",
    statusTone: "bg-emerald-600",
    summary: "Premium is 18% above market average.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Phoenix 16-Unit",
    address: "445 N Central Ave, Phoenix, AZ 85004",
    type: "Strategy Scenario",
    date: "Jun 8, 2024",
    score: "81/100",
    upside: "$31,200",
    status: "Review",
    statusTone: "bg-amber-500",
    summary: "Consider rent increase strategy Q3 2024.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
];

const collections = [
  { label: "Highest Opportunity", count: "8 reports", icon: Sparkles, tone: "text-emerald-700 bg-emerald-50" },
  { label: "Expiring Insurance", count: "4 reports", icon: ShieldCheck, tone: "text-emerald-700 bg-emerald-50" },
  { label: "Refinance Candidates", count: "7 reports", icon: DollarSign, tone: "text-emerald-700 bg-emerald-50" },
  { label: "Highest Risk", count: "6 reports", icon: AlertTriangle, tone: "text-red-600 bg-red-50" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col bg-[#071116] text-white shadow-2xl lg:flex">
      <div className="flex h-20 items-center gap-3 px-7">
        <Home className="h-8 w-8 text-emerald-500" />
        <span className="text-xl font-bold tracking-tight">AIPropertyReport</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`group flex h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-medium transition ${
                item.active
                  ? "bg-white/12 text-white shadow-inner ring-1 ring-white/10"
                  : "text-slate-200 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{item.label}</span>
              {item.active && <ChevronRight className="h-4 w-4 text-slate-300" />}
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl p-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-sm font-bold">AD</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Abhyuday Dixit</p>
            <p className="truncate text-xs text-slate-300">abhyuday@investor.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-300" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Users className="h-4 w-4" />
            Advisor Connect
          </div>
          <p className="mb-4 text-xs leading-5 text-slate-300">Book a call with a specialist to review your portfolio or reports.</p>
          <button className="h-10 w-full rounded-xl bg-emerald-800 text-sm font-semibold text-white transition hover:bg-emerald-700">Connect Now</button>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <HelpCircle className="h-5 w-5" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Need Help?</p>
            <p className="text-xs text-slate-300">Visit our Help Center</p>
          </div>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur xl:px-8">
      <div className="flex h-11 flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 lg:max-w-[660px]">
        <Search className="h-5 w-5 text-slate-500" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search properties, reports, or analyze address..." />
        <span className="hidden rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-500 shadow-sm sm:inline">⌘ K</span>
      </div>

      <button className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">3</span>
      </button>

      <button className="hidden h-11 items-center gap-2 rounded-xl bg-[#071116] px-5 text-sm font-semibold text-white shadow-sm md:flex">
        <Users className="h-4 w-4" />
        Advisor Connect
      </button>

      <button className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">P</button>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#071116] p-8 text-white shadow-xl xl:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute right-[-8%] top-[-20%] h-[420px] w-[620px] rounded-full bg-emerald-500/10 blur-3xl" />
        <svg className="absolute bottom-0 right-0 h-full w-[70%]" viewBox="0 0 900 360" fill="none">
          {[...Array(18)].map((_, i) => (
            <path key={i} d={`M0 ${260 - i * 7} C 180 ${180 - i * 4}, 250 ${300 - i * 5}, 430 ${190 - i * 4} S 690 ${80 + i * 5}, 900 ${140 - i * 2}`} stroke="rgba(16,185,129,0.22)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="relative grid gap-8 xl:grid-cols-[1fr_480px]">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight xl:text-5xl">Your AI Intelligence Library</h1>
          <p className="max-w-xl text-base leading-7 text-slate-200">
            Every property analysis, equity review, refinance scenario, insurance review, and portfolio report generated by <span className="text-emerald-400">LIAM.</span>
          </p>
          <button className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Generate New Report
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 text-slate-950 shadow-2xl">
          <h3 className="mb-5 text-sm font-bold">Reports Summary</h3>
          <div className="grid grid-cols-2 gap-5">
            <SummaryMetric value="42" label="Reports Generated" />
            <SummaryMetric value="8" label="New This Month" />
            <SummaryMetric value="3" label="Require Review" />
            <SummaryMetric value="$128K" label="Identified Opportunity" />
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            <Sparkles className="mt-0.5 h-5 w-5" />
            <span>LIAM: Three reports contain refinancing opportunities worth reviewing.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryMetric({ value, label }) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function KpiStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-slate-950">{kpi.value}</div>
              <div className="text-xs font-medium text-slate-500">{kpi.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FilterBar() {
  const filters = ["Report Type", "Property", "Date", "Opportunity Score", "More Filters"];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:flex-row xl:items-center">
      <div className="flex h-11 flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4">
        <Search className="h-4 w-4 text-slate-500" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search reports by property, address, type..." />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">
            {filter === "More Filters" && <SlidersHorizontal className="h-4 w-4" />}
            {filter}
            {filter !== "More Filters" && <ChevronDown className="h-4 w-4" />}
          </button>
        ))}
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">
          Sort: Newest
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700">
          <Grid3X3 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ReportCard({ report }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <img src={report.image} alt="" className="h-full w-full object-cover" />
        <span className={`absolute left-4 top-4 rounded-lg ${report.statusTone} px-3 py-1 text-sm font-bold text-white`}>{report.status}</span>
        <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/25 text-white backdrop-blur">
          <Star className="h-5 w-5" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-slate-950">{report.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{report.address}</p>

        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-bold text-violet-700">{report.type}</span>
          <span className="text-xs text-slate-500">Generated: {report.date}</span>
        </div>

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between"><span className="text-slate-600">Opportunity Score</span><span className="font-bold text-emerald-700">{report.score}</span></div>
          <div className="flex justify-between"><span className="text-slate-600">Estimated Upside</span><span className="font-bold text-emerald-700">{report.upside}</span></div>
        </div>

        <div className="mt-5 flex gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          <Sparkles className="h-5 w-5 shrink-0" />
          <span>LIAM: {report.summary}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-700">
          <button className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />Open</button>
          <button className="inline-flex items-center gap-1"><Download className="h-4 w-4" />PDF</button>
          <button className="inline-flex items-center gap-1"><Share2 className="h-4 w-4" />Share</button>
          <button><MoreVertical className="h-5 w-5" /></button>
        </div>
      </div>
    </article>
  );
}

function SmartCollections() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 xl:grid-cols-[220px_1fr_auto] xl:items-center">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Smart Collections</h3>
          <p className="mt-1 text-sm leading-5 text-slate-500">Curated report collections to help you focus on what matters.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <button key={collection.label} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 text-left transition hover:bg-slate-100">
                <span className={`grid h-12 w-12 place-items-center rounded-full ${collection.tone}`}><Icon className="h-6 w-6" /></span>
                <span><span className="block text-sm font-bold text-slate-950">{collection.label}</span><span className="text-xs text-slate-500">{collection.count}</span></span>
              </button>
            );
          })}
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-emerald-700">
          View All Collections
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default function Reports() {
  return (
    <div className="min-h-screen bg-[#f6f7f6] font-sans text-slate-950">
      {/* <Sidebar /> */}
      <div className="">
       
        <main className="space-y-5 p-5 xl:p-8">
          <h1 className="text-3xl font-bold tracking-tight">Saved Reports</h1>
          <Hero />
          <KpiStrip />
          <FilterBar />
          <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {reports.map((report) => <ReportCard key={report.title} report={report} />)}
          </section>
          <SmartCollections />
        </main>
      </div>
    </div>
  );
}
