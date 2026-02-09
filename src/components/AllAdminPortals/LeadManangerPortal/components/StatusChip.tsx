interface StatusChipProps {
  status: 'green' | 'amber' | 'red' | 'blue' | 'gray';
  label: string;
  small?: boolean;
}

export function StatusChip({ status, label, small = false }: StatusChipProps) {
  const colors = {
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <span className={`
      inline-flex items-center border rounded-full
      ${small ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      ${colors[status]}
    `}>
      {label}
    </span>
  );
}
