
interface SecurityEvent {
  id: string;
  type: 'login' | 'data_access' | 'transaction' | 'suspicious_activity';
  userId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  blocked: boolean;
}

interface SecurityRule {
  id: string;
  name: string;
  description: string;
  type: 'rate_limit' | 'geo_fence' | 'behavior_anomaly' | 'device_fingerprint';
  enabled: boolean;
  threshold: number;
  action: 'log' | 'warn' | 'block' | 'require_2fa';
}

class SecurityService {
  private securityEvents: SecurityEvent[] = [];
  private blockedIPs: Set<string> = new Set();
  private trustedDevices: Map<string, any> = new Map();
  
  private securityRules: SecurityRule[] = [
    {
      id: 'rate_limit_login',
      name: 'Login Rate Limiting',
      description: 'Limit login attempts per IP',
      type: 'rate_limit',
      enabled: true,
      threshold: 5,
      action: 'block'
    },
    {
      id: 'geo_fence_unusual',
      name: 'Unusual Location Detection',
      description: 'Detect logins from unusual locations',
      type: 'geo_fence',
      enabled: true,
      threshold: 100, // miles from usual location
      action: 'require_2fa'
    },
    {
      id: 'behavior_anomaly',
      name: 'Behavioral Anomaly Detection',
      description: 'Detect unusual user behavior patterns',
      type: 'behavior_anomaly',
      enabled: true,
      threshold: 80, // anomaly score threshold
      action: 'warn'
    }
  ];

  // Real-time fraud detection
  detectFraud(transaction: any, userContext: any): { isFraud: boolean; riskScore: number; reasons: string[] } {
    let riskScore = 0;
    const reasons: string[] = [];

    // Amount-based risk assessment
    if (transaction.amount > userContext.averageTransaction * 5) {
      riskScore += 30;
      reasons.push('Transaction amount significantly above user average');
    }

    // Time-based risk assessment
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) {
      riskScore += 15;
      reasons.push('Transaction outside normal business hours');
    }

    // Location-based risk assessment
    if (transaction.location && userContext.usualLocation) {
      const distance = this.calculateDistance(transaction.location, userContext.usualLocation);
      if (distance > 50) {
        riskScore += 25;
        reasons.push('Transaction from unusual location');
      }
    }

    // Frequency-based risk assessment
    const recentTransactions = this.getRecentTransactions(userContext.userId, 60); // last hour
    if (recentTransactions.length > 10) {
      riskScore += 40;
      reasons.push('High transaction frequency detected');
    }

    // Device-based risk assessment
    if (!this.trustedDevices.has(userContext.deviceId)) {
      riskScore += 20;
      reasons.push('Transaction from unrecognized device');
    }

    return {
      isFraud: riskScore > 70,
      riskScore,
      reasons
    };
  }

  private calculateDistance(loc1: any, loc2: any): number {
    // Simplified distance calculation
    const lat1 = loc1.latitude * Math.PI / 180;
    const lat2 = loc2.latitude * Math.PI / 180;
    const deltaLat = (loc2.latitude - loc1.latitude) * Math.PI / 180;
    const deltaLng = (loc2.longitude - loc1.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const R = 3959; // Earth's radius in miles

    return R * c;
  }

  private getRecentTransactions(userId: string, minutes: number): any[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.securityEvents
      .filter(event => event.userId === userId && event.timestamp > cutoff)
      .filter(event => event.type === 'transaction');
  }

  // Multi-factor authentication
  async initiate2FA(userId: string): Promise<{ secret: string; qrCode: string }> {
    // Generate TOTP secret
    const secret = this.generateTOTPSecret();
    const appName = 'Local Card DC';
    const userEmail = `user${userId}@localcard.com`;
    
    // Generate QR code URL for authenticator apps
    const qrCodeUrl = `otpauth://totp/${appName}:${userEmail}?secret=${secret}&issuer=${appName}`;
    
    // In production, store the secret securely associated with the user
    localStorage.setItem(`2fa_secret_${userId}`, secret);

    return {
      secret,
      qrCode: this.generateQRCodeDataURL(qrCodeUrl)
    };
  }

  private generateTOTPSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }

  private generateQRCodeDataURL(data: string): string {
    // Simplified QR code generation
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" dy=".3em" font-family="monospace" font-size="10">
          2FA QR Code
        </text>
      </svg>
    `)}`;
  }

  verify2FA(userId: string, token: string): boolean {
    // Simplified TOTP verification
    const secret = localStorage.getItem(`2fa_secret_${userId}`);
    if (!secret) return false;

    // In production, implement proper TOTP algorithm
    const expectedToken = this.generateTOTPToken(secret);
    return token === expectedToken;
  }

  private generateTOTPToken(secret: string): string {
    // Simplified TOTP token generation
    const timeStep = Math.floor(Date.now() / 30000);
    return (timeStep % 1000000).toString().padStart(6, '0');
  }

  // Device fingerprinting
  generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvas.toDataURL(),
      plugins: Array.from(navigator.plugins).map(p => p.name).join(',')
    };

    return btoa(JSON.stringify(fingerprint));
  }

  // IP reputation checking
  async checkIPReputation(ipAddress: string): Promise<{ safe: boolean; risk: string; country?: string }> {
    // In production, integrate with IP reputation services
    const knownBadIPs = ['192.168.1.100', '10.0.0.50']; // Example bad IPs
    
    if (this.blockedIPs.has(ipAddress)) {
      return { safe: false, risk: 'blocked' };
    }

    if (knownBadIPs.includes(ipAddress)) {
      return { safe: false, risk: 'malicious' };
    }

    // Simulate geolocation lookup
    const isVPN = Math.random() < 0.1; // 10% chance to simulate VPN
    if (isVPN) {
      return { safe: false, risk: 'vpn', country: 'Unknown' };
    }

    return { safe: true, risk: 'low', country: 'US' };
  }

  // Security monitoring dashboard data
  getSecurityDashboard() {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentEvents = this.securityEvents.filter(event => event.timestamp > last24Hours);

    const eventsByType = recentEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const riskDistribution = recentEvents.reduce((acc, event) => {
      acc[event.riskLevel] = (acc[event.riskLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEvents: recentEvents.length,
      blockedEvents: recentEvents.filter(e => e.blocked).length,
      eventsByType,
      riskDistribution,
      activeRules: this.securityRules.filter(r => r.enabled).length,
      blockedIPs: this.blockedIPs.size,
      trustedDevices: this.trustedDevices.size
    };
  }

  // Log security event
  logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    this.securityEvents.push(securityEvent);

    // Apply security rules
    this.applySecurityRules(securityEvent);

    // Store in persistent storage
    const recentEvents = this.securityEvents.slice(-1000); // Keep last 1000 events
    localStorage.setItem('security_events', JSON.stringify(recentEvents));
  }

  private applySecurityRules(event: SecurityEvent): void {
    this.securityRules.forEach(rule => {
      if (!rule.enabled) return;

      switch (rule.type) {
        case 'rate_limit':
          this.applyRateLimit(event, rule);
          break;
        case 'geo_fence':
          this.applyGeoFence(event, rule);
          break;
        case 'behavior_anomaly':
          this.applyBehaviorAnalysis(event, rule);
          break;
      }
    });
  }

  private applyRateLimit(event: SecurityEvent, rule: SecurityRule): void {
    const recentSimilarEvents = this.securityEvents.filter(e => 
      e.ipAddress === event.ipAddress && 
      e.type === event.type &&
      e.timestamp > new Date(Date.now() - 60 * 60 * 1000) // last hour
    );

    if (recentSimilarEvents.length > rule.threshold) {
      if (rule.action === 'block') {
        this.blockedIPs.add(event.ipAddress);
      }
      console.warn(`Rate limit exceeded for ${event.ipAddress}`);
    }
  }

  private applyGeoFence(event: SecurityEvent, rule: SecurityRule): void {
    // Simplified geofencing - in production, use actual location data
    if (event.location && Math.random() < 0.1) { // 10% chance to trigger
      console.warn(`Unusual location detected for user ${event.userId}`);
    }
  }

  private applyBehaviorAnalysis(event: SecurityEvent, rule: SecurityRule): void {
    // Simplified behavior analysis
    const userEvents = this.securityEvents.filter(e => e.userId === event.userId);
    if (userEvents.length > 0) {
      const anomalyScore = Math.random() * 100;
      if (anomalyScore > rule.threshold) {
        console.warn(`Behavioral anomaly detected for user ${event.userId}: ${anomalyScore}`);
      }
    }
  }

  // Get security recommendations
  getSecurityRecommendations(): string[] {
    const recommendations: string[] = [];
    const dashboard = this.getSecurityDashboard();

    if (dashboard.blockedEvents > dashboard.totalEvents * 0.05) {
      recommendations.push('High number of blocked security events - review security rules');
    }

    if (dashboard.blockedIPs > 10) {
      recommendations.push('Many IP addresses blocked - consider reviewing block list');
    }

    if (this.securityRules.filter(r => r.enabled).length < 3) {
      recommendations.push('Enable more security rules for better protection');
    }

    recommendations.push('Regularly update security rules and thresholds');
    recommendations.push('Enable two-factor authentication for all admin users');
    recommendations.push('Review security logs weekly');

    return recommendations;
  }
}

export const securityService = new SecurityService();
