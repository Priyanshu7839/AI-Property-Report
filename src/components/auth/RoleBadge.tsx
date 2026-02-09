import React from 'react';
import { Badge } from '@/app/components/ui/badge';

interface RoleBadgeProps {
  role: string;
  variant?: 'default' | 'active' | 'paused';
}

export function RoleBadge({ role, variant = 'default' }: RoleBadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-900 hover:bg-gray-100',
    active: 'bg-green-50 text-green-700 hover:bg-green-50',
    paused: 'bg-amber-50 text-amber-700 hover:bg-amber-50'
  };

  return (
    <Badge variant="outline" className={variantStyles[variant]}>
      {role}
    </Badge>
  );
}
