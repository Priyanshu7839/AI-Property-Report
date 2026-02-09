import { Calculator, Shield, TrendingUp, Users, Star, Award, ChevronRight, Check, Target } from 'lucide-react';
import { useState } from 'react';

interface ConsultantRecommendationsProps {
  address: string;
}

export function ConsultantRecommendations({ address }: ConsultantRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<'tax' | 'insurance' | 'mortgage' | 'agents'>('tax');

  // Recommendation Banner
  const RecommendationBanner = () => (
    <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-[#005BFF]/10 via-[#005BFF]/5 to-transparent border border-[#005BFF]/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#005BFF]/20 flex items-center justify-center flex-shrink-0">
          <Target className="w-5 h-5 text-[#005BFF]" />
        </div>
        <div>
          <h3 className="text-white text-[16px] mb-1 font-medium">Personalized Recommendations</h3>
          <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
            Based on your property at <span className="text-white">{address}</span>, we've identified the best consultants and partners specifically suited for your needs.
          </p>
        </div>
      </div>
    </div>
  );

  // Tax Consultant Recommendations
  const TaxConsultants = () => (
    <div className="space-y-4">
      <RecommendationBanner />
      
      {[
        {
          name: 'Sarah Chen, CPA',
          firm: 'Westside Tax Advisory',
          rating: 4.9,
          reviews: 247,
          specialty: 'Property Tax Optimization',
          savings: '$12K-18K',
          description: 'Specialized in California property tax strategies with 15 years experience in high-value residential properties.',
          badges: ['Top Rated', 'Verified'],
        },
        {
          name: 'Michael Torres, EA',
          firm: 'Equity Tax Partners',
          rating: 4.8,
          reviews: 189,
          specialty: '1031 Exchange Expert',
          savings: '$8K-15K',
          description: 'Expert in tax-deferred exchanges and equity optimization strategies for investment properties.',
          badges: ['Specialist', 'Certified'],
        },
        {
          name: 'Jennifer Liu, CPA',
          firm: 'Pacific Coast Tax Group',
          rating: 4.9,
          reviews: 312,
          specialty: 'HELOC Tax Planning',
          savings: '$5K-10K',
          description: 'Focused on maximizing deductions for home equity loans and investment income optimization.',
          badges: ['Expert', 'Local'],
        },
      ].map((consultant, idx) => (
        <div key={idx} className="p-5 rounded-xl bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white text-[16px] font-medium">{consultant.name}</h4>
                {consultant.badges.map((badge, bidx) => (
                  <span key={bidx} className="px-2 py-0.5 rounded text-[10px] bg-[#18A36F]/20 text-[#18A36F] border border-[#18A36F]/30">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[#9CA3AF] text-[13px] mb-2">{consultant.firm}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                  <span className="text-white text-[13px]">{consultant.rating}</span>
                  <span className="text-[#6B7280] text-[12px]">({consultant.reviews} reviews)</span>
                </div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div className="text-[#9CA3AF] text-[12px]">{consultant.specialty}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#18A36F] text-[18px] font-medium mb-1">{consultant.savings}</div>
              <div className="text-[#6B7280] text-[11px]">Est. Annual Savings</div>
            </div>
          </div>
          <p className="text-[#9CA3AF] text-[13px] leading-relaxed mb-4">{consultant.description}</p>
          <button className="w-full px-4 py-2.5 rounded-lg bg-[#005BFF] hover:bg-[#0052E0] text-white text-[14px] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
            Schedule Consultation
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Insurance Consultant Recommendations
  const InsuranceConsultants = () => (
    <div className="space-y-4">
      <RecommendationBanner />
      
      {[
        {
          name: 'David Park',
          firm: 'Guardian Property Insurance',
          rating: 4.9,
          reviews: 428,
          specialty: 'High-Value Home Insurance',
          savings: '$3.2K-5.8K',
          description: 'Specializes in comprehensive coverage reviews for properties over $1M, identifying waste and optimizing premiums.',
          badges: ['Top Provider', 'Local Expert'],
        },
        {
          name: 'Rachel Martinez',
          firm: 'Coastal Insurance Advisors',
          rating: 4.8,
          reviews: 295,
          specialty: 'Multi-Policy Bundling',
          savings: '$2.5K-4.2K',
          description: 'Expert in bundling home, auto, and umbrella policies to maximize savings without coverage gaps.',
          badges: ['Verified', 'Bundle Specialist'],
        },
        {
          name: 'James Wilson',
          firm: 'Prime Insurance Group',
          rating: 4.9,
          reviews: 371,
          specialty: 'Risk Assessment',
          savings: '$2.8K-5.1K',
          description: 'Focuses on accurate property valuations and risk mitigation strategies to lower premiums.',
          badges: ['Certified', 'Risk Expert'],
        },
      ].map((consultant, idx) => (
        <div key={idx} className="p-5 rounded-xl bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white text-[16px] font-medium">{consultant.name}</h4>
                {consultant.badges.map((badge, bidx) => (
                  <span key={bidx} className="px-2 py-0.5 rounded text-[10px] bg-[#18A36F]/20 text-[#18A36F] border border-[#18A36F]/30">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[#9CA3AF] text-[13px] mb-2">{consultant.firm}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                  <span className="text-white text-[13px]">{consultant.rating}</span>
                  <span className="text-[#6B7280] text-[12px]">({consultant.reviews} reviews)</span>
                </div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div className="text-[#9CA3AF] text-[12px]">{consultant.specialty}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#18A36F] text-[18px] font-medium mb-1">{consultant.savings}</div>
              <div className="text-[#6B7280] text-[11px]">Est. Annual Savings</div>
            </div>
          </div>
          <p className="text-[#9CA3AF] text-[13px] leading-relaxed mb-4">{consultant.description}</p>
          <button className="w-full px-4 py-2.5 rounded-lg bg-[#005BFF] hover:bg-[#0052E0] text-white text-[14px] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
            Get Free Quote
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Mortgage Consultant Recommendations
  const MortgageConsultants = () => (
    <div className="space-y-4">
      <RecommendationBanner />
      
      {[
        {
          name: 'Amanda Foster',
          firm: 'Premier Mortgage Solutions',
          rating: 4.9,
          reviews: 512,
          specialty: 'Refinance & HELOC',
          savings: '$18K-32K',
          description: 'Specializes in refinancing strategies and HELOC optimization for high-equity homeowners. 20+ years experience.',
          badges: ['Top Rated', 'Verified Lender'],
          apr: '5.85%',
        },
        {
          name: 'Robert Kim',
          firm: 'Pacific Lending Group',
          rating: 4.8,
          reviews: 387,
          specialty: 'Cash-Out Refinance',
          savings: '$15K-28K',
          description: 'Expert in cash-out refinancing for investment and renovation projects with competitive rates.',
          badges: ['Specialist', 'Fast Close'],
          apr: '6.12%',
        },
        {
          name: 'Lisa Thompson',
          firm: 'Equity First Mortgage',
          rating: 4.9,
          reviews: 445,
          specialty: 'Rate Optimization',
          savings: '$12K-25K',
          description: 'Focused on finding the absolute lowest rates and structuring optimal loan terms for your financial goals.',
          badges: ['Best Rates', 'Certified'],
          apr: '5.75%',
        },
      ].map((consultant, idx) => (
        <div key={idx} className="p-5 rounded-xl bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white text-[16px] font-medium">{consultant.name}</h4>
                {consultant.badges.map((badge, bidx) => (
                  <span key={bidx} className="px-2 py-0.5 rounded text-[10px] bg-[#18A36F]/20 text-[#18A36F] border border-[#18A36F]/30">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[#9CA3AF] text-[13px] mb-2">{consultant.firm}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                  <span className="text-white text-[13px]">{consultant.rating}</span>
                  <span className="text-[#6B7280] text-[12px]">({consultant.reviews} reviews)</span>
                </div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div className="text-[#9CA3AF] text-[12px]">{consultant.specialty}</div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div className="text-[#18A36F] text-[12px] font-medium">{consultant.apr} APR</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#18A36F] text-[18px] font-medium mb-1">{consultant.savings}</div>
              <div className="text-[#6B7280] text-[11px]">Est. Lifetime Savings</div>
            </div>
          </div>
          <p className="text-[#9CA3AF] text-[13px] leading-relaxed mb-4">{consultant.description}</p>
          <button className="w-full px-4 py-2.5 rounded-lg bg-[#005BFF] hover:bg-[#0052E0] text-white text-[14px] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
            Get Pre-Qualified
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Real Estate Agents Recommendations
  const AgentsRecommendations = () => (
    <div className="space-y-4">
      <RecommendationBanner />
      
      {[
        {
          name: 'Marcus Johnson',
          firm: 'Luxury Properties Group',
          rating: 4.9,
          reviews: 628,
          specialty: 'High-End Residential',
          avgSalePrice: '$1.2M',
          description: 'Top-producing agent specializing in luxury homes with proven track record of maximizing sale prices.',
          badges: ['Top 1%', 'Luxury Certified'],
          salesVolume: '$45M+ in 2025',
        },
        {
          name: 'Emily Rodriguez',
          firm: 'Coastal Realty Partners',
          rating: 4.8,
          reviews: 492,
          specialty: 'Investment Properties',
          avgSalePrice: '$980K',
          description: 'Expert in investment property transactions and 1031 exchanges with strong investor network.',
          badges: ['Investment Specialist', 'Verified'],
          salesVolume: '$32M+ in 2025',
        },
        {
          name: 'Daniel Chang',
          firm: 'Prime Real Estate Advisors',
          rating: 4.9,
          reviews: 547,
          specialty: 'Market Strategy',
          avgSalePrice: '$1.1M',
          description: 'Data-driven agent with expertise in pricing strategy and market timing for optimal returns.',
          badges: ['Market Expert', 'Top Rated'],
          salesVolume: '$38M+ in 2025',
        },
      ].map((agent, idx) => (
        <div key={idx} className="p-5 rounded-xl bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white text-[16px] font-medium">{agent.name}</h4>
                {agent.badges.map((badge, bidx) => (
                  <span key={bidx} className="px-2 py-0.5 rounded text-[10px] bg-[#18A36F]/20 text-[#18A36F] border border-[#18A36F]/30">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[#9CA3AF] text-[13px] mb-2">{agent.firm}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                  <span className="text-white text-[13px]">{agent.rating}</span>
                  <span className="text-[#6B7280] text-[12px]">({agent.reviews} reviews)</span>
                </div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div className="text-[#9CA3AF] text-[12px]">{agent.specialty}</div>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-[#6B7280]">
                <div>Avg Sale: <span className="text-white">{agent.avgSalePrice}</span></div>
                <div className="w-px h-3 bg-white/[0.1]"></div>
                <div>{agent.salesVolume}</div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#005BFF]/20 to-[#18A36F]/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#005BFF]" />
            </div>
          </div>
          <p className="text-[#9CA3AF] text-[13px] leading-relaxed mb-4">{agent.description}</p>
          <button className="w-full px-4 py-2.5 rounded-lg bg-[#005BFF] hover:bg-[#0052E0] text-white text-[14px] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
            Schedule Meeting
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Render based on tab
  return (
    <div>
      {/* Sub-navigation for consultant types */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('tax')}
          className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
            activeTab === 'tax'
              ? 'bg-[#005BFF] text-white'
              : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Tax Consultant
          </div>
        </button>
        <button
          onClick={() => setActiveTab('insurance')}
          className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
            activeTab === 'insurance'
              ? 'bg-[#005BFF] text-white'
              : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Insurance Consultant
          </div>
        </button>
        <button
          onClick={() => setActiveTab('mortgage')}
          className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
            activeTab === 'mortgage'
              ? 'bg-[#005BFF] text-white'
              : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Mortgage Consultant
          </div>
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
            activeTab === 'agents'
              ? 'bg-[#005BFF] text-white'
              : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Agent Network
          </div>
        </button>
      </div>

      {/* Content based on active sub-tab */}
      {activeTab === 'tax' && <TaxConsultants />}
      {activeTab === 'insurance' && <InsuranceConsultants />}
      {activeTab === 'mortgage' && <MortgageConsultants />}
      {activeTab === 'agents' && <AgentsRecommendations />}
    </div>
  );
}