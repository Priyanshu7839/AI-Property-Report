import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Target,
  Network,
  Route,
  DollarSign,
  Wallet,
  MapPin,
  Shield,
  Key,
  Settings,
  Search,
  Calendar,
  Download,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";

interface PortalShellProps {
  children: ReactNode;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navigation = [
  { id: "overview", label: "HQ Overview", icon: LayoutDashboard },
  { id: "journeys", label: "User Journeys", icon: Users },
  { id: "reports", label: "Reports & Properties", icon: FileText },
  { id: "leads", label: "Leads Command Center", icon: Target },
  { id: "partners", label: "Partner Network", icon: Network },
  { id: "routing", label: "Routing & SLAs", icon: Route },
  { id: "revenue", label: "Revenue & Pricing", icon: DollarSign },
  { id: "payouts", label: "Payouts & Invoices", icon: Wallet },
  { id: "geography", label: "Geography Intelligence", icon: MapPin },
  { id: "audit", label: "Audit & Compliance", icon: Shield },
  { id: "roles", label: "Roles & Access", icon: Key },
  { id: "settings", label: "System Settings", icon: Settings },
];


export function PortalShell({
  children,
  currentScreen,
  onNavigate,
}: PortalShellProps) {
  const [dateRange, setDateRange] = useState("30D");
      const navigate = useNavigate()

  return (


    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div> */}
              <div className='flex flex-col items-start gap-2'>
                 <div className="text-black tracking-tight font-medium relative inline-flex items-baseline">
            <span className='text-[1.25em]'
            >AIPropertyReport</span>
            <span
              className="text-[#0285FF]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1.25em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #0285FF, -0.3px 0.3px 0 #0285FF",
              }}
            >
              .com
            </span>
            {/* Hand-drawn underline */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "-2px",
                bottom: "-4px",
                width: "calc(100% + 4px)",
                height: "8px",
              }}
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 4 Q 75 5, 150 4 T 298 4"
                fill="none"
                stroke="#0285FF"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
                <p className="text-xs text-[#0285FF]">Super Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user, property, lead, partner, invoice..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Date Range */}
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-none bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Today">Today</option>
                  <option value="7D">7 Days</option>
                  <option value="30D">30 Days</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {/* Export */}
             
              {/* Notifications */}
              {/* <button className="relative p-2 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}

              {/* Profile */}
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">C</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    Clark
                  </p>
                  {/* <p className="text-xs text-gray-500">Full Access • 2FA ✓</p> */}
                </div>
                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
              </div>

               <button 
               onClick={()=>{navigate('/Login')}}
               className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-sm font-medium text-gray-900 flex items-center gap-2 hover:text-[#0285ff] group">
                Log Out
                <Download className="w-4 h-4 text-gray-600 rotate-270 group-hover:text-[#0285ff]" />
              </button>

            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
