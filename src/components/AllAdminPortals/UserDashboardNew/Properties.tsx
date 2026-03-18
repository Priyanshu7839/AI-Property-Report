import React from 'react';
import { Card, Button, Badge } from '../../../components/ui/Components';
import { MapPin, ArrowUpRight, Plus, Filter, LayoutGrid, List } from 'lucide-react';
import { properties, type Property } from './mockData';

interface PropertiesProps {
  onSelectProperty: (propertyId: string) => void;
}

export function Properties({ onSelectProperty }: PropertiesProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#111111]">My Properties</h2>
          <p className="text-[#5B616E] mt-1">Manage valuation, equity, and documents for your assets.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="gap-2">
            <Plus size={16} /> Add Property
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} onClick={() => onSelectProperty(property.id)} />
        ))}
        
        {/* Add Property Card Placeholder */}
        <button className="group border-2 border-dashed border-[#E6E8EC] rounded-xl flex flex-col items-center justify-center gap-4 p-8 hover:border-[#111111] hover:bg-gray-50 transition-all cursor-pointer min-h-[380px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#5B616E] group-hover:bg-[#111111] group-hover:text-white transition-colors">
            <Plus size={24} />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-[#111111]">Add New Property</h3>
            <p className="text-sm text-[#5B616E] mt-1">Connect address or upload deed</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function PropertyCard({ property, onClick }: { property: Property; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white border border-[#E6E8EC] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#D1D5DB] transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.address} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={property.riskScore === 'Low' ? 'positive' : property.riskScore === 'Medium' ? 'warning' : 'risk'} className="shadow-sm backdrop-blur-md bg-white/90">
            {property.riskScore} Risk
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-[#111111] leading-tight">{property.address}</h3>
            <div className="flex items-center gap-1 text-sm text-[#5B616E] mt-1">
              <MapPin size={14} />
              {property.city}, {property.state}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3 flex-1">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-sm text-[#5B616E]">AI Valuation</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#111111]">${(property.valuation / 1000000).toFixed(2)}M</span>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                <ArrowUpRight size={10} /> 2.4%
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-sm text-[#5B616E]">Unlockable Equity</span>
            <span className="font-medium text-[#111111]">${(property.equity / 1000000).toFixed(2)}M</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-[#5B616E]">Confidence Score</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#111111] rounded-full" 
                  style={{ width: `${property.confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium">{property.confidence}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E6E8EC] flex justify-between items-center text-xs text-[#9CA3AF]">
          <span>Updated {property.lastUpdated}</span>
          <span className="group-hover:text-[#111111] transition-colors font-medium">View Report →</span>
        </div>
      </div>
    </div>
  );
}
