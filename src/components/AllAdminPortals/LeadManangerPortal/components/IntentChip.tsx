interface IntentChipProps {
  score: number;
  small?: boolean;
}

export function IntentChip({ score, small = false }: IntentChipProps) {
  const getLevel = (score: number) => {
    if (score >= 80) return { label: 'High', color: 'green' as const };
    if (score >= 50) return { label: 'Med', color: 'amber' as const };
    return { label: 'Low', color: 'gray' as const };
  };

  const { label, color } = getLevel(score);
  const colors = {
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <span className={`
      inline-flex items-center border rounded-full
      ${small ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      ${colors[color]}
    `}>
      {label} ({score})
    </span>
  );
}
