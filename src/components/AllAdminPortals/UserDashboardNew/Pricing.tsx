import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  WalletCards,
  ReceiptText,
  Wrench,
  ShieldCheck,
  Landmark,
  BarChart3,
  FolderOpen,
  Bot,
  LockKeyhole,
  Headphones,
  Clock3,
  CircleDollarSign,
  TrendingUp,
  Star,
  BriefcaseBusiness,
  Building,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  Database,
  Menu,
  AlertTriangle,
} from "lucide-react";

const nav = [
  ["Dashboard", LayoutDashboard],
  ["Properties", Building2],
  ["Tenants", Users],
  ["Leases", FileText],
  ["Rent & Income", WalletCards],
  ["Expenses", ReceiptText],
  ["Maintenance", Wrench],
  ["Insurance", ShieldCheck],
  ["Financing", Landmark],
  ["Reports", BarChart3],
  ["Documents", FolderOpen],
  ["LIAM AI COO", Bot],
];
const plans = [
  {
    name: "Homeowner Free",
    Icon: Home,
    price: "$0",
    desc: "For homeowners getting started with insights",
    cta: "Get Started Free",
    style: "outline",
    foot: "No credit card required",
    features: [
      "3 Property Reports / month",
      "Home Value Estimate",
      "Equity & Loan to Value",
      "Refinance Potential",
      "Insurance Cost Review",
      "Basic AI Insights (LIAM)",
      "Market Trends",
    ],
    disabled: [
      "Portfolio Tracking",
      "Rent & Expense Tracking",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
 
  {
    name: "Investor",
    Icon: Building2,
    price: "$99",
    desc: "For real estate investors managing multiple properties",
    cta: "Start 7-Day Free Trial",
    style: "purple",
    foot: "Cancel anytime",
    popular: true,
    features: [
      "Up to 25 Properties",
      "Everything in LIAM Plus",
      "Rent Tracking & Rent Roll",
      "Cash Flow & NOI Tracking",
      "Lease Tracking & Alerts",
      "Property Health Scores",
      "Maintenance Tracking",
      "Documents & Storage (25GB)",
      "Advanced AI (LIAM)",
      "Portfolio Performance Analytics",
    ],
    disabled: [],
  },
  {
    name: "Professional",
    Icon: BriefcaseBusiness,
    price: "$299",
    desc: "For property managers and real estate pros",
    cta: "Start 7-Day Free Trial",
    style: "blue",
    foot: "Cancel anytime",
    features: [
      "Up to 100 Properties",
      "Everything in Investor",
      "Team Members (5 Included)",
      "Advisor Integrations",
      "Insurance Optimization",
      "Refinance Optimization",
      "Custom Reports & Templates",
      "Commercial Property Support",
      "Priority Support",
      "Documents & Storage (100GB)",
    ],
    disabled: [],
  },
  {
    name: "Enterprise",
    Icon: Building,
    price: "$999+",
    desc: "For large portfolios, funds and real estate companies",
    cta: "Contact Sales",
    style: "gold",
    foot: "Custom pricing",
    features: [
      "Unlimited Properties",
      "Everything in Professional",
      "Unlimited Team Members",
      "Advanced Permissions",
      "White-Label Platform",
      "API Access",
      "Custom AI Models",
      "Dedicated Account Manager",
      "Priority Onboarding",
      "Documents & Storage (1TB+)",
    ],
    disabled: [],
  },
];
const benefits = [
  ["Save Time", "Automate analysis and get answers in seconds.", Clock3],
  [
    "Save Money",
    "Find savings in insurance, financing, and operations.",
    CircleDollarSign,
  ],
  [
    "Make Smarter Decisions",
    "AI-powered insights for max return on your assets.",
    TrendingUp,
  ],
  [
    "Bank-Level Security",
    "Your data is encrypted and always protected.",
    ShieldCheck,
  ],
];
const faqs = [
  "Can I change plans later?",
  "Is there a free trial?",
  "What happens if I cancel?",
  "Do you offer annual discounts?",
  "Is my data secure?",
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true),
    [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-slate-950 antialiased">
      <div className="flex">
     
        {open && (
          <button
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <main className="w-full ">
          <section className="mx-auto max-w-[1720px] px-4 py-5 sm:px-6 lg:px-7 xl:px-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <button
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Menu size={20} />
              </button>
              <div className="hidden rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:inline-flex">
                <LockKeyhole size={13} className="mr-1.5" />
                Secure. Transparent. Built for Property Owners.
              </div>
              <div className="ml-auto flex items-center gap-6 text-xs font-semibold text-slate-800">
                <div className="hidden items-center gap-2 md:flex">
                  <ShieldCheck size={16} />
                  30-Day Money Back Guarantee
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                  <Headphones size={16} />
                  <span>
                    Need help choosing?
                    <br />
                    <b className="text-emerald-700">Talk to Sales</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h1 className="max-w-5xl text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Choose the Perfect Plan for Your Real Estate Journey
                </h1>
                <p className="mt-3 text-base text-slate-600">
                  Start free. Upgrade anytime. Cancel anytime.
                </p>
              </div>
              <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setAnnual(false)}
                  className={`${!annual ? "bg-slate-100 text-slate-950" : "text-slate-500"} h-10 rounded-lg px-7 text-sm font-bold transition`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`${annual ? "bg-emerald-700 text-white" : "text-slate-500"} relative h-10 rounded-lg px-7 text-sm font-bold transition`}
                >
                  Annual
                  <span className="absolute -right-10 -top-2 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                    Save up to 20%
                  </span>
                </button>
              </div>
            </div>
            <div className="grid gap-4 ">
              <div className="grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                {plans.map((p) => (
                  <Plan key={p.name} p={p} annual={annual} />
                ))}
              </div>
              {/* <aside className="space-y-4">
                <InfoPanel />
                <FaqPanel />
                <CustomPanel />
              </aside> */}
            </div>
            <LiamIncluded />
            <TrustBar />
          </section>
        </main>
      </div>
    </div>
  );
}
function Plan({ p, annual }) {
  const I = p.Icon;
  const price =
    annual && p.price !== "$0" && !p.price.includes("+")
      ? `$${Math.round(Number(p.price.replace("$", "")) * 0.8)}`
      : p.price;
  const c = {
    green: "bg-emerald-700 text-white hover:bg-emerald-800",
    purple:
      "bg-gradient-to-r from-violet-700 to-violet-600 text-white hover:from-violet-800 hover:to-violet-700",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    gold: "border border-amber-500 text-amber-800 hover:bg-amber-50",
    outline: "border border-emerald-700 text-emerald-800 hover:bg-emerald-50",
  }[p.style];
  return (
    <article
      className={`${p.popular ? "border-violet-600 ring-2 ring-violet-500/10" : "border-slate-200"} relative rounded-2xl border bg-white px-5 py-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
    >
      {p.popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto flex h-8 w-[calc(100%-16px)] items-center justify-center rounded-t-2xl bg-violet-700 text-xs font-black uppercase text-white">
          Most Popular
        </div>
      )}
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-900">
        <I
          size={30}
          className={
            p.style === "purple"
              ? "text-violet-700"
              : p.style === "blue"
                ? "text-blue-700"
                : p.style === "gold"
                  ? "text-amber-800"
                  : p.style === "green"
                    ? "text-emerald-700"
                    : "text-slate-900"
          }
        />
      </div>
      <h2 className="min-h-[56px] text-center text-2xl font-black leading-tight tracking-[-0.03em]">
        {p.name}
      </h2>
      <p className="mx-auto mt-3 min-h-[54px] max-w-[220px] text-center text-sm leading-relaxed text-slate-600">
        {p.desc}
      </p>
      <div className="my-6 text-center">
        <span className="text-4xl font-black tracking-[-0.04em]">{price}</span>
        <span className="ml-1 text-sm text-slate-600">/month</span>
        <div className="mt-1 text-xs text-slate-500">
          {p.price === "$0"
            ? "\u00A0"
            : annual
              ? "billed annually"
              : "billed monthly"}
        </div>
      </div>
      <button
        className={`mb-6 h-12 w-full rounded-xl text-sm font-black transition ${c}`}
      >
        {p.cta}
      </button>
      <ul className="space-y-3">
        {[
          ...p.features.map((f) => [f, true]),
          ...p.disabled.map((f) => [f, false]),
        ].map(([f, ok]) => (
          <li
            key={f}
            className={`${ok ? "text-slate-800" : "text-slate-400"} flex gap-3 text-sm leading-snug`}
          >
            <span
              className={`${ok ? "border-emerald-300 text-emerald-700" : "border-slate-300 text-slate-400"} mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border`}
            >
              {ok ? <Check size={13} /> : <X size={12} />}
            </span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center text-xs font-medium text-slate-500">
        {p.foot}
      </div>
    </article>
  );
}
function InfoPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-black">
        Why choose AI Property Report?
      </h3>
      <div className="space-y-5">
        {benefits.map(([t, d, I]) => (
          <div key={t} className="flex gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700">
              <I size={19} />
            </div>
            <div>
              <div className="text-sm font-black">{t}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function FaqPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-black">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {faqs.map((f) => (
          <button
            key={f}
            className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-left text-sm font-semibold"
          >
            {f}
            <ChevronDown size={15} />
          </button>
        ))}
      </div>
    </section>
  );
}
function CustomPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100">
          <Users size={22} />
        </div>
        <div>
          <h3 className="font-black">Need a custom solution?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We offer custom plans for large portfolios, funds, and enterprises.
          </p>
          <button className="mt-4 flex items-center gap-2 text-sm font-black text-emerald-700">
            Contact our team <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
function LiamIncluded() {
  const items = [
    [
      "Ask Anything",
      "Get answers about your properties, finances, and investments.",
      Bot,
    ],
    [
      "Smart Recommendations",
      "AI-powered suggestions to save money and increase returns.",
      Sparkles,
    ],
    [
      "Risk Alerts",
      "Stay ahead of risks with proactive alerts and notifications.",
      AlertTriangle,
    ],
    [
      "Performance Insights",
      "Understand your portfolio performance in real-time with AI analytics.",
      TrendingUp,
    ],
  ];
  return (
    <section className="mt-7 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-sm">
      <div className="grid gap-6 xl:grid-cols-[1fr_290px]">
        <div>
          <h3 className="text-xl font-black">
            All plans include access to{" "}
            <span className="text-emerald-700">LIAM AI COO</span>
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Your AI Chief Operating Officer for real estate.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(([t, d, I]) => (
              <div key={t} className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <I size={19} />
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-900">{t}</div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#071016] p-5 text-white">
          <div className="mb-4 grid h-20 w-20 place-items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-violet-600/40 to-emerald-500/30 shadow-[0_0_28px_rgba(16,185,129,0.28)]">
            <Bot size={38} />
          </div>
          <h4 className="text-lg font-black">Try LIAM Now</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Experience the power of AI for your real estate portfolio.
          </p>
          <button className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-black text-white">
            Chat with LIAM <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
function TrustBar() {
  const trust = [
    ["10,000+", "Property Owners", Users],
    ["$2B+", "Assets Analyzed", Database],
    ["50+", "Markets Covered", MapPin],
    ["4.9/5", "User Rating", Star],
  ];
  return (
    <section className="mx-auto mt-8 max-w-4xl text-center">
      <h3 className="text-base font-black text-slate-700">
        Trusted by Property Owners, Investors & Professionals
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(([v, l, I]) => (
          <div
            key={l}
            className="flex items-center justify-center gap-3 border-slate-200 lg:border-r last:border-r-0"
          >
            <I size={24} className="text-slate-500" />
            <div className="text-left">
              <div className="text-xl font-black">{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
