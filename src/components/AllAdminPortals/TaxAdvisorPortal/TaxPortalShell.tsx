import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  FolderOpen,
  Calendar,
  FileCheck,
  Activity,
  DollarSign,
  TrendingUp,
  HelpCircle,
  Settings,
  Search,
  Bell,
  Download,
  ChevronDown,
} from 'lucide-react';
import { Outlet, useNavigate } from 'react-router';

interface PortalShellProps {
  children: React.ReactNode;


}

const navItems = [
  { path: '/TaxAdmin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/TaxAdmin/leads', label: 'My Leads', icon: Users },
  { path: '/TaxAdmin/lead-details', label: 'Lead Details', icon: FileText },
  { path: '/TaxAdmin/tax-intake', label: 'Tax Intake', icon: ClipboardList },
  { path: '/TaxAdmin/documents', label: 'Document Requests', icon: FolderOpen },
  { path: '/TaxAdmin/consultations', label: 'Consultations', icon: Calendar },
  { path: '/TaxAdmin/advice-summary', label: 'Advice Summary', icon: FileCheck },
  { path: '/TaxAdmin/status-updates', label: 'Status Updates', icon: Activity },
  { path: '/TaxAdmin/payouts', label: 'Payouts & Invoices', icon: DollarSign },
  { path: '/TaxAdmin/performance', label: 'Performance', icon: TrendingUp },
  { path: '/TaxAdmin/support', label: 'Support', icon: HelpCircle },
  { path: '/TaxAdmin/settings', label: 'Settings', icon: Settings },
];

export function TaxPortalShell({ children }: PortalShellProps) {
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
                <p className="text-sm text-[#0285FF]">Tax Advisor</p>
              </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by lead ID, email, ZIP, tax topic..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4 ml-6">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    C
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Clark</p>
                    <p className="text-xs text-gray-500">Tax Advisor Partner</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Clark</p>
                      <p className="text-xs text-gray-500 mt-1">Role: Tax Advisor Partner</p>
                      <p className="text-xs text-gray-500">Coverage: Nationwide</p>
                      <p className="text-xs text-green-600 mt-1">Status: Active</p>
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
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}