import React from 'react';
import { mockDocuments } from '../data/TaxmockData';
import { FileText, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function TaxDocuments() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Needs Update':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Needs Update':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Document Requests</h1>
        <p className="text-gray-600 mt-2">Document vault + checklist for tax advisory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Checklist */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Document Checklist</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                ✓ Request Missing Documents
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filename
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {doc.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{doc.filename}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {doc.uploadedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.status === 'Pending' ? (
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Request
                          </button>
                        ) : doc.status === 'Needs Update' ? (
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                            Request Update
                          </button>
                        ) : (
                          <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upload Additional Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm mt-2">
                Select Files
              </button>
            </div>
          </div>
        </div>

        {/* Template Messages Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Messages</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-900 mb-2 font-medium">Request Closing Statement</p>
                <p className="text-xs text-gray-600 mb-3">
                  "Please upload your closing statement from when you purchased the property. This will help us determine your cost basis for capital gains calculations."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Copy Template
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-900 mb-2 font-medium">Confirm Cost Basis</p>
                <p className="text-xs text-gray-600 mb-3">
                  "Please confirm your cost basis including the purchase price and any capital improvements. This is essential for accurate tax planning."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Copy Template
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-900 mb-2 font-medium">Request Mortgage Statement</p>
                <p className="text-xs text-gray-600 mb-3">
                  "We need your most recent mortgage statement to review interest deductibility and loan terms."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Copy Template
                </button>
              </div>
            </div>
          </div>

          {/* Document Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Document Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Verified</span>
                  <span className="text-sm font-semibold text-green-600">2/4</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="text-sm font-semibold text-yellow-600">1/4</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Needs Update</span>
                  <span className="text-sm font-semibold text-red-600">1/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
