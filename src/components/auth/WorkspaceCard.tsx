import React from 'react';
import { Button } from '@/app/components/ui/button';
import { RoleBadge } from './RoleBadge';
import { Building2, MapPin } from 'lucide-react';

interface WorkspaceCardProps {
  role: string;
  organization: string;
  region: string;
  county?: string;
  zipCode?: string;
  status: 'active' | 'paused';
  onEnter: () => void;
}

export function WorkspaceCard({
  role,
  organization,
  region,
  county,
  zipCode,
  status,
  onEnter
}: WorkspaceCardProps) {
  const coverage = [region, county, zipCode].filter(Boolean).join(' • ');

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900">{role}</h3>
            <RoleBadge 
              role={status === 'active' ? 'Active' : 'Paused'} 
              variant={status}
            />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{coverage}</span>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={onEnter}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Enter workspace
      </Button>
    </div>
  );
}
