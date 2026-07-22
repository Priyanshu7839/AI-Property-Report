import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreHorizontal, FileText, RefreshCw, Plus, MapPin, Building, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { AddPropertyModal } from './AddPropertyModal';

const PROPERTIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob21lJTIwZXh0ZXJpb3IlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxMTY1NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "1248 Oakwood Avenue, Palo Alto, CA",
    valuation: "$3,450,000",
    equity: "$1,200,000",
    confidence: 94,
    lastUpdated: "2 days ago",
    status: "Active"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTEwNjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "850 Folsom Street, Unit 4B, San Francisco, CA",
    valuation: "$1,850,000",
    equity: "$450,000",
    confidence: 88,
    lastUpdated: "5 hours ago",
    status: "Review"
  },
];




export default function Properties({ onSelectProperty,setActiveTab }) {

  const [openproperty,setopenProperty] = useState(false)

  const navigate= useNavigate()



  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111111]">My Properties</h1>
          <p className="text-[#5B616E]">Manage your real estate assets and valuations.</p>
        </div>
        <button
        onClick={()=>{setActiveTab('Add')}}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => (
          <PropertyCard onSelectProperty={onSelectProperty} key={property.id} property={property} />
        ))}
        
        {/* Add Property Placeholder Card */}
        <div
        onClick={()=>{
          setActiveTab('Add')
        }}
        className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all min-h-[400px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
            <Plus className="w-6 h-6" />
          </div>
          <p className="font-medium text-gray-900">Add New Property</p>
          <p className="text-sm text-gray-500 mt-1">Connect address or upload deed</p>
        </div>

      </div>
      <AddPropertyModal openproperty={openproperty} setopenProperty={setopenProperty}/>
    </div>
  );
}

function PropertyCard({ property,onSelectProperty }) {
  return (
    <Card onClick={()=>{ onSelectProperty(property?.id)}} className="group overflow-hidden bg-white hover:shadow-lg transition-all duration-300 border-[#E6E8EC]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.address} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm border border-gray-100">
          {property.status}
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg leading-tight text-gray-900 mb-1 line-clamp-1">{property.address}</h3>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <MapPin className="w-3 h-3" />
              San Francisco Bay Area
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100 border-b mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">AI Valuation</p>
            <p className="text-lg font-bold text-gray-900">{property.valuation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">Unlockable</p>
            <p className="text-lg font-bold text-green-600">{property.equity}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${property.confidence > 90 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span>Confidence: {property.confidence}%</span>
          </div>
          <span>Updated {property.lastUpdated}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
        <Link  className="flex-1">
          <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm text-gray-700">
            View Details
          </button>
        </Link>
        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm" title="View Report">
          <FileText className="w-4 h-4" />
        </button>
        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm" title="Update Valuation">
          <RefreshCw className="w-4 h-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
