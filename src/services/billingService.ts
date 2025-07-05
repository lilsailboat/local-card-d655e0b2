
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
      id: 'starter',
      name: 'Starter',
      price: 2999, // $29.99
      currency: 'usd',
      interval: 'month',
      features: ['Basic analytics', 'Up to 1000 transactions/month', 'Email support'],
      transactionFee: 0.029 // 2.9%
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 9999, // $99.99
      currency: 'usd',
      interval: 'month',
      features: ['Advanced analytics', 'Unlimited transactions', 'Priority support', 'Custom campaigns'],
      transactionFee: 0.025 // 2.5%
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 29999, // $299.99
      currency: 'usd',
      interval: 'month',
      features: ['All features', 'Dedicated support', 'Custom integrations', 'White-label options'],
      transactionFee: 0.02 // 2.0%
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
    console.log('Creating subscription:', { merchantId, planId, paymentMethodId });
    
    return {
      subscriptionId: `sub_${Date.now()}`,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      plan
    };
  }

  // Process transaction fee billing
  async processTransactionFee(merchantId: string, transactionAmount: number, planId: string) {
    const plan = this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const feeAmount = transactionAmount * plan.transactionFee;
    
    console.log('Processing transaction fee:', {
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

  // Generate invoice
  async generateInvoice(merchantId: string, items: InvoiceItem[]): Promise<Invoice> {
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

    console.log('Generated invoice:', invoice);
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

    console.log('Added payment method for merchant:', merchantId, paymentMethod);
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
