export function CashflowPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-[32px] sm:text-[38px] tracking-tight mb-2">12-Month Cash Burn Analysis</h1>
        <p className="text-[#6A6A6A] text-[15px] mb-10">Financial planning for lean validation and growth phases</p>

        {/* Lean Validation Mode */}
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 bg-[#F9FAFB] border-b border-black/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[20px] mb-1">Lean Validation Mode</h2>
                <p className="text-[#6A6A6A] text-[13px]">Testing the model • Year 1</p>
              </div>
              <div className="text-right">
                <div className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-1">Total Range</div>
                <div className="text-[24px]">$175-325K</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Growth Strategy</div>
                  <div className="text-[#6A6A6A] text-[11px]">$150/hr • 10-15hr/wk</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$6-9K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $72-108K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Paid Acquisition</div>
                  <div className="text-[#6A6A6A] text-[11px]">Marketing spend</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$3-5K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $36-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Tech Infrastructure</div>
                  <div className="text-[#6A6A6A] text-[11px]">Hosting, APIs, data</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$2-5K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $24-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Dev/Design Contractors</div>
                  <div className="text-[#6A6A6A] text-[11px]">External team</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$2-5K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $24-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Legal/Compliance</div>
                  <div className="text-[#6A6A6A] text-[11px]">One-time setup</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$10-20K</span>
                  <span className="text-[#6A6A6A] text-[13px]">one-time</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Critical for fintech lead gen</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Tools/Software</div>
                  <div className="text-[#6A6A6A] text-[11px]">SaaS stack</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$0.5-1K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $6-12K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Mode */}
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 bg-[#F0F9FF] border-b border-black/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[20px] mb-1">Growth Mode</h2>
                <p className="text-[#6A6A6A] text-[13px]">After validation • Scaling phase</p>
              </div>
              <div className="text-right">
                <div className="text-[#6A6A6A] text-[11px] uppercase tracking-wide mb-1">Total Range</div>
                <div className="text-[#18A36F] text-[24px]">$450-750K</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Growth Strategy</div>
                  <div className="text-[#18A36F] text-[11px]">Scaled engagement</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$9-12K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $108-144K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Paid Acquisition</div>
                  <div className="text-[#18A36F] text-[11px]">Increased CAC budget</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$10-20K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $120-240K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Tech/APIs</div>
                  <div className="text-[#18A36F] text-[11px]">Scale infrastructure</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$5-10K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $60-120K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Dev/Design Team</div>
                  <div className="text-[#18A36F] text-[11px]">Full-time resources</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$10-15K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $120-180K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Legal/Compliance</div>
                  <div className="text-[#18A36F] text-[11px]">Ongoing costs</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$20-30K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/yr</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual compliance</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#6A6A6A] text-[12px]">Tools</div>
                  <div className="text-[#18A36F] text-[11px]">Enhanced stack</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px]">$1-2K</span>
                  <span className="text-[#6A6A6A] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-black/[0.06]">
                  <div className="text-[#6A6A6A] text-[11px]">Annual: $12-24K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Variables & Notes */}
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#F9FAFB] border-b border-black/[0.06]">
            <h2 className="text-[18px]">Key Variables & Assumptions</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="w-2 h-2 rounded-full bg-[#005BFF] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-[14px] mb-1">API Costs Scale with Volume</div>
                  <div className="text-[#6A6A6A] text-[13px]">Property data APIs and credit checks can become significant at 10K+ users/month</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0F9FF] border border-[#005BFF]/[0.1]">
                <div className="w-2 h-2 rounded-full bg-[#005BFF] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-[14px] mb-1">California W-2 Burden</div>
                  <div className="text-[#6A6A6A] text-[13px]">Hiring CA employees adds 25-30% burden (taxes, benefits, insurance)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0FDF4] border border-[#18A36F]/[0.15]">
                <div className="w-2 h-2 rounded-full bg-[#18A36F] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-[14px] mb-1">Path to Self-Sustaining</div>
                  <div className="text-[#6A6A6A] text-[13px]">If lead-gen model validates in months 1-3, engagement fees covered by revenue quickly</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0FDF4] border border-[#18A36F]/[0.15]">
                <div className="w-2 h-2 rounded-full bg-[#18A36F] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-[14px] mb-1">Goal: Pre-Runway Breakeven</div>
                  <div className="text-[#6A6A6A] text-[13px]">Get to self-sustaining before burning through runway. ARPU $3.2K, 35% conversion, 2-mo CAC payback</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
