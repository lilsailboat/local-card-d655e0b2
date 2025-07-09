
interface CustomerBehavior {
  id: string;
  frequencyPattern: 'daily' | 'weekly' | 'monthly' | 'irregular';
  spendingPattern: 'consistent' | 'increasing' | 'decreasing' | 'seasonal';
  preferredTime: 'morning' | 'afternoon' | 'evening';
  predictedChurn: number; // 0-100 probability
  lifetimeValue: number;
  nextVisitPrediction: Date;
}

interface BusinessInsight {
  type: 'trend' | 'anomaly' | 'opportunity' | 'risk';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  recommendation: string;
}

class AIAnalyticsService {
  // Customer churn prediction using simple ML algorithm
  predictChurn(customer: any): number {
    const daysSinceLastVisit = Math.floor((Date.now() - new Date(customer.lastVisit).getTime()) / (1000 * 60 * 60 * 24));
    const avgVisitFrequency = customer.visits > 0 ? 365 / customer.visits : 365;
    
    let churnScore = 0;
    
    // Time-based factors
    if (daysSinceLastVisit > avgVisitFrequency * 2) churnScore += 30;
    if (daysSinceLastVisit > avgVisitFrequency * 3) churnScore += 40;
    
    // Spending pattern factors
    if (customer.averageSpend < 20) churnScore += 20;
    if (customer.visits < 5) churnScore += 25;
    
    // Tier-based factors
    const tierFactors = { bronze: 15, silver: 10, gold: 5, platinum: 0 };
    churnScore += tierFactors[customer.tier] || 15;
    
    return Math.min(churnScore, 100);
  }

  // Analyze customer behavior patterns
  analyzeCustomerBehavior(customer: any): CustomerBehavior {
    const visits = customer.visits || 0;
    const totalSpend = customer.lifetimeSpend || 0;
    const avgSpend = customer.averageSpend || 0;
    
    // Determine frequency pattern
    let frequencyPattern: CustomerBehavior['frequencyPattern'] = 'irregular';
    if (visits > 50) frequencyPattern = 'daily';
    else if (visits > 20) frequencyPattern = 'weekly';
    else if (visits > 5) frequencyPattern = 'monthly';
    
    // Determine spending pattern
    let spendingPattern: CustomerBehavior['spendingPattern'] = 'consistent';
    if (avgSpend > totalSpend / visits * 1.2) spendingPattern = 'increasing';
    else if (avgSpend < totalSpend / visits * 0.8) spendingPattern = 'decreasing';
    
    // Predict next visit
    const avgDaysBetweenVisits = visits > 0 ? 365 / visits : 30;
    const nextVisit = new Date();
    nextVisit.setDate(nextVisit.getDate() + avgDaysBetweenVisits);
    
    return {
      id: customer.id,
      frequencyPattern,
      spendingPattern,
      preferredTime: 'afternoon', // Simplified - in production, analyze actual visit times
      predictedChurn: this.predictChurn(customer),
      lifetimeValue: this.calculateLifetimeValue(customer),
      nextVisitPrediction: nextVisit
    };
  }

  // Calculate predicted customer lifetime value
  calculateLifetimeValue(customer: any): number {
    const monthlySpend = customer.averageSpend * (customer.visits / 12 || 1);
    const churnProbability = this.predictChurn(customer) / 100;
    const expectedLifespan = churnProbability < 0.3 ? 36 : churnProbability < 0.6 ? 24 : 12; // months
    
    return monthlySpend * expectedLifespan * (1 - churnProbability);
  }

  // Generate business insights using AI analysis
  generateBusinessInsights(customers: any[], transactions: any[] = []): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    
    // Churn risk analysis
    const highChurnCustomers = customers.filter(c => this.predictChurn(c) > 70);
    if (highChurnCustomers.length > customers.length * 0.15) {
      insights.push({
        type: 'risk',
        title: 'High Customer Churn Risk',
        description: `${highChurnCustomers.length} customers (${((highChurnCustomers.length / customers.length) * 100).toFixed(1)}%) are at high risk of churning`,
        impact: 'high',
        actionable: true,
        recommendation: 'Launch re-engagement campaign with special offers for at-risk customers'
      });
    }
    
    // Revenue opportunity analysis
    const goldCustomers = customers.filter(c => c.tier === 'gold');
    const avgGoldSpend = goldCustomers.reduce((sum, c) => sum + c.lifetimeSpend, 0) / goldCustomers.length;
    if (avgGoldSpend > 1000) {
      insights.push({
        type: 'opportunity',
        title: 'Premium Customer Upselling',
        description: `Gold tier customers spend an average of $${avgGoldSpend.toFixed(2)}. Consider platinum tier benefits.`,
        impact: 'medium',
        actionable: true,
        recommendation: 'Create platinum tier program for high-value customers'
      });
    }
    
    // Seasonal trend analysis
    const currentMonth = new Date().getMonth();
    insights.push({
      type: 'trend',
      title: 'Seasonal Activity Pattern',
      description: 'Customer activity patterns suggest seasonal variations in engagement',
      impact: 'medium',
      actionable: true,
      recommendation: 'Prepare seasonal campaigns based on historical data'
    });
    
    // Ward-based insights
    const wardDistribution = customers.reduce((acc, c) => {
      acc[c.wardNumber] = (acc[c.wardNumber] || 0) + 1;
      return acc;
    }, {});
    
    const dominantWard = Object.entries(wardDistribution).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    if (dominantWard && (dominantWard[1] as number) > customers.length * 0.4) {
      insights.push({
        type: 'opportunity',
        title: 'Geographic Concentration',
        description: `${((dominantWard[1] as number) / customers.length * 100).toFixed(1)}% of customers are from Ward ${dominantWard[0]}`,
        impact: 'medium',
        actionable: true,
        recommendation: 'Consider ward-specific promotions and expand to underserved areas'
      });
    }
    
    return insights;
  }

  // Real-time anomaly detection
  detectAnomalies(recentTransactions: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    
    if (recentTransactions.length === 0) return insights;
    
    const avgTransaction = recentTransactions.reduce((sum, t) => sum + (t.amount || 0), 0) / recentTransactions.length;
    const unusualTransactions = recentTransactions.filter(t => t.amount > avgTransaction * 3);
    
    if (unusualTransactions.length > 0) {
      insights.push({
        type: 'anomaly',
        title: 'Unusual Transaction Pattern',
        description: `${unusualTransactions.length} transactions detected with amounts significantly above average`,
        impact: 'low',
        actionable: true,
        recommendation: 'Review large transactions for potential issues or opportunities'
      });
    }
    
    return insights;
  }

  // Personalized recommendations for customers
  generatePersonalizedRecommendations(customer: any): string[] {
    const behavior = this.analyzeCustomerBehavior(customer);
    const recommendations: string[] = [];
    
    if (behavior.predictedChurn > 50) {
      recommendations.push('Offer loyalty bonus to increase engagement');
      recommendations.push('Send personalized discount for next visit');
    }
    
    if (behavior.spendingPattern === 'increasing') {
      recommendations.push('Invite to premium tier program');
      recommendations.push('Offer exclusive early access to new products');
    }
    
    if (behavior.frequencyPattern === 'daily') {
      recommendations.push('Offer subscription-based rewards');
      recommendations.push('Create VIP fast-track service');
    }
    
    return recommendations;
  }

  // Optimize campaign targeting using ML
  optimizeCampaignTargeting(campaign: any, customers: any[]): any[] {
    return customers.filter(customer => {
      const behavior = this.analyzeCustomerBehavior(customer);
      
      // Target based on campaign type
      if (campaign.type === 'retention' && behavior.predictedChurn > 40) return true;
      if (campaign.type === 'upsell' && behavior.spendingPattern === 'increasing') return true;
      if (campaign.type === 'frequency' && behavior.frequencyPattern === 'irregular') return true;
      
      // Target based on tier
      if (campaign.targetTiers && campaign.targetTiers.includes(customer.tier)) return true;
      
      return false;
    });
  }
}

export const aiAnalyticsService = new AIAnalyticsService();
