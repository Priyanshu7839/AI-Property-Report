import { useState } from "react";
import { PortalShell } from "./PortalShell";
import { HQOverview } from "./screens/HQOverview";
import { UserJourneys } from "./screens/UserJourneys";
import { ReportsProperties } from "./screens/ReportsProperties";
import { LeadsCommandCenter } from "./screens/LeadsCommandCenter";
import { PartnerNetwork } from "./screens/PartnerNetwork";
import { RoutingSLAs } from "./screens/RoutingSLAs";
import { RevenuePricing } from "./screens/RevenuePricing";
import { PayoutsInvoices } from "./screens/PayoutsInvoices";
import { GeographyIntelligence } from "./screens/GeographyIntelligence";
import { AuditCompliance } from "./screens/AuditCompliance";
import { RolesAccess } from "./screens/RolesAccess";
import { SystemSettings } from "./screens/SystemSettings";

export default function SuperAdmin() {
  const [currentScreen, setCurrentScreen] = useState("overview");

  const renderScreen = () => {
    switch (currentScreen) {
      case "overview":
        return <HQOverview />;
      case "journeys":
        return <UserJourneys />;
      case "reports":
        return <ReportsProperties />;
      case "leads":
        return <LeadsCommandCenter />;
      case "partners":
        return <PartnerNetwork />;
      case "routing":
        return <RoutingSLAs />;
      case "revenue":
        return <RevenuePricing />;
      case "payouts":
        return <PayoutsInvoices />;
      case "geography":
        return <GeographyIntelligence />;
      case "audit":
        return <AuditCompliance />;
      case "roles":
        return <RolesAccess />;
      case "settings":
        return <SystemSettings />;
      default:
        return <HQOverview />;
    }
  };

  return (
    <PortalShell currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </PortalShell>
  );
}
