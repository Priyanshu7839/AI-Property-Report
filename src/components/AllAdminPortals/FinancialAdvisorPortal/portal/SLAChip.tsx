import React from 'react';
import { Clock } from 'lucide-react';

interface SLAChipProps {
  hours: number;
}

export function SLAChip({ hours }: SLAChipProps) {
  const isUrgent = hours < 2;
  const isWarning = hours >= 2 && hours < 6;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
      isUrgent ? 'bg-red-50 text-red-700' : 
      isWarning ? 'bg-yellow-50 text-yellow-700' : 
      'bg-gray-50 text-gray-700'
    }`}>
      <Clock className="w-3 h-3" />
      {hours}h
    </span>
  );
}
