
interface WalletPass {
  id: string;
  passType: 'loyalty' | 'coupon' | 'store_card';
  title: string;
  description: string;
  points: number;
  tier: string;
  barcode: string;
  qrCode: string;
  backgroundColor: string;
  foregroundColor: string;
  logoText: string;
  stripImage?: string;
  expirationDate?: Date;
}

interface WalletProvider {
  name: 'apple' | 'google' | 'samsung';
  supported: boolean;
  apiEndpoint: string;
}

class MobileWalletService {
  private supportedProviders: WalletProvider[] = [
    { name: 'apple', supported: true, apiEndpoint: '/api/wallet/apple' },
    { name: 'google', supported: true, apiEndpoint: '/api/wallet/google' },
    { name: 'samsung', supported: false, apiEndpoint: '/api/wallet/samsung' }
  ];

  // Check if device supports wallet functionality
  checkWalletSupport(): WalletProvider[] {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    return this.supportedProviders.filter(provider => {
      if (provider.name === 'apple' && !isIOS) return false;
      if (provider.name === 'google' && !isAndroid) return false;
      return provider.supported;
    });
  }

  // Generate loyalty card pass for mobile wallet
  generateLoyaltyPass(customerData: any): WalletPass {
    const passId = `loyalty_${customerData.id}_${Date.now()}`;
    
    return {
      id: passId,
      passType: 'loyalty',
      title: 'Local Card DC',
      description: `${customerData.tier.toUpperCase()} Member`,
      points: customerData.points || 0,
      tier: customerData.tier,
      barcode: this.generateBarcode(customerData.id),
      qrCode: this.generateQRCode(customerData.id),
      backgroundColor: this.getTierColor(customerData.tier),
      foregroundColor: '#FFFFFF',
      logoText: 'Local Card',
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    };
  }

  // Generate promotional pass
  generatePromoPass(campaign: any, customerData: any): WalletPass {
    const passId = `promo_${campaign.id}_${customerData.id}`;
    
    return {
      id: passId,
      passType: 'coupon',
      title: campaign.name,
      description: campaign.description,
      points: 0,
      tier: customerData.tier,
      barcode: this.generateBarcode(passId),
      qrCode: this.generateQRCode(passId),
      backgroundColor: '#FF6B6B',
      foregroundColor: '#FFFFFF',
      logoText: 'Special Offer',
      expirationDate: new Date(campaign.endDate)
    };
  }

  private generateBarcode(data: string): string {
    // Generate a simple barcode representation
    return `128${data.replace(/[^0-9]/g, '').padEnd(12, '0').slice(0, 12)}`;
  }

  private generateQRCode(data: string): string {
    // Generate QR code data URL
    // In production, use a proper QR code library
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" fill="white"/>
        <text x="50" y="50" text-anchor="middle" dy=".3em" font-family="monospace" font-size="8">
          QR:${data.slice(0, 10)}
        </text>
      </svg>
    `)}`;
  }

  private getTierColor(tier: string): string {
    const colors = {
      bronze: '#CD7F32',
      silver: '#C0C0C0',
      gold: '#FFD700',
      platinum: '#E5E4E2'
    };
    return colors[tier as keyof typeof colors] || colors.bronze;
  }

  // Add pass to Apple Wallet
  async addToAppleWallet(pass: WalletPass): Promise<boolean> {
    try {
      if (!window.PassKit) {
        console.warn('Apple PassKit not available');
        return false;
      }

      const passData = {
        passTypeIdentifier: 'pass.com.localcard.loyalty',
        serialNumber: pass.id,
        teamIdentifier: 'LOCALCARD',
        organizationName: 'Local Card DC',
        description: pass.description,
        logoText: pass.logoText,
        backgroundColor: pass.backgroundColor,
        foregroundColor: pass.foregroundColor,
        labelColor: pass.foregroundColor,
        barcode: {
          message: pass.barcode,
          format: 'PKBarcodeFormatCode128',
          messageEncoding: 'iso-8859-1'
        },
        locations: [
          {
            longitude: -77.0369,
            latitude: 38.9072,
            relevantText: 'Welcome to Local Card DC!'
          }
        ],
        storeCard: {
          primaryFields: [
            {
              key: 'points',
              label: 'Points',
              value: pass.points.toString()
            }
          ],
          secondaryFields: [
            {
              key: 'tier',
              label: 'Tier',
              value: pass.tier.toUpperCase()
            }
          ]
        }
      };

      // In production, this would make an API call to generate the .pkpass file
      console.log('Adding to Apple Wallet:', passData);
      return true;
    } catch (error) {
      console.error('Error adding to Apple Wallet:', error);
      return false;
    }
  }

  // Add pass to Google Wallet
  async addToGoogleWallet(pass: WalletPass): Promise<boolean> {
    try {
      const googlePayButton = document.createElement('div');
      googlePayButton.innerHTML = `
        <script src="https://pay.google.com/gp/p/js/pay.js"></script>
      `;

      const loyaltyObject = {
        id: pass.id,
        class: 'localcard.loyalty.class',
        state: 'ACTIVE',
        heroImage: {
          sourceUri: {
            uri: 'https://via.placeholder.com/600x200'
          }
        },
        textModulesData: [
          {
            header: 'Points Balance',
            body: pass.points.toString()
          },
          {
            header: 'Tier Status',
            body: pass.tier.toUpperCase()
          }
        ],
        barcode: {
          type: 'QR_CODE',
          value: pass.qrCode
        },
        locations: [
          {
            latitude: 38.9072,
            longitude: -77.0369
          }
        ]
      };

      // In production, this would use the Google Pay API
      console.log('Adding to Google Wallet:', loyaltyObject);
      return true;
    } catch (error) {
      console.error('Error adding to Google Wallet:', error);
      return false;
    }
  }

  // Update existing wallet pass
  async updateWalletPass(passId: string, updates: Partial<WalletPass>): Promise<boolean> {
    try {
      // In production, this would make API calls to update the pass on wallet servers
      console.log('Updating wallet pass:', passId, updates);
      
      // Push notification to update pass
      await this.sendPassUpdateNotification(passId, updates);
      
      return true;
    } catch (error) {
      console.error('Error updating wallet pass:', error);
      return false;
    }
  }

  private async sendPassUpdateNotification(passId: string, updates: Partial<WalletPass>): Promise<void> {
    // Simulate push notification to wallet app
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // In production, send actual push notification
        console.log('Pass update notification sent for:', passId);
      } catch (error) {
        console.warn('Push notification not available:', error);
      }
    }
  }

  // Get wallet pass status
  getPassStatus(passId: string): 'active' | 'expired' | 'redeemed' | 'inactive' {
    // In production, check with wallet providers
    return 'active';
  }

  // Generate wallet button HTML
  generateWalletButton(pass: WalletPass): string {
    const supportedWallets = this.checkWalletSupport();
    let buttons = '';

    supportedWallets.forEach(wallet => {
      if (wallet.name === 'apple') {
        buttons += `
          <button class="wallet-button apple-wallet" onclick="addToAppleWallet('${pass.id}')">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIi4uLg==" alt="Add to Apple Wallet" />
          </button>
        `;
      } else if (wallet.name === 'google') {
        buttons += `
          <button class="wallet-button google-wallet" onclick="addToGoogleWallet('${pass.id}')">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIi4uLg==" alt="Add to Google Wallet" />
          </button>
        `;
      }
    });

    return buttons;
  }
}

export const mobileWalletService = new MobileWalletService();

// Global functions for wallet integration
(window as any).addToAppleWallet = async (passId: string) => {
  const result = await mobileWalletService.addToAppleWallet({ id: passId } as WalletPass);
  if (result) {
    alert('Added to Apple Wallet successfully!');
  } else {
    alert('Failed to add to Apple Wallet');
  }
};

(window as any).addToGoogleWallet = async (passId: string) => {
  const result = await mobileWalletService.addToGoogleWallet({ id: passId } as WalletPass);
  if (result) {
    alert('Added to Google Wallet successfully!');
  } else {
    alert('Failed to add to Google Wallet');
  }
};
