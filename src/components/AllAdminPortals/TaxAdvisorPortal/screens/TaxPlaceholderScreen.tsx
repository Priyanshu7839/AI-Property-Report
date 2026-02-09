import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function TaxPlaceholderScreen({ title, description, icon: Icon }: PlaceholderScreenProps) {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-lg text-sm">
            This section is ready for implementation
          </div>
        </div>
      </div>
    </div>
  );
}
