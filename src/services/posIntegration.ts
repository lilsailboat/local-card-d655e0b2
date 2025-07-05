
// POS System Integration Service
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  merchantId: string;
  customerId?: string;
  items: TransactionItem[];
  location: string;
  paymentMethod: string;
}

export interface TransactionItem {
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface POSProvider {
  name: 'toast' | 'clover' | 'square';
  apiKey: string;
  webhookUrl: string;
  isActive: boolean;
}

class POSIntegrationService {
  private providers: Map<string, POSProvider> = new Map();

  // Register POS provider
  registerProvider(merchantId: string, provider: POSProvider) {
    this.providers.set(merchantId, provider);
  }

  // Toast POS Integration
  async setupToastIntegration(merchantId: string, apiKey: string) {
    const provider: POSProvider = {
      name: 'toast',
      apiKey,
      webhookUrl: `${window.location.origin}/api/webhooks/toast/${merchantId}`,
      isActive: true
    };
    
    this.providers.set(merchantId, provider);
    
    // Mock Toast API setup
    console.log('Setting up Toast integration for merchant:', merchantId);
    return { success: true, webhookUrl: provider.webhookUrl };
  }

  // Clover POS Integration
  async setupCloverIntegration(merchantId: string, apiKey: string) {
    const provider: POSProvider = {
      name: 'clover',
      apiKey,
      webhookUrl: `${window.location.origin}/api/webhooks/clover/${merchantId}`,
      isActive: true
    };
    
    this.providers.set(merchantId, provider);
    
    // Mock Clover API setup
    console.log('Setting up Clover integration for merchant:', merchantId);
    return { success: true, webhookUrl: provider.webhookUrl };
  }

  // Square POS Integration
  async setupSquareIntegration(merchantId: string, apiKey: string) {
    const provider: POSProvider = {
      name: 'square',
      apiKey,
      webhookUrl: `${window.location.origin}/api/webhooks/square/${merchantId}`,
      isActive: true
    };
    
    this.providers.set(merchantId, provider);
    
    // Mock Square API setup
    console.log('Setting up Square integration for merchant:', merchantId);
    return { success: true, webhookUrl: provider.webhookUrl };
  }

  // Process transaction from POS webhook
  async processTransaction(merchantId: string, transaction: Transaction) {
    const provider = this.providers.get(merchantId);
    if (!provider) {
      throw new Error('POS provider not found for merchant');
    }

    // Calculate points based on transaction amount (1% cash back as points)
    const pointsEarned = Math.floor(transaction.amount * 0.01 * 100); // Points in cents

    // Mock processing - in real app, this would update user points
    console.log(`Processing ${provider.name} transaction:`, {
      merchantId,
      amount: transaction.amount,
      pointsEarned,
      customerId: transaction.customerId
    });

    return {
      success: true,
      pointsEarned,
      transactionId: transaction.id
    };
  }

  // Get provider for merchant
  getProvider(merchantId: string): POSProvider | undefined {
    return this.providers.get(merchantId);
  }

  // List all providers for merchant
  listProviders(): POSProvider[] {
    return Array.from(this.providers.values());
  }
}

export const posIntegrationService = new POSIntegrationService();
