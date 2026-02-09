import React from 'react';
import { Mail, Phone, MessageSquare, Book } from 'lucide-react';

export function RealEstateSupport() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
        <p className="text-sm text-gray-600 mt-1">Get help and access resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Get a response within 24 hours</p>
          <a href="mailto:agents@aipropertyreport.com" className="text-sm font-medium text-blue-600 hover:underline">
            agents@aipropertyreport.com
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Mon-Fri, 9AM-6PM ET</p>
          <a href="tel:+18885551234" className="text-sm font-medium text-blue-600 hover:underline">
            (888) 555-1234
          </a>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Book className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Getting Started Guide</h4>
            <p className="text-xs text-gray-600">Learn how to use the agent portal</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Lead Management Best Practices</h4>
            <p className="text-xs text-gray-600">Maximize your conversion rates</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Comps & Pricing Tools</h4>
            <p className="text-xs text-gray-600">Use data to win listings</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Payment & Invoicing</h4>
            <p className="text-xs text-gray-600">Understanding your earnings</p>
          </a>
        </div>
      </div>
    </div>
  );
}
