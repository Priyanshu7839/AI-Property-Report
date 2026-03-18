import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from '../../../components/ui/Components';
import { 
  FileText, Download, Plus, Search, 
  BarChart2, PieChart, Calendar, ChevronRight, 
  ArrowUpRight, ArrowDownRight, Printer, Share2, 
  Loader2, Filter, X,
  MapPin
} from 'lucide-react';
// import { reports, type Report } from './mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { FetchSavedUserReports, SaveReportToPortfolio } from '../../apicalls/ApiCalls';
import { useSelector } from 'react-redux';

export function Reports() {
  const [activeReport, setActiveReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
const navigate = useNavigate()
  const handleGenerate = () => {
   navigate('/')
  };
const UserDetails = useSelector((state) => state.UserDetails);

const [reports,setReports] = useState([])

  const fetchReports = async() => {
    try {
      const reports =await FetchSavedUserReports(UserDetails.uid)
     
     
        setReports(reports)
      
    } catch (error) {
      console.log(error)
      toast.error('failed to fetch reports')
    }
  }

  useEffect(()=>{
    fetchReports()
  },[])

  const [savingReport,setSavingReport] = useState(false)

  const SaveToPortfolio = async(reportId) => {
setSavingReport(true)
    try {
      await SaveReportToPortfolio(reportId)
      toast.success('Report Saved To Portfolio')
    } catch (error) {
      console.log(error)
      toast.success('Failed to Save')
    }
    setSavingReport(false)

  }

  

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Reports & Analysis</h1>
          <p className="text-[#5B616E] mt-1">Generate comprehensive insights on portfolio performance, valuation, and tax impact.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="gap-2" onClick={() => setShowGenerateModal(true)}>
            <Plus size={16} /> Generate New Report
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden flex flex-col gap-3">
            <div className="p-4 border-b border-[#E6E8EC] flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-[#111111]">Saved Reports</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input 
                  type="text" 
                  placeholder="Search reports..." 
                  className="pl-9 pr-4 py-1.5 text-sm border border-[#E6E8EC] rounded-md focus:outline-none focus:border-[#111111] w-48 bg-white transition-colors"
                />
              </div>
            </div>
           
          </Card>

           <div className="divide-y divide-[#E6E8EC] flex flex-col gap-2">
              {reports.map((report) => (
                // <div 
                //   key={report.id} 
                //   onClick={() => setActiveReport(report)}
                //   className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer group ${activeReport?.id === report.id ? 'bg-gray-50' : ''}`}
                // >
                //   <div className="flex justify-between items-start mb-2">
                //     <div className="flex items-center gap-3">
                //       {/* <div className={`p-2 rounded-lg ${
                //         report.type === 'Valuation' ? 'bg-emerald-50 text-emerald-600' :
                //         report.type === 'Tax' ? 'bg-amber-50 text-amber-600' :
                //         'bg-blue-50 text-blue-600'
                //       }`}>
                //         {report.type === 'Valuation' && <BarChart2 size={18} />}
                //         {report.type === 'Tax' && <FileText size={18} />}
                //         {report.type === 'Portfolio' && <PieChart size={18} />}
                //       </div> */}
                //       <div>
                //         <h4 className="font-medium text-[#111111] capitalize">{report.address}</h4>
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span> Report ID : {report.id}</span>
                         
                //         </div>
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span> Date Added : </span>
                //                                    <span>{new Date(report?.createdAt.seconds * 1000).toLocaleDateString()}</span>

                          
                //         </div>
                       
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span>Hidden Cash</span>
                //           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                //           <span>$ {report.hiddencash.toLocaleString('en-us')}</span>
                          
                //         </div>$ </span>
                          
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span>House Growth Rate</span>
                //           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                //           <span>{parseFloat(report.growthRate).toFixed(2)}%</span>
                          
                //         </div>
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span>House Value</span>
                //           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                //           <span>$ {report.houseValue.toLocaleString('en-us')}</span>
                          
                //         </div>
                //         <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                //           <span>Total Opportunity</span>
                //           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                //           <span>$ {report.totalOpportunity.toLocaleString('en-us')}</span>
                          
                //         </div>
                          

                //       </div>
                      
                //     </div>
                    
                //     <Badge variant={report.status === 'Ready' ? 'positive' : 'neutral'}>
                //       {report.status}
                //     </Badge>
                //   </div>
                  
                //   <p className="text-sm text-[#5B616E] line-clamp-2 pl-[52px] pr-8 mb-3">
                //     {report.summary}
                //   </p>

                //   {/* <div className="pl-[52px] flex items-center gap-4">
                //     {report.metrics.slice(0, 3).map((metric, idx) => (
                //       <div key={idx} className="flex flex-col">
                //         <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">{metric.label}</span>
                //         <div className="flex items-center gap-1">
                //           <span className="text-sm font-semibold text-[#111111]">{metric.value}</span>
                //           {metric.trend && (
                //             <span className={`text-[10px] ${
                //               metric.trendDirection === 'up' ? 'text-emerald-600' : 
                //               metric.trendDirection === 'down' ? 'text-rose-600' : 
                //               'text-gray-500'
                //             }`}>
                //               {metric.trend}
                //             </span>
                //           )}
                //         </div>
                //       </div>
                //     ))}
                //   </div> */}
                // </div>

                <Card className='w-full p-6 flex flex-col items-start gap-2'>

                <div>
                    <h1 className='flex items-center gap-1 font-semibold capitalize'>
                   <span>
                     <MapPin size={15}/> 
                   </span>

                   {report.address}
                    
                  </h1>
                   <div className="flex items-center gap-2 text-xs text-[#5B616E] mt-0.5">
                         
                                                  <span>{new Date(report?.createdAt.seconds * 1000).toLocaleDateString()}</span>
                  
                       </div>




                </div>

                <div className='flex items-center justify-between gap-2 w-full'>

                  <div className = 'flex flex-col rounded-md border border-black/20 w-full'>

                      <span className='py-2 px-4 border-b border-black/20 flex items-center justify-between'>Property Value <h1 className='font-medium text-green-700'>$ {report.houseValue.toLocaleString('en-us')}</h1></span>
                      <span className='py-2 px-4 flex items-center justify-between'>Growth Rate 

                        <h1 className='font-medium'>{parseFloat(report.growthRate).toFixed(2)}%</h1>
                      </span>

                  </div>
                  <div className = 'flex flex-col rounded-md border border-black/20 w-full'>

                      <span className='py-2 px-4 border-b border-black/20 flex items-center justify-between'>Hidden Cash
                        <h1 className='font-medium text-green-700'>$ {report.hiddencash.toLocaleString('en-us')}</h1>
                      
                      </span>
                      <span className='py-2 px-4 flex items-center justify-between'>Total Oppurtunity
                        <h1 className='font-medium'>$ {report.totalOpportunity.toLocaleString('en-us')}</h1>


                      </span>

                  </div>

                </div>


              {
              !report.savedToPortfolio &&
              <div 
                onClick={()=>{
                  SaveToPortfolio(report?.id)
                }}
                className='w-full flex items-center justify-end'>
                      <Button>
                        {
                          savingReport?'Saving...':'Save To Portfolio'
                        }
                        
                      </Button>
                </div>}




                </Card>
              ))}
            </div>
        </div>

        {/* Report Detail Panel */}
        {/* <div className="space-y-6">
          {activeReport ? (
            <Card className="p-6 sticky top-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-[#111111] leading-tight">{activeReport.title}</h3>
                  <p className="text-sm text-[#5B616E] mt-1">Generated by {activeReport.generatedBy}</p>
                </div>
                <button onClick={() => setActiveReport(null)} className="text-gray-400 hover:text-[#111111]">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-[#E6E8EC]">
                  <h4 className="text-xs font-semibold text-[#5B616E] uppercase tracking-wider mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {activeReport.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="text-xs text-[#9CA3AF] mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-[#111111] flex items-center gap-2">
                          {metric.value}
                          {metric.trendDirection && metric.trendDirection !== 'neutral' && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              metric.trendDirection === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {metric.trendDirection === 'up' ? '↑' : '↓'} {metric.trend?.replace(/^[+-]/, '')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#111111]">Visualization</h4>
                  <div className="h-40 w-full border border-[#E6E8EC] rounded-lg p-2 min-w-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={1}>
                      <AreaChart data={[
                        { name: 'Jan', val: 4000 }, { name: 'Feb', val: 3000 },
                        { name: 'Mar', val: 5000 }, { name: 'Apr', val: 4500 },
                        { name: 'May', val: 6000 }, { name: 'Jun', val: 5500 }
                      ]}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#111111" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EC" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="val" stroke="#111111" strokeWidth={2} fill="url(#colorVal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E6E8EC] flex flex-col gap-3">
                  <Button className="w-full justify-center gap-2">
                    <Download size={16} /> Download PDF
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-center gap-2">
                      <Printer size={16} /> Print
                    </Button>
                    <Button variant="outline" className="justify-center gap-2">
                      <Share2 size={16} /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center bg-gray-50 border-dashed border-2 border-[#E6E8EC] h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#9CA3AF] mb-4">
                <FileText size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-[#111111] text-lg">Select a Report</h3>
              <p className="text-[#5B616E] max-w-xs mx-auto mt-2 text-sm">
                Click on any report from the list to view detailed analysis, charts, and export options.
              </p>
            </Card>
          )}
        </div> */}
      </div>

      {/* Generate Report Modal Overlay */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg p-6 m-4 shadow-2xl relative">
            <button 
              onClick={() => setShowGenerateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#111111]"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-[#111111] mb-6">Generate New Report</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">Report Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 border-2 border-[#111111] bg-gray-50 rounded-lg text-sm font-medium text-[#111111]">
                    <PieChart size={20} className="mb-2" />
                    Portfolio Analysis
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 border border-[#E6E8EC] hover:border-gray-300 rounded-lg text-sm font-medium text-[#5B616E] hover:text-[#111111] transition-colors">
                    <BarChart2 size={20} className="mb-2" />
                    Valuation Report
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">Date Range</label>
                <select className="w-full p-2.5 bg-white border border-[#E6E8EC] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6E8EC] focus:border-[#111111]">
                  <option>Last 30 Days</option>
                  <option>Current Quarter (Q1 2026)</option>
                  <option>Last Year (2025)</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">Include Sections</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#5B616E]">
                    <input type="checkbox" checked className="rounded border-gray-300 text-[#111111] focus:ring-[#111111]" readOnly />
                    Executive Summary
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#5B616E]">
                    <input type="checkbox" checked className="rounded border-gray-300 text-[#111111] focus:ring-[#111111]" readOnly />
                    Financial Metrics (Cash-on-Cash, IRR)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#5B616E]">
                    <input type="checkbox" checked className="rounded border-gray-300 text-[#111111] focus:ring-[#111111]" readOnly />
                    Market Comps & Trends
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" className="w-full" onClick={() => setShowGenerateModal(false)}>
                Cancel
              </Button>
              <Button className="w-full bg-[#111111] text-white hover:bg-black" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    Generate Report <ArrowUpRight size={16} />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
