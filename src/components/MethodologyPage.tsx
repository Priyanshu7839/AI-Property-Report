import { ChevronLeft, ChevronDown, Database, Sliders, Network, CheckCircle, Filter, ShieldCheck, Code } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface MethodologyPageProps {
  onBack: () => void;
}

export function MethodologyPage({ onBack }: MethodologyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/[0.06] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6A6A6A] hover:text-black transition-colors duration-200"
          >
            <ChevronLeft size={20} />
            <span className="text-[15px]">Back to Report</span>
          </button>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-black tracking-tight font-medium">
            AIPropertyReport.com
          </div>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <h1 className="text-black text-[36px] lg:text-[48px] tracking-[-0.02em] mb-4 font-[500]">
            How Our AI Calculates Your Property Report
          </h1>
          <p className="text-[#666666] text-[17px] lg:text-[19px] max-w-3xl mx-auto leading-relaxed">
            A transparent, expert-grade methodology built with modern econometrics, machine learning, and multi-source data intelligence.
          </p>
          <div className="mt-8 h-px bg-black/[0.06] max-w-2xl mx-auto"></div>
        </div>

        {/* Methodology Sections */}
        <div className="space-y-4 mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            
            {/* Section 1 - Data Sources */}
            <AccordionItem value="data-sources" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <Database size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Data Sources & APIs</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-3 text-[#666666] text-[15px] leading-relaxed">
                  <p className="mb-4">We aggregate and validate data from multiple authoritative sources:</p>
                  <ul className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Public Records</strong> — County Assessor, Recorder APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">MLS + Off-Market</strong> — Listing data and transaction history</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Valuation Datasets</strong> — CoreLogic-tier property valuations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Mortgage Rate APIs</strong> — National lenders + rate curves</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Insurance Actuarial Data</strong> — ZIP-based risk modeling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">NOAA & FEMA</strong> — Climate datasets and flood risk zones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">GIS / Satellite Mapping</strong> — Location intelligence APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Census Data</strong> — Demographic and income profiles</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <p className="text-[13px] text-[#999999] italic">
                      All data sources are time-stamped, versioned, and validated.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2 - Feature Engineering */}
            <AccordionItem value="feature-engineering" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <Sliders size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Feature Engineering Layer</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-5 text-[#666666] text-[15px] leading-relaxed">
                  
                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3">Structural Features</h4>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Living area estimate, bedroom/bath probability</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Year-built profile, renovation likelihood</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3">Market Features</h4>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Comp-density scoring, seasonal pricing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Neighborhood volatility indexing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3">Financial Features</h4>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Interest-rate sensitivity, refinance break-even</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Equity timeline projection</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3">Risk Features</h4>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Climate-adjusted deltas, flood risk coefficients</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Liquidity risk modeling</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <p className="text-[13px] text-[#999999] italic">
                      Final model input = 365–800 engineered features per property.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 - AI Valuation Engine */}
            <AccordionItem value="ai-engine" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <Network size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">AI Valuation Engine</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-6 text-[#666666] text-[15px] leading-relaxed">
                  
                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3 text-[16px]">A. Comparable Graph Neural Network (GNN)</h4>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Creates probabilistic comps based on structural similarity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Weights similarity by structural match, seasonal trend, renovation state</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Produces dynamic valuation with confidence interval</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3 text-[16px]">B. Financial Scenario Simulator</h4>
                    <ul className="space-y-2 ml-1 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Monte Carlo simulation (1000 paths)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Loan amortization modeling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Interest rate stochastic process</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Insurance premium volatility modeling</span>
                      </li>
                    </ul>
                    <p className="text-black text-[14px] mt-3 pt-3 border-t border-black/[0.06]">
                      <strong>Outputs:</strong> ROI timeline, refinance opportunity, equity unlock timing
                    </p>
                  </div>

                  <div className="bg-[#F7F7F7] rounded-xl p-5">
                    <h4 className="text-black font-medium mb-3 text-[16px]">C. Investment Benchmarking Model</h4>
                    <p className="mb-3">Compares property ROI vs:</p>
                    <ul className="space-y-2 ml-1 mb-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>S&P 500, ETFs, treasuries</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#3B82F6] mt-1.5">•</span>
                        <span>Rental-index benchmark</span>
                      </li>
                    </ul>
                    <p className="text-black text-[14px] mt-3 pt-3 border-t border-black/[0.06]">
                      Shows "Hold vs Sell vs Reallocate" decision logic.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4 - Confidence Scoring */}
            <AccordionItem value="confidence" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Confidence Scoring System</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-3 text-[#666666] text-[15px] leading-relaxed">
                  <p className="mb-4">Each valuation is assigned a confidence score based on:</p>
                  <ul className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Data freshness scoring</strong> — Recency of source data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Comp-set agreement score</strong> — Consensus among comparables</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Neighborhood volatility index</strong> — Market stability metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Outlier probability</strong> — Statistical deviation analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Climate-model alignment</strong> — Environmental risk consistency</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-[13px] text-[#999999]">Confidence categories:</span>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-[#18A36F]/10 text-[#18A36F] rounded-full text-[12px] font-medium">High</span>
                        <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-[12px] font-medium">Medium</span>
                        <span className="px-3 py-1 bg-[#6A6A6A]/10 text-[#6A6A6A] rounded-full text-[12px] font-medium">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5 - Outlier Removal */}
            <AccordionItem value="outlier" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <Filter size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Outlier Removal</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-3 text-[#666666] text-[15px] leading-relaxed">
                  <p className="mb-4">We apply multi-stage outlier detection and correction:</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <span className="text-[#3B82F6] font-medium flex-shrink-0 w-6">1.</span>
                      <span><strong className="text-black">Z-score removal</strong> — Statistical outlier detection</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-[#3B82F6] font-medium flex-shrink-0 w-6">2.</span>
                      <span><strong className="text-black">Seasonal trend smoothing</strong> — Normalize temporal anomalies</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-[#3B82F6] font-medium flex-shrink-0 w-6">3.</span>
                      <span><strong className="text-black">Price-harmonic filtering</strong> — Remove noise from pricing data</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-[#3B82F6] font-medium flex-shrink-0 w-6">4.</span>
                      <span><strong className="text-black">Residual error correction</strong> — Model refinement iterations</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-[#3B82F6] font-medium flex-shrink-0 w-6">5.</span>
                      <span><strong className="text-black">Distressed-sale exclusion</strong> — Filter foreclosures and forced sales</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 6 - Error Bound & Reliability */}
            <AccordionItem value="error-bound" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Error Bound & Reliability</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-5 text-[#666666] text-[15px] leading-relaxed">
                  <p className="text-black">
                    Our models produce a confidence-weighted valuation range, showing best-case, median, and conservative scenarios.
                  </p>
                  
                  {/* Mini Chart Placeholder */}
                  <div className="bg-[#F7F7F7] rounded-xl p-6 mt-6">
                    <div className="flex items-end justify-between gap-4 h-32">
                      <div className="flex-1 flex flex-col justify-end items-center gap-2">
                        <div className="w-full bg-[#3B82F6]/20 rounded-t-lg" style={{ height: '60%' }}></div>
                        <span className="text-[12px] text-[#6A6A6A]">Conservative</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-end items-center gap-2">
                        <div className="w-full bg-[#3B82F6] rounded-t-lg" style={{ height: '85%' }}></div>
                        <span className="text-[12px] text-black font-medium">Median</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-end items-center gap-2">
                        <div className="w-full bg-[#3B82F6]/20 rounded-t-lg" style={{ height: '75%' }}></div>
                        <span className="text-[12px] text-[#6A6A6A]">Best-case</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#999999] italic mt-4">
                    Error margins are calculated using bootstrapped confidence intervals and cross-validated model performance.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 7 - Model Versioning */}
            <AccordionItem value="versioning" className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#F7F7F7]/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                    <Code size={20} className="text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-[17px] font-medium">Model Versioning & Transparency</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 space-y-3 text-[#666666] text-[15px] leading-relaxed">
                  <p className="mb-4">Every report includes complete traceability metadata:</p>
                  <ul className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Model version</strong> — Algorithm iteration identifier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Data version</strong> — Source data timestamp and batch ID</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Feature vector ID</strong> — Engineered features used</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Timestamp</strong> — Exact generation time (UTC)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#3B82F6] mt-1.5">•</span>
                      <span><strong className="text-black">Update cycle</strong> — Data refresh frequency</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <p className="text-[13px] text-[#999999] italic">
                      This ensures reproducibility at an academic standard.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* Flow Diagram */}
        <div className="mb-16">
          <h3 className="text-black text-[20px] font-medium mb-6 text-center">Processing Pipeline</h3>
          
          {/* Desktop Flow */}
          <div className="hidden lg:flex items-center justify-between gap-3">
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 1</div>
              <div className="text-[14px] text-black font-medium">Data Inputs</div>
            </div>
            <div className="text-[#3B82F6]">→</div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 2</div>
              <div className="text-[14px] text-black font-medium">Feature Engineering</div>
            </div>
            <div className="text-[#3B82F6]">→</div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 3</div>
              <div className="text-[14px] text-black font-medium">AI Engine</div>
            </div>
            <div className="text-[#3B82F6]">→</div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 4</div>
              <div className="text-[14px] text-black font-medium">Financial Simulation</div>
            </div>
            <div className="text-[#3B82F6]">→</div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 5</div>
              <div className="text-[14px] text-black font-medium">Confidence Model</div>
            </div>
            <div className="text-[#3B82F6]">→</div>
            <div className="flex-1 bg-[#F7F7F7] rounded-xl p-4 text-center">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 6</div>
              <div className="text-[14px] text-black font-medium">Report Output</div>
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-3">
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 1</div>
              <div className="text-[15px] text-black font-medium">Data Inputs</div>
            </div>
            <div className="text-[#3B82F6] text-center">↓</div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 2</div>
              <div className="text-[15px] text-black font-medium">Feature Engineering</div>
            </div>
            <div className="text-[#3B82F6] text-center">↓</div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 3</div>
              <div className="text-[15px] text-black font-medium">AI Engine</div>
            </div>
            <div className="text-[#3B82F6] text-center">↓</div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 4</div>
              <div className="text-[15px] text-black font-medium">Financial Simulation</div>
            </div>
            <div className="text-[#3B82F6] text-center">↓</div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 5</div>
              <div className="text-[15px] text-black font-medium">Confidence Model</div>
            </div>
            <div className="text-[#3B82F6] text-center">↓</div>
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <div className="text-[13px] text-[#6A6A6A] mb-1">STEP 6</div>
              <div className="text-[15px] text-black font-medium">Report Output</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-black/[0.06]">
          <p className="text-black font-medium mb-1">AIPropertyReport.com — Powered by ProExchange AI</p>
          <p className="text-[#6A6A6A] text-[14px]">This methodology is transparent and auditable.</p>
        </div>

      </div>
    </div>
  );
}
