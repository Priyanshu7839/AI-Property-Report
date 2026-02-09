import { mockAuditLog } from '../data/mockData';
import { FileText, User, AlertCircle, CheckCircle2, Edit, Download } from 'lucide-react';

export function AuditLogScreen() {
  const getIcon = (action: string) => {
    if (action.includes('created')) return CheckCircle2;
    if (action.includes('assigned') || action.includes('reassigned')) return User;
    if (action.includes('updated')) return Edit;
    return FileText;
  };

  const getColor = (action: string) => {
    if (action.includes('created')) return 'text-green-600 bg-green-50';
    if (action.includes('assigned')) return 'text-blue-600 bg-blue-50';
    if (action.includes('updated')) return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Audit Log</h1>
          <p className="text-sm text-gray-600 mt-1">Complete compliance tracking and system history</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Download className="w-4 h-4" />
          Export Audit CSV
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {mockAuditLog.map((entry, index) => {
            const Icon = getIcon(entry.action);
            const colorClass = getColor(entry.action);
            const isLast = index === mockAuditLog.length - 1;

            return (
              <div key={entry.id} className="relative">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center relative z-10`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{entry.action}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      by <span className="font-medium text-gray-900">{entry.actor}</span>
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {entry.leadId && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200">
                          Lead: {entry.leadId}
                        </span>
                      )}
                      {entry.partnerId && (
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded border border-purple-200">
                          Partner: {entry.partnerId}
                        </span>
                      )}
                      {entry.metadata && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded border border-gray-200">
                          {entry.metadata}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center pt-4 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Load More Entries
          </button>
        </div>
      </div>
    </div>
  );
}
