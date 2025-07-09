
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import BusinessAuth from './pages/BusinessAuth';
import BusinessSignup from './pages/BusinessSignup';
import AdminDashboard from './pages/AdminDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import LinkCard from './pages/LinkCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerPortalPage from './pages/CustomerPortalPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/auth" element={<BusinessAuth />} />
          <Route path="/business/signup" element={<BusinessSignup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/investor" element={<InvestorDashboard />} />
          <Route path="/customer" element={<CustomerPortalPage />} />
          <Route path="/link-card" element={<LinkCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
