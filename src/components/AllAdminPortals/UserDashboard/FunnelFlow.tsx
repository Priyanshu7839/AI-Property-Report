import { useState } from 'react';
import { ArrowRight, Save, MessageCircle, Home, TrendingUp, Shield, DollarSign, Bell, Eye, Calendar, Phone, ChevronRight, Check, Sparkles, Building2, ArrowUpDown, PieChart, X, Zap, Target, Activity, Plus, FileText, Calculator, Users, Star, Award } from 'lucide-react';
import { Button } from '../../ui/button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, Legend } from 'recharts';
import { DashboardEnhanced } from './DashboardEnhanced';
import { CashflowPage } from './CashflowPage';
import { ConsultantRecommendations } from './ConsultantRecommendations';
import { useNavigate } from 'react-router';

interface FunnelFlowProps {
  address: string;
  onBack: () => void;
}

export function FunnelFlow({ address, onBack }: FunnelFlowProps) {
  const [currentStep, setCurrentStep] = useState<'report' | 'login' | 'dashboard' | 'booking' | 'monetization' | 'upgrade' | 'businessmodel'>('dashboard');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'portfolio' | 'recommendations'>('portfolio');
  const navigate = useNavigate()

  // Step 1: Report with new CTAs
  const ReportWithCTAs = () => (
    <div className="min-h-screen bg-[#FAFBFC] relative">
      {/* Mesh Gradient Background - Same as existing */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,91,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(24,163,111,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.04)_0%,transparent_50%)]"></div>
      </div>

      {/* Floating dots pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simulated Report Summary */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#005BFF]/10 flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 text-[#005BFF]" />
            </div>
            <div>
              <h2 className="text-black mb-1">Property Intelligence Report</h2>
              <p className="text-[#6A6A6A] text-[14px]">{address}</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="text-[#6A6A6A] text-[13px] mb-1">Estimated Value</div>
              <div className="text-black text-[24px]">$1,028,000</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="text-[#6A6A6A] text-[13px] mb-1">Potential Savings</div>
              <div className="text-[#18A36F] text-[24px]">$48,420/yr</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="text-[#6A6A6A] text-[13px] mb-1">Home Equity</div>
              <div className="text-black text-[24px]">$428,000</div>
            </div>
          </div>

          {/* New CTA Buttons */}
          <div className="border-t border-black/[0.06] pt-6">
            <p className="text-[#6A6A6A] text-[14px] mb-4">Take action on your report:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setCurrentStep('login');
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#005BFF] text-white rounded-xl hover:bg-[#0052E0] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span className="text-[15px]">Save Property to Track Updates</span>
              </button>
              <button
                onClick={() => setCurrentStep('booking')}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-xl border-2 border-black/[0.08] hover:border-black/[0.15] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-[15px]">Talk to Financial Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Account Creation Modal
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[480px] w-full shadow-[0_24px_64px_rgba(0,0,0,0.2)] relative">
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-[#005BFF]/10 flex items-center justify-center mb-4">
            <Save className="w-7 h-7 text-[#005BFF]" />
          </div>

          {/* Title */}
          <h3 className="text-black text-[24px] mb-2">Save Your Property</h3>
          <p className="text-[#6A6A6A] text-[15px] mb-6">
            Create an account to save this property and receive smart refinance and insurance alerts.
          </p>

          {/* Form */}
          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]"
              />
            </div>
            <div>
              <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#18A36F] mt-0.5 flex-shrink-0" />
              <span className="text-[13px] text-black">Automatic refinance opportunity alerts</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#18A36F] mt-0.5 flex-shrink-0" />
              <span className="text-[13px] text-black">Insurance waste detection notifications</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#18A36F] mt-0.5 flex-shrink-0" />
              <span className="text-[13px] text-black">Live property value tracking</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setIsLoginModalOpen(false);
              setCurrentStep('dashboard');
            }}
            className="w-full px-5 py-3 bg-[#005BFF] text-white rounded-xl hover:bg-[#0052E0] transition-colors text-[15px] flex items-center justify-center gap-2"
          >
            Create Account & Save Property
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[#6A6A6A] text-[12px] text-center mt-4">
            Already have an account? <button className="text-[#005BFF] hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );

  // Step 3: Dashboard Lite
  const DashboardLite = () => (
    <div className="min-h-screen bg-[#0A0A0A] relative">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-white text-[36px] sm:text-[42px] tracking-tight mb-2">Dashboard</h1>
              <p className="text-[#6B7280] text-[16px]">Real-time insights for your property portfolio</p>
            </div>
            <button 
              onClick={() => setCurrentStep('booking')}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-[#005BFF] text-white rounded-xl hover:bg-[#0052E0] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-[15px]">Talk to Advisor</span>
            </button>
          </div>

          {/* Add Property Button */}
          <button className="mb-6 flex items-center gap-2 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.08] text-white rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <Plus className="w-4 h-4" />
            <span className="text-[15px]">Add Property to Portfolio</span>
          </button>

          {/* Dashboard Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setDashboardTab('portfolio')}
              className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
                dashboardTab === 'portfolio'
                  ? 'bg-[#005BFF] text-white'
                  : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Portfolio
              </div>
            </button>
            <button
              onClick={() => setDashboardTab('recommendations')}
              className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap ${
                dashboardTab === 'recommendations'
                  ? 'bg-[#005BFF] text-white'
                  : 'bg-white/[0.05] text-[#9CA3AF] hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Recommendations
              </div>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#18A36F]"></div>
                <span className="text-[#6B7280] text-[12px]">Total Value</span>
              </div>
              <div className="text-white text-[24px] leading-none">$1.03M</div>
            </div>
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#005BFF]"></div>
                <span className="text-[#6B7280] text-[12px]">Monthly Growth</span>
              </div>
              <div className="text-[#18A36F] text-[24px] leading-none">+1.2%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#005BFF]"></div>
                <span className="text-[#6B7280] text-[12px]">Active Alerts</span>
              </div>
              <div className="text-white text-[24px] leading-none">2</div>
            </div>
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#18A36F]"></div>
                <span className="text-[#6B7280] text-[12px]">Savings YTD</span>
              </div>
              <div className="text-[#18A36F] text-[24px] leading-none">$48.4K</div>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Component or Consultant Recommendations */}
        {dashboardTab === 'portfolio' && (
          <DashboardEnhanced 
            address={address}
            onBooking={() => setCurrentStep('booking')}
            onUpgrade={() => setIsUpgradeModalOpen(true)}
          />
        )}
        
        {dashboardTab === 'recommendations' && (
          <ConsultantRecommendations 
            tab={dashboardTab}
            address={address}
          />
        )}
      </div>
    </div>
  );

  // Step 4: Advisor Booking
  const AdvisorBooking = () => (
    <div className="min-h-screen bg-[#FAFBFC] relative">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,91,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(24,163,111,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.04)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setCurrentStep('report')}
          className="flex items-center gap-2 text-[#6A6A6A] hover:text-black transition-colors mb-6 text-[14px]"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Report
        </button>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-[#005BFF]/10 flex items-center justify-center mb-4">
            <Calendar className="w-7 h-7 text-[#005BFF]" />
          </div>

          {/* Title */}
          <h2 className="text-black text-[28px] mb-2">Talk to a Financial Advisor</h2>
          <p className="text-[#6A6A6A] text-[15px] mb-8">
            Get personalized guidance on your property's refinance, reinvestment, and insurance opportunities.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <TrendingUp className="w-6 h-6 text-[#005BFF] mb-2" />
              <div className="text-black text-[14px] mb-1">Refinance Strategy</div>
              <div className="text-[#6A6A6A] text-[12px]">Optimize your mortgage</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <Shield className="w-6 h-6 text-[#005BFF] mb-2" />
              <div className="text-black text-[14px] mb-1">Insurance Review</div>
              <div className="text-[#6A6A6A] text-[12px]">Cut unnecessary costs</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <DollarSign className="w-6 h-6 text-[#005BFF] mb-2" />
              <div className="text-black text-[14px] mb-1">Equity Deployment</div>
              <div className="text-[#6A6A6A] text-[12px]">Smart reinvestment</div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]"
              />
            </div>
            <div>
              <label className="block text-[13px] text-[#6A6A6A] mb-1.5">Preferred Time</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-black/[0.08] focus:border-[#005BFF] focus:outline-none transition-colors text-[15px]">
                <option>Morning (9am-12pm)</option>
                <option>Afternoon (12pm-5pm)</option>
                <option>Evening (5pm-8pm)</option>
              </select>
            </div>
          </div>

          {/* Post-Call Benefits */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#005BFF]/5 to-[#18A36F]/5 border border-[#005BFF]/20 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-[#005BFF] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-black text-[14px] mb-1">After the call, unlock:</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#18A36F]" />
                    <span className="text-[#6A6A6A] text-[13px]">Pre-approved refinance offers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#18A36F]" />
                    <span className="text-[#6A6A6A] text-[13px]">Optimized insurance quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#18A36F]" />
                    <span className="text-[#6A6A6A] text-[13px]">Personalized reinvestment strategies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setCurrentStep('monetization')}
            className="w-full px-5 py-4 bg-[#005BFF] text-white rounded-xl hover:bg-[#0052E0] transition-colors text-[15px] flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </div>
  );

  // Step 5: Monetization Flow Diagram
  const MonetizationDiagram = () => (
    <div className="min-h-screen bg-[#FAFBFC] relative">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,91,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(24,163,111,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.04)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-black text-[32px] mb-2">Monetization Flow</h1>
        <p className="text-[#6A6A6A] text-[15px] mb-8">Revenue path from advisor consultation to commission generation</p>

        <div className="bg-white rounded-2xl p-8 border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
          {/* Flow Diagram */}
          <div className="space-y-6">
            {/* Starting Point */}
            <div className="flex items-center gap-4">
              <div className="w-full max-w-[240px] p-5 rounded-xl bg-[#005BFF]/10 border-2 border-[#005BFF]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-[#005BFF]" />
                  <span className="text-black">Advisor Call</span>
                </div>
                <p className="text-[#6A6A6A] text-[13px]">Free consultation booked</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#6A6A6A]" />
              <div className="flex-1 text-[#6A6A6A] text-[14px]">
                Personalized analysis & recommendations
              </div>
            </div>

            {/* Path 1: Refinance */}
            <div className="flex items-start gap-4 pl-8">
              <div className="w-1 h-20 bg-[#005BFF]/20 -mt-2"></div>
              <div className="flex-1 flex items-center gap-4">
                <div className="w-full max-w-[240px] p-5 rounded-xl bg-white border-2 border-black/[0.08] hover:border-[#005BFF]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#005BFF]" />
                    <span className="text-black">Mortgage Refinance</span>
                  </div>
                  <p className="text-[#6A6A6A] text-[13px]">Rate optimization</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#6A6A6A]" />
                <div className="px-5 py-3 rounded-xl bg-[#18A36F]/10 border-2 border-[#18A36F]/30">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#18A36F]" />
                    <span className="text-[#18A36F] text-[15px]">0.5-1% Commission</span>
                  </div>
                  <p className="text-[#18A36F]/70 text-[12px] mt-1">~$5,000-$10,000</p>
                </div>
              </div>
            </div>

            {/* Path 2: Insurance */}
            <div className="flex items-start gap-4 pl-8">
              <div className="w-1 h-20 bg-[#005BFF]/20 -mt-2"></div>
              <div className="flex-1 flex items-center gap-4">
                <div className="w-full max-w-[240px] p-5 rounded-xl bg-white border-2 border-black/[0.08] hover:border-[#005BFF]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-[#005BFF]" />
                    <span className="text-black">Insurance Switch</span>
                  </div>
                  <p className="text-[#6A6A6A] text-[13px]">Policy optimization</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#6A6A6A]" />
                <div className="px-5 py-3 rounded-xl bg-[#18A36F]/10 border-2 border-[#18A36F]/30">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#18A36F]" />
                    <span className="text-[#18A36F] text-[15px]">10-15% Commission</span>
                  </div>
                  <p className="text-[#18A36F]/70 text-[12px] mt-1">~$200-$400/yr</p>
                </div>
              </div>
            </div>

            {/* Path 3: Reinvestment */}
            <div className="flex items-start gap-4 pl-8">
              <div className="w-1 h-20 bg-[#005BFF]/20 -mt-2"></div>
              <div className="flex-1 flex items-center gap-4">
                <div className="w-full max-w-[240px] p-5 rounded-xl bg-white border-2 border-black/[0.08] hover:border-[#005BFF]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="w-5 h-5 text-[#005BFF]" />
                    <span className="text-black">Reinvestment</span>
                  </div>
                  <p className="text-[#6A6A6A] text-[13px]">Equity deployment</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#6A6A6A]" />
                <div className="px-5 py-3 rounded-xl bg-[#18A36F]/10 border-2 border-[#18A36F]/30">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#18A36F]" />
                    <span className="text-[#18A36F] text-[15px]">0.5-1.5% AUM</span>
                  </div>
                  <p className="text-[#18A36F]/70 text-[12px] mt-1">~$500-$5,000/yr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-black/[0.06]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
                <div className="text-[#6A6A6A] text-[13px] mb-1">Avg. Revenue Per User</div>
                <div className="text-[#18A36F] text-[24px]">$3,200</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
                <div className="text-[#6A6A6A] text-[13px] mb-1">Conversion Rate</div>
                <div className="text-black text-[24px]">35%</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
                <div className="text-[#6A6A6A] text-[13px] mb-1">CAC Payback</div>
                <div className="text-black text-[24px]">2 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 6: Business Model & Cashflow
  const BusinessModelPage = () => (
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
                  <div className="text-[#9CA3AF] text-[12px]">Paid Acquisition</div>
                  <div className="text-[#6B7280] text-[11px]">Marketing spend</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$3-5K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $36-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Tech Infrastructure</div>
                  <div className="text-[#6B7280] text-[11px]">Hosting, APIs, data</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$2-5K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $24-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Dev/Design Contractors</div>
                  <div className="text-[#6B7280] text-[11px]">External team</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$2-5K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $24-60K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Legal/Compliance</div>
                  <div className="text-[#6B7280] text-[11px]">One-time setup</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$10-20K</span>
                  <span className="text-[#6B7280] text-[13px]">one-time</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Critical for fintech lead gen</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Tools/Software</div>
                  <div className="text-[#6B7280] text-[11px]">SaaS stack</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$0.5-1K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $6-12K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Mode */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/[0.08] overflow-hidden mb-4">
          <div className="px-6 py-4 bg-[#0F0F0F] border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-[20px] mb-1">Growth Mode</h2>
                <p className="text-[#6B7280] text-[13px]">After validation • Scaling phase</p>
              </div>
              <div className="text-right">
                <div className="text-[#6B7280] text-[11px] uppercase tracking-wide mb-1">Total Range</div>
                <div className="text-[#18A36F] text-[24px]">$450-750K</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Growth Strategy</div>
                  <div className="text-[#18A36F] text-[11px]">Scaled engagement</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$9-12K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $108-144K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Paid Acquisition</div>
                  <div className="text-[#18A36F] text-[11px]">Increased CAC budget</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$10-20K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $120-240K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Tech/APIs</div>
                  <div className="text-[#18A36F] text-[11px]">Scale infrastructure</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$5-10K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $60-120K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Dev/Design Team</div>
                  <div className="text-[#18A36F] text-[11px]">Full-time resources</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$10-15K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $120-180K</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Legal/Compliance</div>
                  <div className="text-[#18A36F] text-[11px]">Ongoing costs</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$20-30K</span>
                  <span className="text-[#6B7280] text-[13px]">/yr</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual compliance</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#9CA3AF] text-[12px]">Tools</div>
                  <div className="text-[#18A36F] text-[11px]">Enhanced stack</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[20px]">$1-2K</span>
                  <span className="text-[#6B7280] text-[13px]">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="text-[#6B7280] text-[11px]">Annual: $12-24K</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Variables & Notes */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="px-6 py-4 bg-[#0F0F0F] border-b border-white/[0.06]">
            <h2 className="text-white text-[18px]">Key Variables & Assumptions</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#005BFF] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-white text-[14px] mb-1">API Costs Scale with Volume</div>
                  <div className="text-[#6B7280] text-[13px]">Property data APIs and credit checks can become significant at 10K+ users/month</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#005BFF] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-white text-[14px] mb-1">California W-2 Burden</div>
                  <div className="text-[#6B7280] text-[13px]">Hiring CA employees adds 25-30% burden (taxes, benefits, insurance)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#18A36F] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-white text-[14px] mb-1">Path to Self-Sustaining</div>
                  <div className="text-[#6B7280] text-[13px]">If lead-gen model validates in months 1-3, engagement fees covered by revenue quickly</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#18A36F] mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-white text-[14px] mb-1">Goal: Pre-Runway Breakeven</div>
                  <div className="text-[#6B7280] text-[13px]">Get to self-sustaining before burning through runway. ARPU $3.2K, 35% conversion, 2-mo CAC payback</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 7: ProExchange Upgrade Modal
  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[560px] w-full shadow-[0_24px_64px_rgba(0,0,0,0.2)] relative">
        <button
          onClick={() => setIsUpgradeModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#005BFF]/10 to-[#18A36F]/10 flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-[#005BFF]" />
          </div>

          {/* Title */}
          <h3 className="text-black text-[24px] mb-2">Need more control?</h3>
          <p className="text-[#6A6A6A] text-[15px] mb-6">
            ProExchange lets you track multiple properties, manage loans, and reinvest smartly across asset classes.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-[#005BFF]/10 flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-[#005BFF]" />
              </div>
              <div>
                <div className="text-black text-[14px] mb-0.5">Multi-Property Tracking</div>
                <div className="text-[#6A6A6A] text-[13px]">Monitor unlimited properties in one dashboard</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-[#005BFF]/10 flex items-center justify-center flex-shrink-0">
                <ArrowUpDown className="w-4 h-4 text-[#005BFF]" />
              </div>
              <div>
                <div className="text-black text-[14px] mb-0.5">Asset Class Swapping</div>
                <div className="text-[#6A6A6A] text-[13px]">Move between real estate, stocks, bonds, and crypto</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFBFC] border border-black/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-[#005BFF]/10 flex items-center justify-center flex-shrink-0">
                <PieChart className="w-4 h-4 text-[#005BFF]" />
              </div>
              <div>
                <div className="text-black text-[14px] mb-0.5">Portfolio Intelligence</div>
                <div className="text-[#6A6A6A] text-[13px]">AI-powered cross-asset allocation and rebalancing</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              setIsUpgradeModalOpen(false);
              // Would navigate to ProExchange
            }}
            className="w-full px-5 py-4 bg-[#005BFF] text-white rounded-xl hover:bg-[#0052E0] transition-colors text-[15px] flex items-center justify-center gap-2 mb-4"
          >
            Switch to ProExchange
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Footer */}
          <div className="text-center">
            <p className="text-[#6A6A6A] text-[12px]">
              AIPropertyReport is powered by <span className="text-black">ProExchange</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={()=>{navigate('/')}}
              className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-[13px] sm:text-[14px]"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
              <span className="hidden sm:inline">Exit Dashboard</span>
              <span className="sm:hidden">Exit</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
              <button
                onClick={() => setCurrentStep('report')}
                className={`px-2 sm:px-3 py-1.5 rounded text-[11px] sm:text-[13px] transition-colors whitespace-nowrap ${
                  currentStep === 'report'
                    ? 'bg-[#005BFF] text-white'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Report
              </button>
              <button
                onClick={() => setCurrentStep('dashboard')}
                className={`px-2 sm:px-3 py-1.5 rounded text-[11px] sm:text-[13px] transition-colors whitespace-nowrap ${
                  currentStep === 'dashboard'
                    ? 'bg-[#005BFF] text-white'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="hidden sm:inline">My Property</span>
                <span className="sm:hidden">Property</span>
              </button>
              <button
                onClick={() => setCurrentStep('booking')}
                className={`px-2 sm:px-3 py-1.5 rounded text-[11px] sm:text-[13px] transition-colors whitespace-nowrap ${
                  currentStep === 'booking'
                    ? 'bg-[#005BFF] text-white'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Advisor
              </button>
              {/* <button
                onClick={() => setCurrentStep('monetization')}
                className={`px-2 sm:px-3 py-1.5 rounded text-[11px] sm:text-[13px] transition-colors whitespace-nowrap ${
                  currentStep === 'monetization'
                    ? 'bg-[#005BFF] text-white'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Flow
              </button>
              <button
                onClick={() => setCurrentStep('businessmodel')}
                className={`px-2 sm:px-3 py-1.5 rounded text-[11px] sm:text-[13px] transition-colors whitespace-nowrap ${
                  currentStep === 'businessmodel'
                    ? 'bg-[#005BFF] text-white'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Cashflow
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Render Current Step */}
      {currentStep === 'report' && <ReportWithCTAs />}
      {currentStep === 'dashboard' && <DashboardLite />}
      {currentStep === 'booking' && <AdvisorBooking />}
      {currentStep === 'monetization' && <MonetizationDiagram />}
      {currentStep === 'businessmodel' && <CashflowPage />}

      {/* Modals */}
      {isLoginModalOpen && <LoginModal />}
      {isUpgradeModalOpen && <UpgradeModal />}
    </div>
  );
}