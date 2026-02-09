import { 
  LayoutDashboard, 
  Inbox, 
  UserCheck, 
  Clock, 
  GitBranch, 
  Users, 
  FileText, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'queue', label: 'Assignment Queue', icon: Inbox },
  { id: 'assigned', label: 'Assigned Leads', icon: UserCheck },
  { id: 'sla', label: 'SLA Monitor', icon: Clock },
  { id: 'routing', label: 'Routing Rules', icon: GitBranch },
  { id: 'partners', label: 'Partners Directory', icon: Users },
  { id: 'audit', label: 'Audit Log', icon: FileText },
  { id: 'reporting', label: 'Reporting', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-20">
      {/* Logo */}
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
                <p className="text-sm text-[#0285FF]">Lead Manager</p>
              </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Ops Portal v2.1.0</p>
          <p className="mt-1">© 2026 AIPropertyReport</p>
        </div>
      </div>
    </div>
  );
}