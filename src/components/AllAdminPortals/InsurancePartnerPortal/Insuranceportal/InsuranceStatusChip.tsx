interface StatusChipProps {
  status: 'New' | 'Contacted' | 'Qualified' | 'Quote Sent' | 'Comparing' | 'Bound' | 'Lost' | 'Pending' | 'Paid' | 'Active' | 'Verified';
  size?: 'sm' | 'md';
}

export function InsuranceStatusChip({ status, size = 'md' }: StatusChipProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Qualified':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Quote Sent':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Comparing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Bound':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Lost':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Verified':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${getStatusStyles()} ${sizeClasses}`}>
      {status}
    </span>
  );
}