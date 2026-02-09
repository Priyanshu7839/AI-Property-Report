import { useState } from 'react';
import { FileText, Download, Send, Plus, CheckCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Label } from '../../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';

const plans = [
  { id: 'AP001', leadId: 'L2024-1001', created: '2024-01-27', allocation: 'Balanced 60/30/10', status: 'Sent' },
  { id: 'AP002', leadId: 'L2024-998', created: '2024-01-26', allocation: 'High Growth 80/15/5', status: 'Draft' },
];

export function ActionPlans() {
  const [summary, setSummary] = useState('Based on your home equity unlock of $150,000 and moderate risk tolerance, we recommend a balanced allocation strategy optimized for long-term growth while managing borrowing costs.');
  const [allocation, setAllocation] = useState('S&P 500: 60%, Bonds: 30%, Cash: 10%');
  const [outcomes, setOutcomes] = useState('1-Year Net: +$7,200\n3-Year Net: +$24,500\n5-Year Net: +$43,800');
  const [risks, setRisks] = useState('• Market volatility may impact short-term returns\n• Interest rate changes affect borrowing costs\n• Tax implications vary by state');
  const [nextSteps, setNextSteps] = useState('☐ Review and approve allocation strategy\n☐ Complete lender application\n☐ Set up automatic rebalancing alerts\n☐ Schedule 90-day follow-up');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Action Plans</h1>
        <p className="text-neutral-600">Generate homeowner-ready investment deployment plans</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Sent This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">2.3d</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Plan Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Summary Recommendation</Label>
                <Textarea 
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="Enter summary recommendation..."
                />
              </div>

              <div>
                <Label>Suggested Allocation</Label>
                <Input 
                  value={allocation}
                  onChange={(e) => setAllocation(e.target.value)}
                  placeholder="e.g., S&P 500: 60%, Bonds: 30%..."
                />
              </div>

              <div>
                <Label>Expected Net Outcomes</Label>
                <Textarea 
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                  rows={3}
                  placeholder="1Y, 3Y, 5Y projections..."
                />
              </div>

              <div>
                <Label>Key Risks to Understand</Label>
                <Textarea 
                  value={risks}
                  onChange={(e) => setRisks(e.target.value)}
                  rows={3}
                  placeholder="List key risks..."
                />
              </div>

              <div>
                <Label>Next Steps Checklist</Label>
                <Textarea 
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                  rows={4}
                  placeholder="☐ Step 1..."
                />
              </div>

              <div>
                <Label>Advisor Signature</Label>
                <Input placeholder="Ethan Patel, CFP" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  <Download className="size-4 mr-2" />
                  Export PDF
                </Button>
                <Button className="flex-1" variant="outline">
                  <Send className="size-4 mr-2" />
                  Send to Homeowner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Action Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan ID</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.id}</TableCell>
                      <TableCell className="text-blue-600">{plan.leadId}</TableCell>
                      <TableCell className="text-sm text-neutral-600">{plan.created}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                          plan.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {plan.status === 'Sent' && <CheckCircle className="size-3 mr-1" />}
                          {plan.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="size-4" />
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
              <CardTitle>Plan Template</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-600 space-y-2">
              <p>✓ Executive Summary</p>
              <p>✓ Property & Equity Overview</p>
              <p>✓ Risk Profile Summary</p>
              <p>✓ Recommended Allocation</p>
              <p>✓ LIAM Net Gain Projection</p>
              <p>✓ Key Assumptions & Risks</p>
              <p>✓ Next Steps Checklist</p>
              <p>✓ Advisor Contact & Signature</p>
              <p className="text-xs text-neutral-400 pt-2">All plans are branded with AIPropertyReport logo and advisor credentials</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}