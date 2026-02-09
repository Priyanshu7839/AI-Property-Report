import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SLAChipProps {
  minutesRemaining: number;
}

export function SLAChip({ minutesRemaining }: SLAChipProps) {
  const getSLAStatus = () => {
    if (minutesRemaining < 0) {
      return {
        label: `${Math.abs(minutesRemaining)}m overdue`,
        className: 'bg-red-50 text-red-700 border-red-200',
        icon: AlertTriangle,
      };
    } else if (minutesRemaining < 30) {
      return {
        label: `${minutesRemaining}m left`,
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock,
      };
    } else {
      return {
        label: `${minutesRemaining}m left`,
        className: 'bg-green-50 text-green-700 border-green-200',
        icon: Clock,
      };
    }
  };

  const status = getSLAStatus();
  const Icon = status.icon;

  return (
    <span className={`${status.className} border rounded-full px-3 py-1 text-sm font-medium inline-flex items-center gap-1.5`}>
      <Icon className="w-3.5 h-3.5" />
      {status.label}
    </span>
  );
}
