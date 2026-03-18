import React, { useEffect, useState } from 'react';
import { Card, StatCard, Button, Badge } from '../../../components/ui/Components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { properties } from './mockData';
import { toast } from 'sonner';
import { FetchPortfolioSavedUserReports, FetchSavedUserReports } from '../../apicalls/ApiCalls';
import { useSelector } from 'react-redux';
import doodle1 from '../../../assets/doodle1.png'
import doodle2 from '../../../assets/doodle2.png'
import doodle3 from '../../../assets/doodle3.png'
import doodle4 from '../../../assets/doodle4.png'

// const data = [
//   { name: 'Jan', value: 4000 },
//   { name: 'Feb', value: 3000 },
//   { name: 'Mar', value: 5000 },
//   { name: 'Apr', value: 4500 },
//   { name: 'May', value: 6000 },
//   { name: 'Jun', value: 5500 },
//   { name: 'Jul', value: 7000 },
// ];



export function Dashboard() {
const UserDetails = useSelector((state) => state.UserDetails);
const [total,settotal] = useState('')

const [reports,setreports] = useState([])

   const fetchReports = async() => {
    try {
      const reports =await FetchPortfolioSavedUserReports(UserDetails.uid)
     
     const total = reports.reduce((sum, house) => sum + house.houseValue, 0);

       settotal(total)

       setreports(reports)
      
    } catch (error) {
      console.log(error)
      toast.error('failed to fetch reports')
    }
  }

  useEffect(()=>{
    fetchReports()
  },[])



  function calculatePortfolioGrowth(reports, years) {
  const totals = [];
  let startyear = new Date().getFullYear()

  for (let year = 0; year <= years; year++) {
    let total = 0;

    for (const property of reports) {
      const futureValue =
        property.houseValue *
        Math.pow(1 + property.growthRate/100, year);

      total += futureValue;
    }

    totals.push({
      name:startyear,value:Number(total.toFixed(2))});
      startyear++;
  }

  return totals;
}


const [data,setData]= useState([]);
useEffect(()=>{
  const values = calculatePortfolioGrowth(reports, 5);
  setData(values)

},[reports])

const doodleCards = [
  {
    image:doodle1,
    title:'Insurance Premium Too High',
    desc:'3 competitors offer lower premium by $1,020/year',
    cta:'Switch Now',
    wid:60
  },
  {
    image:doodle2,
    title:'3 Refinance Paths Found',
    desc:'2.85% from ING, save $186/mo on Property A',
    cta:'Compare Rates',
    wid:60

  },
  {
    image:doodle3,
    title:'PEX Scorecard: 84/100',
    desc:'Risk exposure: Low. Interest fit: High. Insurance: Overpriced.',
    cta:'Full AI Report',
    wid:60


  },
  {
    image:doodle4,
    title:'Your Property Gained 4.8% This Quarter',
    desc:'Smart sell window in 6-9 months',
    cta:'Run Sell Animation',
    wid:40


  }
]


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Portfolio Control Center</h1>
        <p className="text-[#5B616E] mt-1">Track property value, equity capacity, and strategy scenarios in one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Portfolio Value" 
          value={`$ ${total.toLocaleString('en-us')}`}
          trend="+12.5%" 
          trendDirection="up" 
          subtext="vs. last quarter"
        />
        <StatCard 
          label="Total Unlockable Equity" 
           value={`$ ${Number(total*0.6).toLocaleString('en-us')}`}
          trend="+5.2%" 
          trendDirection="up" 
          subtext="Available for reinvestment"
        />
        <StatCard 
          label="Modeled Return Range" 
          value="8.2% - 12.4%" 
          trend="Stable" 
          trendDirection="neutral" 
          subtext="Based on current allocation"
        />
        <StatCard 
          label="Risk Profile Score" 
          value="Low-Medium" 
          trend="Optimal" 
          trendDirection="up" 
          subtext="Diversified exposure"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[#111111]">Portfolio Value Trend</h3>
              <div className="flex gap-2">
                <Badge variant="neutral">1Y</Badge>
                <Badge variant="neutral">3Y</Badge>
                <Badge variant="neutral">All</Badge>
              </div>
            </div>
            <div className="h-64 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={1}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EC" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111111', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#111111" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#111111]">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Valuation Update', desc: '1240 Waverley St increased by 2.4%', time: '2 hrs ago', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
                { title: 'Document Required', desc: 'Tax assessment for 88 King St pending review', time: '5 hrs ago', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
                { title: 'Report Generated', desc: 'Q1 Portfolio Analysis ready for download', time: '1 day ago', icon: CheckCircle2, color: 'text-blue-600 bg-blue-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#111111]">{item.title}</h4>
                    <p className="text-xs text-[#5B616E] mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-xs text-[#9CA3AF]">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-[#111111] mb-4">Unlockable Equity</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#5B616E]">Safe Limit (60% LTV)</span>
                <span className="font-medium">$ {Number(total*0.6).toLocaleString('en-us')}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#111111] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-[#5B616E]">Aggressive (75% LTV)</span>
                <span className="font-medium">${Number(total*0.75).toLocaleString('en-us')}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>

              <div className="pt-4 border-t border-[#E6E8EC]">
                <p className="text-xs text-[#5B616E] mb-3">
                  Unlock up to $2.4M to reinvest in high-yield opportunities without triggering tax events.
                </p>
                <Button variant="outline" className="w-full justify-between">
                  Explore Scenarios <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#111111] text-white border-none h-fit">
            <h3 className="font-semibold mb-2">Advisor Connect</h3>
            <p className="text-sm text-gray-400 mb-4">
              Schedule a call with a specialized tax strategist to review your Q1 projections.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111111] bg-gray-600 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Advisor" /> 
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-400">3 Advisors available</span>
            </div>
            <Button className="w-full bg-white text-[#111111] hover:bg-gray-100">
              Find Advisor
            </Button>
          </Card>
        </div>

       
      </div>
       <div className='flex items-center w-full gap-4'>
          {
            doodleCards.map((doodle,i)=>{
              return(
                <Card key={i} className='p-6 w-full flex items-center justify-between flex-col gap-1 h-[300px]'>
                  <img src={doodle.image} alt="" style={{width:`${doodle.wid}%`}}/>
           <div className='flex flex-col items-center justify-center'>
             <h3 className="font-bold text-[14px] text-center">{doodle.title}</h3>
            <p className='text-[14px] text-center'>{doodle.desc}</p>
           </div>

  <Button className="w-full bg-white text-[#111111] hover:bg-black hover:text-white border border-black/30 mt-2">
              {doodle.cta}
            </Button>
                
                </Card>
              )
            })
          }
        </div>
    </div>
  );
}
