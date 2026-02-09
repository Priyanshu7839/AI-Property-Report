import React from 'react';
import { AuthCard } from './AuthCard';
import { Button } from '@/app/components/ui/button';
import { ShieldAlert } from 'lucide-react';

interface AccessDeniedScreenProps {
  onBackToWorkspaces: () => void;
  onRequestAccess: () => void;
}

export function AccessDeniedScreen({ onBackToWorkspaces, onRequestAccess }: AccessDeniedScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AuthCard title="Access restricted" subtitle="">
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>

          <p className="text-gray-600 mb-8 max-w-sm">
            You don't have access to this workspace. Please contact your administrator.
          </p>

          <div className="w-full space-y-3">
            <Button
              onClick={onBackToWorkspaces}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to workspace selector
            </Button>
            
            <Button
              onClick={onRequestAccess}
              variant="outline"
              className="w-full"
            >
              Request access
            </Button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
