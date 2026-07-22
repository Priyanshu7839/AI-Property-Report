import React, { useState } from 'react';
import { Layout } from './Layout';
import { Dashboard } from './Dashboard';
import  Properties  from './Properties';
import  PropertyDetail  from './PropertyDetail';
import { Portfolio } from './Portfolio';
import { Advisors } from './Advisors';
import { Documents } from './Documents';
import  Reports  from './Reports';
import { properties } from './mockData';
import TenantsHub from './TenantsHub';
import ServiceTickets from './ServiceTickets';
import Pricing from './Pricing';
import DocumentVaultPage from './DocumentVaultPage';
import Organization from './Organization';
import AddPropertyFlow from './AddPropertyFlow';

export default function UserDashboardNew() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setActiveTab('properties'); 
   // Ensure we stay on properties tab context
  };

  const handleBackToProperties = () => {
    setSelectedPropertyId(null);
     console.log('clicked')
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        if (selectedPropertyId) {
          const property = properties.find(p => p.id === selectedPropertyId);
          if (property) {
            return <PropertyDetail property={property} onBack={handleBackToProperties} />;
          }
        }
        return <Properties setActiveTab={setActiveTab} onSelectProperty={handleSelectProperty} />;
      case 'portfolio':
        return <Portfolio />;
      case 'advisors':
        return <Advisors />;
      case 'documents': 
        return <DocumentVaultPage />;
      case 'reports':
        return <Reports />;
      case 'tenants':
      return <TenantsHub/>
      case 'service':
        return <ServiceTickets/>
        case 'organization':
        return <Organization/>
        case 'pricing' :
          return <Pricing/>

          case 'Add' :
            return <AddPropertyFlow setActiveTab={setActiveTab}/>
      default:
        // For other tabs not fully implemented, we can show a placeholder or reuse existing components for demo
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500 ">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-semibold text-[#111111]">Coming Soon</h2>
            <p className="text-[#5B616E] mt-2 max-w-md">
              The {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} module is currently under development. 
              Check back later for updates.
            </p>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedPropertyId(null); }}>
      {renderContent()}
    </Layout>
  );
}
