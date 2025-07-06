
// Billing and Payments Service
export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  transactionFee: number; // Percentage fee per transaction
}

export interface Invoice {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdAt: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  isDefault: boolean;
}

class BillingService {
  private plans: BillingPlan[] = [
    {
      id: 'business',
      name: 'Business Plan',
      price: 4000, // $40.00
      currency: 'usd',
      interval: 'month',
      features: [
        'POS system integration', 
        'Ward-based customer targeting', 
        'Campaign creation tools',
        'Real-time analytics dashboard', 
        'Customer loyalty programs', 
        'Transaction processing',
        'Community engagement tools',
        'Automated loyalty rewards'
      ],
      transactionFee: 0.03 // 3%
    }
  ];

  // Get available billing plans
  getPlans(): BillingPlan[] {
    return this.plans;
  }

  // Get plan by ID
  getPlan(planId: string): BillingPlan | undefined {
    return this.plans.find(plan => plan.id === planId);
  }

  // Mock Stripe integration for subscription management
  async createSubscription(merchantId: string, planId: string, paymentMethodId: string) {
    const plan = this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    // Mock Stripe subscription creation
    console.log('Creating business subscription:', { merchantId, planId, paymentMethodId });
    
    return {
      subscriptionId: `sub_${Date.now()}`,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      plan
    };
  }

  // Process transaction fee billing (3% of Local Card purchases)
  async processTransactionFee(merchantId: string, transactionAmount: number, planId: string = 'business') {
    const plan = this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const feeAmount = transactionAmount * plan.transactionFee;
    
    console.log('Processing Local Card transaction fee:', {
      merchantId,
      transactionAmount,
      feeAmount,
      feePercentage: plan.transactionFee
    });

    return {
      feeAmount,
      feePercentage: plan.transactionFee,
      processed: true
    };
  }

  // Calculate monthly business earnings projection
  calculateBusinessEarnings(monthlyRevenue: number, localCardPercentage: number = 0.25): {
    grossLocalCardRevenue: number;
    transactionFees: number;
    netEarnings: number;
    monthlySubscription: number;
  } {
    const grossLocalCardRevenue = monthlyRevenue * localCardPercentage;
    const transactionFees = grossLocalCardRevenue * 0.03; // 3% fee
    const monthlySubscription = 40; // $40/month
    const netEarnings = grossLocalCardRevenue - transactionFees - monthlySubscription;

    return {
      grossLocalCardRevenue,
      transactionFees,
      netEarnings,
      monthlySubscription
    };
  }

  // Generate invoice for business
  async generateBusinessInvoice(merchantId: string, monthlyRevenue: number): Promise<Invoice> {
    const earnings = this.calculateBusinessEarnings(monthlyRevenue);
    
    const items: InvoiceItem[] = [
      {
        description: 'Monthly Subscription - Business Plan',
        amount: 4000, // $40.00 in cents
        quantity: 1
      },
      {
        description: 'Transaction Fees (3% of Local Card sales)',
        amount: Math.round(earnings.transactionFees * 100), // Convert to cents
        quantity: 1
      }
    ];

    const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    
    const invoice: Invoice = {
      id: `inv_${Date.now()}`,
      merchantId,
      amount: totalAmount,
      currency: 'usd',
      status: 'pending',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      createdAt: new Date().toISOString(),
      items
    };

    console.log('Generated business invoice:', invoice);
    return invoice;
  }

  // Mock payment method management
  async addPaymentMethod(merchantId: string, cardToken: string): Promise<PaymentMethod> {
    // Mock adding payment method
    const paymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4: '4242',
      brand: 'visa',
      isDefault: true
    };

    console.log('Added payment method for business:', merchantId, paymentMethod);
    return paymentMethod;
  }

  // Get payment methods for merchant
  async getPaymentMethods(merchantId: string): Promise<PaymentMethod[]> {
    // Mock payment methods
    return [
      {
        id: 'pm_123',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        isDefault: true
      }
    ];
  }
}

export const billingService = new BillingService();
