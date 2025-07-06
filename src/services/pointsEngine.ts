
// Automated Points Engine
export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'bonus' | 'referral';
  amount: number;
  source: string;
  sourceId: string;
  merchantId?: string;
  wardNumber?: number;
  timestamp: string;
  metadata?: any;
}

export interface UserPoints {
  userId: string;
  balance: number;
  lifetime: number;
  lastUpdated: string;
}

export interface PointsRule {
  id: string;
  name: string;
  type: 'transaction' | 'referral' | 'challenge' | 'bonus';
  rate: number;
  conditions: any;
  isActive: boolean;
}

class PointsEngine {
  private userPoints: Map<string, UserPoints> = new Map();
  private pointsTransactions: PointsTransaction[] = [];
  private rules: PointsRule[] = [
    {
      id: 'base_transaction',
      name: 'Base Transaction Points',
      type: 'transaction',
      rate: 0.02, // 2%
      conditions: { minAmount: 1 },
      isActive: true
    },
    {
      id: 'referral_bonus',
      name: 'Referral Bonus',
      type: 'referral',
      rate: 100, // 100 points per referral
      conditions: {},
      isActive: true
    }
  ];

  // Initialize user points
  initializeUser(userId: string): UserPoints {
    const userPoints: UserPoints = {
      userId,
      balance: 0,
      lifetime: 0,
      lastUpdated: new Date().toISOString()
    };
    
    this.userPoints.set(userId, userPoints);
    return userPoints;
  }

  // Process transaction for points
  async processTransaction(transaction: any): Promise<number> {
    const rule = this.rules.find(r => r.type === 'transaction' && r.isActive);
    if (!rule) return 0;

    const pointsEarned = Math.floor(transaction.amount * rule.rate * 100);
    
    await this.addPoints(transaction.userId, pointsEarned, 'transaction', transaction.id, {
      merchantId: transaction.merchantId,
      wardNumber: transaction.wardNumber,
      amount: transaction.amount
    });

    return pointsEarned;
  }

  // Add points to user account
  async addPoints(
    userId: string, 
    amount: number, 
    source: string, 
    sourceId: string, 
    metadata?: any
  ): Promise<boolean> {
    let userPoints = this.userPoints.get(userId);
    if (!userPoints) {
      userPoints = this.initializeUser(userId);
    }

    // Create points transaction
    const pointsTransaction: PointsTransaction = {
      id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'earn',
      amount,
      source,
      sourceId,
      timestamp: new Date().toISOString(),
      metadata
    };

    // Update user points
    userPoints.balance += amount;
    userPoints.lifetime += amount;
    userPoints.lastUpdated = new Date().toISOString();

    // Store transaction
    this.pointsTransactions.push(pointsTransaction);
    this.userPoints.set(userId, userPoints);

    console.log(`Added ${amount} points to user ${userId}. New balance: ${userPoints.balance}`);
    return true;
  }

  // Redeem points
  async redeemPoints(
    userId: string, 
    amount: number, 
    merchantId: string, 
    rewardId: string
  ): Promise<boolean> {
    const userPoints = this.userPoints.get(userId);
    if (!userPoints || userPoints.balance < amount) {
      throw new Error('Insufficient points balance');
    }

    // Create redemption transaction
    const pointsTransaction: PointsTransaction = {
      id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'redeem',
      amount: -amount,
      source: 'redemption',
      sourceId: rewardId,
      merchantId,
      timestamp: new Date().toISOString()
    };

    // Update user points
    userPoints.balance -= amount;
    userPoints.lastUpdated = new Date().toISOString();

    // Store transaction
    this.pointsTransactions.push(pointsTransaction);
    this.userPoints.set(userId, userPoints);

    console.log(`Redeemed ${amount} points for user ${userId}. New balance: ${userPoints.balance}`);
    return true;
  }

  // Get user points
  getUserPoints(userId: string): UserPoints | null {
    return this.userPoints.get(userId) || null;
  }

  // Get user points history
  getUserPointsHistory(userId: string): PointsTransaction[] {
    return this.pointsTransactions.filter(t => t.userId === userId);
  }

  // Process referral points
  async processReferral(referrerId: string, newUserId: string): Promise<void> {
    const rule = this.rules.find(r => r.type === 'referral' && r.isActive);
    if (!rule) return;

    await this.addPoints(referrerId, rule.rate, 'referral', newUserId);
  }

  // Auto-calculate points for ward challenges
  async checkWardChallenges(userId: string): Promise<void> {
    const userTransactions = this.pointsTransactions.filter(t => 
      t.userId === userId && 
      t.type === 'earn' && 
      t.metadata?.wardNumber
    );

    // Example: Ward challenge completion
    const ward1Transactions = userTransactions.filter(t => t.metadata?.wardNumber === 1);
    if (ward1Transactions.length >= 3) {
      await this.addPoints(userId, 500, 'challenge', 'ward1_triple_shop');
    }
  }
}

export const pointsEngine = new PointsEngine();
