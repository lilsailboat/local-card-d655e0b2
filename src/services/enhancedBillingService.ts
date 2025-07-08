
// Enhanced Billing Service with 3% Transaction Fees + $40/Month
export interface EnhancedBillingPlan {
  id: string;
  name: string;
  monthlyFee: number; // Fixed monthly fee in cents
  transactionFeePercent: number; // Percentage fee per transaction
  features: string[];
  limits: {
    maxTransactionsPerMonth?: number;
    maxPointsPerMonth?: number;
    maxCampaigns?: number;
  };
}

export interface TransactionFeeCalculation {
  transactionAmount: number;
  feePercent: number;
  feeAmount: number;
  merchantId: string;
  transactionId: string;
  calculatedAt: string;
}

export interface MonthlyBillingCycle {
  merchantId: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  monthlySubscriptionFee: number;
  totalTransactionVolume: number;
  totalTransactionFees: number;
  transactionCount: number;
  totalAmount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  invoiceId?: string;
  paidAt?: string;
}

export interface BillingAnalytics {
  merchantId: string;
  currentPeriod: {
    transactionVolume: number;
    transactionFees: number;
    projectedMonthlyTotal: number;
  };
  previousPeriod: {
    transactionVolume: number;
    transactionFees: number;
    totalBilled: number;
  };
  yearToDate: {
    transactionVolume: number;
    transactionFees: number;
    totalBilled: number;
  };
}

class EnhancedBillingService {
  private plans: Map<string, EnhancedBillingPlan> = new Map();
  private billingCycles: Map<string, MonthlyBillingCycle[]> = new Map();
  private transactionFees: Map<string, TransactionFeeCalculation[]> = new Map();

  constructor() {
    this.initializePlans();
  }

  private initializePlans(): void {
    const businessPlan: EnhancedBillingPlan = {
      id: 'business',
      name: 'Business Plan',
      monthlyFee: 4000, // $40.00
      transactionFeePercent: 0.03, // 3%
      features: [
        'POS system integration',
        'Ward-based customer targeting',
        'Campaign creation tools',
        'Real-time analytics dashboard',
        'Customer loyalty programs',
        'Transaction processing',
        'Community engagement tools',
        'Automated loyalty rewards',
        'OAuth 2.0 integration',
        'Multi-channel notifications',
        'Advanced reporting'
      ],
      limits: {
        maxTransactionsPerMonth: 10000,
        maxPointsPerMonth: 1000000,
        maxCampaigns: 10
      }
    };

    this.plans.set('business', businessPlan);
  }

  // Calculate transaction fee
  calculateTransactionFee(
    transactionAmount: number,
    merchantId: string,
    transactionId: string,
    planId: string = 'business'
  ): TransactionFeeCalculation {
    const plan = this.plans.get(planId);
    if (!plan) {
      throw new Error(`Plan ${planId} not found`);
    }

    const feeAmount = Math.round(transactionAmount * plan.transactionFeePercent);
    
    const calculation: TransactionFeeCalculation = {
      transactionAmount,
      feePercent: plan.transactionFeePercent,
      feeAmount,
      merchantId,
      transactionId,
      calculatedAt: new Date().toISOString()
    };

    // Store the calculation
    const merchantFees = this.transactionFees.get(merchantId) || [];
    merchantFees.push(calculation);
    this.transactionFees.set(merchantId, merchantFees);

    console.log(`Calculated transaction fee for ${merchantId}:`, calculation);
    
    return calculation;
  }

  // Process transaction fee in real-time
  async processTransactionFee(
    transactionAmount: number,
    merchantId: string,
    transactionId: string
  ): Promise<TransactionFeeCalculation> {
    const calculation = this.calculateTransactionFee(
      transactionAmount,
      merchantId,
      transactionId
    );

    // In a real implementation, this would be stored in database
    // and trigger billing aggregation
    
    return calculation;
  }

  // Generate monthly billing cycle
  generateMonthlyBillingCycle(
    merchantId: string,
    billingPeriodStart: string,
    billingPeriodEnd: string
  ): MonthlyBillingCycle {
    const plan = this.plans.get('business');
    if (!plan) throw new Error('Business plan not found');

    // Get all transaction fees for the period
    const merchantFees = this.transactionFees.get(merchantId) || [];
    const periodFees = merchantFees.filter(fee => {
      const feeDate = new Date(fee.calculatedAt);
      return feeDate >= new Date(billingPeriodStart) && 
             feeDate <= new Date(billingPeriodEnd);
    });

    const totalTransactionVolume = periodFees.reduce(
      (sum, fee) => sum + fee.transactionAmount, 0
    );
    const totalTransactionFees = periodFees.reduce(
      (sum, fee) => sum + fee.feeAmount, 0
    );

    const billingCycle: MonthlyBillingCycle = {
      merchantId,
      billingPeriodStart,
      billingPeriodEnd,
      monthlySubscriptionFee: plan.monthlyFee,
      totalTransactionVolume,
      totalTransactionFees,
      transactionCount: periodFees.length,
      totalAmount: plan.monthlyFee + totalTransactionFees,
      status: 'draft'
    };

    // Store billing cycle
    const merchantCycles = this.billingCycles.get(merchantId) || [];
    merchantCycles.push(billingCycle);
    this.billingCycles.set(merchantId, merchantCycles);

    console.log(`Generated billing cycle for ${merchantId}:`, billingCycle);
    
    return billingCycle;
  }

  // Calculate current period analytics
  calculateBillingAnalytics(merchantId: string): BillingAnalytics {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const merchantFees = this.transactionFees.get(merchantId) || [];

    // Current period
    const currentPeriodFees = merchantFees.filter(fee => {
      const feeDate = new Date(fee.calculatedAt);
      return feeDate >= currentMonthStart;
    });

    // Previous period
    const previousPeriodFees = merchantFees.filter(fee => {
      const feeDate = new Date(fee.calculatedAt);
      return feeDate >= previousMonthStart && feeDate <= previousMonthEnd;
    });

    // Year to date
    const ytdFees = merchantFees.filter(fee => {
      const feeDate = new Date(fee.calculatedAt);
      return feeDate >= yearStart;
    });

    // Get previous billing cycle
    const merchantCycles = this.billingCycles.get(merchantId) || [];
    const previousCycle = merchantCycles.find(cycle => {
      const cycleStart = new Date(cycle.billingPeriodStart);
      return cycleStart.getMonth() === previousMonthStart.getMonth();
    });

    const analytics: BillingAnalytics = {
      merchantId,
      currentPeriod: {
        transactionVolume: currentPeriodFees.reduce((sum, fee) => sum + fee.transactionAmount, 0),
        transactionFees: currentPeriodFees.reduce((sum, fee) => sum + fee.feeAmount, 0),
        projectedMonthlyTotal: this.calculateProjectedMonthlyTotal(currentPeriodFees, now)
      },
      previousPeriod: {
        transactionVolume: previousPeriodFees.reduce((sum, fee) => sum + fee.transactionAmount, 0),
        transactionFees: previousPeriodFees.reduce((sum, fee) => sum + fee.feeAmount, 0),
        totalBilled: previousCycle?.totalAmount || 0
      },
      yearToDate: {
        transactionVolume: ytdFees.reduce((sum, fee) => sum + fee.transactionAmount, 0),
        transactionFees: ytdFees.reduce((sum, fee) => sum + fee.feeAmount, 0),
        totalBilled: merchantCycles.reduce((sum, cycle) => sum + cycle.totalAmount, 0)
      }
    };

    return analytics;
  }

  // Calculate projected monthly total
  private calculateProjectedMonthlyTotal(
    currentPeriodFees: TransactionFeeCalculation[],
    currentDate: Date
  ): number {
    const plan = this.plans.get('business');
    if (!plan) return 0;

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const dayOfMonth = currentDate.getDate();
    const daysRemaining = daysInMonth - dayOfMonth;

    const currentFees = currentPeriodFees.reduce((sum, fee) => sum + fee.feeAmount, 0);
    const dailyAverage = currentFees / dayOfMonth;
    const projectedTransactionFees = dailyAverage * daysInMonth;

    return plan.monthlyFee + projectedTransactionFees;
  }

  // Create Stripe invoice for billing cycle
  async createStripeInvoice(billingCycle: MonthlyBillingCycle): Promise<any> {
    // Mock Stripe invoice creation
    const invoiceData = {
      customer: `cus_${billingCycle.merchantId}`,
      collection_method: 'charge_automatically',
      currency: 'usd',
      line_items: [
        {
          description: 'Monthly Subscription - Business Plan',
          amount: billingCycle.monthlySubscriptionFee,
          quantity: 1
        },
        {
          description: `Transaction Fees (3% of $${(billingCycle.totalTransactionVolume / 100).toFixed(2)})`,
          amount: billingCycle.totalTransactionFees,
          quantity: 1
        }
      ],
      metadata: {
        merchantId: billingCycle.merchantId,
        billingPeriodStart: billingCycle.billingPeriodStart,
        billingPeriodEnd: billingCycle.billingPeriodEnd,
        transactionCount: billingCycle.transactionCount.toString()
      }
    };

    console.log('Creating Stripe invoice:', invoiceData);
    
    // Mock invoice ID
    const invoiceId = `inv_${Date.now()}`;
    billingCycle.invoiceId = invoiceId;
    billingCycle.status = 'pending';

    return {
      id: invoiceId,
      ...invoiceData,
      status: 'open',
      total: billingCycle.totalAmount
    };
  }

  // Get merchant's billing history
  getBillingHistory(merchantId: string): MonthlyBillingCycle[] {
    return this.billingCycles.get(merchantId) || [];
  }

  // Get merchant's transaction fees
  getTransactionFees(merchantId: string, limit?: number): TransactionFeeCalculation[] {
    const fees = this.transactionFees.get(merchantId) || [];
    return limit ? fees.slice(-limit) : fees;
  }

  // Get current billing plan
  getCurrentPlan(planId: string = 'business'): EnhancedBillingPlan | undefined {
    return this.plans.get(planId);
  }

  // Update billing cycle status
  updateBillingCycleStatus(
    merchantId: string,
    billingCycleId: string,
    status: 'draft' | 'pending' | 'paid' | 'overdue',
    paidAt?: string
  ): void {
    const merchantCycles = this.billingCycles.get(merchantId) || [];
    const cycle = merchantCycles.find(c => c.invoiceId === billingCycleId);
    
    if (cycle) {
      cycle.status = status;
      if (paidAt) cycle.paidAt = paidAt;
      this.billingCycles.set(merchantId, merchantCycles);
    }
  }

  // Generate automatic billing for all merchants
  async generateMonthlyBilling(): Promise<void> {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const billingPeriodStart = lastMonth.toISOString();
    const billingPeriodEnd = lastMonthEnd.toISOString();

    // Get all merchants with transaction fees
    const allMerchants = Array.from(this.transactionFees.keys());

    for (const merchantId of allMerchants) {
      try {
        const billingCycle = this.generateMonthlyBillingCycle(
          merchantId,
          billingPeriodStart,
          billingPeriodEnd
        );

        await this.createStripeInvoice(billingCycle);
        
        console.log(`Generated monthly billing for merchant ${merchantId}`);
      } catch (error) {
        console.error(`Failed to generate billing for merchant ${merchantId}:`, error);
      }
    }
  }
}

export const enhancedBillingService = new EnhancedBillingService();
