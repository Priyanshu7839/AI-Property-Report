import React, { useMemo, useState } from 'react';
import {
  Award,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Filter,
  Heart,
  Home,
  Landmark,
  MapPin,
  MessageSquare,
  Phone,
  Scale,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trees,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Card, Button, Badge, cn } from '../../../components/ui/Components';

type DirectoryMode = 'professionals' | 'services';

const professionalCategories = [
  { id: 'real-estate', label: 'Real Estate Agent', icon: Home },
  { id: 'mortgage', label: 'Mortgage Advisor', icon: Landmark },
  { id: 'financial', label: 'Financial Advisor', icon: Banknote },
  { id: 'tax', label: 'Tax Advisor', icon: FileText },
  { id: 'insurance', label: 'Insurance Advisor', icon: Shield },
  { id: 'legal', label: 'Legal Advisor', icon: Scale },
  { id: 'manager', label: 'Property Manager', icon: Building2 },
];

const serviceCategories = [
  { id: 'electrician', label: 'Electrician', icon: Zap },
  { id: 'plumber', label: 'Plumber', icon: Wrench },
  { id: 'hvac', label: 'HVAC', icon: Sparkles },
  { id: 'roofing', label: 'Roofing', icon: Home },
  { id: 'landscaping', label: 'Landscaping', icon: Trees },
  { id: 'security', label: 'Security', icon: Shield },
];

const professionals = [
  {
    id: 'pro-1',
    name: 'Sarah Mitchell',
    role: 'Real Estate Agent',
    company: 'Coastal Properties',
    category: 'real-estate',
    initials: 'SM',
    experience: '15 years experience',
    volume: '$250M+ in sales',
    location: 'San Diego, CA',
    distance: '12.4 mi',
    rating: '4.9',
    reviews: '138',
    tag: 'Local Expert',
    verified: true,
  },
  {
    id: 'pro-2',
    name: 'James Carter',
    role: 'Mortgage Advisor',
    company: 'Pacific Lending Group',
    category: 'mortgage',
    initials: 'JC',
    experience: '12 years experience',
    volume: '$350M+ loans closed',
    location: 'San Diego, CA',
    distance: '8.7 mi',
    rating: '4.8',
    reviews: '104',
    tag: 'Top Rated',
    verified: true,
  },
  {
    id: 'pro-3',
    name: 'Emily Rodriguez',
    role: 'Financial Advisor',
    company: 'Wealth Partners',
    category: 'financial',
    initials: 'ER',
    experience: '18 years experience',
    volume: '$1.2B AUM',
    location: 'San Diego, CA',
    distance: '11.2 mi',
    rating: '5.0',
    reviews: '91',
    tag: 'Fiduciary',
    verified: true,
  },
  {
    id: 'pro-4',
    name: 'David Thompson',
    role: 'Tax Advisor',
    company: 'Thompson Tax Group',
    category: 'tax',
    initials: 'DT',
    experience: '20 years experience',
    volume: '2,500+ clients',
    location: 'San Diego, CA',
    distance: '9.3 mi',
    rating: '4.7',
    reviews: '87',
    tag: 'CPA Certified',
    verified: true,
  },
];

const propertyServices = [
  {
    id: 'svc-1',
    name: 'Bright Electric',
    role: 'Electrician',
    company: 'Licensed and Insured',
    category: 'electrician',
    initials: 'BE',
    years: '15 years in business',
    availability: 'Available today',
    location: 'San Diego, CA',
    distance: '5.6 mi',
    rating: '4.9',
    reviews: '230',
    verified: true,
  },
  {
    id: 'svc-2',
    name: 'Premier Plumbing',
    role: 'Plumber',
    company: 'Licensed and Insured',
    category: 'plumber',
    initials: 'PP',
    years: '10 years in business',
    availability: 'Available tomorrow',
    location: 'San Diego, CA',
    distance: '7.1 mi',
    rating: '4.8',
    reviews: '189',
    verified: true,
  },
  {
    id: 'svc-3',
    name: 'Coastal Roofing Experts',
    role: 'Roofer',
    company: 'Licensed and Insured',
    category: 'roofing',
    initials: 'CR',
    years: '12 years in business',
    availability: 'Available this week',
    location: 'San Diego, CA',
    distance: '9.8 mi',
    rating: '4.9',
    reviews: '142',
    verified: true,
  },
  {
    id: 'svc-4',
    name: 'GreenScape Landscaping',
    role: 'Landscaping',
    company: 'Bonded and Insured',
    category: 'landscaping',
    initials: 'GS',
    years: '8 years in business',
    availability: 'Available tomorrow',
    location: 'San Diego, CA',
    distance: '10.4 mi',
    rating: '4.8',
    reviews: '98',
    verified: true,
  },
];

const filterGroups = [
  { label: 'Country', options: ['United States', 'Canada', 'United Kingdom'] },
  { label: 'State', options: ['California', 'Texas', 'Florida', 'New York'] },
  { label: 'County', options: ['San Diego County', 'Orange County', 'Los Angeles County'] },
  { label: 'Radius', options: ['10 miles', '25 miles', '50 miles', '100 miles'] },
  { label: 'Experience', options: ['Any', '5+ years', '10+ years', '15+ years'] },
  { label: 'Availability', options: ['Any time', 'Today', 'This week', 'This month'] },
];

export function Advisors() {
  const [mode, setMode] = useState<DirectoryMode>('professionals');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('real-estate');
  const [query, setQuery] = useState('');

  const categories = mode === 'professionals' ? professionalCategories : serviceCategories;
  const items = mode === 'professionals' ? professionals : propertyServices;

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = item.category === selectedCategory;
      const matchesQuery = [item.name, item.role, item.company, item.location]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [items, query, selectedCategory]);

  const handleModeChange = (nextMode: DirectoryMode) => {
    setMode(nextMode);
    setSelectedCategory(nextMode === 'professionals' ? professionalCategories[0].id : serviceCategories[0].id);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Advisor & Market Utilities</h1>
          <p className="text-[#5B616E] mt-1">Find verified professionals and property service providers for your portfolio.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            San Diego, CA, USA
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <Button onClick={() => setFilterOpen(true)} variant="outline" className="h-10">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Card className="p-2">
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'professionals' as DirectoryMode, label: 'Professionals', desc: 'Grow, finance, and protect assets.', icon: BriefcaseBusiness },
            { id: 'services' as DirectoryMode, label: 'Property Services', desc: 'Maintain and improve assets.', icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleModeChange(tab.id)}
                className={cn(
                  'flex min-h-[92px] items-center gap-4 rounded-lg border p-4 text-left transition-all',
                  active ? 'border-black bg-black text-white shadow-sm' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                )}
              >
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg', active ? 'bg-white text-black' : 'bg-gray-100 text-gray-700')}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{tab.label}</span>
                  <span className={cn('mt-1 block text-xs leading-5', active ? 'text-white/70' : 'text-gray-500')}>{tab.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="overflow-visible">
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-950">
                {mode === 'professionals' ? 'Find Professional Advisors' : 'Find Property Services'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {mode === 'professionals' ? 'Browse advisory experts by specialization.' : 'Browse maintenance and improvement providers by trade.'}
              </p>
            </div>

            <div className="relative w-full xl:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={mode === 'professionals' ? 'Search advisors...' : 'Search services...'}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex min-w-[132px] flex-col items-center justify-center gap-2 rounded-lg border px-3 py-3 text-xs font-semibold transition-all',
                    active ? 'border-black bg-gray-950 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                San Diego, CA
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700">
                25 miles
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>
              <button onClick={() => setFilterOpen(true)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              Sort by
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-medium text-gray-700">
                {mode === 'professionals' ? 'Most Relevant' : 'Top Rated'}
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="mb-4 text-xs font-medium text-gray-500">
            {mode === 'professionals' ? '128 advisors found' : '210 service providers found'}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visibleItems.map((item) => (
              <DirectoryCard key={item.id} mode={mode} item={item} />
            ))}
          </div>

          {visibleItems.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center">
              <p className="font-semibold text-gray-900">No matches found</p>
              <p className="mt-1 text-sm text-gray-500">Try a different category or clear your search.</p>
            </div>
          )}
        </div>
      </Card>

      {filterOpen && <FilterDrawer mode={mode} onClose={() => setFilterOpen(false)} />}
    </div>
  );
}

function DirectoryCard({ mode, item }) {
  const isProfessional = mode === 'professionals';

  return (
    <div className="group flex min-h-[256px] flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm', isProfessional ? 'bg-gray-950' : 'bg-emerald-700')}>
            {item.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-gray-950">{item.name}</h3>
              {item.verified && <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />}
            </div>
            <p className="mt-0.5 text-xs text-gray-500">{item.role}</p>
            <p className="text-xs text-gray-400">{item.company}</p>
          </div>
        </div>
        <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2 border-y border-gray-100 py-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Award className="h-3.5 w-3.5 text-gray-400" />
          {isProfessional ? item.experience : item.years}
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="h-3.5 w-3.5 text-gray-400" />
          {isProfessional ? item.volume : item.availability}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          {item.location} ({item.distance})
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-amber-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-semibold text-gray-950">{item.rating}</span>
          <span className="text-gray-400">({item.reviews})</span>
        </div>
        {isProfessional ? (
          <Badge variant={item.tag === 'Top Rated' ? 'positive' : 'neutral'} className="uppercase tracking-wide">
            {item.tag}
          </Badge>
        ) : (
          <Badge variant="positive" className="uppercase tracking-wide">
            Open
          </Badge>
        )}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <Button variant="outline" size="sm" className="w-full">
          <MessageSquare className="h-3.5 w-3.5" />
          Message
        </Button>
        <Button size="sm" className="w-full">
          <Phone className="h-3.5 w-3.5" />
          Connect
        </Button>
      </div>
    </div>
  );
}

function FilterDrawer({ mode, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-950">Filters</h3>
            <p className="mt-0.5 text-xs text-gray-500">{mode === 'professionals' ? 'Refine advisor results' : 'Refine service providers'}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-5">
            <section>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Location</h4>
              <div className="space-y-3">
                {filterGroups.slice(0, 4).map((group) => (
                  <FilterSelect key={group.label} group={group} />
                ))}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">ZIP Code</label>
                  <input className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-gray-200" placeholder="Enter ZIP code" />
                </div>
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">{mode === 'professionals' ? 'Professional' : 'Provider'}</h4>
              <div className="space-y-3">
                <FilterSelect group={{ label: mode === 'professionals' ? 'Profession' : 'Trade', options: mode === 'professionals' ? professionalCategories.map((item) => item.label) : serviceCategories.map((item) => item.label) }} />
                <FilterSelect group={{ label: 'Specialization', options: ['Any', 'Luxury assets', 'Portfolio strategy', 'Emergency response', 'Preventive maintenance'] }} />
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">More Filters</h4>
              <div className="space-y-3">
                {filterGroups.slice(4).map((group) => (
                  <FilterSelect key={group.label} group={group} />
                ))}
                <label className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700">
                  Verified only
                  <span className="relative h-5 w-9 rounded-full bg-black">
                    <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                  </span>
                </label>
              </div>
            </section>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-5">
          <Button variant="outline" onClick={onClose}>Reset</Button>
          <Button onClick={onClose}>Apply Filters</Button>
        </div>
      </aside>
    </div>
  );
}

function FilterSelect({ group }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">{group.label}</label>
      <button className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-left text-sm text-gray-700 outline-none transition-all hover:border-gray-300">
        {group.options[0]}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
}
