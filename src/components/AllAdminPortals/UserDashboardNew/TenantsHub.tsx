import React,{useState} from 'react'
import { Badge, Button, Card } from '../../ui/Components';
import {
  BarChart3,
  Building2,
  Calculator,
  Shield,
  Zap,
  Users,
  FileText,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Home,
  DollarSign,
  Settings,
  Bell,
  Calendar,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Globe,
  Languages,
  CreditCard,
  Link,
  Percent,
  Share,
  Tag,
  Target,
  MessageSquare,
  PhoneCall,
  Mail,
  Camera,
  Clipboard,
  PieChart,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  Banknote,
  Receipt,
  FolderOpen,
  Folder,
  Archive,
  Send,
  UserCheck,
  UserX,
  Wrench,
  Timer,
  TrendingDown,
  Hammer,
  Droplets,
  Power,
  Volume2,
  ThermometerSun,
  ShieldCheck,
  PlayCircle,
  PauseCircle,
  CheckSquare,
  XCircle,
  MoreHorizontal,
  Activity,
  LayoutGrid,
  List,
  Upload,
  ArrowUpDown,
  SlidersHorizontal,
  Map,
  Maximize2,

  Gauge,
  Thermometer,
  Lightbulb,
  Wifi,
  Layers,
  FileImage,
  ArrowUp,
  ArrowLeftRight,
  ArrowDown,
  Minus,
  Sliders,
  RefreshCw,

  Bookmark,

  ChevronDown,
  ToggleLeft,
  ToggleRight,
  CircleCheck,
  CircleX,
  Clock3,
  Sparkles,
  Zap2
} from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';


const TenantsHub = () => {

    const tenants = [
    {
      id: 1,
      name: 'J. van der Berg',
      email: 'j.vandenberg@email.com',
      phone: '+31 6 1234 5678',
      property: 'Hoofdstraat 45',
      building: 'Building A',
      unit: 'Unit 2B',
      rent: '€1,850',
      deposit: '€3,700',
      status: 'active',
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      leaseType: 'fixed',
      autoRenewal: true,
      arrears: 0,
      arrearsRisk: 'low',
      paymentHistory: 12,
      onTimePayments: 12,
      lastPayment: '2024-01-15',
      nextRent: '2024-02-01',
      paymentMethod: 'bank_transfer',
      satisfaction: 8.5,
      communicationScore: 9.2,
      maintenanceRequests: 2,
      avgResponseTime: '4 hours',
      renewalProbability: 89,
      creditScore: 'A+',
      employmentStatus: 'Employed',
      monthlyIncome: '€4,200',
      notes: 'Excellent tenant, always pays on time',
      emergencyContact: 'M. van der Berg (+31 6 5555 1234)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      id: 2,
      name: 'M. Johnson',
      email: 'm.johnson@email.com',
      phone: '+31 6 9876 5432',
      property: 'Keizersgracht 123',
      building: 'Building B',
      unit: 'Unit 1A',
      rent: '€3,200',
      deposit: '€6,400',
      status: 'active',
      leaseStart: '2023-07-01',
      leaseEnd: '2025-06-30',
      leaseType: 'fixed',
      autoRenewal: false,
      arrears: 0,
      arrearsRisk: 'low',
      paymentHistory: 18,
      onTimePayments: 17,
      lastPayment: '2024-01-14',
      nextRent: '2024-02-01',
      paymentMethod: 'auto_debit',
      satisfaction: 7.8,
      communicationScore: 8.5,
      maintenanceRequests: 1,
      avgResponseTime: '2 hours',
      renewalProbability: 65,
      creditScore: 'A',
      employmentStatus: 'Self-employed',
      monthlyIncome: '€5,800',
      notes: 'Good tenant, occasional late payment',
      emergencyContact: 'S. Johnson (+31 6 7777 8888)',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 3,
      name: 'S. Anderson',
      email: 's.anderson@email.com',
      phone: '+31 6 1111 2222',
      property: 'Prinsengracht 67',
      building: 'Building A',
      unit: 'Unit 3C',
      rent: '€2,400',
      deposit: '€4,800',
      status: 'active',
      leaseStart: '2023-02-01',
      leaseEnd: '2025-01-31',
      leaseType: 'fixed',
      autoRenewal: true,
      arrears: 360,
      arrearsRisk: 'medium',
      paymentHistory: 23,
      onTimePayments: 21,
      lastPayment: '2023-12-28',
      nextRent: '2024-02-01',
      paymentMethod: 'bank_transfer',
      satisfaction: 6.5,
      communicationScore: 7.0,
      maintenanceRequests: 4,
      avgResponseTime: '1 day',
      renewalProbability: 45,
      creditScore: 'B+',
      employmentStatus: 'Employed',
      monthlyIncome: '€3,100',
      notes: 'Recent payment delays, monitor closely',
      emergencyContact: 'T. Anderson (+31 6 3333 4444)',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    {
      id: 4,
      name: 'T. Williams',
      email: 't.williams@email.com',
      phone: '+31 6 5555 6666',
      property: 'Herengracht 89',
      building: 'Building D',
      unit: 'Unit 1',
      rent: '€4,200',
      deposit: '€8,400',
      status: 'active',
      leaseStart: '2023-05-15',
      leaseEnd: '2025-05-15',
      leaseType: 'fixed',
      autoRenewal: false,
      arrears: 0,
      arrearsRisk: 'low',
      paymentHistory: 8,
      onTimePayments: 8,
      lastPayment: '2024-01-15',
      nextRent: '2024-02-15',
      paymentMethod: 'auto_debit',
      satisfaction: 9.1,
      communicationScore: 9.5,
      maintenanceRequests: 0,
      avgResponseTime: 'N/A',
      renewalProbability: 25,
      creditScore: 'A+',
      employmentStatus: 'Executive',
      monthlyIncome: '€8,500',
      notes: 'Premium tenant, likely to move after lease expires',
      emergencyContact: 'R. Williams (+31 6 9999 0000)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 5,
      name: 'Retail Corp B.V.',
      email: 'contact@retailcorp.nl',
      phone: '+31 20 1234 567',
      property: 'Damrak 34',
      building: 'Building E',
      unit: 'Ground Floor',
      rent: '€3,800',
      deposit: '€11,400',
      status: 'active',
      leaseStart: '2022-10-01',
      leaseEnd: '2026-09-30',
      leaseType: 'commercial',
      autoRenewal: true,
      arrears: 1140,
      arrearsRisk: 'high',
      paymentHistory: 16,
      onTimePayments: 13,
      lastPayment: '2023-12-20',
      nextRent: '2024-02-01',
      paymentMethod: 'bank_transfer',
      satisfaction: 5.5,
      communicationScore: 6.0,
      maintenanceRequests: 3,
      avgResponseTime: '3 days',
      renewalProbability: 70,
      creditScore: 'B',
      employmentStatus: 'Business',
      monthlyIncome: '€15,000',
      notes: 'Commercial tenant, payment issues during COVID',
      emergencyContact: 'Legal Dept (+31 20 9999 888)',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150'
    },
    {
      id: 6,
      name: 'L. Zhang',
      email: 'l.zhang@email.com',
      phone: '+31 6 7777 3333',
      property: 'Vondelpark 88',
      building: 'Building C',
      unit: 'Studio 1',
      rent: '€1,400',
      deposit: '€2,800',
      status: 'pending',
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      leaseType: 'fixed',
      autoRenewal: false,
      arrears: 0,
      arrearsRisk: 'unknown',
      paymentHistory: 0,
      onTimePayments: 0,
      lastPayment: null,
      nextRent: '2024-03-01',
      paymentMethod: 'bank_transfer',
      satisfaction: null,
      communicationScore: 8.0,
      maintenanceRequests: 0,
      avgResponseTime: 'N/A',
      renewalProbability: null,
      creditScore: 'A-',
      employmentStatus: 'Student',
      monthlyIncome: '€2,200',
      notes: 'New tenant, starts March 1st',
      emergencyContact: 'Y. Zhang (+86 138 0013 8000)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    }
  ];

   const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [tenantViewMode, setTenantViewMode] = useState<'building' | 'unit' | 'date' | 'rent'>('unit');
  const [tenantSearchQuery, setTenantSearchQuery] = useState('');
  const [tenantFilters, setTenantFilters] = useState({
    status: 'all',
    building: 'all',
    arrears: 'all',
    leaseExpiry: 'all'
  });
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState<'occupancy' | 'arrears'>('occupancy');
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
  const [activeTenantTab, setActiveTenantTab] = useState('profile');


  return (
     !selectedTenant ? (<div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-3xl font-bold">Tenant Hub</h2>
                    <Badge className="bg-purple-100 text-purple-800">Smart Management</Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Tenants
                    </Button>
                    <Button className="bg-[green] hover:bg-[green]">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Tenant
                    </Button>
                  </div>
                </div>

                {/* Enhanced Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Users className="h-8 w-8 text-[#0285FF]" />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs rounded px-2 py-1">
                            Based on signed leases
                          </div>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Total Tenants</h3>
                      <p className="text-4xl font-bold mb-2">{tenants.length}</p>
                      <p className="text-sm text-blue-600">Across {Array.from(new Set(tenants.map(t => t.building))).length} buildings</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <UserCheck className="h-8 w-8 text-green-600" />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs rounded px-2 py-1">
                            Occupancy rate calculation
                          </div>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Occupancy Rate</h3>
                      <p className="text-4xl font-bold mb-2 text-green-600">94.2%</p>
                      <p className="text-sm text-green-600">{tenants.filter(t => t.status === 'active').length} of {tenants.length + 1} units</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs rounded px-2 py-1">
                            Total outstanding amounts
                          </div>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Total Arrears</h3>
                      <p className="text-4xl font-bold mb-2 text-red-600">€{tenants.reduce((sum, t) => sum + t.arrears, 0).toLocaleString()}</p>
                      <p className="text-sm text-red-600">{tenants.filter(t => t.arrears > 0).length} tenants affected</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="h-8 w-8 text-yellow-600" />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs rounded px-2 py-1">
                            Expiring in next 6 months
                          </div>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Expiring Leases</h3>
                      <p className="text-4xl font-bold mb-2 text-yellow-600">2</p>
                      <p className="text-sm text-yellow-600">Renewal decisions needed</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-[#000] to-[#000000] text-white border-0 shadow-xl rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Brain className="h-8 w-8 text-[#ffd400]" />
                        <div className="text-right">
                          <p className="text-xs text-[#ffd400]">AI-powered insights</p>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-blue-100 mb-2">LIAM Score</h3>
                      <p className="text-4xl font-bold mb-2">8.2/10</p>
                      <p className="text-sm text-blue-100">Portfolio health excellent</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Search, Filters, and View Controls */}
                <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Search and Main Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input 
                              placeholder="Search tenants by name, property, email..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
                              value={tenantSearchQuery}
                              onChange={(e) => setTenantSearchQuery(e.target.value)}
                            />
                          </div>
                          <select 
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                            value={tenantViewMode}
                            onChange={(e) => setTenantViewMode(e.target.value as any)}
                          >
                            <option value="unit">View by Unit</option>
                            <option value="building">View by Building</option>
                            <option value="date">View by Date</option>
                            <option value="rent">View by Rent Due</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button 
                            variant={showChart ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowChart(!showChart)}
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Charts
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Filters:</span>
                        <div className="flex items-center space-x-2">
                          <select
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
                            value={tenantFilters.status}
                            onChange={(e) => setTenantFilters({...tenantFilters, status: e.target.value})}
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="expired">Expired</option>
                          </select>
                          
                          <select 
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
                            value={tenantFilters.building}
                            onChange={(e) => setTenantFilters({...tenantFilters, building: e.target.value})}
                          >
                            <option value="all">All Buildings</option>
                            <option value="building-a">Building A</option>
                            <option value="building-b">Building B</option>
                            <option value="building-c">Building C</option>
                            <option value="building-d">Building D</option>
                            <option value="building-e">Building E</option>
                          </select>
                          
                          <select 
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
                            value={tenantFilters.arrears}
                            onChange={(e) => setTenantFilters({...tenantFilters, arrears: e.target.value})}
                          >
                            <option value="all">All Payment Status</option>
                            <option value="current">Current</option>
                            <option value="overdue">Overdue</option>
                          </select>

                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chart Toggle Section */}
                {showChart && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5 text-[#0285FF]" />
                            Occupancy Trendline
                          </span>
                          <Button 
                            variant={chartType === 'occupancy' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setChartType('occupancy')}
                          >
                            12 Months
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <TrendingUp className="h-12 w-12 text-[#0285FF] mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Occupancy trending upward</p>
                            <p className="text-xs text-gray-500 mt-1">94.2% average over 12 months</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <PieChart className="mr-2 h-5 w-5 text-red-600" />
                            Arrears vs Collected
                          </span>
                          <Button 
                            variant={chartType === 'arrears' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setChartType('arrears')}
                          >
                            Current
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 bg-gradient-to-r from-red-50 to-green-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <PieChart className="h-12 w-12 text-red-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">97.8% collection rate</p>
                            <p className="text-xs text-gray-500 mt-1">€1,500 of €68,850 in arrears</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Bulk Actions Bar */}
                {selectedTenants.length > 0 && (
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{selectedTenants.length} tenants selected</span>
                          <Button size="sm" variant="outline">
                            <Send className="mr-2 h-4 w-4" />
                            Bulk Email
                          </Button>
                          <Button size="sm" variant="outline">
                            <Receipt className="mr-2 h-4 w-4" />
                            Rent Reminder
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Inspection
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Export Data
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setSelectedTenants([])}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Enhanced Tenant List */}
                <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-r from-gray-50 to-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className='font-medium text-md'>Tenant Directory</span>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          {tenants.filter(t => t.status === 'active').length} Active
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {tenants.filter(t => t.status === 'pending').length} Pending
                        </Badge>
                        <Badge className="bg-red-100 text-red-800">
                          {tenants.filter(t => t.arrears > 0).length} Arrears
                        </Badge>
                      </div>
                    </CardTitle>
                    <CardDescription className='mb-2'>
                      Comprehensive tenant relationship management with AI insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tenants.map((tenant) => (
                        <div 
                          key={tenant.id} 
                          className="flex items-center justify-between p-6  rounded-xl border  border-black/10 hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => setSelectedTenant(tenant.id.toString())}
                        >
                          <div className="flex items-center space-x-6">
                            {/* Selection Checkbox */}
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={selectedTenants.includes(tenant.id.toString())}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (e.target.checked) {
                                  setSelectedTenants([...selectedTenants, tenant.id.toString()]);
                                } else {
                                  setSelectedTenants(selectedTenants.filter(id => id !== tenant.id.toString()));
                                }
                              }}
                            />
                            
                            {/* Avatar and Basic Info */}
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={tenant.avatar} />
                                <AvatarFallback className="text-lg font-medium">
                                  {tenant.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-bold text-lg">{tenant.name}</h4>
                                <p className="text-gray-600">{tenant.property} • {tenant.unit}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-sm text-gray-500">Lease: {tenant.leaseEnd}</span>
                                  <Badge className={`text-xs ${
                                    tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                                    tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {tenant.status}
                                  </Badge>
                                  {tenant.arrears > 0 && (
                                    <Badge className="bg-red-100 text-red-800 text-xs">
                                      €{tenant.arrears} arrears
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Tenant Metrics */}
                          <div className="flex items-center space-x-8">
                            {/* Payment Info */}
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Monthly Rent</p>
                              <p className="font-bold text-lg">{tenant.rent}</p>
                              <div className="flex items-center justify-center mt-1">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  tenant.arrears === 0 ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                                <span className="text-xs text-gray-500">
                                  {tenant.arrears === 0 ? 'Current' : 'Overdue'}
                                </span>
                              </div>
                            </div>

                            {/* AI Score */}
                            <div className="text-center">
                              <p className="text-sm text-gray-600">LIAM Score</p>
                              <div className="flex items-center justify-center">
                                <div className="w-12 h-12 relative">
                                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="3"
                                    />
                                    <path
                                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                      fill="none"
                                      stroke="#0285FF"
                                      strokeWidth="3"
                                      strokeDasharray={`${tenant.satisfaction * 10}, 100`}
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold">{tenant.satisfaction}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {tenant.renewalProbability}% renewal
                              </p>
                            </div>

                            {/* Payment History */}
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Payment Record</p>
                              <p className="font-bold">
                                {tenant.onTimePayments}/{tenant.paymentHistory}
                              </p>
                              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{width: `${(tenant.onTimePayments / tenant.paymentHistory) * 100}%`}}
                                />
                              </div>
                            </div>

                            {/* Contact Actions */}
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                <PhoneCall className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg rounded-xl hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Send className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-bold text-blue-900 mb-2">Rent Reminders</h3>
                      <p className="text-sm text-blue-700">Send automated reminders</p>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm">
                        Send Now
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg rounded-xl hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-bold text-green-900 mb-2">Lease Renewals</h3>
                      <p className="text-sm text-green-700">Manage upcoming renewals</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700" size="sm">
                        Review
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg rounded-xl hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-bold text-purple-900 mb-2">
                        LIAM<span className="text-[#0285FF]">AI</span> Insights
                      </h3>
                      <p className="text-sm text-purple-700">Smart tenant analytics</p>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700" size="sm">
                        View Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg rounded-xl hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="font-bold text-orange-900 mb-2">Risk Alerts</h3>
                      <p className="text-sm text-orange-700">Monitor payment risks</p>
                      <Button className="mt-4 bg-orange-600 hover:bg-orange-700" size="sm">
                        Check Alerts
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>):
              (
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedTenant(null)}
                    >
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      Back to Tenant Hub
                    </Button>
                    <h2 className="text-3xl font-bold">
                      {tenants.find(t => t.id.toString() === selectedTenant)?.name}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>

                {(() => {
                  const tenant = tenants.find(t => t.id.toString() === selectedTenant);
                  if (!tenant) return null;
                  
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Panel - Tenant Profile */}
                      <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg rounded-xl">
                          <CardContent className="p-6">
                            <div className="text-center mb-6">
                              <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarImage src={tenant.avatar} />
                                <AvatarFallback className="text-2xl">
                                  {tenant.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-bold">{tenant.name}</h3>
                              <p className="text-gray-600">{tenant.property}</p>
                              <div className="flex items-center justify-center space-x-2 mt-2">
                                <Badge className={`${
                                  tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                                  tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {tenant.status}
                                </Badge>
                                <Badge className={`${
                                  tenant.arrearsRisk === 'low' ? 'bg-green-100 text-green-800' :
                                  tenant.arrearsRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  tenant.arrearsRisk === 'high' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {tenant.arrearsRisk || 'Unknown'} Risk
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Contact</span>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <PhoneCall className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Phone:</span>
                                  <span className="font-medium">{tenant.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Email:</span>
                                  <span className="font-medium">{tenant.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Unit:</span>
                                  <span className="font-medium">{tenant.unit}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Building:</span>
                                  <span className="font-medium">{tenant.building}</span>
                                </div>
                              </div>

                              <Separator />

                              <div className="space-y-3">
                                <h4 className="font-medium">LIAM AI Score</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Overall Rating</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-20 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-[#0285FF] h-2 rounded-full" 
                                        style={{width: `${(tenant.satisfaction / 10) * 100}%`}}
                                      />
                                    </div>
                                    <span className="text-sm font-medium">{tenant.satisfaction}/10</span>
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Score:</span>
                                    <span className="font-medium">{((tenant.onTimePayments / tenant.paymentHistory) * 10).toFixed(1)}/10</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Communication:</span>
                                    <span className="font-medium">{tenant.communicationScore}/10</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Renewal Likelihood:</span>
                                    <span className="font-medium">{tenant.renewalProbability}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Panel - Detailed Information */}
                      <div className="lg:col-span-2">
                        <Tabs value={activeTenantTab} onValueChange={setActiveTenantTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="payments">Payments</TabsTrigger>
                            <TabsTrigger value="lease">Lease</TabsTrigger>
                            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                          </TabsList>

                          <TabsContent value="profile" className="space-y-4">
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Credit Score</p>
                                    <p className="font-bold text-lg">{tenant.creditScore}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Employment</p>
                                    <p className="font-medium">{tenant.employmentStatus}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Monthly Income</p>
                                    <p className="font-bold">{tenant.monthlyIncome}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Emergency Contact</p>
                                    <p className="font-medium text-sm">{tenant.emergencyContact}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Notes</p>
                                  <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm">{tenant.notes}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="payments" className="space-y-4">
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                  <span>Payment Information</span>
                                  {tenant.arrears > 0 && (
                                    <Badge className="bg-red-100 text-red-800">
                                      €{tenant.arrears} Outstanding
                                    </Badge>
                                  )}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Monthly Rent</p>
                                    <p className="font-bold text-xl">{tenant.rent}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Security Deposit</p>
                                    <p className="font-medium">{tenant.deposit}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="font-medium">{tenant.paymentMethod.replace('_', ' ')}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Next Due</p>
                                    <p className="font-medium">{tenant.nextRent}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-3">Payment History</h4>
                                  <div className="grid grid-cols-6 gap-2">
                                    {Array.from({length: 12}, (_, i) => (
                                      <div key={i} className={`p-2 rounded text-center ${
                                        i < tenant.onTimePayments ? 'bg-green-100' : 
                                        i < tenant.paymentHistory ? 'bg-red-100' : 'bg-gray-100'
                                      }`}>
                                        <div className={`text-xs ${
                                          i < tenant.onTimePayments ? 'text-green-800' : 
                                          i < tenant.paymentHistory ? 'text-red-800' : 'text-gray-500'
                                        }`}>
                                          {new Date(2024, -i, 1).toLocaleDateString('en', {month: 'short'})}
                                        </div>
                                        <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                                          i < tenant.onTimePayments ? 'bg-green-500' : 
                                          i < tenant.paymentHistory ? 'bg-red-500' : 'bg-gray-300'
                                        }`}></div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between mt-3 text-sm">
                                    <span className="text-green-600">
                                      {Math.round((tenant.onTimePayments / tenant.paymentHistory) * 100)}% on-time payments
                                    </span>
                                    <span className="text-gray-600">
                                      {tenant.paymentHistory} total payments
                                    </span>
                                  </div>
                                </div>

                                {tenant.arrears > 0 && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h4 className="font-medium text-red-800 mb-2">Outstanding Balance</h4>
                                    <p className="text-red-700">€{tenant.arrears} overdue</p>
                                    <div className="flex space-x-2 mt-3">
                                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                        Send Reminder
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        Payment Plan
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="lease" className="space-y-4">
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle>Lease Agreement</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Lease Start</p>
                                    <p className="font-medium">{tenant.leaseStart}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Lease End</p>
                                    <p className="font-medium">{tenant.leaseEnd}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Lease Type</p>
                                    <p className="font-medium">{tenant.leaseType}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Auto-Renewal</p>
                                    <Badge className={tenant.autoRenewal ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                      {tenant.autoRenewal ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                    <Brain className="mr-2 h-4 w-4" />
                                    LIAM<span className="text-[#0285FF]">AI</span> Renewal Prediction
                                  </h4>
                                  <p className="text-blue-700">
                                    {tenant.renewalProbability}% likelihood of renewal based on payment history, 
                                    communication patterns, and market conditions.
                                  </p>
                                  {tenant.renewalProbability < 50 && (
                                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                                      Create Retention Plan
                                    </Button>
                                  )}
                                </div>

                                <div>
                                  <h4 className="font-medium mb-3">Lease Documents</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                        <div>
                                          <p className="font-medium">Original Lease Agreement</p>
                                          <p className="text-sm text-gray-600">PDF • 2.1 MB</p>
                                        </div>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="maintenance" className="space-y-4">
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle>Maintenance & Service</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Requests</p>
                                    <p className="text-2xl font-bold">{tenant.maintenanceRequests}</p>
                                  </div>
                                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">Avg Response</p>
                                    <p className="text-2xl font-bold text-blue-600">{tenant.avgResponseTime}</p>
                                  </div>
                                  <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700">Satisfaction</p>
                                    <p className="text-2xl font-bold text-green-600">{tenant.satisfaction}/10</p>
                                  </div>
                                </div>

                                {tenant.maintenanceRequests === 0 ? (
                                  <div className="text-center py-8">
                                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                    <p className="text-gray-600">No maintenance requests</p>
                                    <p className="text-sm text-gray-500">This tenant has not submitted any service requests</p>
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    <h4 className="font-medium">Recent Service History</h4>
                                    <div className="space-y-2">
                                      <div className="p-3 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="font-medium">Kitchen faucet repair</p>
                                            <p className="text-sm text-gray-600">Submitted: Jan 10 • Completed: Jan 11</p>
                                          </div>
                                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="documents" className="space-y-4">
                            <Card className="border-0 shadow-sm">
                              <CardHeader>
                                <CardTitle>Document Library</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                    <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                    <p className="font-medium">Lease</p>
                                    <p className="text-sm text-gray-600">1 file</p>
                                  </div>
                                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                    <CreditCard className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                    <p className="font-medium">ID Documents</p>
                                    <p className="text-sm text-gray-600">2 files</p>
                                  </div>
                                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                    <Receipt className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                    <p className="font-medium">Receipts</p>
                                    <p className="text-sm text-gray-600">{tenant.paymentHistory} files</p>
                                  </div>
                                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                    <Camera className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                    <p className="font-medium">Photos</p>
                                    <p className="text-sm text-gray-600">5 files</p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <FileText className="h-5 w-5 text-gray-400" />
                                      <div>
                                        <p className="font-medium">Lease Agreement - {tenant.leaseStart}</p>
                                        <p className="text-sm text-gray-600">PDF • 2.1 MB</p>
                                      </div>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  );
                })()}
              </div>
              )
  )
}

export default TenantsHub