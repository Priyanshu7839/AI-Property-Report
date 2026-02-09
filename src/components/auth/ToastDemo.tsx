import React from 'react';
import { Button } from '@/app/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

export function ToastDemo() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-2">
      <p className="text-xs font-semibold text-gray-900 mb-2">Toast Notifications</p>
      <div className="space-y-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success('Operation completed successfully')}
          className="w-full text-xs"
        >
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.error('An error occurred')}
          className="w-full text-xs"
        >
          <XCircle className="w-3 h-3 mr-1" />
          Error
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.info('Here is some information')}
          className="w-full text-xs"
        >
          <Info className="w-3 h-3 mr-1" />
          Info
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast('Custom message')}
          className="w-full text-xs"
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          Default
        </Button>
      </div>
    </div>
  );
}
