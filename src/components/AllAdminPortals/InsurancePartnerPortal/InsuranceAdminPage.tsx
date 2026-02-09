import { useState } from 'react';
import { InsurancePortalShell } from './Insuranceportal/InsurancePortalShell';
import { InsuranceDashboard } from './Insurancescreens/InsuranceDashboard';
import { InsuranceMyLeads } from './Insurancescreens/InsuranceMyLeads';
import { InsuranceLeadDetails } from './Insurancescreens/InsuranceLeadDetails';
import { InsuranceQuoteWorkspace } from './Insurancescreens/InsuranceQuoteWorkspace';
import { InsurancePolicyComparison } from './Insurancescreens/InsurancePolicyComparison';
import { InsuranceDocuments } from './Insurancescreens/InsuranceDocuments';
import { InsuranceRenewals } from './Insurancescreens/InsuranceRenewals';
import { InsurancePayouts } from './Insurancescreens/InsurancePayouts';
import { InsuranceSLAPerformance } from './Insurancescreens/InsuranceSLAPerformance';
import { InsuranceSupport } from './Insurancescreens/InsuranceSupport';
import { InsuranceSettings } from './Insurancescreens/InsuranceSettings';

export default function InsuranceAdminPage() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>();

  const handleNavigate = (screen: string, leadId?: string) => {
    setCurrentScreen(screen);
    if (leadId) {
      setSelectedLeadId(leadId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <InsuranceDashboard onNavigate={handleNavigate} />;
      case 'leads':
        return <InsuranceMyLeads onNavigate={handleNavigate} />;
      case 'lead-details':
        return <InsuranceLeadDetails leadId={selectedLeadId} onNavigate={handleNavigate} />;
      case 'quote':
        return <InsuranceQuoteWorkspace leadId={selectedLeadId} onNavigate={handleNavigate} />;
      case 'comparison':
        return <InsurancePolicyComparison onNavigate={handleNavigate} />;
      case 'documents':
        return <InsuranceDocuments leadId={selectedLeadId} onNavigate={handleNavigate} />;
      case 'renewals':
        return <InsuranceRenewals onNavigate={handleNavigate} />;
      case 'payouts':
        return <InsurancePayouts onNavigate={handleNavigate} />;
      case 'sla':
        return <InsuranceSLAPerformance onNavigate={handleNavigate} />;
      case 'support':
        return <InsuranceSupport onNavigate={handleNavigate} />;
      case 'settings':
        return <InsuranceSettings onNavigate={handleNavigate} />;
      default:
        return <InsuranceDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      <InsurancePortalShell currentScreen={currentScreen} onNavigate={handleNavigate}>
        {renderScreen()}
      </InsurancePortalShell>
    </div>
  );
}
