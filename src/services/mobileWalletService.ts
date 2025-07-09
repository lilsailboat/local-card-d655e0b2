
interface WalletPass {
  id: string;
  type: 'apple' | 'google';
  businessId: string;
  customerId: string;
  passData: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MobileWalletConfig {
  appleCertificate?: string;
  applePrivateKey?: string;
  googleServiceAccount?: string;
  passTypeId: string;
  teamId: string;
}

interface WalletSupport {
  name: string;
  supported: boolean;
}

declare global {
  interface Window {
    PassKit?: any;
  }
}

class MobileWalletService {
  private passes: WalletPass[] = [];
  private config: MobileWalletConfig | null = null;

  // Configure mobile wallet settings
  configure(config: MobileWalletConfig) {
    this.config = config;
  }

  // Check wallet support for different platforms
  checkWalletSupport(): WalletSupport[] {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    return [
      {
        name: 'apple',
        supported: isIOS && typeof window !== 'undefined' && !!window.PassKit
      },
      {
        name: 'google',
        supported: isAndroid || (!isIOS && typeof window !== 'undefined')
      }
    ];
  }

  // Generate loyalty pass for customer
  generateLoyaltyPass(customer: any): WalletPass {
    const passType = this.getBestWalletType();
    const passId = `${passType}_loyalty_${customer.id}_${Date.now()}`;
    
    const passData = {
      passId,
      businessId: 'demo-business',
      customerName: customer.name || 'Valued Customer',
      tier: customer.tier || 'bronze',
      points: customer.points || 0,
      cardNumber: customer.id,
      backgroundColor: this.getTierColor(customer.tier),
      foregroundColor: '#FFFFFF',
      logoText: 'Local Card',
      barcode: {
        format: 'QR',
        message: `localcard://${customer.id}`,
        altText: customer.id
      },
      locations: [
        {
          latitude: 37.7749,
          longitude: -122.4194,
          relevantText: 'You\'re near a participating business!'
        }
      ]
    };

    const pass: WalletPass = {
      id: passId,
      type: passType as 'apple' | 'google',
      businessId: 'demo-business',
      customerId: customer.id,
      passData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.passes.push(pass);
    return pass;
  }

  // Generate wallet integration buttons
  generateWalletButton(pass: WalletPass): string {
    if (pass.type === 'apple') {
      return `
        <div class="wallet-buttons">
          <button onclick="addToAppleWallet('${pass.id}')" class="apple-wallet-btn">
            <img src="https://developer.apple.com/wallet/Add_to_Apple_Wallet_rgb_US-UK.svg" alt="Add to Apple Wallet" />
          </button>
        </div>
      `;
    } else if (pass.type === 'google') {
      return `
        <div class="wallet-buttons">
          <button onclick="addToGoogleWallet('${pass.id}')" class="google-wallet-btn">
            Add to Google Wallet
          </button>
        </div>
      `;
    }
    return '<p>Wallet not supported on this device</p>';
  }

  // Helper method to determine best wallet type
  private getBestWalletType(): string {
    const support = this.checkWalletSupport();
    const appleSupport = support.find(s => s.name === 'apple');
    const googleSupport = support.find(s => s.name === 'google');
    
    if (appleSupport?.supported) return 'apple';
    if (googleSupport?.supported) return 'google';
    return 'apple'; // Default fallback
  }

  // Helper method to get tier colors
  private getTierColor(tier: string): string {
    switch (tier?.toLowerCase()) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#4A90E2';
    }
  }

  // Generate Apple Wallet pass
  generateAppleWalletPass(customerId: string, businessId: string, data: any): WalletPass {
    if (!this.config?.appleCertificate || !this.config?.applePrivateKey) {
      throw new Error('Apple Wallet configuration missing');
    }

    const passId = `apple_pass_${Date.now()}`;
    const passData = {
      // Generate Apple Wallet pass payload here using customer data
      // Requires proper signing with Apple certificate
      ...data,
      passId,
      businessId
    };

    const pass: WalletPass = {
      id: passId,
      type: 'apple',
      businessId,
      customerId,
      passData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.passes.push(pass);
    return pass;
  }

  // Generate Google Wallet pass
  generateGoogleWalletPass(customerId: string, businessId: string, data: any): WalletPass {
    if (!this.config?.googleServiceAccount) {
      throw new Error('Google Wallet configuration missing');
    }

    const passId = `google_pass_${Date.now()}`;
    const passData = {
      // Generate Google Wallet pass payload here using customer data
      // Requires proper signing with Google service account
      ...data,
      passId,
      businessId
    };

    const pass: WalletPass = {
      id: passId,
      type: 'google',
      businessId,
      customerId,
      passData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.passes.push(pass);
    return pass;
  }

  // Get wallet pass by ID
  getPass(id: string): WalletPass | undefined {
    return this.passes.find(pass => pass.id === id);
  }

  // Get all active passes for a customer
  getCustomerPasses(customerId: string): WalletPass[] {
    return this.passes.filter(pass => pass.customerId === customerId && pass.isActive);
  }

  // Invalidate a wallet pass
  invalidatePass(id: string) {
    const pass = this.getPass(id);
    if (pass) {
      pass.isActive = false;
      pass.updatedAt = new Date();
    }
  }

  // Update wallet pass data
  updatePassData(id: string, data: any) {
    const pass = this.getPass(id);
    if (pass) {
      pass.passData = { ...pass.passData, ...data };
      pass.updatedAt = new Date();
    }
  }

  // Simulate adding pass to wallet (client-side)
  addPassToWallet(pass: WalletPass) {
    if (pass.type === 'apple' && typeof window !== 'undefined' && window.PassKit) {
      // Simulate adding to Apple Wallet
      console.log('Adding Apple Wallet pass:', pass);
      window.PassKit.addStringToPasteboard(JSON.stringify(pass.passData));
      alert('Apple Wallet pass data copied to clipboard. Simulate adding to wallet.');
    } else if (pass.type === 'google') {
      // Simulate adding to Google Wallet
      console.log('Adding Google Wallet pass:', pass);
      alert('Google Wallet pass: ' + JSON.stringify(pass.passData));
    } else {
      console.warn('Mobile wallet not supported in this environment.');
    }
  }
}

export const mobileWalletService = new MobileWalletService();
