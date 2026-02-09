import { DashboardCard } from '../DashboardCard';
import { FileText, Users, MapPin, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect,useState} from 'react'
import { GetReports } from '../../components/apicalls/ApiCalls';
const leadsPerHour = [
  { hour: '12am', leads: 12 },
  { hour: '3am', leads: 8 },
  { hour: '6am', leads: 15 },
  { hour: '9am', leads: 45 },
  { hour: '12pm', leads: 67 },
  { hour: '3pm', leads: 54 },
  { hour: '6pm', leads: 72 },
  { hour: '9pm', leads: 38 },
];

const reportsByState = [
  { state: 'CA', reports: 1247 },
  { state: 'TX', reports: 892 },
  { state: 'FL', reports: 756 },
  { state: 'NY', reports: 634 },
  { state: 'OH', reports: 523 },
  { state: 'PA', reports: 445 },
];

const revenueByVertical = [
  { name: 'Refinance', value: 45230, color: '#3b82f6' },
  { name: 'Insurance', value: 28450, color: '#10b981' },
  { name: 'Seller Leads', value: 62180, color: '#f59e0b' },
  { name: 'ZIP Sales', value: 18900, color: '#8b5cf6' },
];

const topZips = [
  { zip: '90210', city: 'Beverly Hills, CA', leads: 342, value: '$28,450' },
  { zip: '10001', city: 'New York, NY', leads: 289, value: '$24,120' },
  { zip: '33139', city: 'Miami Beach, FL', leads: 267, value: '$22,340' },
  { zip: '60611', city: 'Chicago, IL', leads: 234, value: '$19,560' },
  { zip: '94102', city: 'San Francisco, CA', leads: 198, value: '$16,530' },
];




export function Dashboard() {
  
  const [Reports,setReports] = useState([])

  const [PrevDayReports,setPrevDayReports] = useState([])
  const [TodaysReports,setTodaysReports] = useState([])

  useEffect(() => {


  const GetReport = async()=>{
    const response = await GetReports()
   setReports(response)
  }

  GetReport()

 
}, [])

useEffect(()=>{
  
  const date = new Date().toLocaleDateString('en-In',{month:'long',day:'numeric',year:'numeric'})

const prevDate = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString('en-In',{month:'long',day:'numeric',year:'numeric'})


const TodaysReports =Array.isArray(Reports) &&  Reports?.filter((report)=>report.created_at===date)
const yesterdaysReports =Array.isArray(Reports) && Reports?.filter((report)=>report.created_at===prevDate)

setTodaysReports(TodaysReports)
setPrevDayReports(yesterdaysReports)
},[Reports])





  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Command & Control Center</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Real-time overview of your lead generation empire</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6 mb-8">
        <DashboardCard
          title="Reports Generated Today"
          value={TodaysReports?.length}
          change={`${TodaysReports?.length-PrevDayReports?.length} vs yesterday`}
          trend={`${TodaysReports?.length-PrevDayReports?.length>=0?'up':'down'}`}
          icon={<FileText size={24} />}
        />
        <DashboardCard
          title="Total Reports Generated"
          value={Reports?.length}
          change=""
          trend="up"
          icon={<Users size={24} />}
        />
        <DashboardCard
          title="High-Intent Leads"
          value="-"
          change="- vs yesterday"
          trend="up"
          icon={<TrendingUp size={24} />}
        />
        <DashboardCard
          title="Revenue Today"
          value="-"
          change="- vs yesterday"
          trend="up"
          icon={<DollarSign size={24} />}
        />
        <DashboardCard
          title="ZIPs Sold"
          value="-"
          change="- new this week"
          trend="up"
          icon={<MapPin size={24} />}
        />
        <DashboardCard
          title="Active Lead Buyers"
          value="-"
          change="- pending approval"
          trend="neutral"
          icon={<Users size={24} />}
        />
      </div>

      {/* Alerts Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex items-start gap-3 md:gap-4">
          <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg mb-2">Revenue Opportunities</h3>
            <div className="space-y-2">
              <div className="bg-white rounded p-3">
                <p className="text-xs md:text-sm"><span className="text-orange-600">🔥 HOT:</span> You generated <span>241 high-equity leads</span> this week — SELL ZIP 43204! Estimated value: <span>$18,500</span></p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="text-xs md:text-sm"><span className="text-blue-600">💰 SELLERS:</span> ZIP 90210 has <span>4 potential sellers</span> — assign an agent now!</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="text-xs md:text-sm"><span className="text-green-600">✅ PARTNER:</span> Refi partner available: <span>$78 CPL</span> in CA with 95% acceptance rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg mb-3 md:mb-4">Leads Per Hour (Today)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={leadsPerHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="leads" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg mb-3 md:mb-4">Reports By State (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reportsByState}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="reports" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg mb-3 md:mb-4">Revenue By Vertical (This Month)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueByVertical}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByVertical.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {revenueByVertical.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 truncate">{item.name}</p>
                  <p className="text-xs md:text-sm">${item.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg mb-3 md:mb-4">Top Performing ZIP Codes</h3>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle px-4 md:px-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 md:py-3 px-1 md:px-2 text-xs md:text-sm text-gray-600">ZIP</th>
                    <th className="text-left py-2 md:py-3 px-1 md:px-2 text-xs md:text-sm text-gray-600">City</th>
                    <th className="text-right py-2 md:py-3 px-1 md:px-2 text-xs md:text-sm text-gray-600">Leads</th>
                    <th className="text-right py-2 md:py-3 px-1 md:px-2 text-xs md:text-sm text-gray-600">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {topZips.map((zip) => (
                    <tr key={zip.zip} className="border-b hover:bg-gray-50">
                      <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base">{zip.zip}</td>
                      <td className="py-2 md:py-3 px-1 md:px-2 text-xs md:text-sm text-gray-600">{zip.city}</td>
                      <td className="py-2 md:py-3 px-1 md:px-2 text-right text-sm md:text-base">{zip.leads}</td>
                      <td className="py-2 md:py-3 px-1 md:px-2 text-right text-green-600 text-sm md:text-base">{zip.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Heat Map */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h3 className="text-base md:text-lg mb-3 md:mb-4">USA Heat Map - Lead Generation Activity</h3>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 md:p-12 text-center">
          <MapPin size={40} className="mx-auto mb-3 md:mb-4 text-blue-600" />
          <p className="text-sm md:text-base text-gray-600 mb-2">Interactive USA map showing lead density by ZIP code</p>
          <p className="text-xs md:text-sm text-gray-500">Darker shades indicate higher activity • Click ZIP for details</p>
          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 md:w-8 h-3 md:h-4 bg-blue-200 rounded"></div>
              <span className="text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 md:w-8 h-3 md:h-4 bg-blue-400 rounded"></div>
              <span className="text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 md:w-8 h-3 md:h-4 bg-blue-600 rounded"></div>
              <span className="text-gray-600">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 md:w-8 h-3 md:h-4 bg-blue-800 rounded"></div>
              <span className="text-gray-600">Very High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
