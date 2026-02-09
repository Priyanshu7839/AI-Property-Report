import { createBrowserRouter } from "react-router";
import { HomePage } from "../components/HomePage";
import { ReportPage } from "../components/ReportPage";
import { Dashboard } from "../DashboardComponents/pages/Dashboard";
import { ReportsDatabase } from "../DashboardComponents/pages/ReportsDatabase";
import { LeadCapture } from "../DashboardComponents/pages/LeadCapture";
import { BuyerManagement } from "../DashboardComponents/pages/BuyerManagement";
import { ZipMarketplace } from "../DashboardComponents/pages/ZipMarketplace";
import { Finance } from "../DashboardComponents/pages/Finance";
import { APIIntegration } from "../DashboardComponents/pages/APIIntegration";
import { AdminRoles } from "../DashboardComponents/pages/AdminRoles";
import { ReportDetail } from "../DashboardComponents/pages/ReportDetail";
import DashboardLayout from "../Layout/DashboardLayout";
import Pitch from "../DashboardComponents/pages/Pitch";
import { ProExchangeTransition } from "../DashboardComponents/pages/ProExchangeTransition";
import { LoginScreen } from "../components/auth/LoginScreen";
import SuperAdmin from "../components/AllAdminPortals/SuperAdmin/SuperAdmin";
import { PortalLayout } from "../components/AllAdminPortals/FinancialAdvisorPortal/portal/PortalLayout";
import { MyLeads } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/MyLeads";
import { FinanceDashboard } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/FinanceDashboard";
import { LeadDetails } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/LeadDetails";
import { RiskProfile } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/RiskProfile";
import { StrategyBuilder } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/StrategyBuilder";
import { PortfolioAllocation } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/PortfolioAllocation";
import { LIAMModel } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/LIAMModel";
import { Consultations } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/Consultations";
import { ActionPlans } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/ActionPlans";
import { Documents } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/Documents";
import { Payouts } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/Payouts";
import { Performance } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/Performance";
import { Settings } from "../components/AllAdminPortals/FinancialAdvisorPortal/pages/Settings";
import { TaxPortalShell } from "../components/AllAdminPortals/TaxAdvisorPortal/TaxPortalShell";
import { TaxDashboard } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxDashboard";
import { TaxMyLeads } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxMyLeads";
import { TaxLeadDetails } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxLeadDetails";
import { TaxIntake } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxIntake";
import { TaxDocuments } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxDocuments";
import { TaxConsultations } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxConsultations";
import { TaxPlaceholderScreen } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxPlaceholderScreen";
import { TaxPayouts } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxPayouts";
import { TaxPerformance } from "../components/AllAdminPortals/TaxAdvisorPortal/screens/TaxPerformance";
import { Activity, FileCheck, HelpCircle, SettingsIcon } from "lucide-react";
import { RealEstateLayout } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateLayout";
import { RealEstateDashboard } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateDashboard";
import { RealEstateMyLeads } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateMyLeads";
import { RealEstateLeadDetails } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateLeadDetails";
import { RealEstateSellerPipeline } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateSellerPipeline";
import { RealEstateBuyerPipeline } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateBuyerPipeline";
import { RealEstateCompsAndPricing } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateCompsAndPricing";
import { RealEstateListingReadiness } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateListingReadiness";
import { RealEstateAppointments } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateAppointments";
import { RealEstateDocuments } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateDocuments";
import { RealEstatePayoutsAndInvoices } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstatePayoutsAndInvoices";
import { RealEstateSettings } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateSettings";
import { RealEstateSupport } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstateSupport";
import { RealEstatePerformance } from "../components/AllAdminPortals/RealEstateAgentPortal/RealEstateScreens/RealEstatePerformance";
import InsuranceAdminPage from "../components/AllAdminPortals/InsurancePartnerPortal/InsuranceAdminPage";
import { MortgagePortalLayout } from "../components/AllAdminPortals/MortgagePartnerPortal/MortgagePortalLayout";
import { MortgageDashboard } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageDashboard";
import { MortgageMyLeads } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageMyLeads";
import { MortgageLeadDetails } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageLeadDetails";
import { MortgageQuoteBuilder } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageQuoteBuilder";
import { MortgageDocuments } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageDocuments";
import { MortgageStatusUpdates } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageStatusUpdates";
import { MortgagePayouts } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgagePayouts";
import { MortgageSLAPerformance } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageSLAPerformance";
import { MortgageSupport } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageSupport";
import { MortgageSettings } from "../components/AllAdminPortals/MortgagePartnerPortal/screens/MortgageSettings";
import LeadManagerPortal from "../components/AllAdminPortals/LeadManangerPortal/LeadManangerPortal";
import { FunnelFlow } from "../components/AllAdminPortals/UserDashboard/FunnelFlow";
const Routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Report",
    element: <ReportPage />,
  },
  {
    path: "/pitchdeck",
    element: <Pitch />,
  },
  {
    path: "/Report/redirect",
    element: <ProExchangeTransition />,
  },
  {
    path: "/Login",
    element: <LoginScreen />,
  },
  {
    path: "/SuperAdmin",
    element: <SuperAdmin />,
  },
  //Finance admin Routes ----------------------------------------------------------------
  {
    path: "/FinanceAdmin",
    element: <PortalLayout />,
    children: [
      { path: "/FinanceAdmin/dashboard", element: <FinanceDashboard /> },
      { path: "/FinanceAdmin/leads", element: <MyLeads /> },
      { path: "/FinanceAdmin/lead-details", element: <LeadDetails /> },
      { path: "/FinanceAdmin/risk-profile", element: <RiskProfile /> },
      { path: "/FinanceAdmin/strategy-builder", element: <StrategyBuilder /> },
      { path: "/FinanceAdmin/portfolio", element: <PortfolioAllocation /> },
      { path: "/FinanceAdmin/liam", element: <LIAMModel /> },
      { path: "/FinanceAdmin/consultations", element: <Consultations /> },
      { path: "/FinanceAdmin/action-plans", element: <ActionPlans /> },
      { path: "/FinanceAdmin/documents", element: <Documents /> },
      { path: "/FinanceAdmin/payouts", element: <Payouts /> },
      { path: "/FinanceAdmin/performance", element: <Performance /> },
      { path: "/FinanceAdmin/settings", element: <Settings /> },
    ],
  },
  //Tax Admin Routes ---------------------------------------------------------------------

  {
    path: "/TaxAdmin",
    element: <TaxPortalShell />,
    children: [
      { path: "/TaxAdmin/dashboard", element: <TaxDashboard /> },
      { path: "/TaxAdmin/leads", element: <TaxMyLeads /> },
      { path: "/TaxAdmin/lead-details", element: <TaxLeadDetails /> },
      { path: "/TaxAdmin/tax-intake", element: <TaxIntake /> },
      { path: "/TaxAdmin/documents", element: <TaxDocuments /> },
      { path: "/TaxAdmin/consultations", element: <TaxConsultations /> },
      {
        path: "/TaxAdmin/advice-summary",
        element: (
          <TaxPlaceholderScreen
            title="Advice Summary"
            description="Deliver clean, homeowner-friendly tax advice summaries and deliverables."
            icon={FileCheck}
          />
        ),
      },
      {
        path: "/TaxAdmin/status-updates",
        element: (
          <TaxPlaceholderScreen
            title="Status Updates"
            description="Update lead stages and track CRM flow from new to closed won/lost."
            icon={Activity}
          />
        ),
      },

      { path: "/TaxAdmin/payouts", element: <TaxPayouts /> },
      { path: "/TaxAdmin/performance", element: <TaxPerformance /> },

      {
        path: "/TaxAdmin/support",
        element: (
          <TaxPlaceholderScreen
            title="Support"
            description="Get help with the Tax Advisor Portal and contact AIPropertyReport support."
            icon={HelpCircle}
          />
        ),
      },
      {
        path: "/TaxAdmin/settings",
        element: (
          <TaxPlaceholderScreen
            title="Settings"
            description="Manage your availability, lead capacity, notifications, and account settings."
            icon={SettingsIcon}
          />
        ),
      },
    ],
  },

  //RealEstate Routes ---------------------------------------------------------------------

  {
    path:'/RealEstateAdmin',
  element:<RealEstateLayout/>,
  children:[
      { path: "/RealEstateAdmin/dashboard",     element: <RealEstateDashboard /> },
      { path: "/RealEstateAdmin/leads",         element: <RealEstateMyLeads /> },
      { path: "/RealEstateAdmin/lead-details",  element: <RealEstateLeadDetails /> },
      { path: "/RealEstateAdmin/lead-details/:leadId",  element: <RealEstateLeadDetails /> },
      { path: "/RealEstateAdmin/seller-pipeline",    element: <RealEstateSellerPipeline /> },
      { path: "/RealEstateAdmin/buyer-pipeline",     element: <RealEstateBuyerPipeline /> },
      { path: "/RealEstateAdmin/comps", element: <RealEstateCompsAndPricing /> },
      { path: "/RealEstateAdmin/listing-readiness", element: <RealEstateListingReadiness /> },
      { path: "/RealEstateAdmin/appointments", element: <RealEstateAppointments /> },
      { path: "/RealEstateAdmin/documents", element: <RealEstateDocuments /> },
      { path: "/RealEstateAdmin/payouts", element: <RealEstatePayoutsAndInvoices /> },
      { path: "/RealEstateAdmin/performance", element: <RealEstatePerformance /> },
      { path: "/RealEstateAdmin/support", element: <RealEstateSupport /> },
      { path: "/RealEstateAdmin/settings", element: <RealEstateSettings /> },
  ]
},

//Insurance Admin Routes --------------------------------------------------------------
{
  path:'/InsuranceAdmin',
  element:<InsuranceAdminPage/>
}
,
//Lead Admin Routes --------------------------------------------------------------
{
  path:'/LeadAdmin',
  element:<LeadManagerPortal/>
}
,
//Mortgage Admin Routes --------------------------------------------------------------

{
  path:'/MortgageAdmin',
  element:<MortgagePortalLayout/>,
  children:[
    {path: "/MortgageAdmin/dashboard",     element: <MortgageDashboard /> },
    {path: "/MortgageAdmin/leads",     element:<MortgageMyLeads/> },
    {path: "/MortgageAdmin/lead-details",     element:<MortgageLeadDetails/> },
    {path: "/MortgageAdmin/quote-builder",     element: <MortgageQuoteBuilder/>},
    {path: "/MortgageAdmin/documents",     element:<MortgageDocuments/> },
    {path: "/MortgageAdmin/status-updates",     element: <MortgageStatusUpdates/>},
    {path: "/MortgageAdmin/payouts",     element: <MortgagePayouts/>},
    {path: "/MortgageAdmin/sla-performance",     element:<MortgageSLAPerformance/> },
    {path: "/MortgageAdmin/support",     element:<MortgageSupport/> },
    {path: "/MortgageAdmin/settings",     element:<MortgageSettings/> },
   
  ]
},

  // Our Reports Dashboard Routings ---------------------------------------------------------
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/reports",
        element: <ReportsDatabase />,
      },
      {
        path: "/dashboard/reports/:id",
        element: <ReportDetail />,
      },
      {
        path: "/dashboard/leads",
        element: <LeadCapture />,
      },
      {
        path: "/dashboard/buyers",
        element: <BuyerManagement />,
      },
      {
        path: "/dashboard/zip-marketplace",
        element: <ZipMarketplace />,
      },
      {
        path: "/dashboard/finance",
        element: <Finance />,
      },
      {
        path: "/dashboard/api-integration",
        element: <APIIntegration />,
      },
      {
        path: "/dashboard/admin-roles",
        element: <AdminRoles />,
      },
    ],
  },
  {
    path:'/userDashboard',
    element:<FunnelFlow/>
  }
]);

export default Routers;
