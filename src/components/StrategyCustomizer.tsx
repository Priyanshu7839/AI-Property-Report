import { useState } from 'react';
import { Sliders, TrendingUp, Clock, DollarSign, Info } from 'lucide-react';
import { Button } from './ui/button';

interface StrategyCustomizerProps {
  onApplyStrategy: (params: CustomizerParams) => void;
}

interface CustomizerParams {
  riskTolerance: number;
  investmentYears: number;
  equityAmount: number;
}

export function StrategyCustomizer({ onApplyStrategy }: StrategyCustomizerProps) {
  const [riskTolerance, setRiskTolerance] = useState(50); // 0-100
  const [investmentYears, setInvestmentYears] = useState(5);
  const [equityAmount, setEquityAmount] = useState(550000);

  const getRiskLabel = (risk: number) => {
    if (risk < 33) return 'Conservative';
    if (risk < 67) return 'Moderate';
    return 'Aggressive';
  };

  const getRiskColor = (risk: number) => {
    if (risk < 33) return '#18A36F';
    if (risk < 67) return '#005BFF';
    return '#F97316';
  };

  const calculateProjection = () => {
    let annualReturn = 0;
    if (riskTolerance < 33) annualReturn = 4.4; // Conservative
    else if (riskTolerance < 67) annualReturn = 6.7; // Moderate
    else annualReturn = 9.5; // Aggressive

    const totalReturn = equityAmount * Math.pow(1 + annualReturn / 100, investmentYears);
    const gain = totalReturn - equityAmount;

    return {
      annualReturn,
      totalReturn,
      gain,
      riskLevel: getRiskLabel(riskTolerance)
    };
  };

  const projection = calculateProjection();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)]">
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="p-2 rounded-lg bg-[#005BFF]/10">
            <Sliders className="text-[#005BFF]" size={18} />
          </div>
          <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight">Customize Your Strategy</h2>
        </div>
        <p className="text-[#6A6A6A] text-[12px] sm:text-[13px]">
          Adjust parameters to see personalized projections based on your preferences
        </p>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Risk Tolerance */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#005BFF]" />
                  <label className="text-black text-[14px] font-medium">Risk Tolerance</label>
                </div>
                <span 
                  className="text-[14px] font-medium px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${getRiskColor(riskTolerance)}15`,
                    color: getRiskColor(riskTolerance)
                  }}
                >
                  {getRiskLabel(riskTolerance)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #18A36F 0%, #18A36F 33%, #005BFF 33%, #005BFF 67%, #F97316 67%, #F97316 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-[11px] text-[#6A6A6A]">
                <span>Low Risk</span>
                <span>Medium</span>
                <span>High Risk</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#FAFBFC] to-white border-2 border-black/[0.06]">
              <div className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-2">Your Personalized Strategy</div>
              <div className="text-black text-[18px] font-medium mb-4">{projection.riskLevel} Growth Portfolio</div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
                  <span className="text-[#6A6A6A] text-[13px]">Annual Return Rate</span>
                  <span className="text-[#18A36F] text-[18px] font-medium">{projection.annualReturn}%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
                  <span className="text-[#6A6A6A] text-[13px]">Investment Timeline</span>
                  <span className="text-black text-[16px] font-medium">{investmentYears} years</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
                  <span className="text-[#6A6A6A] text-[13px]">Starting Amount</span>
                  <span className="text-black text-[16px] font-medium">${equityAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-[#18A36F]/10 via-white to-transparent border-2 border-[#18A36F]/30">
              <div className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-3">Projected Outcome</div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-[#6A6A6A] text-[12px] mb-1">Total Value After {investmentYears} Years</div>
                  <div className="text-[#005BFF] text-[28px] sm:text-[32px] font-medium">${Math.round(projection.totalReturn).toLocaleString()}</div>
                </div>
                <div className="pt-3 border-t border-[#18A36F]/20">
                  <div className="text-[#6A6A6A] text-[12px] mb-1">Your Gain</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-[#18A36F] text-[24px] sm:text-[28px] font-medium">
                      +${Math.round(projection.gain).toLocaleString()}
                    </div>
                    <div className="text-[#18A36F] text-[14px] font-medium">
                      +{Math.round((projection.gain / equityAmount) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#18A36F]/10">
                <div className="flex items-start gap-2">
                  <Info className="text-[#18A36F] flex-shrink-0 mt-0.5" size={14} />
                  <p className="text-[#18A36F] text-[11px]">
                    Projections based on historical {projection.riskLevel.toLowerCase()} portfolio returns. Past performance doesn't guarantee future results.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => onApplyStrategy({ riskTolerance, investmentYears, equityAmount })}
              className="w-full bg-gradient-to-r from-[#005BFF] to-[#0066FF] text-white hover:opacity-90 px-6 py-3.5 rounded-lg text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Apply This Custom Strategy
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-[#F8FAFF] border border-[#005BFF]/10">
          <p className="text-[#6A6A6A] text-[11px] leading-relaxed">
            <span className="font-medium text-black">Important:</span> This calculator provides educational projections only and does not constitute financial advice. Actual returns may vary significantly based on market conditions, investment choices, fees, and other factors. Consult with a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}