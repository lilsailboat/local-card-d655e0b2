
// Automation Workflows Service
export interface AutomationRule {
  id: string;
  name: string;
  type: 'user_reminder' | 'merchant_digest' | 'fraud_alert' | 'referral_reward' | 'challenge_completion';
  trigger: {
    event: string;
    conditions: any;
  };
  action: {
    type: string;
    parameters: any;
  };
  isActive: boolean;
  lastRun?: string;
}

export interface NotificationTemplate {
  id: string;
  type: string;
  subject: string;
  body: string;
  variables: string[];
}

export interface AutomationLog {
  id: string;
  ruleId: string;
  userId?: string;
  merchantId?: string;
  action: string;
  result: 'success' | 'failure' | 'skipped';
  timestamp: string;
  details?: any;
}

class AutomationService {
  private rules: AutomationRule[] = [
    {
      id: 'inactive_user_reminder',
      name: 'Inactive User Reminder',
      type: 'user_reminder',
      trigger: {
        event: 'user_inactive',
        conditions: { daysSinceLastTransaction: 14 }
      },
      action: {
        type: 'send_notification',
        parameters: { templateId: 'inactive_reminder' }
      },
      isActive: true
    },
    {
      id: 'weekly_merchant_digest',
      name: 'Weekly Merchant Digest',
      type: 'merchant_digest',
      trigger: {
        event: 'schedule',
        conditions: { frequency: 'weekly', day: 'monday' }
      },
      action: {
        type: 'send_digest',
        parameters: { templateId: 'weekly_summary' }
      },
      isActive: true
    },
    {
      id: 'fraud_detection_alert',
      name: 'Fraud Detection Alert',
      type: 'fraud_alert',
      trigger: {
        event: 'high_risk_score',
        conditions: { riskThreshold: 75 }
      },
      action: {
        type: 'admin_alert',
        parameters: { urgency: 'high' }
      },
      isActive: true
    }
  ];

  private templates: NotificationTemplate[] = [
    {
      id: 'inactive_reminder',
      type: 'user_notification',
      subject: 'We miss you! Come back to Local Card',
      body: 'Hi {{firstName}}, you haven\'t earned points in {{daysSince}} days. Check out new businesses in Ward {{wardNumber}}!',
      variables: ['firstName', 'daysSince', 'wardNumber']
    },
    {
      id: 'weekly_summary',
      type: 'merchant_digest',
      subject: 'Your Weekly Local Card Summary',
      body: 'This week: {{transactionCount}} transactions, {{newCustomers}} new customers, {{revenue}} revenue.',
      variables: ['transactionCount', 'newCustomers', 'revenue']
    }
  ];

  private automationLogs: AutomationLog[] = [];

  // Initialize automation workflows
  initialize() {
    console.log('Initializing automation workflows...');
    
    // Set up schedulers for different automation types
    this.setupUserInactivityChecker();
    this.setupWeeklyDigests();
    this.setupFraudMonitoring();
    this.setupReferralProcessor();
  }

  // Check for inactive users and send reminders
  private setupUserInactivityChecker() {
    setInterval(() => {
      this.checkInactiveUsers();
    }, 24 * 60 * 60 * 1000); // Check daily
  }

  private async checkInactiveUsers() {
    const rule = this.rules.find(r => r.id === 'inactive_user_reminder');
    if (!rule?.isActive) return;

    console.log('Checking for inactive users...');
    
    // Mock: Check users who haven't transacted in 14 days
    const inactiveUsers = [
      { id: 'user1', firstName: 'John', wardNumber: 1, daysSinceLastTransaction: 15 },
      { id: 'user2', firstName: 'Sarah', wardNumber: 3, daysSinceLastTransaction: 20 }
    ];

    for (const user of inactiveUsers) {
      if (user.daysSinceLastTransaction >= rule.trigger.conditions.daysSinceLastTransaction) {
        await this.sendUserReminder(user);
      }
    }

    rule.lastRun = new Date().toISOString();
  }

  // Send weekly digest to merchants
  private setupWeeklyDigests() {
    // Check every hour for scheduled digests
    setInterval(() => {
      this.checkScheduledDigests();
    }, 60 * 60 * 1000);
  }

  private async checkScheduledDigests() {
    const rule = this.rules.find(r => r.id === 'weekly_merchant_digest');
    if (!rule?.isActive) return;

    const now = new Date();
    const isMonday = now.getDay() === 1;
    const hour = now.getHours();

    // Send digest on Monday at 9 AM
    if (isMonday && hour === 9) {
      console.log('Sending weekly merchant digests...');
      await this.sendMerchantDigests();
      rule.lastRun = new Date().toISOString();
    }
  }

  // Monitor for fraudulent activity
  private setupFraudMonitoring() {
    setInterval(() => {
      this.checkForFraud();
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  private async checkForFraud() {
    const rule = this.rules.find(r => r.id === 'fraud_detection_alert');
    if (!rule?.isActive) return;

    // Mock: Check for high-risk users
    const highRiskUsers = [
      { id: 'user3', riskScore: 85, reason: 'Excessive transactions in short period' }
    ];

    for (const user of highRiskUsers) {
      if (user.riskScore >= rule.trigger.conditions.riskThreshold) {
        await this.sendFraudAlert(user);
      }
    }
  }

  // Set up referral processing
  private setupReferralProcessor() {
    // Process referrals in real-time when they occur
    console.log('Referral processor initialized');
  }

  // Send user reminder notification
  private async sendUserReminder(user: any) {
    const template = this.templates.find(t => t.id === 'inactive_reminder');
    if (!template) return;

    const message = template.body
      .replace('{{firstName}}', user.firstName)
      .replace('{{daysSince}}', user.daysSinceLastTransaction.toString())
      .replace('{{wardNumber}}', user.wardNumber.toString());

    console.log(`Sending reminder to ${user.firstName}: ${message}`);

    this.logAutomation('inactive_user_reminder', 'send_notification', 'success', {
      userId: user.id,
      message
    });
  }

  // Send merchant digest
  private async sendMerchantDigests() {
    const template = this.templates.find(t => t.id === 'weekly_summary');
    if (!template) return;

    // Mock merchant data
    const merchants = [
      { id: 'merchant1', name: 'Coffee Shop', transactionCount: 45, newCustomers: 8, revenue: 1250 },
      { id: 'merchant2', name: 'Bakery', transactionCount: 32, newCustomers: 5, revenue: 890 }
    ];

    for (const merchant of merchants) {
      const message = template.body
        .replace('{{transactionCount}}', merchant.transactionCount.toString())
        .replace('{{newCustomers}}', merchant.newCustomers.toString())
        .replace('{{revenue}}', `$${merchant.revenue}`);

      console.log(`Sending digest to ${merchant.name}: ${message}`);

      this.logAutomation('weekly_merchant_digest', 'send_digest', 'success', {
        merchantId: merchant.id,
        message
      });
    }
  }

  // Send fraud alert
  private async sendFraudAlert(user: any) {
    console.log(`FRAUD ALERT: User ${user.id} has risk score ${user.riskScore} - ${user.reason}`);

    this.logAutomation('fraud_detection_alert', 'admin_alert', 'success', {
      userId: user.id,
      riskScore: user.riskScore,
      reason: user.reason
    });
  }

  // Process referral rewards
  async processReferral(referrerId: string, newUserId: string) {
    console.log(`Processing referral: ${referrerId} referred ${newUserId}`);
    
    // Award points to referrer
    const referralPoints = 100;
    console.log(`Awarding ${referralPoints} points to referrer ${referrerId}`);

    this.logAutomation('referral_reward', 'award_points', 'success', {
      referrerId,
      newUserId,
      pointsAwarded: referralPoints
    });
  }

  // Handle challenge completion
  async processChallengeCompletion(userId: string, challengeId: string, reward: number) {
    console.log(`Challenge completed: ${challengeId} by user ${userId}, reward: ${reward} points`);

    this.logAutomation('challenge_completion', 'award_points', 'success', {
      userId,
      challengeId,
      pointsAwarded: reward
    });
  }

  // Log automation actions
  private logAutomation(ruleId: string, action: string, result: 'success' | 'failure' | 'skipped', details?: any) {
    const log: AutomationLog = {
      id: `auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId,
      action,
      result,
      timestamp: new Date().toISOString(),
      details
    };

    this.automationLogs.push(log);
  }

  // Get automation logs
  getAutomationLogs(limit: number = 100): AutomationLog[] {
    return this.automationLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Get automation rules
  getAutomationRules(): AutomationRule[] {
    return this.rules;
  }

  // Update automation rule
  updateRule(ruleId: string, updates: Partial<AutomationRule>): boolean {
    const ruleIndex = this.rules.findIndex(r => r.id === ruleId);
    if (ruleIndex === -1) return false;

    this.rules[ruleIndex] = { ...this.rules[ruleIndex], ...updates };
    return true;
  }
}

export const automationService = new AutomationService();

// Initialize automation on service load
automationService.initialize();
