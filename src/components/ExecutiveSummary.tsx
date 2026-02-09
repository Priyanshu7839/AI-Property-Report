import { Check, TrendingUp, AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  propertyType: 'residential' | 'commercial';
}

export function ExecutiveSummary({ propertyType,state }: ExecutiveSummaryProps) {
  // Simplified to 3 key metrics only - Sequoia style
  const residentialData = [
    { label: 'Current Market Value', value: '$847,200', sublabel: 'Confidence: 94% • Source: MLS Comps', icon: Check, color: '#005BFF' },
    { label: 'Total Equity Position', value: '$287,400', sublabel: '34% of property value', icon: Check, color: '#005BFF' },
    { label: 'Annual Cost Leakage', value: '$5,124', sublabel: 'Insurance overpay + suboptimal financing', icon: AlertTriangle, color: '#FF3B30' }
  ];

  const commercialData = [
    { label: 'Current Market Value', value:state?.state?.data?.data?.price, sublabel: 'Confidence: 91% • Source: Income Approach', icon: Check, color: '#005BFF' },
    { label: 'Net Operating Income', value: '184,200', sublabel: 'Cap Rate: 6.47% • Market Avg: 6.2%', icon: TrendingUp, color: '#005BFF' },
    { label: 'Total Equity Position', value: '1,124,800', sublabel: 'Debt Service Coverage: 1.42x', icon: Check, color: '#005BFF' }
  ];

  const data = propertyType === 'residential' ? residentialData : commercialData;

  return (
    <section>
      {/* Section Header - Simplified */}
      <div className="mb-4">
        <h2 className="text-black text-[20px] sm:text-[24px] font-medium tracking-tight">Executive Summary</h2>
        <p className="text-[#6A6A6A] text-[13px] mt-1">Key financial metrics and insights</p>
      </div>
      
      {/* Simplified Grid - 3 metrics only */}
      <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.06]">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-5 sm:p-6 hover:bg-[#FAFBFC] transition-colors duration-150">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">{item.label}</p>
                    <div className="rounded-md p-1.5" style={{ backgroundColor: `${item.color}10` }}>
                      <Icon 
                        size={14}
                        style={{ color: item.color }}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <p 
                    className="text-[24px] sm:text-[28px] font-medium tracking-tight mb-2"
                    style={{ color: item.color }}
                  >
                    ${item.value.toLocaleString("en-US")}
                  </p>
                  <p className="text-[#6A6A6A] text-[12px] leading-relaxed mt-auto">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}