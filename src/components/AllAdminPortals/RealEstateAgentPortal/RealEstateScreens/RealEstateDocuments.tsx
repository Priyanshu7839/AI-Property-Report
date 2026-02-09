import React from 'react';
import { FileText, Download, Upload } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { mockDocuments } from '../RealEstatedata/RealEstatemockData';

export function RealEstateDocuments() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-600 mt-1">Manage contracts, agreements, and disclosures</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-5 h-5" />
          Upload Document
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Filename</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{doc.filename}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.uploadDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusChip 
                    status={doc.status} 
                    variant={doc.status === 'Completed' ? 'success' : 'warning'} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
