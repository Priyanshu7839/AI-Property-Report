import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { OverviewScreen } from './screens/OverviewScreen';
import { AssignmentQueueScreen } from './screens/AssignmentQueueScreen';
import { AssignedLeadsScreen } from './screens/AssignedLeadsScreen';
import { SLAMonitorScreen } from './screens/SLAMonitorScreen';
import { RoutingRulesScreen } from './screens/RoutingRulesScreen';
import { PartnersScreen } from './screens/PartnersScreen';
import { AuditLogScreen } from './screens/AuditLogScreen';
import { ReportingScreen } from './screens/ReportingScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function LeadManagerPortal() {
  const [currentScreen, setCurrentScreen] = useState('overview');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewScreen onNavigate={setCurrentScreen} />;
      case 'queue':
        return <AssignmentQueueScreen />;
      case 'assigned':
        return <AssignedLeadsScreen />;
      case 'sla':
        return <SLAMonitorScreen />;
      case 'routing':
        return <RoutingRulesScreen />;
      case 'partners':
        return <PartnersScreen />;
      case 'audit':
        return <AuditLogScreen />;
      case 'reporting':
        return <ReportingScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <OverviewScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      
      {/* Main Content Area */}
      <div className="ml-64">
        {/* Top Bar */}
        <TopBar />
        
        {/* Content */}
        <main className="pt-16 p-8">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
