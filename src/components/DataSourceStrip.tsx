import { Database, Calendar, Shield } from 'lucide-react';


export function DataSourceStrip() {

  console.log(new Date())
  return (
    <div className="bg-white border-y border-black/[0.06] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Data Sources */}
          <div className="flex flex-wrap items-center gap-4 text-[12px]">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-[#6A6A6A]" />
              <span className="text-[#6A6A6A]">Data Sources:</span>
              <span className="text-black font-medium">MLS, CoreLogic, Public Records</span>
            </div>
            <div className="h-4 w-px bg-black/[0.1] hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#6A6A6A]" />
              <span className="text-[#6A6A6A]">Updated:</span>
              <span className="text-black font-medium">{new Date().toLocaleDateString('en-IN',{
                day:'2-digit',
                month:'short',
                year:'numeric'
              })}</span>
            </div>
          </div>
          
          {/* Methodology Link */}
          <button className="flex items-center gap-2 text-[#005BFF] hover:text-[#0046CC] transition-colors text-[12px] font-medium">
            <Shield size={14} />
            <span>View Methodology</span>
          </button>
        </div>
      </div>
    </div>
  );
}
