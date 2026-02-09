import { Clock, AlertTriangle } from 'lucide-react';

interface SLAChipProps {
  deadline: string;
  size?: 'sm' | 'md';
}

export function InsuranceSLAChip({ deadline, size = 'md' }: SLAChipProps) {
  const getTimeRemaining = () => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffMs < 0) {
      return { text: 'Overdue', isUrgent: true, isPast: true };
    } else if (diffHours < 2) {
      return { text: `${diffHours}h ${diffMinutes}m`, isUrgent: true, isPast: false };
    } else if (diffHours < 24) {
      return { text: `${diffHours}h`, isUrgent: false, isPast: false };
    } else {
      const days = Math.floor(diffHours / 24);
      return { text: `${days}d`, isUrgent: false, isPast: false };
    }
  };

  const { text, isUrgent, isPast } = getTimeRemaining();

  const getStyles = () => {
    if (isPast) return 'bg-red-100 text-red-700 border-red-300';
    if (isUrgent) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  const Icon = isPast ? AlertTriangle : Clock;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${getStyles()} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {text}
    </span>
  );
}
