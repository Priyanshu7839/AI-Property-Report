import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { WorkspaceCard } from './WorkspaceCard';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Search } from 'lucide-react';

interface Workspace {
  id: string;
  role: string;
  organization: string;
  region: string;
  county?: string;
  zipCode?: string;
  status: 'active' | 'paused';
}

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  onSelectWorkspace: (workspaceId: string, remember: boolean) => void;
}

export function WorkspaceSelector({ workspaces, onSelectWorkspace }: WorkspaceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rememberSelection, setRememberSelection] = useState(false);

  const filteredWorkspaces = workspaces.filter(workspace => {
    const searchLower = searchQuery.toLowerCase();
    return (
      workspace.role.toLowerCase().includes(searchLower) ||
      workspace.organization.toLowerCase().includes(searchLower) ||
      workspace.region.toLowerCase().includes(searchLower) ||
      workspace.county?.toLowerCase().includes(searchLower) ||
      workspace.zipCode?.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AuthCard 
        title="Choose your workspace" 
        subtitle="Select the portal you want to open."
        width="lg"
      >
        <div className="space-y-6">
          {workspaces.length > 3 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workspaces..."
                className="pl-10"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                role={workspace.role}
                organization={workspace.organization}
                region={workspace.region}
                county={workspace.county}
                zipCode={workspace.zipCode}
                status={workspace.status}
                onEnter={() => onSelectWorkspace(workspace.id, rememberSelection)}
              />
            ))}
          </div>

          {filteredWorkspaces.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No workspaces found matching your search.</p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <Checkbox
              id="remember"
              checked={rememberSelection}
              onCheckedChange={(checked) => setRememberSelection(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
              Remember my selection
            </Label>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
