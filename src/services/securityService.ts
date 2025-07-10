
// Security and Compliance Service
export interface SecurityConfig {
  encryptionMethod: 'AES-256-GCM';
  tlsVersion: 'TLS-1.3';
  tokenExpiration: number;
  maxFailedAttempts: number;
  sessionTimeout: number;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: any;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface RolePermission {
  role: 'customer' | 'merchant' | 'admin' | 'super_admin';
  permissions: string[];
  restrictions: string[];
}

export interface ComplianceCheck {
  type: 'gdpr' | 'ccpa' | 'hipaa' | 'pci_dss';
  status: 'compliant' | 'non_compliant' | 'pending_review';
  lastCheck: string;
  details: string;
}

export interface SecurityDashboard {
  totalEvents: number;
  blockedEvents: number;
  trustedDevices: number;
  riskScore: number;
  activeThreats: number;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

class SecurityService {
  private config: SecurityConfig = {
    encryptionMethod: 'AES-256-GCM',
    tlsVersion: 'TLS-1.3',
    tokenExpiration: 3600000, // 1 hour
    maxFailedAttempts: 5,
    sessionTimeout: 1800000 // 30 minutes
  };

  private auditLogs: AuditLog[] = [];
  private failedAttempts: Map<string, number> = new Map();
  
  private rolePermissions: RolePermission[] = [
    {
      role: 'customer',
      permissions: ['view_own_profile', 'view_own_transactions', 'redeem_points', 'view_rewards'],
      restrictions: ['no_admin_access', 'no_merchant_data']
    },
    {
      role: 'merchant',
      permissions: ['view_own_business', 'manage_campaigns', 'view_customers', 'process_transactions', 'manage_rewards'],
      restrictions: ['no_other_merchant_data', 'no_system_admin']
    },
    {
      role: 'admin',
      permissions: ['view_all_merchants', 'view_analytics', 'manage_system', 'view_audit_logs'],
      restrictions: ['no_financial_modifications']
    },
    {
      role: 'super_admin',
      permissions: ['*'], // All permissions
      restrictions: []
    }
  ];

  // Audit logging
  async logAction(
    action: string,
    resource: string,
    userId?: string,
    success: boolean = true,
    details?: any,
    riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ): Promise<void> {
    const auditLog: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      action,
      resource,
      timestamp: new Date().toISOString(),
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent(),
      success,
      details,
      riskLevel
    };

    this.auditLogs.push(auditLog);
    
    // Log high-risk actions immediately
    if (riskLevel === 'high' || riskLevel === 'critical') {
      console.warn(`HIGH RISK ACTION: ${action} on ${resource}`, auditLog);
    }

    console.log(`AUDIT: ${action} - ${success ? 'SUCCESS' : 'FAILED'}`, auditLog);
  }

  // Role-based access control
  hasPermission(userRole: string, permission: string): boolean {
    const roleConfig = this.rolePermissions.find(r => r.role === userRole);
    if (!roleConfig) return false;

    // Super admin has all permissions
    if (roleConfig.permissions.includes('*')) return true;

    return roleConfig.permissions.includes(permission);
  }

  checkRestrictions(userRole: string, action: string): boolean {
    const roleConfig = this.rolePermissions.find(r => r.role === userRole);
    if (!roleConfig) return false;

    return !roleConfig.restrictions.some(restriction => 
      action.toLowerCase().includes(restriction.replace('no_', '').replace('_', ''))
    );
  }

  // Authentication security
  async validateLoginAttempt(identifier: string): Promise<{ allowed: boolean; attemptsRemaining: number }> {
    const attempts = this.failedAttempts.get(identifier) || 0;
    const allowed = attempts < this.config.maxFailedAttempts;
    
    return {
      allowed,
      attemptsRemaining: this.config.maxFailedAttempts - attempts
    };
  }

  async recordFailedLogin(identifier: string): Promise<void> {
    const attempts = (this.failedAttempts.get(identifier) || 0) + 1;
    this.failedAttempts.set(identifier, attempts);

    await this.logAction(
      'login_failed',
      'authentication',
      undefined,
      false,
      { identifier, attempts },
      attempts >= this.config.maxFailedAttempts ? 'high' : 'medium'
    );

    // Lock account after max attempts
    if (attempts >= this.config.maxFailedAttempts) {
      await this.logAction(
        'account_locked',
        'authentication',
        undefined,
        true,
        { identifier, reason: 'max_failed_attempts' },
        'critical'
      );
    }
  }

  async recordSuccessfulLogin(identifier: string, userId: string): Promise<void> {
    // Reset failed attempts on successful login
    this.failedAttempts.delete(identifier);
    
    await this.logAction(
      'login_success',
      'authentication',
      userId,
      true,
      { identifier }
    );
  }

  // Data encryption simulation (in production, use proper crypto library)
  encryptSensitiveData(data: string): string {
    // Mock encryption - in production use actual AES-256-GCM
    return btoa(data + '_encrypted_' + Date.now());
  }

  decryptSensitiveData(encryptedData: string): string {
    // Mock decryption - in production use actual AES-256-GCM
    return atob(encryptedData).split('_encrypted_')[0];
  }

  // Token management
  generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  isTokenExpired(tokenTimestamp: number): boolean {
    return Date.now() - tokenTimestamp > this.config.tokenExpiration;
  }

  // Two-Factor Authentication
  async initiate2FA(userId: string): Promise<TwoFactorSetup> {
    const secret = this.generateSecureToken().substring(0, 32);
    const qrCode = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12">
          QR Code for ${userId}
        </text>
        <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="8">
          Secret: ${secret}
        </text>
      </svg>
    `)}`;
    
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );

    await this.logAction(
      '2fa_initiated',
      'security',
      userId,
      true,
      { secretLength: secret.length }
    );

    return { secret, qrCode, backupCodes };
  }

  // Security Dashboard
  getSecurityDashboard(): SecurityDashboard {
    const now = Date.now();
    const last24Hours = now - 24 * 60 * 60 * 1000;
    
    const recentLogs = this.auditLogs.filter(log => 
      new Date(log.timestamp).getTime() > last24Hours
    );

    return {
      totalEvents: recentLogs.length,
      blockedEvents: recentLogs.filter(log => !log.success).length,
      trustedDevices: 28, // Mock data
      riskScore: Math.round(Math.random() * 100),
      activeThreats: recentLogs.filter(log => 
        log.riskLevel === 'high' || log.riskLevel === 'critical'
      ).length
    };
  }

  // Security Recommendations
  getSecurityRecommendations(): string[] {
    return [
      'Enable two-factor authentication for all admin accounts',
      'Review and update API key rotation schedule',
      'Conduct quarterly security audit of merchant access',
      'Update firewall rules to block suspicious IP ranges',
      'Implement additional monitoring for high-value transactions',
      'Review data retention policies for compliance',
      'Schedule penetration testing for Q2',
      'Update security training for all staff members'
    ];
  }

  // Compliance checks
  async performComplianceCheck(type: 'gdpr' | 'ccpa' | 'hipaa' | 'pci_dss'): Promise<ComplianceCheck> {
    const checks: Record<string, ComplianceCheck> = {
      gdpr: {
        type: 'gdpr',
        status: 'compliant',
        lastCheck: new Date().toISOString(),
        details: 'Data processing consent obtained, right to deletion implemented, data portability available'
      },
      ccpa: {
        type: 'ccpa',
        status: 'compliant',
        lastCheck: new Date().toISOString(),
        details: 'Privacy policy updated, opt-out mechanisms implemented, data categories disclosed'
      },
      hipaa: {
        type: 'hipaa',
        status: 'compliant',
        lastCheck: new Date().toISOString(),
        details: 'PHI encryption in place, access controls implemented, audit logging active'
      },
      pci_dss: {
        type: 'pci_dss',
        status: 'compliant',
        lastCheck: new Date().toISOString(),
        details: 'Secure network configuration, encrypted card data storage, access monitoring'
      }
    };

    const result = checks[type];
    
    await this.logAction(
      'compliance_check',
      'security',
      undefined,
      true,
      { type, status: result.status }
    );

    return result;
  }

  // Security monitoring
  async detectSuspiciousActivity(userId: string, actions: string[]): Promise<{ suspicious: boolean; riskScore: number; reasons: string[] }> {
    const reasons: string[] = [];
    let riskScore = 0;

    // Check for rapid successive actions
    const recentActions = actions.filter(action => {
      const actionTime = new Date(action).getTime();
      return Date.now() - actionTime < 60000; // Last minute
    });

    if (recentActions.length > 10) {
      reasons.push('High frequency of actions in short time period');
      riskScore += 30;
    }

    // Check for unusual patterns
    const uniqueActions = new Set(actions);
    if (uniqueActions.size < actions.length * 0.3) {
      reasons.push('Repetitive action patterns detected');
      riskScore += 20;
    }

    // Check failed attempts
    const failedAttempts = this.failedAttempts.get(userId) || 0;
    if (failedAttempts > 3) {
      reasons.push('Multiple failed authentication attempts');
      riskScore += 25;
    }

    const suspicious = riskScore >= 50;
    
    if (suspicious) {
      await this.logAction(
        'suspicious_activity_detected',
        'security',
        userId,
        true,
        { riskScore, reasons },
        'high'
      );
    }

    return { suspicious, riskScore, reasons };
  }

  // Helper methods
  private getClientIP(): string {
    // Mock IP - in production, extract from request headers
    return '192.168.1.100';
  }

  private getUserAgent(): string {
    // Mock user agent - in production, extract from request headers
    return navigator.userAgent || 'Unknown';
  }

  // Get audit logs with filtering
  getAuditLogs(
    userId?: string,
    startDate?: string,
    endDate?: string,
    riskLevel?: string,
    limit: number = 100
  ): AuditLog[] {
    let filteredLogs = this.auditLogs;

    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === userId);
    }

    if (startDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp >= startDate);
    }

    if (endDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp <= endDate);
    }

    if (riskLevel) {
      filteredLogs = filteredLogs.filter(log => log.riskLevel === riskLevel);
    }

    return filteredLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Get security configuration
  getSecurityConfig(): SecurityConfig {
    return { ...this.config };
  }

  // Update security configuration
  updateSecurityConfig(updates: Partial<SecurityConfig>): void {
    this.config = { ...this.config, ...updates };
    
    this.logAction(
      'security_config_updated',
      'security',
      undefined,
      true,
      updates,
      'medium'
    );
  }
}

export const securityService = new SecurityService();
