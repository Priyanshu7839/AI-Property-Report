import React from 'react';

type Status = 
  | 'new' 
  | 'contacted' 
  | 'intake_sent' 
  | 'intake_completed' 
  | 'consult_scheduled' 
  | 'advice_delivered' 
  | 'closed_won' 
  | 'closed_lost';

const statusConfig: Record<Status, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  contacted: { label: 'Contacted', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  intake_sent: { label: 'Intake Sent', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  intake_completed: { label: 'Intake Completed', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  consult_scheduled: { label: 'Consult Scheduled', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  advice_delivered: { label: 'Advice Delivered', className: 'bg-teal-50 text-teal-700 border-teal-200' },
  closed_won: { label: 'Closed Won', className: 'bg-green-50 text-green-700 border-green-200' },
  closed_lost: { label: 'Closed Lost', className: 'bg-gray-50 text-gray-700 border-gray-200' },
};

interface StatusChipProps {
  status: Status;
}

export function StatusChip({ status }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
