import { TrendingUp, Shield, DollarSign, Bell, Check, Sparkles, MessageCircle, ArrowRight, Home, Activity, Target, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, Legend } from 'recharts';

interface DashboardEnhancedProps {
  address: string;
  onBooking: () => void;
  onUpgrade: () => void;
}

export function DashboardEnhanced({ address, onBooking, onUpgrade }: DashboardEnhancedProps) {
  // Chart data
  const propertyValueData = [
    { month: 'Jan', value: 980000 },
    { month: 'Feb', value: 985000 },
    { month: 'Mar', value: 982000 },
    { month: 'Apr', value: 992000 },
    { month: 'May', value: 998000 },
    { month: 'Jun', value: 1005000 },
    { month: 'Jul', value: 1008000 },
    { month: 'Aug', value: 1012000 },
    { month: 'Sep', value: 1018000 },
    { month: 'Oct', value: 1022000 },
    { month: 'Nov', value: 1025000 },
    { month: 'Dec', value: 1028000 },
  ];

  const performanceData = [
    { month: 'Jul', roi: 6.8 },
    { month: 'Aug', roi: 7.2 },
    { month: 'Sep', roi: 7.5 },
    { month: 'Oct', roi: 7.9 },
    { month: 'Nov', roi: 8.0 },
    { month: 'Dec', roi: 8.2 },
  ];

  const equityData = [
    { name: 'Equity', value: 41.6, fill: '#18A36F' },
  ];

  const alertsActivity = [
    { day: 'Mon', count: 0 },
    { day: 'Tue', count: 1 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 2 },
    { day: 'Fri', count: 1 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 0 },
  ];

  return (
    <div className="space-y-3">
      {/* Top Metrics Bar - Dark Exchange Style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] p-3">
          <div className="text-[#6B7280] text-[11px] uppercase tracking-wide mb-1">24h Change</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[#18A36F] text-[18px]">+1.21%</span>
            <span className="text-[#18A36F] text-[12px]">$12.4K</span>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] p-3">
          <div className="text-[#6B7280] text-[11px] uppercase tracking-wide mb-1">Equity Position</div>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-[18px]">41.6%</span>
            <span className="text-[#6B7280] text-[12px]">$428K</span>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] p-3">
          <div className="text-[#6B7280] text-[11px] uppercase tracking-wide mb-1">YTD Return</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[#18A36F] text-[18px]">+8.2%</span>
            <span className="text-[#6B7280] text-[12px]">vs 5.8%</span>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] p-3">
          <div className="text-[#6B7280] text-[11px] uppercase tracking-wide mb-1">Opportunities</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[#005BFF] text-[18px]">2 Active</span>
            <span className="text-[#18A36F] text-[12px]">$48K</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column - Chart & Data */}
        <div className="lg:col-span-8">
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden">
            
            {/* Header Bar - Dark Exchange Style */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A] gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#005BFF] flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white text-[14px] sm:text-[15px] break-all">{address}</div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#18A36F] animate-pulse"></div>
                    Live • Last updated 14:32:18
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <div className="text-white text-[20px] sm:text-[24px] leading-none mb-1">$1,028,000</div>
                <div className="text-[#18A36F] text-[12px]">+$12,400 (1.21%) today</div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="p-4">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-[11px] rounded bg-[#005BFF] text-white">1Y</button>
                  <button className="px-3 py-1 text-[11px] rounded bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333333]">6M</button>
                  <button className="px-3 py-1 text-[11px] rounded bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333333]">3M</button>
                  <button className="px-3 py-1 text-[11px] rounded bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333333]">1M</button>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                  <Activity className="w-3.5 h-3.5" />
                  Valuation Chart
                </div>
              </div>
              
              <div className="relative h-56 bg-[#0A0A0A] rounded border border-white/[0.04] p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={propertyValueData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18A36F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#18A36F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.05} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 10 }}
                      dy={8}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 10 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      domain={[960000, 1040000]}
                      dx={-8}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1A1A',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, 'Value']}
                      labelStyle={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 500 }}
                      itemStyle={{ color: '#18A36F', fontSize: '12px', fontWeight: 600 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#18A36F" 
                      strokeWidth={2}
                      fill="url(#colorValue)"
                      animationDuration={800}
                      dot={false}
                      activeDot={{ r: 3, fill: '#18A36F', strokeWidth: 2, stroke: '#1A1A1A' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Grid - Dark Exchange Style */}
            <div className="border-t border-white/[0.06] bg-[#0A0A0A]">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
                <div className="p-3">
                  <div className="text-[#6B7280] text-[10px] uppercase tracking-wide mb-1">Equity</div>
                  <div className="text-white text-[16px]">$428,000</div>
                  <div className="text-[#18A36F] text-[11px]">41.6% LTV</div>
                </div>
                <div className="p-3">
                  <div className="text-[#6B7280] text-[10px] uppercase tracking-wide mb-1">Mortgage</div>
                  <div className="text-white text-[16px]">$600,000</div>
                  <div className="text-[#6B7280] text-[11px]">3.25% APR</div>
                </div>
                <div className="p-3">
                  <div className="text-[#6B7280] text-[10px] uppercase tracking-wide mb-1">Monthly</div>
                  <div className="text-white text-[16px]">$2,584</div>
                  <div className="text-[#6B7280] text-[11px]">P&I Payment</div>
                </div>
                <div className="p-3">
                  <div className="text-[#6B7280] text-[10px] uppercase tracking-wide mb-1">Annual ROI</div>
                  <div className="text-[#18A36F] text-[16px]">+8.2%</div>
                  <div className="text-[#6B7280] text-[11px]">vs 5.8% avg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities Table */}
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden mt-3">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A]">
              <div className="flex items-center justify-between">
                <div className="text-white text-[13px]">Active Opportunities</div>
                <div className="text-[#18A36F] text-[12px]">$48,400 potential savings</div>
              </div>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {/* Refinance Row */}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-[#2A2A2A] cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#005BFF] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-[13px]">Refinance Opportunity</div>
                    <div className="text-[#6B7280] text-[11px]">Rate: 3.25% → 2.95% • Term: 30yr</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#18A36F] text-[15px]">$284/mo</div>
                  <div className="text-[#6B7280] text-[11px]">$102K lifetime</div>
                </div>
              </div>

              {/* Insurance Row */}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-[#2A2A2A] cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#005BFF] flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-[13px]">Insurance Optimization</div>
                    <div className="text-[#6B7280] text-[11px]">Current: $1,540/yr • Market: $1,200/yr</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#18A36F] text-[15px]">$1,200/yr</div>
                  <div className="text-[#6B7280] text-[11px]">23% savings</div>
                </div>
              </div>

              {/* Equity Investment Row */}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-[#2A2A2A] cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#005BFF] flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-[13px]">Equity Investment</div>
                    <div className="text-[#6B7280] text-[11px]">Available: $428K • Est. ROI: 8.2%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#18A36F] text-[15px]">+8.2%</div>
                  <div className="text-[#6B7280] text-[11px]">$35K/yr</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Book Style */}
        <div className="lg:col-span-4 space-y-3">
          {/* Actions Panel */}
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A]">
              <div className="text-white text-[13px]">Quick Actions</div>
            </div>
            <div className="p-3 space-y-2">
              <button 
                onClick={onBooking}
                className="w-full px-4 py-3 rounded bg-[#005BFF] hover:bg-[#0052E0] text-white text-[13px] transition-colors"
              >
                Talk to Advisor
              </button>
              <button className="w-full px-4 py-2.5 rounded border border-white/[0.08] hover:bg-[#2A2A2A] text-white text-[13px] transition-colors">
                View Full Report
              </button>
              <button className="w-full px-4 py-2.5 rounded border border-white/[0.08] hover:bg-[#2A2A2A] text-white text-[13px] transition-colors">
                Download Analysis
              </button>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A] flex items-center justify-between">
              <div className="text-white text-[13px]">Smart Alerts</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-[#2A2A2A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-[#005BFF]"></div>
              </label>
            </div>
            <div className="p-3">
              <div className="h-16 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={alertsActivity}>
                    <Bar dataKey="count" fill="#005BFF" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#6B7280]">Rate changes</span>
                  <span className="text-[#18A36F]">Active</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#6B7280]">Value updates</span>
                  <span className="text-[#18A36F]">Active</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Insurance alerts</span>
                  <span className="text-[#18A36F]">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A]">
              <div className="text-white text-[13px]">Performance</div>
            </div>
            <div className="p-3">
              <div className="h-16 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <Bar dataKey="roi" fill="#18A36F" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Current ROI</span>
                  <span className="text-[#18A36F]">+8.2%</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Market Avg</span>
                  <span className="text-[#6B7280]">+5.8%</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Outperformance</span>
                  <span className="text-[#18A36F]">+2.4%</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#18A36F] h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[#6B7280]">Performance Score</span>
                    <span className="text-white">82/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equity Breakdown */}
          <div className="bg-[#1A1A1A] rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0A]">
              <div className="text-white text-[13px]">Equity Position</div>
            </div>
            <div className="p-3">
              <div className="text-center mb-3">
                <div className="text-white text-[28px] leading-none mb-1">$428,000</div>
                <div className="text-[#18A36F] text-[12px]">41.6% LTV • +6.2% QoQ</div>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Total Value</span>
                  <span className="text-white">$1,028,000</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6B7280]">Outstanding</span>
                  <span className="text-white">$600,000</span>
                </div>
                <div className="flex items-center justify-between py-1 pt-2 border-t border-white/[0.04]">
                  <span className="text-[#6B7280]">Available Equity</span>
                  <span className="text-[#18A36F]">$428,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}