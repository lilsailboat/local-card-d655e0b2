
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import { supabaseSecurityService } from '@/services/supabaseSecurityService';
import type { Database } from '@/integrations/supabase/types';

// Import the new components
import SecurityStats from './security/SecurityStats';
import RecentEvents from './security/RecentEvents';
import SecurityStatus from './security/SecurityStatus';
import AuditLogs from './security/AuditLogs';
import TwoFactorAuth from './security/TwoFactorAuth';
import ComplianceChecks from './security/ComplianceChecks';
import SecurityRecommendations from './security/SecurityRecommendations';

type SecurityAuditLog = Database['public']['Tables']['security_audit_logs']['Row'];

const SecurityDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [twoFactorSetup, setTwoFactorSetup] = useState<any>(null);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      const [dashboard, logs] = await Promise.all([
        supabaseSecurityService.getSecurityDashboard(),
        supabaseSecurityService.getAuditLogs(undefined, undefined, undefined, undefined, 50)
      ]);

      setDashboardData(dashboard);
      setAuditLogs(logs);
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    try {
      const setup = await supabaseSecurityService.initiate2FA('demo-user');
      setTwoFactorSetup(setup);
    } catch (error) {
      console.error('Failed to setup 2FA:', error);
    }
  };

  const handleComplianceCheck = async (type: 'gdpr' | 'ccpa' | 'hipaa' | 'pci_dss') => {
    try {
      const result = await supabaseSecurityService.performComplianceCheck(type);
      console.log(`${type.toUpperCase()} Compliance Check:`, result);
    } catch (error) {
      console.error(`Failed to check ${type} compliance:`, error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              Security Dashboard
            </h1>
            <p className="text-gray-600">Monitor and manage security across your platform</p>
          </div>
        </div>

        {/* Security Stats */}
        <SecurityStats dashboardData={dashboardData} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentEvents auditLogs={auditLogs} />
              <SecurityStatus />
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <AuditLogs auditLogs={auditLogs} />
          </TabsContent>

          <TabsContent value="2fa" className="space-y-4">
            <TwoFactorAuth 
              twoFactorSetup={twoFactorSetup} 
              onEnable2FA={handleEnable2FA} 
            />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <ComplianceChecks onComplianceCheck={handleComplianceCheck} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <SecurityRecommendations 
              recommendations={supabaseSecurityService.getSecurityRecommendations()} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;
