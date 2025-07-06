
// Enhanced Analytics Service
export interface UserAnalytics {
  userId: string;
  totalSpent: number;
  totalPoints: number;
  transactionCount: number;
  averageTransaction: number;
  favoriteWard: number;
  favoriteCategory: string;
  lastActivity: string;
  cohort: 'new' | 'regular' | 'vip';
  riskScore: number;
}

export interface MerchantAnalytics {
  merchantId: string;
  wardNumber: number;
  totalRevenue: number;
  transactionCount: number;
  uniqueCustomers: number;
  averageTransaction: number;
  pointsIssued: number;
  redemptions: number;
  customerRetention: number;
  wardRanking: number;
  monthlyGrowth: number;
}

export interface WardAnalytics {
  wardNumber: number;
  totalRevenue: number;
  activeMerchants: number;
  activeUsers: number;
  transactionCount: number;
  averageSpend: number;
  topCategories: string[];
  growthRate: number;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalMerchants: number;
  activeMerchants: number;
  totalRevenue: number;
  pointsIssued: number;
  redemptionRate: number;
  averageLifetimeValue: number;
  churnRate: number;
  referralRate: number;
}

class AnalyticsService {
  private userAnalytics: Map<string, UserAnalytics> = new Map();
  private merchantAnalytics: Map<string, MerchantAnalytics> = new Map();
  private wardAnalytics: Map<number, WardAnalytics> = new Map();

  // Calculate user analytics
  calculateUserAnalytics(userId: string, transactions: any[], pointsHistory: any[]): UserAnalytics {
    const userTransactions = transactions.filter(t => t.userId === userId);
    const totalSpent = userTransactions.reduce((sum, t) => sum + t.amount, 0);
    const transactionCount = userTransactions.length;
    const averageTransaction = transactionCount > 0 ? totalSpent / transactionCount : 0;
    
    // Determine favorite ward
    const wardCounts: Record<string, number> = userTransactions.reduce((acc, t) => {
      const ward = String(t.wardNumber);
      acc[ward] = (acc[ward] || 0) + 1;
      return acc;
    }, {});
    
    const favoriteWardKey = Object.keys(wardCounts).reduce((a, b) => 
      wardCounts[a] > wardCounts[b] ? a : b, '0'
    );

    // Determine cohort
    let cohort: 'new' | 'regular' | 'vip' = 'new';
    if (transactionCount > 10) cohort = 'regular';
    if (transactionCount > 50 || totalSpent > 5000) cohort = 'vip';

    // Calculate risk score (fraud detection)
    const riskScore = this.calculateRiskScore(userTransactions, pointsHistory);

    const analytics: UserAnalytics = {
      userId,
      totalSpent,
      totalPoints: pointsHistory.reduce((sum, p) => sum + p.amount, 0),
      transactionCount,
      averageTransaction,
      favoriteWard: parseInt(favoriteWardKey) || 0,
      favoriteCategory: 'Food and Drink', // Mock for now
      lastActivity: userTransactions[userTransactions.length - 1]?.date || new Date().toISOString(),
      cohort,
      riskScore
    };

    this.userAnalytics.set(userId, analytics);
    return analytics;
  }

  // Calculate merchant analytics with ward benchmarking
  calculateMerchantAnalytics(merchantId: string, wardNumber: number, transactions: any[]): MerchantAnalytics {
    const merchantTransactions = transactions.filter(t => t.merchantId === merchantId);
    const totalRevenue = merchantTransactions.reduce((sum, t) => sum + t.amount, 0);
    const transactionCount = merchantTransactions.length;
    const uniqueCustomers = new Set(merchantTransactions.map(t => t.userId)).size;
    const averageTransaction = transactionCount > 0 ? totalRevenue / transactionCount : 0;

    // Calculate ward ranking
    const wardMerchants = this.getWardMerchants(wardNumber);
    const wardRanking = this.calculateWardRanking(merchantId, wardMerchants);

    // Calculate retention rate
    const customerRetention = this.calculateRetentionRate(merchantTransactions);

    const analytics: MerchantAnalytics = {
      merchantId,
      wardNumber,
      totalRevenue,
      transactionCount,
      uniqueCustomers,
      averageTransaction,
      pointsIssued: merchantTransactions.length * 50, // Mock calculation
      redemptions: Math.floor(merchantTransactions.length * 0.1), // 10% redemption rate
      customerRetention,
      wardRanking,
      monthlyGrowth: 15.5 // Mock percentage
    };

    this.merchantAnalytics.set(merchantId, analytics);
    return analytics;
  }

  // Calculate ward-level analytics
  calculateWardAnalytics(wardNumber: number, transactions: any[], merchants: any[]): WardAnalytics {
    const wardTransactions = transactions.filter(t => t.wardNumber === wardNumber);
    const wardMerchants = merchants.filter(m => m.wardNumber === wardNumber);
    
    const totalRevenue = wardTransactions.reduce((sum, t) => sum + t.amount, 0);
    const activeUsers = new Set(wardTransactions.map(t => t.userId)).size;

    const analytics: WardAnalytics = {
      wardNumber,
      totalRevenue,
      activeMerchants: wardMerchants.length,
      activeUsers,
      transactionCount: wardTransactions.length,
      averageSpend: wardTransactions.length > 0 ? totalRevenue / wardTransactions.length : 0,
      topCategories: ['Food and Drink', 'Retail', 'Services'], // Mock
      growthRate: 22.3 // Mock percentage
    };

    this.wardAnalytics.set(wardNumber, analytics);
    return analytics;
  }

  // Calculate platform-wide metrics
  calculatePlatformMetrics(users: any[], merchants: any[], transactions: any[]): PlatformMetrics {
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    const activeUsers = new Set(transactions.map(t => t.userId)).size;
    const activeMerchants = new Set(transactions.map(t => t.merchantId)).size;

    return {
      totalUsers: users.length,
      activeUsers,
      totalMerchants: merchants.length,
      activeMerchants,
      totalRevenue,
      pointsIssued: transactions.length * 50, // Mock
      redemptionRate: 0.12, // 12%
      averageLifetimeValue: totalRevenue / users.length,
      churnRate: 0.05, // 5%
      referralRate: 0.08 // 8%
    };
  }

  // Calculate risk score for fraud detection
  private calculateRiskScore(transactions: any[], pointsHistory: any[]): number {
    let riskScore = 0;
    
    // Check for unusual transaction patterns
    const last24Hours = transactions.filter(t => 
      new Date(t.date) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );
    
    if (last24Hours.length > 20) riskScore += 30; // Too many transactions
    if (pointsHistory.some(p => p.amount > 10000)) riskScore += 25; // Large point gains
    
    // Check for duplicate transactions
    const amounts = transactions.map(t => t.amount);
    const duplicates = amounts.filter((a, i) => amounts.indexOf(a) !== i);
    if (duplicates.length > 5) riskScore += 20;

    return Math.min(riskScore, 100);
  }

  // Helper methods
  private getWardMerchants(wardNumber: number): any[] {
    // Mock implementation
    return [];
  }

  private calculateWardRanking(merchantId: string, wardMerchants: any[]): number {
    // Mock implementation - return rank out of ward merchants
    return Math.floor(Math.random() * wardMerchants.length) + 1;
  }

  private calculateRetentionRate(transactions: any[]): number {
    // Mock calculation for customer retention
    const uniqueCustomers = new Set(transactions.map(t => t.userId));
    const returningCustomers = new Set();
    
    uniqueCustomers.forEach(customerId => {
      const customerTransactions = transactions.filter(t => t.userId === customerId);
      if (customerTransactions.length > 1) {
        returningCustomers.add(customerId);
      }
    });

    return uniqueCustomers.size > 0 ? (returningCustomers.size / uniqueCustomers.size) * 100 : 0;
  }

  // Get analytics data
  getUserAnalytics(userId: string): UserAnalytics | undefined {
    return this.userAnalytics.get(userId);
  }

  getMerchantAnalytics(merchantId: string): MerchantAnalytics | undefined {
    return this.merchantAnalytics.get(merchantId);
  }

  getWardAnalytics(wardNumber: number): WardAnalytics | undefined {
    return this.wardAnalytics.get(wardNumber);
  }
}

export const analyticsService = new AnalyticsService();
