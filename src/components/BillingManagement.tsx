
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { billingService, BillingPlan, PaymentMethod } from '@/services/billingService';
import { CreditCard, Check, DollarSign, Calendar, Settings } from 'lucide-react';

const BillingManagement = () => {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<string>('starter');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      const availablePlans = billingService.getPlans();
      setPlans(availablePlans);
      
      const methods = await billingService.getPaymentMethods('merchant_123');
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Failed to load billing data:', error);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      const result = await billingService.createSubscription('merchant_123', planId, 'pm_123');
      if (result.subscriptionId) {
        setCurrentPlan(planId);
        alert('Plan upgraded successfully!');
      }
    } catch (error) {
      alert('Failed to upgrade plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const formatTransactionFee = (fee: number) => {
    return (fee * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Billing & Payments</h2>
        <p className="text-gray-600">Manage your subscription plan and payment methods.</p>
      </div>

      {/* Current Plan Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium capitalize">{currentPlan} Plan</h3>
              <p className="text-gray-600">
                ${formatPrice(plans.find(p => p.id === currentPlan)?.price || 0)}/month
              </p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${currentPlan === plan.id ? 'border-blue-500 shadow-lg' : ''}`}>
              {currentPlan === plan.id && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600">Current Plan</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-center">
                  <h3 className="text-xl font-bold capitalize">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${formatPrice(plan.price)}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="outline">
                    {formatTransactionFee(plan.transactionFee)}% transaction fee
                  </Badge>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  disabled={currentPlan === plan.id || loading}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {currentPlan === plan.id ? 'Current Plan' : 
                   loading ? 'Processing...' : 
                   currentPlan === 'starter' && plan.id !== 'starter' ? 'Upgrade' : 
                   'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {method.brand?.toUpperCase()} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{method.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <Badge variant="outline">Default</Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">January 2024 - Starter Plan</p>
                <p className="text-sm text-gray-500">Due: Feb 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$29.99</p>
                <Badge className="text-xs bg-green-100 text-green-800">Paid</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">December 2023 - Starter Plan</p>
                <p className="text-sm text-gray-500">Due: Jan 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$29.99</p>
                <Badge className="text-xs bg-green-100 text-green-800">Paid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingManagement;
