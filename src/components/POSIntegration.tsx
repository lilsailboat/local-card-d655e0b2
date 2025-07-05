
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { posIntegrationService, POSProvider } from '@/services/posIntegration';
import { CreditCard, Wifi, CheckCircle, AlertCircle } from 'lucide-react';

const POSIntegration = () => {
  const [activeIntegrations, setActiveIntegrations] = useState<POSProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [apiKeys, setApiKeys] = useState({
    toast: '',
    clover: '',
    square: ''
  });

  const handleIntegrationSetup = async (provider: 'toast' | 'clover' | 'square') => {
    const apiKey = apiKeys[provider];
    if (!apiKey) {
      setError('Please enter an API key');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const merchantId = 'merchant_123'; // In real app, get from auth context
      let result;

      switch (provider) {
        case 'toast':
          result = await posIntegrationService.setupToastIntegration(merchantId, apiKey);
          break;
        case 'clover':
          result = await posIntegrationService.setupCloverIntegration(merchantId, apiKey);
          break;
        case 'square':
          result = await posIntegrationService.setupSquareIntegration(merchantId, apiKey);
          break;
      }

      if (result.success) {
        setSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} integration setup successfully!`);
        setApiKeys({ ...apiKeys, [provider]: '' });
        
        // Update active integrations
        const updatedProvider = posIntegrationService.getProvider(merchantId);
        if (updatedProvider) {
          setActiveIntegrations(prev => [...prev.filter(p => p.name !== provider), updatedProvider]);
        }
      }
    } catch (err) {
      setError(`Failed to setup ${provider} integration: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">POS System Integration</h2>
        <p className="text-gray-600">Connect your point-of-sale system to automatically track transactions and award points.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Active Integrations */}
      {activeIntegrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wifi className="h-5 w-5 mr-2 text-green-600" />
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeIntegrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">{integration.name}</p>
                      <p className="text-sm text-gray-500">Connected and active</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Setup New Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="toast" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="toast">Toast</TabsTrigger>
              <TabsTrigger value="clover">Clover</TabsTrigger>
              <TabsTrigger value="square">Square</TabsTrigger>
            </TabsList>

            <TabsContent value="toast" className="space-y-4">
              <div>
                <Label htmlFor="toast-api">Toast API Key</Label>
                <Input
                  id="toast-api"
                  type="password"
                  placeholder="Enter your Toast API key"
                  value={apiKeys.toast}
                  onChange={(e) => setApiKeys({ ...apiKeys, toast: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Find your API key in Toast Dashboard → Integrations → API Keys
                </p>
              </div>
              <Button 
                onClick={() => handleIntegrationSetup('toast')} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Connecting...' : 'Connect Toast POS'}
              </Button>
            </TabsContent>

            <TabsContent value="clover" className="space-y-4">
              <div>
                <Label htmlFor="clover-api">Clover API Key</Label>
                <Input
                  id="clover-api"
                  type="password"
                  placeholder="Enter your Clover API key"
                  value={apiKeys.clover}
                  onChange={(e) => setApiKeys({ ...apiKeys, clover: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Find your API key in Clover Dashboard → Setup → API Tokens
                </p>
              </div>
              <Button 
                onClick={() => handleIntegrationSetup('clover')} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Connecting...' : 'Connect Clover POS'}
              </Button>
            </TabsContent>

            <TabsContent value="square" className="space-y-4">
              <div>
                <Label htmlFor="square-api">Square Access Token</Label>
                <Input
                  id="square-api"
                  type="password"
                  placeholder="Enter your Square access token"
                  value={apiKeys.square}
                  onChange={(e) => setApiKeys({ ...apiKeys, square: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Find your access token in Square Dashboard → Apps → My Apps → [Your App] → Credentials
                </p>
              </div>
              <Button 
                onClick={() => handleIntegrationSetup('square')} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Connecting...' : 'Connect Square POS'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Automatic Point Tracking</h4>
              <p className="text-sm text-gray-600">Points are automatically awarded when customers make purchases</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Real-time Analytics</h4>
              <p className="text-sm text-gray-600">See transaction data and customer behavior in real-time</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Seamless Experience</h4>
              <p className="text-sm text-gray-600">No additional hardware or training required</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Secure Processing</h4>
              <p className="text-sm text-gray-600">All transactions are processed securely with encryption</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSIntegration;
