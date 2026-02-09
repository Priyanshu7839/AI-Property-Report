import { TrendingUp } from 'lucide-react';

export function EquityLoanIntelligence() {
  return (
    <section className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-5 py-4 border-b border-black/[0.06] bg-[#FAFBFC]">
        <h2 className="text-black text-[16px] sm:text-[18px] font-medium tracking-tight">Equity & Loan Intelligence</h2>
        <p className="text-[#6A6A6A] text-[12px] mt-1">Current loan position and refinance analysis</p>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Loan Details */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06]">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">Loan Balance</p>
            <p className="text-black text-[18px] font-medium">$559.8K</p>
          </div>
          <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06]">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">LTV Ratio</p>
            <p className="text-black text-[18px] font-medium">66.1%</p>
          </div>
          <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06]">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">Rate</p>
            <p className="text-black text-[18px] font-medium">6.25%</p>
          </div>
        </div>

        {/* Equity Position */}
        <div className="border border-black/[0.06] rounded-md p-4 bg-[#F0FDF4]">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#18A36F]" size={14} />
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Equity Position</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1 uppercase tracking-wide">Total Equity</p>
              <p className="text-[#18A36F] text-[18px] font-medium">$287.4K</p>
            </div>
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1 uppercase tracking-wide">Tappable</p>
              <p className="text-[#18A36F] text-[18px] font-medium">$118K</p>
            </div>
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1 uppercase tracking-wide">YoY Growth</p>
              <p className="text-[#18A36F] text-[18px] font-medium">+$124K</p>
            </div>
          </div>
        </div>

        {/* Refinance Opportunity */}
        <div className="border-l-4 border-[#005BFF] bg-[#F8FAFF] rounded-md p-4">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium mb-3">Refinance Opportunity</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1">Current Rate</p>
              <p className="text-black text-[16px] font-medium">6.25%</p>
            </div>
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1">Market Rate</p>
              <p className="text-[#005BFF] text-[16px] font-medium">5.75%</p>
            </div>
            <div>
              <p className="text-[#6A6A6A] text-[10px] mb-1">Break-even</p>
              <p className="text-[#18A36F] text-[16px] font-medium">18mo</p>
            </div>
          </div>
          <div className="pt-3 border-t border-[#005BFF]/10">
            <p className="text-[#6A6A6A] text-[11px]">
              Monthly Savings: <span className="text-black font-medium">$284</span> • 
              Closing Costs: <span className="text-black font-medium">$5,100</span> • 
              Source: <span className="text-black font-medium">Freddie Mac, Nov 2024</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}