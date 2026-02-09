import { Clock } from "lucide-react";

interface SLAChipProps {
  status: string;
  timeRemaining?: string;
}

export function SLAChip({ status, timeRemaining }: SLAChipProps) {
  const config: Record<string, { bg: string; text: string; border: string; label: string }> = {
    "on-track": {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      label: "On Track",
    },
    "near-breach": {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      label: "Near Breach",
    },
    "breached": {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      label: "Breached",
    },
  };

  // Fallback for undefined or unknown status
  const statusConfig = config[status] || config["on-track"];
  const { bg, text, border, label } = statusConfig;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${bg} ${text} ${border}`}
    >
      <Clock className="w-3 h-3" />
      <span>{label}</span>
      {timeRemaining && <span className="ml-1">({timeRemaining})</span>}
    </div>
  );
}