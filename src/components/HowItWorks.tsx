import { Database, Cpu, FileCheck, Check, Lock, ArrowRight, Zap } from 'lucide-react';
import { Button } from './ui/button';

export function HowItWorks() {
  const dataInputs = [
    'Live county sale records',
    'MLS + Off-market listings',
    'Mortgage rate datasets',
    'FEMA flood & climate models',
    'Insurance loss curves',
    'Local rent + job index',
    'Permit & renovation signals',
    'Satellite & GIS overlays',
    'AI-Filtered Comparable Properties'
  ];

  const engineSteps = [
    'Feature Weighting System',
    'Comparable Similarity Graph',
    'Equity Unlock Analyzer',
    'Insurance Waste Detector',
    'Refinance Timing Model',
    'Sell vs Hold Yield Simulator',
    'S&P vs Property Return Comparator'
  ];

  const outputs = [
    'AI Market Value',
    'True Unlockable Equity',
    'Insurance Waste Exposure',
    'Refinance Timing Score',
    'Sell vs Hold Recommendation',
    'S&P 500 Comparison',
    'Investment Suitability'
  ];

  return (
    <section id="how-it-works" className="relative py-10 lg:py-10 lg:pt-0 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFBFC] to-white"></div>
      
      {/* Soft blue gradient blob behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#005BFF]/[0.06] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-black text-[40px] lg:text-[56px] mb-6 tracking-[-0.03em] font-[500] leading-[1.1]">
            How Our Private AI Figures Out the<br />Real Value of Any Property
          </h2>
          <p className="text-[#6A6A6A] text-[17px] lg:text-[19px] max-w-3xl mx-auto leading-relaxed capitalize">
            A multi-layer valuation system built on real market intelligence — not broker fiction.
          </p>
        </div>

        {/* Flow Chart Structure */}
        <div className="relative">
          {/* Desktop Flow Arrows */}
          <div className="hidden lg:block">
            {/* Left to Center Arrow */}
            <div className="absolute top-1/2 left-[31%] w-[8%] -translate-y-1/2 z-20">
              <div className="relative h-[2px] bg-gradient-to-r from-[#005BFF]/40 to-[#005BFF]/60">
                {/* Animated data packet 1 */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#005BFF] -translate-y-1/2 animate-[flowRight_3s_ease-in-out_infinite]"></div>
                {/* Animated data packet 2 */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#005BFF]/60 -translate-y-1/2 animate-[flowRight_3s_ease-in-out_infinite_1s]"></div>
              </div>
              <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 text-[#005BFF]/60" size={20} strokeWidth={2.5} />
            </div>

            {/* Center to Right Arrow */}
            <div className="absolute top-1/2 right-[31%] w-[8%] -translate-y-1/2 z-20">
              <div className="relative h-[2px] bg-gradient-to-r from-[#005BFF]/60 to-[#18A36F]/60">
                {/* Animated data packet 1 */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#18A36F] -translate-y-1/2 animate-[flowRight_3s_ease-in-out_infinite_0.5s]"></div>
                {/* Animated data packet 2 */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#18A36F]/60 -translate-y-1/2 animate-[flowRight_3s_ease-in-out_infinite_1.5s]"></div>
              </div>
              <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 text-[#18A36F]/60" size={20} strokeWidth={2.5} />
            </div>
          </div>

          {/* Mobile Flow Indicators */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0">
            <div className="h-full bg-gradient-to-b from-transparent via-[#005BFF]/20 to-transparent"></div>
          </div>

          {/* 3-Column Flow Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-16 lg:mb-20">
            {/* LEFT COLUMN - Inputs */}
            <div className="relative h-full z-30">
              {/* Flow indicator badge */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#005BFF]/10 to-[#005BFF]/5 border border-[#005BFF]/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#005BFF] animate-pulse"></div>
                <span className="text-[#005BFF] text-[11px] font-medium uppercase tracking-wider">Input Layer</span>
              </div>

              <div className="h-full bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BFF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#005BFF]/10 to-[#005BFF]/5 flex items-center justify-center">
                    <Database className="text-[#005BFF]" size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-black text-[20px] font-medium tracking-tight">Live Data Inputs</h3>
                </div>
                
                <div className="relative space-y-2.5">
                  {dataInputs.map((input, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-black/[0.02] to-transparent border border-black/[0.04] hover:border-black/[0.08] hover:bg-white/80 transition-all duration-200 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#005BFF] group-hover:scale-150 transition-transform"></div>
                      <span className="text-[#6A6A6A] text-[13px] leading-tight">{input}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER COLUMN - Engine */}
            <div className="relative h-full z-30" >
              {/* Flow indicator badge */}
              <div className=" absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#005BFF]/15 to-[#005BFF]/10 border border-[#005BFF]/30 flex items-center gap-2">
                <Zap className="text-[#005BFF] animate-pulse" size={12} strokeWidth={2.5} />
                <span className="text-[#005BFF] text-[11px] font-medium uppercase tracking-wider">Processing Layer</span>
              </div>

              <div className="relative h-full bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
                {/* Pulsing animation effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#005BFF]/[0.04] to-transparent animate-pulse"></div>
                
                {/* Active processing indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#005BFF]/10 border border-[#005BFF]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#005BFF] animate-pulse"></div>
                  <span className="text-[#005BFF] text-[10px] font-medium">ACTIVE</span>
                </div>
                
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#005BFF]/5 flex items-center justify-center">
                    <Cpu className="text-[#005BFF]" size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-black text-[20px] font-medium tracking-tight">AI Valuation Engine</h3>
                </div>
                
                <div className="relative space-y-4 h-full flex flex-col justify-between">
                  {/* Vertical connector line */}
                  <div className="absolute left-[14px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#005BFF]/30 via-[#005BFF]/20 to-[#005BFF]/10">
                    {/* Animated flow dots */}
                    <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-[#005BFF] -translate-x-1/2 animate-[flowDown_4s_ease-in-out_infinite]"></div>
                    <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-[#005BFF]/60 -translate-x-1/2 animate-[flowDown_4s_ease-in-out_infinite_1s]"></div>
                  </div>
                  
                  {engineSteps.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-3.5 group">
                      <div className=" relative z-10 bg-white w-7 h-7 rounded-lg bg-gradient-to-br from-[#005BFF]/10 to-transparent border border-[#005BFF]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset] group-hover:border-[#005BFF]/40 group-hover:shadow-[0_0_8px_rgba(0,91,255,0.15)] transition-all">
                        <span className="text-[#005BFF] text-[11px] font-medium ">{index + 1}</span>
                      </div>
                      <div className="pt-0.5">
                        <span className="text-black text-[14px] font-medium leading-tight block">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Outputs */}
            <div className="relative h-full z-30">
              {/* Flow indicator badge */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#18A36F]/10 to-[#18A36F]/5 border border-[#18A36F]/20 flex items-center gap-2">
                <Check className="text-[#18A36F]" size={12} strokeWidth={3} />
                <span className="text-[#18A36F] text-[11px] font-medium uppercase tracking-wider">Output Layer</span>
              </div>

              <div className="h-full bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
                {/* Success glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#18A36F]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#18A36F]/10 to-[#18A36F]/5 flex items-center justify-center">
                    <FileCheck className="text-[#18A36F]" size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-black text-[20px] font-medium tracking-tight">What Your Report Reveals</h3>
                </div>
                
                <div className="relative space-y-2.5 mb-6">
                  {outputs.map((output, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#18A36F]/[0.04] to-transparent border border-[#18A36F]/10 hover:border-[#18A36F]/20 hover:bg-[#18A36F]/[0.06] transition-all duration-200 group"
                    >
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#18A36F] to-[#18A36F]/80 flex items-center justify-center flex-shrink-0 shadow-[0_2px_4px_rgba(24,163,111,0.2)] group-hover:shadow-[0_4px_8px_rgba(24,163,111,0.3)] group-hover:scale-110 transition-all">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-black text-[14px] font-medium">{output}</span>
                    </div>
                  ))}
                </div>

                {/* PDF Report Icon */}
                <div className="relative mt-8 flex justify-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-20 rounded-2xl bg-gradient-to-br from-white to-[#FAFBFC] border-2 border-black/[0.08] shadow-[0_8px_16px_rgba(0,0,0,0.08)]">
                    <FileCheck className="text-[#005BFF]" size={28} strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#18A36F] to-[#18A36F]/90 border-2 border-white flex items-center justify-center shadow-[0_4px_8px_rgba(24,163,111,0.3)]">
                      <Lock size={12} className="text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-[#6A6A6A] text-[15px] leading-relaxed mb-8 capitalize">
            This is the only valuation system that combines equity timing, insurance exposure, refinance risk, and investment ROI — not just home prices.
          </p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"></div>
        </div>

        {/* CTA Block */}
        <div className="text-center">
          <Button 
            onClick={() => document.getElementById('sample-report')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white px-10 py-6 rounded-[20px] inline-flex items-center gap-3 transition-all duration-200 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,91,255,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.16),0_20px_40px_rgba(0,91,255,0.4)] hover:translate-y-[-2px] active:translate-y-0 text-[16px] font-medium"
          >
            <span>See a Sample Report</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          
          <p className="text-[#6A6A6A] text-[13px] mt-4">
            No login. Uses live U.S. market data. Free.
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes flowRight {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes flowDown {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}