
// D.C. Ward System Service
export interface Ward {
  number: number;
  name: string;
  zipCodes: string[];
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
}

export interface WardChallenge {
  id: string;
  wardNumber: number;
  title: string;
  description: string;
  requirement: string;
  reward: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface WardBadge {
  id: string;
  name: string;
  description: string;
  wardNumber: number;
  requirement: string;
  icon: string;
}

class WardService {
  private wards: Ward[] = [
    {
      number: 1,
      name: "Columbia Heights/Mount Pleasant",
      zipCodes: ["20009", "20010"],
      boundaries: { north: "Park Rd", south: "Florida Ave", east: "16th St", west: "Rock Creek Park" }
    },
    {
      number: 2,
      name: "Dupont Circle/Logan Circle",
      zipCodes: ["20036", "20037"],
      boundaries: { north: "S St", south: "K St", east: "15th St", west: "23rd St" }
    },
    {
      number: 3,
      name: "Cleveland Park/Cathedral Heights",
      zipCodes: ["20008", "20016"],
      boundaries: { north: "Chevy Chase", south: "Calvert St", east: "16th St", west: "Wisconsin Ave" }
    },
    {
      number: 4,
      name: "Petworth/Brightwood",
      zipCodes: ["20011", "20012"],
      boundaries: { north: "Eastern Ave", south: "Kennedy St", east: "16th St", west: "Rock Creek Park" }
    },
    {
      number: 5,
      name: "Brookland/Fort Lincoln",
      zipCodes: ["20017", "20018"],
      boundaries: { north: "Eastern Ave", south: "Florida Ave", east: "Anacostia River", west: "16th St" }
    },
    {
      number: 6,
      name: "Capitol Hill/H Street",
      zipCodes: ["20002", "20003"],
      boundaries: { north: "H St", south: "M St SE", east: "Anacostia River", west: "Capitol" }
    },
    {
      number: 7,
      name: "Shaw/Near Southeast",
      zipCodes: ["20001", "20004"],
      boundaries: { north: "Florida Ave", south: "Constitution Ave", east: "15th St", west: "Anacostia River" }
    },
    {
      number: 8,
      name: "Anacostia/Congress Heights",
      zipCodes: ["20020", "20032"],
      boundaries: { north: "Anacostia River", south: "Southern Ave", east: "Eastern Ave", west: "South Capitol St" }
    }
  ];

  private challenges: WardChallenge[] = [
    {
      id: "ward1_triple_shop",
      wardNumber: 1,
      title: "Ward 1 Triple Shop Challenge",
      description: "Shop at 3 different Ward 1 businesses this week",
      requirement: "3 transactions in Ward 1",
      reward: 500,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    }
  ];

  private badges: WardBadge[] = [
    {
      id: "ward1_loyalist",
      name: "Ward 1 Loyalist",
      description: "Complete 10 transactions in Ward 1",
      wardNumber: 1,
      requirement: "10 transactions",
      icon: "🏆"
    }
  ];

  // Get ward by ZIP code
  getWardByZipCode(zipCode: string): Ward | null {
    return this.wards.find(ward => ward.zipCodes.includes(zipCode)) || null;
  }

  // Get all wards
  getAllWards(): Ward[] {
    return this.wards;
  }

  // Get ward challenges
  getWardChallenges(wardNumber?: number): WardChallenge[] {
    if (wardNumber) {
      return this.challenges.filter(c => c.wardNumber === wardNumber && c.isActive);
    }
    return this.challenges.filter(c => c.isActive);
  }

  // Get ward badges
  getWardBadges(wardNumber?: number): WardBadge[] {
    if (wardNumber) {
      return this.badges.filter(b => b.wardNumber === wardNumber);
    }
    return this.badges;
  }

  // Check if user qualifies for badge
  checkBadgeQualification(userId: string, transactions: any[]): WardBadge[] {
    const earnedBadges: WardBadge[] = [];
    
    this.badges.forEach(badge => {
      const wardTransactions = transactions.filter(t => t.wardNumber === badge.wardNumber);
      if (wardTransactions.length >= 10) { // Example: 10 transactions for loyalist badge
        earnedBadges.push(badge);
      }
    });

    return earnedBadges;
  }
}

export const wardService = new WardService();
