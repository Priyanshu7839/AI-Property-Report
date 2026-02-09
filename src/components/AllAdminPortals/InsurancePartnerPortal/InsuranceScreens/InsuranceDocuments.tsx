import { FileText, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '../../../ui/button';
import { InsuranceStatusChip } from '../Insuranceportal/InsuranceStatusChip';

interface DocumentsProps {
  leadId?: string;
  onNavigate: (screen: string) => void;
}

export function InsuranceDocuments({ leadId = 'LD-2401', onNavigate }: DocumentsProps) {
  const documents = [
    {
      category: 'Proof of Current Policy',
      filename: 'current-policy-statement.pdf',
      uploadedDate: '2026-01-24',
      status: 'Verified' as const
    },
    {
      category: 'Property Photos',
      filename: 'property-exterior.jpg',
      uploadedDate: '2026-01-24',
      status: 'Pending' as const
    },
    {
      category: 'Claims History',
      filename: 'claims-report.pdf',
      uploadedDate: '2026-01-23',
      status: 'Verified' as const
    }
  ];

  const documentCategories = [
    { name: 'Proof of current policy (PDF)', required: true },
    { name: 'Property photos (optional)', required: false },
    { name: 'Claims history (optional)', required: false },
    { name: 'Identity proof (optional)', required: false }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-1">Upload and verify homeowner documentation.</p>
        <p className="text-sm text-gray-500 mt-1">Lead ID: {leadId}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Categories */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
          
          <div className="space-y-3">
            {documentCategories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    {category.required && (
                      <p className="text-xs text-red-600">Required</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Request Document Checklist
            </Button>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h2>
          
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{doc.category}</p>
                      <p className="text-sm font-medium text-gray-900">{doc.filename}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Uploaded {new Date(doc.uploadedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <InsuranceStatusChip status={doc.status} size="sm" />
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    {doc.status === 'Pending' && (
                      <Button variant="ghost" size="sm">
                        Request Update
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Status Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Verified Documents</p>
              <p className="text-xs text-blue-700 mt-1">
                Documents marked as verified have been reviewed and approved
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Pending Review</p>
              <p className="text-xs text-amber-700 mt-1">
                These documents are awaiting verification or need updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
