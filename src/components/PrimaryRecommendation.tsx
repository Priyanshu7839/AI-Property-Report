import { AlertCircle, TrendingUp, Clock } from 'lucide-react';

export function PrimaryRecommendation() {
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg shadow-sm">
      <div className="border-l-4 border-[#005BFF] p-6">
        {/* Priority Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#005BFF]/[0.08] border border-[#005BFF]/20 mb-4">
          <AlertCircle className="text-[#005BFF]" size={14} strokeWidth={2} />
          <span className="text-[#005BFF] text-[11px] font-medium uppercase tracking-wide">Priority #1 Recommendation</span>
        </div>
        
        {/* Main Recommendation */}
        <h2 className="text-black text-[24px] sm:text-[28px] font-medium tracking-tight mb-3 leading-tight">
          Refinance Your Mortgage
        </h2>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="bg-[#FAFBFC] border border-black/[0.04] rounded-md p-4">
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-1">Annual Savings</p>
            <p className="text-[#005BFF] text-[22px] font-medium">$3,408</p>
          </div>
          <div className="bg-[#FAFBFC] border border-black/[0.04] rounded-md p-4">
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-1">ROI Timeline</p>
            <p className="text-black text-[22px] font-medium">18 months</p>
          </div>
          <div className="bg-[#FAFBFC] border border-black/[0.04] rounded-md p-4">
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-1">Confidence</p>
            <p className="text-black text-[22px] font-medium">High</p>
          </div>
        </div>
        
        {/* Rationale */}
        <div className="bg-[#F8FAFF] border border-[#005BFF]/10 rounded-md p-4">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-2 flex items-center gap-2">
            <TrendingUp size={12} className="text-[#005BFF]" />
            Rationale
          </p>
          <p className="text-black text-[14px] leading-relaxed">
            Current rates are <span className="font-medium">2.1% lower</span> than your existing mortgage. 
            Refinancing will reduce monthly payments by <span className="font-medium">$284</span> while maintaining your current term. 
            Break-even point occurs at 18 months.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="mt-4 pt-4 border-t border-black/[0.06]">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-3 flex items-center gap-2">
            <Clock size={12} />
            Estimated Timeline
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#005BFF]"></div>
              <span className="text-[#6A6A6A] text-[13px]">Week 1-2: Rate lock and application</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#005BFF]/50"></div>
              <span className="text-[#6A6A6A] text-[13px]">Week 3-4: Underwriting and appraisal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#005BFF]/30"></div>
              <span className="text-[#6A6A6A] text-[13px]">Week 5-6: Closing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
