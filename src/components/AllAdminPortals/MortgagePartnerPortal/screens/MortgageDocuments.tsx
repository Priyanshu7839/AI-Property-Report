import React from 'react';
import { Upload, FileText } from 'lucide-react';
import { StatusChip } from '../StatusChip';

const documentFolders = [
  { name: 'Identity', count: 2 },
  { name: 'Income', count: 3 },
  { name: 'Property Docs', count: 1 },
  { name: 'Credit Docs', count: 0 },
  { name: 'Bank Statements', count: 2 },
];

const mockDocuments = [
  { id: 1, name: 'Drivers_License.pdf', folder: 'Identity', uploadedAt: '2026-01-23T10:30:00', status: 'Verified' as const },
  { id: 2, name: 'Paystub_Dec_2025.pdf', folder: 'Income', uploadedAt: '2026-01-23T11:15:00', status: 'Pending' as const },
  { id: 3, name: 'W2_2025.pdf', folder: 'Income', uploadedAt: '2026-01-23T11:16:00', status: 'Verified' as const },
  { id: 4, name: 'Property_Appraisal.pdf', folder: 'Property Docs', uploadedAt: '2026-01-24T08:00:00', status: 'Rejected' as const },
];

export function MortgageDocuments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-1">Upload and manage verification documents</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {documentFolders.map((folder) => (
          <button
            key={folder.name}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <p className="font-medium text-gray-900">{folder.name}</p>
            <p className="text-sm text-gray-500 mt-1">{folder.count} files</p>
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Filename
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Folder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {doc.folder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(doc.uploadedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusChip status={doc.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.status === 'Rejected' ? (
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Request Update
                      </button>
                    ) : (
                      <button className="text-gray-400 cursor-not-allowed">—</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}