import { ArrowLeft, Home, Database, Calendar, CheckCircle, TrendingUp, DollarSign, Clock, Shield, PieChart, BarChart3, Info, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface SampleReportPageProps {
  onBack: () => void;
}

export function SampleReportPage({ onBack }: SampleReportPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/[0.06] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#6A6A6A] hover:text-black hover:bg-[#F7F7F7] transition-colors gap-2 text-[14px] sm:text-[15px] h-auto py-2 px-3 sm:px-4"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="text-black tracking-tight font-medium text-[14px] sm:text-[16px]">
            AIPropertyReport.com
          </div>
          <div className="w-12 sm:w-20"></div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Report Title Block */}
        <div className="text-center mb-12 pb-12 border-b border-black/[0.06]">
          <h1 className="text-black text-[32px] lg:text-[42px] tracking-[-0.02em] font-medium mb-4">
            Sample AI Property Report
          </h1>
          <p className="text-[#6A6A6A] text-[15px] lg:text-[17px] max-w-2xl mx-auto leading-relaxed">
            See an example of the insights you will receive — real valuation, refinance intelligence, ROI timelines, and investment comparison.
          </p>
        </div>

        {/* Property Header Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 lg:p-8 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h2 className="text-black text-[22px] font-medium mb-6">1234 Market Street, San Francisco, CA</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                <Home size={16} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[12px]">Property Type</div>
                <div className="text-black">Residential Property</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                <Database size={16} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[12px]">Data Sources</div>
                <div className="text-black">MLS, Public Records, CoreLogic</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                <Calendar size={16} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[12px]">Updated</div>
                <div className="text-black">Nov 18, 2024</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                <CheckCircle size={16} className="text-[#18A36F]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[12px]">Confidence Score</div>
                <div className="text-[#18A36F] font-medium">High</div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Recommendation Block */}
        <div className="bg-gradient-to-br from-[#3B82F6]/[0.02] to-white border border-[#3B82F6]/20 rounded-2xl p-6 lg:p-8 mb-8 shadow-[0_2px_12px_rgba(59,130,246,0.08)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-[12px] font-medium mb-4">
            PRIORITY #1 — Recommended Action
          </div>
          
          <h2 className="text-black text-[28px] lg:text-[32px] font-medium mb-6">
            Refinance Your Mortgage
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-xl p-4">
              <div className="text-[#6A6A6A] text-[13px] mb-1">Annual Savings</div>
              <div className="text-[#18A36F] text-[24px] font-medium">$4,812</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-xl p-4">
              <div className="text-[#6A6A6A] text-[13px] mb-1">ROI Timeline</div>
              <div className="text-[#3B82F6] text-[24px] font-medium">14 months</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-xl p-4">
              <div className="text-[#6A6A6A] text-[13px] mb-1">Confidence</div>
              <div className="text-[#18A36F] text-[24px] font-medium">High</div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] rounded-xl p-5 mb-6">
            <h3 className="text-black font-medium text-[15px] mb-2 flex items-center gap-2">
              <Info size={16} className="text-[#3B82F6]" />
              Rationale
            </h3>
            <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
              Current mortgage rates are 2.4% lower than your existing rate. A refinance reduces monthly payments by approx. $401 while preserving your loan term. Break-even occurs in 14 months.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-black font-medium text-[15px] mb-3">Estimated Timeline</h3>
            <div className="space-y-2 text-[14px]">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2"></div>
                <div className="text-[#6A6A6A]">Week 1–2 — Rate lock & documentation</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2"></div>
                <div className="text-[#6A6A6A]">Week 3–4 — Underwriting</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2"></div>
                <div className="text-[#6A6A6A]">Week 5 — Closing</div>
              </div>
            </div>
          </div>

          <button className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-[15px] transition-colors flex items-center gap-2">
            Learn More About Refinance
            <ChevronRight size={18} />
          </button>
        </div>

        {/* AI Market Value Block */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">AI Market Value Estimate</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <div className="mb-4">
                <div className="text-[#6A6A6A] text-[13px] mb-1">AI Valuation (Mid)</div>
                <div className="text-black text-[36px] font-medium">$1,247,000</div>
              </div>

              <div className="mb-4">
                <div className="text-[#6A6A6A] text-[13px] mb-2">Valuation Range</div>
                <div className="text-black text-[15px] mb-3">$1.19M – $1.31M</div>
                
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3B82F6]/30 via-[#3B82F6] to-[#3B82F6]/30" style={{ width: '100%' }}></div>
                </div>
              </div>

              <button className="text-[#3B82F6] hover:text-[#2563EB] text-[13px] transition-colors flex items-center gap-1.5">
                <Info size={14} />
                How we calculate this
              </button>
            </div>

            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <h3 className="text-black font-medium text-[15px] mb-4">24-Month Valuation Trend</h3>
              
              <div className="relative h-40">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path
                    d="M 0 100 L 30 95 L 60 85 L 90 80 L 120 75 L 150 70 L 180 65 L 210 60 L 240 50 L 270 45 L 300 40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="150" cy="70" r="4" fill="#3B82F6" />
                  <circle cx="210" cy="60" r="4" fill="#3B82F6" />
                  <circle cx="270" cy="45" r="4" fill="#3B82F6" />
                </svg>
              </div>
              
              <div className="flex items-center justify-between text-[12px] text-[#6A6A6A] mt-2">
                <span>24 mo ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equity & Liquidity Block */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">Your Equity & Liquidity Window</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <h3 className="text-black font-medium text-[17px] mb-4">Current Equity</h3>
              
              <div className="space-y-3 text-[14px]">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                  <span className="text-[#6A6A6A]">Home Value</span>
                  <span className="text-black font-medium">$1,247,000</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                  <span className="text-[#6A6A6A]">Remaining Mortgage</span>
                  <span className="text-black font-medium">$817,000</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-black font-medium">Available Equity</span>
                  <span className="text-[#18A36F] text-[20px] font-medium">$430,000</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <h3 className="text-black font-medium text-[17px] mb-4">Equity Unlock Timeline</h3>
              
              <div className="relative h-24 mb-4">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-[#3B82F6] rounded-full" style={{ width: '73%' }}></div>
                
                <div className="absolute top-1/2 -translate-y-1/2 left-0">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6] border-2 border-white"></div>
                  <div className="text-[11px] text-[#6A6A6A] mt-2 -ml-2">Today</div>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-[#3B82F6]"></div>
                  <div className="text-[11px] text-[#6A6A6A] mt-2 -ml-4">12 Months</div>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 right-0">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-[#3B82F6]"></div>
                  <div className="text-[11px] text-[#6A6A6A] mt-2 -mr-4">24 Months</div>
                </div>
              </div>
              
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                You reach optimal equity unlock in <span className="text-black font-medium">Month 22</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Waste Detector */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">Insurance Waste & Premium Optimization</h2>
          
          <div className="bg-[#F7F7F7] rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-[#6A6A6A] text-[13px] mb-1">Current Premium</div>
                <div className="text-black text-[24px] font-medium">$2,940/yr</div>
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[13px] mb-1">Recommended Premium</div>
                <div className="text-[#3B82F6] text-[24px] font-medium">$2,140/yr</div>
              </div>
              <div>
                <div className="text-[#6A6A6A] text-[13px] mb-1">Potential Savings</div>
                <div className="text-[#18A36F] text-[24px] font-medium">$800/yr</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 mb-6">
              <h3 className="text-black font-medium text-[15px] mb-3">Risk Assessment</h3>
              <div className="space-y-2 text-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">ZIP Climate Risk</span>
                  <span className="text-[#18A36F] font-medium">Low</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">Fire Risk Index</span>
                  <span className="text-[#3B82F6] font-medium">Moderate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">Flood Risk Index</span>
                  <span className="text-[#18A36F] font-medium">Very Low</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">Actuarial Model Rating</span>
                  <span className="text-black font-medium">A-</span>
                </div>
              </div>
            </div>

            <button className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-[15px] transition-colors flex items-center gap-2">
              Compare Insurance Providers
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Sell vs Hold vs Reallocate Block */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">Sell vs Hold vs Reallocate (Strategic Advisory)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/60 backdrop-blur-sm border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center mb-4">
                <TrendingUp size={20} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <h3 className="text-black font-medium text-[17px] mb-3">Hold</h3>
              <div className="space-y-2 text-[14px] mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">ROI (5 yr)</span>
                  <span className="text-[#18A36F] font-medium">22%</span>
                </div>
              </div>
              <p className="text-[#6A6A6A] text-[13px] leading-relaxed mb-2">
                <span className="text-black font-medium">Best for:</span> Low-risk, long-term holding
              </p>
              <p className="text-[#6A6A6A] text-[13px] leading-relaxed">
                Stable neighborhood, low volatility
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center mb-4">
                <DollarSign size={20} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <h3 className="text-black font-medium text-[17px] mb-3">Sell</h3>
              <div className="space-y-2 text-[14px] mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">Market Liquidity</span>
                  <span className="text-[#18A36F] font-medium">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6A6A6A]">Buyer Competition</span>
                  <span className="text-[#18A36F] font-medium">High</span>
                </div>
              </div>
              <p className="text-[#6A6A6A] text-[13px] leading-relaxed">
                <span className="text-black font-medium">Suggested if:</span> Planning cash extraction
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center mb-4">
                <PieChart size={20} className="text-[#3B82F6]" strokeWidth={2} />
              </div>
              <h3 className="text-black font-medium text-[17px] mb-3">Reallocate</h3>
              <div className="text-[13px] text-[#6A6A6A] mb-4">
                Compare ROI with:
              </div>
              <div className="space-y-1.5 text-[13px] mb-4">
                <div className="text-[#6A6A6A]">• S&P 500 (avg 9–11%)</div>
                <div className="text-[#6A6A6A]">• Bond ETF</div>
                <div className="text-[#6A6A6A]">• Gold</div>
                <div className="text-[#6A6A6A]">• Short-term Treasury</div>
              </div>
              <p className="text-[#6A6A6A] text-[13px] leading-relaxed">
                Your property outperforms the S&P 500 by <span className="text-[#18A36F] font-medium">2.3%</span> annually.
              </p>
            </div>
          </div>
        </div>

        {/* Benchmark Comparison Chart */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">Investment Performance Benchmark</h2>
          
          <div className="bg-[#F7F7F7] rounded-2xl p-6 lg:p-8">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-[14px] font-medium">Your Property (5yr ROI)</span>
                  <span className="text-black text-[15px] font-medium">13.2%</span>
                </div>
                <div className="h-8 bg-white rounded-lg overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-lg" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6A6A6A] text-[14px]">S&P 500 (5yr avg)</span>
                  <span className="text-[#6A6A6A] text-[15px]">10.9%</span>
                </div>
                <div className="h-6 bg-white rounded-lg overflow-hidden">
                  <div className="h-full bg-black/[0.15] rounded-lg" style={{ width: '73%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6A6A6A] text-[14px]">10-Year Treasury</span>
                  <span className="text-[#6A6A6A] text-[15px]">4.2%</span>
                </div>
                <div className="h-6 bg-white rounded-lg overflow-hidden">
                  <div className="h-full bg-black/[0.15] rounded-lg" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6A6A6A] text-[14px]">Vanguard Real Estate ETF</span>
                  <span className="text-[#6A6A6A] text-[15px]">8.7%</span>
                </div>
                <div className="h-6 bg-white rounded-lg overflow-hidden">
                  <div className="h-full bg-black/[0.15] rounded-lg" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6A6A6A] text-[14px]">Gold</span>
                  <span className="text-[#6A6A6A] text-[15px]">6.1%</span>
                </div>
                <div className="h-6 bg-white rounded-lg overflow-hidden">
                  <div className="h-full bg-black/[0.15] rounded-lg" style={{ width: '41%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Data Summary Section */}
        <div className="mb-8">
          <h2 className="text-black text-[24px] lg:text-[28px] font-medium mb-6">Full Data Summary</h2>
          
          <div className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-[#F7F7F7] border-b border-black/[0.06]">
                    <th className="text-left text-black font-medium py-3 px-6">Metric</th>
                    <th className="text-left text-black font-medium py-3 px-6">Value</th>
                    <th className="text-left text-black font-medium py-3 px-6">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Valuation (AI Model)</td>
                    <td className="py-3 px-6 text-black font-medium">$1,247,000</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">GNN + Monte Carlo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Confidence</td>
                    <td className="py-3 px-6 text-[#18A36F] font-medium">High (92%)</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Multi-layer validation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Comps Used</td>
                    <td className="py-3 px-6 text-black">47 properties</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">MLS + Public Records</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Mortgage APR Delta</td>
                    <td className="py-3 px-6 text-[#18A36F] font-medium">-2.4%</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Fed Reserve Data</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Premium Waste %</td>
                    <td className="py-3 px-6 text-[#18A36F] font-medium">27%</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Actuarial Model v2.1</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Liquidity Risk Rating</td>
                    <td className="py-3 px-6 text-[#18A36F] font-medium">Low</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Market Microtrend AI</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Climate Risk Model</td>
                    <td className="py-3 px-6 text-black">NOAA v3.2</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">NOAA + FEMA</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Rental Index Alignment</td>
                    <td className="py-3 px-6 text-black">98.4%</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Zillow Rental API</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-[#6A6A6A]">Median Neighborhood Growth</td>
                    <td className="py-3 px-6 text-[#18A36F] font-medium">+4.7% YoY</td>
                    <td className="py-3 px-6 text-[#6A6A6A]">Census + CoreLogic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* "Why This Report Is Accurate" Banner */}
        <div className="bg-gradient-to-r from-[#3B82F6]/[0.08] to-[#3B82F6]/[0.04] border border-[#3B82F6]/20 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle size={18} className="text-[#3B82F6]" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-black font-medium text-[15px] mb-2">Why This Report Is Accurate</h3>
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                Powered by a multi-model AI engine: <span className="text-black font-medium">Valuation GNN</span> + <span className="text-black font-medium">Monte Carlo Simulator</span> + <span className="text-black font-medium">Market Microtrend Classifier</span> + <span className="text-black font-medium">Insurance Actuarial Model</span>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-black/[0.06]">
          <h2 className="text-black text-[28px] lg:text-[36px] font-medium mb-4">
            Ready to see your property's insights?
          </h2>
          <p className="text-[#6A6A6A] text-[15px] lg:text-[17px] mb-8 max-w-xl mx-auto">
            Free, instant, no login required.
          </p>
          
          <Button 
            onClick={onBack}
            className="bg-gradient-to-b from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white px-10 py-6 rounded-[18px] inline-flex items-center gap-3 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(59,130,246,0.24)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.16),0_16px_32px_rgba(59,130,246,0.32)] hover:translate-y-[-1px] active:translate-y-0 text-[16px] font-medium h-auto"
          >
            Generate Your AI Report
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-black/[0.06]">
          <p className="text-black font-medium text-[14px] mb-1">
            AIPropertyReport.com — Powered by ProExchange AI
          </p>
          <p className="text-[#6A6A6A] text-[13px]">
            Sample report is illustrative. Actual results vary by location, data availability, and model version.
          </p>
        </div>
      </div>
    </div>
  );
}