import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ClipboardList,
  Calendar,
  FolderOpen,
  DollarSign,
  Activity,
  HelpCircle,
  Settings,
  Search,
  Bell,
  Download,
  ChevronDown,
} from 'lucide-react';
import { Outlet, useNavigate } from 'react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/RealEstateAdmin/Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/RealEstateAdmin/leads', icon: Users, label: 'My Leads' },
  { path: '/RealEstateAdmin/lead-details', icon: FileText, label: 'Lead Details' },
  { path: '/RealEstateAdmin/seller-pipeline', icon: TrendingDown, label: 'Seller Pipeline' },
  { path: '/RealEstateAdmin/buyer-pipeline', icon: TrendingUp, label: 'Buyer Pipeline' },
  { path: '/RealEstateAdmin/comps', icon: BarChart3, label: 'Comps & Pricing' },
  { path: '/RealEstateAdmin/listing-readiness', icon: ClipboardList, label: 'Listing Readiness' },
  { path: '/RealEstateAdmin/appointments', icon: Calendar, label: 'Appointments' },
  { path: '/RealEstateAdmin/documents', icon: FolderOpen, label: 'Documents' },
  { path: '/RealEstateAdmin/payouts', icon: DollarSign, label: 'Payouts & Invoices' },
  { path: '/RealEstateAdmin/performance', icon: Activity, label: 'Performance' },
  { path: '/RealEstateAdmin/support', icon: HelpCircle, label: 'Support' },
  { path: '/RealEstateAdmin/settings', icon: Settings, label: 'Settings' },
];

export function RealEstateLayout({ children }: LayoutProps) {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
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
                <p className="text-xs text-[#0285FF]">Real Estate Agent</p>
              </div>
        
        <nav className="p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by lead ID, address, ZIP, homeowner email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Clark</p>
                    <p className="text-xs text-gray-500">Real Estate Agent</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Clark</p>
                      <p className="text-xs text-gray-500">Real Estate Agent</p>
                      <p className="text-xs text-gray-500 mt-1">FL • Miami-Dade • 33131</p>
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
        <main className="p-6">
         <Outlet/>
        </main>
      </div>
    </div>
  );
}