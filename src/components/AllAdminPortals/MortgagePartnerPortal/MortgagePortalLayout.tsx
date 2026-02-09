import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calculator,
  FolderOpen,
  RefreshCw,
  DollarSign,
  BarChart3,
  HelpCircle,
  Settings,
  Search,
  Filter,
  Bell,
  ChevronDown,
  Menu,
  X,
  Download,
} from 'lucide-react';
import { partnerInfo } from './Mortagedata/MortgagemockData';
import { StatusChip } from './StatusChip';

interface PortalLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/MortgageAdmin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/MortgageAdmin/leads', label: 'My Leads', icon: Users },
  { path: '/MortgageAdmin/lead-details', label: 'Lead Details', icon: FileText },
  { path: '/MortgageAdmin/quote-builder', label: 'Quote Builder', icon: Calculator },
  { path: '/MortgageAdmin/documents', label: 'Documents', icon: FolderOpen },
  { path: '/MortgageAdmin/status-updates', label: 'Status Updates', icon: RefreshCw },
  { path: '/MortgageAdmin/payouts', label: 'Payouts & Invoices', icon: DollarSign },
  { path: '/MortgageAdmin/sla-performance', label: 'SLA Performance', icon: BarChart3 },
  { path: '/MortgageAdmin/support', label: 'Support', icon: HelpCircle },
  { path: '/MortgageAdmin/settings', label: 'Settings', icon: Settings },
];

export function MortgagePortalLayout({ children }: PortalLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
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
                <p className="text-sm text-[#0285FF]">Mortgage Advisor</p>
              </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex-1 flex items-center gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by lead ID, zip, homeowner email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{partnerInfo.name}</p>
                  <p className="text-xs text-gray-500">{partnerInfo.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">C</span>
                  </div>
                  {/* <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" /> */}
                </div>
              </div>

              <button
           onClick={()=>{navigate('/Login')}}
           className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-900 hover:text-[#2b85ff] flex items-center gap-2">
              <p className="text-sm font-medium ">Log Out</p>

            <Download className="w-5 h-5  rotate-270" />
          </button>
            </div>
          </div>

          <div className="px-6 pb-4 lg:px-8 flex items-center gap-4 text-sm">
            <span className="text-gray-600">Coverage:</span>
            <span className="text-gray-900 font-medium">{partnerInfo.coverage}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">Status:</span>
            <StatusChip status={partnerInfo.status} size="sm" />
          </div>

           
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet/>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
