import { useState } from 'react';
import { Calendar, Video, Phone, Clock, Plus, FileText } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { StatusChip } from '../portal/StatusChip';

const consultations = [
  { id: 'C001', leadId: 'L2024-1001', date: '2024-01-28', time: '14:00', type: 'Video', status: 'Scheduled', notes: 'Initial investment strategy review' },
  { id: 'C002', leadId: 'L2024-1002', date: '2024-01-28', time: '16:30', type: 'Call', status: 'Scheduled', notes: 'LIAM model walkthrough' },
  { id: 'C003', leadId: 'L2024-998', date: '2024-01-27', time: '10:00', type: 'Video', status: 'Completed', notes: 'Portfolio allocation discussion' },
  { id: 'C004', leadId: 'L2024-999', date: '2024-01-27', time: '13:00', type: 'Call', status: 'Completed', notes: 'Risk profile review' },
];

export function Consultations() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Consultations</h1>
        <p className="text-gray-600 mt-1">Manage client meetings and consultations</p>
      </div>

      <Tabs defaultValue="calendar" className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                Schedule Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Consultation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Lead ID</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L2024-1001">L2024-1001</SelectItem>
                      <SelectItem value="L2024-1002">L2024-1002</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date & Time</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="video">Video Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Agenda/Notes</Label>
                  <Textarea placeholder="Enter consultation agenda..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Schedule</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="calendar">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-center text-neutral-500">
              <Calendar className="size-16 mx-auto mb-4 text-neutral-300" />
              <p className="mb-2">Calendar integration coming soon</p>
              <p className="text-sm">Use List View to manage consultations</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consult ID</TableHead>
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((consult) => (
                  <TableRow key={consult.id}>
                    <TableCell className="font-medium">{consult.id}</TableCell>
                    <TableCell className="text-blue-600">{consult.leadId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-neutral-400" />
                        <div>
                          <div>{consult.date}</div>
                          <div className="text-sm text-neutral-500">{consult.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {consult.type === 'Video' ? (
                          <Video className="size-4 text-blue-600" />
                        ) : (
                          <Phone className="size-4 text-green-600" />
                        )}
                        {consult.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={consult.status === 'Completed' ? 'Closed Won' : 'Consult Scheduled'} />
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{consult.notes}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="size-4" />
                        </Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="mb-2">Meeting Prep Checklist</h3>
        <ul className="text-sm space-y-1 text-neutral-700">
          <li>✓ Review lead profile and property details</li>
          <li>✓ Prepare LIAM breakdown and allocation scenarios</li>
          <li>✓ Have action plan template ready</li>
          <li>✓ Confirm borrowing cost estimates</li>
          <li>✓ Test video/call connection 5min before</li>
        </ul>
      </div>
    </div>
  );
}