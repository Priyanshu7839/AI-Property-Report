import { Target, TrendingDown } from 'lucide-react';

export function NegotiationSheet() {
  return (
    <section className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-5 py-4 border-b border-black/[0.06] bg-[#FAFBFC]">
        <h2 className="text-black text-[16px] sm:text-[18px] font-medium tracking-tight">Negotiation Intelligence</h2>
        <p className="text-[#6A6A6A] text-[12px] mt-1">Strategic pricing recommendations and market timing</p>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Buy/Sell Strategy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Buying */}
          <div className="border border-black/[0.06] rounded-md p-4 bg-[#FAFBFC]">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-[#005BFF]" size={14} strokeWidth={2} />
              <p className="text-black text-[13px] font-medium">If Buying</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[12px] pb-2 border-b border-black/[0.04]">
                <span className="text-[#6A6A6A]">Opening Offer Range</span>
                <span className="text-black font-medium">$805K-825K</span>
              </div>
              <div className="flex justify-between text-[12px] pb-2 border-b border-black/[0.04]">
                <span className="text-[#6A6A6A]">Fair Market Value</span>
                <span className="text-[#005BFF] font-medium">$847K</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#6A6A6A]">Maximum Offer</span>
                <span className="text-black font-medium">$860K-870K</span>
              </div>
            </div>
            <p className="text-[#6A6A6A] text-[11px] mt-4 leading-relaxed">
              <span className="text-black font-medium">Strategy:</span> Start at $815K. Market data suggests 3-5% negotiation room.
            </p>
          </div>

          {/* Selling */}
          <div className="border border-black/[0.06] rounded-md p-4 bg-[#F0FDF4]">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="text-[#18A36F]" size={14} strokeWidth={2} />
              <p className="text-black text-[13px] font-medium">If Selling</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[12px] pb-2 border-b border-black/[0.04]">
                <span className="text-[#6A6A6A]">Recommended List Price</span>
                <span className="text-[#18A36F] font-medium">$879K</span>
              </div>
              <div className="flex justify-between text-[12px] pb-2 border-b border-black/[0.04]">
                <span className="text-[#6A6A6A]">Minimum Acceptable</span>
                <span className="text-black font-medium">$840K</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#6A6A6A]">Expected Sale Range</span>
                <span className="text-black font-medium">$847K-855K</span>
              </div>
            </div>
            <p className="text-[#6A6A6A] text-[11px] mt-4 leading-relaxed">
              <span className="text-black font-medium">Strategy:</span> List at $879K to allow negotiation buffer of 3-4%.
            </p>
          </div>
        </div>

        {/* Days on Market */}
        <div>
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium mb-3">Expected Days on Market</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06] text-center">
              <p className="text-[#6A6A6A] text-[10px] uppercase tracking-wide mb-2">Area Avg</p>
              <p className="text-black text-[20px] font-medium">42d</p>
            </div>
            <div className="p-4 rounded-md bg-[#F8FAFF] border border-[#005BFF]/10 text-center">
              <p className="text-[#6A6A6A] text-[10px] uppercase tracking-wide mb-2">Estimate</p>
              <p className="text-[#005BFF] text-[20px] font-medium">28d</p>
            </div>
            <div className="p-4 rounded-md bg-[#F0FDF4] border border-[#18A36F]/10 text-center">
              <p className="text-[#6A6A6A] text-[10px] uppercase tracking-wide mb-2">Confidence</p>
              <p className="text-[#18A36F] text-[20px] font-medium">87%</p>
            </div>
          </div>
        </div>

        {/* Key Leverage Points */}
        <div className="border-l-4 border-[#005BFF] bg-[#F8FAFF] rounded-md p-4">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium mb-3">Key Negotiation Points</p>
          <ul className="space-y-2 text-[#6A6A6A] text-[12px]">
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#005BFF] mt-1 flex-shrink-0">•</span>
              <span>Property taxes <span className="text-black font-medium">12% below area average</span> ($3,240/year savings)</span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#005BFF] mt-1 flex-shrink-0">•</span>
              <span>Roof replacement (2023) adds <span className="text-black font-medium">$15K-20K value</span></span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#005BFF] mt-1 flex-shrink-0">•</span>
              <span>FEMA Zone X designation – <span className="text-black font-medium">no flood insurance required</span></span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#005BFF] mt-1 flex-shrink-0">•</span>
              <span>School district rating improved <span className="text-black font-medium">7→9 (GreatSchools)</span></span>
            </li>
          </ul>
          <p className="text-[#6A6A6A] text-[10px] mt-3 pt-3 border-t border-[#005BFF]/10">
            <span className="text-black font-medium">Source:</span> MLS data, public records, school ratings as of Nov 2024
          </p>
        </div>
      </div>
    </section>
  );
}