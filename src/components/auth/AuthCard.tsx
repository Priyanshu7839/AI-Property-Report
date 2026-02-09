import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  width?: 'sm' | 'md' | 'lg';
}

export function AuthCard({ children, title, subtitle, width = 'md' }: AuthCardProps) {
  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl'
  };

  return (
    <div className="w-full px-4">
      <div className={`${widthClasses[width]} mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8`}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
