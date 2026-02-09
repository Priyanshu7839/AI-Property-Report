import React from 'react';
import { AuthCard } from './AuthCard';
import { Button } from '@/app/components/ui/button';
import { Clock } from 'lucide-react';

interface SessionExpiredScreenProps {
  onSignIn: () => void;
  onReturnHome: () => void;
}

export function SessionExpiredScreen({ onSignIn, onReturnHome }: SessionExpiredScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AuthCard title="Session expired" subtitle="">
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>

          <p className="text-gray-600 mb-8">
            Your session has expired. Please sign in again to continue.
          </p>

          <div className="w-full space-y-3">
            <Button
              onClick={onSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign in
            </Button>
            
            <Button
              onClick={onReturnHome}
              variant="outline"
              className="w-full"
            >
              Return to home
            </Button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
