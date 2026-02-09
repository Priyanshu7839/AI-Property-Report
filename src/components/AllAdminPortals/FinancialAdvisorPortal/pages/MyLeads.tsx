import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { LeadsTable } from '../portal/LeadsTable';
import { mockLeads } from '../data/advisorMockData';
import { Button } from '../../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

export function MyLeads() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');

  const filteredLeads = mockLeads.filter((lead) => {
    if (statusFilter !== 'all' && lead.stage !== statusFilter) return false;
    if (stateFilter !== 'all' && lead.state !== stateFilter) return false;
    return true;
  });

  const clearFilters = () => {
    setStatusFilter('all');
    setStateFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Leads</h1>
        <p className="text-gray-600 mt-1">
          All investment/wealth advisory leads assigned to you.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Status:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Risk Profile Completed">Risk Profile Completed</SelectItem>
                <SelectItem value="Strategy Built">Strategy Built</SelectItem>
                <SelectItem value="Consult Scheduled">Consult Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">State:</label>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="WA">Washington</SelectItem>
                <SelectItem value="CO">Colorado</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(statusFilter !== 'all' || stateFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Leads ({filteredLeads.length})
            </h2>
          </div>
        </div>
        <LeadsTable leads={filteredLeads} />
      </div>
    </div>
  );
}
