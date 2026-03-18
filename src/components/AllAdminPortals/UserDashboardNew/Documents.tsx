import React from 'react';
import { Card, Button, Badge } from '../../../components/ui/Components';
import { Upload, FileText, Download, Trash2, Search, CheckCircle2 } from 'lucide-react';

const DOCUMENTS = [
  { id: 1, name: '2025 Tax Assessment - 1240 Waverley', type: 'PDF', size: '2.4 MB', date: 'Feb 12, 2026', status: 'Verified' },
  { id: 2, name: 'Mortgage Statement - Q1 2026', type: 'PDF', size: '1.1 MB', date: 'Feb 10, 2026', status: 'Processing' },
  { id: 3, name: 'Lease Agreement - Unit 402', type: 'PDF', size: '4.8 MB', date: 'Jan 28, 2026', status: 'Verified' },
  { id: 4, name: 'Property Insurance Policy', type: 'PDF', size: '3.2 MB', date: 'Jan 15, 2026', status: 'Expired' },
];

export function Documents() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Documents & Data Vault</h1>
        <p className="text-[#5B616E] mt-1">Securely store and share property deeds, tax filings, and insurance policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-dashed border-2 border-[#E6E8EC] hover:border-[#111111] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px] bg-gray-50/50">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#111111] mb-4">
              <Upload size={24} />
            </div>
            <h3 className="font-semibold text-[#111111]">Upload New Documents</h3>
            <p className="text-sm text-[#5B616E] mt-1 text-center max-w-sm">
              Drag and drop files here, or click to browse. Supported: PDF, JPG, PNG up to 25MB.
            </p>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-4 border-b border-[#E6E8EC] flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-[#111111]">Recent Files</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input 
                  type="text" 
                  placeholder="Search docs..." 
                  className="pl-9 pr-4 py-1.5 text-sm border border-[#E6E8EC] rounded-md focus:outline-none focus:border-[#111111] w-48 bg-white"
                />
              </div>
            </div>
            <div className="divide-y divide-[#E6E8EC]">
              {DOCUMENTS.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors group">
                  <div className="p-3 bg-gray-100 rounded-lg text-[#5B616E] mr-4">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#111111] truncate">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-[#5B616E] mt-0.5">
                      <span>{doc.size}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{doc.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={doc.status === 'Verified' ? 'positive' : doc.status === 'Processing' ? 'warning' : 'risk'}>
                      {doc.status}
                    </Badge>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-gray-200 rounded-md text-[#5B616E] hover:text-[#111111]">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-rose-100 rounded-md text-[#5B616E] hover:text-rose-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-[#111111] text-white">
            <h3 className="font-semibold mb-2">Vault Security</h3>
            <p className="text-sm text-gray-400 mb-6">
              Your documents are encrypted with AES-256 and stored in compliant data centers.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-sm">SOC2 Type II Compliant</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-sm">End-to-End Encryption</span>
            </div>
            <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
              Security Settings
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
