import { Upload, FileText, Download, Eye, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';

const documents = [
  { id: 'D001', leadId: 'L2024-1001', type: 'Bank Statement', name: 'Chase_Statement_Dec2023.pdf', uploaded: '2024-01-27', status: 'Verified' },
  { id: 'D002', leadId: 'L2024-1001', type: 'Mortgage Statement', name: 'Mortgage_Current.pdf', uploaded: '2024-01-27', status: 'Verified' },
  { id: 'D003', leadId: 'L2024-1002', type: 'Risk Profile', name: 'RiskProfile_L2024-1002.pdf', uploaded: '2024-01-26', status: 'Generated' },
  { id: 'D004', leadId: 'L2024-998', type: 'Action Plan', name: 'ActionPlan_L2024-998.pdf', uploaded: '2024-01-26', status: 'Sent' },
  { id: 'D005', leadId: 'L2024-999', type: 'ID Verification', name: 'DriversLicense.pdf', uploaded: '2024-01-25', status: 'Pending Review' },
];

export function Documents() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Documents</h1>
        <p className="text-neutral-600">Manage lead documents and generated materials</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">47</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-amber-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">38</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Generated PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">6</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Document Vault</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center mb-4">
            <Upload className="size-12 mx-auto mb-3 text-neutral-400" />
            <p className="mb-2">Upload Documents</p>
            <p className="text-sm text-neutral-500 mb-3">Drag and drop files here or click to browse</p>
            <Button>Choose Files</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Lead ID</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-blue-600" />
                      <span className="font-medium">{doc.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600">{doc.leadId}</TableCell>
                  <TableCell className="text-sm">{doc.name}</TableCell>
                  <TableCell className="text-sm text-neutral-600">{doc.uploaded}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      doc.status === 'Verified' ? 'bg-green-100 text-green-700' :
                      doc.status === 'Generated' || doc.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status === 'Verified' ? (
                        <CheckCircle className="size-3 mr-1" />
                      ) : (
                        <AlertCircle className="size-3 mr-1" />
                      )}
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Request Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
            <div>
              <p className="font-medium">Bank Statement</p>
              <p className="text-sm text-neutral-600">Optional - For income verification</p>
            </div>
            <Button size="sm" variant="outline">Request</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
            <div>
              <p className="font-medium">Mortgage Statement</p>
              <p className="text-sm text-neutral-600">Optional - For equity calculation</p>
            </div>
            <Button size="sm" variant="outline">Request</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
            <div>
              <p className="font-medium">ID Verification</p>
              <p className="text-sm text-neutral-600">Optional - For compliance</p>
            </div>
            <Button size="sm" variant="outline">Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}