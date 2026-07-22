import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Activity, BarChart2, ShieldCheck, DollarSign, MapPin, BookOpen, Info } from 'lucide-react';

const MOMENTUM_DATA = [
  { name: 'Jan', value: 3200 },
  { name: 'Feb', value: 3300 },
  { name: 'Mar', value: 3250 },
  { name: 'Apr', value: 3400 },
  { name: 'May', value: 3500 },
  { name: 'Jun', value: 3450 },
  { name: 'Jul', value: 3600 },
];

export const ValuationPanel = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ValuationCard
          title="Market Value Range"
          value="$3.2M - $3.6M"
          trend="+5.2% vs last year"
          positive
          icon={<DollarSign className="w-4 h-4 text-gray-400" />}
        >
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <LineChart data={MOMENTUM_DATA}>
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ValuationCard>

        <ValuationCard
          title="Confidence Score"
          value="94%"
          trend="Based on 12 comps"
          positive
          icon={<ShieldCheck className="w-4 h-4 text-green-600" />}
        >
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </ValuationCard>

        <ValuationCard
          title="Comparable Sales"
          value="Strong Match"
          trend="Within 0.5 miles"
          neutral
          icon={<BarChart2 className="w-4 h-4 text-gray-400" />}
        >
          <div className="flex gap-1 mt-4 h-2">
             {[1,2,3,4,5].map(i => (
               <div key={i} className={`flex-1 rounded-sm ${i <= 4 ? 'bg-blue-500' : 'bg-gray-200'}`} />
             ))}
          </div>
        </ValuationCard>

        <ValuationCard
          title="Market Momentum"
          value="High Demand"
          trend="Active market"
          positive
          icon={<Activity className="w-4 h-4 text-amber-500" />}
        >
           <div className="flex items-center gap-2 mt-4">
             <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-100">Hot Market</span>
             <span className="text-xs text-gray-500">DOM: 14 days</span>
           </div>
        </ValuationCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Valuation History & Forecast</CardTitle>
                <p className="text-sm text-gray-500">Historical performance vs local market index</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 transition-colors">1Y</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded-md transition-colors shadow-sm">5Y</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 transition-colors">ALL</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
                <LineChart data={MOMENTUM_DATA}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    cursor={{stroke: '#E5E7EB', strokeWidth: 1}}
                  />
                  <Line type="monotone" dataKey="value" stroke="#111111" strokeWidth={2} dot={{r: 4, fill: '#111111', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6, fill: '#111111'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value Drivers</CardTitle>
            <p className="text-sm text-gray-500">Key factors impacting valuation</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Location Score', value: '9.2', change: '+0.1', icon: MapPin },
                { label: 'Market Trends', value: '8.5', change: '+2.4%', icon: TrendingUp },
                { label: 'Property Condition', value: 'A-', change: 'Stable', icon: ShieldCheck },
                { label: 'School District', value: '9/10', change: 'Top Tier', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-500 shadow-sm">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.change}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Renovation Opportunity</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">Adding a bathroom could increase value by ~$45k based on recent comps.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function ValuationCard({ title, value, trend, positive, neutral, icon, children }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {icon}
        </div>
        <div className="mb-2">
          <h3 className="text-2xl font-bold tracking-tight text-black mb-1">{value}</h3>
          <div className={`flex items-center gap-1.5 text-xs font-medium ${positive ? 'text-green-600' : neutral ? 'text-gray-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp className="w-3 h-3" /> : neutral ? <Activity className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
