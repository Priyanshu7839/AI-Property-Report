import React from 'react';
import { Mail, Phone, MessageSquare, Book } from 'lucide-react';

export function MortgageSupport() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Support</h1>
        <p className="text-gray-600 mt-1">Get help with your partner portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 mb-3">
            Send us an email and we'll get back to you within 24 hours
          </p>
          <p className="text-sm font-medium text-blue-600">partners@aipropertyreport.com</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-sm text-gray-600 mb-3">
            Call us Monday-Friday, 9am-5pm PST
          </p>
          <p className="text-sm font-medium text-green-600">1-800-PROPERTY</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-3">
            Chat with our support team in real-time
          </p>
          <button className="text-sm font-medium text-purple-600">Start Chat</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <Book className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-sm text-gray-600 mb-3">
            Browse our comprehensive partner guides
          </p>
          <button className="text-sm font-medium text-amber-600">View Docs</button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Response time is critical - contact leads within 15 minutes for best results</li>
          <li>• Use the Quote Builder to generate professional offers quickly</li>
          <li>• Keep your coverage ZIP codes up to date in Settings</li>
          <li>• Track your performance metrics in SLA Performance dashboard</li>
        </ul>
      </div>
    </div>
  );
}
