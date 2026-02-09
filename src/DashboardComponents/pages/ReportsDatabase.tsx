import { useState,useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GetReports } from '../../components/apicalls/ApiCalls';

const mockReports = [
  {
    id: 'RPT-2024-001247',
    address: '123 Beverly Hills Dr',
    zip: '90210',
    state: 'CA',
    aiValue: '$2,450,000',
    equity: '$980,000',
    loanBalance: '$1,470,000',
    refiSavings: '$420/mo',
    insuranceOverpay: '$185/mo',
    marketTrend: 'up',
    intentScore: 'Seller',
    created: '2024-11-28 09:34 AM',
    leadStatus: 'Attached',
    monetization: 'Redfin Agent',
  },
  {
    id: 'RPT-2024-001246',
    address: '456 Park Avenue',
    zip: '10001',
    state: 'NY',
    aiValue: '$1,850,000',
    equity: '$650,000',
    loanBalance: '$1,200,000',
    refiSavings: '$315/mo',
    insuranceOverpay: '$0',
    marketTrend: 'up',
    intentScore: 'Refi',
    created: '2024-11-28 09:22 AM',
    leadStatus: 'Attached',
    monetization: 'Rocket Mortgage',
  },
  {
    id: 'RPT-2024-001245',
    address: '789 Ocean Drive',
    zip: '33139',
    state: 'FL',
    aiValue: '$1,250,000',
    equity: '$320,000',
    loanBalance: '$930,000',
    refiSavings: '$0',
    insuranceOverpay: '$295/mo',
    marketTrend: 'flat',
    intentScore: 'Insurance',
    created: '2024-11-28 09:15 AM',
    leadStatus: 'Attached',
    monetization: 'Hippo Insurance',
  },
  {
    id: 'RPT-2024-001244',
    address: '234 Michigan Ave',
    zip: '60611',
    state: 'IL',
    aiValue: '$890,000',
    equity: '$245,000',
    loanBalance: '$645,000',
    refiSavings: '$220/mo',
    insuranceOverpay: '$125/mo',
    marketTrend: 'up',
    intentScore: 'Seller',
    created: '2024-11-28 08:58 AM',
    leadStatus: 'Not Attached',
    monetization: '',
  },
  {
    id: 'RPT-2024-001243',
    address: '567 Main Street',
    zip: '94102',
    state: 'CA',
    aiValue: '$1,650,000',
    equity: '$780,000',
    loanBalance: '$870,000',
    refiSavings: '$0',
    insuranceOverpay: '$0',
    marketTrend: 'down',
    intentScore: 'Seller',
    created: '2024-11-28 08:45 AM',
    leadStatus: 'Not Attached',
    monetization: '',
  },
  {
    id: 'RPT-2024-001242',
    address: '890 Sunset Blvd',
    zip: '90028',
    state: 'CA',
    aiValue: '$1,120,000',
    equity: '$420,000',
    loanBalance: '$700,000',
    refiSavings: '$285/mo',
    insuranceOverpay: '$165/mo',
    marketTrend: 'up',
    intentScore: 'Refi',
    created: '2024-11-28 08:32 AM',
    leadStatus: 'Attached',
    monetization: 'Better.com',
  },
];

export function ReportsDatabase() {

   const [Reports,setReports] = useState([])
  useEffect(() => {


  const GetReport = async()=>{
    const response = await GetReports()
  //  console.log(response)
   setReports(response)
  }

  GetReport()


 
}, [])


  const [searchTerm, setSearchTerm] = useState('');
  const [filterIntent, setFilterIntent] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.zip.includes(searchTerm) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = filterIntent === 'all' || report.intentScore === filterIntent;
    return matchesSearch && matchesIntent;
  });

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-green-600" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-600" />;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Reports Database</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Every AI home valuation report ever generated</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by address, ZIP, or Report ID..."
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full pl-10 pr-8 py-2.5 md:py-3 border border-gray-300 rounded-lg appearance-none bg-white text-sm md:text-base"
                value={filterIntent}
                onChange={(e) => setFilterIntent(e.target.value)}
              >
                <option value="all">All Intent Types</option>
                <option value="Seller">Seller Leads</option>
                <option value="Refi">Refinance Leads</option>
                <option value="Insurance">Insurance Leads</option>
              </select>
            </div>
            
            <button className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 text-sm md:text-base">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Report ID</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Address</th>
                {/* <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">ZIP</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">State</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">AI Value</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Equity</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Refi Savings</th>
                <th className="text-right py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Insurance</th>
                <th className="text-center py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Trend</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Intent</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Created</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Status</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Monetization</th> */}
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">User IP</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">User City</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">User region</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">User Country</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">User Postal</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Generated</th>
                <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">Created At</th>


              </tr>
            </thead>
            <tbody>
              {Reports.sort((a,b)=>b.createdAt.seconds - a.createdAt.seconds)?.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                    <Link to={`/reports/${report.id}`} className="text-blue-600 hover:underline">
                      {report.id}
                    </Link>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{report.address}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{typeof(report?.ipAddress)==='object'?report?.ipAddress.ip:report?.ipAddress}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{report?.ipAddress?.city}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{report?.ipAddress?.region}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{report?.ipAddress?.country}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{report?.ipAddress?.postal}</td>
               
                
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${
                      report.generated ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {report.generated === true?'true':'false'}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">{new Date(report.createdAt.seconds * 1000).toLocaleDateString('en-In',{month:'long',day:'numeric',year:'numeric'}) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* <div className="border-t px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-gray-600">
            Showing {filteredReports.length} of {mockReports.length} reports
          </p>
          <div className="flex gap-1 md:gap-2">
            <button className="px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs md:text-sm">Previous</button>
            <button className="px-2 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs md:text-sm">1</button>
            <button className="px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs md:text-sm">2</button>
            <button className="px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs md:text-sm">3</button>
            <button className="px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs md:text-sm">Next</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
