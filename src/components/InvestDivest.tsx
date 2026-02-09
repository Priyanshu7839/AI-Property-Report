import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export function InvestDivest() {
  const deploymentOptions = [
    { 
      asset: 'S&P 500 Index Fund',
      currentValue: '$287,400',
      projectedValue: '$378,420',
      return: '8.2%',
      risk: 'Medium',
      confidence: 'Medium'
    },
    {
      asset: 'Vanguard Total Market',
      currentValue: '$287,400',
      projectedValue: '$341,280',
      return: '6.9%',
      risk: 'Medium',
      confidence: 'Medium'
    },
    {
      asset: 'Investment Property',
      currentValue: '$287,400',
      projectedValue: '$325,600',
      return: '6.4%',
      risk: 'Medium-High',
      confidence: 'Low'
    },
    {
      asset: 'Current Property (Hold)',
      currentValue: '$287,400',
      projectedValue: '$299,200',
      return: '4.1%',
      risk: 'Low',
      confidence: 'Medium'
    }
  ];

  return (
    <section className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-5 py-4 border-b border-black/[0.06] bg-[#FAFBFC]">
        <h2 className="text-black text-[16px] sm:text-[18px] font-medium tracking-tight">Investment Analysis</h2>
        <p className="text-[#6A6A6A] text-[12px] mt-1">5-year equity deployment scenarios</p>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Sell vs Hold Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md bg-[#F8FAFF] border border-[#005BFF]/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-[#005BFF]" size={14} strokeWidth={2} />
              <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Sell Score</p>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-[28px] text-[#005BFF] font-medium">78</div>
              <div className="text-[#6A6A6A] text-[14px]">/100</div>
            </div>
            <div className="h-2 bg-[#FAFBFC] rounded-full overflow-hidden border border-black/[0.04]">
              <div className="h-full bg-[#005BFF] rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="text-[#6A6A6A]" size={14} strokeWidth={2} />
              <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Hold Score</p>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-[28px] text-[#6A6A6A] font-medium">42</div>
              <div className="text-[#6A6A6A] text-[14px]">/100</div>
            </div>
            <div className="h-2 bg-[#FAFBFC] rounded-full overflow-hidden border border-black/[0.04]">
              <div className="h-full bg-[#6A6A6A] rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>

        {/* 5-Year Projections Table */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">5-Year Equity Deployment Scenarios</p>
            <Info className="text-[#6A6A6A]" size={12} />
          </div>
          <div className="border border-black/[0.06] rounded-md overflow-hidden">
            <table className="w-full text-[12px]">
              <thead className="bg-[#FAFBFC] border-b border-black/[0.06]">
                <tr>
                  <th className="text-left text-[#6A6A6A] font-medium py-2 px-3">Asset Class</th>
                  <th className="text-right text-[#6A6A6A] font-medium py-2 px-3 hidden sm:table-cell">Return</th>
                  <th className="text-right text-[#6A6A6A] font-medium py-2 px-3">5Y Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {deploymentOptions.map((option, index) => (
                  <tr 
                    key={index} 
                    className={index === 0 ? 'bg-[#F0FDF4] hover:bg-[#E6FCF0]' : 'hover:bg-[#FAFBFC]'}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <p className="text-black font-medium">{option.asset}</p>
                        {index === 0 && (
                          <span className="text-[9px] bg-[#18A36F] text-white px-1.5 py-0.5 rounded">TOP</span>
                        )}
                      </div>
                      <p className="text-[#6A6A6A] text-[10px] mt-0.5">{option.risk} risk • {option.confidence} confidence</p>
                    </td>
                    <td className="text-right text-black font-medium py-3 px-3 hidden sm:table-cell">{option.return}</td>
                    <td className={`text-right font-medium py-3 px-3 ${index === 0 ? 'text-[#18A36F]' : 'text-black'}`}>
                      {option.projectedValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendation */}
        <div className="border-l-4 border-[#005BFF] bg-[#F8FAFF] rounded-md p-4">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium mb-2">Model Recommendation</p>
          <p className="text-[#6A6A6A] text-[12px] leading-relaxed">
            Selling and deploying into S&P 500 index generates <span className="text-black font-medium">+$79,220 higher return</span> over 5 years vs. holding current property. 
            Eliminates maintenance costs and property tax increases. 
            <span className="font-medium text-black"> • Assumption:</span> 8.2% historical S&P return continues • 
            <span className="font-medium text-black"> Risk:</span> Market volatility, no guarantees on future performance
          </p>
        </div>
      </div>
    </section>
  );
}