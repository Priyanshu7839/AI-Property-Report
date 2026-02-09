import React from 'react';
import { Clock } from 'lucide-react';

interface SLAChipProps {
  timeRemaining: string;
  isUrgent?: boolean;
}

export function SLAChip({ timeRemaining, isUrgent }: SLAChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isUrgent 
        ? 'bg-red-50 text-red-700 border border-red-200' 
        : 'bg-gray-50 text-gray-700 border border-gray-200'
    }`}>
      <Clock className="w-3 h-3" />
      {timeRemaining}
    </span>
  );
}
