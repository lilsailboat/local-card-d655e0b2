
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import BusinessAuth from "./pages/BusinessAuth";
import BusinessSignup from "./pages/BusinessSignup";
import AdminDashboard from "./pages/AdminDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import LinkCard from "./pages/LinkCard";
import CustomerPortalPage from "./pages/CustomerPortalPage";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SecurityDashboard from "./components/SecurityDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/auth" element={<BusinessAuth />} />
          <Route path="/business/signup" element={<BusinessSignup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/security" element={<SecurityDashboard />} />
          <Route path="/investor" element={<InvestorDashboard />} />
          <Route path="/link-card" element={<LinkCard />} />
          <Route path="/customer-portal" element={<CustomerPortalPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
