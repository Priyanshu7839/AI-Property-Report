import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortalLayout } from './portal/PortalLayout';
import { Dashboard } from './pages/FinanceDashboard';
import { MyLeads } from './pages/MyLeads';
import { LeadDetails } from './pages/LeadDetails';
import { RiskProfile } from './pages/RiskProfile';
import { StrategyBuilder } from './pages/StrategyBuilder';
import { PortfolioAllocation } from './pages/PortfolioAllocation';
import { LIAMModel } from './pages/LIAMModel';
import { Consultations } from './pages/Consultations';
import { ActionPlans } from './pages/ActionPlans';
import { Documents } from './pages/Documents';
import { Payouts } from './pages/Payouts';
import { Performance } from './pages/Performance';
import { Settings } from './pages/Settings';

export default function FinanceAdvisorPortal() {
  return (
    <BrowserRouter>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<MyLeads />} />
          <Route path="/lead-details" element={<LeadDetails />} />
          <Route path="/risk-profile" element={<RiskProfile />} />
          <Route path="/strategy-builder" element={<StrategyBuilder />} />
          <Route path="/portfolio" element={<PortfolioAllocation />} />
          <Route path="/liam" element={<LIAMModel />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/action-plans" element={<ActionPlans />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}