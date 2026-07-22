import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { FileText, UploadCloud, CheckCircle, File, Search } from 'lucide-react';

export const DocumentsPanel = () => {
  const onDrop = useCallback(() => {
    // Handle file drop
  }, []);

  const documents = [
    { id: 1, name: '2025_Property_Tax_Assessment.pdf', type: 'Tax Document', date: 'Jan 15, 2026', status: 'Extracted' },
    { id: 2, name: 'Current_Mortgage_Statement.pdf', type: 'Financial', date: 'Feb 10, 2026', status: 'Processing' },
    { id: 3, name: 'Original_Deed.pdf', type: 'Legal', date: 'Oct 20, 2023', status: 'Extracted' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors bg-gray-50/50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center cursor-pointer">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
            <UploadCloud className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Property Documents</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Drag and drop your mortgage statements, tax assessments, or lease agreements here to automatically extract data.
          </p>
          <button className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm transition-all">
            Browse Files
          </button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Document Vault</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Document Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-2">Date Added</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          <div className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{doc.name}</span>
                </div>
                <div className="col-span-3">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{doc.type}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-500">{doc.date}</div>
                <div className="col-span-2 flex justify-end">
                   {doc.status === 'Extracted' ? (
                     <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                       <CheckCircle className="w-3.5 h-3.5" />
                       Extracted
                     </div>
                   ) : (
                     <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded-full animate-pulse">
                       <File className="w-3.5 h-3.5" />
                       Processing...
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
