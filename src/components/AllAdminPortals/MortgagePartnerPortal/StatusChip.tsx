import React from 'react';

type StatusType = 'New' | 'Contacted' | 'Qualified' | 'Quote Sent' | 'Negotiating' | 'Closed Won' | 'Closed Lost' | 'Active' | 'Pending' | 'Paid' | 'Processing' | 'Verified' | 'Rejected';

interface StatusChipProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

export function StatusChip({ status, size = 'md' }: StatusChipProps) {
  const getStyles = (status: StatusType) => {
    const baseClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
    
    const statusStyles: Record<StatusType, string> = {
      'New': 'bg-blue-50 text-blue-700 border-blue-200',
      'Contacted': 'bg-purple-50 text-purple-700 border-purple-200',
      'Qualified': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Quote Sent': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Negotiating': 'bg-amber-50 text-amber-700 border-amber-200',
      'Closed Won': 'bg-green-50 text-green-700 border-green-200',
      'Closed Lost': 'bg-gray-50 text-gray-700 border-gray-200',
      'Active': 'bg-green-50 text-green-700 border-green-200',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'Paid': 'bg-green-50 text-green-700 border-green-200',
      'Processing': 'bg-blue-50 text-blue-700 border-blue-200',
      'Verified': 'bg-green-50 text-green-700 border-green-200',
      'Rejected': 'bg-red-50 text-red-700 border-red-200',
    };

    return `${baseClasses} ${statusStyles[status]} border rounded-full font-medium inline-flex items-center`;
  };

  return (
    <span className={getStyles(status)}>
      {status}
    </span>
  );
}