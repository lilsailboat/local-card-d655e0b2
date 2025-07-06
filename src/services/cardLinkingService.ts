
// Card Linking Service with Plaid Integration
export interface LinkedCard {
  id: string;
  userId: string;
  accountId: string; // Plaid account ID
  mask: string; // Last 4 digits
  name: string;
  type: 'checking' | 'savings' | 'credit';
  subtype: string;
  isActive: boolean;
  linkedAt: string;
}

export interface PlaidLinkToken {
  link_token: string;
  expiration: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  merchantId?: string;
  merchantName: string;
  category: string[];
  date: string;
  pending: boolean;
  userId: string;
  wardNumber?: number;
  pointsEarned?: number;
  processed: boolean;
}

class CardLinkingService {
  private linkedCards: Map<string, LinkedCard[]> = new Map();
  private transactions: Transaction[] = [];

  // Create Plaid link token (mock implementation)
  async createLinkToken(userId: string): Promise<PlaidLinkToken> {
    // In real implementation, this would call Plaid API
    console.log('Creating Plaid link token for user:', userId);
    
    return {
      link_token: `link-sandbox-${Date.now()}`,
      expiration: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours
    };
  }

  // Exchange public token for access token and link account
  async linkAccount(userId: string, publicToken: string, metadata: any): Promise<LinkedCard> {
    // Mock Plaid token exchange
    console.log('Exchanging public token for access token:', { userId, publicToken });

    const linkedCard: LinkedCard = {
      id: `card_${Date.now()}`,
      userId,
      accountId: `acc_${Date.now()}`,
      mask: '4532',
      name: metadata.account?.name || 'Checking Account',
      type: metadata.account?.subtype === 'credit card' ? 'credit' : 'checking',
      subtype: metadata.account?.subtype || 'checking',
      isActive: true,
      linkedAt: new Date().toISOString()
    };

    // Store linked card
    const userCards = this.linkedCards.get(userId) || [];
    userCards.push(linkedCard);
    this.linkedCards.set(userId, userCards);

    // Start monitoring transactions
    this.startTransactionMonitoring(linkedCard);

    return linkedCard;
  }

  // Get user's linked cards
  getUserCards(userId: string): LinkedCard[] {
    return this.linkedCards.get(userId) || [];
  }

  // Start monitoring transactions for linked card
  private startTransactionMonitoring(card: LinkedCard) {
    // Mock transaction monitoring - in real app, this would use Plaid webhooks
    console.log('Starting transaction monitoring for card:', card.id);
    
    // Simulate periodic transaction checks
    setInterval(() => {
      this.checkForNewTransactions(card);
    }, 30000); // Check every 30 seconds (for demo purposes)
  }

  // Check for new transactions
  private async checkForNewTransactions(card: LinkedCard) {
    // Mock fetching transactions from Plaid
    const mockTransactions: Transaction[] = [
      {
        id: `txn_${Date.now()}`,
        accountId: card.accountId,
        amount: 24.50,
        merchantName: "Maya's Coffee House",
        category: ['Food and Drink', 'Restaurants', 'Coffee Shop'],
        date: new Date().toISOString(),
        pending: false,
        userId: card.userId,
        processed: false
      }
    ];

    // Process new transactions
    mockTransactions.forEach(transaction => {
      this.processTransaction(transaction);
    });
  }

  // Process individual transaction
  private processTransaction(transaction: Transaction) {
    // Add to transactions list
    this.transactions.push(transaction);
    
    // Trigger points calculation
    this.calculateAndAssignPoints(transaction);
    
    console.log('Processed transaction:', transaction);
  }

  // Calculate and assign points
  private calculateAndAssignPoints(transaction: Transaction) {
    // Base points calculation (1-3% back)
    const pointsRate = 0.02; // 2% default
    const pointsEarned = Math.floor(transaction.amount * pointsRate * 100);
    
    transaction.pointsEarned = pointsEarned;
    transaction.processed = true;
    
    console.log(`Earned ${pointsEarned} points for transaction ${transaction.id}`);
  }

  // Get user transactions
  getUserTransactions(userId: string): Transaction[] {
    return this.transactions.filter(t => t.userId === userId);
  }

  // Unlink card
  async unlinkCard(userId: string, cardId: string): Promise<boolean> {
    const userCards = this.linkedCards.get(userId) || [];
    const updatedCards = userCards.filter(card => card.id !== cardId);
    this.linkedCards.set(userId, updatedCards);
    
    console.log('Unlinked card:', cardId);
    return true;
  }
}

export const cardLinkingService = new CardLinkingService();
