import React from 'react';
import { Slider } from '@/app/components/ui/slider';
import { Input } from '@/app/components/ui/input';

interface AllocationSliderRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  returnAssumption: string;
  riskLabel: string;
  color: string;
}

export function AllocationSliderRow({
  label,
  value,
  onChange,
  returnAssumption,
  riskLabel,
  color,
}: AllocationSliderRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">
            Est. return: {returnAssumption} | Risk: {riskLabel}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
            className="w-20 text-right"
            min="0"
            max="100"
          />
          <span className="text-sm text-gray-600">%</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="w-full"
      />
      <div
        className="h-2 rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
    </div>
  );
}
