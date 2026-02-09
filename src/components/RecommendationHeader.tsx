import { TrendingUp } from 'lucide-react';

export function RecommendationHeader() {
  const reallocationOptions = [
    { name: 'S&P 500 Index', return: '8.2%', note: '10-year avg' },
    { name: 'Vanguard Total Market ETF', return: '6.9%', note: 'Historical' },
    { name: 'Rental Property (Local)', return: '6.4%', note: 'Cap rate' }
  ];

  return (
    <div className="bg-[#FAFBFC] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Simplified Reallocation Table */}
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
          {/* Header */}
          <div className="border-b border-black/[0.06] bg-[#FAFBFC] px-5 py-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-[#005BFF]" size={16} strokeWidth={2} />
              <h3 className="text-black text-[15px] font-medium">Alternative Allocation Opportunities</h3>
            </div>
            <p className="text-[#6A6A6A] text-[12px] mt-1">Your equity could generate higher returns</p>
          </div>
          
          {/* Options Table */}
          <div className="divide-y divide-black/[0.04]">
            {reallocationOptions.map((option, index) => (
              <div 
                key={index}
                className="px-5 py-4 hover:bg-[#FAFBFC] transition-colors duration-150 flex items-center justify-between"
              >
                <div>
                  <span className="text-black text-[14px] font-medium">{option.name}</span>
                  <p className="text-[#6A6A6A] text-[11px] mt-0.5">{option.note}</p>
                </div>
                <div className="text-right">
                  <div className="text-[#005BFF] text-[18px] font-medium">
                    {option.return}
                  </div>
                  <div className="text-[#6A6A6A] text-[10px] uppercase tracking-wide">Annual Return</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer note */}
          <div className="border-t border-black/[0.06] bg-[#F8FAFF] px-5 py-3">
            <p className="text-[#6A6A6A] text-[11px]">
              <span className="font-medium text-black">Source:</span> Historical market data through Nov 2024 • 
              <span className="font-medium text-black"> Assumption:</span> Standard market conditions • 
              <span className="font-medium text-black"> Risk:</span> Past performance does not guarantee future results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}