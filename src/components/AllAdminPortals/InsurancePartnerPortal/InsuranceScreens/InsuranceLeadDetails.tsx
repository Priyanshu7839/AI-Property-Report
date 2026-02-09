import { MapPin, Home, Shield, TrendingDown, Phone, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { InsuranceStatusChip } from '../Insuranceportal/InsuranceStatusChip';
import { InsuranceSLAChip } from '../Insuranceportal/InsuranceSLAChip';
import { Button } from '../../../ui/button';
import { mockLeads } from '../Insurancedata/InsurancemockData';

interface LeadDetailsProps {
  leadId?: string;
  onNavigate: (screen: string, leadId?: string) => void;
}

export function InsuranceLeadDetails({ leadId = 'LD-2401', onNavigate }: LeadDetailsProps) {
  const lead = mockLeads.find(l => l.id === leadId) || mockLeads[0];

  const getRiskBadge = (score?: 'low' | 'medium' | 'high') => {
    if (!score) return null;
    const styles = {
      low: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-amber-50 text-amber-700 border-amber-200',
      high: 'bg-red-50 text-red-700 border-red-200'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[score]}`}>
        Risk: {score.charAt(0).toUpperCase() + score.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">Lead Details</h1>
          <InsuranceStatusChip status={lead.stage} />
          <InsuranceSLAChip deadline={lead.slaDeadline} />
        </div>
        <p className="text-gray-600">Lead ID: {lead.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lead & Property Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-gray-900">{lead.location.zip}</p>
                  <p className="text-sm text-gray-600">{lead.location.county}, {lead.location.state}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Estimated Home Value</p>
                  <p className="text-lg font-semibold text-gray-900">${lead.homeValue.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Property Type</p>
                  <p className="text-sm font-medium text-gray-900">{lead.propertyType || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Occupancy Type</p>
                  <p className="text-sm font-medium text-gray-900">{lead.occupancyType || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Current Premium</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {lead.currentPremium ? `$${lead.currentPremium.toLocaleString()}/yr` : 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Potential Savings</p>
                  <p className="text-lg font-semibold text-green-700">
                    {lead.potentialSavings ? `$${lead.potentialSavings}/yr` : 'Calculate quote'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              {getRiskBadge(lead.riskScore)}
            </div>
          </div>

          {/* Homeowner Intent Timeline */}
          {lead.timeline && lead.timeline.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Homeowner Intent Timeline</h2>
              
              <div className="space-y-3">
                {lead.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(event.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm font-medium text-gray-900">{lead.homeownerEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => alert('Contact homeowner feature - would integrate with email/phone system')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Homeowner
              </Button>
              
              <Button
                className="w-full"
                onClick={() => onNavigate('quote', lead.id)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Build Quote
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('documents', lead.id)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Request Documents
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => alert('Status update feature - would show a modal to update lead stage')}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </div>
          </div>

          {/* Quote Summary (if available) */}
          {lead.currentPremium && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quote Opportunity</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Premium:</span>
                  <span className="font-semibold text-gray-900">${lead.currentPremium}/yr</span>
                </div>
                {lead.potentialSavings && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Est. Savings:</span>
                    <span className="font-semibold text-green-700">${lead.potentialSavings}/yr</span>
                  </div>
                )}
                <div className="pt-3 mt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-600">
                    💡 Strong conversion opportunity based on savings potential
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}