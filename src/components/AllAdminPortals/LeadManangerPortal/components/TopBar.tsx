import { Search, Bell, Download, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

export function TopBar() {
  const navigate=useNavigate()
  return (
    <div className="h-16  bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email, property, ZIP, lead ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Export */}
         

          {/* Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Clark</p>
              <p className="text-xs text-gray-500">Lead Manager / Ops</p>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">C</span>
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
    </div>
  );
}