import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Target,
  PieChart,
  TrendingUp,
  Calendar,
  ClipboardList,
  FolderOpen,
  DollarSign,
  BarChart3,
  HelpCircle,
  Settings,
  Search,
  Bell,
  Download,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { to: '/FinanceAdmin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/FinanceAdmin/leads', icon: Users, label: 'My Leads' },
  { to: '/FinanceAdmin/lead-details', icon: FileText, label: 'Lead Details' },
  { to: '/FinanceAdmin/risk-profile', icon: Activity, label: 'Risk Profile' },
  { to: '/FinanceAdmin/strategy-builder', icon: Target, label: 'Strategy Builder' },
  { to: '/FinanceAdmin/portfolio', icon: PieChart, label: 'Portfolio Allocation' },
  { to: '/FinanceAdmin/liam', icon: TrendingUp, label: 'Net Gain Model (LIAM)' },
  { to: '/FinanceAdmin/consultations', icon: Calendar, label: 'Consultations' },
  { to: '/FinanceAdmin/action-plans', icon: ClipboardList, label: 'Action Plans' },
  { to: '/FinanceAdmin/documents', icon: FolderOpen, label: 'Documents' },
  { to: '/FinanceAdmin/payouts', icon: DollarSign, label: 'Payouts & Invoices' },
  { to: '/FinanceAdmin/performance', icon: BarChart3, label: 'Performance' },
  { to: '/FinanceAdmin/settings', icon: Settings, label: 'Settings' },
];

interface PortalLayoutProps {
  children: React.ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className='p-6 flex flex-col items-start gap-2'>
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
                <p className="text-xs text-[#0285FF]">Finance Advisor</p>
              </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by lead ID, homeowner email, portfolio type, state..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    C
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">Clark</div>
                    <div className="text-xs text-gray-600">Financial Advisor</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="font-medium text-gray-900">Clark</div>
                      <div className="text-sm text-gray-600">Financial Advisor Partner</div>
                      <div className="text-sm text-gray-600">Coverage: Nationwide</div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Status: Active
                        </span>
                      </div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile Settings
                    </button>
                    <button 
                    onClick={()=>{navigate('/Login')}}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}