
// Enhanced Transaction Synchronization Service
import { oauthService, OAuthConnection } from './oauthService';

export interface SyncJob {
  id: string;
  merchantId: string;
  provider: 'square' | 'clover';
  status: 'pending' | 'running' | 'completed' | 'failed';
  lastSyncTime: string;
  nextSyncTime: string;
  recordsProcessed: number;
  errors: string[];
}

export interface TransactionData {
  id: string;
  externalId: string;
  merchantId: string;
  amount: number;
  currency: string;
  timestamp: string;
  customerId?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: TransactionItem[];
  paymentMethod: string;
  status: 'completed' | 'refunded' | 'failed';
  metadata: Record<string, any>;
}

export interface TransactionItem {
  name: string;
  price: number;
  quantity: number;
  category?: string;
  sku?: string;
}

export interface SyncResult {
  success: boolean;
  recordsProcessed: number;
  errors: string[];
  lastSyncTime: string;
}

class TransactionSyncService {
  private syncJobs: Map<string, SyncJob> = new Map();
  private syncInterval: number = 5 * 60 * 1000; // 5 minutes
  private runningJobs: Set<string> = new Set();

  // Schedule periodic sync for all merchant connections
  startPeriodicSync(): void {
    setInterval(() => {
      this.syncAllMerchants();
    }, this.syncInterval);
    console.log('Started periodic transaction sync');
  }

  // Sync transactions for all merchants
  async syncAllMerchants(): Promise<void> {
    const allConnections = Array.from(oauthService['connections'].values())
      .filter(conn => conn.isActive);

    for (const connection of allConnections) {
      try {
        await this.syncMerchantTransactions(connection);
      } catch (error) {
        console.error(`Sync failed for merchant ${connection.merchantId}:`, error);
      }
    }
  }

  // Sync transactions for specific merchant
  async syncMerchantTransactions(connection: OAuthConnection): Promise<SyncResult> {
    const jobId = `${connection.merchantId}_${connection.provider}`;
    
    if (this.runningJobs.has(jobId)) {
      throw new Error('Sync already running for this merchant');
    }

    this.runningJobs.add(jobId);
    
    try {
      // Check if token needs refresh
      if (oauthService.needsRefresh(connection)) {
        await oauthService.refreshToken(connection.id);
      }

      const job = this.createSyncJob(connection);
      this.syncJobs.set(jobId, job);

      let transactions: TransactionData[] = [];
      
      if (connection.provider === 'square') {
        transactions = await this.fetchSquareTransactions(connection);
      } else if (connection.provider === 'clover') {
        transactions = await this.fetchCloverTransactions(connection);
      }

      // Process transactions
      const processedCount = await this.processTransactions(transactions);
      
      // Update job status
      job.status = 'completed';
      job.recordsProcessed = processedCount;
      job.lastSyncTime = new Date().toISOString();
      job.nextSyncTime = new Date(Date.now() + this.syncInterval).toISOString();
      
      this.syncJobs.set(jobId, job);

      return {
        success: true,
        recordsProcessed: processedCount,
        errors: job.errors,
        lastSyncTime: job.lastSyncTime
      };

    } catch (error) {
      const job = this.syncJobs.get(jobId);
      if (job) {
        job.status = 'failed';
        job.errors.push(error instanceof Error ? error.message : 'Unknown error');
        this.syncJobs.set(jobId, job);
      }
      
      throw error;
    } finally {
      this.runningJobs.delete(jobId);
    }
  }

  // Fetch transactions from Square API
  private async fetchSquareTransactions(connection: OAuthConnection): Promise<TransactionData[]> {
    const token = oauthService['decryptToken'](connection.tokens.accessToken);
    const locationId = connection.merchantInfo.locationId;
    
    const response = await fetch(
      `https://connect.squareup.com/v2/payments?location_id=${locationId}&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Square-Version': '2023-10-18'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Square API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.payments?.map((payment: any) => this.transformSquarePayment(payment, connection)) || [];
  }

  // Fetch transactions from Clover API
  private async fetchCloverTransactions(connection: OAuthConnection): Promise<TransactionData[]> {
    const token = oauthService['decryptToken'](connection.tokens.accessToken);
    const merchantId = connection.merchantInfo.locationId;
    
    const response = await fetch(
      `https://sandbox-dev.clover.com/v3/merchants/${merchantId}/orders?limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Clover API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.elements?.map((order: any) => this.transformCloverOrder(order, connection)) || [];
  }

  // Transform Square payment to TransactionData
  private transformSquarePayment(payment: any, connection: OAuthConnection): TransactionData {
    return {
      id: `square_${payment.id}`,
      externalId: payment.id,
      merchantId: connection.merchantId,
      amount: payment.amount_money?.amount || 0,
      currency: payment.amount_money?.currency || 'USD',
      timestamp: payment.created_at,
      customerId: payment.buyer_email_address,
      customerEmail: payment.buyer_email_address,
      items: [], // Square payments don't include itemized data by default
      paymentMethod: payment.source_type || 'CARD',
      status: payment.status === 'COMPLETED' ? 'completed' : 'failed',
      metadata: {
        receiptNumber: payment.receipt_number,
        receiptUrl: payment.receipt_url,
        orderId: payment.order_id
      }
    };
  }

  // Transform Clover order to TransactionData
  private transformCloverOrder(order: any, connection: OAuthConnection): TransactionData {
    const items: TransactionItem[] = order.lineItems?.elements?.map((item: any) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      category: item.category,
      sku: item.sku
    })) || [];

    return {
      id: `clover_${order.id}`,
      externalId: order.id,
      merchantId: connection.merchantId,
      amount: order.total,
      currency: order.currency || 'USD',
      timestamp: new Date(order.createdTime).toISOString(),
      customerId: order.customers?.[0]?.id,
      customerEmail: order.customers?.[0]?.email,
      customerPhone: order.customers?.[0]?.phoneNumber,
      items,
      paymentMethod: order.payType || 'CREDIT_CARD',
      status: order.state === 'paid' ? 'completed' : 'failed',
      metadata: {
        note: order.note,
        state: order.state,
        payType: order.payType
      }
    };
  }

  // Process transactions and calculate points
  private async processTransactions(transactions: TransactionData[]): Promise<number> {
    let processedCount = 0;
    
    for (const transaction of transactions) {
      try {
        // Validate transaction
        if (!this.validateTransaction(transaction)) {
          console.warn('Invalid transaction skipped:', transaction.id);
          continue;
        }

        // Check for duplicates
        if (await this.isDuplicateTransaction(transaction)) {
          console.log('Duplicate transaction skipped:', transaction.id);
          continue;
        }

        // Calculate points
        const points = await this.calculatePoints(transaction);
        
        // Update customer points
        await this.updateCustomerPoints(transaction, points);
        
        // Store transaction record
        await this.storeTransaction(transaction, points);
        
        processedCount++;
        
        console.log(`Processed transaction ${transaction.id}: ${points} points`);
        
      } catch (error) {
        console.error(`Error processing transaction ${transaction.id}:`, error);
      }
    }
    
    return processedCount;
  }

  // Validate transaction data
  private validateTransaction(transaction: TransactionData): boolean {
    return !!(
      transaction.id &&
      transaction.merchantId &&
      transaction.amount > 0 &&
      transaction.timestamp &&
      transaction.status === 'completed'
    );
  }

  // Check for duplicate transactions
  private async isDuplicateTransaction(transaction: TransactionData): Promise<boolean> {
    // In a real implementation, check database for existing transaction
    // For now, return false (no duplicates)
    return false;
  }

  // Calculate points based on merchant configuration
  private async calculatePoints(transaction: TransactionData): Promise<number> {
    // Get merchant points configuration
    const pointsPerDollar = 0.01; // 1% default
    const basePoints = Math.floor(transaction.amount * pointsPerDollar);
    
    // Apply tier multipliers (if applicable)
    // Apply geo-based bonuses (if applicable)
    // Apply category bonuses (if applicable)
    
    return basePoints;
  }

  // Update customer points balance
  private async updateCustomerPoints(transaction: TransactionData, points: number): Promise<void> {
    // In a real implementation, update customer points in database
    console.log(`Awarding ${points} points to customer for transaction ${transaction.id}`);
  }

  // Store transaction record
  private async storeTransaction(transaction: TransactionData, points: number): Promise<void> {
    // In a real implementation, store transaction in database
    console.log(`Stored transaction ${transaction.id} with ${points} points`);
  }

  // Create sync job
  private createSyncJob(connection: OAuthConnection): SyncJob {
    return {
      id: `${connection.merchantId}_${connection.provider}`,
      merchantId: connection.merchantId,
      provider: connection.provider,
      status: 'running',
      lastSyncTime: connection.lastSync,
      nextSyncTime: new Date(Date.now() + this.syncInterval).toISOString(),
      recordsProcessed: 0,
      errors: []
    };
  }

  // Manual sync trigger
  async triggerSync(merchantId: string, provider: 'square' | 'clover'): Promise<SyncResult> {
    const connection = oauthService.getConnection(merchantId, provider);
    if (!connection) {
      throw new Error('No active connection found');
    }

    return await this.syncMerchantTransactions(connection);
  }

  // Get sync status
  getSyncStatus(merchantId: string, provider: 'square' | 'clover'): SyncJob | undefined {
    const jobId = `${merchantId}_${provider}`;
    return this.syncJobs.get(jobId);
  }

  // Get all sync jobs
  getAllSyncJobs(): SyncJob[] {
    return Array.from(this.syncJobs.values());
  }
}

export const transactionSyncService = new TransactionSyncService();
