import React,{useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, MapPin, Share2, MoreHorizontal, FileText, Star, CheckCircle, Timer, AlertCircle, Badge, Download, Shield, Eye, Camera, Users, Building2, ThermometerSun, AlertTriangle, Droplets, Zap, BarChart3, PhoneCall, Mail, Car, Layers, Ruler, BadgeDollarSign, Sparkles, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { ValuationPanel } from '../../../components/panels/ValuationPanel';
import { EquityPanel } from '../../../components/panels/EquityPanel';
import { StrategyPanel } from '../../../components/panels/StrategyPanel';
import { TaxPanel } from '../../../components/panels/TaxPanel';
import { DocumentsPanel } from '../../../components/panels/DocumentsPanel';
import { IncomePanel } from '../../../components/panels/IncomePanel';
import {TabsContent} from '../../../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';

const listingOverviewMock = {
  title: "Turnkey Multifamily | $3.6m CapEx | High NOI",
  subtitle: "132 Unit Apartments",
  address: "1404 Moore Ave",
  location: "Portland, TX 78374",
  listingId: 33476673,
  summary:
    "Lux Seaside Apartments offers a stabilized multifamily investment on the shores of Nueces Bay in Portland, Texas. The 132-unit garden-style community has recent capital improvements, high occupancy, and multiple value-add paths through amenity, parking, and rent growth.",
  image: "https://images1.loopnet.com/i2/IXNFbqAKw0xyBcErBoswL2phlp1-6nwGcu2yyFwK9jI/116/image.jpg",
  media: [
    { type: "image", caption: "Lux Seaside Apartments", url: "https://images1.loopnet.com/i2/IXNFbqAKw0xyBcErBoswL2phlp1-6nwGcu2yyFwK9jI/116/image.jpg" },
    { type: "image", caption: "Fenced Outdoor Pool", url: "https://images1.loopnet.com/i2/5sQ7cI9PbpwPh7mQ8qim8qfMcSP1SOhcToNjAhSPsGU/116/image.jpg" },
    { type: "matterport", caption: "2BR, 1BA - 880SF Virtual Matterport Tour", url: "https://my.matterport.com/show/?m=QADMk8NW4Ck" },
    { type: "video", caption: "Lux Seaside Apartments Video Tour", url: "https://vapi.loopnet.com/video/play/E7CRDP40Af2?source=180" },
  ],
  highlights: [
    "132 units at 98% occupancy with high going-in NOI and growth potential.",
    "Over $3.6M in capital improvements with renovated interiors and community amenities.",
    "Located within 10 minutes of national retailers, parks, highways, large employers, and North Beach.",
    "Rent growth is estimated to exceed 3.6% during 2025.",
    "Value-add opportunity through reserved and covered parking charges.",
  ],
  facts: {
    "Property Type": "Multi-Family",
    "Subtype": "Apartments",
    "Style": "Garden",
    "Units": "132",
    "Occupancy": "96%",
    "Building Size": "110,000 SF",
    "Land Area": "5.85 AC",
    "Stories": "2",
    "Class": "B",
    "Year Built": "1971",
    "Parking": "299 spaces",
    "Parking Ratio": "2.7/1,000 SF",
    "Sale Type": "Investment",
    "Year One NOI": "$1.001M",
    "Construction Status": "Existing",
    "Last Updated": "4/3/2025",
    "Created At": "2025-02-20",
  },
  amenities: [
    { label: "Unit Amenities", items: ["Air Conditioning", "Balcony", "Dishwasher", "Heating", "Range", "Refrigerator", "Walk-In Closets"] },
    { label: "Site Amenities", items: ["Courtyard", "Laundry Facilities", "Pet Play Area", "Pool", "Walking/Biking Trails"] },
  ],
  unitMix: [
    { type: "1+", units: "62", size: "620 - 725 SF" },
    { type: "2+", units: "31", size: "737 - 880 SF" },
    { type: "2+", units: "8", size: "916 SF" },
    { type: "3+", units: "31", size: "880 SF" },
  ],
  transportation: [{ type: "Airport", name: "Corpus Christi International", distance: "16.4 mi", drive: "24 min" }],
  broker: {
    name: "Nolan Mainguy",
    company: "CBRE",
    location: "Houston, TX",
    phone: "832-453-7326",
    email: "nolan.mainguy@cbre.com",
  },
};

const compactValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "" || value === "-") return null;
  return String(value);
};

const compactEntries = (entries: Record<string, string | number | null | undefined>) =>
  Object.entries(entries)
    .map(([label, value]) => ({ label, value: compactValue(value) }))
    .filter((item) => item.value);

const uniqueItems = (items: string[]) => Array.from(new Set(items.filter(Boolean)));


export default function PropertyDetail({onBack}) {
  const { id } = useParams();

  const properties = [
    {
      id: 1,
      address: 'Hoofdstraat 45',
      city: 'Amsterdam',
      district: 'Centrum',
      type: 'Apartment',
      building: 'Building A',
      value: '€485,000',
      valueChange: '+8.2%',
      rent: '€1,850',
      yield: '4.6%',
      mortgage: '€320,000',
      rate: '2.8%',
      ltv: 66,
      maturityDate: '2029-03-15',
      maturityCountdown: '5 years 2 months',
      insuranceProvider: 'Nationale Nederlanden',
      insuranceRenewal: '2024-12-31',
      insuranceCountdown: '11 months',
      tenant: 'J. van der Berg',
      leaseExpiry: '2024-12-31',
      leaseCountdown: '11 months',
      status: 'occupied',
      arrearsRisk: 'low',
      confidence: 87,
      aiRecommendation: 'hold',
      aiInsight: 'Strong rental yield in growing area',
      purchaseDate: '2022-03-15',
      purchasePrice: '€440,000',
      squareMeters: 85,
      bedrooms: 2,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      monthlyPayment: '€1,420',
      insuranceCost: '€85',
      utilityCost: '€125',
      netCashflow: '€220'
    },
    {
      id: 2,
      address: 'Keizersgracht 123',
      city: 'Amsterdam',
      district: 'Centrum',
      type: 'Canal House',
      building: 'Building B',
      value: '€1,200,000',
      valueChange: '+12.5%',
      rent: '€3,200',
      yield: '3.2%',
      mortgage: '€850,000',
      rate: '3.4%',
      ltv: 71,
      maturityDate: '2032-06-20',
      maturityCountdown: '8 years 5 months',
      insuranceProvider: 'Allianz',
      insuranceRenewal: '2024-06-30',
      insuranceCountdown: '5 months',
      tenant: 'M. Johnson',
      leaseExpiry: '2025-06-30',
      leaseCountdown: '1 year 5 months',
      status: 'occupied',
      arrearsRisk: 'low',
      confidence: 92,
      aiRecommendation: 'refinance',
      aiInsight: 'Refi savings €890/month available',
      purchaseDate: '2021-06-20',
      purchasePrice: '€1,050,000',
      squareMeters: 145,
      bedrooms: 4,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
      monthlyPayment: '€3,680',
      insuranceCost: '€220',
      utilityCost: '€285',
      netCashflow: '-€985'
    },
    {
      id: 3,
      address: 'Vondelpark 88',
      city: 'Amsterdam',
      district: 'Zuid',
      type: 'Studio',
      building: 'Building C',
      value: '€320,000',
      valueChange: '+5.1%',
      rent: '€1,400',
      yield: '5.3%',
      mortgage: '€210,000',
      rate: '2.9%',
      ltv: 66,
      maturityDate: '2030-08-15',
      maturityCountdown: '6 years 7 months',
      insuranceProvider: 'ING',
      insuranceRenewal: '2024-08-15',
      insuranceCountdown: '7 months',
      tenant: null,
      leaseExpiry: null,
      leaseCountdown: 'Vacant',
      status: 'vacant',
      arrearsRisk: 'none',
      confidence: 78,
      aiRecommendation: 'sell',
      aiInsight: 'Market peak detected for this area',
      purchaseDate: '2020-08-15',
      purchasePrice: '€285,000',
      squareMeters: 45,
      bedrooms: 1,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      monthlyPayment: '€890',
      insuranceCost: '€65',
      utilityCost: '€165',
      netCashflow: '€280'
    },
    {
      id: 4,
      address: 'Prinsengracht 67',
      city: 'Amsterdam',
      district: 'Centrum',
      type: 'Apartment',
      building: 'Building A',
      value: '€650,000',
      valueChange: '+6.8%',
      rent: '€2,400',
      yield: '4.4%',
      mortgage: '€420,000',
      rate: '3.1%',
      ltv: 65,
      maturityDate: '2031-12-01',
      maturityCountdown: '7 years 11 months',
      insuranceProvider: 'Nationale Nederlanden',
      insuranceRenewal: '2024-12-01',
      insuranceCountdown: '10 months',
      tenant: 'S. Anderson',
      leaseExpiry: '2025-01-31',
      leaseCountdown: '1 year',
      status: 'occupied',
      arrearsRisk: 'medium',
      confidence: 83,
      aiRecommendation: 'hold',
      aiInsight: 'Consider minor renovations for higher rent',
      purchaseDate: '2021-12-01',
      purchasePrice: '€590,000',
      squareMeters: 95,
      bedrooms: 3,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400',
      monthlyPayment: '€1,820',
      insuranceCost: '€125',
      utilityCost: '€145',
      netCashflow: '€310'
    },
    {
      id: 5,
      address: 'Herengracht 89',
      city: 'Amsterdam',
      district: 'Centrum',
      type: 'Canal House',
      building: 'Building D',
      value: '€1,850,000',
      valueChange: '+15.2%',
      rent: '€4,200',
      yield: '2.7%',
      mortgage: '€1,320,000',
      rate: '3.8%',
      ltv: 71,
      maturityDate: '2033-05-15',
      maturityCountdown: '9 years 4 months',
      insuranceProvider: 'Allianz',
      insuranceRenewal: '2024-05-15',
      insuranceCountdown: '4 months',
      tenant: 'T. Williams',
      leaseExpiry: '2025-05-15',
      leaseCountdown: '1 year 4 months',
      status: 'occupied',
      arrearsRisk: 'low',
      confidence: 89,
      aiRecommendation: 'refinance',
      aiInsight: 'Consider bundling insurance for savings',
      purchaseDate: '2023-05-15',
      purchasePrice: '€1,650,000',
      squareMeters: 220,
      bedrooms: 5,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      monthlyPayment: '€5,480',
      insuranceCost: '€385',
      utilityCost: '€320',
      netCashflow: '-€1,985'
    },
    {
      id: 6,
      address: 'Damrak 34',
      city: 'Amsterdam',
      district: 'Centrum',
      type: 'Commercial',
      building: 'Building E',
      value: '€890,000',
      valueChange: '+3.4%',
      rent: '€3,800',
      yield: '5.1%',
      mortgage: '€580,000',
      rate: '3.5%',
      ltv: 65,
      maturityDate: '2028-09-30',
      maturityCountdown: '4 years 8 months',
      insuranceProvider: 'ING',
      insuranceRenewal: '2024-09-30',
      insuranceCountdown: '8 months',
      tenant: 'Retail Corp B.V.',
      leaseExpiry: '2026-09-30',
      leaseCountdown: '2 years 8 months',
      status: 'occupied',
      arrearsRisk: 'high',
      confidence: 75,
      aiRecommendation: 'hold',
      aiInsight: 'Monitor tenant payment closely',
      purchaseDate: '2018-09-30',
      purchasePrice: '€820,000',
      squareMeters: 180,
      bedrooms: 0,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      monthlyPayment: '€2,850',
      insuranceCost: '€185',
      utilityCost: '€265',
      netCashflow: '€500'
    }
  ];
 const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

          const property = properties?.[0]
          const listing = listingOverviewMock;
          const overviewFacts = compactEntries(listing.facts);
          const visibleHighlights = uniqueItems(listing.highlights);
          const unitAmenityCount = listing.amenities.reduce((total, group) => total + group.items.length, 0);


            

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Link onClick={onBack}  className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>
        
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111111]">{listing.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{listing.address}, {listing.location}</span>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium ml-2">Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-9 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
            <button className="h-9 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors shadow-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate PDF
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="overview" className="space-y-6">
        <Tabs.List className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
          {[
            { value: 'overview', label: 'Overview' },
            { value: 'finance', label: 'Finance' },
            { value: 'tenant-lease', label: 'Tenant Lease' },
            { value: 'utilities', label: 'Utilities' },
            { value: 'documents', label: 'Documents' },
            { value: 'issues', label: 'Issues' }
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-black border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="overview" className="space-y-6 outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.85fr)] gap-6">
            <Card className="overflow-hidden bg-white border-gray-200 shadow-sm">
              <div className="relative h-[320px] bg-black">
                <img src={listing.image} alt={listing.title} className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">{listing.subtitle}</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Stabilized Asset</span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">Value Add</span>
                  </div>
                  <h2 className="max-w-3xl text-2xl font-bold text-white">{listing.title}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
                    <MapPin className="h-4 w-4" />
                    {listing.address}, {listing.location}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm leading-6 text-gray-700">{listing.summary}</p>
              </CardContent>
            </Card>

            <Card className="bg-black text-white border-black shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">Investment Snapshot</p>
                  <h3 className="mt-2 text-xl font-semibold">High-occupancy multifamily with clear operating levers.</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Units", value: listing.facts.Units, icon: Building2 },
                    { label: "Occupancy", value: listing.facts.Occupancy, icon: CheckCircle },
                    { label: "NOI", value: listing.facts["Year One NOI"], icon: BadgeDollarSign },
                    { label: "Land", value: listing.facts["Land Area"], icon: Ruler },
                  ].map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <Icon className="mb-3 h-4 w-4 text-green-300" />
                        <p className="text-xs text-white/50">{metric.label}</p>
                        <p className="mt-1 text-lg font-semibold">{metric.value}</p>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-100">
                  Review Investment Case
                </button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-5">
                <CardTitle className="text-lg font-semibold">Key Highlights</CardTitle>
                <CardDescription>Deduplicated highlights from the listing response.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {visibleHighlights.map((highlight) => (
                    <div key={highlight} className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                      <p className="text-sm leading-5 text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-5">
                <CardTitle className="text-lg font-semibold">Broker Contact</CardTitle>
                <CardDescription>Primary contact from the response.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{listing.broker.name}</p>
                  <p className="text-sm text-gray-500">{listing.broker.company} - {listing.broker.location}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <PhoneCall className="h-4 w-4 text-gray-400" />
                    {listing.broker.phone}
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {listing.broker.email}
                  </div>
                </div>
                <button className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-900">
                  Contact Broker
                </button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-5">
              <CardTitle className="text-lg font-semibold">Property Facts</CardTitle>
              <CardDescription>Only populated fields are shown, so empty response values stay hidden.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {overviewFacts.map((fact) => (
                  <div key={fact.label} className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{fact.label}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-950">{fact.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2 bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-5">
                <CardTitle className="text-lg font-semibold">Unit Mix</CardTitle>
                <CardDescription>Mocked from unitMixInfo and ready to replace with API data.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Unit Type</th>
                        <th className="px-6 py-3 font-semibold">Units</th>
                        <th className="px-6 py-3 font-semibold">Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {listing.unitMix.map((unit, index) => (
                        <tr key={`${unit.type}-${unit.units}-${index}`}>
                          <td className="px-6 py-4 font-medium text-gray-900">{unit.type}</td>
                          <td className="px-6 py-4 text-gray-700">{unit.units}</td>
                          <td className="px-6 py-4 text-gray-700">{unit.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-5">
                <CardTitle className="text-lg font-semibold">Media & Access</CardTitle>
                <CardDescription>{listing.media.length} available media assets.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {listing.media.slice(0, 3).map((item) => (
                    <div key={item.caption} className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      <img src={item.type === "image" ? item.url : listing.image} alt={item.caption} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <div className="flex items-center gap-3">
                      <Camera className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Photos, video, and virtual tours</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{listing.media.length}</span>
                  </div>
                  {listing.transportation.map((stop) => (
                    <div key={stop.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                      <div className="flex items-center gap-3">
                        <Car className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{stop.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{stop.drive}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-5">
              <CardTitle className="text-lg font-semibold">Amenities</CardTitle>
              <CardDescription>{unitAmenityCount} amenities grouped by category.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.amenities.map((group) => (
                <div key={group.label} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">{group.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uniqueItems(group.items).map((item) => (
                      <span key={item} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Tabs.Content>

      
                    <Tabs.Content value="finance" className="space-y-4">
                      {/* Mortgage Details */}
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Mortgage Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Outstanding</p>
                              <p className="font-bold text-xl">{property.mortgage}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Interest Rate</p>
                              <p className="font-bold text-xl">{property.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Monthly Payment</p>
                              <p className="font-bold text-xl">{property.monthlyPayment}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Maturity</p>
                              <p className="font-medium">{property.maturityCountdown}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Amortization Schedule (Next 12 months)</h4>
                            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                              <BarChart3 className="h-8 w-8 text-gray-400" />
                              <span className="ml-2 text-sm text-gray-600">Payment breakdown chart</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Rate Sensitivity Analysis</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="bg-red-50 p-3 rounded-lg text-center">
                                <p className="text-red-700">+1% Rate</p>
                                <p className="font-bold text-red-600">+€180/month</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <p className="text-gray-700">Current</p>
                                <p className="font-bold">{property.monthlyPayment}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg text-center">
                                <p className="text-green-700">-1% Rate</p>
                                <p className="font-bold text-green-600">-€165/month</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cashflow Analysis */}
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Cashflow Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-green-600 mb-2">Income</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Monthly Rent</span>
                                    <span className="font-medium">{property.rent}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-red-600 mb-2">Expenses</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Mortgage</span>
                                    <span className="font-medium">{property.monthlyPayment}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Insurance</span>
                                    <span className="font-medium">€{property.insuranceCost}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Utilities</span>
                                    <span className="font-medium">€{property.utilityCost}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center">
                                <span className="font-bold">Net Cashflow</span>
                                <span className={`font-bold text-lg ${
                                  property.netCashflow.startsWith('-') ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {property.netCashflow}/month
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Tabs.Content>

                    <Tabs.Content value="tenant-lease" className="space-y-4">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Tenant Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {property.tenant ? (
                            <div className="space-y-6">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarFallback className="text-lg">
                                    {property.tenant.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-bold text-lg">{property.tenant}</h4>
                                  <p className="text-gray-600">Current Tenant</p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <Button className='border-gray-200' size="sm" variant="outline">
                                      <PhoneCall className="mr-2 h-4 w-4" />
                                      Call
                                    </Button>
                                    <Button className='border-gray-200' size="sm" variant="outline">
                                      <Mail className="mr-2 h-4 w-4" />
                                      Email
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Lease Start</p>
                                  <p className="font-medium">Jan 1, 2024</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Lease End</p>
                                  <p className="font-medium">{property.leaseExpiry}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Monthly Rent</p>
                                  <p className="font-medium">{property.rent}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Deposit</p>
                                  <p className="font-medium">€3,700</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Payment History (Last 12 months)</h4>
                                <div className="grid grid-cols-6 gap-2">
                                  {Array.from({length: 12}, (_, i) => (
                                    <div key={i} className="bg-green-100 p-2 rounded text-center">
                                      <div className="text-xs text-green-800">
                                        {new Date(2024, i, 1).toLocaleDateString('en', {month: 'short'})}
                                      </div>
                                      <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between mt-3 text-sm">
                                  <span className="text-green-600">100% on-time payments</span>
                                  <span className="text-gray-600">No arrears</span>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Lease Documents</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <FileText className="h-5 w-5 text-gray-400" />
                                      <div>
                                        <p className="font-medium">Lease Agreement</p>
                                        <p className="text-sm text-gray-600">PDF • 1.8 MB</p>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-gray-400" />
                              </div>
                              <h3 className="font-medium text-gray-900 mb-2">Property is Vacant</h3>
                              <p className="text-gray-500 mb-4">No current tenant assigned to this property</p>
                              <Button className="bg-black hover:bg-gray-900">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Tenant
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Tabs.Content>

                    <Tabs.Content value="utilities" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                              Electricity
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="font-bold text-xl">€85</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">vs Portfolio Avg</p>
                                <p className="text-sm text-green-600">-12% (€96)</p>
                              </div>
                              <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-600">Usage trend chart</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Droplets className="mr-2 h-5 w-5 text-gray-600" />
                              Water
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="font-bold text-xl">€25</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">vs Portfolio Avg</p>
                                <p className="text-sm text-green-600">Normal (€24)</p>
                              </div>
                              <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-600">Usage trend chart</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <ThermometerSun className="mr-2 h-5 w-5 text-orange-500" />
                              Gas/Heating
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="font-bold text-xl">€15</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">vs Portfolio Avg</p>
                                <p className="text-sm text-red-600">+25% (€12)</p>
                              </div>
                              <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-600">Usage trend chart</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                            Utility Anomalies
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-red-200 border">
                              <div className="flex items-center space-x-3">
                                <ThermometerSun className="h-5 w-5 text-red-500" />
                                <div>
                                  <p className="font-medium text-red-800">Gas usage spike detected</p>
                                  <p className="text-sm text-red-600">25% above normal for January</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                Investigate
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Tabs.Content>

                    <Tabs.Content value="documents" className="space-y-4">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Property Documents</CardTitle>
                          <CardDescription>All documents related to this property</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <Building2 className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                                <p className="font-medium">Mortgage</p>
                                <p className="text-sm text-gray-600">3 files</p>
                              </div>
                              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="font-medium">Insurance</p>
                                <p className="text-sm text-gray-600">2 files</p>
                              </div>
                              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                <p className="font-medium">Lease</p>
                                <p className="text-sm text-gray-600">4 files</p>
                              </div>
                              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <Camera className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                <p className="font-medium">Photos</p>
                                <p className="text-sm text-gray-600">24 files</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-medium">Recent Documents</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                    <div>
                                      <p className="font-medium">Purchase Agreement</p>
                                      <p className="text-sm text-gray-600">PDF • 2.4 MB • Uploaded 2 years ago</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Shield className="h-5 w-5 text-green-400" />
                                    <div>
                                      <p className="font-medium">Insurance Policy</p>
                                      <p className="text-sm text-gray-600">PDF • 890 KB • Expires {property.insuranceRenewal}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
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
                          </div>
                        </CardContent>
                      </Card>
                    </Tabs.Content>

                    <Tabs.Content value="issues" className="space-y-4">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Open Service Tickets</CardTitle>
                          <CardDescription>Active maintenance requests and issues</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div>
                                  <h4 className="font-medium">Heating not working</h4>
                                  <p className="text-sm text-gray-600">Reported by tenant • High Priority</p>
                                  <p className="text-xs text-gray-500">Created: Jan 15, 2024 • SLA: 24 hours</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-red-100 text-red-800 mb-2">Open</Badge>
                                <p className="text-sm text-gray-600">Assigned to:</p>
                                <p className="font-medium">TechFix B.V.</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              <div className="text-center p-4 bg-red-50 rounded-lg">
                                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                <p className="font-bold text-red-600">1</p>
                                <p className="text-sm text-gray-600">Open Tickets</p>
                              </div>
                              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <Timer className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                <p className="font-bold text-yellow-600">0</p>
                                <p className="text-sm text-gray-600">In Progress</p>
                              </div>
                              <div className="text-center p-4 bg-green-50 rounded-lg">
                                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="font-bold text-green-600">8</p>
                                <p className="text-sm text-gray-600">Resolved (YTD)</p>
                              </div>
                            </div>

                            <div>
                              <div className="mb-3 flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-950">Vendor Network</h4>
                                  <p className="text-sm text-gray-500">Preferred providers matched to this property's open issues.</p>
                                </div>
                                <Button variant="outline" size="sm" className="border-gray-200">
                                  View All
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  {
                                    name: 'TechFix B.V.',
                                    trade: 'Heating & HVAC',
                                    rating: '4.8',
                                    reviews: '126',
                                    response: '2 hr response',
                                    availability: 'Available today',
                                    license: 'Licensed and insured',
                                  },
                                  {
                                    name: 'PlumbPro',
                                    trade: 'Plumbing',
                                    rating: '4.6',
                                    reviews: '94',
                                    response: 'Same-day dispatch',
                                    availability: 'Available tomorrow',
                                    license: 'Verified vendor',
                                  },
                                ].map((vendor) => (
                                  <div key={vendor.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                                          {vendor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                          <p className="font-semibold text-gray-950">{vendor.name}</p>
                                          <p className="text-sm text-gray-500">{vendor.trade}</p>
                                        </div>
                                      </div>
                                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                                        Preferred
                                      </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                      <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-xs text-gray-500">Rating</p>
                                        <div className="mt-1 flex items-center gap-1">
                                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                          <span className="font-semibold text-gray-950">{vendor.rating}</span>
                                          <span className="text-xs text-gray-400">({vendor.reviews})</span>
                                        </div>
                                      </div>
                                      <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-xs text-gray-500">Availability</p>
                                        <p className="mt-1 font-semibold text-gray-950">{vendor.availability}</p>
                                      </div>
                                    </div>

                                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-sm text-gray-600">
                                      <div className="flex items-center justify-between">
                                        <span>{vendor.license}</span>
                                        <span className="font-medium text-gray-900">{vendor.response}</span>
                                      </div>
                                    </div>

                                    <Button className="mt-4 w-full">
                                      <PhoneCall className="h-4 w-4" />
                                      Connect Now
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Tabs.Content>

      </Tabs.Root>
    </div>
  );
}
