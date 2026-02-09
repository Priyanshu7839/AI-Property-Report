import { Check, ChevronRight, Lock } from 'lucide-react';
import { Button } from './ui/button';

export function SampleReportPreview() {
  const features = [
    'Real-time AI valuation model',
    'Equity unlock opportunity scan',
    'Insurance waste detector',
    'Refinance timing signals',
    'Investment vs. divest analysis',
    'Negotiation leverage sheet',
  ];

  return (
    <section id="sample-report" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Advanced mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFF] via-white to-[#F5FFF9]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(0,91,255,0.15)_0%,transparent_35%),radial-gradient(circle_at_85%_75%,rgba(24,163,111,0.12)_0%,transparent_35%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.08)_0%,transparent_50%)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#005BFF]/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#18A36F]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,91,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,91,255,0.5) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#005BFF]/10 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,91,255,0.08)]">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#005BFF] to-[#18A36F] animate-pulse"></div>
            <span className="text-[#005BFF] text-[11px] font-medium uppercase tracking-wider">Sample Intelligence</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-black text-[44px] lg:text-[64px] mb-6 tracking-[-0.04em] font-[500] leading-[1.05]">
            See What You'll <span className="bg-gradient-to-r from-[#005BFF] via-[#0066FF] to-[#005BFF] bg-clip-text text-transparent">Unlock</span>
          </h2>
          <p className="text-[#6A6A6A] text-[17px] lg:text-[19px] max-w-2xl mx-auto leading-relaxed capitalize">
            A comprehensive AI-powered intelligence report delivered in under 60 seconds
          </p>
        </div>
        
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 items-start">
          {/* Report Preview - Floating Card */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#005BFF]/20 via-[#005BFF]/10 to-[#18A36F]/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_24px_48px_rgba(0,0,0,0.10),0_8px_16px_rgba(0,91,255,0.08)] overflow-hidden hover:shadow-[0_0_0_1px_rgba(255,255,255,0.9)_inset,0_32px_64px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,91,255,0.12)] transition-all duration-500 hover:translate-y-[-4px]">
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/30 to-white/75 backdrop-blur-[0.5px] z-10 flex items-end justify-center pb-8">
                <div className="bg-white/95 backdrop-blur-xl rounded-xl px-4 py-2.5 shadow-[0_0_0_1px_rgba(0,91,255,0.1),0_20px_40px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-all duration-500 flex items-center gap-2.5 border border-[#005BFF]/10">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#005BFF]/15 to-[#005BFF]/5 flex items-center justify-center flex-shrink-0">
                    <Lock className="text-[#005BFF]" size={16} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <p className="text-black font-medium text-[13px] mb-0">Unlock Full Report</p>
                    <p className="text-[#6A6A6A] text-[11px]">Enter any address above</p>
                  </div>
                  <ChevronRight className="text-[#005BFF]" size={16} strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Mock Report Content - More realistic */}
              <div className="p-8 space-y-6 ">
                {/* Header */}
                <div className="space-y-3">
                  <div className="h-8 bg-gradient-to-r from-[#005BFF] via-[#0066FF] to-[#005BFF]/80 w-4/5 rounded-xl shadow-[0_4px_12px_rgba(0,91,255,0.25)]"></div>
                  <div className="h-3 bg-[#6A6A6A]/10 w-2/3 rounded-lg"></div>
                  <div className="h-3 bg-[#6A6A6A]/10 w-1/2 rounded-lg"></div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-20 bg-gradient-to-br from-[#005BFF]/[0.08] to-[#005BFF]/[0.03] rounded-2xl border border-[#005BFF]/10 p-3 space-y-1.5">
                    <div className="h-2 bg-[#005BFF]/20 w-3/4 rounded"></div>
                    <div className="h-4 bg-[#005BFF]/30 w-1/2 rounded-lg"></div>
                  </div>
                  <div className="h-20 bg-gradient-to-br from-[#18A36F]/[0.08] to-[#18A36F]/[0.03] rounded-2xl border border-[#18A36F]/10 p-3 space-y-1.5">
                    <div className="h-2 bg-[#18A36F]/20 w-3/4 rounded"></div>
                    <div className="h-4 bg-[#18A36F]/30 w-1/2 rounded-lg"></div>
                  </div>
                </div>
                
                {/* Content sections */}
                <div className="space-y-3 pt-2">
                  <div className="h-24 bg-gradient-to-br from-white to-[#FAFBFC] rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 space-y-2">
                    <div className="h-2 bg-black/[0.06] w-1/3 rounded"></div>
                    <div className="h-2 bg-black/[0.04] w-full rounded"></div>
                    <div className="h-2 bg-black/[0.04] w-5/6 rounded"></div>
                  </div>
                  <div className="h-24 bg-gradient-to-br from-white to-[#FAFBFC] rounded-2xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 space-y-2">
                    <div className="h-2 bg-black/[0.06] w-2/5 rounded"></div>
                    <div className="h-2 bg-black/[0.04] w-full rounded"></div>
                    <div className="h-2 bg-black/[0.04] w-4/5 rounded"></div>
                  </div>
                 
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#18A36F] to-[#18A36F]/90 text-white text-[11px] font-medium shadow-[0_8px_16px_rgba(24,163,111,0.3)] border border-white/20 flex items-center gap-1.5 backdrop-blur-xl">
              <Check size={12} strokeWidth={3} />
              <span>Live Example</span>
            </div>
          </div>

          {/* Features Bento Grid */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_16px_32px_rgba(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 hover:translate-x-1">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[#18A36F]/15 to-[#18A36F]/5 flex items-center justify-center border border-[#18A36F]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_2px_8px_rgba(24,163,111,0.1)]">
                    <Check className="text-[#18A36F]" size={14} strokeWidth={3} />
                  </div>
                  <span className="text-black text-[15px] leading-relaxed font-medium">{feature}</span>
                </div>
              </div>
            ))}
            
            <Button 
              className="mt-6 w-full bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white px-8 py-6 rounded-[20px] inline-flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,91,255,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.16),0_20px_40px_rgba(0,91,255,0.4)] hover:translate-y-[-2px] active:translate-y-0 text-[15px] font-medium group"
            >
              <span>View Full Sample Report</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Button>
            
            <p className="text-center text-[#6A6A6A] text-[13px] mt-4">
              No signup required • Instant access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}