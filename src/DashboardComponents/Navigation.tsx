import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  ShoppingCart, 
  MapPin, 
  DollarSign, 
  Settings, 
  Shield,
  Zap,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { path: '/dashboard/', label: 'Dashboard', icon: Home },
  { path: '/dashboard/reports', label: 'Reports Database', icon: FileText },
  { path: '/dashboard/leads', label: 'Lead Capture', icon: Users },
  { path: '/dashboard/buyers', label: 'Buyer Management', icon: ShoppingCart },
  { path: '/dashboard/zip-marketplace', label: 'ZIP Marketplace', icon: MapPin },
  { path: '/dashboard/finance', label: 'Finance', icon: DollarSign },
  { path: '/dashboard/api-integration', label: 'API Integration', icon: Zap },
  { path: '/dashboard/admin-roles', label: 'Admin Roles', icon: Shield },
];

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg">Admin Dashboard</h1>
          <p className="text-gray-400 text-xs">Command Center</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:mt-0 mt-[60px]
      `}>
        <div className="p-6 hidden lg:block">
          <h1 className="text-xl">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Command Center</p>
        </div>
        
        <div className="flex-1 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span>SA</span>
            </div>
            <div>
              <p className="text-sm">SuperAdmin</p>
              <p className="text-xs text-gray-400">Full Access</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
