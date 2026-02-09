import React from 'react';
import { Clock } from 'lucide-react';

interface SLAChipProps {
  timeRemaining: string;
  isUrgent?: boolean;
}

export function SLAChip({ timeRemaining, isUrgent = false }: SLAChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
      isUrgent ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'
    }`}>
      <Clock className="w-3 h-3" />
      {timeRemaining}
    </span>
  );
}
