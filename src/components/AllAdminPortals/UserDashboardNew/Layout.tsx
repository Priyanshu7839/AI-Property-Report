import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  TrendingUp, 
  GitMerge, 
  PieChart, 
  FileCheck, 
  Key, 
  Users, 
  Receipt, 
  Settings, 
  Search, 
  Bell, 
  User,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import House from '../../../assets/House.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../Store/UserDetailsSlice';
import { useNavigate } from 'react-router';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'properties', label: 'My Properties', icon: Building2 },
  { id: 'reports', label: 'Saved Reports', icon: FileText },
  { id: 'equity', label: 'Equity & Valuation', icon: TrendingUp },
  { id: 'scenarios', label: 'Strategy Scenarios', icon: GitMerge },
  { id: 'portfolio', label: 'Portfolio Builder', icon: PieChart },
  { id: 'documents', label: 'Taxes & Documents', icon: FileCheck },
  { id: 'rental', label: 'Rental & Income', icon: Key },
  { id: 'advisors', label: 'Advisors & Agents', icon: Users },
  { id: 'billing', label: 'Invoices & Billing', icon: Receipt },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const UserDetails = useSelector((state) => state.UserDetails);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <div className="flex h-screen bg-white font-sans text-[#111111] overflow-hidden ">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#fff] border-r border-[#E6E8EC] transition-transform duration-300 lg:static lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-[#E6E8EC]">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center text-white">
                <img src={House} alt=""  className='w-full  h-full object-cover'/>
              </div>
              AIPropertyReport
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                    isActive 
                      ? "bg-[#000] text-[#fff]" 
                      : "text-[#5B616E] hover:bg-black/20 hover:text-[#111111]"
                  )}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  {item.label}
                  {isActive && <ChevronRight className="ml-auto opacity-50" size={14} />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#E6E8EC]">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-black text-white shadow-sm shadow-black overflow-hidden flex items-center justify-center font-bold uppercase">
               {UserDetails?.name?.split('')?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111111] truncate">{UserDetails?.name}</p>
                <p className="text-xs text-[#5B616E] truncate">{UserDetails?.email}</p>
              </div>
           <div
           onClick={()=>{
            dispatch(setUserDetails(
              {
                 name:'',
          loggedIn:false,
          uid:'',
          email:''
              }
            ))
              navigate('/userLoginScreen')
          
           }}

           className='cursor-pointer'
           >
             <LogOut size={14}/>
           </div>

            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header */}
        <header className="h-16 border-b border-[#E6E8EC] bg-white flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-[#5B616E]">
              <Menu size={20} />
            </button>
            <span className="font-semibold text-lg">AIPropertyReport</span>
          </div>

          <div className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5B616E]" size={16} />
              <input 
                type="text" 
                placeholder="Search properties, reports, or analyze address..." 
                className="w-full h-10 pl-10 pr-4 bg-[#F7F8FA] border border-[#E6E8EC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6E8EC] focus:border-[#111111] transition-all placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#5B616E] hover:text-[#111111] border border-transparent hover:border-[#E6E8EC] rounded-md transition-all">
              <FileCheck size={16} />
              Save Report
            </button> */}
            
            <div className="h-6 w-px bg-[#E6E8EC] hidden lg:block" />

            <button className="relative p-2 text-[#5B616E] hover:text-[#111111] transition-colors">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
            
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
              <Users size={16} />
              Advisor Connect
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F7F8FA] p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
