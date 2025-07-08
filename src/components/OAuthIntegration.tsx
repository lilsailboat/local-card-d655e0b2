
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { oauthService, OAuthConnection } from '@/services/oauthService';
import { transactionSyncService } from '@/services/transactionSyncService';
import { Wifi, CheckCircle, AlertCircle, RefreshCw, Unlink, Settings } from 'lucide-react';

const OAuthIntegration = () => {
  const [connections, setConnections] = useState<OAuthConnection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [syncStatus, setSyncStatus] = useState<Record<string, any>>({});

  const merchantId = 'merchant_123'; // In real app, get from auth context

  useEffect(() => {
    loadConnections();
    loadSyncStatus();
  }, []);

  const loadConnections = () => {
    const merchantConnections = oauthService.getMerchantConnections(merchantId);
    setConnections(merchantConnections);
  };

  const loadSyncStatus = () => {
    const squareStatus = transactionSyncService.getSyncStatus(merchantId, 'square');
    const cloverStatus = transactionSyncService.getSyncStatus(merchantId, 'clover');
    
    setSyncStatus({
      square: squareStatus,
      clover: cloverStatus
    });
  };

  const handleOAuthConnect = async (provider: 'square' | 'clover') => {
    try {
      setLoading(true);
      setError('');
      
      const authUrl = oauthService.generateAuthUrl(provider, merchantId);
      
      // Open OAuth flow in new window
      const authWindow = window.open(authUrl, 'oauth', 'width=600,height=700');
      
      // Listen for OAuth callback
      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'oauth_success') {
          authWindow?.close();
          
          try {
            await oauthService.exchangeCodeForToken(
              provider,
              event.data.code,
              merchantId
            );
            
            setSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} connected successfully!`);
            loadConnections();
            
            // Start initial sync
            await transactionSyncService.triggerSync(merchantId, provider);
            loadSyncStatus();
            
          } catch (err) {
            setError(`Failed to complete ${provider} connection: ${err instanceof Error ? err.message : 'Unknown error'}`);
          }
        } else if (event.data.type === 'oauth_error') {
          authWindow?.close();
          setError(`OAuth error: ${event.data.error}`);
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Cleanup listener when window closes
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);

    } catch (err) {
      setError(`Failed to initiate ${provider} connection: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (provider: 'square' | 'clover') => {
    try {
      setLoading(true);
      const connectionId = `${merchantId}_${provider}`;
      await oauthService.revokeConnection(connectionId);
      setSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} disconnected successfully`);
      loadConnections();
    } catch (err) {
      setError(`Failed to disconnect ${provider}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async (provider: 'square' | 'clover') => {
    try {
      setLoading(true);
      await transactionSyncService.triggerSync(merchantId, provider);
      setSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sync completed successfully`);
      loadSyncStatus();
    } catch (err) {
      setError(`Sync failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const getConnectionStatus = (provider: 'square' | 'clover') => {
    return connections.find(conn => conn.provider === provider && conn.isActive);
  };

  const formatLastSync = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">POS System Integration</h2>
        <p className="text-gray-600">
          Connect your Square or Clover POS system to automatically sync transactions and award loyalty points.
        </p>
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

      {/* Active Connections */}
      {connections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wifi className="h-5 w-5 mr-2 text-green-600" />
              Active Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Settings className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">{connection.provider}</h3>
                      <p className="text-sm text-gray-600">{connection.merchantInfo.businessName}</p>
                      <p className="text-xs text-gray-500">
                        Last sync: {formatLastSync(connection.lastSync)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualSync(connection.provider)}
                      disabled={loading}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(connection.provider)}
                      disabled={loading}
                    >
                      <Unlink className="h-4 w-4 mr-1" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Connect Your POS System</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="square" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="square">Square</TabsTrigger>
              <TabsTrigger value="clover">Clover</TabsTrigger>
            </TabsList>

            <TabsContent value="square" className="space-y-4">
              <div className="text-center py-6">
                {getConnectionStatus('square') ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <p className="text-green-600 font-medium">Square is connected!</p>
                    <p className="text-sm text-gray-600">
                      Transactions are being synced automatically every 5 minutes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Connect to Square</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Securely connect your Square account to start syncing transactions and awarding points automatically.
                      </p>
                      <Button
                        onClick={() => handleOAuthConnect('square')}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? 'Connecting...' : 'Connect Square Account'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="clover" className="space-y-4">
              <div className="text-center py-6">
                {getConnectionStatus('clover') ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <p className="text-green-600 font-medium">Clover is connected!</p>
                    <p className="text-sm text-gray-600">
                      Transactions are being synced automatically every 5 minutes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Connect to Clover</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Securely connect your Clover account to start syncing transactions and awarding points automatically.
                      </p>
                      <Button
                        onClick={() => handleOAuthConnect('clover')}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? 'Connecting...' : 'Connect Clover Account'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Sync Status */}
      {Object.keys(syncStatus).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Synchronization Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(syncStatus).map(([provider, status]) => (
                status && (
                  <div key={provider} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium capitalize">{provider}</h4>
                      <p className="text-sm text-gray-600">
                        Status: <span className="capitalize">{status.status}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Last sync: {formatLastSync(status.lastSyncTime)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Records processed: {status.recordsProcessed}
                      </p>
                    </div>
                    <Badge 
                      variant={status.status === 'completed' ? 'default' : 
                               status.status === 'running' ? 'secondary' : 'destructive'}
                    >
                      {status.status}
                    </Badge>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Automatic Transaction Sync</h4>
              <p className="text-sm text-gray-600">
                Real-time and scheduled sync of all payment transactions
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Secure OAuth 2.0</h4>
              <p className="text-sm text-gray-600">
                Industry-standard security with encrypted token storage
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Automatic Point Calculation</h4>
              <p className="text-sm text-gray-600">
                Points awarded automatically based on your configured rates
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Billing Integration</h4>
              <p className="text-sm text-gray-600">
                Automated billing with 3% transaction fees + $40/month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthIntegration;
