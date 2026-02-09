import { DollarSign, Download, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Button } from '../../../ui/button';

const payouts = [
  { leadId: 'L2024-998', delivered: '2024-01-26', closed: '2024-01-27', amount: '$1,250', status: 'Paid', invoice: 'INV-001' },
  { leadId: 'L2024-997', delivered: '2024-01-25', closed: '2024-01-26', amount: '$1,500', status: 'Paid', invoice: 'INV-002' },
  { leadId: 'L2024-1001', delivered: '2024-01-27', closed: '-', amount: '$1,250', status: 'Pending', invoice: 'INV-003' },
  { leadId: 'L2024-1002', delivered: '2024-01-27', closed: '-', amount: '$1,250', status: 'Pending', invoice: 'INV-004' },
];

export function Payouts() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Payouts & Invoices</h1>
        <p className="text-neutral-600">Track earnings and payment status</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-neutral-600">Total Earnings</CardTitle>
            <DollarSign className="size-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">$18,750</div>
            <p className="text-xs text-neutral-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-neutral-600">Pending Payouts</CardTitle>
            <TrendingUp className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-amber-600">$2,500</div>
            <p className="text-xs text-neutral-500 mt-1">2 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Paid Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">$16,250</div>
            <p className="text-xs text-neutral-500 mt-1">13 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-600">Avg Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">$1,250</div>
            <p className="text-xs text-neutral-500 mt-1">Per closed lead</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Plan Delivered</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Payout Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-blue-600">{payout.leadId}</TableCell>
                  <TableCell className="text-sm text-neutral-600">{payout.delivered}</TableCell>
                  <TableCell className="text-sm text-neutral-600">{payout.closed}</TableCell>
                  <TableCell className="font-medium">{payout.amount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      payout.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {payout.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="size-4 mr-2" />
                      {payout.invoice}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}