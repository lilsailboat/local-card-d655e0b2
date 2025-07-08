
// OAuth 2.0 Service for Square and Clover Integration
export interface OAuthProvider {
  name: 'square' | 'clover';
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
  authUrl: string;
  tokenUrl: string;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  scope: string;
  tokenType: string;
}

export interface OAuthConnection {
  id: string;
  merchantId: string;
  provider: 'square' | 'clover';
  tokens: OAuthTokens;
  isActive: boolean;
  lastSync: string;
  merchantInfo: {
    businessName: string;
    locationId: string;
    currency: string;
  };
}

class OAuthService {
  private connections: Map<string, OAuthConnection> = new Map();
  
  private providers: Record<string, OAuthProvider> = {
    square: {
      name: 'square',
      clientId: process.env.SQUARE_CLIENT_ID || '',
      clientSecret: process.env.SQUARE_CLIENT_SECRET || '',
      redirectUri: `${window.location.origin}/oauth/square/callback`,
      scope: ['MERCHANT_PROFILE_READ', 'PAYMENTS_READ', 'ORDERS_READ'],
      authUrl: 'https://connect.squareup.com/oauth2/authorize',
      tokenUrl: 'https://connect.squareup.com/oauth2/token'
    },
    clover: {
      name: 'clover',
      clientId: process.env.CLOVER_CLIENT_ID || '',
      clientSecret: process.env.CLOVER_CLIENT_SECRET || '',
      redirectUri: `${window.location.origin}/oauth/clover/callback`,
      scope: ['read:orders', 'read:payments', 'read:merchants'],
      authUrl: 'https://sandbox-dev.clover.com/oauth/authorize',
      tokenUrl: 'https://sandbox-dev.clover.com/oauth/token'
    }
  };

  // Generate OAuth authorization URL
  generateAuthUrl(provider: 'square' | 'clover', merchantId: string, state?: string): string {
    const config = this.providers[provider];
    if (!config) throw new Error(`Unsupported provider: ${provider}`);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope.join(' '),
      state: state || `${provider}_${merchantId}_${Date.now()}`
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(
    provider: 'square' | 'clover',
    code: string,
    merchantId: string
  ): Promise<OAuthTokens> {
    const config = this.providers[provider];
    if (!config) throw new Error(`Unsupported provider: ${provider}`);

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri
    });

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: body.toString()
    });

    if (!response.ok) {
      throw new Error(`OAuth token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    const tokens: OAuthTokens = {
      accessToken: this.encryptToken(data.access_token),
      refreshToken: data.refresh_token ? this.encryptToken(data.refresh_token) : undefined,
      expiresAt: Date.now() + (data.expires_in * 1000),
      scope: data.scope || config.scope.join(' '),
      tokenType: data.token_type || 'Bearer'
    };

    // Store the connection
    await this.storeConnection(merchantId, provider, tokens);

    return tokens;
  }

  // Refresh access token
  async refreshToken(connectionId: string): Promise<OAuthTokens> {
    const connection = this.connections.get(connectionId);
    if (!connection || !connection.tokens.refreshToken) {
      throw new Error('No refresh token available');
    }

    const config = this.providers[connection.provider];
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.decryptToken(connection.tokens.refreshToken),
      client_id: config.clientId,
      client_secret: config.clientSecret
    });

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: body.toString()
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    const newTokens: OAuthTokens = {
      accessToken: this.encryptToken(data.access_token),
      refreshToken: data.refresh_token ? this.encryptToken(data.refresh_token) : connection.tokens.refreshToken,
      expiresAt: Date.now() + (data.expires_in * 1000),
      scope: data.scope || connection.tokens.scope,
      tokenType: data.token_type || 'Bearer'
    };

    // Update stored connection
    connection.tokens = newTokens;
    this.connections.set(connectionId, connection);

    return newTokens;
  }

  // Store OAuth connection securely
  private async storeConnection(
    merchantId: string,
    provider: 'square' | 'clover',
    tokens: OAuthTokens
  ): Promise<void> {
    const connectionId = `${merchantId}_${provider}`;
    
    // Fetch merchant info from provider
    const merchantInfo = await this.fetchMerchantInfo(provider, tokens.accessToken);
    
    const connection: OAuthConnection = {
      id: connectionId,
      merchantId,
      provider,
      tokens,
      isActive: true,
      lastSync: new Date().toISOString(),
      merchantInfo
    };

    this.connections.set(connectionId, connection);
    
    // In a real implementation, store this securely in database
    console.log(`Stored OAuth connection for ${provider}:`, {
      merchantId,
      provider,
      isActive: true,
      merchantInfo
    });
  }

  // Fetch merchant information from provider
  private async fetchMerchantInfo(
    provider: 'square' | 'clover',
    accessToken: string
  ): Promise<any> {
    const token = this.decryptToken(accessToken);
    
    if (provider === 'square') {
      const response = await fetch('https://connect.squareup.com/v2/merchants', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Square-Version': '2023-10-18'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch Square merchant info');
      const data = await response.json();
      
      return {
        businessName: data.merchant?.[0]?.business_name || 'Unknown',
        locationId: data.merchant?.[0]?.main_location_id || '',
        currency: data.merchant?.[0]?.currency || 'USD'
      };
    }
    
    if (provider === 'clover') {
      const response = await fetch('https://sandbox-dev.clover.com/v3/merchants/current', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch Clover merchant info');
      const data = await response.json();
      
      return {
        businessName: data.name || 'Unknown',
        locationId: data.id || '',
        currency: data.currency || 'USD'
      };
    }

    return { businessName: 'Unknown', locationId: '', currency: 'USD' };
  }

  // Simple encryption/decryption (in production, use proper encryption)
  private encryptToken(token: string): string {
    // In production, use AES-256 encryption
    return btoa(token);
  }

  private decryptToken(encryptedToken: string): string {
    // In production, use AES-256 decryption
    return atob(encryptedToken);
  }

  // Revoke OAuth connection
  async revokeConnection(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) throw new Error('Connection not found');

    const config = this.providers[connection.provider];
    const token = this.decryptToken(connection.tokens.accessToken);

    try {
      // Revoke token with provider
      if (connection.provider === 'square') {
        await fetch('https://connect.squareup.com/oauth2/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Client ${config.clientSecret}`
          },
          body: JSON.stringify({
            access_token: token,
            client_id: config.clientId
          })
        });
      }

      // Mark connection as inactive
      connection.isActive = false;
      this.connections.set(connectionId, connection);
      
      console.log(`Revoked OAuth connection: ${connectionId}`);
    } catch (error) {
      console.error('Error revoking token:', error);
      throw error;
    }
  }

  // Get connection status
  getConnection(merchantId: string, provider: 'square' | 'clover'): OAuthConnection | undefined {
    const connectionId = `${merchantId}_${provider}`;
    return this.connections.get(connectionId);
  }

  // Check if token needs refresh
  needsRefresh(connection: OAuthConnection): boolean {
    const buffer = 5 * 60 * 1000; // 5 minutes buffer
    return Date.now() >= (connection.tokens.expiresAt - buffer);
  }

  // Get all connections for merchant
  getMerchantConnections(merchantId: string): OAuthConnection[] {
    return Array.from(this.connections.values())
      .filter(conn => conn.merchantId === merchantId);
  }
}

export const oauthService = new OAuthService();
