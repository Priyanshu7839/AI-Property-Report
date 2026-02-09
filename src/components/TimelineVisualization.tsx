import { LineChart, TrendingUp } from 'lucide-react';

interface Strategy {
  name: string;
  annualRate: number;
  color: string;
  startValue: number;
}

export function TimelineVisualization() {
  const strategies: Strategy[] = [
    { name: 'Baseline', annualRate: 3.2, color: '#6A6A6A', startValue: 550000 },
    { name: 'Balanced', annualRate: 6.7, color: '#005BFF', startValue: 550000 },
    { name: 'Growth', annualRate: 9.5, color: '#18A36F', startValue: 550000 },
  ];

  const years = [0, 1, 2, 3, 4, 5];

  const calculateValue = (strategy: Strategy, year: number) => {
    return strategy.startValue * Math.pow(1 + strategy.annualRate / 100, year);
  };

  const maxValue = Math.max(...strategies.map(s => calculateValue(s, 5)));

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)]">
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="p-2 rounded-lg bg-[#005BFF]/10">
            <LineChart className="text-[#005BFF]" size={18} />
          </div>
          <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight">5-Year Growth Timeline</h2>
        </div>
        <p className="text-[#6A6A6A] text-[12px] sm:text-[13px]">
          Year-by-year projection of your equity growth across different strategies
        </p>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Chart Area */}
        <div className="relative h-[300px] sm:h-[350px] mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 sm:w-16 flex flex-col justify-between text-right pr-2 sm:pr-3">
            <span className="text-[#6A6A6A] text-[10px] sm:text-[11px]">${Math.round(maxValue / 1000)}K</span>
            <span className="text-[#6A6A6A] text-[10px] sm:text-[11px]">${Math.round(maxValue * 0.75 / 1000)}K</span>
            <span className="text-[#6A6A6A] text-[10px] sm:text-[11px]">${Math.round(maxValue * 0.5 / 1000)}K</span>
            <span className="text-[#6A6A6A] text-[10px] sm:text-[11px]">${Math.round(maxValue * 0.25 / 1000)}K</span>
            <span className="text-[#6A6A6A] text-[10px] sm:text-[11px]">$0</span>
          </div>

          {/* Chart container */}
          <div className="absolute left-12 sm:left-16 right-0 top-0 bottom-8">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-black/[0.06]"
                  style={{ top: `${i * 25}%` }}
                />
              ))}
            </div>

            {/* Plot area */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {strategies.map((strategy, idx) => {
                const points = years.map((year, i) => {
                  const value = calculateValue(strategy, year);
                  const x = (i / (years.length - 1)) * 100;
                  const y = 100 - (value / maxValue) * 100;
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <g key={strategy.name}>
                    {/* Area under line */}
                    <polygon
                      points={`0,100 ${points} ${100},100`}
                      fill={strategy.color}
                      opacity="0.1"
                    />
                    {/* Line */}
                    <polyline
                      points={points}
                      fill="none"
                      stroke={strategy.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Data points */}
                    {years.map((year, i) => {
                      const value = calculateValue(strategy, year);
                      const x = (i / (years.length - 1)) * 100;
                      const y = 100 - (value / maxValue) * 100;
                      return (
                        <circle
                          key={year}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill="white"
                          stroke={strategy.color}
                          strokeWidth="2.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between">
              {years.map((year) => (
                <span key={year} className="text-[#6A6A6A] text-[11px]">
                  Year {year}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {strategies.map((strategy) => (
            <div key={strategy.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: strategy.color }}
              />
              <span className="text-black text-[13px] font-medium">{strategy.name}</span>
              <span className="text-[#6A6A6A] text-[12px]">({strategy.annualRate}%)</span>
            </div>
          ))}
        </div>

        {/* Year-by-Year Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-black/[0.08]">
                <th className="text-left py-3 px-3 text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Year</th>
                {strategies.map((strategy) => (
                  <th key={strategy.name} className="text-right py-3 px-3 text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">
                    {strategy.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((year) => (
                <tr key={year} className="border-b border-black/[0.04] hover:bg-[#FAFBFC] transition-colors">
                  <td className="py-3 px-3 text-black text-[13px] font-medium">
                    {year === 0 ? 'Today' : `Year ${year}`}
                  </td>
                  {strategies.map((strategy) => {
                    const value = calculateValue(strategy, year);
                    const gain = value - strategy.startValue;
                    return (
                      <td key={strategy.name} className="text-right py-3 px-3">
                        <div className="text-black text-[14px] font-medium">
                          ${Math.round(value).toLocaleString()}
                        </div>
                        {year > 0 && (
                          <div className="text-[#18A36F] text-[11px]">
                            +${Math.round(gain).toLocaleString()}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#18A36F]/5 to-white border border-[#18A36F]/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-[#18A36F]" size={16} />
              <span className="text-black text-[13px] font-medium">Best Strategy</span>
            </div>
            <div className="text-[#18A36F] text-[20px] font-medium mb-1">Growth Portfolio</div>
            <div className="text-[#6A6A6A] text-[12px]">
              Achieves ${Math.round(calculateValue(strategies[2], 5)).toLocaleString()} by Year 5
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-[#005BFF]/5 to-white border border-[#005BFF]/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-[#005BFF]" size={16} />
              <span className="text-black text-[13px] font-medium">Opportunity Cost</span>
            </div>
            <div className="text-[#005BFF] text-[20px] font-medium mb-1">
              ${Math.round(calculateValue(strategies[2], 5) - calculateValue(strategies[0], 5)).toLocaleString()}
            </div>
            <div className="text-[#6A6A6A] text-[12px]">
              Potential gain vs. keeping equity in home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}