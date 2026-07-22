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
  Banknote,
  BriefcaseBusiness,
  Sparkles,
  Building,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Mail,
  X,
  UserPlus,
  Droplets,
  Zap,
  Flame,
  Wifi,
  Trash2,
  FileSpreadsheet,
  MapPin,
  ClipboardCheck,
  Send,
  MoreVertical,
  Pencil,
  Save,
  ArrowRight,
  HomeIcon,
  LandPlot,
  Store,
  UserCog,
  Hammer,
  CircleDollarSign,
  Check,
  FileCheck2,
  CalendarDays,
} from "lucide-react";
import { createProperty } from "../../../../Apicall";
import { useNavigate } from "react-router";
const cn = (...c) => c.filter(Boolean).join(" ");
const sidebar = [
  ["Dashboard", LayoutDashboard],
  ["Properties", Building2],
  ["Tenants", Users],
  ["Leases", FileText],
  ["Rent & Income", WalletCards],
  ["Expenses & Invoices", ReceiptText],
  ["Maintenance", Wrench],
  ["Insurance", ShieldCheck],
  ["Financing", Landmark],
  ["Reports", BarChart3],
  ["Documents", FolderOpen],
  ["Banking", Banknote],
  ["Advisors", BriefcaseBusiness],
  ["LIAM AI COO", Sparkles],
  ["Asset Management", Building],
];
const steps = [
  ["Entry", HomeIcon],
  ["Property Type", Building2],
  ["Property Details", ClipboardCheck],
  ["Team & Advisors", UserCog],
  ["Utilities & Alerts", Zap],
  ["Insurance & Mortgage", ShieldCheck],
  ["Tenants", Users],
  ["Additional Info", FileText],
  ["Review & Activate", CheckCircle2],
  ["Property Dashboard", LayoutDashboard],
];
const utilities = [
  ["Electricity", Zap],
  ["Water", Droplets],
  ["Gas", Flame],
  ["Internet", Wifi],
  ["Waste / Trash", Trash2],
  ["HOA / Other", Home],
];
const internalRoles = [
  "Property Manager",
  "Assistant Manager",
  "Maintenance Coordinator",
  "Accountant / Bookkeeper",
  "Leasing Agent",
  "Other Team Member",
];
const advisorRoles = [
  "Insurance Advisor",
  "CPA / Tax Advisor",
  "Attorney",
  "Mortgage Broker / Lender",
  "Financial Advisor",
  "Real Estate Agent",
  "Property Inspector",
];
const vendors = [
  "Plumber",
  "Electrician",
  "HVAC",
  "Roofer",
  "Landscaper",
  "Cleaner",
  "Pest Control",
  "Handyman",
  "Locksmith",
  "Pool Service",
  "Security",
  "Solar Installer",
];

const categoryFromKind = (kind) =>
  ({
    Residential: "residential",
    Commercial: "commercial",
    "Mixed Use": "mixed_use",
    "Land / Vacant Land": "vacant_land",
  })[kind] || "residential";

const kindFromCategory = (category) =>
  ({
    residential: "Residential",
    commercial: "Commercial",
    mixed_use: "Mixed Use",
    vacant_land: "Land / Vacant Land",
  })[category] || "Residential";

const stepStatusKeys = [
  "entry",
  "property_type",
  "property_details",
  "team_contacts",
  "utilities_alerts",
  "insurance_mortgage",
  "tenants",
  "additional_info",
  "review_activate",
  "property_dashboard",
];

const teamRoleOptions = [
  "owner",
  "property_manager",
  "assistant_manager",
  "maintenance_coordinator",
  "accountant",
  "leasing_agent",
  "viewer",
];

const accessLevelOptions = ["full", "edit", "view", "limited"];
const contactTypeOptions = ["advisor", "vendor"];
const advisorRoleOptions = [
  "insurance_advisor",
  "cpa_tax_advisor",
  "attorney",
  "mortgage_broker",
  "financial_advisor",
  "real_estate_agent",
  "property_inspector",
];
const vendorRoleOptions = [
  "plumber",
  "electrician",
  "hvac",
  "roofer",
  "landscaper",
  "cleaner",
  "pest_control",
  "handyman",
  "locksmith",
  "pool_service",
  "security",
  "solar_installer",
];
const utilityTypeOptions = ["electricity", "water", "gas", "internet", "waste", "hoa", "other"];
const alertTypeOptions = [
  "utility_spike",
  "renewal",
  "lease_expiry",
  "insurance_expiry",
  "loan_maturity",
  "maintenance",
  "document_missing",
];
const documentCategoryOptions = ["deed", "mortgage", "insurance", "lease", "utility_bill", "tax", "inspection", "photo", "other"];
const portalStatusOptions = ["pending", "active", "not_invited"];
const leaseStatusOptions = ["active", "pending", "expired", "terminated"];
const loanTypeOptions = ["fixed", "adjustable", "interest_only", "bridge", "construction", "other"];

const initialPropertyPayload = {
  step_status: Object.fromEntries(
    stepStatusKeys.map((key) => [key, { skipped: false }]),
  ),
  property: {
    property_name: "",
    category: "residential",
    description: "",
    investment_strategy: "",
    management_start_date: "",
    rent_collection_day: "",
    fiscal_year_end: "",
    notes: "",
  },
  address: {
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    county: "",
    latitude: "",
    longitude: "",
    formatted_address: "",
    parcel_number: "",
    apn: "",
    legal_description: "",
    zoning: "",
  },
  details: {},
  team: [{ user_id: "", role: "property_manager", access_level: "full" }],
  contacts: [
    {
      contact_type: "advisor",
      role: "attorney",
      name: "",
      company: "",
      email: "",
      phone: "",
    },
    {
      contact_type: "vendor",
      role: "plumber",
      name: "",
      company: "",
      email: "",
      phone: "",
    },
  ],
  utilities: [
    {
      utility_type: "electricity",
      provider_name: "",
      account_number: "",
      average_monthly_cost: "",
    },
  ],
  alerts: [
    {
      alert_type: "utility_spike",
      fixed_amount_threshold: "",
      percentage_threshold: "",
      ignore_below_amount: "",
      notify_roles: ["owner", "property_manager"],
    },
  ],
  insurance: {
    carrier: "",
    policy_number: "",
    coverage_amount: "",
    annual_premium: "",
    deductible: "",
    policy_start_date: "",
    renewal_date: "",
  },
  loans: [
    {
      lender: "",
      loan_type: "fixed",
      interest_rate: "",
      original_loan_amount: "",
      outstanding_balance: "",
      monthly_payment: "",
      loan_start_date: "",
      maturity_date: "",
    },
  ],
  tenants: [
    {
      tenant: {
        name: "",
        email: "",
        phone: "",
        unit: "",
        portal_status: "pending",
      },
      lease: {
        lease_start_date: "",
        lease_end_date: "",
        monthly_rent: "",
        security_deposit: "",
        status: "active",
      },
    },
  ],
  goals: [],
  documents: [
    {
      file_name: "",
      file_url: "",
      storage_path: "",
      category: "",
    },
  ],
};

const numericFields = new Set([
  "rent_collection_day",
  "latitude",
  "longitude",
  "bedrooms",
  "bathrooms",
  "half_bathrooms",
  "garage_spaces",
  "living_area_sqft",
  "lot_size_sqft",
  "lot_size_acres",
  "year_built",
  "total_units",
  "total_building_area_sqft",
  "parking_spaces",
  "occupancy_percent",
  "noi",
  "cap_rate",
  "annual_revenue",
  "annual_expenses",
  "annual_taxes",
  "average_monthly_cost",
  "fixed_amount_threshold",
  "percentage_threshold",
  "ignore_below_amount",
  "coverage_amount",
  "annual_premium",
  "deductible",
  "interest_rate",
  "original_loan_amount",
  "outstanding_balance",
  "monthly_payment",
  "monthly_rent",
  "security_deposit",
]);

const normalizeValue = (key, value) => {
  if (!numericFields.has(key)) return value;
  return value === "" ? "" : Number(value);
};

const updateByPath = (source, path, rawValue) => {
  const keys = path.split(".");
  const value = normalizeValue(keys[keys.length - 1], rawValue);
  const next = { ...source };
  let cursor = next;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
      return;
    }
    cursor[key] = Array.isArray(cursor[key])
      ? [...cursor[key]]
      : { ...cursor[key] };
    cursor = cursor[key];
  });
  return next;
};

const getByPath = (source, path) =>
  path
    .split(".")
    .reduce((value, key) => (value == null ? "" : value[key]), source) ?? "";

const isFilled = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
};

const getRequiredPaths = (step, kind) => {
  if (step === 1) return ["property.category"];
  if (step === 2) {
    return ["property.property_name"];
  }

  const byStep = {
    3: [
      "team.0.user_id",
      "team.0.role",
      "team.0.access_level",
      "contacts.0.contact_type",
      "contacts.0.role",
      "contacts.0.name",
      "contacts.1.contact_type",
      "contacts.1.role",
      "contacts.1.name",
    ],
    4: ["utilities.0.utility_type", "alerts.0.alert_type"],
    6: ["tenants.0.tenant.name"],
    7: ["documents.0.file_name", "documents.0.file_url"],
  };
  return byStep[step] || [];
};

const isStepValid = (payload, step, kind) => {
  const requiredPaths = getRequiredPaths(step, kind);
  return requiredPaths.every((path) => isFilled(getByPath(payload, path)));
};

function AddPropertyFlow({setActiveTab}) {
  const [step, setStep] = useState(0),
    [kind, setKind] = useState("Residential"),
    [propertyPayload, setPropertyPayload] = useState(initialPropertyPayload),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState(null);
  const go = (n) => setStep(Math.max(0, Math.min(steps.length - 1, n)));
  const setPayloadValue = (path, value) =>
    setPropertyPayload((current) => updateByPath(current, path, value));
  const setPropertyKind = (nextKind) => {
    setKind(nextKind);
    setPayloadValue("property.category", categoryFromKind(nextKind));
  };
  const invite = () => {
    setModal("invitationSent");
    setToast("Invitation email queued and status marked Pending.");
  };

  const [addingUser,setAddingUser] = useState(false)
  const navigate = useNavigate()

  const createPropertyUser = async () => {
    setAddingUser(true)
    // try {
    //   const finalPayload = updateByPath(
    //     propertyPayload,
    //     "step_status.review_activate.skipped",
    //     false,
    //   );
    //   setPropertyPayload(finalPayload);
    //   const response = await createProperty(finalPayload);

    //   console.log(response);

    //   if (response.success) {
    //     console.log("Property Created");
    //     setToast("Property Created");
    //      go(9);

    //   }
    // } catch (error) {
    //   console.error(error);
    //   setToast("Property Creation Failed");
    // }

    setToast('Property Created')
    setAddingUser(false)
    navigate('/userDashboard/properties')
    

   
  };
  const requiredPaths = getRequiredPaths(step, kind);
  const canContinue = isStepValid(propertyPayload, step, kind);
  const markStepSkipped = (stepIndex, skipped) => {
    const statusKey = stepStatusKeys[stepIndex];
    if (!statusKey) return;
    setPropertyPayload((current) =>
      updateByPath(current, `step_status.${statusKey}.skipped`, skipped),
    );
  };
  const continueStep = () => {
    markStepSkipped(step, false);
    go(step + 1);
  };
  const skipStep = () => {
    markStepSkipped(step, true);
    setToast("Step skipped. Empty values will remain empty in the payload.");
    go(step + 1);
  };
  return (
    <div className="min-h-screen bg-[#F6F7F8] text-slate-950">
      <main className="min-h-screen ">
        <div className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8">
          {/* <Header step={step} /> */}
          <StepNav step={step} />
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
            <section className="min-w-0">
              {step === 0 && <Entry go={go} />}{" "}
              {step === 1 && (
                <PropertyType kind={kind} setKind={setPropertyKind} />
              )}{" "}
              {step === 2 && (
                <PropertyDetails
                  kind={kind}
                  payload={propertyPayload}
                  setPayloadValue={setPayloadValue}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 3 && (
                <Team
                  open={setModal}
                  payload={propertyPayload}
                  setPropertyPayload={setPropertyPayload}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 4 && (
                <Utilities
                  open={setModal}
                  payload={propertyPayload}
                  setPropertyPayload={setPropertyPayload}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 5 && (
                <InsuranceMortgage
                  open={setModal}
                  payload={propertyPayload}
                  setPropertyPayload={setPropertyPayload}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 6 && (
                <Tenants
                  open={setModal}
                  payload={propertyPayload}
                  setPropertyPayload={setPropertyPayload}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 7 && (
                <Additional
                  payload={propertyPayload}
                  setPayloadValue={setPayloadValue}
                  setPropertyPayload={setPropertyPayload}
                  requiredPaths={requiredPaths}
                />
              )}{" "}
              {step === 8 && (
                <Review
                  go={go}
                  setActiveTab={setActiveTab}
                  payload={propertyPayload}
                  onCreate={createPropertyUser}
                  addingUser={addingUser}
                />
              )}{" "}
              {step === 9 && <Created payload={propertyPayload} />}
              {step < 9 && (
                <Footer
                  step={step}
                  go={go}
                  setActiveTab={setActiveTab}
                  canContinue={canContinue}
                  onSkip={skipStep}
                  onContinue={continueStep}
                  onFinal={createPropertyUser}
                />
              )}
            </section>
            <Liam step={step} kind={kind} />
          </div>
        </div>
      </main>
      <Mobile step={step} />
      {modal && (
        <Modal modal={modal} close={() => setModal(null)} invite={invite} />
      )}{" "}
      {toast && <Toast text={toast} close={() => setToast(null)} />}
    </div>
  );
}

function Header() {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          Properties <ChevronRight size={14} />{" "}
          <span className="font-semibold text-slate-950">Add New Property</span>
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
          Add New Property Flow
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
          <Save size={16} className="mr-2 inline" />
          Save Draft
        </button>
      </div>
    </div>
  );
}
function StepNav({ step }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
      <div className="flex min-w-[1120px] items-center gap-2">
        {steps.map(([label, I], i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold",
              i === step
                ? "bg-slate-950 text-white"
                : i < step
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600",
            )}
          >
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-full",
                i === step
                  ? "bg-white/15"
                  : i < step
                    ? "bg-emerald-100"
                    : "bg-slate-100",
              )}
            >
              <I size={15} />
            </span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
function Hero({ title, sub, children }) {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[#071018] p-7 text-white shadow-soft">
      <div className="absolute inset-0 opacity-30">
        <svg
          viewBox="0 0 1200 260"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,190 C140,120 270,145 370,205 C510,285 620,25 790,105 C940,180 1030,115 1200,60"
            fill="none"
            stroke="#0B7A3B"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_390px]">
        <div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            {sub}
          </p>
        </div>
        <div className="rounded-2xl bg-white/95 p-5 text-slate-950 shadow-soft">
          {children}
        </div>
      </div>
    </section>
  );
}
function Entry({ go }) {
  const opts = [
    [
      "single",
      "Add Single Property",
      "Create one residential, commercial, mixed-use or land asset.",
      Building2,
    ],
    [
      "bulk",
      "Bulk Upload CSV",
      "Import many properties using a validated CSV template.",
      FileSpreadsheet,
    ],
    [
      "draft",
      "Save as Draft / Continue Draft",
      "Resume an incomplete property onboarding workflow.",
      Save,
    ],
  ];
  return (
    <div>
      <Hero
        title="Add a new property to your operating system."
        sub="Create a property dashboard, activate LIAM monitoring, invite managers and advisors, configure smart alerts, upload documents, and prepare the asset for financial intelligence."
      >
        <div className="font-semibold">Creation Summary</div>
        <div className="mt-4 space-y-3 text-sm">
          {[
            "Property dashboard created",
            "LIAM monitoring starts",
            "Pending invites sent",
            "Documents processed",
            "Alerts activated",
          ].map((x) => (
            <div className="flex items-center gap-2" key={x}>
              <CheckCircle2 size={16} className="text-emerald-700" />
              {x}
            </div>
          ))}
        </div>
      </Hero>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {opts.map(([id, title, desc, I]) => (
          <button
            key={id}
            onClick={() => go(1)}
            className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-card hover:border-emerald-200 hover:shadow-soft"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <I size={22} />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600">
              {desc}
            </p>
            <div className="mt-5 text-sm font-semibold text-emerald-800">
              Start <ArrowRight size={15} className="inline" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
function Section({ title, sub, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-[-0.03em]">{title}</h2>
        {sub && <p className="mt-2 text-sm leading-6 text-slate-600">{sub}</p>}
      </div>
      {children}
    </section>
  );
}
function PropertyType({ kind, setKind }) {
  const types = [
      ["Residential", "Single family, condo, duplex, multifamily", HomeIcon],
      ["Commercial", "Office, retail, industrial, hospitality", Store],
      ["Mixed Use", "Retail + residential / office combinations", Building],
      [
        "Land / Vacant Land",
        "Vacant lots, agricultural, development parcels",
        LandPlot,
      ],
    ],
    methods = [
      [
        "Search Address",
        "Find using public records / Zillow-style data",
        Search,
      ],
      ["Manual Entry", "Enter every field manually", Pencil],
      ["Upload CSV", "Validate and import records", FileSpreadsheet],
    ];
  return (
    <div className="space-y-5">
      <Section
        title="What type of property are you adding?"
        sub="This controls the fields, metrics, valuation logic and LIAM monitoring model."
      >
        <div className="mb-4 max-w-sm">
          <SelectField
            label="Property Category"
            value={categoryFromKind(kind)}
            onChange={(value) => setKind(kindFromCategory(value))}
            options={["residential", "commercial", "mixed_use", "vacant_land"]}
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {types.map(([t, d, I]) => (
            <button
              key={t}
              onClick={() => setKind(t)}
              className={cn(
                "rounded-2xl border p-5 text-left shadow-card",
                kind === t
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-200 bg-white",
              )}
            >
              <I
                className={kind === t ? "text-emerald-700" : "text-slate-500"}
                size={24}
              />
              <div className="mt-4 font-semibold">{t}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{d}</p>
            </button>
          ))}
        </div>
      </Section>
      <Section
        title="How would you like to add it?"
        sub="Search address is fastest, manual entry gives full control, CSV is for bulk onboarding."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {methods.map(([t, d, I]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <I className="text-emerald-700" size={24} />
              <div className="mt-4 font-semibold">{t}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{d}</p>
              {t === "Search Address" && (
                <div className="mt-4 flex h-11 items-center gap-2 rounded-xl bg-slate-100 px-3">
                  <MapPin size={16} />
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="89 Ede, San Jose, CA"
                  />
                </div>
              )}
              {t === "Upload CSV" && (
                <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 p-5 text-center text-sm text-slate-600">
                  <Upload className="mx-auto mb-2" size={22} />
                  Upload CSV and validate fields
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
function PropertyDetails({
  kind,
  payload,
  setPayloadValue,
  requiredPaths = [],
}) {
  const shared = [
    ["Property Name", "property.property_name"],
    ["Street Address", "address.street"],
    ["Unit", "address.unit"],
    ["City", "address.city"],
    ["State", "address.state"],
    ["ZIP", "address.zip"],
    ["Country", "address.country"],
    ["County", "address.county"],
    ["Formatted Address", "address.formatted_address"],
    ["Latitude", "address.latitude", "number"],
    ["Longitude", "address.longitude", "number"],
    ["Parcel Number", "address.parcel_number"],
    ["APN", "address.apn"],
    ["Legal Description", "address.legal_description"],
    ["Zoning", "address.zoning"],
  ];
  const res = [
    ["Bedrooms", "details.bedrooms", "number"],
    ["Bathrooms", "details.bathrooms", "number"],
    ["Half Bathrooms", "details.half_bathrooms", "number"],
    ["Garage Spaces", "details.garage_spaces", "number"],
    ["Living Area SqFt", "details.living_area_sqft", "number"],
    ["Lot Size SqFt", "details.lot_size_sqft", "number"],
    ["Year Built", "details.year_built", "number"],
    ["Roof Type", "details.roof_type"],
    ["Roof Age", "details.roof_age", "number"],
    ["Flooring Type", "details.flooring_type"],
    ["Foundation Type", "details.foundation_type"],
    ["HVAC Type", "details.hvac_type"],
    ["Pool", "details.pool"],
    ["HOA", "details.hoa"],
  ];
  const com = [
    ["Commercial Type", "details.commercial_type"],
    ["Building Class", "details.building_class"],
    ["Total Units", "details.total_units", "number"],
    ["Total Building Area SqFt", "details.total_building_area_sqft", "number"],
    ["Lot Size SqFt", "details.lot_size_sqft", "number"],
    ["Parking Spaces", "details.parking_spaces", "number"],
    ["Occupancy %", "details.occupancy_percent", "number"],
    ["NOI", "details.noi", "number"],
    ["Cap Rate", "details.cap_rate", "number"],
    ["Annual Revenue", "details.annual_revenue", "number"],
    ["Annual Expenses", "details.annual_expenses", "number"],
    ["Year Built", "details.year_built", "number"],
  ];
  const land = [
    ["Land Type", "details.land_type"],
    ["Lot Size SqFt", "details.lot_size_sqft", "number"],
    ["Lot Size Acres", "details.lot_size_acres", "number"],
    ["Topography", "details.topography"],
    ["Road Access", "details.road_access"],
    ["Utilities Available", "details.utilities_available"],
    ["Entitlements", "details.entitlements"],
    ["Annual Taxes", "details.annual_taxes", "number"],
    ["Development Potential", "details.development_potential"],
  ];
  const mixed = [
    ...com,
    ["Residential Unit Count", "details.residential_unit_count", "number"],
    ["Commercial Unit Count", "details.commercial_unit_count", "number"],
    ["Retail Area SqFt", "details.retail_area_sqft", "number"],
    ["Office Area SqFt", "details.office_area_sqft", "number"],
  ];
  const typedFields =
    kind === "Commercial"
      ? com
      : kind === "Land / Vacant Land"
        ? land
        : kind === "Mixed Use"
          ? mixed
          : res;
  const fields = [...shared, ...typedFields];
  return (
    <Section
      title={`${kind} Details`}
      sub="Capture the physical, location and operational fields LIAM needs for monitoring and reporting."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(([label, path, type]) => (
          <Field
            key={path}
            label={label}
            type={type || "text"}
            value={getByPath(payload, path)}
            onChange={(value) => setPayloadValue(path, value)}
            required={requiredPaths.includes(path)}
          />
        ))}
      </div>
    </Section>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  const controlledProps =
    value !== undefined || onChange
      ? {
          value: value ?? "",
          onChange: (event) => onChange?.(event.target.value),
        }
      : {};
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <input
        type={type}
        {...controlledProps}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
        placeholder={placeholder || label}
      />
    </label>
  );
}
function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
function UploadBox({ label }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-600">
      <Upload className="mx-auto mb-2 text-slate-500" size={22} />
      {label}
    </div>
  );
}
function Team({ open, payload, setPropertyPayload, requiredPaths = [] }) {
  const updateTeam = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `team.0.${key}`, value),
    );
  const updateContact = (index, key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `contacts.${index}.${key}`, value),
    );
  return (
    <div className="space-y-5">
      <Section
        title="Internal Property Team"
        sub="Owner defaults to current logged-in user. Add managers and staff with permission-specific access."
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white">
                A
              </div>
              <div>
                <div className="font-semibold">Owner</div>
                <div className="text-sm text-slate-600">
                  Current logged-in user · Full Access
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Default
            </span>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Field
            label="Team User ID"
            value={payload.team[0].user_id}
            onChange={(value) => updateTeam("user_id", value)}
            required={requiredPaths.includes("team.0.user_id")}
          />
          <SelectField
            label="Team Role"
            value={payload.team[0].role}
            onChange={(value) => updateTeam("role", value)}
            options={teamRoleOptions}
            required={requiredPaths.includes("team.0.role")}
          />
          <SelectField
            label="Access Level"
            value={payload.team[0].access_level}
            onChange={(value) => updateTeam("access_level", value)}
            options={accessLevelOptions}
            required={requiredPaths.includes("team.0.access_level")}
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {internalRoles.map((r) => (
            <Role
              key={r}
              title={r}
              cta="+ Add"
              onClick={() => open("manager")}
            />
          ))}
        </div>
      </Section>
      <Section
        title="Professional Advisors"
        sub="Add external professionals as contacts or give controlled portal access."
      >
        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <ContactEditor
            title="Advisor Contact"
            contact={payload.contacts[0]}
            index={0}
            requiredPaths={requiredPaths}
            onChange={(key, value) => updateContact(0, key, value)}
          />
          <ContactEditor
            title="Vendor Contact"
            contact={payload.contacts[1]}
            index={1}
            requiredPaths={requiredPaths}
            onChange={(key, value) => updateContact(1, key, value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {advisorRoles.map((r) => (
            <Role
              key={r}
              title={r}
              cta="+ Add Advisor"
              onClick={() => open("advisor")}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
function ContactEditor({ title, contact, index, requiredPaths = [], onChange }) {
  const roleOptions =
    contact.contact_type === "vendor" ? vendorRoleOptions : advisorRoleOptions;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <SelectField
          label="Contact Type"
          value={contact.contact_type}
          onChange={(value) => onChange("contact_type", value)}
          options={contactTypeOptions}
          required={requiredPaths.includes(`contacts.${index}.contact_type`)}
        />
        <SelectField
          label="Role"
          value={contact.role}
          onChange={(value) => onChange("role", value)}
          options={roleOptions}
          required={requiredPaths.includes(`contacts.${index}.role`)}
        />
        <Field
          label="Name"
          value={contact.name}
          onChange={(value) => onChange("name", value)}
          required={requiredPaths.includes(`contacts.${index}.name`)}
        />
        <Field
          label="Company"
          value={contact.company}
          onChange={(value) => onChange("company", value)}
        />
        <Field
          label="Email"
          value={contact.email}
          onChange={(value) => onChange("email", value)}
        />
        <Field
          label="Phone"
          value={contact.phone}
          onChange={(value) => onChange("phone", value)}
        />
      </div>
    </div>
  );
}
function Role({ title, cta, onClick }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <Users size={19} />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        Invite, assign permissions and send credentials.
      </p>
      <button
        onClick={onClick}
        className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-emerald-800"
      >
        {cta}
      </button>
    </div>
  );
}
function Utilities({ open, payload, setPropertyPayload, requiredPaths = [] }) {
  const updateUtility = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `utilities.0.${key}`, value),
    );
  const updateAlert = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `alerts.0.${key}`, value),
    );
  const updateNotifyRoles = (value) =>
    setPropertyPayload((current) =>
      updateByPath(
        current,
        "alerts.0.notify_roles",
        value
          .split(",")
          .map((role) => role.trim())
          .filter(Boolean),
      ),
    );
  return (
    <div className="space-y-5">
      <Hero
        title="Configure utility tracking and smart alerts."
        sub="Track providers, upload bills, set thresholds, and tell LIAM exactly when not to alert you."
      >
        <div className="font-semibold">Example Water Bill Alert</div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Provider</span>
            <b>Irvine Ranch Water District</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Average</span>
            <b>$135</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Alert Above</span>
            <b>$180</b>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-900">
            Ignore increase below $50. Notify Owner + Manager.
          </div>
        </div>
      </Hero>
      <Section
        title="Primary Utility & Alert Payload"
        sub="These inputs write directly into utilities[0] and alerts[0] in the final JSON payload."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField
            label="Utility Type"
            value={payload.utilities[0].utility_type}
            onChange={(value) => updateUtility("utility_type", value)}
            options={utilityTypeOptions}
            required={requiredPaths.includes("utilities.0.utility_type")}
          />
          <Field
            label="Provider Name"
            value={payload.utilities[0].provider_name}
            onChange={(value) => updateUtility("provider_name", value)}
            required={requiredPaths.includes("utilities.0.provider_name")}
          />
          <Field
            label="Account Number"
            value={payload.utilities[0].account_number}
            onChange={(value) => updateUtility("account_number", value)}
          />
          <Field
            label="Average Monthly Cost"
            type="number"
            value={payload.utilities[0].average_monthly_cost}
            onChange={(value) => updateUtility("average_monthly_cost", value)}
            required={requiredPaths.includes(
              "utilities.0.average_monthly_cost",
            )}
          />
          <SelectField
            label="Alert Type"
            value={payload.alerts[0].alert_type}
            onChange={(value) => updateAlert("alert_type", value)}
            options={alertTypeOptions}
            required={requiredPaths.includes("alerts.0.alert_type")}
          />
          <Field
            label="Fixed Amount Threshold"
            type="number"
            value={payload.alerts[0].fixed_amount_threshold}
            onChange={(value) => updateAlert("fixed_amount_threshold", value)}
            required={requiredPaths.includes("alerts.0.fixed_amount_threshold")}
          />
          <Field
            label="Percentage Threshold"
            type="number"
            value={payload.alerts[0].percentage_threshold}
            onChange={(value) => updateAlert("percentage_threshold", value)}
            required={requiredPaths.includes("alerts.0.percentage_threshold")}
          />
          <Field
            label="Ignore Below Amount"
            type="number"
            value={payload.alerts[0].ignore_below_amount}
            onChange={(value) => updateAlert("ignore_below_amount", value)}
          />
          <Field
            label="Notify Roles"
            value={payload.alerts[0].notify_roles.join(", ")}
            onChange={updateNotifyRoles}
          />
        </div>
      </Section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {utilities.map(([u, I]) => (
          <div
            key={u}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <I size={20} />
                </div>
                <div className="font-semibold">{u}</div>
              </div>
              <button
                onClick={() => open("utilityAlert")}
                className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white"
              >
                Set Alert
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Provider Name" />
              <Field label="Account Number" />
              <Field label="Average Monthly Cost" />
              <UploadBox label="Upload Bill" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function InsuranceMortgage({
  open,
  payload,
  setPropertyPayload,
  requiredPaths = [],
}) {
  const updateInsurance = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `insurance.${key}`, value),
    );
  const updateLoan = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `loans.0.${key}`, value),
    );
  return (
    <div className="space-y-5">
      <Section
        title="Insurance"
        sub="Add policy details, upload policy, and activate renewal reminders."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <Field
            label="Insurance Carrier"
            value={payload.insurance.carrier}
            onChange={(value) => updateInsurance("carrier", value)}
            required={requiredPaths.includes("insurance.carrier")}
          />
          <Field
            label="Policy Number"
            value={payload.insurance.policy_number}
            onChange={(value) => updateInsurance("policy_number", value)}
            required={requiredPaths.includes("insurance.policy_number")}
          />
          <Field
            label="Coverage Amount"
            type="number"
            value={payload.insurance.coverage_amount}
            onChange={(value) => updateInsurance("coverage_amount", value)}
            required={requiredPaths.includes("insurance.coverage_amount")}
          />
          <Field
            label="Annual Premium"
            type="number"
            value={payload.insurance.annual_premium}
            onChange={(value) => updateInsurance("annual_premium", value)}
            required={requiredPaths.includes("insurance.annual_premium")}
          />
          <Field
            label="Deductible"
            type="number"
            value={payload.insurance.deductible}
            onChange={(value) => updateInsurance("deductible", value)}
          />
          <Field
            label="Policy Start Date"
            type="date"
            value={payload.insurance.policy_start_date}
            onChange={(value) => updateInsurance("policy_start_date", value)}
          />
          <Field
            label="Renewal Date"
            type="date"
            value={payload.insurance.renewal_date}
            onChange={(value) => updateInsurance("renewal_date", value)}
            required={requiredPaths.includes("insurance.renewal_date")}
          />
        </div>
        <div className="mt-4">
          <UploadBox label="Upload Policy" />
        </div>
      </Section>
      <Section
        title="Mortgage / Financing"
        sub="Add lender, balance and maturity information for equity and refinance monitoring."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <Field
            label="Lender"
            value={payload.loans[0].lender}
            onChange={(value) => updateLoan("lender", value)}
            required={requiredPaths.includes("loans.0.lender")}
          />
          <SelectField
            label="Loan Type"
            value={payload.loans[0].loan_type}
            onChange={(value) => updateLoan("loan_type", value)}
            options={loanTypeOptions}
            required={requiredPaths.includes("loans.0.loan_type")}
          />
          <Field
            label="Interest Rate"
            type="number"
            value={payload.loans[0].interest_rate}
            onChange={(value) => updateLoan("interest_rate", value)}
          />
          <Field
            label="Original Loan Amount"
            type="number"
            value={payload.loans[0].original_loan_amount}
            onChange={(value) => updateLoan("original_loan_amount", value)}
          />
          <Field
            label="Outstanding Balance"
            type="number"
            value={payload.loans[0].outstanding_balance}
            onChange={(value) => updateLoan("outstanding_balance", value)}
            required={requiredPaths.includes("loans.0.outstanding_balance")}
          />
          <Field
            label="Monthly Payment"
            type="number"
            value={payload.loans[0].monthly_payment}
            onChange={(value) => updateLoan("monthly_payment", value)}
            required={requiredPaths.includes("loans.0.monthly_payment")}
          />
          <Field
            label="Loan Start Date"
            type="date"
            value={payload.loans[0].loan_start_date}
            onChange={(value) => updateLoan("loan_start_date", value)}
          />
          <Field
            label="Maturity Date"
            type="date"
            value={payload.loans[0].maturity_date}
            onChange={(value) => updateLoan("maturity_date", value)}
          />
        </div>
        <div className="mt-4">
          <UploadBox label="Upload Mortgage Statement" />
        </div>
      </Section>
      <Section
        title="Preferred Vendors"
        sub="Assign existing, new or marketplace vendors for this property."
      >
        <div className="grid gap-3 md:grid-cols-4">
          {vendors.map((v) => (
            <button
              onClick={() => open("vendor")}
              key={v}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-card hover:border-emerald-200"
            >
              <Hammer size={19} className="text-emerald-700" />
              <div className="mt-3 text-sm font-semibold">{v}</div>
              <div className="mt-1 text-xs text-slate-500">
                Existing / New / Marketplace
              </div>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
function Tenants({ open, payload, setPropertyPayload, requiredPaths = [] }) {
  const updateTenant = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `tenants.0.tenant.${key}`, value),
    );
  const updateLease = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `tenants.0.lease.${key}`, value),
    );
  return (
    <Section
      title="Tenants"
      sub="Optional during property creation. Add tenants now or invite them later."
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-sm leading-6 text-slate-600">
          Tenant invitations create a resident portal account where tenants can
          view leases, submit tickets, upload documents, pay rent and message
          the manager.
        </div>
        <button
          onClick={() => open("tenant")}
          className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white"
        >
          <UserPlus size={17} className="mr-2 inline" />
          Add Tenant
        </button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Field
          label="Tenant Name"
          value={payload.tenants[0].tenant.name}
          onChange={(value) => updateTenant("name", value)}
          required={requiredPaths.includes("tenants.0.tenant.name")}
        />
        <Field
          label="Tenant Email"
          value={payload.tenants[0].tenant.email}
          onChange={(value) => updateTenant("email", value)}
        />
        <Field
          label="Tenant Phone"
          value={payload.tenants[0].tenant.phone}
          onChange={(value) => updateTenant("phone", value)}
        />
        <Field
          label="Unit"
          value={payload.tenants[0].tenant.unit}
          onChange={(value) => updateTenant("unit", value)}
          required={requiredPaths.includes("tenants.0.tenant.unit")}
        />
        <SelectField
          label="Portal Status"
          value={payload.tenants[0].tenant.portal_status}
          onChange={(value) => updateTenant("portal_status", value)}
          options={portalStatusOptions}
        />
        <SelectField
          label="Lease Status"
          value={payload.tenants[0].lease.status}
          onChange={(value) => updateLease("status", value)}
          options={leaseStatusOptions}
        />
        <Field
          label="Lease Start Date"
          type="date"
          value={payload.tenants[0].lease.lease_start_date}
          onChange={(value) => updateLease("lease_start_date", value)}
          required={requiredPaths.includes("tenants.0.lease.lease_start_date")}
        />
        <Field
          label="Lease End Date"
          type="date"
          value={payload.tenants[0].lease.lease_end_date}
          onChange={(value) => updateLease("lease_end_date", value)}
          required={requiredPaths.includes("tenants.0.lease.lease_end_date")}
        />
        <Field
          label="Monthly Rent"
          type="number"
          value={payload.tenants[0].lease.monthly_rent}
          onChange={(value) => updateLease("monthly_rent", value)}
          required={requiredPaths.includes("tenants.0.lease.monthly_rent")}
        />
        <Field
          label="Security Deposit"
          type="number"
          value={payload.tenants[0].lease.security_deposit}
          onChange={(value) => updateLease("security_deposit", value)}
        />
      </div>
      <SimpleTable
        headers={[
          "Tenant",
          "Unit",
          "Lease Start",
          "Lease End",
          "Monthly Rent",
          "Security Deposit",
          "Portal",
        ]}
        rows={[
          [
            "Sarah Johnson",
            "Unit 2A",
            "Jul 1, 2024",
            "Jun 30, 2025",
            "$2,100",
            "$2,100",
            "Invite Pending",
          ],
          [
            "Michael Brown",
            "Unit 3B",
            "Aug 1, 2024",
            "Jul 31, 2025",
            "$1,850",
            "$1,850",
            "Not Invited",
          ],
        ]}
      />
    </Section>
  );
}
function SimpleTable({ headers, rows }) {
  return (
    <div className="mt-5 overflow-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            {headers.map((h) => (
              <th className="px-4 py-3 font-medium" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100">
              {r.map((c, j) => (
                <td className="px-4 py-4" key={j}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Additional({
  payload,
  setPayloadValue,
  setPropertyPayload,
  requiredPaths = [],
}) {
  const goalOptions = [
    ["Increase Cash Flow", "increase_cash_flow"],
    ["Reduce Expenses", "reduce_expenses"],
    ["Refinance", "refinance"],
    ["Sell", "sell"],
    ["Improve Occupancy", "improve_occupancy"],
    ["Long-Term Hold", "long_term_hold"],
    ["Track Maintenance", "track_maintenance"],
    ["Organize Documents", "organize_documents"],
  ];
  const toggleGoal = (goal) =>
    setPropertyPayload((current) => {
      const hasGoal = current.goals.some((item) => item.goal === goal);
      return {
        ...current,
        goals: hasGoal
          ? current.goals.filter((item) => item.goal !== goal)
          : [...current.goals, { goal }],
      };
    });
  const updateDocument = (key, value) =>
    setPropertyPayload((current) =>
      updateByPath(current, `documents.0.${key}`, value),
    );
  return (
    <div className="space-y-5">
      <Section
        title="Additional Information"
        sub="Optional metadata to help LIAM understand property strategy."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Property Description"
            value={payload.property.description}
            onChange={(value) => setPayloadValue("property.description", value)}
            required={requiredPaths.includes("property.description")}
          />
          <Field
            label="Investment Strategy"
            value={payload.property.investment_strategy}
            onChange={(value) =>
              setPayloadValue("property.investment_strategy", value)
            }
            required={requiredPaths.includes("property.investment_strategy")}
          />
          <Field
            label="Management Start Date"
            type="date"
            value={payload.property.management_start_date}
            onChange={(value) =>
              setPayloadValue("property.management_start_date", value)
            }
            required={requiredPaths.includes("property.management_start_date")}
          />
          <Field
            label="Rent Collection Day"
            type="number"
            value={payload.property.rent_collection_day}
            onChange={(value) =>
              setPayloadValue("property.rent_collection_day", value)
            }
            required={requiredPaths.includes("property.rent_collection_day")}
          />
          <Field
            label="Fiscal Year End"
            value={payload.property.fiscal_year_end}
            onChange={(value) =>
              setPayloadValue("property.fiscal_year_end", value)
            }
            required={requiredPaths.includes("property.fiscal_year_end")}
          />
          <Field
            label="Notes"
            value={payload.property.notes}
            onChange={(value) => setPayloadValue("property.notes", value)}
          />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          <Field
            label="Document File Name"
            value={payload.documents[0].file_name}
            onChange={(value) => updateDocument("file_name", value)}
            required={requiredPaths.includes("documents.0.file_name")}
          />
          <Field
            label="Document URL"
            value={payload.documents[0].file_url}
            onChange={(value) => updateDocument("file_url", value)}
            required={requiredPaths.includes("documents.0.file_url")}
          />
          <Field
            label="Storage Path"
            value={payload.documents[0].storage_path}
            onChange={(value) => updateDocument("storage_path", value)}
          />
          <SelectField
            label="Document Category"
            value={payload.documents[0].category}
            onChange={(value) => updateDocument("category", value)}
            options={documentCategoryOptions}
          />
        </div>
        <div className="mt-4">
          <UploadBox label="Upload Supporting Documents" />
        </div>
      </Section>
      <Section
        title="Property Goals"
        sub="Select at least one goal LIAM should optimize around."
      >
        {payload.goals.length === 0 && (
          <div className="mb-3 text-xs font-semibold text-red-600">
            Property Goals <span className="text-red-500">*</span>
          </div>
        )}
        <div className="grid gap-3 md:grid-cols-4">
          {goalOptions.map(([label, goal]) => {
            const active = payload.goals.some((item) => item.goal === goal);
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={cn(
                  "rounded-2xl border p-4 text-left text-sm font-semibold shadow-card hover:border-emerald-300",
                  active
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                    : "border-slate-200 bg-white",
                )}
              >
                <CheckCircle2 size={18} className="mb-3 text-emerald-700" />
                {label}
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
function Review({ payload, onCreate,addingUser }) {
  return (
    <div>
      <Hero
        title="Review everything before activation."
        sub="Confirm setup, pending invites, alerts, uploaded documents and LIAM monitoring configuration."
      >
        <div className="font-semibold">Activation Effects</div>
        <div className="mt-4 space-y-3 text-sm">
          {[
            "Property dashboard is created",
            "LIAM starts monitoring",
            "Pending invites are sent",
            "Alerts become active",
            "Uploaded documents are processed",
          ].map((x) => (
            <div className="flex items-center gap-2" key={x}>
              <CheckCircle2 size={16} className="text-emerald-700" />
              {x}
            </div>
          ))}
        </div>
      </Hero>
      <Section
        title="Supabase Insert Payload"
        sub="This is the exact object currently collected by the flow and ready to send to your Supabase insert function."
      >
        <pre className="max-h-[520px] overflow-auto rounded-2xl bg-slate-950 p-5 text-xs leading-5 text-emerald-100">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </Section>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          "Property Details",
          "Team & Advisors",
          "Utilities & Alerts",
          "Insurance & Mortgage",
          "Vendors",
          "Tenants",
          "Documents",
          "LIAM AI Monitoring",
        ].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{i}</h3>
              <button className="text-sm font-semibold text-emerald-800">
                <Pencil size={14} className="mr-1 inline" />
                Edit
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Reviewed and ready for activation.
            </p>
            <div className="mt-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              Ready
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={(()=>{
            setActiveTab('Properties')
          })}
          className="rounded-2xl bg-emerald-700 px-7 py-4 text-sm font-semibold text-white shadow-soft"
        >
          <CheckCircle2 size={18} className="mr-2 inline" />
         {addingUser?'Creating...':' Create Property'}
        </button>
      </div>
    </div>
  );
}
function Created({ payload }) {
  return (
    <div>
      <Hero
        title="Property dashboard created."
        sub="LIAM monitoring is active. Pending invites are sent, utility alerts are configured and uploaded documents are queued for processing."
      >
        <div className="font-semibold">New Property Status</div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Property</span>
            <b>
              {payload.property.property_name ||
                payload.address.formatted_address ||
                "New Property"}
            </b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">LIAM</span>
            <b className="text-emerald-700">Monitoring Active</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Category</span>
            <b>{payload.property.category}</b>
          </div>
        </div>
      </Hero>
      <Section
        title="Captured Payload"
        sub="This payload is currently stored in component state. Wire this object to Supabase when ready."
      >
        <pre className="max-h-[420px] overflow-auto rounded-2xl bg-slate-950 p-5 text-xs leading-5 text-emerald-100">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </Section>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["$1.28M", "Property Value", Building2],
          ["$420K", "Equity", CircleDollarSign],
          ["$2,100", "Monthly Rent", Banknote],
          ["91/100", "Property Health", ShieldCheck],
        ].map(([v, l, I]) => (
          <Kpi key={l} v={v} l={l} I={I} />
        ))}
      </div>
      <Section
        title="Setup Checklist"
        sub="Complete these items to make LIAM more accurate."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Property Added",
            "Upload Documents",
            "Add Tenants",
            "Assign Manager",
            "Configure Alerts",
            "Add Vendors",
          ].map((c, i) => (
            <div
              key={c}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full",
                  i === 0
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {i === 0 ? <Check size={18} /> : i + 1}
              </div>
              <div className="font-semibold">{c}</div>
              <button className="ml-auto text-sm font-semibold text-emerald-800">
                Open
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
function Kpi({ v, l, I }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <I size={20} />
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{v}</div>
      <div className="mt-1 text-xs text-slate-600">{l}</div>
    </div>
  );
}
function Footer({ step, go, canContinue, onSkip, onContinue, onFinal,setActiveTab }) {
  const canSkip = step > 1 && step < 8;
  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <button
        onClick={() => go(step - 1)}
        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
      >
        <ChevronLeft size={16} className="mr-1 inline" />
        Back
      </button>
      <div className="flex gap-3">
        <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">
          <Save size={16} className="mr-2 inline" />
          Save Draft
        </button>
        {canSkip && (
          <button
            onClick={onSkip}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Skip Step
          </button>
        )}
        <button
          onClick={() => {
            if (!canContinue) return;
            if (step === 8) {
              setActiveTab('properties')
              return;
            }
            onContinue();
          }}
          disabled={!canContinue}
          className={cn(
            "rounded-xl px-5 py-3 text-sm font-semibold text-white",
            canContinue
              ? "bg-slate-950 hover:bg-black"
              : "cursor-not-allowed bg-slate-300",
          )}
          title={
            !canContinue
              ? "Fill required fields marked with * or skip this step."
              : "Continue"
          }
        >
          {step === 8 ? "Create Property" : "Continue"}{" "}
          <ChevronRight size={16} className="ml-1 inline" />
        </button>
      </div>
    </div>
  );
}
function Liam({ step, kind }) {
  return (
    <aside className="sticky top-[96px] hidden h-[calc(100vh-120px)] overflow-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-card xl:block">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <Sparkles size={20} />
        </div>
        <div>
          <div className="font-semibold">LIAM Property COO</div>
          <div className="text-xs text-slate-500">
            Monitoring setup assistant
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-[#071018] p-5 text-white">
        <div className="text-sm font-semibold">Current setup</div>
        <div className="mt-4 text-3xl font-semibold">{kind}</div>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          LIAM uses your property, team, utilities, insurance, financing,
          vendors, tenants and documents to create monitoring rules.
        </p>
      </div>
      <div className="mt-5 space-y-3">
        {[
          "What data is still missing?",
          "Which alerts should I configure?",
          "Who needs access to this property?",
          "Which documents should I upload?",
          "What will LIAM monitor after activation?",
        ].map((q) => (
          <button
            key={q}
            className="flex w-full items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-900"
          >
            {q}
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <div className="font-semibold">Activation checklist</div>
        {steps.slice(1, 9).map(([s], i) => (
          <div key={s} className="mt-3 flex items-center gap-2 text-sm">
            <span
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full text-[10px]",
                i < step
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
    </aside>
  );
}
function Modal({ modal, close, invite }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {modalTitle(modal)}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{modalSub(modal)}</p>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        {modal === "manager" && <Manager invite={invite} />}{" "}
        {modal === "advisor" && <Advisor invite={invite} />}{" "}
        {modal === "tenant" && <TenantModal invite={invite} />}{" "}
        {modal === "utilityAlert" && <UtilityAlert close={close} />}{" "}
        {modal === "vendor" && <Vendor close={close} />}{" "}
        {modal === "invitationSent" && <InviteSent close={close} />}
      </div>
    </div>
  );
}
function modalTitle(m) {
  return (
    {
      manager: "Add Manager",
      advisor: "Add Advisor",
      tenant: "Add Tenant",
      utilityAlert: "Utility Alert Rule",
      vendor: "Add Preferred Vendor",
      invitationSent: "Invitation Sent",
    }[m] || "Modal"
  );
}
function modalSub(m) {
  return (
    {
      manager: "Invite a team member and assign property-level permissions.",
      advisor: "Add a professional advisor or send portal access.",
      tenant:
        "Add tenant details, lease data and invite them to the tenant portal.",
      utilityAlert:
        "Set thresholds, recipients, channels and do-not-alert rules.",
      vendor: "Add or connect a preferred service vendor.",
      invitationSent: "Credentials email has been sent and access is pending.",
    }[m] || ""
  );
}
function Manager({ invite }) {
  return (
    <div>
      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <button className="rounded-2xl border border-slate-200 p-4 text-left font-semibold">
          <Users size={18} className="mr-2 inline" />
          Choose Existing Contact
        </button>
        <button className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-left font-semibold text-emerald-900">
          <UserPlus size={18} className="mr-2 inline" />
          Invite New User
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {["Name", "Email", "Phone", "Role"].map((f) => (
          <Field key={f} label={f} />
        ))}
      </div>
      <ModalFooter onPrimary={invite} primary="Send Invitation Email" />
    </div>
  );
}
function Advisor({ invite }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Name",
          "Email",
          "Phone",
          "Company",
          "License / Specialization",
          "Access Scope",
        ].map((f) => (
          <Field key={f} label={f} />
        ))}
      </div>
      <ModalFooter onPrimary={invite} primary="Send Advisor Invitation" />
    </div>
  );
}
function TenantModal({ invite }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Tenant Name",
          "Email",
          "Phone",
          "Unit",
          "Lease Start Date",
          "Lease End Date",
          "Monthly Rent",
          "Security Deposit",
          "Occupants",
        ].map((f) => (
          <Field key={f} label={f} />
        ))}
      </div>
      <div className="mt-4">
        <UploadBox label="Upload Lease" />
      </div>
      <label className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
        <input type="checkbox" defaultChecked />
        Invite Tenant to Portal
      </label>
      <ModalFooter onPrimary={invite} primary="Add Tenant & Send Invite" />
    </div>
  );
}
function UtilityAlert({ close }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Select Utility",
          "Alert Above Fixed Amount",
          "Above Monthly Average",
          "Increase Percentage",
          "Alert Frequency",
          "Notify",
        ].map((f) => (
          <Field key={f} label={f} />
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="font-semibold">Do not alert for</div>
        <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          {[
            "Estimated bills",
            "One-time adjustments",
            "Seasonal usage",
            "Amount below selected threshold",
          ].map((x) => (
            <label key={x} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> {x}
            </label>
          ))}
        </div>
      </div>
      <ModalFooter onPrimary={close} primary="Save Alert" />
    </div>
  );
}
function Vendor({ close }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Vendor Type",
          "Company Name",
          "Contact Person",
          "Email",
          "Phone",
          "Service Type",
          "License Number",
          "Insurance Status",
          "Preferred for this property",
        ].map((f) => (
          <Field key={f} label={f} />
        ))}
      </div>
      <ModalFooter onPrimary={close} primary="Save Vendor" />
    </div>
  );
}
function InviteSent({ close }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-700 text-white">
        <Mail size={30} />
      </div>
      <h3 className="mt-5 text-2xl font-semibold">Invitation email sent</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        Status is Pending until the user accepts the email invitation and sets a
        password.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">
          Resend
        </button>
        <button className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-700">
          Cancel Invite
        </button>
        <button
          onClick={close}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}
function ModalFooter({ onPrimary, primary }) {
  return (
    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
      <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">
        Cancel
      </button>
      <button
        onClick={onPrimary}
        className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white"
      >
        <Send size={16} className="mr-2 inline" />
        {primary}
      </button>
    </div>
  );
}
function Mobile({ step }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white p-2 lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {[0, 2, 3, 4, 8].map((i) => {
          const I = steps[i][1];
          return (
            <div
              key={i}
              className={cn(
                "rounded-xl py-2 text-xs font-semibold",
                step === i ? "bg-slate-950 text-white" : "text-slate-600",
              )}
            >
              <I className="mx-auto mb-1" size={18} />
              {steps[i][0].split(" ")[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Toast({ text, close }) {
  return (
    <div className="fixed bottom-24 right-6 z-[60] flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-2xl">
      <CheckCircle2 size={18} className="text-emerald-400" />
      {text}
      <button onClick={close}>
        <X size={16} />
      </button>
    </div>
  );
}
export default AddPropertyFlow;
