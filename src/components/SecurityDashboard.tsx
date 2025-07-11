
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Key, Users, Activity, CheckCircle, XCircle } from 'lucide-react';
import { supabaseSecurityService } from '@/services/supabaseSecurityService';
import type { Database } from '@/integrations/supabase/types';

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

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold">{dashboardData?.totalEvents || 0}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blocked Events</p>
                  <p className="text-2xl font-bold text-red-600">{dashboardData?.blockedEvents || 0}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trusted Devices</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardData?.trustedDevices || 0}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Risk Score</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardData?.riskScore || 0}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Threats</p>
                  <p className="text-2xl font-bold text-red-600">{dashboardData?.activeThreats || 0}</p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Security Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.resource}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskLevelColor(log.risk_level)}>
                            {log.risk_level}
                          </Badge>
                          {log.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Database Encryption</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>API Rate Limiting</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Audit Logging</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TLS Encryption</span>
                      <Badge className="bg-green-100 text-green-800">TLS 1.3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{log.action}</h3>
                          <p className="text-sm text-gray-600">Resource: {log.resource}</p>
                          {log.user_id && (
                            <p className="text-sm text-gray-600">User: {log.user_id.substring(0, 8)}...</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskLevelColor(log.risk_level)}>
                            {log.risk_level}
                          </Badge>
                          {log.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Time: {new Date(log.created_at).toLocaleString()}</p>
                        {log.ip_address && <p>IP: {log.ip_address}</p>}
                        {log.details && (
                          <p>Details: {JSON.stringify(log.details)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2fa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!twoFactorSetup ? (
                  <div className="text-center space-y-4">
                    <p className="text-gray-600">Enable two-factor authentication for enhanced security</p>
                    <Button onClick={handleEnable2FA} className="bg-blue-600 hover:bg-blue-700">
                      Setup 2FA
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <Key className="h-4 w-4" />
                      <AlertDescription>
                        Two-factor authentication has been initiated. Scan the QR code with your authenticator app.
                      </AlertDescription>
                    </Alert>
                    <div className="text-center">
                      <img src={twoFactorSetup.qrCode} alt="2FA QR Code" className="mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        Secret: <code className="bg-gray-100 px-2 py-1 rounded">{twoFactorSetup.secret}</code>
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">Backup Codes:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {twoFactorSetup.backupCodes.map((code: string, index: number) => (
                            <code key={index} className="bg-gray-100 px-2 py-1 rounded">
                              {code}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>GDPR Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span>Status</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <Button onClick={() => handleComplianceCheck('gdpr')} variant="outline">
                    Run GDPR Check
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>PCI DSS Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span>Status</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <Button onClick={() => handleComplianceCheck('pci_dss')} variant="outline">
                    Run PCI DSS Check
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CCPA Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span>Status</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <Button onClick={() => handleComplianceCheck('ccpa')} variant="outline">
                    Run CCPA Check
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HIPAA Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span>Status</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <Button onClick={() => handleComplianceCheck('hipaa')} variant="outline">
                    Run HIPAA Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supabaseSecurityService.getSecurityRecommendations().map((recommendation, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                      <span>{recommendation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;
