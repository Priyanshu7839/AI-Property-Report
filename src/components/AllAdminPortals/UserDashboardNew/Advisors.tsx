import React from 'react';
import { Card, Button, Badge } from '../../../components/ui/Components';
import { Star, MessageSquare, Phone, MapPin, CheckCircle } from 'lucide-react';
import { advisors } from './mockData';

export function Advisors() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Advisors & Marketplace</h1>
        <p className="text-[#5B616E] mt-1">Connect with vetted experts for tax strategy, legal, and acquisitions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <Card key={advisor.id} className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img 
                src={advisor.image} 
                alt={advisor.name} 
                className="w-16 h-16 rounded-full object-cover border border-[#E6E8EC]"
              />
              <div>
                <h3 className="font-semibold text-[#111111]">{advisor.name}</h3>
                <p className="text-sm text-[#5B616E]">{advisor.role}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span className="font-medium text-[#111111]">{advisor.rating}</span>
                  <span className="text-[#9CA3AF]">(120+ Reviews)</span>
                </div>
              </div>
            </div>

            <div className="py-3 border-y border-[#E6E8EC] space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#5B616E]">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>Verified {advisor.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5B616E]">
                <MapPin size={14} />
                <span>San Francisco Bay Area</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-xs text-[#5B616E]">
              <span className="font-medium text-[#111111] block mb-1">Specialization:</span>
              {advisor.specialty}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <Button variant="outline" className="w-full text-xs">
                <MessageSquare size={14} /> Message
              </Button>
              <Button className="w-full text-xs">
                <Phone size={14} /> Schedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
