
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { enhancedBillingService, BillingAnalytics, MonthlyBillingCycle } from '@/services/enhancedBillingService';
import { DollarSign, TrendingUp, Calendar, CreditCard, FileText, AlertCircle } from 'lucide-react';

const EnhancedBillingDashboard = () => {
  const [analytics, setAnalytics] = useState<BillingAnalytics | null>(null);
  const [billingHistory, setBillingHistory] = useState<MonthlyBillingCycle[]>([]);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const merchantId = 'merchant_123'; // In real app, get from auth context

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      const billingAnalytics = enhancedBillingService.calculateBillingAnalytics(merchantId);
      const history = enhancedBillingService.getBillingHistory(merchantId);
      const plan = enhancedBillingService.getCurrentPlan('business');

      setAnalytics(billingAnalytics);
      setBillingHistory(history);
      setCurrentPlan(plan);
    } catch (error) {
      console.error('Failed to load billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading billing data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Billing & Revenue</h2>
        <p className="text-gray-600">
          Monitor your transaction fees, subscription charges, and billing analytics.
        </p>
      </div>

      {/* Current Plan & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-2xl font-bold">{currentPlan?.name}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(currentPlan?.monthlyFee || 0)}/month
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(analytics?.currentPeriod.transactionFees || 0)}
                </p>
                <p className="text-sm text-gray-500">Transaction fees</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projected Bill</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(analytics?.currentPeriod.projectedMonthlyTotal || 0)}
                </p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">YTD Volume</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(analytics?.yearToDate.transactionVolume || 0)}
                </p>
                <p className="text-sm text-gray-500">Transaction volume</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Period</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Current Billing Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Billing Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Monthly Charges</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subscription Fee</span>
                      <span className="font-medium">{formatCurrency(currentPlan?.monthlyFee || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Transaction Fees (3%)</span>
                      <span className="font-medium">
                        {formatCurrency(analytics?.currentPeriod.transactionFees || 0)}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>Projected Total</span>
                        <span>{formatCurrency(analytics?.currentPeriod.projectedMonthlyTotal || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Transaction Volume</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Volume</span>
                      <span className="font-medium">
                        {formatCurrency(analytics?.currentPeriod.transactionVolume || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fee Rate</span>
                      <span className="font-medium">3.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fees Collected</span>
                      <span className="font-medium">
                        {formatCurrency(analytics?.currentPeriod.transactionFees || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Billing Period Progress</span>
                  <span>{Math.round((new Date().getDate() / 30) * 100)}%</span>
                </div>
                <Progress value={(new Date().getDate() / 30) * 100} className="h-2" />
                <p className="text-xs text-gray-500">
                  Next billing date: {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.length > 0 ? (
                  billingHistory.map((cycle) => (
                    <div key={cycle.billingPeriodStart} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">
                            {formatDate(cycle.billingPeriodStart)} - {formatDate(cycle.billingPeriodEnd)}
                          </h4>
                          <Badge variant={getBadgeVariant(cycle.status)}>
                            {cycle.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Subscription: {formatCurrency(cycle.monthlySubscriptionFee)}</p>
                          <p>Transaction fees: {formatCurrency(cycle.totalTransactionFees)} ({cycle.transactionCount} transactions)</p>
                          <p>Volume: {formatCurrency(cycle.totalTransactionVolume)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{formatCurrency(cycle.totalAmount)}</p>
                        {cycle.paidAt && (
                          <p className="text-xs text-gray-500">Paid {formatDate(cycle.paidAt)}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No billing history yet</p>
                    <p className="text-sm">Your first bill will be generated at the end of the month</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Period Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Period</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(analytics?.currentPeriod.transactionFees || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Previous Period</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(analytics?.previousPeriod.transactionFees || 0)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Growth</span>
                      <span className={`text-lg font-bold ${
                        (analytics?.currentPeriod.transactionFees || 0) > (analytics?.previousPeriod.transactionFees || 0)
                          ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {analytics?.currentPeriod.transactionFees && analytics?.previousPeriod.transactionFees
                          ? `${(((analytics.currentPeriod.transactionFees - analytics.previousPeriod.transactionFees) / analytics.previousPeriod.transactionFees) * 100).toFixed(1)}%`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Year to Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Volume</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(analytics?.yearToDate.transactionVolume || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Fees</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(analytics?.yearToDate.transactionFees || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Billed</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(analytics?.yearToDate.totalBilled || 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Billing Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Billing Model</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monthly subscription: $40.00</li>
                <li>• Transaction fee: 3% per transaction</li>
                <li>• Billed monthly on the 1st</li>
                <li>• Automatic payment via Stripe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">What's Included</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unlimited POS integrations</li>
                <li>• Real-time transaction sync</li>
                <li>• Advanced analytics dashboard</li>
                <li>• Campaign management tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedBillingDashboard;
