
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, Brain, Smartphone, Lock, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { hipaaService } from '@/services/hipaaService';
import { aiAnalyticsService } from '@/services/aiAnalyticsService';
import { mobileWalletService } from '@/services/mobileWalletService';
import { securityService } from '@/services/securityService';

const Phase3Dashboard = () => {
  const [complianceReport, setComplianceReport] = useState<any>(null);
  const [securityDashboard, setSecurityDashboard] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [walletSupport, setWalletSupport] = useState<any[]>([]);

  useEffect(() => {
    loadPhase3Data();
  }, []);

  const loadPhase3Data = () => {
    // Load HIPAA compliance data
    const compliance = hipaaService.generateComplianceReport();
    setComplianceReport(compliance);

    // Load security dashboard
    const security = securityService.getSecurityDashboard();
    setSecurityDashboard(security);

    // Generate AI insights
    const mockCustomers = [
      { id: '1', tier: 'gold', points: 3420, lifetimeSpend: 1250, wardNumber: 1, visits: 28, averageSpend: 44.64, lastVisit: '2024-01-10' },
      { id: '2', tier: 'silver', points: 1850, lifetimeSpend: 780, wardNumber: 2, visits: 19, averageSpend: 41.05, lastVisit: '2024-01-01' }
    ];
    const insights = aiAnalyticsService.generateBusinessInsights(mockCustomers);
    setAiInsights(insights);

    // Check wallet support
    const support = mobileWalletService.checkWalletSupport();
    setWalletSupport(support);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-blue-100 text-blue-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'trend': return 'bg-purple-100 text-purple-800';
      case 'anomaly': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateWalletPass = () => {
    const mockCustomer = { id: '1', tier: 'gold', points: 3420 };
    const pass = mobileWalletService.generateLoyaltyPass(mockCustomer);
    
    // Show wallet buttons
    const walletHTML = mobileWalletService.generateWalletButton(pass);
    console.log('Generated wallet pass:', pass);
    console.log('Wallet buttons HTML:', walletHTML);
    
    alert('Wallet pass generated! Check console for details.');
  };

  const handleEnable2FA = async () => {
    const userId = 'demo-user';
    const { secret, qrCode } = await securityService.initiate2FA(userId);
    
    // In a real app, show this in a modal
    console.log('2FA Secret:', secret);
    console.log('QR Code:', qrCode);
    
    alert('2FA setup initiated! Check console for QR code.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Phase 3: Advanced Security & AI Features</h2>
        <Badge variant="outline" className="text-lg px-3 py-1">
          Enterprise Ready
        </Badge>
      </div>

      <Tabs defaultValue="hipaa" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hipaa">HIPAA Compliance</TabsTrigger>
          <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
          <TabsTrigger value="mobile-wallet">Mobile Wallet</TabsTrigger>
          <TabsTrigger value="security">Advanced Security</TabsTrigger>
        </TabsList>

        <TabsContent value="hipaa" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compliance Score</p>
                    <p className="text-2xl font-bold">
                      {complianceReport?.complianceScore?.toFixed(1) || 95}%
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Data Access Events</p>
                    <p className="text-2xl font-bold">
                      {complianceReport?.totalAccess || 1247}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <Badge className={getRiskColor(complianceReport?.riskLevel || 'low')}>
                      {(complianceReport?.riskLevel || 'low').toUpperCase()}
                    </Badge>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                HIPAA Compliance Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Compliance Progress</span>
                    <span>{complianceReport?.complianceScore?.toFixed(1) || 95}%</span>
                  </div>
                  <Progress value={complianceReport?.complianceScore || 95} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="space-y-1 text-sm">
                      {(complianceReport?.recommendations || [
                        'Regular compliance audits',
                        'Update data retention policies',
                        'Enable two-factor authentication'
                      ]).map((rec: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recent Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Data Encryptions</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Access Logs</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed Access</span>
                        <span className="font-medium text-red-600">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge className={getInsightColor(insight.type)}>
                          {insight.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          {insight.impact.toUpperCase()} Impact
                        </Badge>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            View Action
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Churn Prediction</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>High Risk Customers</span>
                        <span className="font-medium text-red-600">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medium Risk</span>
                        <span className="font-medium text-yellow-600">28</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Low Risk</span>
                        <span className="font-medium text-green-600">156</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Revenue Predictions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Next Month</span>
                        <span className="font-medium">$12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Quarter</span>
                        <span className="font-medium">$38,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth Rate</span>
                        <span className="font-medium text-green-600">+15.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mobile-wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Mobile Wallet Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Supported Wallets</h4>
                    <div className="space-y-2">
                      {walletSupport.map((wallet, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="capitalize">{wallet.name} Wallet</span>
                          <Badge variant={wallet.supported ? 'default' : 'secondary'}>
                            {wallet.supported ? 'Supported' : 'Not Available'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleGenerateWalletPass} className="w-full">
                    Generate Demo Wallet Pass
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Pass Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Real-time points updates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Location-based notifications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">QR code for quick scanning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Tier-based card design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Promotional pass support</span>
                  </div>
                </div>

                <Alert className="mt-4">
                  <Smartphone className="h-4 w-4" />
                  <AlertDescription>
                    Mobile wallet passes automatically update when points change and can send location-based notifications when customers are near participating businesses.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Security Events (24h)</p>
                    <p className="text-2xl font-bold">
                      {securityDashboard?.totalEvents || 142}
                    </p>
                  </div>
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Blocked Events</p>
                    <p className="text-2xl font-bold">
                      {securityDashboard?.blockedEvents || 3}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trusted Devices</p>
                    <p className="text-2xl font-bold">
                      {securityDashboard?.trustedDevices || 28}
                    </p>
                  </div>
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Multi-Factor Authentication</span>
                    <Button onClick={handleEnable2FA} size="sm" variant="outline">
                      Setup 2FA
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Real-time Fraud Detection</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Device Fingerprinting</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IP Reputation Checking</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Behavioral Analysis</span>
                    <Badge variant="default">Learning</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {securityService.getSecurityRecommendations().map((rec, index) => (
                    <div key={index} className="flex items-start p-2 bg-gray-50 rounded">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase3Dashboard;
